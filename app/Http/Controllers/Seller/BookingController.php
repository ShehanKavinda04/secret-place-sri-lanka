<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $businessIds = $request->user()->businesses()->pluck('id');
        
        $bookings = Booking::whereIn('business_id', $businessIds)
            ->with(['tourist', 'business'])
            ->orderByDesc('created_at')
            ->paginate(15);
            
        return Inertia::render('Seller/Bookings', [
            'bookings' => $bookings
        ]);
    }

    public function apiIndex(Request $request)
    {
        $businessIds = $request->user()->businesses()->pluck('id');
        $search = trim($request->string('search')->toString());
        $status = $request->string('status')->toString();

        $query = Booking::whereIn('business_id', $businessIds)
            ->with(['tourist', 'business', 'payment'])
            ->orderByDesc('created_at');

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($search !== '') {
            $query->where(function ($bookingQuery) use ($search) {
                $bookingQuery
                    ->where('id', $search)
                    ->orWhereHas('tourist', function ($touristQuery) use ($search) {
                        $touristQuery
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%")
                            ->orWhere('phone', 'like', "%{$search}%");
                    });
            });
        }

        $bookings = $query->get()
            ->map(fn (Booking $booking) => $this->serializeBooking($booking));

        return response()->json([
            'data' => $bookings,
            'updatedAt' => now()->toIso8601String(),
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        abort_unless($request->user()->businesses()->whereKey($booking->business_id)->exists(), 403);

        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,completed,cancelled'],
        ]);

        $booking->update(['status' => $validated['status']]);

        return response()->json([
            'data' => $this->serializeBooking($booking->fresh(['tourist', 'business', 'payment'])),
        ]);
    }

    private function serializeBooking(Booking $booking): array
    {
        $checkIn = Carbon::parse($booking->booking_date);
        $paymentStatus = $booking->payment?->status === 'success'
            ? 'paid'
            : ($booking->payment?->status ?? 'pending');

        return [
            'id' => (string) $booking->id,
            'host_id' => (string) $booking->business?->owner_id,
            'property_id' => (string) $booking->business_id,
            'property_name' => $booking->business?->name ?? 'Property',
            'guest_name' => $booking->tourist?->name ?? 'Guest',
            'guest_email' => $booking->tourist?->email ?? '',
            'guest_phone' => $booking->tourist?->phone ?? '',
            'guest_country' => $booking->tourist?->country_code ?? '',
            'check_in_date' => $checkIn->toDateString(),
            'check_out_date' => $checkIn->copy()->addDay()->toDateString(),
            'guests_count' => $booking->number_of_people,
            'special_requests' => $booking->special_notes,
            'total_price_lkr' => (float) $booking->total_amount,
            'total_price_usd' => null,
            'payment_method' => $booking->payment?->payment_method ?? 'pending',
            'payment_status' => $paymentStatus,
            'booking_status' => $booking->status,
            'created_at' => $booking->created_at?->toIso8601String(),
            'updated_at' => $booking->updated_at?->toIso8601String(),
        ];
    }
}
