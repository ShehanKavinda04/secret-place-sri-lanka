<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SacredSite extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];
}
