<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Business;

class BusinessApprovalController extends Controller
{
    public function index(Request $request)
    {
        $query = Business::with('owner');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('id', $search)
                  ->orWhereHas('owner', function($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        $businesses = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        $stats = [
            'total' => Business::count(),
            'pending' => Business::where('status', 'pending')->count(),
            'approved' => Business::where('status', 'approved')->count(),
            'rejected' => Business::where('status', 'rejected')->count(),
        ];
            
        return Inertia::render('Admin/Businesses', [
            'businesses' => $businesses,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'category'])
        ]);
    }
}
