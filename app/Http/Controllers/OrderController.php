<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        $sessionId = Session::getId();

        $orders = Order::where(function($q) use ($userId, $sessionId) {
                if ($userId) {
                    $q->where('user_id', $userId);
                } else {
                    $q->where('session_id', $sessionId);
                }
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

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
            'session_id' => Session::getId(),
            'user_id' => auth()->id(),
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
