import { Reservation, ReservationUpdateInput, BookingStatus } from '../types/reservation';

const STORAGE_KEY = 'secret_places_mock_reservations';

// Helper to get initial data
const getInitialData = (): Reservation[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored reservations", e);
            }
        }
    }
    
    // Fallback Mocked initial data based on realistic Sri Lankan tourism
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return [
        {
            id: 'R-1001',
            host_id: 'host-123',
            property_id: 'prop-1',
            property_name: 'Ella Eco Cabin',
            guest_name: 'Sarah Jenkins',
            guest_email: 'sarah.j@example.com',
            guest_phone: '+447911123456',
            guest_country: 'GB',
            check_in_date: today.toISOString().split('T')[0],
            check_out_date: tomorrow.toISOString().split('T')[0],
            guests_count: 2,
            special_requests: 'Vegetarian breakfast please.',
            total_price_lkr: 12500,
            total_price_usd: 40,
            payment_method: 'card',
            payment_status: 'paid',
            booking_status: 'confirmed',
            created_at: new Date(today.getTime() - 86400000 * 5).toISOString(),
            updated_at: new Date(today.getTime() - 86400000 * 5).toISOString(),
        },
        {
            id: 'R-1002',
            host_id: 'host-123',
            property_id: 'prop-2',
            property_name: 'Knuckles View Homestay',
            guest_name: 'Mateo Garcia',
            guest_email: 'mateo.g@example.com',
            guest_phone: '+34600123456',
            guest_country: 'ES',
            check_in_date: today.toISOString().split('T')[0],
            check_out_date: nextWeek.toISOString().split('T')[0],
            guests_count: 1,
            total_price_lkr: 59500,
            total_price_usd: 190,
            payment_method: 'cash',
            payment_status: 'pending',
            booking_status: 'pending',
            created_at: new Date(today.getTime() - 86400000 * 1).toISOString(),
            updated_at: new Date(today.getTime() - 86400000 * 1).toISOString(),
        },
        {
            id: 'R-1003',
            host_id: 'host-123',
            property_id: 'prop-1',
            property_name: 'Ella Eco Cabin',
            guest_name: 'Yuki Tanaka',
            guest_email: 'yuki@example.com',
            guest_phone: '+819012345678',
            guest_country: 'JP',
            check_in_date: new Date(today.getTime() - 86400000 * 2).toISOString().split('T')[0],
            check_out_date: today.toISOString().split('T')[0],
            guests_count: 2,
            total_price_lkr: 25000,
            total_price_usd: 80,
            payment_method: 'lanka_qr',
            payment_status: 'paid',
            booking_status: 'checked_in',
            created_at: new Date(today.getTime() - 86400000 * 10).toISOString(),
            updated_at: new Date(today.getTime() - 86400000 * 2).toISOString(),
        }
    ];
};

let mockReservations: Reservation[] = getInitialData();

// Helper to save data
const saveToStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReservations));
    }
};

type SubscriptionCallback = (reservations: Reservation[]) => void;
let listeners: SubscriptionCallback[] = [];

const notifyListeners = () => {
    saveToStorage();
    listeners.forEach(listener => listener([...mockReservations]));
};

export const reservationService = {
    /**
     * Fetches reservations for the current host
     */
    async fetchReservations(hostId: string): Promise<Reservation[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        return mockReservations.filter(r => r.host_id === hostId);
    },

    /**
     * Updates an existing reservation status
     */
    async updateReservation(input: ReservationUpdateInput): Promise<Reservation> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockReservations.findIndex(r => r.id === input.id);
        if (index === -1) throw new Error('Reservation not found');

        const updatedReservation = {
            ...mockReservations[index],
            ...input,
            updated_at: new Date().toISOString()
        };

        mockReservations[index] = updatedReservation;
        notifyListeners();
        return updatedReservation;
    },

    /**
     * Subscribes to real-time reservation changes
     */
    subscribeToReservations(callback: SubscriptionCallback): () => void {
        listeners.push(callback);
        callback([...mockReservations]);
        
        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    },

    /**
     * DEBUG UTILITY: Simulates a new incoming booking in real-time
     */
    simulateIncomingBooking() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const newReservation: Reservation = {
            id: `R-${Math.floor(Math.random() * 9000) + 1000}`,
            host_id: 'host-123',
            property_id: 'prop-1',
            property_name: 'Ella Eco Cabin',
            guest_name: 'New Guest ' + Math.floor(Math.random() * 100),
            guest_email: 'guest@example.com',
            guest_phone: '+94771234567',
            guest_country: 'LK',
            check_in_date: today.toISOString().split('T')[0],
            check_out_date: tomorrow.toISOString().split('T')[0],
            guests_count: 2,
            special_requests: 'Just booked right now!',
            total_price_lkr: 12500,
            total_price_usd: 40,
            payment_method: 'card',
            payment_status: 'paid',
            booking_status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        mockReservations = [newReservation, ...mockReservations];
        notifyListeners();
        return newReservation;
    }
};
