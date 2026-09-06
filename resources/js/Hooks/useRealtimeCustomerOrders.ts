import { useEffect, useMemo, useState } from "react";
import { customerProfileService } from "@/Services/customerProfileService";

export function useRealtimeCustomerOrders(userId, statusFilter = "All Orders") {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let mounted = true;
        customerProfileService
            .fetchProfileData()
            .then((data) => {
                if (mounted) {
                    setOrders(data.orders);
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));
        const unsubscribe = customerProfileService.subscribe(
            (_profile, _notifications, _bookings, nextOrders) => {
                if (mounted) setOrders(nextOrders);
            },
        );
        return () => {
            mounted = false;
            unsubscribe();
        };
    }, [userId]);
    const filteredOrders = useMemo(() => {
        const statusMap = {
            "In Progress": ["Order Placed", "Processing", "Packed"],
            "Shipped / In Transit": ["Shipped", "Out for Delivery"],
            Delivered: ["Delivered"],
            Cancelled: ["Cancelled"],
        };
        return statusFilter === "All Orders"
            ? orders
            : orders.filter((order) =>
                  statusMap[statusFilter]?.includes(order.status),
              );
    }, [orders, statusFilter]);
    return {
        orders: filteredOrders,
        allOrders: orders,
        isLoading,
        confirmOrderDelivery: customerProfileService.confirmOrderDelivery,
        cancelCustomerOrder: customerProfileService.cancelCustomerOrder,
        submitOrderReview: customerProfileService.submitOrderReview,
    };
}
