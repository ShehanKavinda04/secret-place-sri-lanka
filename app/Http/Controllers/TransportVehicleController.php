<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransportVehicleController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\TransportVehicle::query();

        if ($request->has('type') && $request->type !== 'Any Vehicle') {
            $query->where('type', $request->type);
        }

        return response()->json($query->get());
    }
}
