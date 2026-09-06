import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Check,
    KeyRound,
    Loader2,
    LockKeyhole,
    LogOut,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Smartphone,
    Sparkles,
    UserRound,
    Utensils,
    WalletCards,
    Bell,
} from "lucide-react";
import { customerProfileService } from "@/Services/customerProfileService";

const countries = [
    ["DE", "Germany", "ðŸ‡©ðŸ‡ª", "+49"],
    ["LK", "Sri Lanka", "ðŸ‡±ðŸ‡°", "+94"],
    ["GB", "United Kingdom", "ðŸ‡¬ðŸ‡§", "+44"],
    ["US", "United States", "ðŸ‡ºðŸ‡¸", "+1"],
    ["AU", "Australia", "ðŸ‡¦ðŸ‡º", "+61"],
    ["FR", "France", "ðŸ‡«ðŸ‡·", "+33"],
];
const travelStyles = [
    "Hiking & Adventure",
    "Heritage & Culture",
    "Wildlife",
    "Wellness & Ayurveda",
];
const dietaryOptions = ["None", "Vegetarian", "Vegan", "Halal", "Gluten-Free"];
const currencyOptions = ["LKR", "USD", "EUR", "GBP"];

const profileSchema = z.object({
    first_name: z.string().min(2, "Enter at least 2 characters"),
    last_name: z.string().min(2, "Enter at least 2 characters"),
    phone: z.string().min(8, "Enter a valid phone number"),
    whatsapp_number: z.string().min(8, "Enter a valid WhatsApp number"),
    nationality: z.string().min(2, "Choose a country"),
});

function Panel({ title, description, icon: Icon, children }) {
    return (
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex gap-3 items-start">
                <Icon className="w-5 h-5 text-[#D97706] mt-0.5" />
                <div>
                    <h2 className="font-bold text-slate-900 font-sansDisplay">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm text-slate-500 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            <div className="p-6">{children}</div>
        </section>
    );
}

function Field({ label, error, children }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">
                {label}
            </span>
            {children}
            {error && (
                <span className="text-xs text-red-600 mt-1 block">{error}</span>
            )}
        </label>
    );
}

const inputClass =
    "w-full rounded-lg border-slate-300 text-sm text-slate-900 focus:border-[#1B4D3E] focus:ring-[#1B4D3E]";

function SaveBar({ dirty, saving, onCancel }) {
    return (
        <div className="flex justify-end gap-3 pt-5 mt-6 border-t border-slate-100">
            <button
                type="button"
                onClick={onCancel}
                disabled={!dirty || saving}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={!dirty || saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold hover:bg-[#143d31] disabled:opacity-50"
            >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}

export default function CustomerSettingsTabs({
    profile,
    notifications,
    onProfileChange,
    onNotificationsChange,
    onToast,
}) {
    const [activeTab, setActiveTab] = useState("personal");
    const [saving, setSaving] = useState(false);
    const [twoFactorBusy, setTwoFactorBusy] = useState(false);
    const [sessions, setSessions] = useState([
        {
            id: "current",
            device: "Chrome on Windows",
            location: "Colombo, Sri Lanka",
            current: true,
        },
        {
            id: "mobile",
            device: "Safari on iPhone",
            location: "Berlin, Germany",
            current: false,
        },
    ]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: profile,
    });

    useEffect(() => {
        reset(profile);
    }, [profile, reset]);

    const saveProfile = async (updates) => {
        const previous = profile;
        setSaving(true);
        onProfileChange({ ...profile, ...updates });
        try {
            const saved = await customerProfileService.updateProfile(updates);
            onProfileChange(saved);
            onToast("Profile changes saved", "success");
        } catch (error) {
            onProfileChange(previous);
            onToast(error.message || "Could not save changes", "error");
        } finally {
            setSaving(false);
        }
    };

    const togglePreference = async (key) => {
        const previous = notifications;
        const next = { ...notifications, [key]: !notifications[key] };
        onNotificationsChange(next);
        try {
            await customerProfileService.updatePreferences({
                [key]: next[key],
            });
        } catch {
            onNotificationsChange(previous);
            onToast("Preference could not be updated", "error");
        }
    };

    const toggleTwoFactor = async () => {
        const next = !profile.two_factor_enabled;
        const previous = profile;
        setTwoFactorBusy(true);
        onProfileChange({ ...profile, two_factor_enabled: next });
        try {
            await customerProfileService.updateProfile({
                two_factor_enabled: next,
            });
            onToast(
                next
                    ? "Two-factor authentication enabled"
                    : "Two-factor authentication disabled",
                "success",
            );
        } catch {
            onProfileChange(previous);
            onToast("Security setting could not be updated", "error");
        } finally {
            setTwoFactorBusy(false);
        }
    };

    const tabs = [
        ["personal", "Personal & Contact Information", UserRound],
        ["travel", "Travel Preferences & Eco-Identity", Sparkles],
        ["safety", "Safety & Emergency Contacts", ShieldCheck],
        ["security", "Account Security & Sessions", LockKeyhole],
        ["notifications", "Notifications & Localization", BellIcon],
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                <nav
                    className="flex min-w-max px-4"
                    role="tablist"
                    aria-label="Profile settings sections"
                >
                    {tabs.map(([id, label, Icon]) => (
                        <button
                            key={id}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 px-4 py-4 border-b-2 text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === id ? "border-[#1B4D3E] text-[#1B4D3E]" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === "personal" && (
                <Panel
                    title="Personal & Contact Information"
                    description="Keep your identity and contact details ready for seamless stays."
                    icon={UserRound}
                >
                    <form onSubmit={handleSubmit(saveProfile)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Field
                                label="First Name"
                                error={errors.first_name?.message}
                            >
                                <input
                                    {...register("first_name")}
                                    className={inputClass}
                                />
                            </Field>
                            <Field
                                label="Last Name"
                                error={errors.last_name?.message}
                            >
                                <input
                                    {...register("last_name")}
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Official Email">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        value={profile.email}
                                        readOnly
                                        className={`${inputClass} pl-10 bg-slate-50`}
                                    />
                                </div>
                                <span className="text-xs text-emerald-700 mt-1 block">
                                    <Check className="inline w-3 h-3" />{" "}
                                    Verified email
                                </span>
                            </Field>
                            <Field
                                label="Phone Number"
                                error={errors.phone?.message}
                            >
                                <div className="flex gap-2">
                                    <select
                                        className="w-24 rounded-lg border-slate-300 text-sm"
                                        defaultValue={
                                            profile.country_code || "DE"
                                        }
                                    >
                                        {countries.map(
                                            ([code, name, flag, dial]) => (
                                                <option key={code} value={code}>
                                                    {flag} {dial}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                    <input
                                        {...register("phone")}
                                        className={inputClass}
                                    />
                                </div>
                            </Field>
                            <Field
                                label="WhatsApp Number"
                                error={errors.whatsapp_number?.message}
                            >
                                <input
                                    {...register("whatsapp_number")}
                                    className={inputClass}
                                />
                            </Field>
                            <Field
                                label="Country of Origin / Nationality"
                                error={errors.nationality?.message}
                            >
                                <select
                                    {...register("nationality")}
                                    className={inputClass}
                                >
                                    {countries.map(([code, name, flag]) => (
                                        <option key={code} value={name}>
                                            {flag} {name}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                        <SaveBar
                            dirty={isDirty}
                            saving={saving}
                            onCancel={() => reset(profile)}
                        />
                    </form>
                </Panel>
            )}

            {activeTab === "travel" && (
                <Panel
                    title="Travel Preferences & Eco-Identity"
                    description="Personalize recommendations and celebrate lower-impact travel."
                    icon={Sparkles}
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <Field label="Dietary Requirements">
                                <select
                                    value={profile.dietary_preference || "None"}
                                    onChange={(e) =>
                                        saveProfile({
                                            dietary_preference: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                >
                                    {dietaryOptions.map((item) => (
                                        <option key={item}>{item}</option>
                                    ))}
                                </select>
                            </Field>
                            <p className="text-xs text-slate-500 mt-2">
                                Shared only with hosts when needed for your
                                stay.
                            </p>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-slate-700 mb-2">
                                Travel Style
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {travelStyles.map((style) => {
                                    const selected =
                                        profile.travel_styles?.includes(style);
                                    return (
                                        <button
                                            key={style}
                                            type="button"
                                            onClick={() =>
                                                saveProfile({
                                                    travel_styles: selected
                                                        ? profile.travel_styles.filter(
                                                              (item) =>
                                                                  item !==
                                                                  style,
                                                          )
                                                        : [
                                                              ...(profile.travel_styles ||
                                                                  []),
                                                              style,
                                                          ],
                                                })
                                            }
                                            className={`px-3 py-2 rounded-full text-sm border ${selected ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-slate-600 border-slate-300 hover:border-[#1B4D3E]"}`}
                                        >
                                            {style}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 rounded-lg bg-emerald-50 border border-emerald-100 p-5 flex items-center gap-4">
                        <div className="rounded-full bg-emerald-600 text-white p-3">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-emerald-900">
                                Green Eco-Points
                            </p>
                            <p className="text-3xl font-bold text-emerald-700">
                                {profile.eco_points?.toLocaleString() || 0}
                            </p>
                            <p className="text-xs text-emerald-700">
                                Earned through certified eco-destinations and
                                low-impact choices.
                            </p>
                        </div>
                    </div>
                </Panel>
            )}

            {activeTab === "safety" && (
                <Panel
                    title="Safety & Emergency Contacts"
                    description="Secure travel details are stored for assistance during your journey."
                    icon={ShieldCheck}
                >
                    <form onSubmit={handleSubmit(saveProfile)}>
                        <div className="grid md:grid-cols-2 gap-5">
                            <Field label="Emergency Contact Name">
                                <input
                                    value={profile.emergency_contact_name || ""}
                                    onChange={(e) =>
                                        onProfileChange({
                                            ...profile,
                                            emergency_contact_name:
                                                e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Relationship">
                                <input
                                    value={
                                        profile.emergency_contact_relationship ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        onProfileChange({
                                            ...profile,
                                            emergency_contact_relationship:
                                                e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="International Phone Number">
                                <input
                                    value={
                                        profile.emergency_contact_phone || ""
                                    }
                                    onChange={(e) =>
                                        onProfileChange({
                                            ...profile,
                                            emergency_contact_phone:
                                                e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </Field>
                            <Field label="Passport / ID (masked)">
                                <div className="relative">
                                    <LockKeyhole className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        value={
                                            profile.passport_last_four
                                                ? `â€¢â€¢â€¢â€¢ ${profile.passport_last_four}`
                                                : ""
                                        }
                                        onChange={(e) =>
                                            onProfileChange({
                                                ...profile,
                                                passport_last_four:
                                                    e.target.value.slice(-4),
                                            })
                                        }
                                        className={`${inputClass} pl-10`}
                                        maxLength={9}
                                    />
                                </div>
                            </Field>
                        </div>
                        <div className="flex justify-end pt-5 mt-6 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() =>
                                    saveProfile({
                                        emergency_contact_name:
                                            profile.emergency_contact_name,
                                        emergency_contact_relationship:
                                            profile.emergency_contact_relationship,
                                        emergency_contact_phone:
                                            profile.emergency_contact_phone,
                                        passport_last_four:
                                            profile.passport_last_four,
                                    })
                                }
                                className="px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                            >
                                Save Emergency Details
                            </button>
                        </div>
                    </form>
                </Panel>
            )}

            {activeTab === "security" && (
                <Panel
                    title="Account Security & Active Sessions"
                    description="Protect your account and review where it is currently signed in."
                    icon={LockKeyhole}
                >
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4">
                                Change Password
                            </h3>
                            <div className="space-y-4">
                                <input
                                    type="password"
                                    placeholder="Current password"
                                    className={inputClass}
                                />
                                <input
                                    type="password"
                                    placeholder="New password"
                                    className={inputClass}
                                />
                                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                    <div className="h-full w-2/3 bg-amber-500" />
                                </div>
                                <p className="text-xs text-slate-500">
                                    Use 12+ characters with a number and symbol.
                                </p>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        onToast(
                                            "Password change request submitted",
                                            "success",
                                        )
                                    }
                                    className="px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        Two-factor authentication
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Add another layer of protection.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleTwoFactor}
                                    disabled={twoFactorBusy}
                                    className={`relative w-11 h-6 rounded-full ${profile.two_factor_enabled ? "bg-[#1B4D3E]" : "bg-slate-300"}`}
                                    aria-pressed={profile.two_factor_enabled}
                                >
                                    <span
                                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${profile.two_factor_enabled ? "translate-x-6" : "translate-x-1"}`}
                                    />
                                </button>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-3">
                                Active Sessions
                            </h3>
                            <div className="space-y-3">
                                {sessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {session.device}{" "}
                                                {session.current && (
                                                    <span className="text-xs text-emerald-700">
                                                        (Current)
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {session.location}
                                            </p>
                                        </div>
                                        {!session.current && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSessions((items) =>
                                                        items.filter(
                                                            (item) =>
                                                                item.id !==
                                                                session.id,
                                                        ),
                                                    )
                                                }
                                                className="text-xs font-semibold text-red-600"
                                            >
                                                Log out
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setSessions((items) =>
                                        items.filter((item) => item.current),
                                    )
                                }
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600"
                            >
                                <LogOut className="w-4 h-4" /> Log out other
                                devices
                            </button>
                        </div>
                    </div>
                </Panel>
            )}

            {activeTab === "notifications" && (
                <Panel
                    title="Notifications & Localization"
                    description="Choose how Secret Place Sri Lanka keeps you informed."
                    icon={BellIcon}
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            [
                                "whatsapp_notifications",
                                "WhatsApp Stay Reminders",
                                Smartphone,
                            ],
                            ["order_sms", "Email Booking Invoices", Mail],
                            [
                                "email_promotions",
                                "Promotional Discount Alerts",
                                Sparkles,
                            ],
                        ].map(([key, label, Icon]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => togglePreference(key)}
                                className="flex items-center justify-between text-left p-4 rounded-lg border border-slate-200 hover:border-[#1B4D3E]"
                            >
                                <span className="flex items-center gap-3">
                                    <Icon className="w-5 h-5 text-[#D97706]" />
                                    <span>
                                        <strong className="block text-sm text-slate-800">
                                            {label}
                                        </strong>
                                        <small className="text-xs text-slate-500">
                                            Receive timely account updates
                                        </small>
                                    </span>
                                </span>
                                <span
                                    className={`w-10 h-5 rounded-full ${notifications[key] ? "bg-[#1B4D3E]" : "bg-slate-300"}`}
                                >
                                    <span
                                        className={`block w-3.5 h-3.5 mt-0.5 bg-white rounded-full transition-transform ${notifications[key] ? "translate-x-5" : "translate-x-1"}`}
                                    />
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-6 max-w-sm">
                        <Field label="Preferred Currency">
                            <select
                                value={profile.preferred_currency || "LKR"}
                                onChange={(e) =>
                                    saveProfile({
                                        preferred_currency: e.target.value,
                                    })
                                }
                                className={inputClass}
                            >
                                {currencyOptions.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </Field>
                    </div>
                </Panel>
            )}
        </div>
    );
}

function BellIcon(props) {
    return <Bell {...props} />;
}
