<?php

use Illuminate\Support\Facades\DB;
use App\Models\Accommodation;
use App\Models\AccommodationRoom;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Update Accommodations
$accommodations = Accommodation::all();
$accImages = [
    1 => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Ulagalla
    2 => 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Tissawewa
    3 => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Heritage
    4 => 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Water Garden
    5 => 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Rajarata
    6 => 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Lakeview
];

foreach ($accommodations as $acc) {
    if (isset($accImages[$acc->id])) {
        $acc->image = $accImages[$acc->id];
        $acc->save();
    }
}

// Update Rooms
$rooms = AccommodationRoom::all();
$roomImages = [
    'deluxe' => 'https://images.unsplash.com/photo-1618221118493-9c48aa1010a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Forest Suite
    'villa' => 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Presidential Villa (no ocean)
    'heritage' => 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Heritage Suite
];

foreach ($rooms as $room) {
    if (isset($roomImages[$room->type_key])) {
        $room->image = $roomImages[$room->type_key];
        $room->save();
    }
}

echo "Database images updated to highly accurate curated photos.\n";
