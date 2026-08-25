<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicTransport extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'route',
        'departure',
        'arrival',
        'name',
        'price',
        'link'
    ];
}
