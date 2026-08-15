<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslationController extends Controller
{
    public function translate(Request $request)
    {
        $request->validate([
            'text' => 'required|string'
        ]);

        $sinhalaText = $request->input('text');

        $response = \Illuminate\Support\Facades\Http::timeout(30)
            ->post('http://127.0.0.1:5001/translate', [
                'text' => $sinhalaText
            ]);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Translation service eka available na'], 500);
    }
}