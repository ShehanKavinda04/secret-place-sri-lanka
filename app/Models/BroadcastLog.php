<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BroadcastLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'broadcast_id',
        'user_id',
        'channel',
        'status',
        'error_message',
    ];

    public function broadcast()
    {
        return $this->belongsTo(Broadcast::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
