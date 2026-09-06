import React, { useRef, useState } from "react";
import {
    Camera,
    Image as ImageIcon,
    CheckCircle2,
    ShieldCheck,
    MapPin,
    Loader2,
} from "lucide-react";
import {
    uploadAvatar,
    updatePersonalInfo,
} from "../../../../Hooks/useCustomerPersonalInfo";

const COUNTRIES = [
    { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
];

/**
 * ProfileIdentityCard
 *
 * Mirrors the BrandCustomizer layout from the Host Profile:
 *   ┌──────────────────────────────────────────────────┐
 *   │  [     cover banner area — full width            ]│
 *   │  [                                               ]│
 *   ├──────────────────────────────────────────────────┤
 *   │  (avatar overlapping fold)  Name     [Verified]  │
 *   │                             subtitle            │
 *   └──────────────────────────────────────────────────┘
 */
export default function ProfileIdentityCard({ profile, userId, onToast }) {
    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    const country =
        COUNTRIES.find((c) => c.code === profile?.country_code) || COUNTRIES[0];

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploadingAvatar(true);
        try {
            if (file.size > 2 * 1024 * 1024)
                throw new Error("File must be under 2 MB");
            const url = await uploadAvatar(userId, file);
            await updatePersonalInfo(userId, { avatar_url: url });
            onToast?.("Avatar updated!", "success");
        } catch (err) {
            onToast?.(err.message || "Upload failed", "error");
        } finally {
            setIsUploadingAvatar(false);
            if (avatarInputRef.current) avatarInputRef.current.value = "";
        }
    };

    const initials = `${profile?.first_name?.charAt(0) ?? ""}${profile?.last_name?.charAt(0) ?? ""}`;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            {/* ── Banner Area (exactly like BrandCustomizer's h-48 md:h-64) ── */}
            <div className="relative h-48 md:h-64 group bg-slate-100">
                {/* Decorative Celtic knot */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none select-none">
                    <div className="h-full w-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100" />
                </div>

                {/* Change Banner button — shown on hover, like BrandCustomizer */}
                <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(15,23,42,0.2)" }}
                >
                    <button
                        onClick={() => bannerInputRef.current?.click()}
                        className="flex items-center px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition bg-white/90 text-slate-800 hover:bg-white"
                    >
                        <ImageIcon className="w-4 h-4 mr-2" /> Change Cover
                    </button>
                    <input
                        type="file"
                        ref={bannerInputRef}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {/* Gold bottom border (separating banner from info row) */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                        background:
                            "linear-gradient(to right, transparent, rgba(213,175,55,0.5), transparent)",
                    }}
                />
            </div>

            {/* ── Profile Info Row (mirrors BrandCustomizer's -mt-12 sm:-mt-16 row) ── */}
            <div className="px-6 sm:px-10 pb-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-14 space-y-3 sm:space-y-0 sm:space-x-6">
                    {/* Avatar — overlapping the banner fold */}
                    <div className="relative group flex-shrink-0 z-10">
                        <div
                            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex items-center justify-center
                                text-2xl sm:text-3xl font-bold font-display text-[#1B4D3E] shadow-md
                                border-4 transition-all duration-200 select-none bg-white
                                ${isUploadingAvatar ? "opacity-60 border-slate-300" : "border-white group-hover:border-[#1B4D3E]"}`}
                        >
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.first_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>{initials}</span>
                            )}

                            {/* Camera hover overlay */}
                            <label
                                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center
                                opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 rounded-full"
                            >
                                {isUploadingAvatar ? (
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                ) : (
                                    <>
                                        <Camera className="w-6 h-6 text-white mb-0.5" />
                                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">
                                            Change
                                        </span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg,image/png,image/webp"
                                    ref={avatarInputRef}
                                    onChange={handleAvatarUpload}
                                    disabled={isUploadingAvatar}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Name + subtitle + badge (mirrors BrandCustomizer's Titles block) */}
                    <div className="flex-1 pb-2 pt-14 sm:pt-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 font-sansDisplay leading-tight">
                                    {profile?.first_name} {profile?.last_name}
                                </h2>
                                <p className="text-sm mt-0.5 flex items-center gap-2 text-slate-500">
                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#D97706]" />
                                    <span className="mr-1">{country.flag}</span>
                                    {profile?.nationality} &bull; Customer
                                </p>
                            </div>

                            {/* Verified badge (mirrors "Verified Merchant") */}
                            <div className="mt-3 sm:mt-0">
                                {profile?.is_email_verified ? (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <ShieldCheck className="w-4 h-4 mr-1.5" />{" "}
                                        Verified Account
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                        <CheckCircle2 className="w-4 h-4 mr-1.5" />{" "}
                                        Verify Email
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
