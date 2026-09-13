<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ExperienceAvailabilityUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $experienceKey;
    public string $bookingDate;
    public string $timeSlot;
    public int $remainingSlots;
    public int $bookedSlots;
    public array $latestBooking;

    /**
     * Create a new event instance.
     */
    public function __construct(
        string $experienceKey,
        string $bookingDate,
        string $timeSlot,
        int $remainingSlots,
        int $bookedSlots,
        array $latestBooking = []
    ) {
        $this->experienceKey = $experienceKey;
        $this->bookingDate = $bookingDate;
        $this->timeSlot = $timeSlot;
        $this->remainingSlots = $remainingSlots;
        $this->bookedSlots = $bookedSlots;
        $this->latestBooking = $latestBooking;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('experience-availability.' . $this->experienceKey),
            new Channel('operations-channel'),
        ];
    }
}
