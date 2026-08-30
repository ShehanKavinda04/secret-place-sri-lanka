<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Payment;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $businessIds = $user->businesses()->pluck('id');

        $stats = [
            'total_earnings' => Payment::whereHas('booking', function ($q) use ($businessIds) {
                $q->whereIn('business_id', $businessIds);
            })->where('status', 'completed')->sum('amount'),
            
            'active_businesses' => $user->businesses()->where('status', 'approved')->count(),
            
            'pending_bookings' => Booking::whereIn('business_id', $businessIds)->where('status', 'pending')->count(),
            
            'rating' => 4.5, // Dummy until reviews are fully wired
        ];
        
        // Revenue trend for chart
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();
        
        $payments = Payment::whereHas('booking', function ($q) use ($businessIds) {
                $q->whereIn('business_id', $businessIds);
            })
            ->where('status', 'completed')
            ->where('paid_at', '>=', $sixMonthsAgo)
            ->get();
            
        $revenueData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthName = $month->format('M');
            
            $monthRevenue = $payments->filter(function($payment) use ($month) {
                return Carbon::parse($payment->paid_at)->format('Y-m') === $month->format('Y-m');
            })->sum('amount');
            
            $revenueData[] = [
                'name' => $monthName,
                'revenue' => $monthRevenue
            ];
        }

        return Inertia::render('Seller/Overview', [
            'stats' => $stats,
            'revenueData' => $revenueData
        ]);
    }
}
