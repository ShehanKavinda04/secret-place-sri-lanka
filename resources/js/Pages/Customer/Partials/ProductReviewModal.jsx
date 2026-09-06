import React, { useState } from "react";
import { Star, X } from "lucide-react";
export default function ProductReviewModal({ order, busy, onClose, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    if (!order) return null;
    return (
        <div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[#D97706] font-bold">
                            Product review
                        </p>
                        <h2 className="text-lg font-bold text-slate-900 mt-1">
                            How was your order?
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close review modal"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="flex gap-1 mt-6">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            type="button"
                            key={value}
                            onClick={() => setRating(value)}
                            aria-label={`${value} star rating`}
                        >
                            <Star
                                className={`w-7 h-7 ${rating >= value ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                            />
                        </button>
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    rows="4"
                    placeholder="Tell other travelers about this Sri Lankan craft..."
                    className="w-full rounded-lg border-slate-300 text-sm mt-5"
                />
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={!rating || busy}
                        onClick={() =>
                            onSubmit({ rating, comment, order_id: order.id })
                        }
                        className="px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold disabled:opacity-50"
                    >
                        {busy ? "Submitting..." : "Submit review"}
                    </button>
                </div>
            </div>
        </div>
    );
}
