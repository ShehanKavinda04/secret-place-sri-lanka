<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ForgotPasswordController extends Controller
{
    /**
     * Show the Forgot Password Inertia page.
     */
    public function showForm()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * AJAX: Real-time identity existence check (email or phone).
     * Protected by 'account-recovery-lookup' rate limiter.
     */
    public function checkIdentity(Request $request)
    {
        $request->validate(['identity' => 'required|string']);
        $identity = $request->identity;

        $isEmail = filter_var($identity, FILTER_VALIDATE_EMAIL);
        $user = User::where($isEmail ? 'email' : 'phone', $identity)->first();

        return response()->json([
            'found' => (bool) $user,
            'type'  => $isEmail ? 'email' : 'phone',
            'name'  => $user ? explode(' ', $user->name)[0] : null,
        ]);
    }

    /**
     * Send OTP or magic link to the user's email/phone.
     * Protected by 'account-recovery-send' rate limiter.
     */
    public function sendReset(Request $request)
    {
        $request->validate([
            'identity' => 'required|string',
            'method'   => 'required|in:link,email_otp,sms',
        ]);

        $identity = $request->identity;
        $isEmail = filter_var($identity, FILTER_VALIDATE_EMAIL);
        
        $user = User::where($isEmail ? 'email' : 'phone', $identity)->first();

        if (!$user) {
            return response()->json(['error' => true, 'message' => 'Account not found.'], 404);
        }

        // Clean up old OTP records for this identity
        DB::table('password_reset_otps')->where('identity', $identity)->delete();

        if ($request->method === 'email_otp' || $request->method === 'sms') {
            $otp = (string) random_int(100000, 999999);
            $expiresAt = now()->addMinutes(10);

            DB::table('password_reset_otps')->insert([
                'identity'   => $identity,
                'otp_hash'   => Hash::make($otp),
                'method'     => $request->method,
                'expires_at' => $expiresAt,
            ]);

            if ($request->method === 'email_otp') {
                Mail::to($user->email)->send(new ResetPasswordMail($user, 'otp', $otp, null));
            } else {
                // TODO: Integrate actual SMS provider here
                \Log::info("SMS OTP for {$user->phone}: {$otp}");
            }

            $this->log($identity, 'otp_sent', $request->method, $request, $user->id);

            return response()->json([
                'success'    => true,
                'method'     => $request->method,
                'expires_in' => 600, // seconds
            ]);
        }

        // Method: link (always via email)
        $token = Str::random(64);
        $expiresAt = now()->addMinutes(60);

        DB::table('password_reset_otps')->insert([
            'identity'    => $identity,
            'otp_hash'    => Hash::make($token),
            'reset_token' => $token,
            'method'      => 'link',
            'expires_at'  => $expiresAt,
        ]);

        $resetUrl = url('/reset-password?token=' . $token . '&identity=' . urlencode($identity));
        Mail::to($user->email)->send(new ResetPasswordMail($user, 'link', null, $resetUrl));
        $this->log($identity, 'link_sent', 'link', $request, $user->id);

        return response()->json([
            'success' => true,
            'method'  => 'link',
        ]);
    }

    /**
     * Verify the 6-digit OTP entered by the user.
     * Returns a short-lived reset token if valid.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'identity' => 'required|string',
            'otp'      => 'required|digits:6',
        ]);

        $record = DB::table('password_reset_otps')
            ->where('identity', $request->identity)
            ->whereIn('method', ['email_otp', 'sms'])
            ->where('otp_verified', false)
            ->first();

        if (!$record) {
            return response()->json(['error' => true, 'message' => 'No pending OTP found. Please request a new one.'], 422);
        }

        if (now()->isAfter($record->expires_at)) {
            DB::table('password_reset_otps')->where('id', $record->id)->delete();
            return response()->json(['error' => true, 'message' => 'OTP has expired. Please request a new code.'], 422);
        }

        if (!Hash::check($request->otp, $record->otp_hash)) {
            return response()->json(['error' => true, 'message' => 'Invalid OTP code. Please try again.'], 422);
        }

        // OTP valid — issue a short-lived signed reset token
        $resetToken = Str::random(64);

        DB::table('password_reset_otps')
            ->where('id', $record->id)
            ->update([
                'otp_verified' => true,
                'reset_token'  => $resetToken,
                'expires_at'   => now()->addMinutes(15), // 15 minutes to complete reset
            ]);

        $this->log($request->identity, 'otp_verified', $record->method, $request);

        return response()->json([
            'success'      => true,
            'reset_token'  => $resetToken,
        ]);
    }

    /**
     * Show the Reset Password Inertia page (for magic-link flow).
     */
    public function showResetForm(Request $request)
    {
        $token = $request->query('token');
        $identity = $request->query('identity');

        if (!$token || !$identity) {
            return redirect()->route('password.request')->with('error', 'Invalid reset link.');
        }

        // Validate the token exists and is not expired
        $record = DB::table('password_reset_otps')
            ->where('identity', $identity)
            ->where('reset_token', $token)
            ->where('method', 'link')
            ->first();

        if (!$record || now()->isAfter($record->expires_at)) {
            return Inertia::render('Auth/ForgotPassword', [
                'error' => 'This reset link has expired or is invalid. Please request a new one.',
            ]);
        }

        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'identity' => $identity,
        ]);
    }

    /**
     * Perform the actual password reset.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'identity'              => 'required|string',
            'reset_token'           => 'required|string',
            'password'              => [
                'required',
                'min:8',
                'regex:/[A-Z]/',      // must contain uppercase
                'regex:/[0-9]/',      // must contain number
                'regex:/[@$!%*?&#]/', // must contain symbol
                'confirmed',
            ],
        ], [
            'password.regex' => 'Password must contain uppercase, a number, and a special character.',
        ]);

        $identity = $request->identity;
        $isEmail = filter_var($identity, FILTER_VALIDATE_EMAIL);

        // Validate the reset token
        $record = DB::table('password_reset_otps')
            ->where('identity', $identity)
            ->where('reset_token', $request->reset_token)
            ->first();

        if (!$record) {
            return response()->json(['error' => true, 'message' => 'Invalid or expired reset token.'], 422);
        }

        if (now()->isAfter($record->expires_at)) {
            DB::table('password_reset_otps')->where('id', $record->id)->delete();
            return response()->json(['error' => true, 'message' => 'Reset session expired. Please start over.'], 422);
        }

        // For OTP method, token must have been verified
        if (in_array($record->method, ['email_otp', 'sms']) && !$record->otp_verified) {
            return response()->json(['error' => true, 'message' => 'OTP not verified.'], 422);
        }

        $user = User::where($isEmail ? 'email' : 'phone', $identity)->firstOrFail();

        // Update the password
        $user->forceFill([
            'password'       => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();

        // Invalidate all active sessions across devices
        // Must authenticate the user first to use logoutOtherDevices
        Auth::login($user);
        Auth::logoutOtherDevices($request->password);

        // Clean up reset records
        DB::table('password_reset_otps')->where('identity', $identity)->delete();
        // Fallback cleanup if any old default laravel reset tokens exist
        if ($isEmail) {
            DB::table('password_reset_tokens')->where('email', $identity)->delete();
        }

        // Log the success
        $this->log($identity, 'reset_success', $record->method, $request, $user->id);

        // Redirect based on role
        $notifyUrl = match ($user->role) {
            'admin'  => '/admin/dashboard',
            'seller' => '/seller/dashboard',
            default  => '/customer/dashboard',
        };

        return response()->json([
            'success'      => true,
            'redirect'     => '/login',
            'message'      => 'Password reset successfully! All other sessions have been logged out.',
        ]);
    }

    /**
     * Write an audit log entry.
     */
    private function log(string $identity, string $action, ?string $method, Request $request, ?int $userId = null): void
    {
        DB::table('password_reset_logs')->insert([
            'user_id'    => $userId,
            'identity'   => $identity,
            'action'     => $action,
            'method'     => $method,
            'ip_address' => $request->ip(),
            'user_agent' => substr($request->userAgent() ?? '', 0, 500),
        ]);
    }
}
