import React, { useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { Heart, Map, Search, Share2 } from "lucide-react";
import CustomerLayout from "@/Layouts/CustomerLayout";
import { useRealtimeWishlist } from "@/Hooks/useRealtimeWishlist";
import WishlistCard from "./Partials/WishlistCard";
import ShareWishlistModal from "./Partials/ShareWishlistModal";

const filters = [
    "All Saved",
    "Secret Destinations & Stays",
    "Handicrafts & Souvenirs",
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

export default function Wishlist() {
    const [filter, setFilter] = useState("All Saved");
    const [search, setSearch] = useState("");
    const [shareOpen, setShareOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const {
        items,
        allItems,
        isLoading,
        removeFromWishlist,
        moveToCartOrBooking,
    } = useRealtimeWishlist(undefined, filter);
    const visibleItems = useMemo(
        () =>
            items.filter((item) => {
                const query = search.toLowerCase();
                return (
                    !query ||
                    item.title.toLowerCase().includes(query) ||
                    item.location.toLowerCase().includes(query) ||
                    item.district?.toLowerCase().includes(query)
                );
            }),
        [items, search],
    );
    const handleRemove = async (item) => {
        const message = `${item.title} removed from your saved collection`;
        try {
            await removeFromWishlist(item.item_id);
            setToast(message);
        } catch {
            setToast("Could not remove this item. It is still saved.");
        }
    };
    const handlePrimary = (item) => {
        window.location.href = moveToCartOrBooking(item);
    };
    return (
        <CustomerLayout header="Wishlist">
            <Head title="My Saved Collection" />
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-[#D97706]">
                            Your personal travel board
                        </p>
                        <h1 className="text-3xl font-bold text-slate-900 font-sansDisplay mt-1">
                            My Saved Collection{" "}
                            <span className="inline-flex align-middle ml-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">
                                {allItems.length}
                            </span>
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">
                            Keep hidden stays and meaningful Sri Lankan crafts
                            close at hand.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search saved items"
                                className="w-full sm:w-64 rounded-lg border-slate-300 pl-10 text-sm"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShareOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                        >
                            <Share2 className="w-4 h-4" /> Share wishlist
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 overflow-x-auto">
                    <div className="flex min-w-max gap-1">
                        {filters.map((item) => (
                            <button
                                type="button"
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === item ? "bg-[#1B4D3E] text-white" : "text-slate-500 hover:bg-slate-50"}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                {isLoading ? (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 animate-pulse">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-80 bg-slate-200 rounded-xl"
                            />
                        ))}
                    </div>
                ) : visibleItems.length ? (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {visibleItems.map((item) => (
                            <WishlistCard
                                key={item.id}
                                item={item}
                                onRemove={handleRemove}
                                onPrimaryAction={handlePrimary}
                                onToast={setToast}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <Heart className="w-10 h-10 text-rose-300 mx-auto" />
                        <h2 className="text-lg font-bold text-slate-900 mt-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Save a quiet stay or a thoughtful craft and it will
                            appear here.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5">
                            <a
                                href="/places"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                            >
                                <Map className="w-4 h-4" /> Explore Secret
                                Destinations
                            </a>
                            <a
                                href="/craft-items"
                                className="px-5 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold"
                            >
                                Visit Craft Marketplace
                            </a>
                        </div>
                    </div>
                )}
                <ShareWishlistModal
                    open={shareOpen}
                    onClose={() => setShareOpen(false)}
                    onToast={setToast}
                />
                <Toast toast={toast} onClose={() => setToast(null)} />
            </div>
        </CustomerLayout>
    );
}
