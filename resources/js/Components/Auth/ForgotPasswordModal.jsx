import React, { useState } from 'react';
import { Mail, XCircle, Send } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
        }, 1200);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
                <button 
                    onClick={onClose} 
                    className="absolute right-6 top-6 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
                >
                    <XCircle className="w-6 h-6" />
                </button>
                
                <div className="p-8">
                    {!isSent ? (
                        <>
                            <div className="w-16 h-16 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-4">
                                <Mail className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-2xl font-extrabold text-[#1B4D3E] tracking-tight">Reset Password</h3>
                            <p className="text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                                Enter the email address associated with your account, and we'll send you a secure link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-bold text-slate-700">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting || !email}
                                    className="w-full py-3.5 rounded-xl bg-[#1B4D3E] hover:bg-[#13382d] text-white font-bold tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#1B4D3E]/20 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Send Reset Link <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 rounded-full bg-[#1B4D3E]/10 text-[#1B4D3E] flex items-center justify-center mx-auto mb-6">
                                <Send className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-[#1B4D3E] tracking-tight mb-2">Check your email</h3>
                            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
                                We've sent a secure password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
                            </p>
                            <button 
                                onClick={onClose}
                                className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold tracking-wide transition-all"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
