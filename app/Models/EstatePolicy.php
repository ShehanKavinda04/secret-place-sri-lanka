<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstatePolicy extends Model
{
    use HasFactory;
    
    protected $fillable = ['check_in_time', 'check_out_time', 'guidelines'];

    protected $casts = [
        'guidelines' => 'array',
    ];
}
