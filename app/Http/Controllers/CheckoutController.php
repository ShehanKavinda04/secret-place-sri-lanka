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
            'email' => 'required|email|max:255',
            'firstName' => 'required|string|min:2|max:255',
            'lastName' => 'required|string|min:2|max:255',
            'address' => 'required|string|min:3|max:255',
            'city' => 'required|string|min:2|max:255',
            'postalCode' => 'required|string|min:3|max:50',
            'phone' => ['required', 'string', 'regex:/^(?:0\d{9}|(?:\+94|94)7[0-9]{8}|07[0-9]{8})$/'],
            'payment_method' => 'required|in:card,koko',
            'card_holder' => 'required_if:payment_method,card',
            'card_number' => 'required_if:payment_method,card',
            'valid_date' => 'required_if:payment_method,card',
            'cvv' => 'required_if:payment_method,card',
            'item_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ], [
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'firstName.required' => 'First name is required.',
            'firstName.min' => 'First name must be at least 2 characters.',
            'lastName.required' => 'Last name is required.',
            'lastName.min' => 'Last name must be at least 2 characters.',
            'address.required' => 'Street address is required.',
            'address.min' => 'Street address must be at least 3 characters.',
            'city.required' => 'City is required.',
            'city.min' => 'City must be at least 2 characters.',
            'postalCode.required' => 'Postal code is required.',
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Please enter a valid 10-digit Sri Lankan phone number.',
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

        // Send Order Confirmation Email
        try {
            Mail::to($validated['email'])->send(new OrderConfirmationMail($orderData));
            Log::info('Order confirmation email dispatched successfully to: ' . $validated['email']);
        } catch (\Exception $e) {
            Log::error('Mail sending failed: ' . $e->getMessage());
        }

        return back()->with('success', 'Payment successful! Check your email for your payment receipt & confirmation code.');
    }
}
