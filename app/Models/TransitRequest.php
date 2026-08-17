<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransitRequest extends Model
{
    protected $fillable = ['accommodation_id', 'transit_method', 'status'];
}
