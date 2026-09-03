<?php
$req = Illuminate\Http\Request::create('/admin/payments/export-pdf', 'GET');
$ctrl = new App\Http\Controllers\Admin\PaymentController();
$res = $ctrl->exportPdf($req);
print_r($res->headers->all());
echo "\nContent-Length: " . strlen($res->getContent()) . "\n";
