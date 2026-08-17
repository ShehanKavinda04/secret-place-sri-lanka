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
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->string('categoryColor');
            $table->string('badge');
            $table->string('location');
            $table->double('rating');
            $table->integer('reviews');
            $table->string('distance');
            $table->integer('price');
            $table->string('image');
            $table->json('amenities');
            $table->text('description');
            $table->double('lat', 10, 6);
            $table->double('lng', 10, 6);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
