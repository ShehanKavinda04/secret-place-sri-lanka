import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { CheckCircle, Mail, Smartphone, ArrowLeft, KeyRound, Check, XCircle } from 'lucide-react';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    
    // Step 1: Account
    const [identity, setIdentity] = useState('');
    const [accountStatus, setAccountStatus] = useState(null); // 'checking', 'found', 'not_found', 'rate_limited', null
    const [accountType, setAccountType] = useState(null); // 'email' or 'phone'
    const [rateLimitMessage, setRateLimitMessage] = useState('');
    const [checkTimeout, setCheckTimeout] = useState(null);

    // Step 2 & 3: Method & Verify
    const [method, setMethod] = useState(''); // 'link', 'email_otp', 'sms'
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const [resetToken, setResetToken] = useState('');

    // Step 4: Password
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Identity Check (Debounced)
    useEffect(() => {
        if (!identity || identity.length < 5) {
            setAccountStatus(null);
            return;
        }

        if (checkTimeout) clearTimeout(checkTimeout);

        setAccountStatus('checking');
        const timeout = setTimeout(async () => {
            try {
                const response = await axios.post(route('password.check-identity'), { identity });
                if (response.data.found) {
                    setAccountStatus('found');
                    setAccountType(response.data.type);
                } else {
                    setAccountStatus('not_found');
                }
            } catch (error) {
                if (error.response?.status === 429) {
                    setAccountStatus('rate_limited');
                    setRateLimitMessage(error.response.data.message || 'Too many requests.');
                } else {
                    setAccountStatus('not_found');
                }
            }
        }, 500);

        setCheckTimeout(timeout);
        return () => clearTimeout(timeout);
    }, [identity]);

    // OTP Timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const handleSendReset = async () => {
        if (!method) return;
        setIsSubmitting(true);
        try {
            const response = await axios.post(route('password.send-reset'), { identity, method });
            if (response.data.method === 'link') {
                setStep(3); // Wait for link state
            } else {
                setTimeLeft(600); // 10 mins
                setStep(3); // OTP state
            }
        } catch (error) {
            if (error.response?.status === 429) {
                setAccountStatus('rate_limited');
                setRateLimitMessage(error.response.data.message);
                setStep(1); // send them back to step 1 to see the error
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) value = value.slice(0, 1);
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) return;
        
        setIsSubmitting(true);
        setOtpError('');
        try {
            const response = await axios.post(route('password.verify-otp'), { identity, otp: otpString });
            if (response.data.success) {
                setResetToken(response.data.reset_token);
                setStep(4);
            }
        } catch (error) {
            setOtpError(error.response?.data?.message || 'Invalid code.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                reset_token: resetToken,
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

    // UI Helpers
    const isStrongPassword = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&#]/.test(password);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <Head title="Forgot Password" />

            <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden p-8 border border-slate-100">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0f4c3a] mb-2 tracking-tight">Recover your account</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        A secure, short journey back to your Secret Place Sri Lanka account.
                    </p>
                </div>

                {/* Stepper */}
                <div className="flex justify-between items-center mb-10 px-2 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-100 -z-10 rounded-full"></div>
                    {['ACCOUNT', 'METHOD', 'VERIFY', 'PASSWORD'].map((label, idx) => (
                        <div key={label} className="flex flex-col items-center bg-white px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= idx + 1 ? 'bg-[#0f4c3a] text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                                {idx + 1}
                            </div>
                            <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${step >= idx + 1 ? 'text-[#0f4c3a]' : 'text-slate-400'}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Step 1: Account */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        {accountStatus === 'rate_limited' && (
                            <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm flex items-start space-x-3">
                                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <p>{rateLimitMessage}</p>
                            </div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                {identity && !identity.includes('@') && /[0-9]/.test(identity) ? <Smartphone className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                            </div>
                            <input
                                type="text"
                                className={`w-full pl-11 pr-4 py-3.5 bg-white border-2 rounded-xl text-slate-800 focus:outline-none focus:ring-0 transition-colors ${accountStatus === 'found' ? 'border-[#0f4c3a] focus:border-[#0f4c3a]' : accountStatus === 'not_found' ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#0f4c3a]'}`}
                                placeholder="Email address or phone number"
                                value={identity}
                                onChange={(e) => setIdentity(e.target.value)}
                            />
                        </div>

                        {accountStatus === 'found' && (
                            <div className="flex items-center space-x-2 text-[#0f4c3a] text-sm font-medium">
                                <CheckCircle className="w-4 h-4" />
                                <span>Account found. We can send a secure code or link.</span>
                            </div>
                        )}
                        {accountStatus === 'not_found' && (
                            <div className="text-red-500 text-sm font-medium">
                                No account found with this email or phone number.
                            </div>
                        )}

                        <button
                            onClick={() => setStep(2)}
                            disabled={accountStatus !== 'found'}
                            className="w-full py-3.5 bg-[#0f4c3a] text-white rounded-xl font-bold tracking-wide hover:bg-[#1b4332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0f4c3a]/20"
                        >
                            Continue securely
                        </button>
                    </div>
                )}

                {/* Step 2: Method */}
                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <p className="text-sm font-medium text-slate-600 mb-4">How would you like to verify it's you?</p>
                        
                        {accountType === 'email' && (
                            <>
                                <button onClick={() => setMethod('link')} className={`w-full p-4 border-2 rounded-xl flex items-center space-x-4 transition-all text-left ${method === 'link' ? 'border-[#0f4c3a] bg-[#F0F9F6]' : 'border-slate-200 hover:border-slate-300'}`}>
                                    <div className={`p-2 rounded-lg ${method === 'link' ? 'bg-[#0f4c3a] text-white' : 'bg-slate-100 text-slate-500'}`}><Mail className="w-5 h-5" /></div>
                                    <div>
                                        <div className={`font-bold ${method === 'link' ? 'text-[#0f4c3a]' : 'text-slate-700'}`}>Send Magic Link</div>
                                        <div className="text-xs text-slate-500 mt-0.5">Click a secure link sent to your inbox</div>
                                    </div>
                                </button>
                                <button onClick={() => setMethod('email_otp')} className={`w-full p-4 border-2 rounded-xl flex items-center space-x-4 transition-all text-left ${method === 'email_otp' ? 'border-[#0f4c3a] bg-[#F0F9F6]' : 'border-slate-200 hover:border-slate-300'}`}>
                                    <div className={`p-2 rounded-lg ${method === 'email_otp' ? 'bg-[#0f4c3a] text-white' : 'bg-slate-100 text-slate-500'}`}><KeyRound className="w-5 h-5" /></div>
                                    <div>
                                        <div className={`font-bold ${method === 'email_otp' ? 'text-[#0f4c3a]' : 'text-slate-700'}`}>Send 6-Digit Code</div>
                                        <div className="text-xs text-slate-500 mt-0.5">Enter a code sent to your inbox</div>
                                    </div>
                                </button>
                            </>
                        )}

                        {accountType === 'phone' && (
                            <button onClick={() => setMethod('sms')} className={`w-full p-4 border-2 rounded-xl flex items-center space-x-4 transition-all text-left ${method === 'sms' ? 'border-[#0f4c3a] bg-[#F0F9F6]' : 'border-slate-200 hover:border-slate-300'}`}>
                                <div className={`p-2 rounded-lg ${method === 'sms' ? 'bg-[#0f4c3a] text-white' : 'bg-slate-100 text-slate-500'}`}><Smartphone className="w-5 h-5" /></div>
                                <div>
                                    <div className={`font-bold ${method === 'sms' ? 'text-[#0f4c3a]' : 'text-slate-700'}`}>Send SMS Code</div>
                                    <div className="text-xs text-slate-500 mt-0.5">Receive a 6-digit code via text</div>
                                </div>
                            </button>
                        )}

                        <div className="pt-4">
                            <button
                                onClick={handleSendReset}
                                disabled={!method || isSubmitting}
                                className="w-full py-3.5 bg-[#0f4c3a] text-white rounded-xl font-bold tracking-wide hover:bg-[#1b4332] transition-colors disabled:opacity-50 flex justify-center items-center"
                            >
                                {isSubmitting ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : 'Send Recovery'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Verify */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                        {method === 'link' ? (
                            <div className="py-8">
                                <div className="w-16 h-16 bg-[#F0F9F6] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-8 h-8 text-[#0f4c3a]" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Check your inbox</h3>
                                <p className="text-slate-500 text-sm">We sent a secure magic link to <strong>{identity}</strong>. Click it to reset your password.</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm font-medium text-slate-600 mb-4 text-left">Enter the 6-digit code sent to <strong className="text-slate-900">{identity}</strong></p>
                                
                                <div className="flex justify-between space-x-2">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                            className="w-12 h-14 text-center text-2xl font-bold text-slate-900 border-2 border-slate-200 rounded-xl focus:border-[#0f4c3a] focus:ring-0 bg-slate-50 focus:bg-white transition-colors"
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                                
                                {otpError && <p className="text-red-500 text-sm font-medium text-left">{otpError}</p>}

                                <div className="flex items-center justify-between mt-6">
                                    <div className="text-xs text-slate-500 font-medium">
                                        Expires in: <span className="text-[#0f4c3a] font-bold ml-1">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                    </div>
                                    <button 
                                        onClick={handleSendReset} 
                                        disabled={timeLeft > 540} // disable resend for 1 minute
                                        className="text-xs font-bold text-[#D97706] hover:text-[#b56305] disabled:opacity-50"
                                    >
                                        Resend Code
                                    </button>
                                </div>

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={otp.join('').length !== 6 || isSubmitting}
                                    className="w-full py-3.5 bg-[#0f4c3a] text-white rounded-xl font-bold tracking-wide hover:bg-[#1b4332] transition-colors disabled:opacity-50 flex justify-center mt-6"
                                >
                                    {isSubmitting ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : 'Verify Code'}
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Step 4: Password */}
                {step === 4 && (
                    <form onSubmit={handlePasswordReset} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
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
                )}

                {/* Footer Back Link */}
                <div className="mt-8 text-center">
                    {step > 1 && step < 4 ? (
                        <button onClick={() => setStep(step - 1)} className="text-sm font-bold text-slate-500 hover:text-[#0f4c3a] transition-colors flex items-center justify-center w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </button>
                    ) : (
                        <Link href={route('login')} className="text-sm font-bold text-slate-500 hover:text-[#0f4c3a] transition-colors flex items-center justify-center w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to sign in
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
