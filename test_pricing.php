<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$request = Illuminate\Http\Request::create('/api/smart-pricing/predict', 'POST', [
    'price' => 150
]);
$request->headers->set('Accept', 'application/json');

$controller = $app->make(App\Http\Controllers\SmartPricingController::class);
try {
    $response = $controller->predict($request);
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Body: " . $response->getContent() . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
