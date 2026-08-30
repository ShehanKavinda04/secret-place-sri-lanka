<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with(['tourist', 'business'])->orderByDesc('created_at')->paginate(15);
            
        return Inertia::render('Admin/Bookings', [
            'bookings' => $bookings
        ]);
    }
}
