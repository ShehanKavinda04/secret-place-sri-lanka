<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('preferred_language', 2)->default('en')->after('phone');
            $table->string('preferred_currency', 3)->default('LKR')->after('preferred_language');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['preferred_language', 'preferred_currency']);
        });
    }
};
