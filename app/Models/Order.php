<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'type', 'details', 'total_amount', 'payment_method', 'payment_details', 'payment_status'
    ];

    protected $casts = [
        'details' => 'array',
        'payment_details' => 'array',
        'total_amount' => 'decimal:2',
    ];
}
