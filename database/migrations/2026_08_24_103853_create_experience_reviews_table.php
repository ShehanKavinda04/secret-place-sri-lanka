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
        Schema::create('experience_reviews', function (Blueprint $table) {
            $table->id();
            $table->string('experience_key')->index();
            $table->string('name');
            $table->string('avatar')->nullable();
            $table->integer('rating');
            $table->text('review_text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experience_reviews');
    }
};
