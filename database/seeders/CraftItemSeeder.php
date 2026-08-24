<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CraftItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $item = \App\Models\CraftItem::create([
            'id' => 101,
            'category_key' => 'wood-carving',
            'title' => 'Traditional Wooden Mask',
            'subtitle' => 'Hand-carved and painted mask, depicting ancient Sri Lankan folklore.',
            'price' => 'Rs. 4,500.00',
            'rating' => 4.8,
            'reviews_count' => 124,
            'description' => 'This exquisite traditional wooden mask is hand-carved by master artisans in Anuradhapura using locally sourced Kaduru wood. These masks are historically used in healing rituals (Kolam and Thovil) and traditional dances. Each vibrant color is carefully applied by hand, representing different characters from Sri Lankan mythology. It serves as a beautiful wall hanging that brings cultural heritage and protection into your home.',
            'features' => [
                'Hand-carved from sustainable Kaduru wood',
                'Painted with traditional, vibrant colors',
                'Dimensions: 14" x 8" x 4"',
                'Ready to hang with an attached loop on the back'
            ],
            'image' => '/images/woodcraft.png',
            'sub_images' => [
                '/images/woodcraft.png',
                '/images/crafts/stone_elephant.png',
                '/images/crafts/pillar.png',
                '/images/crafts/guardstone.png'
            ],
            'seller_name' => 'Anuradhapura Woodworks',
            'seller_description' => 'Passionate artisans bringing generations of craft to your home.',
            'seller_avatar' => '/images/woodcraft.png',
        ]);

        $item->reviews()->create([
            'reviewer_name' => 'Nimali Perera',
            'rating' => 5,
            'comment' => 'Absolutely stunning! The craftsmanship is incredible, and it looks even more beautiful in person. Arrived safely packaged.'
        ]);

        $item->reviews()->create([
            'reviewer_name' => 'Rajiv de Silva',
            'rating' => 4,
            'comment' => 'A lovely piece of art. My only minor issue was that the color was slightly different from the photos, but I still love it.'
        ]);
    }
}
