<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Broadcast extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'message',
        'channels',
        'status',
        'target_count',
    ];

    protected $casts = [
        'channels' => 'array',
    ];

    public function logs()
    {
        return $this->hasMany(BroadcastLog::class);
    }
}
