<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmationMail;

class CheckoutController extends Controller
{
    public function process(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postalCode' => 'required|string|max:50',
            'phone' => 'required|string|max:50',
            'payment_method' => 'required|in:card,koko',
            'card_holder' => 'required_if:payment_method,card',
            'card_number' => 'required_if:payment_method,card',
            'valid_date' => 'required_if:payment_method,card',
            'cvv' => 'required_if:payment_method,card',
            'item_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ], [
            'card_holder.required_if' => 'Card Holder is required.',
            'card_number.required_if' => 'Card Number is required.',
            'valid_date.required_if' => 'Valid Date is required.',
            'cvv.required_if' => 'CVV is required.',
        ]);

        // Generate unique payment code
        $paymentCode = 'PAY-' . strtoupper(substr(uniqid(), -6));

        // Mock Koko payment processing if selected
        if ($validated['payment_method'] === 'koko') {
            // In a real integration, we would create a Koko session and redirect to their gateway
            // For now, we simulate a successful payment locally.
        }

        // Hardcode product details for the email (would normally come from DB)
        $productList = [
            401 => ['title' => "Traditional Wooden Mask", 'price' => 4500.00],
            402 => ['title' => "Carved Wooden Table", 'price' => 15000.00],
            105 => ['title' => "Stone Carved Elephant", 'price' => 6500.00],
            104 => ['title' => "Lotus Pillar Capital", 'price' => 8000.00],
            201 => ['title' => "Traditional Pan Padura", 'price' => 4500.00],
        ];

        $product = $productList[$validated['item_id']] ?? $productList[401];
        
        $orderData = [
            'payment_code' => $paymentCode,
            'customer' => $validated,
            'product' => $product,
            'quantity' => $validated['quantity'],
            'subtotal' => $product['price'] * $validated['quantity'],
            'shipping' => 500.00,
            'total' => ($product['price'] * $validated['quantity']) + 500.00
        ];

        // Send Email
        Mail::to($validated['email'])->send(new OrderConfirmationMail($orderData));

        return back()->with('success', 'Payment successful! Check your email for the payment code.');
    }
}
