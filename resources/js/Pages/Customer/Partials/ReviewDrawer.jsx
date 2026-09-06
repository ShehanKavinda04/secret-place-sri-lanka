import React, { useState } from "react";
import { Camera, Star, X } from "lucide-react";

const categories = ["Cleanliness", "Hospitality", "Location", "Eco-Impact"];
export default function ReviewDrawer({ booking, busy, onClose, onSubmit }) {
    const [ratings, setRatings] = useState(
        Object.fromEntries(categories.map((item) => [item, 0])),
    );
    const [comment, setComment] = useState("");
    if (!booking) return null;
    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/50 flex items-end sm:items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                            Share your stay
                        </p>
                        <h2 className="text-xl font-bold text-slate-900 mt-1">
                            Review {booking.property_name}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close review drawer"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="space-y-4 mt-6">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="flex items-center justify-between"
                        >
                            <span className="text-sm font-semibold text-slate-700">
                                {category}
                            </span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        type="button"
                                        key={rating}
                                        onClick={() =>
                                            setRatings({
                                                ...ratings,
                                                [category]: rating,
                                            })
                                        }
                                        aria-label={`${category} ${rating} stars`}
                                    >
                                        <Star
                                            className={`w-5 h-5 ${ratings[category] >= rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <textarea
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        rows="4"
                        placeholder="What made this stay memorable?"
                        className="w-full rounded-lg border-slate-300 text-sm"
                    />
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 cursor-pointer">
                        <Camera className="w-4 h-4" />
                        Add photos
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                    </label>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600"
                    >
                        Not now
                    </button>
                    <button
                        type="button"
                        disabled={
                            busy ||
                            Object.values(ratings).some((value) => !value)
                        }
                        onClick={() => onSubmit({ ratings, comment })}
                        className="px-5 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold disabled:opacity-50"
                    >
                        {busy ? "Submitting..." : "Submit review"}
                    </button>
                </div>
            </div>
        </div>
    );
}
