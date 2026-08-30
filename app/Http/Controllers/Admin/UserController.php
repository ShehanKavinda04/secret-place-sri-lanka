<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::orderByDesc('created_at')->paginate(15);
            
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }
}
