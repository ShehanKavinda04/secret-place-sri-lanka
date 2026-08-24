<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    \Mail::raw('Test', function($msg) {
        $msg->to('test@example.com')->subject('Receipt');
    });
    echo 'Success';
} catch (\Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
