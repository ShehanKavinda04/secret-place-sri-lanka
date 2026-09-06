import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Phone, Loader2 } from "lucide-react";
import { updatePersonalInfo } from "../../../../Hooks/useCustomerPersonalInfo";

// ── Validation ─────────────────────────────────────────────────────────────
const schema = z.object({
    first_name: z.string().min(2, "Min 2 characters"),
    last_name: z.string().min(2, "Min 2 characters"),
    phone: z.string().min(8, "Valid phone required"),
    whatsapp_number: z.string().min(8, "Valid WhatsApp required"),
    nationality: z.string().min(2, "Select a country"),
    country_code: z.string().min(2),
});

// ── Country data ───────────────────────────────────────────────────────────
const COUNTRIES = [
    { code: "LK", name: "Sri Lanka", flag: "🇱🇰", dial: "+94" },
    { code: "DE", name: "Germany", flag: "🇩🇪", dial: "+49" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", dial: "+44" },
    { code: "US", name: "United States", flag: "🇺🇸", dial: "+1" },
    { code: "AU", name: "Australia", flag: "🇦🇺", dial: "+61" },
    { code: "FR", name: "France", flag: "🇫🇷", dial: "+33" },
    { code: "JP", name: "Japan", flag: "🇯🇵", dial: "+81" },
    { code: "IN", name: "India", flag: "🇮🇳", dial: "+91" },
    { code: "SG", name: "Singapore", flag: "🇸🇬", dial: "+65" },
    { code: "CA", name: "Canada", flag: "🇨🇦", dial: "+1" },
];

// ── Shared styles ──────────────────────────────────────────────────────────
const LABEL = "block text-sm font-medium text-slate-700 mb-1";
const INPUT = `w-full rounded-lg border-slate-300 text-slate-900 placeholder-slate-400 text-sm py-2.5 px-4 transition-all
    outline-none focus:ring-2 border`;
const INPUT_N = `${INPUT} focus:border-[#1B4D3E] focus:ring-[#1B4D3E]`;
const INPUT_E = `${INPUT} border-red-300 focus:border-red-400 focus:ring-red-400/20`;

/**
 * PersonalInfoForm
 *
 * Mirrors BusinessInfoForm from the Host Profile:
 *  ┌─────────────────────────────────────────────────┐
 *  │  Personal & Travel Details                       │  ← section h3
 *  │  ─────────────────────────────────────────────  │
 *  │  First Name         Last Name                   │  ← 2-col grid
 *  │  Country / Nationality (full width)             │
 *  │  Phone Number       WhatsApp Number             │
 *  │                                  [Save Changes] │  ← right-aligned CTA
 *  └─────────────────────────────────────────────────┘
 */
export default function PersonalInfoForm({ profile, userId, onToast }) {
    const [sameAsPhone, setSameAsPhone] = useState(true);
    const [showCheck, setShowCheck] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({ resolver: zodResolver(schema) });

    const phoneVal = watch("phone");
    const natVal = watch("nationality");

    // Populate form when profile loads
    useEffect(() => {
        if (profile) {
            reset({
                first_name: profile.first_name,
                last_name: profile.last_name,
                phone: profile.phone,
                whatsapp_number: profile.whatsapp_number,
                nationality: profile.nationality,
                country_code: profile.country_code,
            });
            setSameAsPhone(profile.phone === profile.whatsapp_number);
        }
    }, [profile, reset]);

    // Sync WhatsApp when checkbox ticked
    useEffect(() => {
        if (sameAsPhone && phoneVal) {
            setValue("whatsapp_number", phoneVal, { shouldDirty: true });
        }
    }, [phoneVal, sameAsPhone, setValue]);

    const onSubmit = async (data) => {
        try {
            await updatePersonalInfo(userId, data);
            reset(data);
            setShowCheck(true);
            setTimeout(() => setShowCheck(false), 3000);
            onToast?.("Personal information saved successfully!", "success");
        } catch {
            onToast?.("Failed to save. Please try again.", "error");
        }
    };

    const selectedCountry =
        COUNTRIES.find((c) => c.name === natVal) ||
        COUNTRIES.find((c) => c.code === profile?.country_code) ||
        COUNTRIES[0];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative overflow-hidden">
            {/* ── Section title — same pattern as BusinessInfoForm's h3 ── */}
            <div className="pt-0 pb-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 font-sansDisplay">
                    Personal &amp; Travel Details
                </h3>
            </div>

            {/* ── Form body ─────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* First Name */}
                    <div>
                        <label className={LABEL}>First Name</label>
                        <input
                            {...register("first_name")}
                            placeholder="Elena"
                            className={`${errors.first_name ? INPUT_E : INPUT_N}`}
                        />
                        {errors.first_name && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.first_name.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className={LABEL}>Last Name</label>
                        <input
                            {...register("last_name")}
                            placeholder="Fischer"
                            className={`${errors.last_name ? INPUT_E : INPUT_N}`}
                        />
                        {errors.last_name && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.last_name.message}
                            </p>
                        )}
                    </div>

                    {/* Nationality — full width (mirrors BusinessCategory's full-row treatment) */}
                    <div className="md:col-span-2">
                        <label className={LABEL}>
                            Country of Origin / Nationality
                        </label>
                        <div className="relative max-w-md">
                            {/* Flag prefix */}
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <span className="text-lg leading-none">
                                    {selectedCountry.flag}
                                </span>
                            </div>
                            <select
                                {...register("nationality")}
                                onChange={(e) => {
                                    register("nationality").onChange(e);
                                    const sel = COUNTRIES.find(
                                        (c) => c.name === e.target.value,
                                    );
                                    if (sel)
                                        setValue("country_code", sel.code, {
                                            shouldDirty: true,
                                        });
                                }}
                                className={`${errors.nationality ? INPUT_E : INPUT_N} pl-12 appearance-none pr-10`}
                                style={{ color: "#0f172a" }}
                            >
                                {COUNTRIES.map((c) => (
                                    <option
                                        key={c.code}
                                        value={c.name}
                                        style={{ color: "#0f172a" }}
                                    >
                                        {c.code} — {c.name}
                                    </option>
                                ))}
                            </select>
                            {/* Chevron */}
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg
                                    className="w-4 h-4"
                                    style={{ color: "#C4A882" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.nationality && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.nationality.message}
                            </p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className={LABEL}>Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Phone
                                    className="w-4 h-4"
                                    style={{ color: "#8B6914" }}
                                />
                            </div>
                            <input
                                {...register("phone")}
                                placeholder="+49 151 2345 6789"
                                className={`${errors.phone ? INPUT_E : INPUT_N} pl-11`}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className={LABEL} style={{ margin: 0 }}>
                                WhatsApp Number
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={sameAsPhone}
                                    onChange={(e) =>
                                        setSameAsPhone(e.target.checked)
                                    }
                                    className="w-3.5 h-3.5 rounded border-[#8B6914] text-[#F5C842]"
                                    style={{ accentColor: "#F5C842" }}
                                />
                                <span className="text-xs text-slate-500">
                                    Same as phone
                                </span>
                            </label>
                        </div>
                        <div className="relative">
                            {/* WhatsApp icon */}
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    style={{ color: "#8B6914" }}
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <input
                                {...register("whatsapp_number")}
                                disabled={sameAsPhone}
                                placeholder="+49 151 2345 6789"
                                className={`${errors.whatsapp_number && !sameAsPhone ? INPUT_E : INPUT_N} pl-11 ${sameAsPhone ? "opacity-50 cursor-not-allowed" : ""}`}
                            />
                        </div>
                        {errors.whatsapp_number && !sameAsPhone && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.whatsapp_number.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Footer — Save button right-aligned, same as BusinessInfoForm ── */}
                <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={!isDirty || isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold
                            transition-all duration-150 shadow-md hover:bg-[#143d31] disabled:opacity-40 bg-[#1B4D3E] text-white"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                Saving...
                            </>
                        ) : showCheck ? (
                            <>
                                <Check className="w-4 h-4" /> Saved!
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>

            {/* Inline success flash (subtle — no toast overlap) */}
            {showCheck && (
                <div
                    className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                    style={{
                        background: "rgba(5,150,105,0.2)",
                        border: "1px solid rgba(52,211,153,0.35)",
                        color: "#34d399",
                    }}
                >
                    <Check className="w-4 h-4" /> Details synced
                </div>
            )}
        </div>
    );
}
