<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$request = Illuminate\Http\Request::create('/checkout/process', 'POST', [
    'email' => 'kavinda20000602@gmail.com', 
    'firstName' => 'John', 
    'lastName' => 'Doe', 
    'address' => '123 Main', 
    'city' => 'Colombo', 
    'postalCode' => '12345', 
    'phone' => '1234567890', 
    'payment_method' => 'card', 
    'card_holder' => 'John', 
    'card_number' => '1234123412341234', 
    'valid_date' => '12/30', 
    'cvv' => '123', 
    'item_id' => 401, 
    'quantity' => 1
]);
$request->headers->set('Accept', 'application/json');

$controller = $app->make(App\Http\Controllers\CheckoutController::class);
try {
    $response = $controller->process($request);
    echo "Status: " . $response->getStatusCode() . "\n";
    if ($response->isRedirect()) {
        echo "Target URL: " . $response->getTargetUrl() . "\n";
        echo "Session errors: " . json_encode(session()->get('errors')) . "\n";
        echo "Session success: " . session()->get('success') . "\n";
    }
} catch (\Illuminate\Validation\ValidationException $e) {
    echo "Validation failed!\n";
    print_r($e->errors());
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
