<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Business;
use App\Models\User;
use App\Events\ExperienceAvailabilityUpdated;
use App\Events\OperationsUpdated;
use App\Http\Controllers\Admin\DashboardController;

class ExperienceBookingController extends Controller
{
    /**
     * Experience default capacities
     */
    private array $capacities = [
        'craft-village-tour' => 10,
        'pottery-workshop' => 8,
        'handloom-experience' => 12,
        'culinary-walk' => 6,
        'stone-carving-demo' => 8,
        'atamasthana' => 15,
        'mihintale' => 15,
    ];

    /**
     * Experience Host mapping
     */
    private array $experienceHosts = [
        'craft-village-tour' => ['name' => 'Rajarata Craftsmen Cooperative', 'category' => 'crafts'],
        'pottery-workshop' => ['name' => 'Anuradhapura Potters Guild', 'category' => 'crafts'],
        'handloom-experience' => ['name' => 'Rajarata Women\'s Weaving Coop', 'category' => 'crafts'],
        'culinary-walk' => ['name' => 'Mihintale Heritage Kitchen', 'category' => 'crafts'],
        'stone-carving-demo' => ['name' => 'Anuradhapura Stonemasons', 'category' => 'crafts'],
        'atamasthana' => ['name' => 'Anuradhapura Transport Coop', 'category' => 'transport'],
        'mihintale' => ['name' => 'Heritage Travels', 'category' => 'transport'],
    ];

    /**
     * Get real-time availability for an experience on a specific date
     */
    public function getAvailability(Request $request, string $experienceKey)
    {
        $date = $request->query('date', now()->toDateString());
        $maxCapacity = $this->capacities[$experienceKey] ?? 10;

        // Query bookings for this experience on this date
        $bookings = Booking::whereDate('booking_date', $date)
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($experienceKey) {
                $q->where('special_notes', 'like', "%[Experience: {$experienceKey}]%")
                  ->orWhere('special_notes', 'like', "%{$experienceKey}%");
            })
            ->get();

        $morningBooked = 0;
        $afternoonBooked = 0;

        foreach ($bookings as $b) {
            if (str_contains($b->special_notes ?? '', 'Morning Session') || str_contains($b->special_notes ?? '', '9:00 AM')) {
                $morningBooked += (int) $b->number_of_people;
            } elseif (str_contains($b->special_notes ?? '', 'Afternoon Session') || str_contains($b->special_notes ?? '', '2:00 PM')) {
                $afternoonBooked += (int) $b->number_of_people;
            } else {
                $morningBooked += (int) $b->number_of_people;
            }
        }

        $morningRemaining = max(0, $maxCapacity - $morningBooked);
        $afternoonRemaining = max(0, $maxCapacity - $afternoonBooked);

        return response()->json([
            'experience_key' => $experienceKey,
            'date' => $date,
            'capacity' => $maxCapacity,
            'slots' => [
                '9:00 AM (Morning Session)' => [
                    'capacity' => $maxCapacity,
                    'booked' => $morningBooked,
                    'remaining' => $morningRemaining,
                    'is_available' => $morningRemaining > 0,
                ],
                '2:00 PM (Afternoon Session)' => [
                    'capacity' => $maxCapacity,
                    'booked' => $afternoonBooked,
                    'remaining' => $afternoonRemaining,
                    'is_available' => $afternoonRemaining > 0,
                ],
            ],
            'total_bookings_count' => $bookings->count(),
            'synced_at' => now()->toIso8601String(),
        ]);
    }

    /**
     * Process experience booking and payment transaction
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'experience_key' => 'required|string',
            'experience_title' => 'required|string|max:255',
            'booking_date' => 'required|date',
            'time_slot' => 'required|string',
            'adults' => 'required|integer|min:1',
            'children' => 'nullable|integer|min:0',
            'total_amount' => 'required|numeric|min:1',
            'currency' => 'required|string|in:USD,LKR',
            'customer_name' => 'required|string|min:2|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => ['required', 'string', 'regex:/^(?:0\d{9}|(?:\+94|94)7[0-9]{8}|07[0-9]{8}|\+?[0-9\s\-()]{7,20})$/'],
            'special_requests' => 'nullable|string|max:1000',
            'payment_method' => 'required|in:card,lankaqr,koko,bank',
            
            // Card specific fields
            'card_holder' => 'required_if:payment_method,card|nullable|string|min:2|max:255',
            'card_number' => 'required_if:payment_method,card|nullable|string',
            'expiry_date' => 'required_if:payment_method,card|nullable|string',
            'cvv' => 'required_if:payment_method,card|nullable|string',
            'card_brand' => 'nullable|string',
        ]);

        $experienceKey = $validated['experience_key'];
        $adults = (int) $validated['adults'];
        $children = (int) ($validated['children'] ?? 0);
        $totalGuests = $adults + $children;

        try {
            $result = DB::transaction(function () use ($validated, $experienceKey, $adults, $children, $totalGuests, $request) {
                // 1. Resolve or create host Business
                $hostMeta = $this->experienceHosts[$experienceKey] ?? ['name' => 'Rajarata Craftsmen Cooperative', 'category' => 'crafts'];
                $business = Business::firstOrCreate(
                    ['name' => $hostMeta['name']],
                    [
                        'owner_id' => $request->user()?->id ?? User::first()?->id ?? 1,
                        'category' => $hostMeta['category'],
                        'status' => 'approved',
                        'price_per_person' => $validated['total_amount'] / max(1, $totalGuests),
                        'latitude' => 8.3114,
                        'longitude' => 80.4037,
                    ]
                );

                // 2. Resolve tourist user
                $tourist = $request->user();
                if (!$tourist) {
                    $tourist = User::firstOrCreate(
                        ['email' => $validated['customer_email']],
                        [
                            'name' => $validated['customer_name'],
                            'phone' => $validated['customer_phone'],
                            'password' => bcrypt(Str::random(16)),
                            'role_id' => 1, // tourist
                        ]
                    );
                } else {
                    if (empty($tourist->phone) && !empty($validated['customer_phone'])) {
                        $tourist->update(['phone' => $validated['customer_phone']]);
                    }
                }

                // 3. Create Booking record
                $bookingRef = 'BK-EXP-' . strtoupper(Str::random(6));
                $specialNotes = "[Experience: {$experienceKey}] Title: {$validated['experience_title']} | Slot: {$validated['time_slot']} | Guests: {$adults} Adults, {$children} Children | Contact: {$validated['customer_phone']}" . 
                    (!empty($validated['special_requests']) ? " | Requests: {$validated['special_requests']}" : "") . 
                    " | Ref: {$bookingRef}";

                $booking = Booking::create([
                    'business_id' => $business->id,
                    'tourist_id' => $tourist->id,
                    'booking_date' => $validated['booking_date'],
                    'number_of_people' => $totalGuests,
                    'special_notes' => $specialNotes,
                    'total_amount' => $validated['total_amount'],
                    'status' => 'confirmed',
                ]);

                // 4. Create Payment Transaction record
                $cleanCardLast4 = '0000';
                if (!empty($validated['card_number'])) {
                    $raw = preg_replace('/\D/', '', $validated['card_number']);
                    $cleanCardLast4 = substr($raw, -4) ?: '0000';
                }

                $paymentMethodLabel = match ($validated['payment_method']) {
                    'card' => ($validated['card_brand'] ? ucfirst($validated['card_brand']) . ' ' : 'Credit/Debit ') . 'Card ending in ' . $cleanCardLast4,
                    'lankaqr' => 'LankaQR Instant Transfer',
                    'koko' => 'Koko Pay-in-3 Installments',
                    'bank' => 'Commercial Bank Direct Transfer',
                    default => 'Online Gateway',
                };

                $gatewayType = match ($validated['payment_method']) {
                    'card' => 'payhere',
                    'lankaqr' => 'lankaqr',
                    default => 'stripe',
                };

                $transactionId = 'TXN-' . date('Ymd') . '-' . strtoupper(Str::random(6));

                $payment = Payment::create([
                    'booking_id' => $booking->id,
                    'amount' => $validated['total_amount'],
                    'currency' => $validated['currency'],
                    'gateway' => $gatewayType,
                    'transaction_id' => $transactionId,
                    'payment_method' => $paymentMethodLabel,
                    'status' => 'success',
                    'paid_at' => now(),
                ]);

                // 5. Calculate remaining capacity for real-time WebSocket sync
                $maxCapacity = $this->capacities[$experienceKey] ?? 10;
                $dayBookings = Booking::whereDate('booking_date', $validated['booking_date'])
                    ->where('status', '!=', 'cancelled')
                    ->where(function ($q) use ($experienceKey) {
                        $q->where('special_notes', 'like', "%[Experience: {$experienceKey}]%")
                          ->orWhere('special_notes', 'like', "%{$experienceKey}%");
                    })
                    ->get();

                $slotBooked = 0;
                foreach ($dayBookings as $b) {
                    if (str_contains($b->special_notes ?? '', $validated['time_slot'])) {
                        $slotBooked += (int) $b->number_of_people;
                    }
                }
                $remainingSlots = max(0, $maxCapacity - $slotBooked);

                // 6. Broadcast Real-time Event via WebSockets / Echo
                $latestBookingPayload = [
                    'id' => $booking->id,
                    'booking_reference' => $bookingRef,
                    'guest_name' => $tourist->name,
                    'guests_count' => $totalGuests,
                    'booking_date' => $validated['booking_date'],
                    'time_slot' => $validated['time_slot'],
                    'total_amount' => $validated['total_amount'],
                    'currency' => $validated['currency'],
                    'payment_status' => 'success',
                    'transaction_id' => $transactionId,
                    'created_at' => now()->toIso8601String(),
                ];

                try {
                    event(new ExperienceAvailabilityUpdated(
                        $experienceKey,
                        $validated['booking_date'],
                        $validated['time_slot'],
                        $remainingSlots,
                        $slotBooked,
                        $latestBookingPayload
                    ));

                    // Also update admin operations if available
                    if (class_exists(DashboardController::class) && method_exists(DashboardController::class, 'getOperationsData')) {
                        event(new OperationsUpdated(DashboardController::getOperationsData()));
                    }
                } catch (\Throwable $broadcastException) {
                    Log::warning('Broadcast server connection warning: ' . $broadcastException->getMessage());
                }

                return [
                    'booking' => $booking,
                    'payment' => $payment,
                    'booking_reference' => $bookingRef,
                    'transaction_id' => $transactionId,
                    'remaining_slots' => $remainingSlots,
                    'business_name' => $business->name,
                    'guest_name' => $tourist->name,
                    'guest_email' => $tourist->email,
                    'receipt' => [
                        'booking_id' => $booking->id,
                        'reference' => $bookingRef,
                        'transaction_id' => $transactionId,
                        'experience' => $validated['experience_title'],
                        'host' => $business->name,
                        'date' => $validated['booking_date'],
                        'time_slot' => $validated['time_slot'],
                        'guests' => "{$adults} Adults" . ($children > 0 ? ", {$children} Children" : ""),
                        'total_amount' => $validated['total_amount'],
                        'currency' => $validated['currency'],
                        'payment_method' => $paymentMethodLabel,
                        'paid_at' => now()->format('M d, Y h:i A'),
                        'status' => 'CONFIRMED & PAID',
                    ]
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Payment processed successfully! Your experience reservation is confirmed.',
                'data' => $result,
            ]);

        } catch (\Exception $e) {
            Log::error('Experience booking error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to process booking and payment: ' . $e->getMessage(),
            ], 500);
        }
    }
}
