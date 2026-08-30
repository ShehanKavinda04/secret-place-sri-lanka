<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;

class EarningController extends Controller
{
    public function index(Request $request)
    {
        $businessIds = $request->user()->businesses()->pluck('id');
        
        $earnings = Payment::whereHas('booking', function ($q) use ($businessIds) {
                $q->whereIn('business_id', $businessIds);
            })
            ->with('booking')
            ->orderByDesc('paid_at')
            ->paginate(15);
            
        return Inertia::render('Seller/Earnings', [
            'earnings' => $earnings
        ]);
    }
}
