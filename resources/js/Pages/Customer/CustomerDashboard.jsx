import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    CalendarDays,
    Compass,
    Heart,
    Map,
    MapPin,
    MessageCircle,
    Package,
    PhoneCall,
    ShieldCheck,
    Sparkles,
    WalletCards,
} from "lucide-react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { useRealtimeCustomerDashboard } from "@/Hooks/useRealtimeCustomerDashboard";
import MetricCard from "./Partials/MetricCard";
import DeliveryTracker from "./Partials/DeliveryTracker";
import RecommendedPlaceCard from "./Partials/RecommendedPlaceCard";

const recommendations = [
    {
        id: "abhayagiriya",
        title: "Abhayagiriya Sacred Retreat",
        district: "Anuradhapura",
        location: "Anuradhapura, North Central Province",
        distance: "4 km from the Sacred City",
        image: "/images/abhayagiri_1779380471030.png",
    },
    {
        id: "jaya-sri",
        title: "Jaya Sri Maha Bodhi Garden Stay",
        district: "Anuradhapura",
        location: "Anuradhapura, North Central Province",
        distance: "2 km from the Sacred City",
        image: "/images/jaya_sri_maha_bodhi.png",
    },
    {
        id: "ruwanweli",
        title: "Ruwanwelisaya Heritage Homestay",
        district: "Anuradhapura",
        location: "Anuradhapura, North Central Province",
        distance: "3 km from the Sacred City",
        image: "/images/ruwanweli_maha_seya.png",
    },
    {
        id: "jetavanaramaya",
        title: "Jetavanaramaya Heritage Lodge",
        district: "Anuradhapura",
        location: "Anuradhapura, North Central Province",
        distance: "5 km from the Sacred City",
        image: "/images/jetavanarama_1779380489792.png",
    },
];

function Toast({ toast, onClose }) {
    return toast ? (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B4D3E] text-white rounded-lg shadow-lg px-4 py-3 text-sm flex gap-3 items-center">
            <span>{toast.message}</span>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close notification"
            >
                x
            </button>
        </div>
    ) : null;
}
function Countdown({ date }) {
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(timer);
    }, []);
    const days = Math.max(
        0,
        Math.ceil((new Date(date).getTime() - now) / 86400000),
    );
    return (
        <span>
            {days} {days === 1 ? "day" : "days"}
        </span>
    );
}

export default function CustomerDashboard() {
    const { state, isLoading } = useRealtimeCustomerDashboard();
    const [toast, setToast] = useState(null);
    const [saved, setSaved] = useState(() => new Set());
    const profile = state?.profile;
    const bookings = state?.bookings || [];
    const orders = state?.orders || [];
    const nextTrip = bookings.find(
        (booking) =>
            booking.status === "Upcoming" || booking.status === "Active",
    );
    const activeOrder = orders.find(
        (order) => !["Delivered", "Cancelled"].includes(order.status),
    );
    const firstName = profile?.first_name || "traveler";
    const greeting =
        new Date().getHours() < 12
            ? "Good morning"
            : new Date().getHours() < 18
              ? "Good afternoon"
              : "Good evening";
    const explored = bookings.filter(
        (booking) => booking.status === "Completed",
    ).length;
    const tier =
        (profile?.eco_points || 0) >= 1000
            ? "Forest Guardian"
            : "Green Explorer";
    const spotlight = nextTrip || {
        property_name: "Abhayagiriya Sacred Retreat",
        property_image: "/images/abhayagiri_1779380471030.png",
        check_in: new Date(Date.now() + 86400000 * 5).toISOString(),
        host_whatsapp: "+94771234567",
        district: "Anuradhapura, North Central Province",
    };
    const order = activeOrder
        ? {
              ...activeOrder,
              carrier_name:
                  activeOrder.shipping_carrier || "Anuradhapura Express",
              status:
                  activeOrder.status === "Shipped"
                      ? "Dispatched"
                      : activeOrder.status,
          }
        : null;
    const toggleSaved = (id) => {
        setSaved((current) => {
            const next = new Set(current);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
        setToast({ message: "Saved places updated" });
    };

    if (isLoading || !state)
        return (
            <CustomerLayout header="Dashboard">
                <div className="animate-pulse space-y-6">
                    <div className="h-44 bg-slate-200 rounded-xl" />
                    <div className="grid md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-32 bg-slate-200 rounded-xl"
                            />
                        ))}
                    </div>
                    <div className="h-72 bg-slate-200 rounded-xl" />
                </div>
            </CustomerLayout>
        );

    return (
        <CustomerLayout header="Dashboard">
            <Head title="Customer Dashboard - Secret Place Sri Lanka" />
            <div className="space-y-7">
                <section className="rounded-xl bg-[#1B4D3E] text-white p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute -right-12 -top-16 opacity-10">
                        <Sparkles className="w-64 h-64" />
                    </div>
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-emerald-200 text-sm font-semibold">
                                {greeting}, {firstName}
                            </p>
                            <h1 className="text-3xl md:text-4xl font-bold font-sansDisplay mt-1">
                                Ayubowan, your next secret is waiting.
                            </h1>
                            <p className="text-emerald-100/75 mt-2 max-w-xl">
                                Your Anuradhapura journey, sacred stays, and
                                sustainable discoveries in one calm view.
                            </p>
                        </div>
                        <div className="bg-white/10 border border-white/15 rounded-lg px-5 py-4 min-w-[210px]">
                            <p className="text-xs uppercase tracking-wider text-emerald-200">
                                Next trip
                            </p>
                            <p className="text-xl font-bold mt-1">
                                {nextTrip ? (
                                    <Countdown date={nextTrip.check_in} />
                                ) : (
                                    "Plan your escape"
                                )}
                            </p>
                            <p className="text-sm text-emerald-100/80">
                                {nextTrip?.property_name ||
                                    "Explore hidden places"}
                            </p>
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <MetricCard
                        icon={CalendarDays}
                        label="Upcoming Trips"
                        value={
                            bookings.filter(
                                (item) =>
                                    item.status === "Upcoming" ||
                                    item.status === "Active",
                            ).length
                        }
                        detail="Reservations ready to go"
                        href={route("customer.bookings")}
                    />
                    <MetricCard
                        icon={Package}
                        label="In-Transit Orders"
                        value={
                            orders.filter(
                                (item) =>
                                    !["Delivered", "Cancelled"].includes(
                                        item.status,
                                    ),
                            ).length
                        }
                        detail="Crafts making their way to you"
                        accent="amber"
                        href={route("customer.orders")}
                    />
                    <MetricCard
                        icon={Compass}
                        label="Secret Places Explored"
                        value={explored}
                        detail="Completed stays and visits"
                    />
                    <MetricCard
                        icon={Sparkles}
                        label="Eco-Travel Points"
                        value={(profile.eco_points || 0).toLocaleString()}
                        detail={tier}
                        accent="amber"
                    />
                </section>
                <section className="grid xl:grid-cols-5 gap-6">
                    <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="relative h-56 md:h-72">
                            <img
                                src={spotlight.property_image}
                                alt={spotlight.property_name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                            <div className="absolute left-6 right-6 bottom-5 text-white">
                                <p className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                                    Next adventure
                                </p>
                                <h2 className="text-2xl font-bold mt-1">
                                    {spotlight.property_name}
                                </h2>
                                <p className="text-sm text-white/80 mt-1 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />{" "}
                                    {spotlight.district ||
                                        "Anuradhapura, North Central Province"}
                                    {" · Check-in "}
                                    {new Date(
                                        spotlight.check_in,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="p-5 flex flex-wrap gap-3">
                            <a
                                href="/bookings"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                            >
                                <WalletCards className="w-4 h-4" /> View voucher
                            </a>
                            <a
                                href={`https://wa.me/${(spotlight.host_whatsapp || "").replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-emerald-800 text-sm font-bold"
                            >
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                                host
                            </a>
                            <button
                                type="button"
                                onClick={() =>
                                    setToast({
                                        message: "Route opened in your map app",
                                    })
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold"
                            >
                                <Map className="w-4 h-4" /> Open route
                            </button>
                        </div>
                    </div>
                    <aside className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#D97706] font-bold">
                                    Eco identity
                                </p>
                                <h2 className="text-xl font-bold text-slate-900 mt-1">
                                    {tier}
                                </h2>
                            </div>
                            <ShieldCheck className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div className="mt-6 h-2 rounded-full bg-slate-100">
                            <div className="h-full w-3/4 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-sm text-slate-500 mt-3">
                            {profile.eco_points || 0} points · 250 more to your
                            next tier
                        </p>
                        <div className="mt-7 space-y-3 text-sm">
                            <a
                                href="/translator"
                                className="flex items-center justify-between text-slate-700 hover:text-[#1B4D3E]"
                            >
                                AI Cultural Translator{" "}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="/places"
                                className="flex items-center justify-between text-slate-700 hover:text-[#1B4D3E]"
                            >
                                Secret Map <ArrowRight className="w-4 h-4" />
                            </a>
                            <a
                                href="tel:1912"
                                className="flex items-center justify-between text-red-700 font-semibold"
                            >
                                Emergency SOS · 1912{" "}
                                <PhoneCall className="w-4 h-4" />
                            </a>
                        </div>
                    </aside>
                </section>
                <DeliveryTracker
                    order={order}
                    onToast={(message) => setToast({ message })}
                />
                <section>
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#D97706] font-bold">
                                Curated in Anuradhapura
                            </p>
                            <h2 className="text-xl font-bold text-slate-900 mt-1">
                                Recommended Secret Places in Anuradhapura
                            </h2>
                        </div>
                        <Link
                            href="/places"
                            className="text-sm font-bold text-[#1B4D3E] flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {recommendations.map((place) => (
                            <RecommendedPlaceCard
                                key={place.id}
                                place={place}
                                saved={saved.has(place.id)}
                                onToggle={toggleSaved}
                            />
                        ))}
                    </div>
                </section>
                <Toast toast={toast} onClose={() => setToast(null)} />
            </div>
        </CustomerLayout>
    );
}
