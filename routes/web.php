<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about-us', function () {
    return Inertia::render('AboutUs', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/places', function () {
    return Inertia::render('Places', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/places/{id}/history', function ($id) {
    // Mock Data for the History view
    $mockSpot = [
        'id' => $id,
        'name' => 'Jaya Sri Maha Bodhi',
        'image' => '/images/jaya_sri_maha_bodhi.png',
        'topic' => 'The oldest historically documented tree in the world, serving as the living heartbeat of Sri Lankan Buddhism.',
        'history_narrative' => 'The Jaya Sri Maha Bodhi is a sacred fig tree located in the Mahamewna Gardens, Anuradhapura, Sri Lanka. It is a sapling from the historical Sri Maha Bodhi at Bodh Gaya in India under which Buddha attained Enlightenment. It was planted in 288 BC, and is the oldest living human-planted tree in the world with a known planting date. It was brought to Sri Lanka by Sangamitta Theri, the daughter of Emperor Asoka.',
        'blueprint_text' => 'The sacred tree is planted on a high terrace about 6.5 meters (21.3 ft) above the ground and surrounded by railings. The wall was constructed during the reign of King Kirthi Sri Rajasingha to protect it from wild elephants. Multiple smaller bodhi trees known as "Parivara Bodhi" surround the central sacred tree.',
        'blueprint_image' => '/images/jaya_sri_maha_bodhi_blueprint.jpg' // Place holder image or assume it exists/will fail gracefully
    ];

    return Inertia::render('History', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'spot' => $mockSpot
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
