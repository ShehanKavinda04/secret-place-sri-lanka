<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(15);
            
        return Inertia::render('Customer/Orders', [
            'orders' => $orders
        ]);
    }
}
