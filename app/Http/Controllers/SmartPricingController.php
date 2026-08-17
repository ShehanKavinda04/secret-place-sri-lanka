<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class SmartPricingController extends Controller
{
    /**
     * Display the Smart Pricing dashboard.
     */
    public function index()
    {
        return Inertia::render('SmartPricing');
    }

    /**
     * Call the Python AI API for price elasticity prediction.
     */
    public function predict(Request $request)
    {
        $request->validate([
            'price' => 'required|numeric|min:0.1'
        ]);

        try {
            // Ensure the Python AI engine is running on port 5001
            $response = Http::timeout(10)->post('http://127.0.0.1:5001/api/predict-price-elasticity', [
                'price' => $request->input('price')
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'status' => 'error',
                'message' => 'AI Engine returned an error: ' . $response->body()
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not connect to AI Engine. Is it running on port 5001? Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
