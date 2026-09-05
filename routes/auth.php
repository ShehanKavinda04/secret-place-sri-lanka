<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\SocialLoginController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // Social Login Routes
    Route::get('auth/{provider}/redirect', [SocialLoginController::class, 'redirect'])
        ->name('social.redirect');
    Route::get('auth/{provider}/callback', [SocialLoginController::class, 'callback'])
        ->name('social.callback');

    // ─── Custom Multi-Step Forgot Password System ────────────────────────────
    Route::get('forgot-password', [ForgotPasswordController::class, 'showForm'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // AJAX: real-time identity existence check (Step 1)
    Route::post('password/check-identity', [ForgotPasswordController::class, 'checkIdentity'])
        ->name('password.check-identity')
        ->middleware('throttle:account-recovery-lookup');

    // Send OTP or magic link (Step 2)
    Route::post('password/send-reset', [ForgotPasswordController::class, 'sendReset'])
        ->name('password.send-reset')
        ->middleware('throttle:account-recovery-send');

    // Verify 6-digit OTP (Step 3)
    Route::post('password/verify-otp', [ForgotPasswordController::class, 'verifyOtp'])
        ->name('password.verify-otp')
        ->middleware('throttle:10,1');

    // Magic-link landing page (GET from email link)
    Route::get('reset-password', [ForgotPasswordController::class, 'showResetForm'])
        ->name('password.reset');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create']);
    Route::post('reset-password', [NewPasswordController::class, 'store']);

    // Perform the actual reset (Step 4 submit)
    Route::post('password/reset', [ForgotPasswordController::class, 'resetPassword'])
        ->name('password.update-custom')
        ->middleware('throttle:5,1');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
