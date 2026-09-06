import { useEffect, useState } from "react";
import { customerProfileService } from "@/Services/customerProfileService";

export type CustomerDashboardState = {
    profile: any;
    notifications: any;
    bookings: any[];
    orders: any[];
    wishlist: any[];
};

export function useRealtimeCustomerDashboard(userId?: string) {
    const [state, setState] = useState<CustomerDashboardState | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        customerProfileService
            .fetchProfileData()
            .then((data) => {
                if (mounted) {
                    setState(data);
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));

        const unsubscribe = customerProfileService.subscribe(
            (profile, notifications, bookings, orders, wishlist) => {
                if (mounted)
                    setState({
                        profile,
                        notifications,
                        bookings,
                        orders,
                        wishlist,
                    });
            },
        );

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, [userId]);

    return { state, isLoading };
}
