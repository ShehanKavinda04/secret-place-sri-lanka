import React, { useState, useEffect } from "react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { Head } from "@inertiajs/react";
import { customerProfileService } from "@/Services/customerProfileService";

// ── Section 1 — split into two cards (like BrandCustomizer + BusinessInfoForm)
import ProfileIdentityCard from "./Partials/ProfileHeader";
import PersonalInfoForm from "./Partials/PersonalInfoForm";

// ── Sections 2–5
import ActiveBookings from "./Partials/ActiveBookings";
import OrderHistory from "./Partials/OrderHistory";
import WishlistGrid from "./Partials/WishlistGrid";
import SecurityPreferences from "./Partials/SecurityPreferences";

import {
    UserCircle,
    CalendarDays,
    ShoppingBag,
    Heart,
    Shield,
    CheckCircle2,
    AlertCircle,
    X,
} from "lucide-react";

// ── Shared section-card wrapper ────────────────────────────────────────────
function SectionCard({ icon: Icon, title, children }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            <div className="flex items-center gap-3 px-6 md:px-8 py-5 border-b border-slate-100">
                {Icon && (
                    <Icon className="w-5 h-5 flex-shrink-0 text-[#D97706]" />
                )}
                <h2 className="text-lg font-bold text-slate-900 font-sansDisplay">
                    {title}
                </h2>
            </div>
            <div className="px-6 md:px-8 py-8">{children}</div>
        </div>
    );
}

// ── Floating toast ─────────────────────────────────────────────────────────
function Toast({ toast, onClose }) {
    if (!toast) return null;
    const ok = toast.type === "success";
    return (
        <div
            className="fixed bottom-6 right-6 z-50 max-w-sm px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-sm"
            style={{
                background: ok ? "rgba(5,46,22,0.95)" : "rgba(69,10,10,0.95)",
                borderColor: ok
                    ? "rgba(52,211,153,0.5)"
                    : "rgba(248,113,113,0.5)",
            }}
        >
            {ok ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            )}
            <span className="text-sm font-medium text-white">
                {toast.message}
            </span>
            <button
                onClick={onClose}
                className="ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
                <X className="w-4 h-4 text-white/60" />
            </button>
        </div>
    );
}

export default function Edit({ auth }) {
    const [profile, setProfile] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const fireToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    useEffect(() => {
        const load = async () => {
            try {
                const data = await customerProfileService.fetchProfileData();
                setProfile(data.profile);
                setNotifications(data.notifications);
                setBookings(data.bookings);
                setOrders(data.orders);
                setWishlist(data.wishlist);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        load();

        const unsub = customerProfileService.subscribe((p, n, b, o, w) => {
            setProfile(p);
            setNotifications(n);
            setBookings(b);
            setOrders(o);
            setWishlist(w);
        });
        return () => unsub();
    }, []);

    // ── Skeleton ─────────────────────────────────────────────────────────────
    if (isLoading || !profile) {
        return (
            <CustomerLayout header="My Profile">
                <div className="animate-pulse space-y-6">
                    <div className="h-64 rounded-xl bg-slate-200" />
                    <div className="h-72 rounded-xl bg-slate-200" />
                    <div className="h-48 rounded-xl bg-slate-200" />
                </div>
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout header="My Profile">
            <Head title="My Profile - Secret Place Sri Lanka" />

            {/* ── Page Canvas ─────────────────────────────────────────────── */}
            <div className="font-sans">
                {/* ── Card 1: Identity (BrandCustomizer equivalent) ────── */}
                <ProfileIdentityCard
                    profile={profile}
                    userId={auth.user.id.toString()}
                    onToast={fireToast}
                />

                <PersonalInfoForm
                    profile={profile}
                    userId={auth.user.id.toString()}
                    onToast={fireToast}
                />
                <SectionCard icon={CalendarDays} title="My Bookings & Trips">
                    <ActiveBookings bookings={bookings} headless />
                </SectionCard>
                <SectionCard icon={ShoppingBag} title="My Orders & Deliveries">
                    <OrderHistory orders={orders} headless />
                </SectionCard>
                <SectionCard icon={Heart} title="Saved Secret Places">
                    <WishlistGrid wishlist={wishlist} headless />
                </SectionCard>
                <SectionCard icon={Shield} title="Security & Notifications">
                    <SecurityPreferences profile={profile} notifications={notifications} headless />
                </SectionCard>
            </div>

            {/* Global toast */}
            <Toast toast={toast} onClose={() => setToast(null)} />
        </CustomerLayout>
    );
}
