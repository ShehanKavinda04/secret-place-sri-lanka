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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'accommodation' or 'food'
            $table->json('details');
            $table->decimal('total_amount', 10, 2);
            $table->string('payment_method'); // 'koko', 'card', etc.
            $table->json('payment_details')->nullable(); // card holder, last 4 digits etc.
            $table->string('payment_status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
