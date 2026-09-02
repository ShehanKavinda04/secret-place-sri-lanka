<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$paginator = App\Models\Business::paginate(15);
echo json_encode($paginator->linkCollection()->toArray(), JSON_PRETTY_PRINT);
