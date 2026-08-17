<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstateDetail extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'host_name', 'host_image', 'host_role', 'response_rate', 'response_time', 'photos'];

    protected $casts = [
        'photos' => 'array',
    ];
}
