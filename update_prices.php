<?php

use Illuminate\Support\Facades\DB;
use App\Models\Accommodation;
use App\Models\AccommodationRoom;
use App\Models\LuxuryAddon;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Update Accommodations (multiply current USD price by 300 to approximate LKR)
$accommodations = Accommodation::all();
foreach ($accommodations as $acc) {
    if ($acc->price < 5000) { // Check if it's still in USD
        $acc->price = $acc->price * 300;
        // Optionally round to nearest 1000
        $acc->price = round($acc->price / 1000) * 1000;
        $acc->save();
    }
}

// Update Rooms
$rooms = AccommodationRoom::all();
foreach ($rooms as $room) {
    if ($room->type_key == 'deluxe') $room->price = 120000;
    if ($room->type_key == 'villa') $room->price = 250000;
    if ($room->type_key == 'heritage') $room->price = 180000;
    $room->save();
}

// Update Addons
$addons = LuxuryAddon::all();
foreach ($addons as $addon) {
    if (str_contains($addon->title, 'Helicopter')) {
        $addon->price = 85000;
    } elseif (str_contains($addon->title, 'Tour')) {
        $addon->price = 25000;
    } elseif (str_contains($addon->title, 'Sunset') || str_contains($addon->title, 'Dining')) {
        $addon->price = 40000;
    } elseif (str_contains($addon->title, 'Spa')) {
        $addon->price = 35000;
    } else {
        if ($addon->price < 1000) {
            $addon->price = $addon->price * 300;
        }
    }
    $addon->save();
}

echo "Database prices updated to LKR values.\n";
