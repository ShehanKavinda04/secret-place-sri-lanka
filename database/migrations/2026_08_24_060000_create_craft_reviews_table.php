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
        Schema::create('craft_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('craft_item_id')->constrained('craft_items')->onDelete('cascade');
            $table->string('reviewer_name');
            $table->integer('rating')->default(5);
            $table->text('comment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('craft_reviews');
    }
};
