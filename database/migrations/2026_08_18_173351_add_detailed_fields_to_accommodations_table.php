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
        Schema::table('accommodations', function (Blueprint $table) {
            $table->string('address')->nullable()->after('location');
            $table->string('host_name')->nullable()->after('description');
            $table->string('host_role')->nullable()->after('host_name');
            $table->string('host_image')->nullable()->after('host_role');
            $table->string('response_rate')->nullable()->default('100%')->after('host_image');
            $table->string('response_time')->nullable()->default('Within 5 minutes')->after('response_rate');
            $table->json('photos')->nullable()->after('image');
            $table->json('rooms')->nullable()->after('photos');
            $table->json('addons')->nullable()->after('rooms');
            $table->json('policy')->nullable()->after('addons');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accommodations', function (Blueprint $table) {
            $table->dropColumn([
                'address',
                'host_name',
                'host_role',
                'host_image',
                'response_rate',
                'response_time',
                'photos',
                'rooms',
                'addons',
                'policy'
            ]);
        });
    }
};
