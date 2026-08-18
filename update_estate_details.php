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
    $estate->title = "Rajarata Palace Hotel - Royal Sanctuary";
    $estate->description = "Designed by master architects inspired by the ancient Kingdom of Anuradhapura, the Rajarata Palace merges centuries-old heritage with ultra-modern luxury. Enjoy private temple access, champagne sunset terraces overlooking the reservoir, and direct helicopter transfers from Colombo.";
    $estate->host_name = "Anura Dissanayake";
    $estate->host_role = "Chief Estate Host & Concierge";
    // Using a suitable unsplash image for a professional host
    $estate->host_image = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
    $estate->photos = [
        '/images/accommodations/details/gallery_1_bedroom_1787033178413.jpg',
        '/images/accommodations/details/gallery_2_spa_1787033451723.jpg',
        '/images/accommodations/details/gallery_3_courtyard_1787033474585.jpg'
    ];
    $estate->save();
}

// 3. Update LuxuryAddons
$addonsData = [
    1 => [
        'title' => 'Private Helicopter Airport Transfer',
        'desc' => 'Direct fly-in transfer from Colombo Airport (BIA) to our private resort helipad.'
    ],
    2 => [
        'title' => 'Ancient City Private Tour',
        'desc' => 'Guided exploration of Anuradhapura sacred ruins with an archaeology expert and luxury transport.'
    ],
    3 => [
        'title' => 'Lakeview Sunset Dining Excursion',
        'desc' => 'Exclusive private boat dining experience on the Tissa Wewa reservoir at sunset.'
    ],
    4 => [
        'title' => 'Ayurvedic Thermal Spa Pass',
        'desc' => 'Unlimited access to our heritage thermal baths + 90 min deep tissue Ayurvedic therapy.'
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
        'desc' => 'Multi-level private sanctuary with heated infinity plunge pool, traditional wooden architecture, private sauna, and dedicated host.',
        'image' => '/images/accommodations/details/room_2_presidential_1787033866237.jpg',
        'amenities' => ["Private Infinity Pool", "Ayurvedic Sauna", "24/7 Chef Service", "Private Garden Access"]
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
