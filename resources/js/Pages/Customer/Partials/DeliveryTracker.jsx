import React from "react";
import { Check, Copy, Package, Truck } from "lucide-react";

const steps = ["Order Placed", "Packed", "Dispatched", "Out for Delivery"];

export default function DeliveryTracker({ order, onToast }) {
    if (!order)
        return (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                No active deliveries right now.
            </div>
        );
    const current = Math.max(
        0,
        steps.findIndex(
            (step) => step.toLowerCase() === order.status.toLowerCase(),
        ),
    );
    const copyTracking = async () => {
        await navigator.clipboard?.writeText(order.tracking_number || "");
        onToast?.("Tracking number copied", "success");
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                        Live product delivery
                    </p>
                    <h2 className="text-lg font-bold text-slate-900 mt-1">
                        {order.item_name}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {order.carrier_name || "Anuradhapura Express"} · ETA{" "}
                        {order.eta || "3 days"}
                    </p>
                </div>
                <Truck className="w-6 h-6 text-[#1B4D3E]" />
            </div>
            <div className="mt-8 grid grid-cols-4 gap-2">
                {steps.map((step, index) => (
                    <div key={step} className="relative text-center">
                        <div
                            className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${index <= current ? "bg-[#1B4D3E] text-white" : "bg-slate-100 text-slate-400"}`}
                        >
                            {index < current ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Package className="w-4 h-4" />
                            )}
                        </div>
                        <p
                            className={`text-[11px] mt-2 ${index <= current ? "font-bold text-[#1B4D3E]" : "text-slate-400"}`}
                        >
                            {step}
                        </p>
                        {index < steps.length - 1 && (
                            <span
                                className={`absolute top-4 left-1/2 w-full h-0.5 ${index < current ? "bg-[#1B4D3E]" : "bg-slate-100"}`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                <div>
                    <p className="text-xs text-slate-500">Tracking number</p>
                    <p className="text-sm font-bold text-slate-800">
                        {order.tracking_number || "Pending assignment"}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={copyTracking}
                    className="p-2 text-slate-500 hover:text-[#1B4D3E]"
                    title="Copy tracking number"
                    aria-label="Copy tracking number"
                >
                    <Copy className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
