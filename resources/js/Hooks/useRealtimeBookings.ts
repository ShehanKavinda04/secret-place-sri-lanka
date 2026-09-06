import { useEffect, useMemo, useState } from "react";
import { customerProfileService } from "@/Services/customerProfileService";

export function useRealtimeBookings(userId?: string, statusFilter = "All") {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        customerProfileService
            .fetchProfileData()
            .then((data) => {
                if (mounted) {
                    setBookings(data.bookings);
                    setIsLoading(false);
                }
            })
            .catch(() => setIsLoading(false));
        const unsubscribe = customerProfileService.subscribe(
            (_profile, _notifications, nextBookings) => {
                if (mounted) setBookings(nextBookings);
            },
        );
        return () => {
            mounted = false;
            unsubscribe();
        };
    }, [userId]);

    const filteredBookings = useMemo(() => {
        if (statusFilter === "All") return bookings;
        const statusMap = {
            Upcoming: ["Upcoming", "Pending"],
            "Active Stays": ["Active"],
            Completed: ["Completed"],
            Cancelled: ["Cancelled"],
        };
        return bookings.filter((booking) =>
            statusMap[statusFilter]?.includes(booking.status),
        );
    }, [bookings, statusFilter]);

    const cancelReservation = async (reservationId, reason) =>
        customerProfileService.cancelBooking(reservationId, reason);
    const submitReview = async (reservationId, reviewData) =>
        customerProfileService.submitReview(reservationId, reviewData);

    return {
        bookings: filteredBookings,
        allBookings: bookings,
        isLoading,
        cancelReservation,
        submitReview,
    };
}
