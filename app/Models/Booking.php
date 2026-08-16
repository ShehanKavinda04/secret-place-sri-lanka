<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_id',
        'tourist_id',
        'booking_date',
        'number_of_people',
        'special_notes',
        'total_amount',
        'status',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function tourist()
    {
        return $this->belongsTo(User::class, 'tourist_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
