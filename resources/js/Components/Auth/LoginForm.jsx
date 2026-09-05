import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Mail, Lock, Eye, EyeOff, CheckSquare, Square, LogIn } from 'lucide-react';

export default function LoginForm({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            {status && (
                <div className="p-3 rounded-lg bg-royalGold-500/10 text-royalMaroon-900 text-sm font-medium border border-royalGold-500/20">
                    {status}
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-5 w-5" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        required
                        className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-royalGold-500 focus:ring-royalGold-500'} rounded-xl text-sm transition-colors`}
                        placeholder="you@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>
                {errors.email && <p className="text-sm text-red-500 font-medium mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                        Password
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-bold text-royalGold-500 hover:text-royalGold-600 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="h-5 w-5" />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        required
                        className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-royalGold-500 focus:ring-royalGold-500'} rounded-xl text-sm transition-colors`}
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 font-medium mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={() => setData('remember', !data.remember)}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
                >
                    {data.remember ? (
                        <CheckSquare className="w-5 h-5 text-royalGold-500" />
                    ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                    )}
                    <span className="font-medium">Remember me for 30 days</span>
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={processing}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-royalMaroon-900 hover:bg-royalMaroon-950 text-royalGold-400 rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-royalMaroon-900/20 mt-4"
            >
                {processing ? (
                    <div className="w-5 h-5 border-2 border-royalGold-400/30 border-t-royalGold-400 rounded-full animate-spin" />
                ) : (
                    <>
                        Sign In Securely <LogIn className="w-4 h-4" />
                    </>
                )}
            </button>

            {/* Social Logins */}
            <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-4 text-slate-500">Or continue with</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                    href={route('social.redirect', { provider: 'google' })}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                    </svg>
                    Google
                </a>
                <a
                    href={route('social.redirect', { provider: 'apple' })}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors focus:outline-none"
                >
                    <svg className="h-5 w-5 text-[#0F172A]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.43.987 3.96.948 1.637-.026 2.62-1.49 3.608-2.943 1.144-1.674 1.614-3.298 1.64-3.385-.035-.013-3.176-1.218-3.21-4.846-.027-3.048 2.493-4.524 2.613-4.598-1.428-2.083-3.633-2.366-4.417-2.428-1.896-.13-3.774 1.137-4.517 1.137zM14.28 4.296c.84-.997 1.408-2.38 1.254-3.755-1.181.046-2.614.77-3.486 1.79-.785.892-1.442 2.316-1.254 3.655 1.316.1 2.637-.68 3.485-1.69z"/>
                    </svg>
                    Apple
                </a>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-bold text-royalGold-500 hover:text-royalGold-600">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </form>
    );
}
