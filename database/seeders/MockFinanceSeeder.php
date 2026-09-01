<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MockFinanceSeeder extends Seeder
{
    public function run()
    {
        $currentMonth = Carbon::now()->startOfMonth();
        
        $userId = DB::table('users')->first()->id ?? 1;
        $businessId = DB::table('businesses')->first()->id ?? 1;

        // Seed Orders (for Merchants)
        for ($i = 0; $i < 20; $i++) {
            $created_at = Carbon::now()->subDays(rand(0, 20));
            $amount = rand(5000, 50000);
            
            DB::table('orders')->insert([
                'type' => 'product',
                'details' => 'Dummy product order',
                'total_amount' => $amount,
                'payment_method' => 'card',
                'payment_status' => 'completed', // Orders use 'completed'
                'created_at' => $created_at,
                'updated_at' => $created_at,
                'user_id' => $userId,
                'session_id' => 'sess_' . rand(1000, 9999)
            ]);
        }
        
        // Seed Bookings and Payments (for Hosts)
        for ($i = 0; $i < 15; $i++) {
            $created_at = Carbon::now()->subDays(rand(0, 20));
            $amount = rand(15000, 150000);
            
            $bookingId = DB::table('bookings')->insertGetId([
                'business_id' => $businessId,
                'tourist_id' => $userId, // Important: uses tourist_id!
                'booking_date' => $created_at->addDays(5)->format('Y-m-d'),
                'number_of_people' => rand(1, 4),
                'total_amount' => $amount,
                'status' => 'confirmed',
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);

            DB::table('payments')->insert([
                'booking_id' => $bookingId,
                'amount' => $amount,
                'currency' => 'LKR',
                'gateway' => 'payhere',
                'status' => 'success', // Payments use 'success' in DB constraint
                'paid_at' => $created_at,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
        }
    }
}
