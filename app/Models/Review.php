<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = ['accommodation_id', 'name', 'date_string', 'review_text', 'avatar', 'rating'];

    public function accommodation()
    {
        return $this->belongsTo(Accommodation::class);
    }
}
