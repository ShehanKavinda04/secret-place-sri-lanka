<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperiencePolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\ExperiencePolicy::truncate();

        $policies = [
            [
                'experience_key' => 'craft-village-tour',
                'title' => 'Dress Code',
                'content' => 'We recommend comfortable, loose-fitting cotton clothing suitable for the tropical climate. Modest attire is appreciated when visiting village homes.',
            ],
            [
                'experience_key' => 'craft-village-tour',
                'title' => 'Cancellation Policy',
                'content' => 'Free cancellation up to 24 hours before the experience starts for a full refund. Cancellations within 24 hours are non-refundable.',
            ],
            [
                'experience_key' => 'craft-village-tour',
                'title' => 'Safety Guidelines',
                'content' => 'Safety goggles and aprons will be provided during the hands-on crafting session. Please follow all instructions given by the master artisans when handling tools.',
            ]
        ];

        foreach ($policies as $policy) {
            \App\Models\ExperiencePolicy::create($policy);
        }
    }
}
