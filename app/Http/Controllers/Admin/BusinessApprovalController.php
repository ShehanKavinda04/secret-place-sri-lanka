<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Business;

class BusinessApprovalController extends Controller
{
    public function index(Request $request)
    {
        $businesses = Business::with('owner')->orderByDesc('created_at')->paginate(15);
            
        return Inertia::render('Admin/Businesses', [
            'businesses' => $businesses
        ]);
    }
}
