<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Wishlist;
use Illuminate\Support\Facades\Session;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        $sessionId = Session::getId();

        $wishlists = Wishlist::with('accommodation')
            ->where(function($q) use ($userId, $sessionId) {
                if ($userId) {
                    $q->where('user_id', $userId);
                } else {
                    $q->where('session_id', $sessionId);
                }
            })
            ->get();

        return response()->json($wishlists);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'accommodation_id' => 'required|exists:accommodations,id'
        ]);

        $userId = auth()->id();
        $sessionId = Session::getId();
        $accId = $request->accommodation_id;

        $wishlistQuery = Wishlist::where('accommodation_id', $accId)
            ->where(function($q) use ($userId, $sessionId) {
                if ($userId) {
                    $q->where('user_id', $userId);
                } else {
                    $q->where('session_id', $sessionId);
                }
            });

        if ($wishlistQuery->exists()) {
            $wishlistQuery->delete();
            return response()->json(['status' => 'removed']);
        } else {
            Wishlist::create([
                'user_id' => $userId,
                'session_id' => $sessionId,
                'accommodation_id' => $accId
            ]);
            return response()->json(['status' => 'added']);
        }
    }
}
