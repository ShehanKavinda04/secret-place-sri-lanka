import React, { useState } from "react";
import { Check, Copy, Share2, X } from "lucide-react";
export default function ShareWishlistModal({ open, onClose, onToast }) {
    const [copied, setCopied] = useState(false);
    if (!open) return null;
    const link = `${window.location.origin}/wishlist/shared/Emma`;
    const copy = async () => {
        await navigator.clipboard?.writeText(link);
        setCopied(true);
        onToast("Wishlist link copied");
    };
    return (
        <div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <Share2 className="w-5 h-5 text-[#D97706]" />
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Share your saved collection
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Let a travel companion see your Sri Lankan
                                picks.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close share modal"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="mt-6 flex gap-2">
                    <input
                        readOnly
                        value={link}
                        className="flex-1 rounded-lg border-slate-300 text-sm bg-slate-50"
                    />
                    <button
                        type="button"
                        onClick={copy}
                        className="p-3 rounded-lg bg-[#1B4D3E] text-white"
                        aria-label="Copy wishlist link"
                    >
                        {copied ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                </div>
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(`See my Secret Place Sri Lanka wishlist: ${link}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center mt-4 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-bold"
                >
                    Share via WhatsApp
                </a>
            </div>
        </div>
    );
}
