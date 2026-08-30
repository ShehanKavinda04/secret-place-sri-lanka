<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = Payment::with('booking')->orderByDesc('created_at')->paginate(15);
            
        return Inertia::render('Admin/Payments', [
            'payments' => $payments
        ]);
    }
}
