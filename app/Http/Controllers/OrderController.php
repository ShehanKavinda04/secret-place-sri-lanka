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
        // Normalize payload inconsistencies from frontend
        if ($request->has('total_amount') && !$request->has('amount')) {
            $request->merge(['amount' => $request->input('total_amount')]);
        }
        
        $details = $request->input('details', []);
        if (isset($details['accommodation_id']) && !isset($details['accommodationId'])) {
            $details['accommodationId'] = $details['accommodation_id'];
        }
        
        $paymentDetails = $request->input('payment_details');
        if (isset($details['paymentInfo']) && !$paymentDetails) {
            $paymentDetails = $details['paymentInfo'];
        }
        $request->merge([
            'details' => $details,
            'payment_details' => $paymentDetails
        ]);

        $validated = $request->validate([
            'type' => 'required|in:accommodation,food',
            'details' => 'required|array',
            'details.accommodationId' => 'required_if:type,accommodation|integer',
            'details.roomType' => 'required_if:type,accommodation|string',
            'details.checkIn' => 'required_if:type,accommodation|date',
            'details.checkOut' => 'required_if:type,accommodation|date|after:details.checkIn',
            'amount' => 'required|numeric',
            'payment_method' => 'required|in:koko,card',
            'payment_details' => 'nullable',
        ]);

        if ($validated['payment_method'] === 'card' && empty($validated['payment_details'])) {
            return response()->json(['message' => 'Payment details required for card.'], 422);
        }

        if ($validated['type'] === 'accommodation') {
            $checkIn = $validated['details']['checkIn'];
            $checkOut = $validated['details']['checkOut'];
            $accommodationId = $validated['details']['accommodationId'];
            $roomType = $validated['details']['roomType'];

            // Availability Check
            $overlappingOrder = Order::where('type', 'accommodation')
                ->where(function($q) use ($accommodationId) {
                    $q->where('details->accommodationId', $accommodationId)
                      ->orWhere('details->accommodation_id', $accommodationId);
                })
                ->where('details->roomType', $roomType)
                ->where(function ($query) use ($checkIn, $checkOut) {
                    $query->where('details->checkIn', '<', $checkOut)
                          ->where('details->checkOut', '>', $checkIn);
                })
                ->first();

            if ($overlappingOrder) {
                return response()->json([
                    'message' => 'The selected room is already booked for these dates.'
                ], 409);
            }
        }

        $order = Order::create([
            'session_id' => Session::getId(),
            'user_id' => auth()->id(),
            'type' => $validated['type'],
            'details' => $validated['details'],
            'total_amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'payment_details' => $validated['payment_details'],
            'payment_status' => 'success', // Simulated successful payment
        ]);

        return response()->json(['message' => 'Order created successfully', 'order' => $order]);
    }
}
