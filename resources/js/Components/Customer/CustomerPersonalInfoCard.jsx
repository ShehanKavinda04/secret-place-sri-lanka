import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Camera, CheckCircle2, AlertCircle, Phone, Mail, Loader2, Save, X } from 'lucide-react';
import { 
    useCustomerPersonalInfo, 
    updatePersonalInfo, 
    uploadAvatar,
} from '../../Hooks/useCustomerPersonalInfo';

// Zod Validation Schema
const personalInfoSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z.string().min(8, "Valid phone number required"),
    whatsapp_number: z.string().min(8, "Valid WhatsApp number required"),
    nationality: z.string().min(2, "Please select a country"),
    country_code: z.string().min(2)
});

// Helper for Country Flags
const COUNTRIES = [
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dial: '+94' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', dial: '+49' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44' },
    { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', dial: '+61' },
    { code: 'FR', name: 'France', flag: '🇫🇷', dial: '+33' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81' },
];

export default function CustomerPersonalInfoCard({ userId }) {
    const { profile, isLoading } = useCustomerPersonalInfo(userId);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState(null);
    const [sameAsPhone, setSameAsPhone] = useState(true);
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({
        resolver: zodResolver(personalInfoSchema)
    });

    const phoneValue = watch('phone');

    useEffect(() => {
        if (profile) {
            reset({
                first_name: profile.first_name,
                last_name: profile.last_name,
                phone: profile.phone,
                whatsapp_number: profile.whatsapp_number,
                nationality: profile.nationality,
                country_code: profile.country_code
            });
            setSameAsPhone(profile.phone === profile.whatsapp_number);
        }
    }, [profile, reset]);

    // Sync WhatsApp with Phone if checkbox is checked
    useEffect(() => {
        if (sameAsPhone && phoneValue) {
            setValue('whatsapp_number', phoneValue, { shouldValidate: true, shouldDirty: true });
        }
    }, [phoneValue, sameAsPhone, setValue]);

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const onSubmit = async (data) => {
        try {
            await updatePersonalInfo(userId, data);
            showToast("Personal information updated successfully", "success");
            reset(data);
        } catch (error) {
            showToast("Failed to update profile", "error");
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            if (file.size > 2 * 1024 * 1024) throw new Error("File must be less than 2MB");
            
            const newAvatarUrl = await uploadAvatar(userId, file);
            await updatePersonalInfo(userId, { avatar_url: newAvatarUrl });
            showToast("Avatar updated successfully", "success");
        } catch (error) {
            showToast(error.message || "Failed to upload avatar", "error");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (isLoading || !profile) {
        return (
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-pulse">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-32 h-32 rounded-full bg-slate-200 shrink-0" />
                    <div className="space-y-4 w-full">
                        <div className="h-8 bg-slate-200 rounded w-1/3" />
                        <div className="h-4 bg-slate-200 rounded w-1/4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="h-10 bg-slate-200 rounded" />
                            <div className="h-10 bg-slate-200 rounded" />
                            <div className="h-10 bg-slate-200 rounded" />
                            <div className="h-10 bg-slate-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentCountry = COUNTRIES.find(c => c.code === profile.country_code) || COUNTRIES[0];

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            
            {/* Header / Identity Section */}
            <div className="bg-slate-50 border-b border-slate-200 p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    
                    {/* Avatar Uploader */}
                    <div className="relative group shrink-0">
                        <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative ${isUploading ? 'opacity-50' : ''}`}>
                            <img 
                                src={profile.avatar_url} 
                                alt={profile.first_name} 
                                className="w-full h-full object-cover"
                            />
                            
                            <label className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                <Camera className="w-8 h-8 text-white mb-1" />
                                <span className="text-white text-xs font-medium">Change</span>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/jpeg,image/png,image/webp"
                                    ref={fileInputRef}
                                    onChange={handleAvatarUpload}
                                    disabled={isUploading}
                                />
                            </label>
                        </div>
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                <Loader2 className="w-8 h-8 text-cinnamon-500 animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* Identity Info */}
                    <div className="flex-1 text-center md:text-left mt-2">
                        <h2 className="text-2xl font-bold text-slate-900 font-display">
                            Hi, {profile.first_name} {profile.last_name}
                        </h2>
                        
                        <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">{profile.email}</span>
                                {profile.is_email_verified ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-1" />
                                ) : (
                                    <button className="ml-2 text-xs font-bold text-cinnamon-600 hover:text-cinnamon-700">Verify</button>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
                                <span className="text-base leading-none">{currentCountry.flag}</span>
                                <span className="text-sm font-medium text-slate-700">{profile.nationality}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                        <input 
                            {...register('first_name')}
                            className={`w-full rounded-xl border ${errors.first_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500'} shadow-sm text-sm py-2.5`}
                        />
                        {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input 
                            {...register('last_name')}
                            className={`w-full rounded-xl border ${errors.last_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500'} shadow-sm text-sm py-2.5`}
                        />
                        {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                    </div>

                    {/* Nationality */}
                    <div className="md:col-span-2 max-w-md">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Country of Origin / Nationality</label>
                        <div className="relative">
                            <select 
                                {...register('nationality')}
                                onChange={(e) => {
                                    register('nationality').onChange(e);
                                    const selected = COUNTRIES.find(c => c.name === e.target.value);
                                    if (selected) setValue('country_code', selected.code, { shouldValidate: true, shouldDirty: true });
                                }}
                                className={`w-full rounded-xl border ${errors.nationality ? 'border-red-300' : 'border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500'} shadow-sm text-sm py-2.5 pl-10 bg-white`}
                            >
                                {COUNTRIES.map(country => (
                                    <option key={country.code} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-lg">{COUNTRIES.find(c => c.name === watch('nationality'))?.flag || '🌍'}</span>
                            </div>
                        </div>
                        {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="w-4 h-4 text-slate-400" />
                            </div>
                            <input 
                                {...register('phone')}
                                className={`w-full rounded-xl border ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500'} shadow-sm text-sm py-2.5 pl-10`}
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center justify-between">
                            <span>WhatsApp Number</span>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={sameAsPhone}
                                    onChange={(e) => setSameAsPhone(e.target.checked)}
                                    className="rounded border-slate-300 text-forestGreen-600 focus:ring-forestGreen-500 w-3.5 h-3.5 cursor-pointer"
                                />
                                <span className="text-xs text-slate-500">Same as phone</span>
                            </label>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-400">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input 
                                {...register('whatsapp_number')}
                                disabled={sameAsPhone}
                                className={`w-full rounded-xl border ${errors.whatsapp_number ? 'border-red-300' : 'border-slate-300'} shadow-sm text-sm py-2.5 pl-10 ${sameAsPhone ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'focus:border-forestGreen-500 focus:ring-forestGreen-500'}`}
                            />
                        </div>
                        {errors.whatsapp_number && !sameAsPhone && <p className="text-red-500 text-xs mt-1">{errors.whatsapp_number.message}</p>}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-10 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                    <button 
                        type="button"
                        onClick={() => {
                            reset();
                            setSameAsPhone(profile.phone === profile.whatsapp_number);
                        }}
                        disabled={!isDirty || isSubmitting}
                        className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={!isDirty || isSubmitting}
                        className="px-8 py-2.5 bg-forestGreen-700 text-white text-sm font-bold rounded-xl shadow-sm hover:bg-forestGreen-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>

            {/* Toast Notification Overlay */}
            {toast && (
                <div className={`absolute bottom-6 right-6 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 ${
                    toast.type === 'success' ? 'bg-emerald-900 text-white' : 'bg-red-900 text-white'
                }`}>
                    {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-2 hover:bg-white/10 p-1 rounded-lg transition-colors">
                        <X className="w-4 h-4 text-white/70" />
                    </button>
                </div>
            )}
        </div>
    );
}
