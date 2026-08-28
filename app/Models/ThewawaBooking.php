<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThewawaBooking extends Model
{
    protected $fillable = [
        'reference',
        'spot_id',
        'spot_name',
        'puja_type',
        'booking_date',
        'name',
        'email',
        'phone',
        'amount',
        'currency',
        'payment_method',
        'transaction_id',
        'status',
        'paid_at',
    ];

    protected $casts = [
        'booking_date' => 'date:Y-m-d',
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];
}
