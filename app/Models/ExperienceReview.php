<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExperienceReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'experience_key',
        'name',
        'avatar',
        'rating',
        'review_text',
    ];
}
