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
        Schema::create('experience_locations', function (Blueprint $table) {
            $table->id();
            $table->string('experience_key')->unique();
            $table->text('address');
            $table->decimal('gps_lat', 10, 7);
            $table->decimal('gps_lng', 10, 7);
            $table->text('directions_tuktuk')->nullable();
            $table->text('directions_bus')->nullable();
            $table->text('directions_car')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experience_locations');
    }
};
