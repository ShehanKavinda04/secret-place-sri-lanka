<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'category',
        'description',
        'city',
        'address',
        'latitude',
        'longitude',
        'contact_phone',
        'contact_email',
        'cover_image_path',
        'price_per_person',
        'status',
    ];

    protected $casts = [
        'price_per_person' => 'decimal:2',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
