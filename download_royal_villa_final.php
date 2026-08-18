<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Accommodation;

$dir = public_path('images/accommodations/details');
$accDir = public_path('images/accommodations');

$imagesToDownload = [
    'royal_villa_exterior.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/max500/387000577.jpg?k=413ca89e58b843155f13d7394f247b7f787ef72b1e45fdd0a854c9d8616ca2b2&o=&a=2195102',
    'royal_villa_family_room.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/448x598/389214969.jpg?k=4bed34fadddf422dc827043e82513415705dacb0edfa51cfd91126a4da325c7d&o=',
    'royal_villa_deluxe_room.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/448x598/422687184.jpg?k=dc2b94f7ebbe7b50423f335b04f683533fd3f023f9578782da14e9f6a8b2bc2e&o=',
    'royal_villa_master_bedroom.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/448x598/422696490.jpg?k=7b672a0f4e186f73c393bd7f1ce8c3d41e464696454f695643496fab5a54ce76&o=',
    'royal_villa_garden_patio.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/763369467.webp?k=4c4547f85054a78d4109a2a6fcd6f7a2d5ae43c66128d2907df0ea7fbf7e9d50&o=&a=2195102',
    'royal_villa_pool_lounge.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/872348904.webp?k=f8e7ee8027af5112bdc0231bd9c7d065bc68fcfd5c200b781a285bf4f35a3138&o=&a=2195102',
    'royal_villa_terrace.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/606511776.webp?k=284a25228bd16a957331e3266c0c6db9a3b2bbe1ff45cf3c77e0ffaf4e38ef57&o=&a=2195102',
    'royal_villa_countryside.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/732009962.webp?k=9abf381a7fd2876afb1cc855cbc3c2170de04a0d5456c7959c28f66fb0046224&o=&a=2195102'
];

foreach ($imagesToDownload as $filename => $url) {
    $targetPath = $dir . '/' . $filename;
    echo "Downloading {$filename}...\n";
    $data = @file_get_contents($url);
    if ($data && strlen($data) > 500) {
        file_put_contents($targetPath, $data);
        echo "SUCCESS: Saved {$filename} (" . round(strlen($data)/1024) . " KB)\n";
    } else {
        echo "FAILED for {$filename}\n";
    }
}

// Set main banner photo
if (file_exists($dir . '/royal_villa_pool_lounge.jpg')) {
    copy($dir . '/royal_villa_pool_lounge.jpg', $accDir . '/royal_villa.jpg');
    copy($dir . '/royal_villa_pool_lounge.jpg', $accDir . '/water_garden_villa.jpg');
}

// Update Accommodation ID 4
$acc = Accommodation::find(4);
if ($acc) {
    $acc->name = "Royal Villa Anuradhapura";
    $acc->category = "VILLAS";
    $acc->categoryColor = "bg-badge-villa text-white";
    $acc->badge = "Private Countryside Sanctuary";
    $acc->location = "Airport Road, Anuradhapura, Sri Lanka";
    $acc->address = "600/54 Airport Road, Anuradhapura 50000, Sri Lanka";
    $acc->rating = 4.88;
    $acc->reviews = 142;
    $acc->distance = "5.2 km from Sacred City Center & Wilpattu Highway";
    $acc->price = 55000;
    $acc->image = "/images/accommodations/royal_villa.jpg";
    $acc->description = "Set in a tranquil countryside neighborhood along Airport Road in Anuradhapura, Royal Villa is an exclusive private estate designed for relaxation and peaceful retreats. Featuring elegant air-conditioned suites with private garden terraces, landscaped lawns, 24/7 personal guest service, airport transfer options, and personalized barbecue dinners under the stars.";
    $acc->lat = 8.295951;
    $acc->lng = 80.433476;
    $acc->amenities = ["wifi", "ac", "restaurant", "garden", "terrace", "parking", "shuttle", "bbq"];
    $acc->host_name = "Thilak & Family";
    $acc->host_role = "Estate Owner & Resident Host";
    $acc->host_image = "/images/accommodations/details/royal_villa_host.jpg";
    $acc->response_rate = "100%";
    $acc->response_time = "Within 10 minutes";
    $acc->photos = [
        "/images/accommodations/details/royal_villa_garden_patio.jpg",
        "/images/accommodations/details/royal_villa_deluxe_room.jpg",
        "/images/accommodations/details/royal_villa_master_bedroom.jpg",
        "/images/accommodations/details/royal_villa_family_room.jpg",
        "/images/accommodations/details/royal_villa_terrace.jpg",
        "/images/accommodations/details/royal_villa_countryside.jpg"
    ];
    $acc->rooms = [
        [
            'id' => 'royal_villa_deluxe_double',
            'type_key' => 'royal_villa_deluxe_double',
            'name' => "Royal Deluxe Garden Suite",
            'price' => 55000,
            'bed' => "1 Extra-Large King Bed",
            'cap' => 2,
            'size' => "38 m²",
            'desc' => "Bright and spacious master suite with private balcony, premium posturepedic mattress, modern ensuite bathroom with hot water rainfall shower, work desk, and garden view.",
            'image' => "/images/accommodations/details/royal_villa_deluxe_room.jpg",
            'amenities' => ["Private Balcony", "Air Conditioning", "Rainfall Shower", "Free High-Speed Wi-Fi", "Garden Views"]
        ],
        [
            'id' => 'royal_villa_family_suite',
            'type_key' => 'royal_villa_family_suite',
            'name' => "Grand Royal Family Suite",
            'price' => 78000,
            'bed' => "2 King Beds or 1 King + 2 Twin Beds",
            'cap' => 4,
            'size' => "55 m²",
            'desc' => "Generously proportioned family sanctuary featuring two interconnected sleeping areas, private lounge corner, dining table, tea/coffee station, and expansive terrace access.",
            'image' => "/images/accommodations/details/royal_villa_family_room.jpg",
            'amenities' => ["Family Sleeping Area", "Dining Table", "Private Terrace", "Flat-Screen Satellite TV", "Mini Fridge"]
        ],
        [
            'id' => 'royal_villa_entire_estate',
            'type_key' => 'royal_villa_entire_estate',
            'name' => "Exclusive Full Villa Estate Rental",
            'price' => 165000,
            'bed' => "4 Private En-suite Bedrooms (Sleeps up to 10)",
            'cap' => 10,
            'size' => "280 m²",
            'desc' => "Complete private reservation of the entire Royal Villa estate including all 4 en-suite bedrooms, private garden lawn, outdoor BBQ deck, fully equipped pantry, and 24/7 dedicated butler service.",
            'image' => "/images/accommodations/details/royal_villa_master_bedroom.jpg",
            'amenities' => ["Exclusive Estate Access", "Private Chef & Butler", "BBQ Patio", "Secure Private Parking"]
        ]
    ];
    $acc->save();
    echo "SUCCESSFULLY UPDATED ROYAL VILLA WITH STUNNING PHOTOS!\n";
}
