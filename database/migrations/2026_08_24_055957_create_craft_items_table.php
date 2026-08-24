<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('craft_items', function (Blueprint $table) {
            $table->id();
            $table->string('category_key');
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('price');
            $table->decimal('rating', 3, 1)->default(0);
            $table->integer('reviews_count')->default(0);
            $table->text('description');
            $table->json('features');
            $table->string('image');
            $table->json('sub_images');
            $table->string('seller_name');
            $table->string('seller_description');
            $table->string('seller_avatar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('craft_items');
    }
};
