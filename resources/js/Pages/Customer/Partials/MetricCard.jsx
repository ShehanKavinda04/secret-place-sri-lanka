import React from "react";

export default function MetricCard({
    icon: Icon,
    label,
    value,
    detail,
    href,
    accent = "green",
}) {
    const content = (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all h-full">
            <div className="flex items-start justify-between gap-3">
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent === "amber" ? "bg-amber-50 text-[#D97706]" : "bg-emerald-50 text-[#1B4D3E]"}`}
                >
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-400">
                    Live
                </span>
            </div>
            <p className="mt-5 text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-sm font-semibold text-slate-600 mt-1">{label}</p>
            <p className="text-xs text-slate-400 mt-2">{detail}</p>
        </div>
    );
    return href ? (
        <a href={href} className="block">
            {content}
        </a>
    ) : (
        content
    );
}
