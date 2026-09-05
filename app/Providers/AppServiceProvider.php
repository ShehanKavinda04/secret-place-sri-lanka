<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use SocialiteProviders\Manager\SocialiteWasCalled;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(function (SocialiteWasCalled $event) {
            $event->extendSocialite('apple', \SocialiteProviders\Apple\Provider::class);
        });

        Vite::prefetch(concurrency: 3);

        RateLimiter::for('account-recovery-lookup', function (Request $request) {
            return Limit::perMinutes(5, 200)->by($request->ip());
        });

        RateLimiter::for('account-recovery-send', function (Request $request) {
            return Limit::perHour(3)->by($request->ip() . '|' . $request->input('identity'));
        });
    }
}
