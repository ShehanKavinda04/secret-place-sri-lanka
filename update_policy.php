<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$id = 'craft-village-tour';
$policy = \App\Models\ExperiencePolicy::where('experience_key', $id)
            ->where('title', 'Dress Code')
            ->first();
            
if ($policy) {
    $policy->update(['content' => 'UPDATED: Wear a superhero costume for maximum awesomeness!']);
}

$policies = \App\Models\ExperiencePolicy::where('experience_key', $id)->get();
event(new \App\Events\ExperiencePolicyUpdated($id, $policies));
echo "Policy updated and event broadcasted successfully.\n";
