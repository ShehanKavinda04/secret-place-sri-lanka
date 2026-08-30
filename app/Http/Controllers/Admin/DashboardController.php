<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Business;
use App\Models\Booking;
use App\Models\Payment;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'total_businesses' => Business::count(),
            'total_bookings' => Booking::count(),
            'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
            'pending_businesses' => Business::where('status', 'pending')->count(),
        ];
        
        // Growth trend for chart (Users and Bookings over 6 months)
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();
        
        $users = User::where('created_at', '>=', $sixMonthsAgo)->get();
        $bookings = Booking::where('created_at', '>=', $sixMonthsAgo)->get();
            
        $growthData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthName = $month->format('M');
            
            $monthUsers = $users->filter(function($u) use ($month) {
                return $u->created_at->format('Y-m') === $month->format('Y-m');
            })->count();
            
            $monthBookings = $bookings->filter(function($b) use ($month) {
                return $b->created_at->format('Y-m') === $month->format('Y-m');
            })->count();
            
            $growthData[] = [
                'name' => $monthName,
                'users' => $monthUsers,
                'bookings' => $monthBookings
            ];
        }

        $pendingApprovals = Business::with('owner')->where('status', 'pending')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Overview', [
            'stats' => $stats,
            'growthData' => $growthData,
            'pendingApprovals' => $pendingApprovals
        ]);
    }
}
