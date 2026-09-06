import React from "react";
import {
    Copy,
    ExternalLink,
    FileText,
    MessageCircle,
    PackageCheck,
    Star,
} from "lucide-react";
import OrderTrackingStepper from "./OrderTrackingStepper";

const statusStyles = {
    "Order Placed": "bg-slate-100 text-slate-600 border-slate-200",
    Processing: "bg-amber-50 text-amber-700 border-amber-200",
    Packed: "bg-amber-50 text-amber-700 border-amber-200",
    Shipped: "bg-sky-50 text-sky-700 border-sky-200",
    "Out for Delivery": "bg-violet-50 text-violet-700 border-violet-200",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};
export default function OrderCard({
    order,
    onTrack,
    onConfirm,
    onReview,
    onToast,
}) {
    const items = order.items?.length
        ? order.items
        : [
              {
                  title: order.item_name,
                  image_url: order.item_image,
                  variant: "Standard",
                  quantity: 1,
                  price: order.total_amount,
              },
          ];
    const copyTracking = async () => {
        await navigator.clipboard?.writeText(order.tracking_number || "");
        onToast("Tracking number copied");
    };
    const printInvoice = () => {
        window.print();
        onToast("Invoice print dialog opened");
    };
    const message = encodeURIComponent(
        `Hello, I am asking about order ${order.id}.`,
    );
    return (
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <p className="text-xs text-slate-500">Order reference</p>
                    <p className="font-bold text-slate-900">ORD-{order.id}</p>
                </div>
                <div className="text-sm text-slate-500">
                    Placed {new Date(order.order_date).toLocaleDateString()}
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500">Order total</p>
                    <p className="font-bold text-slate-900">
                        {order.currency}{" "}
                        {(order.total_amount || 0).toLocaleString()}
                    </p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full border text-xs font-bold self-start sm:self-auto ${statusStyles[order.status] || statusStyles["Order Placed"]}`}
                >
                    {order.status}
                </span>
            </div>
            <div className="p-5 grid lg:grid-cols-[1fr_280px] gap-6">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="font-semibold">
                            {order.seller_name || "Sri Lankan Artisan Seller"}
                        </span>
                        <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                            Verified Artisan
                        </span>
                    </div>
                    <div className="mt-4 space-y-3">
                        {items.map((item) => (
                            <div
                                key={`${item.product_id || item.title}-${item.variant}`}
                                className="flex gap-3 items-center"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm text-slate-800">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {item.variant} · Qty {item.quantity}
                                    </p>
                                </div>
                                <p className="text-sm font-bold text-slate-800">
                                    {order.currency}{" "}
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 grid sm:grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4 text-sm">
                        <div>
                            <p className="text-xs text-slate-500">
                                Delivery to
                            </p>
                            <p className="font-semibold text-slate-800 mt-1">
                                {order.recipient_name || "Emma Schmidt"}
                            </p>
                            <p className="text-xs text-slate-500">
                                {order.delivery_address || "Colombo, Sri Lanka"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Payment</p>
                            <p className="font-semibold text-slate-800 mt-1">
                                {order.payment_method || "LankaQR"} ·{" "}
                                {order.payment_status || "paid"}
                            </p>
                            <p className="text-xs text-slate-500">
                                Invoice{" "}
                                {order.invoice_number || `INV-${order.id}`}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="rounded-lg border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                                    Live tracking
                                </p>
                                <p className="text-sm font-semibold text-slate-800 mt-1">
                                    {order.shipping_carrier ||
                                        "Courier partner"}{" "}
                                    {order.tracking_number &&
                                        `· ${order.tracking_number}`}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={copyTracking}
                                className="p-2 text-slate-500"
                                title="Copy tracking number"
                                aria-label="Copy tracking number"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <OrderTrackingStepper order={order} />
                        {order.estimated_delivery && (
                            <p className="text-xs text-slate-500 mt-4">
                                Estimated delivery{" "}
                                {new Date(
                                    order.estimated_delivery,
                                ).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => onTrack(order)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1B4D3E] text-white text-sm font-bold"
                >
                    <PackageCheck className="w-4 h-4" /> Track package
                </button>
                <button
                    type="button"
                    onClick={printInvoice}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-bold"
                >
                    <FileText className="w-4 h-4" /> Invoice
                </button>
                <a
                    href={`https://wa.me/${(order.seller_whatsapp || "").replace(/[^0-9]/g, "")}?text=${message}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-200 text-emerald-800 text-sm font-bold"
                >
                    <MessageCircle className="w-4 h-4" /> Seller
                </a>
                {order.status === "Out for Delivery" && (
                    <button
                        type="button"
                        onClick={() => onConfirm(order)}
                        className="px-3 py-2 rounded-lg border border-emerald-200 text-emerald-700 text-sm font-bold"
                    >
                        Mark delivered
                    </button>
                )}
                {order.status === "Delivered" && !order.has_reviewed && (
                    <button
                        type="button"
                        onClick={() => onReview(order)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-200 text-amber-700 text-sm font-bold"
                    >
                        <Star className="w-4 h-4" /> Rate product
                    </button>
                )}
                {order.status === "Shipped" && (
                    <a
                        href={order.tracking_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 text-sm font-bold"
                    >
                        <ExternalLink className="w-4 h-4" /> Courier site
                    </a>
                )}
            </div>
        </article>
    );
}
