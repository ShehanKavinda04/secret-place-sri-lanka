<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()->bookings()
            ->with('business')
            ->orderByDesc('created_at')
            ->paginate(15);
            
        return Inertia::render('Customer/Bookings', [
            'bookings' => $bookings
        ]);
    }
}
