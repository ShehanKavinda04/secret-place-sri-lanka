<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ForecastController extends Controller
{
    public function getLiveDemandForecast(Request $request)
    {
        // 1. පරිශීලකයා ඇතුළත් කරන හෝ ඩේටාබේස් එකෙන් ගන්නා සජීවී දත්ත
        $temperature = $request->input('temperature', 28.5);
        $dew_point = $request->input('dew_point', 22.1);
        $is_peak_season = $request->input('is_peak_season', 1);
        $lagged_demand = $request->input('lagged_demand', 450);

        // 2. පසුබිමෙන් දිවෙන Python Flask API එක වෙත දත්ත HTTP POST Request එකක් ලෙස යැවීම
        $response = Http::post('http://127.0.0.1:5001/api/predict-demand', [
            'temperature' => $temperature,
            'dew_point' => $dew_point,
            'is_peak_season' => $is_peak_season,
            'lagged_demand' => $lagged_demand,
        ]);

        // 3. Python AI එකෙන් ලැබෙන පිළිතුර React Frontend එකට හෝ View එකට ලබා දීම
        if ($response->successful()) {
            return response()->json($response->json(), 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to connect with AI Engine'
        ], 500);
    }
}