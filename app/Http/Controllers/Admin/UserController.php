<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Events\UsersUpdated;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('id', $search);
            });
        }

        if ($request->filled('role') && $request->input('role') !== 'all') {
            $query->where('role', $request->input('role'));
        }

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        
        $allowedSortFields = ['created_at', 'name', 'email'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $users = $query->paginate(15)->withQueryString();

        $stats = [
            'total' => User::count(),
            'active' => User::count(),
            'admins' => User::where('role', 'admin')->count(),
            'merchants' => User::where('role', 'business_owner')->count(),
            'tourists' => User::where('role', 'tourist')->count(),
        ];
            
        return Inertia::render('Admin/Users', [
            'users' => $users,
            'stats' => $stats,
            'filters' => $request->only(['search', 'role', 'sort_field', 'sort_direction'])
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,business_owner,tourist',
        ]);

        $user->role = $validated['role'];
        $user->save();

        broadcast(new UsersUpdated("User role updated successfully."))->toOthers();

        return redirect()->back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,business_owner,tourist',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Manually assign role since it's not fillable
        $user->role = $validated['role'];
        $user->save();

        broadcast(new UsersUpdated("New user added successfully."))->toOthers();

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function suspend(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot suspend yourself.');
        }

        // Toggle suspension status
        $user->status = $user->status === 'suspended' ? 'active' : 'suspended';
        $user->save();

        broadcast(new UsersUpdated("User status updated successfully."))->toOthers();

        return redirect()->back()->with('success', 'User status updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();

        broadcast(new UsersUpdated("User deleted successfully."))->toOthers();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
