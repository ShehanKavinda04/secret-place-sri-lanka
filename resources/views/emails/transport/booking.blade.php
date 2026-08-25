<x-mail::message>
# Booking Confirmed

Dear {{ $bookingDetails['name'] ?? 'Traveler' }},

Your transport reservation for **{{ $vehicleName }}** has been successfully confirmed!

### Booking Details
- **Booking ID:** {{ $bookingId }}
- **Pickup:** {{ $bookingDetails['pickup'] ?? 'N/A' }}
- **Date:** {{ $bookingDetails['date'] ?? 'N/A' }}
- **Passengers:** {{ $bookingDetails['passengers'] ?? 'N/A' }}
- **Total Amount:** {{ $bookingDetails['totalAmount'] ?? 'LKR 16,500' }}

<x-mail::panel>
### Live Tracking & E-Ticket
Your vehicle will arrive at the designated pickup location 15 minutes prior to departure. You can access your QR E-Ticket and Live Tracking link below.
</x-mail::panel>

<x-mail::button :url="config('app.url') . '/category/transport'">
View Live Tracking
</x-mail::button>

Thank you for choosing Secret Places Sri Lanka for your sacred journey!

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
