<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = new App\Models\User();
$user->name = 'Kavinda';
$user->email = 'kavinda20000602@gmail.com';
$user->password = Illuminate\Support\Facades\Hash::make('password123');
$user->role = 'customer';
$user->save();
echo "User created!\n";
