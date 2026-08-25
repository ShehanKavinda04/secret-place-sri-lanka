<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PublicTransportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $scheduleData = [
            ['type' => 'train', 'route' => 'Colombo Fort → Anuradhapura', 'departure' => '05:45 AM', 'arrival' => '09:30 AM', 'name' => 'Yal Devi (Express)', 'price' => 'Rs. 1,200', 'link' => 'https://seatreservation.railway.gov.lk/cra/'],
            ['type' => 'train', 'route' => 'Kandy → Anuradhapura', 'departure' => '07:00 AM', 'arrival' => '12:15 PM', 'name' => 'Rajarata Rejini', 'price' => 'Rs. 800', 'link' => 'https://seatreservation.railway.gov.lk/cra/'],
            ['type' => 'bus', 'route' => 'Colombo (Pettah) → Anuradhapura', 'departure' => 'Every 30 Mins', 'arrival' => '~ 4.5 Hours', 'name' => 'Route 15 - Super Luxury AC', 'price' => 'Rs. 1,500', 'link' => 'https://sltb.eseat.lk/'],
            ['type' => 'bus', 'route' => 'Mihintale Feeder (Local)', 'departure' => 'Every 20 Mins', 'arrival' => '~ 30 Mins', 'name' => 'CTB Local Route', 'price' => 'Rs. 100', 'link' => null],
        ];

        foreach ($scheduleData as $data) {
            \App\Models\PublicTransport::create($data);
        }
    }
}
