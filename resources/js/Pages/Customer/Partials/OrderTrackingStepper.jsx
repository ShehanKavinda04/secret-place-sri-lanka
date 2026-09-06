import React from "react";
import { Check, Package } from "lucide-react";

const steps = ["Order Placed", "Packed", "Dispatched", "Delivered"];
export default function OrderTrackingStepper({ order }) {
    const active =
        order.status === "Out for Delivery" || order.status === "Shipped"
            ? 2
            : order.status === "Delivered"
              ? 3
              : steps.findIndex((step) => step === order.status);
    return (
        <div className="mt-5 grid grid-cols-4 gap-2">
            {steps.map((step, index) => (
                <div key={step} className="relative text-center">
                    <div
                        className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${index <= active ? "bg-[#1B4D3E] text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                        {index < active || order.status === "Delivered" ? (
                            <Check className="w-4 h-4" />
                        ) : (
                            <Package className="w-4 h-4" />
                        )}
                    </div>
                    <p
                        className={`text-[11px] mt-2 ${index <= active ? "font-bold text-[#1B4D3E]" : "text-slate-400"}`}
                    >
                        {step}
                    </p>
                    {index < steps.length - 1 && (
                        <span
                            className={`absolute top-4 left-1/2 w-full h-0.5 ${index < active ? "bg-[#1B4D3E]" : "bg-slate-100"}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
