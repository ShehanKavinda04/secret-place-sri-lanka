<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class TransportBookingConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public $bookingDetails;
    public $bookingId;
    public $vehicleName;

    /**
     * Create a new message instance.
     */
    public function __construct($bookingDetails)
    {
        $this->bookingDetails = $bookingDetails;
        $this->bookingId = $bookingDetails['bookingId'] ?? '#TRP-' . rand(100000, 999999);
        $this->vehicleName = $bookingDetails['vehicleName'] ?? 'Transport Service';
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Booking Confirmed - ' . $this->vehicleName,
            from: new Address(config('mail.from.address'), config('mail.from.name', 'Secret Places Sri Lanka'))
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.transport.booking',
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
