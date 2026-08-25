<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TransportReview;

class TransportReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'Saman Kumara',
                'date' => 'Oct 2024',
                'rating' => 5,
                'text' => 'The driver for our Atamasthana tour was exceptionally punctual and polite. He knew exactly which temples were less crowded during the morning. The AC van was very clean and comfortable for my elderly parents.',
                'service' => 'Private AC Van - 10 Seater'
            ],
            [
                'name' => 'Meena & Family',
                'date' => 'Nov 2024',
                'rating' => 5,
                'text' => 'We booked a Tuk-Tuk for the day. Our driver was essentially a guide! He explained the history of Abhayagiriya in deep detail. The vehicle felt safe, and they even had an umbrella ready for the sudden rain.',
                'service' => 'Atamasthana Tuk-Tuk Tour'
            ],
            [
                'name' => 'David R.',
                'date' => 'Dec 2024',
                'rating' => 4,
                'text' => 'Great logistics service. The station-to-hotel luggage transfer was a lifesaver. We arrived on the Yal Devi train and headed straight to Sri Maha Bodhi without worrying about our bags.',
                'service' => 'Luggage Transfer & Station Pickup'
            ]
        ];

        foreach ($reviews as $review) {
            TransportReview::create($review);
        }
    }
}
