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
        Schema::create('transport_vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'Van', 'Car', 'Tuk-Tuk', etc.
            $table->string('name');
            $table->string('capacity_desc');
            $table->string('price');
            $table->integer('price_value');
            $table->text('description')->nullable();
            $table->json('features')->nullable();
            $table->decimal('rating', 3, 1)->default(5.0);
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_vehicles');
    }
};
