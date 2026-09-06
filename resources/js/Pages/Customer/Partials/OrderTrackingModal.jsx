import React from "react";
import { Clock3, ExternalLink, X } from "lucide-react";
export default function OrderTrackingModal({ order, onClose }) {
    if (!order) return null;
    const events = order.tracking_events || [
        { label: order.status, timestamp: order.order_date, completed: true },
    ];
    return (
        <div className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-[#D97706] font-bold">
                            Courier timeline
                        </p>
                        <h2 className="text-xl font-bold text-slate-900 mt-1">
                            ORD-{order.id}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close tracking modal"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="mt-6 space-y-5">
                    {events.map((event, index) => (
                        <div
                            key={`${event.label}-${index}`}
                            className="flex gap-3"
                        >
                            <div
                                className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${event.completed ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"}`}
                            >
                                <Clock3 className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">
                                    {event.label}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {event.timestamp
                                        ? new Date(
                                              event.timestamp,
                                          ).toLocaleString()
                                        : "Awaiting update"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {order.tracking_url && (
                    <a
                        href={order.tracking_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1B4D3E]"
                    >
                        Open courier tracking{" "}
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>
    );
}
