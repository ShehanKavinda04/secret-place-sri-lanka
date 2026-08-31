<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::firstOrCreate(
    ['email' => 'amila@sps.lk'],
    ['name' => 'Amila', 'password' => bcrypt('password')]
);
$user->role = 'admin';
$user->save();

echo "Admin user created successfully.\n";
