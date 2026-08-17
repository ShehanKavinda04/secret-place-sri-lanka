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
        Schema::create('estate_details', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('host_name');
            $table->string('host_image');
            $table->string('host_role');
            $table->string('response_rate');
            $table->string('response_time');
            $table->json('photos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estate_details');
    }
};
