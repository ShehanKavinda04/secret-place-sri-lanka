<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $fillable = ['session_id', 'user_id', 'accommodation_id'];

    public function accommodation()
    {
        return $this->belongsTo(Accommodation::class);
    }
}
