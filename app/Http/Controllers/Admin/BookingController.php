<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with(['tourist', 'business']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                // If searching for BKG-123 or #BKG-0002, we extract just the number
                $searchId = preg_replace('/[^0-9]/', '', $search) ?: $search;
                
                // If it's numeric, cast to int to strip leading zeros so "0002" correctly matches ID 2
                if (is_numeric($searchId)) {
                    $searchId = (int)$searchId;
                }
                
                $q->where('id', 'like', "%{$searchId}%")
                  ->orWhereHas('tourist', function($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('business', function($q2) use ($search) {
                      $q2->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('date') && $request->input('date') !== 'all') {
            $date = $request->input('date');
            if ($date === 'today') {
                $query->whereDate('created_at', Carbon::today());
            } elseif ($date === 'last7') {
                $query->where('created_at', '>=', Carbon::now()->subDays(7));
            } elseif ($date === 'last30') {
                $query->where('created_at', '>=', Carbon::now()->subDays(30));
            }
        }

        $bookings = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        $stats = [
            'total' => Booking::count(),
            'confirmed' => Booking::where('status', 'confirmed')->count(),
            'pending' => Booking::where('status', 'pending')->count(),
            'cancelled' => Booking::where('status', 'cancelled')->count(),
            'volume' => Booking::whereIn('status', ['confirmed', 'completed'])->sum('total_amount'),
        ];
            
        return Inertia::render('Admin/Bookings', [
            'bookings' => $bookings,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'date'])
        ]);
    }
}
