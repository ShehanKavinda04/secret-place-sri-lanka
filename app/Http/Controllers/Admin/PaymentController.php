<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['booking.tourist', 'booking.business.owner']);

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

        if ($request->filled('tab') && $request->input('tab') !== 'all') {
            $tab = $request->input('tab');
            if ($tab === 'payouts') {
                $query->where('status', 'success');
            } elseif ($tab === 'refunds') {
                $query->whereIn('status', ['refunded', 'disputed']);
            } elseif ($tab === 'logs') {
                // Just an example, show all or some specific condition
            }
        }

        if ($request->filled('date') && $request->input('date') !== 'all') {
            $date = $request->input('date');
            if ($date === 'this_month') {
                $query->whereMonth('created_at', Carbon::now()->month)
                      ->whereYear('created_at', Carbon::now()->year);
            } elseif ($date === 'last_month') {
                $query->whereMonth('created_at', Carbon::now()->subMonth()->month)
                      ->whereYear('created_at', Carbon::now()->subMonth()->year);
            } elseif ($date === 'this_year') {
                $query->whereYear('created_at', Carbon::now()->year);
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
            'filters' => $request->only(['search', 'gateway', 'status', 'date', 'tab'])
        ]);
    }

    public function exportPdf(Request $request)
    {
        $query = Payment::with(['booking.tourist', 'booking.business.owner']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
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

        if ($request->filled('tab') && $request->input('tab') !== 'all') {
            $tab = $request->input('tab');
            if ($tab === 'payouts') {
                $query->where('status', 'success');
            } elseif ($tab === 'refunds') {
                $query->whereIn('status', ['refunded', 'disputed']);
            }
        }

        if ($request->filled('date') && $request->input('date') !== 'all') {
            $date = $request->input('date');
            if ($date === 'this_month') {
                $query->whereMonth('created_at', Carbon::now()->month)
                      ->whereYear('created_at', Carbon::now()->year);
            } elseif ($date === 'last_month') {
                $query->whereMonth('created_at', Carbon::now()->subMonth()->month)
                      ->whereYear('created_at', Carbon::now()->subMonth()->year);
            } elseif ($date === 'this_year') {
                $query->whereYear('created_at', Carbon::now()->year);
            } elseif ($date === 'last_quarter') {
                $query->where('created_at', '>=', Carbon::now()->subMonths(3));
            }
        }

        $payments = $query->orderByDesc('created_at')->get();

        $grossVolume = Payment::where('status', 'success')->sum('amount');
        $platformEarnings = $grossVolume * 0.05;
        $pendingPayouts = Payment::where('status', 'success')
                            ->where('created_at', '>=', Carbon::now()->subDays(7))
                            ->sum('amount') * 0.95;
        $totalRefunds = Payment::where('status', 'refunded')->sum('amount');

        $html = '
        <div style="font-family: sans-serif; padding: 20px;">
            <h1 style="color: #0f766e; margin-bottom: 5px;">Financial Report</h1>
            <h3 style="color: #64748b; margin-top: 0;">Generated on ' . Carbon::now()->format('Y-m-d H:i:s') . '</h3>
            
            <div style="border-top: 2px solid #e2e8f0; margin: 20px 0;"></div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                    <td style="padding: 10px; border: 1px solid #e2e8f0; background: #f8fafc;">
                        <strong>Total Gross Volume (GMV)</strong><br>
                        LKR ' . number_format($grossVolume, 2) . '
                    </td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0; background: #f8fafc;">
                        <strong>Platform Net Earnings (5%)</strong><br>
                        LKR ' . number_format($platformEarnings, 2) . '
                    </td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0; background: #f8fafc;">
                        <strong>Pending Payouts</strong><br>
                        LKR ' . number_format($pendingPayouts, 2) . '
                    </td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0; background: #f8fafc;">
                        <strong>Total Refunds</strong><br>
                        LKR ' . number_format($totalRefunds, 2) . '
                    </td>
                </tr>
            </table>

            <h2>Transaction Details</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <thead>
                    <tr style="background: #f1f5f9;">
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Transaction ID</th>
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Date</th>
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Gateway</th>
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Gross Amount</th>
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Platform Fee</th>
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">Net Payout</th>
                        <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Status</th>
                    </tr>
                </thead>
                <tbody>';

        foreach ($payments as $payment) {
            $platformFee = $payment->amount * 0.05;
            $netPayout = $payment->amount - $platformFee;
            $statusColor = $payment->status === 'success' ? '#15803d' : ($payment->status === 'refunded' ? '#b45309' : '#b91c1c');
            
            $html .= '<tr>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">' . ($payment->transaction_id ?: 'TXN-'.$payment->id) . '</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">' . $payment->created_at->format('Y-m-d H:i') . '</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">' . ucfirst($payment->gateway) . '</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">' . number_format($payment->amount, 2) . '</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">' . number_format($platformFee, 2) . '</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: right;">' . number_format($netPayout, 2) . '</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; color: ' . $statusColor . '; font-weight: bold;">' . ucfirst($payment->status) . '</td>
            </tr>';
        }

        $html .= '</tbody>
            </table>
        </div>';

        $pdf = Pdf::loadHTML($html);
        return $pdf->download('financial_report_' . Carbon::now()->format('Y-m-d') . '.pdf');
    }
}
