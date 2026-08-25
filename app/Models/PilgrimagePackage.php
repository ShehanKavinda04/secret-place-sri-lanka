<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PilgrimagePackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'name',
        'location',
        'rating',
        'reviews',
        'description',
        'image',
        'href',
    ];
}
