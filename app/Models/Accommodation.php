<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'categoryColor', 'badge', 'location', 'address',
        'rating', 'reviews', 'distance', 'price', 'image', 'amenities',
        'description', 'lat', 'lng', 'likes', 'shares',
        'host_name', 'host_role', 'host_image', 'response_rate', 'response_time',
        'photos', 'rooms', 'addons', 'policy'
    ];

    protected $casts = [
        'amenities' => 'array',
        'photos' => 'array',
        'rooms' => 'array',
        'addons' => 'array',
        'policy' => 'array',
    ];
}
