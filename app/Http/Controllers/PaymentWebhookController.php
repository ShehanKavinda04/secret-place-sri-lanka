<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Booking;

class PaymentWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // 1. Verify Gateway Signature (depends on gateway)
        // This is a placeholder for gateway verification logic
        $gateway = $request->input('gateway', 'unknown');

        $transactionId = $request->input('transaction_id');
        $status = $request->input('status');
        $amount = $request->input('amount');
        $bookingId = $request->input('booking_id');

        // Create or update the Payment model
        $payment = Payment::updateOrCreate(
            ['booking_id' => $bookingId, 'transaction_id' => $transactionId],
            [
                'amount' => $amount,
                'gateway' => $gateway,
                'status' => $status,
                'paid_at' => $status === 'success' ? now() : null,
            ]
        );

        if ($status === 'success') {
            Booking::where('id', $bookingId)->update(['status' => 'confirmed']);
        }

        return response()->json(['status' => 'handled']);
    }
}
