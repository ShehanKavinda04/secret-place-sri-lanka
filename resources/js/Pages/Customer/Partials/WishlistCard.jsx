import React from "react";
import { Heart, MapPin, ShoppingBag, Star } from "lucide-react";

export default function WishlistCard({
    item,
    onRemove,
    onPrimaryAction,
    onToast,
}) {
    const isProperty = item.item_type === "property";
    return (
        <article className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="relative h-48">
                <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-slate-700">
                    {isProperty
                        ? item.district || item.location
                        : "Handcrafted in Sri Lanka"}
                </span>
                <button
                    type="button"
                    onClick={() => onRemove(item)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-rose-500 shadow-sm hover:bg-rose-50"
                    aria-label={`Remove ${item.title}`}
                >
                    <Heart className="w-4 h-4" fill="currentColor" />
                </button>
            </div>
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="font-bold text-slate-900 leading-tight">
                            {item.title}
                        </h2>
                        <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                            {item.location}
                        </p>
                    </div>
                    {isProperty && (
                        <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {item.rating || "4.8"}
                        </span>
                    )}
                </div>
                {isProperty ? (
                    <>
                        <p className="text-xs text-slate-500 mt-3">
                            Hosted by {item.host_name || "local host"} ·
                            Eco-rating {item.eco_rating || "4.8"}
                        </p>
                        <div className="flex items-center justify-between mt-5">
                            <div>
                                <span className="text-lg font-bold text-[#1B4D3E]">
                                    {item.price}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {" "}
                                    / night
                                </span>
                            </div>
                            <span className="text-xs font-semibold text-amber-700">
                                {item.availability_label || "Available"}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => onPrimaryAction(item)}
                            className="w-full mt-4 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                        >
                            Book Now
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-xs text-slate-500 mt-3">
                            {item.seller_name || "Verified Artisan"} ·{" "}
                            {item.product_variant || "Artisan product"}
                        </p>
                        <div className="flex items-center justify-between mt-5">
                            <div>
                                <span className="text-xs text-slate-400 line-through mr-2">
                                    {item.price}
                                </span>
                                <span className="text-lg font-bold text-[#1B4D3E]">
                                    LKR{" "}
                                    {(
                                        item.discount_price || 0
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-700">
                                {item.stock_label || "In stock"}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                onPrimaryAction(item);
                                onToast("Added to cart");
                            }}
                            className="w-full mt-4 py-2 rounded-lg bg-[#D97706] text-white text-sm font-bold inline-flex items-center justify-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                        </button>
                    </>
                )}
            </div>
        </article>
    );
}
