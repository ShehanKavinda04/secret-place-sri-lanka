import React from "react";
import {
    CalendarDays,
    Check,
    Clock3,
    Download,
    ExternalLink,
    MapPin,
    MessageCircle,
    Star,
    XCircle,
} from "lucide-react";

const statusStyles = {
    Upcoming: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Active: "bg-sky-50 text-sky-700 border-sky-200",
    Completed: "bg-slate-100 text-slate-600 border-slate-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function BookingCard({ booking, onCancel, onReview, onToast }) {
    const nights =
        booking.nights_count ||
        Math.max(
            1,
            Math.ceil(
                (new Date(booking.check_out) - new Date(booking.check_in)) /
                    86400000,
            ),
        );
    const message = encodeURIComponent(
        `Ayubowan! I am arriving for booking ${booking.booking_reference}. Could you please confirm the check-in details?`,
    );
    const directions =
        booking.latitude && booking.longitude
            ? `https://www.google.com/maps/dir/?api=1&destination=${booking.latitude},${booking.longitude}`
            : "/places";
    const downloadVoucher = () => {
        window.print();
        onToast("Voucher print dialog opened", "success");
    };

    return (
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="grid lg:grid-cols-[260px_1fr]">
                <div className="relative h-52 lg:h-full min-h-[220px]">
                    <img
                        src={booking.property_image}
                        alt={booking.property_name}
                        className="w-full h-full object-cover"
                    />
                    <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full border text-xs font-bold ${statusStyles[booking.status] || statusStyles.Upcoming}`}
                    >
                        {booking.status === "Upcoming"
                            ? "Confirmed"
                            : booking.status}
                    </span>
                </div>
                <div className="p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {booking.property_name}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-[#D97706]" />
                                {booking.district || "Sri Lanka"}{" "}
                                <span className="text-slate-300">·</span>{" "}
                                {booking.category || "Stay"}
                            </p>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                            {booking.booking_reference}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 rounded-lg bg-slate-50">
                        <div>
                            <p className="text-xs text-slate-500">Check-in</p>
                            <p className="text-sm font-bold text-slate-800 mt-1">
                                {new Date(
                                    booking.check_in,
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-500">
                                {booking.check_in_time || "14:00"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Check-out</p>
                            <p className="text-sm font-bold text-slate-800 mt-1">
                                {new Date(
                                    booking.check_out,
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-500">
                                {booking.check_out_time || "11:00"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">
                                Guests / nights
                            </p>
                            <p className="text-sm font-bold text-slate-800 mt-1">
                                {booking.guests_count || 2} guests
                            </p>
                            <p className="text-xs text-slate-500">
                                {nights} {nights === 1 ? "night" : "nights"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Total paid</p>
                            <p className="text-sm font-bold text-slate-800 mt-1">
                                {booking.currency || "LKR"}{" "}
                                {(booking.total_amount || 0).toLocaleString()}
                            </p>
                            <p className="text-xs text-emerald-700">
                                {booking.payment_method || "Paid"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5">
                        <a
                            href={`https://wa.me/${(booking.host_whatsapp || "").replace(/[^0-9]/g, "")}?text=${message}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-bold"
                        >
                            <MessageCircle className="w-4 h-4" /> Host
                        </a>
                        <a
                            href={directions}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold"
                        >
                            <ExternalLink className="w-4 h-4" /> Directions
                        </a>
                        <button
                            type="button"
                            onClick={downloadVoucher}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold"
                        >
                            <Download className="w-4 h-4" /> Voucher
                        </button>
                        {booking.status === "Completed" &&
                            !booking.has_reviewed && (
                                <button
                                    type="button"
                                    onClick={() => onReview(booking)}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                                >
                                    <Star className="w-4 h-4" /> Review stay
                                </button>
                            )}
                        {["Upcoming", "Active"].includes(booking.status) && (
                            <button
                                type="button"
                                onClick={() => onCancel(booking)}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-rose-700 text-sm font-bold"
                            >
                                <XCircle className="w-4 h-4" /> Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
