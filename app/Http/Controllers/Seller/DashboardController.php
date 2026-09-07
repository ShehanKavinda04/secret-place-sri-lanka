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

    public function analytics(Request $request)
    {
        $period = $request->string('period', 'week')->toString();
        $period = in_array($period, ['week', 'month', 'ytd'], true) ? $period : 'week';

        $businessIds = $request->user()->businesses()->pluck('id');
        $now = Carbon::now();
        $start = match ($period) {
            'month' => $now->copy()->startOfMonth(),
            'ytd' => $now->copy()->startOfYear(),
            default => $now->copy()->subDays(6)->startOfDay(),
        };

        $payments = Payment::whereHas('booking', function ($query) use ($businessIds) {
                $query->whereIn('business_id', $businessIds);
            })
            ->where('status', 'success')
            ->whereNotNull('paid_at')
            ->where('paid_at', '>=', $start)
            ->get();

        $bookings = Booking::whereIn('business_id', $businessIds)
            ->whereIn('status', ['confirmed', 'completed'])
            ->whereDate('booking_date', '>=', $start)
            ->whereDate('booking_date', '<=', $now)
            ->get();

        $businessCount = max($businessIds->count(), 1);
        $dayCount = max($start->diffInDays($now) + 1, 1);
        $revenue = (float) $payments->sum('amount');
        $bookingCount = $bookings->count();
        $capacity = $businessCount * $dayCount;
        $occupancy = $capacity > 0 ? round(min(($bookingCount / $capacity) * 100, 100), 1) : 0;
        $adr = $bookingCount > 0 ? round($revenue / $bookingCount, 2) : 0;
        $revpar = $capacity > 0 ? round($revenue / $capacity, 2) : 0;

        $chartData = collect(range(0, $period === 'ytd' ? 11 : ($period === 'month' ? 29 : 6)))
            ->map(function ($offset) use ($now, $period, $payments, $bookings, $businessCount) {
                $date = $period === 'ytd'
                    ? $now->copy()->subMonths($offset)->startOfMonth()
                    : $now->copy()->subDays($offset)->startOfDay();
                $dayPayments = $payments->filter(fn ($payment) => $period === 'ytd'
                    ? $payment->paid_at->format('Y-m') === $date->format('Y-m')
                    : $payment->paid_at->isSameDay($date));
                $dayBookings = $bookings->filter(fn ($booking) => $period === 'ytd'
                    ? $booking->booking_date->format('Y-m') === $date->format('Y-m')
                    : $booking->booking_date->isSameDay($date));
                $periodCapacity = $period === 'ytd'
                    ? $businessCount * $date->daysInMonth
                    : $businessCount;

                return [
                    'name' => $period === 'ytd' ? $date->format('M') : ($period === 'week' ? $date->format('D') : $date->format('M j')),
                    'revenue' => (float) $dayPayments->sum('amount'),
                    'occupancy' => $periodCapacity > 0
                        ? round(min(($dayBookings->count() / $periodCapacity) * 100, 100), 1)
                        : 0,
                ];
            })
            ->reverse()
            ->values();

        return response()->json([
            'period' => $period,
            'stats' => [
                'occupancy_rate' => $occupancy,
                'revenue' => $revenue,
                'adr' => $adr,
                'revpar' => $revpar,
                'arrivals' => Booking::whereIn('business_id', $businessIds)
                    ->whereDate('booking_date', $now->toDateString())
                    ->count(),
                'departures' => Booking::whereIn('business_id', $businessIds)
                    ->where('status', 'completed')
                    ->whereDate('updated_at', $now->toDateString())
                    ->count(),
            ],
            'chartData' => $chartData,
            'updatedAt' => $now->toIso8601String(),
        ]);
    }
}
