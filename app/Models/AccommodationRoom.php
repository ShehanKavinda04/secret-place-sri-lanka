<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccommodationRoom extends Model
{
    use HasFactory;

    protected $fillable = ['type_key', 'name', 'price', 'bed', 'cap', 'size', 'desc', 'image', 'amenities'];

    protected $casts = [
        'amenities' => 'array',
    ];
}
