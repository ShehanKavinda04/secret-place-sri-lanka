<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sacred_sites', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->default('sacred_site');
            $table->text('description')->nullable();
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->timestamps();
        });

        DB::table('sacred_sites')->insert([
            ['name' => 'Jaya Sri Maha Bodhi', 'category' => 'sacred_site', 'description' => "One of the world's oldest historically documented trees and a living centre of Buddhist heritage.", 'latitude' => 8.3508, 'longitude' => 80.3960, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Ruwanwelisaya', 'category' => 'sacred_site', 'description' => 'A magnificent ancient stupa housing sacred relics in the heart of Anuradhapura.', 'latitude' => 8.3497, 'longitude' => 80.3967, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Thuparamaya', 'category' => 'sacred_site', 'description' => 'The oldest dagoba in Sri Lanka, built to enshrine a sacred relic of the Buddha.', 'latitude' => 8.3550, 'longitude' => 80.3970, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Abhayagiriya', 'category' => 'sacred_site', 'description' => 'A vast ancient monastic complex and centre of Buddhist scholarship.', 'latitude' => 8.3708, 'longitude' => 80.3950, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Jetavanaramaya', 'category' => 'sacred_site', 'description' => 'An architectural masterpiece that was once the tallest stupa in the ancient world.', 'latitude' => 8.3593, 'longitude' => 80.3969, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mirisawetiya Stupa', 'category' => 'sacred_site', 'description' => 'A revered stupa built by King Dutugemunu beside the ancient royal precinct.', 'latitude' => 8.3444, 'longitude' => 80.3966, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lankarama', 'category' => 'sacred_site', 'description' => 'An ancient stupa surrounded by monolithic stone pillars and forest ruins.', 'latitude' => 8.3692, 'longitude' => 80.4003, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lovamahaprasada', 'category' => 'sacred_site', 'description' => 'The Brazen Palace, once a grand multistoried monastery with hundreds of pillars.', 'latitude' => 8.3516, 'longitude' => 80.3980, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Isurumuniya Rajamaha Viharaya', 'category' => 'sacred_site', 'description' => 'A beautiful rock temple famous for its ancient stone carvings.', 'latitude' => 8.3409, 'longitude' => 80.3920, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Vessagiriya', 'category' => 'sacred_site', 'description' => 'An ancient forest monastery where monks meditated among serene rock caves.', 'latitude' => 8.3375, 'longitude' => 80.3886, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sri Maha Bodhi Malu Vihara', 'category' => 'sacred_site', 'description' => 'A peaceful temple complex surrounding the sacred Bodhi tree.', 'latitude' => 8.3499, 'longitude' => 80.3961, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mihintale', 'category' => 'sacred_site', 'description' => 'The sacred mountain where Buddhism was introduced to Sri Lanka.', 'latitude' => 8.3500, 'longitude' => 80.5100, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('sacred_sites');
    }
};
