<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PilgrimagePackage;

class PilgrimagePackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'package_id' => 'atamasthana-circuit',
                'name' => 'Atamasthana One-Day Circuit',
                'location' => 'Anuradhapura Sacred City',
                'rating' => '4.9',
                'reviews' => '1240',
                'description' => 'A highly optimized, pre-planned transport route linking all 8 main worship sites in the sacred city sequentially to avoid midday heat.',
                'image' => '/images/atamasthana_procession.jpg',
                'href' => '/experience/atamasthana'
            ],
            [
                'package_id' => 'mihintale-sunrise',
                'name' => 'Mihintale Sunrise & Cradle of Buddhism Tour',
                'location' => 'Mihintale & Anuradhapura',
                'rating' => '4.9',
                'reviews' => '980',
                'description' => 'Early morning shuttle and guided walk to Mihintale rock temple to witness the sunrise at the cradle of Sri Lankan Buddhism.',
                'image' => '/images/mihintale_sunrise.jpg',
                'href' => '/experience/mihintale-sunrise'
            ],
            [
                'package_id' => 'ritigala-forest',
                'name' => 'Ritigala & Western Monasteries Circuit',
                'location' => 'Anuradhapura Forest Monastery',
                'rating' => '4.8',
                'reviews' => '640',
                'description' => 'A quiet heritage route focused on ancient meditation monasteries, double-platform structures, and lush forest pathways around Ritigala.',
                'image' => '/images/ritigala_jungle.jpg',
                'href' => '/experience/ritigala-forest'
            ],
            [
                'package_id' => 'tantirimale-temple',
                'name' => 'Tantirimale Sacred Rock Temple Package',
                'location' => 'Tantirimale / Anuradhapura',
                'rating' => '4.7',
                'reviews' => '510',
                'description' => 'Half-day dedicated shuttle service to the historic Tantirimale Rajamaha Viharaya, famous for its ancient samadhi statue and stone carvings.',
                'image' => '/images/tantirimale_buddha.jpg',
                'href' => '/experience/tantirimale'
            ],
            [
                'package_id' => 'heritage-lakes',
                'name' => 'Tissa Wewa & Isurumuniya Sunset Route',
                'location' => 'Anuradhapura Heritage Lakes',
                'rating' => '4.9',
                'reviews' => '1120',
                'description' => 'Late afternoon route covering Isurumuniya Lovers\' rock, Ranmasu Uyana royal gardens, and a peaceful walk along Tissa Wewa bund at sunset.',
                'image' => '/images/tissa_wewa_sunset.jpg',
                'href' => '/experience/heritage-lakes'
            ]
        ];

        foreach ($packages as $pkg) {
            PilgrimagePackage::updateOrCreate(
                ['package_id' => $pkg['package_id']],
                $pkg
            );
        }
    }
}
