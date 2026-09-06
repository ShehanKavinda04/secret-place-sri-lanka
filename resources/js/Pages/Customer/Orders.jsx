import React, { useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { CheckCircle2, Package, Search } from "lucide-react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { useRealtimeCustomerOrders } from "@/Hooks/useRealtimeCustomerOrders";
import OrderCard from "./Partials/OrderCard";
import OrderTrackingModal from "./Partials/OrderTrackingModal";
import ProductReviewModal from "./Partials/ProductReviewModal";

const filters = [
    "All Orders",
    "In Progress",
    "Shipped / In Transit",
    "Delivered",
    "Cancelled",
];
function Toast({ toast, onClose }) {
    return toast ? (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B4D3E] text-white rounded-lg shadow-lg px-4 py-3 text-sm flex gap-3 items-center">
            <span>{toast}</span>
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

export default function Orders() {
    const [statusFilter, setStatusFilter] = useState("All Orders");
    const [search, setSearch] = useState("");
    const [orderModal, setOrderModal] = useState(null);
    const [reviewOrder, setReviewOrder] = useState(null);
    const [busy, setBusy] = useState(false);
    const [toast, setToast] = useState(null);
    const {
        orders,
        allOrders,
        isLoading,
        confirmOrderDelivery,
        submitOrderReview,
    } = useRealtimeCustomerOrders(undefined, statusFilter);
    const visibleOrders = useMemo(
        () =>
            orders.filter((order) => {
                const query = search.toLowerCase();
                return (
                    !query ||
                    order.id.toLowerCase().includes(query) ||
                    order.item_name.toLowerCase().includes(query) ||
                    order.items?.some((item) =>
                        item.title.toLowerCase().includes(query),
                    )
                );
            }),
        [orders, search],
    );
    const inTransit = allOrders.filter((order) =>
        ["Shipped", "Out for Delivery", "Packed"].includes(order.status),
    ).length;
    const handleConfirm = async (order) => {
        setBusy(true);
        try {
            await confirmOrderDelivery(order.id);
            setToast("Delivery confirmed");
        } catch {
            setToast("Could not confirm delivery");
        } finally {
            setBusy(false);
        }
    };
    const handleReview = async (review) => {
        setBusy(true);
        try {
            await submitOrderReview(reviewOrder.id, review);
            setReviewOrder(null);
            setToast("Thank you for reviewing your product");
        } catch {
            setToast("Review could not be submitted");
        } finally {
            setBusy(false);
        }
    };
    return (
        <CustomerLayout header="My Orders">
            <Head title="My Orders & Deliveries" />
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-[#D97706]">
                            Sri Lankan craft marketplace
                        </p>
                        <h1 className="text-3xl font-bold text-slate-900 font-sansDisplay mt-1">
                            My Orders & Deliveries
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">
                            {inTransit}{" "}
                            {inTransit === 1 ? "item is" : "items are"}{" "}
                            currently in transit
                        </p>
                    </div>
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search order or product"
                            className="w-full rounded-lg border-slate-300 pl-10 text-sm"
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
                            </button>
                        ))}
                    </div>
                </div>
                {isLoading ? (
                    <div className="space-y-5 animate-pulse">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="h-72 rounded-xl bg-slate-200"
                            />
                        ))}
                    </div>
                ) : visibleOrders.length ? (
                    <div className="space-y-5">
                        {visibleOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onTrack={setOrderModal}
                                onConfirm={handleConfirm}
                                onReview={setReviewOrder}
                                onToast={setToast}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <Package className="w-10 h-10 text-slate-300 mx-auto" />
                        <h2 className="text-lg font-bold text-slate-900 mt-4">
                            No orders found in this category
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Discover tea, spices, and handcrafted goods from Sri
                            Lankan makers.
                        </p>
                        <a
                            href="/craft-items"
                            className="inline-flex mt-5 px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                        >
                            Visit the MSME Craft Store
                        </a>
                    </div>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                    Delivery updates stream automatically from your courier
                    timeline.
                </div>
            </div>
            <OrderTrackingModal
                order={orderModal}
                onClose={() => setOrderModal(null)}
            />
            <ProductReviewModal
                order={reviewOrder}
                busy={busy}
                onClose={() => setReviewOrder(null)}
                onSubmit={handleReview}
            />
            <Toast toast={toast} onClose={() => setToast(null)} />
        </CustomerLayout>
    );
}
