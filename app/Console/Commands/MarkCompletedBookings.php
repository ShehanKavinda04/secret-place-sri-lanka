<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use Carbon\Carbon;

class MarkCompletedBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:mark-completed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark confirmed bookings whose booking date has passed as completed';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $count = Booking::where('status', 'confirmed')
            ->where('booking_date', '<', Carbon::today())
            ->update(['status' => 'completed']);
            
        $this->info("Successfully marked {$count} bookings as completed.");
    }
}
