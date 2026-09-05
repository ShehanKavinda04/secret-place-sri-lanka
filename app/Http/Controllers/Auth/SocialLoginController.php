<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialLoginController extends Controller
{
    public function redirect(string $provider)
    {
        // Fallback if environment variables are missing
        if (empty(config("services.{$provider}.client_id")) || empty(config("services.{$provider}.client_secret"))) {
            return redirect('/login')->with('status', "The {$provider} login is not configured yet. Please set up OAuth credentials in the .env file.");
        }
        
        return Socialite::driver($provider)->redirect();
    }

    public function callback(string $provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['email' => 'Unable to login using ' . ucfirst($provider) . '. Please try again.']);
        }

        // Find existing user by provider ID
        $user = User::where('provider_id', $socialUser->getId())
                    ->where('provider', $provider)
                    ->first();

        if (!$user) {
            // Find if a user already exists with this email
            $existingUser = User::where('email', $socialUser->getEmail())->first();
            
            if ($existingUser) {
                // Link the social account to the existing user
                $existingUser->update([
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                ]);
                $user = $existingUser;
            } else {
                // Create a new user
                // Google usually provides name, Apple might only provide it on first login.
                $nameParts = explode(' ', $socialUser->getName() ?? 'User');
                $firstName = $nameParts[0];
                $lastName = count($nameParts) > 1 ? end($nameParts) : null;
                
                $user = User::create([
                    'name' => $socialUser->getName() ?? 'User',
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $socialUser->getEmail(),
                    'provider' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'email_verified_at' => now(), // Assume social emails are verified
                    // Set a random password for users created via social login
                    'password' => bcrypt(Str::random(16)), 
                    'role' => 'tourist', // Default role
                ]);
            }
        }

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
