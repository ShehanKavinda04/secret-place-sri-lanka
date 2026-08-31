<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::firstOrCreate(
    ['email' => 'host@sps.lk'], 
    ['name' => 'Eco Host', 'password' => bcrypt('password123'), 'email_verified_at' => now(), 'role' => 'business_owner']
);
$user->role = 'business_owner';
$user->save();
echo 'Host user created/updated.';
