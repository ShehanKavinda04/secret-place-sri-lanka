<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TranslationController extends Controller
{
    /**
     * Proxy translation request to local Flask Python API running on port 5001
     */
    public function translate(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:1000',
            'src_lang' => 'nullable|string',
            'tgt_lang' => 'nullable|string',
        ]);

        $text = $request->input('text');
        $src_lang = $request->input('src_lang', 'sin_Sinh');
        $tgt_lang = $request->input('tgt_lang', 'eng_Latn');

        try {
            $response = Http::timeout(12)->post('http://127.0.0.1:5001/translate', [
                'text' => $text,
                'src_lang' => $src_lang,
                'tgt_lang' => $tgt_lang,
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
                'error' => 'Translation AI service is offline. Please start the Python translation API (python translation_api/api.py).'
            ], 503);
        }
    }

    /**
     * Check status of local Flask API
     */
    public function status()
    {
        try {
            $response = Http::timeout(3)->get('http://127.0.0.1:5001/health');
            if ($response->successful()) {
                return response()->json($response->json());
            }
        } catch (\Exception $e) {
            // Offline
        }

        return response()->json([
            'status' => 'offline',
            'model_loaded' => false
        ]);
    }
}