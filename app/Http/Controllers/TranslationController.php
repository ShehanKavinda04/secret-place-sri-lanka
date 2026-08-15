<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslationController extends Controller
{
    public function translate(Request $request)
    {
        $request->validate([
            'text' => 'required|string'
        ]);

        $sinhalaText = trim($request->input('text'));

        try {
            $response = Http::timeout(35)
                ->post('http://127.0.0.1:5001/translate', [
                    'text' => $sinhalaText
                ]);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Translation service error',
                'details' => $response->json()
            ], $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Translation AI service is offline. Please start the Python translation API (python translation_api/api.py).',
                'message' => $e->getMessage()
            ], 503);
        }
    }

    public function status()
    {
        try {
            $response = Http::timeout(5)->get('http://127.0.0.1:5001/health');
            if ($response->successful()) {
                return response()->json($response->json());
            }
            return response()->json(['status' => 'offline', 'model_loaded' => false], 503);
        } catch (\Exception $e) {
            return response()->json(['status' => 'offline', 'model_loaded' => false], 503);
        }
    }
}