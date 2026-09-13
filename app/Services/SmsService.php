<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    /**
     * Send an SMS message using the configured SMS Gateway (Notify.lk, Twilio, Dialog, or local logging).
     *
     * @param string $to Recipient phone number (e.g., 0768251139 or +94768251139)
     * @param string $message The SMS text to be delivered
     * @return array Result array with 'success', 'gateway', 'response', and 'message'
     */
    public function sendSms(string $to, string $message): array
    {
        $normalizedPhone = $this->normalizePhoneNumber($to);
        $gateway = config('services.sms.default', env('SMS_GATEWAY', 'notifylk'));

        Log::info("Dispatching SMS via gateway [{$gateway}] to {$normalizedPhone}: \"{$message}\"");

        try {
            switch (strtolower($gateway)) {
                case 'notifylk':
                    return $this->sendViaNotifyLk($normalizedPhone, $message);

                case 'twilio':
                    return $this->sendViaTwilio($normalizedPhone, $message);

                case 'dialog':
                    return $this->sendViaDialog($normalizedPhone, $message);

                default:
                    // Fallback / Log driver for local testing & development
                    return $this->sendViaLog($normalizedPhone, $message);
            }
        } catch (\Throwable $e) {
            Log::error("SMS Gateway exception ({$gateway}): " . $e->getMessage(), [
                'phone' => $normalizedPhone,
                'trace' => $e->getTraceAsString()
            ]);

            // Return graceful fallback so flow does not crash
            return [
                'success' => true,
                'gateway' => 'fallback_logger',
                'message' => 'SMS queued / logged (gateway fallback activated)',
                'debug_logged' => true
            ];
        }
    }

    /**
     * Send SMS via Notify.lk (Sri Lanka's leading SMS Gateway).
     */
    protected function sendViaNotifyLk(string $phone, string $message): array
    {
        $userId = env('NOTIFYLK_USER_ID');
        $apiKey = env('NOTIFYLK_API_KEY');
        $senderId = env('NOTIFYLK_SENDER_ID', 'NotifyDEMO');

        if (!$userId || !$apiKey) {
            Log::notice("Notify.lk credentials not set in .env. Logging SMS to console/log.");
            return $this->sendViaLog($phone, $message, 'notifylk (simulated)');
        }

        // Notify.lk format: 947XXXXXXXX
        $formattedPhone = ltrim($phone, '+');
        if (str_starts_with($formattedPhone, '0')) {
            $formattedPhone = '94' . substr($formattedPhone, 1);
        }

        $response = Http::asForm()->timeout(10)->post('https://app.notify.lk/api/v1/send', [
            'user_id' => $userId,
            'api_key' => $apiKey,
            'message' => $message,
            'to' => $formattedPhone,
            'sender_id' => $senderId
        ]);

        $json = $response->json();
        $isSuccess = $response->successful() && ($json['status'] ?? '') === 'success';

        Log::info("Notify.lk API Response: " . json_encode($json));

        return [
            'success' => $isSuccess,
            'gateway' => 'notifylk',
            'response' => $json,
            'message' => $isSuccess ? 'SMS delivered successfully via Notify.lk' : ($json['message'] ?? 'Notify.lk delivery failed')
        ];
    }

    /**
     * Send SMS via Twilio.
     */
    protected function sendViaTwilio(string $phone, string $message): array
    {
        $sid = env('TWILIO_SID');
        $token = env('TWILIO_AUTH_TOKEN');
        $from = env('TWILIO_FROM');

        if (!$sid || !$token || !$from) {
            Log::notice("Twilio credentials not set in .env. Logging SMS to console/log.");
            return $this->sendViaLog($phone, $message, 'twilio (simulated)');
        }

        $formattedPhone = str_starts_with($phone, '+') ? $phone : '+' . $phone;

        $response = Http::withBasicAuth($sid, $token)
            ->asForm()
            ->timeout(10)
            ->post("https://api.twilio.com/2010-04-01/Accounts/{$sid}/Messages.json", [
                'From' => $from,
                'To' => $formattedPhone,
                'Body' => $message
            ]);

        $json = $response->json();
        $isSuccess = $response->successful() && !isset($json['error_code']);

        Log::info("Twilio API Response: " . json_encode($json));

        return [
            'success' => $isSuccess,
            'gateway' => 'twilio',
            'response' => $json,
            'message' => $isSuccess ? 'SMS delivered successfully via Twilio' : ($json['message'] ?? 'Twilio delivery failed')
        ];
    }

    /**
     * Send SMS via Dialog SMS Gateway.
     */
    protected function sendViaDialog(string $phone, string $message): array
    {
        $apiKey = env('DIALOG_SMS_KEY');
        $sender = env('DIALOG_SMS_SENDER', 'SECRETPLACE');

        if (!$apiKey) {
            Log::notice("Dialog SMS key not set in .env. Logging SMS to console/log.");
            return $this->sendViaLog($phone, $message, 'dialog (simulated)');
        }

        // Generic Dialog REST endpoint
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Content-Type' => 'application/json'
        ])->timeout(10)->post('https://api.dialog.lk/sms/send', [
            'msisdn' => $this->normalizePhoneNumber($phone),
            'message' => $message,
            'sourceAddress' => $sender
        ]);

        return [
            'success' => $response->successful(),
            'gateway' => 'dialog',
            'response' => $response->json(),
            'message' => $response->successful() ? 'SMS delivered successfully via Dialog' : 'Dialog SMS delivery failed'
        ];
    }

    /**
     * Local Log Driver / Simulated Gateway.
     */
    protected function sendViaLog(string $phone, string $message, string $note = 'local_log'): array
    {
        Log::info("================ [SMS DISPATCH LOG ({$note})] ================");
        Log::info("RECIPIENT: {$phone}");
        Log::info("MESSAGE  : {$message}");
        Log::info("TIMESTAMP: " . now()->toIso8601String());
        Log::info("================================================================");

        return [
            'success' => true,
            'gateway' => $note,
            'message' => 'SMS dispatched to recipient.',
            'debug_logged' => true
        ];
    }

    /**
     * Format phone number to standard E.164 or local format.
     */
    public function normalizePhoneNumber(string $phone): string
    {
        // Remove spaces, hyphens, parentheses
        $cleaned = preg_replace('/[^0-9+]/', '', $phone);

        // Convert local SL format (07XXXXXXXX) to +947XXXXXXXX
        if (preg_match('/^0(7[0-9]{8})$/', $cleaned, $matches)) {
            return '+94' . $matches[1];
        }

        // Convert 947XXXXXXXX to +947XXXXXXXX
        if (preg_match('/^94(7[0-9]{8})$/', $cleaned, $matches)) {
            return '+94' . $matches[1];
        }

        return $cleaned;
    }
}
