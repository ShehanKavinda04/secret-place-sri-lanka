<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;
use Carbon\Carbon;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['booking.tourist', 'booking.business']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                // If searching for TXN-123, we extract just the number for transaction_id or id
                $searchId = preg_replace('/[^0-9A-Za-z]/', '', $search);
                
                $q->where('transaction_id', 'like', "%{$searchId}%")
                  ->orWhere('id', 'like', "%{$searchId}%")
                  ->orWhereHas('booking', function($q2) use ($search) {
                      $q2->whereHas('tourist', function($q3) use ($search) {
                          $q3->where('name', 'like', "%{$search}%");
                      })
                      ->orWhereHas('business', function($q3) use ($search) {
                          $q3->where('name', 'like', "%{$search}%");
                      });
                  });
            });
        }

        if ($request->filled('gateway') && $request->input('gateway') !== 'all') {
            $query->where('gateway', $request->input('gateway'));
        }

        if ($request->filled('status') && $request->input('status') !== 'all') {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('date') && $request->input('date') !== 'all') {
            $date = $request->input('date');
            if ($date === 'this_month') {
                $query->whereMonth('created_at', Carbon::now()->month)
                      ->whereYear('created_at', Carbon::now()->year);
            } elseif ($date === 'last_quarter') {
                $query->where('created_at', '>=', Carbon::now()->subMonths(3));
            }
        }

        $payments = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        // Calculate KPI Metrics
        $grossVolume = Payment::where('status', 'success')->sum('amount');
        $platformEarnings = $grossVolume * 0.05; // 5% fee
        // Simulate pending payouts (successful payments from last 7 days)
        $pendingPayouts = Payment::where('status', 'success')
                            ->where('created_at', '>=', Carbon::now()->subDays(7))
                            ->sum('amount') * 0.95;
        $totalRefunds = Payment::where('status', 'refunded')->sum('amount');

        $stats = [
            'grossVolume' => $grossVolume,
            'platformEarnings' => $platformEarnings,
            'pendingPayouts' => $pendingPayouts,
            'totalRefunds' => $totalRefunds,
        ];
            
        return Inertia::render('Admin/Payments', [
            'payments' => $payments,
            'stats' => $stats,
            'filters' => $request->only(['search', 'gateway', 'status', 'date'])
        ]);
    }
}
