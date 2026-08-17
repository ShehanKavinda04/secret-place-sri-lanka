<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category', 'categoryColor', 'badge', 'location', 'rating', 'reviews', 'distance', 'price', 'image', 'amenities', 'description', 'lat', 'lng', 'likes', 'shares'];

    protected $casts = [
        'amenities' => 'array',
    ];
}
