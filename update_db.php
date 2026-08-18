<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Accommodation;
use Illuminate\Support\Facades\DB;

DB::table('accommodations')->truncate();

$anuradhapuraProperties = [
    [
        'name' => 'Ulagalla by Uga Escapes',
        'category' => 'RESORTS',
        'categoryColor' => 'bg-badge-resort text-white',
        'badge' => 'Luxury Heritage',
        'location' => 'Anuradhapura, Sri Lanka',
        'rating' => 4.95,
        'reviews' => 230,
        'distance' => '8.2 km away',
        'price' => 350,
        'image' => '/images/accommodations/ulagalla_resort.jpg',
        'amenities' => json_encode(['wifi', 'pool', 'ac', 'parking', 'spa']),
        'description' => 'A 150-year-old mansion surrounded by a 58-acre estate, offering ultimate privacy and luxury in the heart of the Cultural Triangle.',
        'lat' => 8.216,
        'lng' => 80.490,
        'created_at' => now(),
        'updated_at' => now(),
        'likes' => 0,
        'shares' => 0
    ],
    [
        'name' => 'The Sanctuary at Tissawewa',
        'category' => 'HOTELS',
        'categoryColor' => 'bg-badge-hotel text-white',
        'badge' => 'Colonial Charm',
        'location' => 'Anuradhapura, Sri Lanka',
        'rating' => 4.88,
        'reviews' => 145,
        'distance' => '2.1 km away',
        'price' => 120,
        'image' => '/images/accommodations/sanctuary_tissawewa.jpg',
        'amenities' => json_encode(['wifi', 'ac', 'restaurant']),
        'description' => 'A colonial-era hotel located right on the banks of the ancient Tissa Wewa reservoir, surrounded by lush gardens.',
        'lat' => 8.337,
        'lng' => 80.395,
        'created_at' => now(),
        'updated_at' => now(),
        'likes' => 0,
        'shares' => 0
    ],
    [
        'name' => 'Heritage Hotel Anuradhapura',
        'category' => 'HOTELS',
        'categoryColor' => 'bg-badge-hotel text-white',
        'badge' => 'City Center',
        'location' => 'Anuradhapura, Sri Lanka',
        'rating' => 4.75,
        'reviews' => 310,
        'distance' => '1.5 km away',
        'price' => 85,
        'image' => '/images/accommodations/heritage_hotel.jpg',
        'amenities' => json_encode(['wifi', 'pool', 'ac', 'bar']),
        'description' => 'Modern comfort meets ancient heritage, providing easy access to the sacred city ruins.',
        'lat' => 8.335,
        'lng' => 80.410,
        'created_at' => now(),
        'updated_at' => now(),
        'likes' => 0,
        'shares' => 0
    ],
    [
        'name' => 'Water Garden Forest Villa',
        'category' => 'VILLAS',
        'categoryColor' => 'bg-royalMaroon-800 text-royalGold-400',
        'badge' => 'Eco Luxury',
        'location' => 'Anuradhapura, Sri Lanka',
        'rating' => 4.92,
        'reviews' => 88,
        'distance' => '12.4 km away',
        'price' => 420,
        'image' => '/images/accommodations/water_garden_villa.jpg',
        'amenities' => json_encode(['wifi', 'pool', 'ac', 'butler']),
        'description' => 'A private villa experience nestled in the forest, featuring modern eco-luxury architecture.',
        'lat' => 8.280,
        'lng' => 80.450,
        'created_at' => now(),
        'updated_at' => now(),
        'likes' => 0,
        'shares' => 0
    ],
    [
        'name' => 'Rajarata Palace Hotel',
        'category' => 'HOTELS',
        'categoryColor' => 'bg-badge-hotel text-white',
        'badge' => 'Premium Stay',
        'location' => 'Anuradhapura, Sri Lanka',
        'rating' => 4.81,
        'reviews' => 450,
        'distance' => '3.0 km away',
        'price' => 110,
        'image' => '/images/accommodations/rajarata_palace.jpg',
        'amenities' => json_encode(['wifi', 'pool', 'ac', 'gym']),
        'description' => 'A magnificent hotel designed with inspiration from ancient Anuradhapura architecture.',
        'lat' => 8.320,
        'lng' => 80.405,
        'created_at' => now(),
        'updated_at' => now(),
        'likes' => 0,
        'shares' => 0
    ],
    [
        'name' => 'Lakeview Fine Dining & Retreat',
        'category' => 'FINE DINING',
        'categoryColor' => 'bg-emerald-700 text-emerald-100',
        'badge' => 'Culinary Excellence',
        'location' => 'Anuradhapura, Sri Lanka',
        'rating' => 4.97,
        'reviews' => 195,
        'distance' => '4.5 km away',
        'price' => 180,
        'image' => '/images/accommodations/lakeview_retreat.jpg',
        'amenities' => json_encode(['wifi', 'ac', 'bar', 'valet']),
        'description' => 'An exclusive dining destination and boutique retreat overlooking Nuwara Wewa.',
        'lat' => 8.350,
        'lng' => 80.420,
        'created_at' => now(),
        'updated_at' => now(),
        'likes' => 0,
        'shares' => 0
    ]
];

Accommodation::insert($anuradhapuraProperties);

echo "Updated accommodations for Anuradhapura.\n";
