<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Wishlist;
use App\Models\Order;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Get actual stats
        $stats = [
            'upcoming_bookings' => $user->bookings()->where('booking_date', '>=', now())->count(),
            'completed_bookings' => $user->bookings()->where('status', 'completed')->count(),
            'wishlist_items' => Wishlist::where('user_id', $user->id)->count(),
            'active_orders' => Order::where('user_id', $user->id)->whereNotIn('payment_status', ['completed', 'failed', 'cancelled'])->count(),
        ];

        // Get last 6 months of booking history for chart
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();
        
        $bookings = $user->bookings()
            ->where('created_at', '>=', $sixMonthsAgo)
            ->get();
            
        $activityData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthName = $month->format('M');
            
            $monthBookings = $bookings->filter(function($booking) use ($month) {
                return $booking->created_at->format('Y-m') === $month->format('Y-m');
            })->count();
            
            $activityData[] = [
                'name' => $monthName,
                'bookings' => $monthBookings
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'activityData' => $activityData
        ]);
    }
}
