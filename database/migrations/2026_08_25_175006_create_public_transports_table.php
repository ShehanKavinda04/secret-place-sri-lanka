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
        Schema::create('public_transports', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // train or bus
            $table->string('route');
            $table->string('departure');
            $table->string('arrival');
            $table->string('name');
            $table->string('price');
            $table->string('link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('public_transports');
    }
};
