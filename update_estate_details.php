<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\EstateDetail;
use App\Models\LuxuryAddon;
use App\Models\AccommodationRoom;

$artifactDir = 'C:\Users\Shehan Kavinda\.gemini\antigravity-ide\brain\a6fcffde-63ce-45f3-b854-3d7c68d1b9cf\\';
$publicDir = __DIR__ . '/public/images/accommodations/details/';

if (!is_dir($publicDir)) {
    mkdir($publicDir, 0777, true);
}

// 1. Copy Images
$imagesToCopy = [
    'gallery_1_bedroom_1787033178413.jpg',
    'gallery_2_spa_1787033451723.jpg',
    'gallery_3_courtyard_1787033474585.jpg',
    'room_1_deluxe_1787033727328.jpg',
    'room_2_presidential_1787033866237.jpg',
    'room_3_heritage_1787034430906.jpg'
];

foreach ($imagesToCopy as $filename) {
    if (file_exists($artifactDir . $filename)) {
        copy($artifactDir . $filename, $publicDir . $filename);
    }
}

// 2. Update EstateDetail
$estate = EstateDetail::first();
if ($estate) {
    $estate->title = "Ulagalla by Uga Escapes - 150-Year Historic Chieftain Sanctuary";
    $estate->description = "Set in a 58-acre estate of verdant paddy fields, lotus canals, and working farmland, Ulagalla centers on a restored 150-year-old chieftain's mansion. Offering 25 ultra-luxurious private pool villas with glass walls, organic Kamathe dining, horseback riding, and world-class Ayurvedic wellness.";
    $estate->host_name = "Uga Estate Chieftain & Naturalist Team";
    $estate->host_role = "Chief Estate Host & Resident Naturalist";
    $estate->host_image = "/images/accommodations/details/ulagalla_host.jpg";
    $estate->photos = [
        '/images/accommodations/details/ulagalla_main_pool.jpg',
        '/images/accommodations/details/ulagalla_villa_exterior.jpg',
        '/images/accommodations/details/ulagalla_villa_bedroom.jpg',
        '/images/accommodations/details/ulagalla_plunge_pool.jpg',
        '/images/accommodations/details/ulagalla_nature_walk.jpg',
        '/images/accommodations/details/ulagalla_kamathe_dining.jpg'
    ];
    $estate->save();
}

// 3. Update LuxuryAddons
$addonsData = [
    1 => [
        'title' => 'Private Helicopter Airport Transfer',
        'desc' => 'Direct fly-in transfer from Colombo Airport (BIA) to Ulagalla private resort helipad.'
    ],
    2 => [
        'title' => 'Ancient Sacred City Private Tour',
        'desc' => 'Guided exploration of Anuradhapura sacred ruins with our resident archaeology naturalist.'
    ],
    3 => [
        'title' => 'Kamathe Organic Farm Dining Excursion',
        'desc' => 'Exclusive private multi-course dinner nestled in the middle of illuminated paddy fields.'
    ],
    4 => [
        'title' => 'Equestrian Trail & Archery Pass',
        'desc' => 'Private horseback riding along the reservoir banks + expert traditional archery session.'
    ]
];

foreach ($addonsData as $id => $data) {
    $addon = LuxuryAddon::find($id);
    if ($addon) {
        $addon->title = $data['title'];
        $addon->desc = $data['desc'];
        $addon->save();
    }
}

// 4. Update Rooms
$roomsData = [
    1 => [
        'name' => 'Deluxe Panorama Forest Suite',
        'desc' => 'Private teakwood balcony with uninhibited views of the lush tropical forest, outdoor jacuzzi, and modern wellness amenities.',
        'image' => '/images/accommodations/details/room_1_deluxe_1787033727328.jpg',
        'amenities' => ["Forest View Balcony", "Outdoor Jacuzzi", "Butler Calling Button", "Ceylon Tea Bar"]
    ],
    2 => [
        'name' => 'Royal Anuradhapura Presidential Villa',
        'desc' => 'Prestigious private sanctuary featuring authentic Anuradhapura architecture, serene landscaped tropical gardens, lavish king-sized master chambers, and dedicated personal butler service.',
        'image' => '/images/accommodations/details/royal_anuradhapura_presidential_villa.jpg',
        'amenities' => ["Private Garden Sanctuary", "King Master Chambers", "24/7 Butler Service", "Ayurvedic Spa Access"]
    ],
    3 => [
        'name' => 'Emerald Heritage Suite',
        'desc' => 'High vaulted wooden ceilings, handcrafted antique furniture, double rainfall stone shower, and private herbal tea garden.',
        'image' => '/images/accommodations/details/room_3_heritage_1787034430906.jpg',
        'amenities' => ["Vaulted Ceilings", "Herbal Tea Garden", "Antique Four-Poster Bed"]
    ]
];

foreach ($roomsData as $id => $data) {
    $room = AccommodationRoom::find($id);
    if ($room) {
        $room->name = $data['name'];
        $room->desc = $data['desc'];
        $room->image = $data['image'];
        $room->amenities = $data['amenities'];
        $room->save();
    }
}

echo "Estate details updated successfully.\n";
