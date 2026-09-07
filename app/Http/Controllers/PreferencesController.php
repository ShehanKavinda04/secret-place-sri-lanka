<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PreferencesController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'preferred_language' => ['required', 'in:en,si,ta'],
            'preferred_currency' => ['required', 'in:LKR,USD'],
        ]);

        $request->user()->update($validated);

        return response()->json([
            'language' => $request->user()->preferred_language,
            'currency' => $request->user()->preferred_currency,
        ]);
    }
}
