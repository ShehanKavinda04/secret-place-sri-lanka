<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Accommodation;

$artifactDir = 'C:\Users\Shehan Kavinda\.gemini\antigravity-ide\brain\a6fcffde-63ce-45f3-b854-3d7c68d1b9cf\\';
$publicDir = __DIR__ . '/public/images/accommodations/';

if (!is_dir($publicDir)) {
    mkdir($publicDir, 0777, true);
}

$images = [
    'Ulagalla by Uga Escapes' => 'ulagalla_resort_1787030956005.jpg',
    'The Sanctuary at Tissawewa' => 'sanctuary_tissawewa_1787030998603.jpg',
    'Heritage Hotel Anuradhapura' => 'heritage_hotel_anuradhapura_1787031110747.jpg',
    'Water Garden Forest Villa' => 'water_garden_forest_villa_1787031244942.jpg',
    'Rajarata Palace Hotel' => 'rajarata_palace_hotel_1787031672167.jpg',
    'Lakeview Fine Dining & Retreat' => 'lakeview_fine_dining_1787031959423.jpg'
];

foreach ($images as $name => $filename) {
    $source = $artifactDir . $filename;
    $dest = $publicDir . $filename;
    
    if (file_exists($source)) {
        copy($source, $dest);
        
        $accommodation = Accommodation::where('name', $name)->first();
        if ($accommodation) {
            $accommodation->image = '/images/accommodations/' . $filename;
            $accommodation->save();
            echo "Updated image for $name\n";
        }
    } else {
        echo "Source file not found: $source\n";
    }
}
