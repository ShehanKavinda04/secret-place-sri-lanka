<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportVehicle extends Model
{
    protected $fillable = [
        'type', 'name', 'capacity_desc', 'price', 'price_value', 
        'description', 'features', 'rating', 'image'
    ];

    protected $casts = [
        'features' => 'array',
        'rating' => 'decimal:1',
    ];
}
