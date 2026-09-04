import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2 } from 'lucide-react';

export default function CustomerRegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const strength = Math.min((data.password.length / 12) * 100, 100);
    const strengthColor = strength < 40 ? 'bg-red-500' : strength < 80 ? 'bg-[#D97706]' : 'bg-[#1B4D3E]';
    const strengthText = strength === 0 ? '' : strength < 40 ? 'Weak' : strength < 80 ? 'Fair' : 'Strong';

    return (
        <form onSubmit={submit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                    Full Name
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="h-5 w-5" />
                    </div>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        required
                        className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]'} rounded-xl text-sm transition-colors`}
                        placeholder="John Doe"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>
                {errors.name && <p className="text-sm text-red-500 font-medium mt-1">{errors.name}</p>}
            </div>

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
                        className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]'} rounded-xl text-sm transition-colors`}
                        placeholder="you@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>
                {errors.email && <p className="text-sm text-red-500 font-medium mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="h-5 w-5" />
                    </div>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        required
                        className={`block w-full pl-11 pr-12 py-3 bg-slate-50 border ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]'} rounded-xl text-sm transition-colors`}
                        placeholder="Create a strong password"
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
                
                {/* Password Strength Indicator */}
                {data.password && (
                    <div className="pt-1">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-slate-500">Password strength</span>
                            <span className={`text-xs font-bold ${strength < 40 ? 'text-red-500' : strength < 80 ? 'text-[#D97706]' : 'text-[#1B4D3E]'}`}>
                                {strengthText}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${strength}%` }}></div>
                        </div>
                    </div>
                )}
                {errors.password && <p className="text-sm text-red-500 font-medium mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
                <label htmlFor="password_confirmation" className="block text-sm font-bold text-slate-700">
                    Confirm Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <input
                        id="password_confirmation"
                        type={showPassword ? 'text' : 'password'}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        required
                        className={`block w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.password_confirmation ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]'} rounded-xl text-sm transition-colors`}
                        placeholder="Repeat your password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                </div>
                {errors.password_confirmation && <p className="text-sm text-red-500 font-medium mt-1">{errors.password_confirmation}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2 mt-4">
                <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={data.terms}
                    onChange={(e) => setData('terms', e.target.checked)}
                    className="mt-1 border-slate-300 text-[#1B4D3E] focus:ring-[#1B4D3E] rounded"
                    required
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                    I agree to the <a href="#" className="font-bold text-[#D97706] hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-[#D97706] hover:underline">Privacy Policy</a>.
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={processing || !data.terms}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1B4D3E] hover:bg-[#13382d] text-white rounded-xl font-bold text-sm tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#1B4D3E]/20 mt-4"
            >
                {processing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    'Create Account'
                )}
            </button>
            
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link href={route('login')} className="font-bold text-[#1B4D3E] hover:text-[#13382d]">
                        Sign in
                    </Link>
                </p>
                <p className="text-sm text-slate-500 mt-2">
                    Want to become a host?{' '}
                    <Link href="#" className="font-bold text-[#D97706] hover:text-[#b56305]">
                        Register as a Seller
                    </Link>
                </p>
            </div>
        </form>
    );
}
