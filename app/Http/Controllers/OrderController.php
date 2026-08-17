<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:accommodation,food',
            'details' => 'required|array',
            'total_amount' => 'required|numeric',
            'payment_method' => 'required|in:koko,card',
            'payment_details' => 'nullable|array',
        ]);

        if ($validated['payment_method'] === 'card' && empty($validated['payment_details'])) {
            return response()->json(['message' => 'Payment details required for card.'], 422);
        }

        $order = Order::create([
            'type' => $validated['type'],
            'details' => $validated['details'],
            'total_amount' => $validated['total_amount'],
            'payment_method' => $validated['payment_method'],
            'payment_details' => $validated['payment_details'],
            'payment_status' => 'success', // Simulated successful payment
        ]);

        return response()->json(['message' => 'Order created successfully', 'order' => $order]);
    }
}
