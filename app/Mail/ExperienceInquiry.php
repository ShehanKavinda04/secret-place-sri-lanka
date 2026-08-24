<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ExperienceInquiry extends Mailable
{
    use Queueable, SerializesModels;

    public $inquiry;
    public $experienceTitle;
    public $experienceHost;

    /**
     * Create a new message instance.
     */
    public function __construct($inquiry, $experienceTitle, $experienceHost)
    {
        $this->inquiry = $inquiry;
        $this->experienceTitle = $experienceTitle;
        $this->experienceHost = $experienceHost;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Inquiry: ' . $this->experienceTitle,
            replyTo: [
                new Address($this->inquiry['email'], $this->inquiry['name']),
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.experience_inquiry',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
