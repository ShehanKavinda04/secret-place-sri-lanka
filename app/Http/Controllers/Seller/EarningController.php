<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Expense;
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

    public function summary(Request $request)
    {
        $user = $request->user();
        $businessIds = $user->businesses()->pluck('id');
        $payments = Payment::whereHas('booking', function ($query) use ($businessIds) {
                $query->whereIn('business_id', $businessIds);
            })
            ->where('status', 'success')
            ->with('booking')
            ->get();
        $grossRevenue = (float) $payments->sum('amount');

        $commission = round($grossRevenue * 0.10, 2);
        $expenses = Expense::where('owner_id', $user->id)->latest('expense_date')->get();
        $expenseTotal = (float) $expenses->sum('amount');

        return response()->json([
            'grossRevenue' => $grossRevenue,
            'commission' => $commission,
            'expenses' => $expenseTotal,
            'netProfit' => round($grossRevenue - $commission - $expenseTotal, 2),
            'revenueBreakdown' => [
                ['name' => 'Direct Bookings', 'value' => (float) $payments->where('gateway', 'payhere')->sum('amount'), 'color' => '#D97706'],
                ['name' => 'Platform Referrals', 'value' => (float) $payments->where('gateway', '!=', 'payhere')->sum('amount'), 'color' => '#1B4D3E'],
            ],
            'expenseRows' => $expenses->map(fn (Expense $expense) => [
                'id' => $expense->id,
                'date' => $expense->expense_date->format('M d'),
                'category' => $expense->category,
                'amount' => (float) $expense->amount,
                'note' => $expense->title,
            ])->values(),
            'updatedAt' => now()->toIso8601String(),
        ]);
    }

    public function storeExpense(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'amount' => ['required', 'numeric', 'min:0'],
            'expense_date' => ['required', 'date'],
        ]);

        Expense::create([...$validated, 'owner_id' => $request->user()->id]);

        return response()->json(['message' => 'Expense saved successfully'], 201);
    }
}
