<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $businessIds = $request->user()->businesses()->pluck('id');
        
        $bookings = Booking::whereIn('business_id', $businessIds)
            ->with(['tourist', 'business'])
            ->orderByDesc('created_at')
            ->paginate(15);
            
        return Inertia::render('Seller/Bookings', [
            'bookings' => $bookings
        ]);
    }
}
