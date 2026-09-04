<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('password_reset_otps', function (Blueprint $table) {
            $table->id();
            $table->string('identity')->index(); // Can be email or phone
            $table->string('otp_hash'); // bcrypt hashed 6-digit OTP
            $table->string('reset_token')->nullable(); // signed token issued after OTP verified
            $table->enum('method', ['link', 'sms', 'email_otp'])->default('email_otp');
            $table->boolean('otp_verified')->default(false);
            $table->timestamp('expires_at');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('password_reset_otps');
    }
};
