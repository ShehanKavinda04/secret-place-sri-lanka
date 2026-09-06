import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function CancellationModal({
    booking,
    busy,
    onClose,
    onConfirm,
}) {
    const [reason, setReason] = useState("Change of plans");
    if (!booking) return null;
    return (
        <div
            className="fixed inset-0 z-50 bg-slate-950/50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Cancel this booking?
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                {booking.property_name}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close cancellation dialog"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                    <strong className="text-slate-800">
                        Cancellation policy
                    </strong>
                    <p className="mt-1">
                        Free cancellation up to 48 hours before check-in. Refund
                        timing depends on your payment method.
                    </p>
                </div>
                <label className="block mt-5 text-sm font-medium text-slate-700">
                    Reason
                    <select
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        className="mt-1 w-full rounded-lg border-slate-300 text-sm"
                    >
                        <option>Change of plans</option>
                        <option>Health or emergency</option>
                        <option>Travel dates changed</option>
                        <option>Other</option>
                    </select>
                </label>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-slate-600"
                    >
                        Keep booking
                    </button>
                    <button
                        type="button"
                        onClick={() => onConfirm(reason)}
                        disabled={busy}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-bold disabled:opacity-50"
                    >
                        {busy ? "Cancelling..." : "Confirm cancellation"}
                    </button>
                </div>
            </div>
        </div>
    );
}
