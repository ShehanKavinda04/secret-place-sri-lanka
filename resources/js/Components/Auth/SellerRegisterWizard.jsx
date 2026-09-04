import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, ChevronRight, ChevronLeft, Store, MapPin, Briefcase, FileUp } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function SellerRegisterWizard() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        businessName: '',
        category: 'accommodation',
        district: 'Colombo',
        brNumber: '',
        terms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            window.location.href = '/seller/pending-approval';
        }, 1500);
    };

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const districts = [
        "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", 
        "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", 
        "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", 
        "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", 
        "Moneragala", "Ratnapura", "Kegalle"
    ];

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Stepper Header */}
            <div className="mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0"></div>
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-[#1B4D3E] -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
                
                <div className="relative z-10 flex justify-between">
                    {[1, 2, 3].map((num) => (
                        <div 
                            key={num}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm transition-colors duration-300
                                ${step >= num ? 'bg-[#1B4D3E] text-white' : 'bg-slate-200 text-slate-500'}`}
                        >
                            {step > num ? <CheckCircle2 className="w-5 h-5 text-white" /> : num}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs font-bold text-slate-400 px-1">
                    <span className={step >= 1 ? 'text-[#1B4D3E]' : ''}>Account</span>
                    <span className={step >= 2 ? 'text-[#1B4D3E]' : ''}>Business</span>
                    <span className={step >= 3 ? 'text-[#1B4D3E]' : ''}>Verify</span>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
                
                {/* Step 1: Account Credentials */}
                {step === 1 && (
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    required
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors"
                                    placeholder="host@example.com"
                                    onChange={(e) => updateField('email', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-700">Strong Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    required
                                    className="block w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors"
                                    placeholder="Create a strong password"
                                    onChange={(e) => updateField('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Must be at least 8 characters.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Business Identity */}
                {step === 2 && (
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-700">Business / Homestay Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Store className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.businessName}
                                    required
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors"
                                    placeholder="E.g. Ella Green Paradise"
                                    onChange={(e) => updateField('businessName', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-slate-700">Category</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <Briefcase className="h-4 w-4" />
                                    </div>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => updateField('category', e.target.value)}
                                        className="block w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors appearance-none"
                                    >
                                        <option value="accommodation">Accommodation</option>
                                        <option value="crafts">Local Crafts</option>
                                        <option value="tours">Tour Guide</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-slate-700">District</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <select
                                        value={formData.district}
                                        onChange={(e) => updateField('district', e.target.value)}
                                        className="block w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors appearance-none"
                                    >
                                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Verification & Submit */}
                {step === 3 && (
                    <div className="space-y-5">
                        <div className="p-4 rounded-xl bg-[#D97706]/10 border border-[#D97706]/20">
                            <h4 className="font-bold text-[#D97706] text-sm flex items-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4" /> Verification Required
                            </h4>
                            <p className="text-xs text-[#D97706]/80 leading-relaxed">
                                To ensure quality on Secret Place Sri Lanka, all host accounts require admin approval. Please provide your Business Registration (BR) or NIC.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-700">BR Number or NIC</label>
                            <input
                                type="text"
                                value={formData.brNumber}
                                required
                                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] rounded-xl text-sm transition-colors"
                                placeholder="E.g. PV123456 or 901234567V"
                                onChange={(e) => updateField('brNumber', e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-700">Upload Document (Optional)</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FileUp className="w-8 h-8 text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500 font-medium">Click to upload PDF or Image</p>
                                    <p className="text-xs text-slate-400">MAX 5MB</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>

                        <div className="flex items-start gap-2 mt-4">
                            <input
                                type="checkbox"
                                checked={formData.terms}
                                onChange={(e) => updateField('terms', e.target.checked)}
                                className="mt-1 border-slate-300 text-[#1B4D3E] focus:ring-[#1B4D3E] rounded"
                                required
                            />
                            <label className="text-sm text-slate-600">
                                I confirm the information is accurate and agree to the <a href="#" className="font-bold text-[#D97706] hover:underline">Host Terms & Conditions</a>.
                            </label>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                    
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#1B4D3E] hover:bg-[#13382d] text-white rounded-xl font-bold text-sm tracking-wide transition-colors shadow-md shadow-[#1B4D3E]/20"
                        >
                            Continue <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.terms || !formData.brNumber}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#D97706] hover:bg-[#b56305] text-white rounded-xl font-bold text-sm tracking-wide transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-[#D97706]/20"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Submit Application <CheckCircle2 className="w-5 h-5" /></>
                            )}
                        </button>
                    )}
                </div>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                    Not a host?{' '}
                    <Link href={route('register')} className="font-bold text-[#1B4D3E] hover:text-[#13382d]">
                        Register as Customer
                    </Link>
                </p>
            </div>
        </div>
    );
}
