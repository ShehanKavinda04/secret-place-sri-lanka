<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExperiencePolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'experience_key',
        'title',
        'content',
    ];
}
