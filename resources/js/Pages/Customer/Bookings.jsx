import React, { useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { CalendarDays, CheckCircle2, Search } from "lucide-react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { useRealtimeBookings } from "@/Hooks/useRealtimeBookings";
import BookingCard from "./Partials/BookingCard";
import CancellationModal from "./Partials/CancellationModal";
import ReviewDrawer from "./Partials/ReviewDrawer";

const filters = ["All", "Upcoming", "Active Stays", "Completed", "Cancelled"];

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

export default function Bookings() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState("All months");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [reviewBooking, setReviewBooking] = useState(null);
    const [isMutating, setIsMutating] = useState(false);
    const [toast, setToast] = useState(null);
    const {
        bookings,
        allBookings,
        isLoading,
        cancelReservation,
        submitReview,
    } = useRealtimeBookings(undefined, statusFilter);
    const visibleBookings = useMemo(
        () =>
            bookings.filter((booking) => {
                const query = search.toLowerCase();
                const matchesSearch =
                    !query ||
                    booking.property_name.toLowerCase().includes(query) ||
                    booking.booking_reference.toLowerCase().includes(query);
                const date = new Date(booking.check_in);
                const matchesMonth =
                    month === "All months" || date.getMonth() === Number(month);
                return matchesSearch && matchesMonth;
            }),
        [bookings, month, search],
    );
    const upcomingCount = allBookings.filter((booking) =>
        ["Upcoming", "Active"].includes(booking.status),
    ).length;

    const handleCancel = async (reason) => {
        setIsMutating(true);
        try {
            await cancelReservation(selectedBooking.id, reason);
            setToast({ message: "Cancellation request submitted" });
            setSelectedBooking(null);
        } catch {
            setToast({
                message: "Cancellation failed. Your booking is unchanged.",
            });
        } finally {
            setIsMutating(false);
        }
    };
    const handleReview = async (review) => {
        setIsMutating(true);
        try {
            await submitReview(reviewBooking.id, review);
            setToast({ message: "Thank you for reviewing your stay" });
            setReviewBooking(null);
        } catch {
            setToast({ message: "Review could not be submitted" });
        } finally {
            setIsMutating(false);
        }
    };

    return (
        <CustomerLayout header="My Bookings">
            <Head title="My Bookings & Trips" />
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-[#D97706]">
                            Your journey archive
                        </p>
                        <h1 className="text-3xl font-bold text-slate-900 font-sansDisplay mt-1">
                            My Bookings & Stays
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">
                            {upcomingCount} active or upcoming{" "}
                            {upcomingCount === 1 ? "adventure" : "adventures"}
                        </p>
                    </div>
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search property or booking ID"
                            aria-label="Search property or booking ID"
                            className="w-full h-11 rounded-lg border border-slate-300 bg-white px-4 pl-10 text-sm leading-5 text-slate-900 placeholder:text-slate-400 caret-[#1B4D3E] shadow-sm outline-none transition-colors focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/20 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400"
                        />
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 overflow-x-auto">
                    <div className="flex min-w-max gap-1">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setStatusFilter(filter)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusFilter === filter ? "bg-[#1B4D3E] text-white" : "text-slate-500 hover:bg-slate-50"}`}
                            >
                                {filter}
                                {filter !== "All" && (
                                    <span className="ml-1.5 text-xs opacity-70">
                                        {filter === "Upcoming"
                                            ? allBookings.filter(
                                                  (item) =>
                                                      item.status ===
                                                      "Upcoming",
                                              ).length
                                            : filter === "Active Stays"
                                              ? allBookings.filter(
                                                    (item) =>
                                                        item.status ===
                                                        "Active",
                                                ).length
                                              : ""}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end">
                    <select
                        value={month}
                        onChange={(event) => setMonth(event.target.value)}
                        aria-label="Filter bookings by month"
                        className="h-10 min-w-32 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium leading-5 text-slate-900 shadow-sm outline-none transition-colors focus:border-[#1B4D3E] focus:ring-2 focus:ring-[#1B4D3E]/20 dark:bg-white dark:text-slate-900"
                    >
                        <option>All months</option>
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index} value={index}>
                                {new Date(2024, index).toLocaleString("en", {
                                    month: "long",
                                })}
                            </option>
                        ))}
                    </select>
                </div>
                {isLoading ? (
                    <div className="space-y-5 animate-pulse">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="h-64 rounded-xl bg-slate-200"
                            />
                        ))}
                    </div>
                ) : visibleBookings.length ? (
                    <div className="space-y-5">
                        {visibleBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onCancel={setSelectedBooking}
                                onReview={setReviewBooking}
                                onToast={(message) => setToast({ message })}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <CalendarDays className="w-10 h-10 text-slate-300 mx-auto" />
                        <h2 className="text-lg font-bold text-slate-900 mt-4">
                            No bookings found in this category
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Your next Sri Lankan escape may be waiting somewhere
                            unexpected.
                        </p>
                        <a
                            href="/places"
                            className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                        >
                            Explore Secret Places
                        </a>
                    </div>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                    Booking statuses update automatically when your host
                    confirms a change.
                </div>
            </div>
            <CancellationModal
                booking={selectedBooking}
                busy={isMutating}
                onClose={() => setSelectedBooking(null)}
                onConfirm={handleCancel}
            />
            <ReviewDrawer
                booking={reviewBooking}
                busy={isMutating}
                onClose={() => setReviewBooking(null)}
                onSubmit={handleReview}
            />
            <Toast toast={toast} onClose={() => setToast(null)} />
        </CustomerLayout>
    );
}
