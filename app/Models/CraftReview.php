<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CraftReview extends Model
{
    use HasFactory;

    protected $fillable = ['craft_item_id', 'reviewer_name', 'rating', 'comment'];

    public function craftItem()
    {
        return $this->belongsTo(CraftItem::class);
    }
}
