import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Camera, CheckCircle2, AlertCircle, Phone,
    Mail, Loader2, Save, X, MapPin, User
} from 'lucide-react';
import {
    useCustomerPersonalInfo,
    updatePersonalInfo,
    uploadAvatar,
} from '../../Hooks/useCustomerPersonalInfo';

// ── Validation Schema ──────────────────────────────────────────────────────
const personalInfoSchema = z.object({
    first_name:       z.string().min(2, 'First name must be at least 2 characters'),
    last_name:        z.string().min(2, 'Last name must be at least 2 characters'),
    phone:            z.string().min(8, 'Valid phone number required'),
    whatsapp_number:  z.string().min(8, 'Valid WhatsApp number required'),
    nationality:      z.string().min(2, 'Please select a country'),
    country_code:     z.string().min(2),
});

// ── Country Data ───────────────────────────────────────────────────────────
const COUNTRIES = [
    { code: 'LK', name: 'Sri Lanka',      flag: '🇱🇰', dial: '+94' },
    { code: 'DE', name: 'Germany',         flag: '🇩🇪', dial: '+49' },
    { code: 'GB', name: 'United Kingdom',  flag: '🇬🇧', dial: '+44' },
    { code: 'US', name: 'United States',   flag: '🇺🇸', dial: '+1'  },
    { code: 'AU', name: 'Australia',       flag: '🇦🇺', dial: '+61' },
    { code: 'FR', name: 'France',          flag: '🇫🇷', dial: '+33' },
    { code: 'JP', name: 'Japan',           flag: '🇯🇵', dial: '+81' },
    { code: 'IN', name: 'India',           flag: '🇮🇳', dial: '+91' },
    { code: 'SG', name: 'Singapore',       flag: '🇸🇬', dial: '+65' },
    { code: 'CA', name: 'Canada',          flag: '🇨🇦', dial: '+1'  },
    { code: 'NL', name: 'Netherlands',     flag: '🇳🇱', dial: '+31' },
    { code: 'CN', name: 'China',           flag: '🇨🇳', dial: '+86' },
];

// ── Shared input style ─────────────────────────────────────────────────────
const INPUT_BASE =
    'w-full rounded-xl text-white placeholder-white/30 text-sm py-3 px-4 transition-all duration-150 outline-none focus:ring-2';
const INPUT_NORMAL =
    `${INPUT_BASE} bg-[#35060D] border border-[#8B6914]/60 focus:border-[#F5C842] focus:ring-[#F5C842]/20`;
const INPUT_ERROR =
    `${INPUT_BASE} bg-[#35060D] border border-red-500 focus:border-red-400 focus:ring-red-400/20`;

// ── Label style ───────────────────────────────────────────────────────────
const LABEL = 'block text-xs font-semibold uppercase tracking-widest text-[#C4A882] mb-2';

export default function CustomerPersonalInfoCard({ userId }) {
    const { profile, isLoading } = useCustomerPersonalInfo(userId);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast]             = useState(null);
    const [sameAsPhone, setSameAsPhone] = useState(true);
    const fileInputRef                  = useRef(null);

    const {
        register, handleSubmit, reset, setValue, watch,
        formState: { errors, isSubmitting, isDirty }
    } = useForm({ resolver: zodResolver(personalInfoSchema) });

    const phoneValue = watch('phone');
    const nationalityValue = watch('nationality');

    useEffect(() => {
        if (profile) {
            reset({
                first_name:      profile.first_name,
                last_name:       profile.last_name,
                phone:           profile.phone,
                whatsapp_number: profile.whatsapp_number,
                nationality:     profile.nationality,
                country_code:    profile.country_code,
            });
            setSameAsPhone(profile.phone === profile.whatsapp_number);
        }
    }, [profile, reset]);

    useEffect(() => {
        if (sameAsPhone && phoneValue) {
            setValue('whatsapp_number', phoneValue, { shouldValidate: true, shouldDirty: true });
        }
    }, [phoneValue, sameAsPhone, setValue]);

    const fireToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const onSubmit = async (data) => {
        try {
            await updatePersonalInfo(userId, data);
            fireToast('Personal information updated successfully!', 'success');
            reset(data);
        } catch {
            fireToast('Failed to save changes. Please try again.', 'error');
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            if (file.size > 2 * 1024 * 1024) throw new Error('File must be under 2 MB');
            const newUrl = await uploadAvatar(userId, file);
            await updatePersonalInfo(userId, { avatar_url: newUrl });
            fireToast('Avatar updated!', 'success');
        } catch (err) {
            fireToast(err.message || 'Failed to upload avatar', 'error');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // ── Skeleton ────────────────────────────────────────────────────────────
    if (isLoading || !profile) {
        return (
            <div className="w-full animate-pulse rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#5C1020', border: '1px solid rgba(139,105,20,0.4)' }}>
                <div className="h-40 bg-[#35060D]" />
                <div className="px-8 pb-8 -mt-12 space-y-4">
                    <div className="w-28 h-28 rounded-full bg-[#35060D] border-4 border-[#8B6914]" />
                    <div className="h-7 w-56 rounded bg-[#35060D]" />
                    <div className="h-4 w-40 rounded bg-[#35060D]" />
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {[...Array(4)].map((_, i) => <div key={i} className="h-12 rounded-xl bg-[#35060D]" />)}
                    </div>
                </div>
            </div>
        );
    }

    const currentCountry = COUNTRIES.find(c => c.code === profile.country_code) || COUNTRIES[0];
    const selectedCountry = COUNTRIES.find(c => c.name === nationalityValue) || currentCountry;

    return (
        <div className="w-full rounded-2xl overflow-visible shadow-2xl relative" style={{ background: '#5C1020', border: '1px solid rgba(139,105,20,0.35)' }}>

            {/* ── Cover Banner ──────────────────────────────────────────────── */}
            <div
                className="h-40 md:h-52 w-full relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #2E050B 0%, #4A0812 35%, #7a1a28 65%, #5C1020 100%)',
                }}
            >
                {/* Decorative gold ornament */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                    <svg viewBox="0 0 200 80" className="w-full h-full" fill="none">
                        <path d="M0 40 Q50 0 100 40 Q150 80 200 40" stroke="#D4AF37" strokeWidth="1" />
                        <path d="M0 40 Q50 80 100 40 Q150 0 200 40" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="100" cy="40" r="8" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="20"  cy="40" r="4" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="180" cy="40" r="4" stroke="#D4AF37" strokeWidth="1" />
                    </svg>
                </div>
                {/* Gold border bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            </div>

            {/* ── Identity Section ──────────────────────────────────────────── */}
            <div className="px-6 md:px-10 pb-8 -mt-16 relative">
                <div className="flex flex-col md:flex-row md:items-end gap-6">

                    {/* Avatar */}
                    <div className="relative group flex-shrink-0 z-10">
                        <div
                            className={`w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center
                                text-3xl md:text-4xl font-bold font-display text-white shadow-2xl
                                border-4 transition-all duration-200
                                ${isUploading ? 'opacity-60' : 'border-[#D4AF37] group-hover:border-[#F5C842]'}`}
                            style={{ background: '#2E050B' }}
                        >
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt={profile.first_name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="select-none">
                                    {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
                                </span>
                            )}

                            {/* Hover upload overlay */}
                            <label className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 rounded-full">
                                <Camera className="w-7 h-7 text-white mb-1" />
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change</span>
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
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                <Loader2 className="w-8 h-8 text-[#F5C842] animate-spin" />
                            </div>
                        )}
                        {/* Gold ring glow on hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_0_20px_rgba(213,175,55,0.45)]" />
                    </div>

                    {/* Name + Pills */}
                    <div className="flex-1 pb-2">
                        <h2 className="text-2xl md:text-3xl font-bold font-display text-white leading-tight mb-3">
                            Hi, {profile.first_name} {profile.last_name}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Email pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium text-[#F0E6C8]"
                                style={{ background: 'rgba(53,6,13,0.8)', border: '1px solid rgba(139,105,20,0.5)' }}>
                                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span className="max-w-[180px] truncate">{profile.email}</span>
                                {profile.is_email_verified ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                ) : (
                                    <span className="text-xs font-bold text-red-400 cursor-pointer hover:text-red-300 ml-1">Verify</span>
                                )}
                            </div>

                            {/* Nationality pill */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium text-[#F0E6C8]"
                                style={{ background: 'rgba(53,6,13,0.8)', border: '1px solid rgba(139,105,20,0.5)' }}>
                                <span className="text-base leading-none">{currentCountry.flag}</span>
                                <span className="text-xs font-bold text-[#D4AF37]">{currentCountry.code}</span>
                                <span>{profile.nationality}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Gold Divider ──────────────────────────────────────────────── */}
            <div className="mx-6 md:mx-10 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(139,105,20,0.6), transparent)' }} />

            {/* ── Form ──────────────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 md:px-10 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">

                    {/* First Name */}
                    <div>
                        <label className={LABEL}>First Name</label>
                        <input
                            {...register('first_name')}
                            placeholder="Elena"
                            className={errors.first_name ? INPUT_ERROR : INPUT_NORMAL}
                        />
                        {errors.first_name && <p className="text-red-400 text-xs mt-1.5">{errors.first_name.message}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className={LABEL}>Last Name</label>
                        <input
                            {...register('last_name')}
                            placeholder="Fischer"
                            className={errors.last_name ? INPUT_ERROR : INPUT_NORMAL}
                        />
                        {errors.last_name && <p className="text-red-400 text-xs mt-1.5">{errors.last_name.message}</p>}
                    </div>

                    {/* Nationality — full width */}
                    <div className="md:col-span-2">
                        <label className={LABEL}>Country of Origin / Nationality</label>
                        <div className="relative">
                            {/* Flag prefix */}
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <span className="text-xl">{selectedCountry?.flag || '🌍'}</span>
                            </div>
                            <select
                                {...register('nationality')}
                                onChange={(e) => {
                                    register('nationality').onChange(e);
                                    const sel = COUNTRIES.find(c => c.name === e.target.value);
                                    if (sel) setValue('country_code', sel.code, { shouldDirty: true });
                                }}
                                className={`${errors.nationality ? INPUT_ERROR : INPUT_NORMAL} pl-12 max-w-lg appearance-none`}
                                style={{ color: 'white' }}
                            >
                                {COUNTRIES.map(c => (
                                    <option key={c.code} value={c.name} style={{ background: '#35060D', color: 'white' }}>
                                        {c.code} — {c.name}
                                    </option>
                                ))}
                            </select>
                            {/* Dropdown chevron */}
                            <div className="absolute inset-y-0 right-0 max-w-lg pr-4 flex items-center pointer-events-none" style={{ right: 'calc(100% - min(100%, 32rem))' }}>
                                <svg className="w-4 h-4 text-[#C4A882]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {errors.nationality && <p className="text-red-400 text-xs mt-1.5">{errors.nationality.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className={LABEL}>Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Phone className="w-4 h-4 text-[#8B6914]" />
                            </div>
                            <input
                                {...register('phone')}
                                placeholder="+49 151 2345 6789"
                                className={`${errors.phone ? INPUT_ERROR : INPUT_NORMAL} pl-11`}
                            />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className={LABEL} style={{ margin: 0 }}>WhatsApp Number</label>
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={sameAsPhone}
                                    onChange={e => setSameAsPhone(e.target.checked)}
                                    className="w-4 h-4 rounded border-[#8B6914] bg-[#35060D] text-[#F5C842] focus:ring-[#F5C842]/30 cursor-pointer"
                                />
                                <span className="text-xs text-[#C4A882]">Same as phone</span>
                            </label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                {/* WhatsApp icon */}
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8B6914]" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <input
                                {...register('whatsapp_number')}
                                disabled={sameAsPhone}
                                placeholder="+49 151 2345 6789"
                                className={`${errors.whatsapp_number && !sameAsPhone ? INPUT_ERROR : INPUT_NORMAL} pl-11 ${sameAsPhone ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                        </div>
                        {errors.whatsapp_number && !sameAsPhone && (
                            <p className="text-red-400 text-xs mt-1.5">{errors.whatsapp_number.message}</p>
                        )}
                    </div>
                </div>

                {/* ── Action Buttons ─────────────────────────────────────────── */}
                <div className="mt-10 flex items-center justify-end gap-4 border-t pt-8"
                    style={{ borderColor: 'rgba(139,105,20,0.3)' }}>
                    <button
                        type="button"
                        onClick={() => { reset(); setSameAsPhone(profile.phone === profile.whatsapp_number); }}
                        disabled={!isDirty || isSubmitting}
                        className="px-6 py-2.5 text-sm font-bold text-[#F0E6C8]/80 hover:text-white transition-colors disabled:opacity-40"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isDirty || isSubmitting}
                        className="px-8 py-3 rounded-full text-sm font-extrabold text-[#2A040A] flex items-center gap-2 shadow-lg hover:brightness-110 transition-all duration-150 disabled:opacity-40"
                        style={{ background: 'linear-gradient(90deg, #D4AF37 0%, #F5C842 100%)' }}
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>

            {/* ── Toast Notification ────────────────────────────────────────── */}
            {toast && (
                <div className={`absolute bottom-6 right-6 z-50 max-w-sm px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-sm
                    ${toast.type === 'success'
                        ? 'bg-emerald-950/90 border-emerald-500/60 text-white'
                        : 'bg-red-950/90 border-red-500/60 text-white'}`}
                >
                    {toast.type === 'success'
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        : <AlertCircle  className="w-5 h-5 text-red-400 flex-shrink-0" />
                    }
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button onClick={() => setToast(null)} className="ml-auto hover:bg-white/10 p-1 rounded-lg transition-colors">
                        <X className="w-4 h-4 text-white/60" />
                    </button>
                </div>
            )}
        </div>
    );
}
