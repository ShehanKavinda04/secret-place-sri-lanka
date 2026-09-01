<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Business;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class MockDashboardSeeder extends Seeder
{
    public function run()
    {
        // 1. Create a super admin and a generic user
        $admin = User::firstOrCreate(
            ['email' => 'super@sps.lk'],
            ['name' => 'Super Admin', 'password' => Hash::make('password')]
        );
        
        $merchantUser = User::firstOrCreate(
            ['email' => 'merchant@sps.lk'],
            ['name' => 'John The Merchant', 'password' => Hash::make('password')]
        );

        // 2. Create some businesses with pending statuses to populate the Onboarding Hub
        $businesses = [
            ['name' => 'Galle Fort Heritage Stays', 'category' => 'accommodations', 'status' => 'pending', 'price_per_person' => 15000],
            ['name' => 'Kandy Brassworks Co.', 'category' => 'crafts', 'status' => 'pending', 'price_per_person' => 2000],
            ['name' => 'Ella Train Transfers', 'category' => 'transport', 'status' => 'pending', 'price_per_person' => 5000],
            ['name' => 'Sigiriya Eco Resort', 'category' => 'accommodations', 'status' => 'pending', 'price_per_person' => 12000],
            ['name' => 'Ceylon Spice Exports', 'category' => 'crafts', 'status' => 'pending', 'price_per_person' => 3000],
            // Some approved ones to make the KPI charts work
            ['name' => 'Mirissa Surf Camp', 'category' => 'accommodations', 'status' => 'approved', 'price_per_person' => 8000],
            ['name' => 'Colombo Gem Hub', 'category' => 'crafts', 'status' => 'approved', 'price_per_person' => 50000],
        ];

        foreach ($businesses as $bData) {
            $created_at = Carbon::now()->subDays(rand(0, 30));
            Business::create([
                'owner_id' => $merchantUser->id,
                'name' => $bData['name'],
                'category' => $bData['category'],
                'status' => $bData['status'],
                'price_per_person' => $bData['price_per_person'],
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
        }
        
        // Let's also create dummy records in Booking or Order if they exist for other KPIs
        // Depending on what models exist. If Booking exists:
        if (class_exists(\App\Models\Booking::class)) {
            for ($i = 0; $i < 20; $i++) {
                $created_at = Carbon::now()->subDays(rand(0, 180));
                \App\Models\Booking::create([
                    'user_id' => $admin->id,
                    'created_at' => $created_at,
                    'updated_at' => $created_at,
                    // other fields might be required, wrapping in try/catch just in case
                ]);
            }
        }
    }
}
