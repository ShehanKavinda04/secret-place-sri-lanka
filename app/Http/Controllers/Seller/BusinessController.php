<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $businesses = $request->user()->businesses()
            ->orderByDesc('created_at')
            ->paginate(15);
            
        return Inertia::render('Seller/Businesses', [
            'businesses' => $businesses
        ]);
    }
}
