import { useEffect, useMemo, useState } from "react";
import { customerProfileService } from "@/Services/customerProfileService";

export function useRealtimeWishlist(userId, categoryFilter = "All Saved") {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let mounted = true;
        customerProfileService
            .fetchProfileData()
            .then((data) => {
                if (mounted) {
                    setItems(data.wishlist);
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));
        const unsubscribe = customerProfileService.subscribe(
            (_profile, _notifications, _bookings, _orders, wishlist) => {
                if (mounted) setItems(wishlist);
            },
        );
        return () => {
            mounted = false;
            unsubscribe();
        };
    }, [userId]);
    const filteredItems = useMemo(
        () =>
            categoryFilter === "All Saved"
                ? items
                : items.filter((item) =>
                      categoryFilter === "Secret Destinations & Stays"
                          ? item.item_type === "property"
                          : item.item_type === "product",
                  ),
        [categoryFilter, items],
    );
    const removeFromWishlist = (wishlistId) =>
        customerProfileService.toggleWishlist(wishlistId);
    const moveToCartOrBooking = (item) =>
        item.item_type === "property"
            ? `/places?highlight=${item.item_id}`
            : `/craft-items?highlight=${item.item_id}`;
    return {
        items: filteredItems,
        allItems: items,
        isLoading,
        removeFromWishlist,
        moveToCartOrBooking,
    };
}
