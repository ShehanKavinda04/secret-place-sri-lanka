<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Events\UsersUpdated;

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

        $users = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

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
            'filters' => $request->only(['search', 'role'])
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
}
