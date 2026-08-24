<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function process(Request $request)
    {
        Log::info('Checkout process started', $request->all());

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

        Log::info('Validation passed', $validated);

        // Generate unique payment code
        $paymentCode = 'PAY-' . strtoupper(substr(uniqid(), -6));

        // Save shipping details to the user profile if authenticated
        if ($request->user()) {
            $request->user()->update([
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'postal_code' => $validated['postalCode'],
                'phone' => $validated['phone'],
            ]);
        }

        // Process Koko payment processing if selected
        if ($validated['payment_method'] === 'koko') {
            // In a real integration, we would create a Koko session and redirect to their gateway
            // For now, we simulate a successful payment locally.
            Log::info("Simulating Koko Checkout for: " . $validated['email']);
        } elseif ($validated['payment_method'] === 'card') {
            // Process Card payment processing
            Log::info("Simulating Card Payment for card ending in: " . substr($validated['card_number'] ?? '0000', -4));
        }

        $productModel = \App\Models\CraftItem::findOrFail($validated['item_id']);
        
        $product = [
            'title' => $productModel->title,
            'price' => (float) preg_replace('/[^0-9.]/', '', $productModel->price)
        ];
        
        $orderData = [
            'payment_code' => $paymentCode,
            'customer' => $validated,
            'product' => $product,
            'quantity' => $validated['quantity'],
            'subtotal' => $product['price'] * $validated['quantity'],
            'shipping' => 500.00,
            'total' => ($product['price'] * $validated['quantity']) + 500.00
        ];

        // Queue Email (avoids frontend timeout if SMTP is slow)
        try {
            Mail::to($validated['email'])->queue(new OrderConfirmationMail($orderData));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Mail sending failed: ' . $e->getMessage());
        }

        return back()->with('success', 'Payment successful! Check your email for the payment code.');
    }
}
