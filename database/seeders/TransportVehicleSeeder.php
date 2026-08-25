<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransportVehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\TransportVehicle::create([
            'type' => 'KDH Van',
            'name' => 'Toyota KDH High Roof - 14 Seater',
            'capacity_desc' => '10-14 passengers',
            'price' => 'LKR 18,000 / day',
            'price_value' => 18000,
            'description' => 'Spacious and comfortable AC van perfect for large family pilgrimage groups. Plenty of luggage space and wide aisles.',
            'features' => ['AC', 'Luggage Carrier', 'Wheelchair Accessible', 'Driver Included'],
            'rating' => 4.9,
            'image' => '/vehicles/kdh_van.jpg',
        ]);

        \App\Models\TransportVehicle::create([
            'type' => 'Tuk-Tuk',
            'name' => 'Atamasthana Tuk-Tuk Sacred Tour',
            'capacity_desc' => '2-3 passengers',
            'price' => 'LKR 4,500 / day',
            'price_value' => 4500,
            'description' => 'Dedicated local driver for an all-day tour covering the Atamasthana with local knowledge of optimal visiting hours.',
            'features' => ['Flexible stops', 'Local Guide', 'Open Air'],
            'rating' => 4.8,
            'image' => '/vehicles/tuk_tuk.jpg',
        ]);

        \App\Models\TransportVehicle::create([
            'type' => 'Car',
            'name' => 'Hybrid Sedan / VIP Cruiser',
            'capacity_desc' => '3-4 passengers',
            'price' => 'LKR 12,000 / day',
            'price_value' => 12000,
            'description' => 'Silent, comfortable hybrid car for small families or couples looking for a premium private transport experience.',
            'features' => ['AC', 'Premium Seats', 'Driver Included', 'Silent Cabin'],
            'rating' => 5.0,
            'image' => '/vehicles/sedan_car.jpg',
        ]);
        
        \App\Models\TransportVehicle::create([
            'type' => 'Bus',
            'name' => 'Luxury AC Coach',
            'capacity_desc' => '29-45 passengers',
            'price' => 'LKR 45,000 / day',
            'price_value' => 45000,
            'description' => 'Perfect for large society or temple organized tours. Reclining seats, onboard TV, and PA system for chanting.',
            'features' => ['AC', 'PA System', 'TV/DVD', 'Luggage Compartments'],
            'rating' => 4.7,
            'image' => '/vehicles/luxury_bus.jpg',
        ]);
    }
}
