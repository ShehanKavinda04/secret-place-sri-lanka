import React from "react";
import { Bookmark, MapPin } from "lucide-react";

export default function RecommendedPlaceCard({ place, saved, onToggle }) {
    return (
        <article className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="relative h-40">
                <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover"
                />
                <button
                    type="button"
                    onClick={() => onToggle(place.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-sm ${saved ? "bg-[#1B4D3E] text-white" : "bg-white/90 text-slate-600"}`}
                    aria-label={
                        saved
                            ? `Remove ${place.title} bookmark`
                            : `Bookmark ${place.title}`
                    }
                >
                    <Bookmark
                        className="w-4 h-4"
                        fill={saved ? "currentColor" : "none"}
                    />
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-slate-900 leading-tight">
                    {place.title}
                </h3>
                <p className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    {place.district} · {place.distance}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-emerald-700">
                        Eco-certified
                    </span>
                    <a
                        href="/places"
                        className="text-xs font-bold text-[#1B4D3E] hover:text-[#D97706]"
                    >
                        Book now
                    </a>
                </div>
            </div>
        </article>
    );
}
