<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    Illuminate\Support\Facades\Mail::raw('Test email', function ($msg) { 
        $msg->to('py3hgvbo45m6lvjb@ethereal.email')->subject('Test'); 
    }); 
    echo 'SUCCESS'; 
} catch (\Exception $e) { 
    echo 'ERROR: ' . $e->getMessage(); 
}
