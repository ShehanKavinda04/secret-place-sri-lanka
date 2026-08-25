<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PublicTransportController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\PublicTransport::all());
    }
}
