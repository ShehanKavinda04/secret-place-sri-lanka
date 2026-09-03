<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::create('/admin/security-logs/export', 'GET');
$controller = app()->make(\App\Http\Controllers\Admin\SecurityLogController::class);
$response = $controller->exportCsv($request);

echo "Headers:\n";
foreach ($response->headers->all() as $key => $values) {
    echo $key . ': ' . implode(', ', $values) . "\n";
}
