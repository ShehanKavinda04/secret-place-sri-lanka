import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Check } from 'lucide-react';

export default function ResetPassword() {
    const { token, identity } = usePage().props;

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setPasswordError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        setPasswordError('');
        try {
            const response = await axios.post(route('password.update-custom'), {
                identity,
                reset_token: token,
                password,
                password_confirmation: passwordConfirmation,
            });
            if (response.data.success) {
                window.location.href = response.data.redirect;
            }
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Error resetting password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStrongPassword = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&#]/.test(password);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <Head title="Reset Password" />

            <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden p-8 border border-slate-100">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0f4c3a] mb-2 tracking-tight">Create New Password</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Set a strong password for your account associated with <strong>{identity}</strong>.
                    </p>
                </div>

                <form onSubmit={handlePasswordReset} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-[#0f4c3a] focus:ring-0 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {password.length > 0 && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex space-x-2 mb-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full ${isStrongPassword ? 'bg-[#0f4c3a]' : password.length > 4 && i <= 2 ? 'bg-[#D97706]' : password.length > 0 && i === 1 ? 'bg-red-400' : 'bg-slate-200'}`}></div>
                                ))}
                            </div>
                            <ul className="space-y-1 text-xs text-slate-500">
                                <li className={`flex items-center space-x-2 ${password.length >= 8 ? 'text-[#0f4c3a]' : ''}`}>
                                    <Check className="w-3 h-3" /><span>At least 8 characters</span>
                                </li>
                                <li className={`flex items-center space-x-2 ${/[A-Z]/.test(password) ? 'text-[#0f4c3a]' : ''}`}>
                                    <Check className="w-3 h-3" /><span>One uppercase letter</span>
                                </li>
                                <li className={`flex items-center space-x-2 ${/[0-9]/.test(password) ? 'text-[#0f4c3a]' : ''}`}>
                                    <Check className="w-3 h-3" /><span>One number</span>
                                </li>
                                <li className={`flex items-center space-x-2 ${/[@$!%*?&#]/.test(password) ? 'text-[#0f4c3a]' : ''}`}>
                                    <Check className="w-3 h-3" /><span>One special character</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 focus:bg-white focus:border-[#0f4c3a] focus:ring-0 transition-colors ${passwordConfirmation && password !== passwordConfirmation ? 'border-red-300' : 'border-slate-200'}`}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    {passwordError && <p className="text-red-500 text-sm font-medium">{passwordError}</p>}

                    <button
                        type="submit"
                        disabled={!isStrongPassword || password !== passwordConfirmation || isSubmitting}
                        className="w-full py-3.5 mt-4 bg-[#0f4c3a] text-white rounded-xl font-bold tracking-wide hover:bg-[#1b4332] transition-colors disabled:opacity-50 flex justify-center"
                    >
                        {isSubmitting ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : 'Secure Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}
