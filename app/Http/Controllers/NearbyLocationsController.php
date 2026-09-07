<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\SacredSite;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class NearbyLocationsController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'lat' => ['required', 'numeric', 'between:-90,90'],
            'lng' => ['required', 'numeric', 'between:-180,180'],
            'radius_km' => ['nullable', 'numeric', 'gt:0', 'max:200'],
        ]);

        $latitude = (float) $validated['lat'];
        $longitude = (float) $validated['lng'];
        $radius = (float) ($validated['radius_km'] ?? 25);

        $sites = SacredSite::query()
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get()
            ->map(fn (SacredSite $site) => $this->locationResource(
                $site,
                'sacred_site',
                $latitude,
                $longitude,
            ));

        $businesses = Business::query()
            ->approved()
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get()
            ->map(fn (Business $business) => $this->locationResource(
                $business,
                'business',
                $latitude,
                $longitude,
            ));

        $locations = $sites
            ->concat($businesses)
            ->filter(fn (array $location) => $location['distance_km'] <= $radius)
            ->sortBy('distance_km')
            ->values();

        return response()->json([
            'origin' => ['lat' => $latitude, 'lng' => $longitude],
            'radius_km' => $radius,
            'locations' => $locations,
        ]);
    }

    private function locationResource($location, string $type, float $originLatitude, float $originLongitude): array
    {
        $latitude = (float) $location->latitude;
        $longitude = (float) $location->longitude;

        return [
            'id' => $location->id,
            'type' => $type,
            'name' => $location->name,
            'category' => $type === 'business' ? $location->category : $location->category,
            'description' => $location->description,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'distance_km' => round($this->haversine($originLatitude, $originLongitude, $latitude, $longitude), 2),
        ];
    }

    private function haversine(float $latitudeA, float $longitudeA, float $latitudeB, float $longitudeB): float
    {
        $earthRadius = 6371;
        $latitudeDelta = deg2rad($latitudeB - $latitudeA);
        $longitudeDelta = deg2rad($longitudeB - $longitudeA);
        $a = sin($latitudeDelta / 2) ** 2
            + cos(deg2rad($latitudeA)) * cos(deg2rad($latitudeB)) * sin($longitudeDelta / 2) ** 2;

        return 2 * $earthRadius * asin(min(1, sqrt($a)));
    }
}
