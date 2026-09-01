<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Models\Broadcast;
use App\Models\BroadcastLog;
use App\Models\User;
use App\Notifications\GlobalPlatformBroadcast;
use Illuminate\Support\Facades\Log;

class SendUserBroadcast implements ShouldQueue
{
    use Queueable;

    public $tries = 3;
    public $backoff = [10, 30, 60];

    protected $broadcastId;
    protected $userId;

    /**
     * Create a new job instance.
     */
    public function __construct($broadcastId, $userId)
    {
        $this->broadcastId = $broadcastId;
        $this->userId = $userId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $broadcast = Broadcast::find($this->broadcastId);
        $user = User::find($this->userId);

        if (!$broadcast || !$user) return;

        foreach ($broadcast->channels as $channel) {
            // Check if log already exists and was sent (to prevent duplicate on retries)
            $existingLog = BroadcastLog::where('broadcast_id', $broadcast->id)
                ->where('user_id', $user->id)
                ->where('channel', $channel)
                ->first();
                
            if ($existingLog && $existingLog->status === 'sent') continue;

            $log = $existingLog ?? BroadcastLog::create([
                'broadcast_id' => $broadcast->id,
                'user_id' => $user->id,
                'channel' => $channel,
                'status' => 'pending'
            ]);

            try {
                if ($channel === 'email') {
                    $user->notify(new GlobalPlatformBroadcast($broadcast));
                } elseif ($channel === 'sms') {
                    // Simulate Twilio
                    Log::channel('single')->info("Sending SMS to {$user->phone}: {$broadcast->subject}");
                } elseif ($channel === 'push') {
                    // Simulate Firebase Push
                    Log::channel('single')->info("Sending Push to User {$user->id}: {$broadcast->subject}");
                }

                $log->update(['status' => 'sent']);

            } catch (\Exception $e) {
                $log->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage()
                ]);
                throw $e; // Trigger Laravel retry backoff
            }
        }
    }
}
