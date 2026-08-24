<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CraftItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'category_key', 'title', 'subtitle', 'price', 'rating', 'reviews_count', 
        'description', 'features', 'image', 'sub_images', 
        'seller_name', 'seller_description', 'seller_avatar'
    ];

    protected $casts = [
        'features' => 'array',
        'sub_images' => 'array',
        'rating' => 'decimal:1'
    ];

    public function reviews()
    {
        return $this->hasMany(CraftReview::class);
    }
}
