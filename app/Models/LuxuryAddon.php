<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LuxuryAddon extends Model
{
    use HasFactory;
    
    protected $fillable = ['icon', 'title', 'price', 'desc'];
}
