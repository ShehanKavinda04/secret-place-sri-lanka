<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Wishlist;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $items = Wishlist::where('user_id', $request->user()->id)
            ->with('accommodation')
            ->orderByDesc('created_at')
            ->paginate(15);
            
        return Inertia::render('Customer/Wishlist', [
            'items' => $items
        ]);
    }
}
