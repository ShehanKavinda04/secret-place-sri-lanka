<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Models\Broadcast;
use App\Models\User;

class ProcessBroadcastDispatch implements ShouldQueue
{
    use Queueable;

    protected $broadcastId;

    /**
     * Create a new job instance.
     */
    public function __construct($broadcastId)
    {
        $this->broadcastId = $broadcastId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $broadcast = Broadcast::find($this->broadcastId);
        if (!$broadcast) return;

        $broadcast->update(['status' => 'processing']);

        $targetCount = 0;

        // Chunking users to handle thousands without memory exhaustion
        User::where('role', 'business_owner')->chunk(100, function ($users) use ($broadcast, &$targetCount) {
            foreach ($users as $user) {
                // Dispatch individual job for each user to handle rate limits and retries per user
                SendUserBroadcast::dispatch($broadcast->id, $user->id);
                $targetCount++;
            }
        });

        $broadcast->update([
            'target_count' => $targetCount,
            'status' => 'completed'
        ]);
    }
}
