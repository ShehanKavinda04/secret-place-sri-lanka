<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public string $type,      // 'otp' or 'link'
        public ?string $otp,      // The raw 6-digit OTP (only for type=otp)
        public ?string $resetUrl, // The full reset URL (only for type=link)
    ) {}

    public function envelope(): Envelope
    {
        $subject = $this->type === 'otp'
            ? 'Your Password Reset OTP — Secret Place Sri Lanka'
            : 'Reset Your Password — Secret Place Sri Lanka';

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reset_password',
            with: [
                'user'     => $this->user,
                'type'     => $this->type,
                'otp'      => $this->otp,
                'resetUrl' => $this->resetUrl,
                'appName'  => config('app.name', 'Secret Place Sri Lanka'),
            ]
        );
    }
}
