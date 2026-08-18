<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Accommodation;

$dir = public_path('images/accommodations/details');
$accDir = public_path('images/accommodations');

$imagesToDownload = [
    'rajarata_pool_facade.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/554885278.webp?k=529a78312395af712554443f15ab5c4e4212baa5eced882ad3060bc5aa6f77b3&o=&a=2195102',
    'rajarata_executive_suite.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/838611312.webp?k=8ad5d66af529a4a7e4582feeec3e258e3d46aac00044c139933e0e1f5d2b5d73&o=&a=2195102',
    'rajarata_deluxe_room.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/47045098.webp?k=7b19e0405c6ded0ccbf57b50c6f91789eefefd05d71a2fc6d9a53b9b29664d65&o=&a=2195102',
    'rajarata_pool_deck.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/385724554.webp?k=04d8da3450164b3ae8a7ff6254322679e6f372c26c8817fa21d88d8f5fad7ad5&o=&a=2195102',
    'rajarata_restaurant.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/602435520.webp?k=1aa901b86c5b987920b5e688ff3aa1a510bef450a27f44c2bf6a56d83cba31b5&o=&a=2195102',
    'rajarata_lobby_pillars.jpg' => 'https://q-xx.bstatic.com/xdata/images/hotel/square600/231128281.webp?k=944994b06436053727dbff487f8993788912387f172f65aea11009d7de276e1a&o=&a=2195102',
    'rajarata_host.jpg' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
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

// Copy main banner image
if (file_exists($dir . '/rajarata_pool_facade.jpg')) {
    copy($dir . '/rajarata_pool_facade.jpg', $accDir . '/rajarata_palace.jpg');
}

// Update Accommodation ID 5
$acc = Accommodation::find(5);
if ($acc) {
    $acc->name = "Rajarata Palace Hotel";
    $acc->category = "HOTELS";
    $acc->categoryColor = "bg-badge-hotel text-white";
    $acc->badge = "Kingdom Grandeur";
    $acc->location = "Rowers Park, Anuradhapura, Sri Lanka";
    $acc->address = "Rajarata Hotel, Rowers Park, Anuradhapura 50000, Sri Lanka";
    $acc->rating = 4.85;
    $acc->reviews = 240;
    $acc->distance = "1.8 km from Nuwara Wewa Lake & Mirisawetiya";
    $acc->price = 72000;
    $acc->image = "/images/accommodations/rajarata_palace.jpg";
    $acc->description = "Welcoming guests with majestic royal stone pillars and kingdom architectural elegance, Rajarata Hotel is nestled in 2 acres of serene parkland near the historic Nuwara Wewa tank. Featuring a sprawling outdoor pool with poolside dining, 100 well-appointed luxury rooms with pool view balconies, and signature royal feast banquets reflecting the culinary heritage of ancient kings.";
    $acc->lat = 8.3365;
    $acc->lng = 80.4128;
    $acc->amenities = ["wifi", "pool", "ac", "bar", "restaurant", "parking", "garden", "roomservice"];
    $acc->host_name = "Manjula & Resident Directors";
    $acc->host_role = "General Manager & Executive Resident Host";
    $acc->host_image = "/images/accommodations/details/rajarata_host.jpg";
    $acc->response_rate = "99%";
    $acc->response_time = "Within 5 minutes";
    $acc->photos = [
        "/images/accommodations/details/rajarata_pool_facade.jpg",
        "/images/accommodations/details/rajarata_executive_suite.jpg",
        "/images/accommodations/details/rajarata_pool_deck.jpg",
        "/images/accommodations/details/rajarata_restaurant.jpg",
        "/images/accommodations/details/rajarata_deluxe_room.jpg",
        "/images/accommodations/details/rajarata_lobby_pillars.jpg"
    ];
    $acc->rooms = [
        [
            'id' => 'rajarata_king_dutugemunu_suite',
            'type_key' => 'rajarata_king_dutugemunu_suite',
            'name' => "King Dutugemunu Royal Chamber",
            'price' => 110000,
            'bed' => "1 King Four-Poster Bed + Sitting Saloon",
            'cap' => 2,
            'size' => "60 m²",
            'desc' => "Opulent royal chamber featuring hand-carved stone column accents, private balcony facing the grand swimming pool, deep soaking marble tub, and VIP butler service.",
            'image' => "/images/accommodations/details/rajarata_executive_suite.jpg",
            'amenities' => ["Grand Pool View Balcony", "Stone Carved Pillars", "Marble Soaking Tub", "Complimentary High Tea"]
        ],
        [
            'id' => 'rajarata_deluxe_palace_room',
            'type_key' => 'rajarata_deluxe_palace_room',
            'name' => "Deluxe Poolside Heritage Room",
            'price' => 72000,
            'bed' => "1 King Bed or 2 Twin Beds",
            'cap' => 2,
            'size' => "40 m²",
            'desc' => "Spacious and modern air-conditioned room featuring warm mahogany wood details, sliding glass door leading to private balcony, flat-screen satellite TV, and rainfall glass shower.",
            'image' => "/images/accommodations/details/rajarata_deluxe_room.jpg",
            'amenities' => ["Direct Pool View", "Private Balcony", "Rainfall Glass Shower", "High-Speed Wi-Fi"]
        ],
        [
            'id' => 'rajarata_family_palace_suite',
            'type_key' => 'rajarata_family_palace_suite',
            'name' => "Royal Family Garden Suite",
            'price' => 92000,
            'bed' => "2 King Beds or 1 King + 2 Twin Beds",
            'cap' => 4,
            'size' => "58 m²",
            'desc' => "Ideal for families, featuring two sleeping quarters, spacious lounge space with garden views, tea and coffee maker, and direct ground-level access to the pool promenade.",
            'image' => "/images/accommodations/details/rajarata_pool_deck.jpg",
            'amenities' => ["Family Sleeping Area", "Ground Level Pool Access", "Garden Lounge", "Mini Fridge"]
        ]
    ];
    $acc->addons = [
        [
            'id' => 501,
            'title' => "12-Curry Ancient Kingdom Royal Thali Dinner",
            'desc' => "Authentic royal feast served on brass platters featuring ancient recipes, heirloom grains, lake fish, and traditional sweetmeats.",
            'price' => 14500,
            'icon' => "Coffee"
        ],
        [
            'id' => 502,
            'title' => "Mihintale Sacred Cradle Archaeological Sunset Tour",
            'desc' => "Chauffeured afternoon trip to the sacred mountain of Mihintale, the cradle of Buddhism in Sri Lanka, to witness the sunset over the plains.",
            'price' => 22000,
            'icon' => "Sparkles"
        ],
        [
            'id' => 503,
            'title' => "Nuwara Wewa Lakefront Sunrise Birdwatching Cruise",
            'desc' => "Serene early morning private boat ride on Nuwara Wewa tank spotting endemic waterbirds, fishing eagles, and kingfishers.",
            'price' => 17500,
            'icon' => "Wind"
        ],
        [
            'id' => 504,
            'title' => "Poolside Candlelight Private BBQ Dinner",
            'desc' => "Chef-curated grilled seafood and meat skewers served with vintage wines by the illuminated swimming pool under illuminated palms.",
            'price' => 24000,
            'icon' => "Coffee"
        ]
    ];
    $acc->policy = [
        'check_in_time' => "2:00 PM - Midnight (24-Hour Reception)",
        'check_out_time' => "12:00 PM (Express Check-Out)",
        'guidelines' => [
            "Swimming pool open daily 7:00 AM - 9:00 PM with dedicated lifeguard on duty.",
            "Complimentary secured parking for all tour buses and guest vehicles.",
            "Temple tour and archaeological entry passes available at travel desk."
        ]
    ];
    $acc->save();
    echo "SUCCESS: Updated Accommodation #5 (Rajarata Palace Hotel) with authentic photos and details!\n";
}
