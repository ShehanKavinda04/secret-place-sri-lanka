<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = \App\Models\Role::create(['name' => 'Admin', 'slug' => 'admin']);
        $sellerRole = \App\Models\Role::create(['name' => 'Seller', 'slug' => 'business_owner']);
        $customerRole = \App\Models\Role::create(['name' => 'Customer', 'slug' => 'tourist']);

        \App\Models\User::create([
            'name' => 'System Admin',
            'email' => 'admin@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin12345'),
            'role_id' => $adminRole->id,
            'email_verified_at' => now(),
        ]);

        \App\Models\User::create([
            'name' => 'Demo Seller',
            'email' => 'seller@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('seller12345'),
            'role_id' => $sellerRole->id,
            'email_verified_at' => now(),
        ]);

        \App\Models\User::create([
            'name' => 'Demo Customer',
            'email' => 'user@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('user12345'),
            'role_id' => $customerRole->id,
            'email_verified_at' => now(),
        ]);
    }
}
