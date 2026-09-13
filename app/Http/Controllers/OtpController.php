<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Services\SmsService;

class OtpController extends Controller
{
    protected SmsService $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    /**
     * Send OTP via real SMS gateway API.
     */
    public function send(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string|min:9|max:20',
            'purpose' => 'nullable|string',
            'amount' => 'nullable|numeric',
        ]);

        $rawPhone = $validated['phone'];
        $cleanPhone = preg_replace('/[^0-9+]/', '', $rawPhone);
        $normalizedPhone = $this->smsService->normalizePhoneNumber($rawPhone);

        // Generate cryptographically secure 6-digit numeric OTP
        $otp = strval(random_int(100000, 999999));

        // Cache the OTP for 5 minutes (300 seconds)
        $cacheKey = "koko_otp_" . md5($normalizedPhone);
        Cache::put($cacheKey, $otp, now()->addMinutes(5));

        // Format installment amount if provided
        $amountNote = !empty($validated['amount']) 
            ? " for payment of LKR " . number_format($validated['amount'], 2) 
            : "";

        $message = "Secret Place Sri Lanka: Your Koko BNPL 6-digit authorization code is {$otp}{$amountNote}. Valid for 5 minutes. Do NOT share this code with anyone.";

        // Dispatch via SMS Gateway (Notify.lk / Twilio / Dialog / Logger)
        $smsResult = $this->smsService->sendSms($normalizedPhone, $message);

        // Mask phone for privacy in UI: 076***1139
        $masked = $this->maskPhoneNumber($rawPhone);

        Log::info("OTP generated for {$normalizedPhone} [Hash Key: {$cacheKey}] (OTP: {$otp})");

        return response()->json([
            'success' => true,
            'message' => "A 6-digit verification code has been dispatched to {$masked} via SMS.",
            'phone' => $rawPhone,
            'masked_phone' => $masked,
            'gateway' => $smsResult['gateway'] ?? 'sms',
            'expires_in_seconds' => 300
        ]);
    }

    /**
     * Verify manual OTP input against the server session/cache.
     */
    public function verify(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string|min:4|max:6',
        ]);

        $rawPhone = $validated['phone'];
        $normalizedPhone = $this->smsService->normalizePhoneNumber($rawPhone);
        $inputOtp = trim($validated['otp']);

        $cacheKey = "koko_otp_" . md5($normalizedPhone);
        $cachedOtp = Cache::get($cacheKey);

        if (!$cachedOtp) {
            return response()->json([
                'success' => false,
                'message' => 'OTP has expired or was not requested. Please click "Resend Code" to receive a new SMS.'
            ], 422);
        }

        if ($cachedOtp !== $inputOtp) {
            return response()->json([
                'success' => false,
                'message' => 'The entered OTP code is incorrect. Please check your SMS and try again.'
            ], 422);
        }

        // OTP Verified successfully!
        Cache::forget($cacheKey);
        Cache::put("koko_verified_" . md5($normalizedPhone), true, now()->addMinutes(15));

        Log::info("OTP verified successfully for {$normalizedPhone}");

        return response()->json([
            'success' => true,
            'message' => 'OTP verified successfully. Proceeding with booking reservation.'
        ]);
    }

    /**
     * Helper to mask phone numbers (e.g., 076****139)
     */
    protected function maskPhoneNumber(string $phone): string
    {
        $len = strlen($phone);
        if ($len <= 5) return $phone;
        $start = substr($phone, 0, 3);
        $end = substr($phone, -3);
        return $start . str_repeat('*', max(3, $len - 6)) . $end;
    }
}
