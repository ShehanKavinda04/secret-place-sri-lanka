<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExperienceLocation extends Model
{
    protected $fillable = [
        'experience_key',
        'address',
        'gps_lat',
        'gps_lng',
        'directions_tuktuk',
        'directions_bus',
        'directions_car',
    ];
}
