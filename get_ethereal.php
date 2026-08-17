<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$response = Illuminate\Support\Facades\Http::withHeaders([
    'Content-Type' => 'application/json'
])->post('https://api.nodemailer.com/user', ['requestor' => 'my-app', 'version' => '1.0']);
echo $response->body();
