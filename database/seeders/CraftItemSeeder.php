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
        $json = file_get_contents(__DIR__ . '/crafts_data.json');
        $items = json_decode($json, true);

        foreach ($items as $data) {
            $sellerName = 'Artisan Guild';
            $sellerDesc = 'Passionate artisans bringing generations of craft to your home.';
            if ($data['category_key'] === 'stone-carving-demo' || $data['category_key'] === 'stone-carving') {
                $sellerName = 'Master Stonemasons Guild';
                $sellerDesc = 'Expert stone sculptors dedicated to preserving ancient architecture.';
            } elseif ($data['category_key'] === 'lotus-silk-experience' || $data['category_key'] === 'lotus-fibre-craft') {
                $sellerName = 'Lotus Weavers Co-op';
                $sellerDesc = 'Empowering local women through eco-friendly fabric production.';
            } elseif ($data['category_key'] === 'wood-carving') {
                $sellerName = 'Anuradhapura Woodworks';
            } elseif ($data['category_key'] === 'rajarata-pottery') {
                $sellerName = 'Pottery Shop by Anusha Perera';
            }

            $item = \App\Models\CraftItem::create([
                'id' => $data['id'],
                'category_key' => $data['category_key'],
                'title' => $data['title'],
                'subtitle' => $data['subtitle'],
                'price' => $data['price'],
                'rating' => (float)$data['rating'],
                'reviews_count' => $data['reviewsCount'],
                'description' => $data['description'] ?? 'An exquisite piece of Sri Lankan heritage.',
                'features' => $data['features'] ?? [],
                'image' => $data['image'],
                'sub_images' => $data['subImages'] ?? [$data['image']],
                'seller_name' => $sellerName,
                'seller_description' => $sellerDesc,
                'seller_avatar' => $data['image'],
            ]);

            // Add some dummy reviews
            if ($data['id'] == 101) {
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
            } else {
                $item->reviews()->create([
                    'reviewer_name' => 'Satisfied Customer',
                    'rating' => 5,
                    'comment' => 'Beautiful craftsmanship! Will definitely purchase more items in the future.'
                ]);
            }
        }
    }
}
