<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\ExperienceLocation::create([
            'experience_key' => 'craft-village-tour',
            'address' => 'Main Entrance, Kala Grama Cooperative Center, Anuradhapura Surroundings.',
            'gps_lat' => 8.3114,
            'gps_lng' => 80.4037,
            'directions_tuktuk' => 'Approx. 15 mins from Anuradhapura new town (Rs. 500 - 800 / ~$1.67 - $2.67).',
            'directions_bus' => 'Take route 34/2 towards Mihintale, alight at the cooperative junction.',
            'directions_car' => 'Ample free parking available at the visitor center.',
        ]);
    }
}
