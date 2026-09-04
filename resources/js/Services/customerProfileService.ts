import { CustomerProfile, CustomerBooking, CustomerOrder, WishlistItem, CustomerNotificationSettings } from '../types/customerProfile';

const PROFILE_KEY = 'secret_places_customer_profile';
const BOOKINGS_KEY = 'secret_places_customer_bookings';
const ORDERS_KEY = 'secret_places_customer_orders';
const WISHLIST_KEY = 'secret_places_customer_wishlist';
const NOTIFICATIONS_KEY = 'secret_places_customer_notifications';

const defaultProfile: CustomerProfile = {
    id: 'cust-101',
    user_id: 'user-201',
    first_name: 'Emma',
    last_name: 'Schmidt',
    email: 'emma.s@example.com',
    phone: '+49 151 2345 6789',
    whatsapp_number: '+49 151 2345 6789',
    avatar_url: 'https://ui-avatars.com/api/?name=Emma+Schmidt&color=1B4D3E&background=F8FAFC&bold=true',
    nationality: 'Germany',
    dietary_preference: 'Vegetarian',
    travel_styles: ['Hiking', 'Wildlife'],
    preferred_currency: 'EUR',
    eco_points: 1250,
    created_at: new Date(Date.now() - 31536000000).toISOString(),
    updated_at: new Date().toISOString(),
};

const defaultNotifications: CustomerNotificationSettings = {
    customer_id: 'cust-101',
    whatsapp_notifications: true,
    email_promotions: false,
    order_sms: true,
};

const defaultBookings: CustomerBooking[] = [
    {
        id: 'bk-5021',
        customer_id: 'cust-101',
        property_name: 'Ella Eco Cabin Retreat',
        property_image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=500&q=80',
        check_in: new Date(Date.now() + 86400000 * 5).toISOString(),
        check_out: new Date(Date.now() + 86400000 * 8).toISOString(),
        status: 'Upcoming',
        host_whatsapp: '+94771234567',
        booking_reference: 'SPS-BK-5021'
    },
    {
        id: 'bk-4910',
        customer_id: 'cust-101',
        property_name: 'Sigiriya Heritage Villa',
        property_image: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=500&q=80',
        check_in: new Date(Date.now() - 86400000 * 30).toISOString(),
        check_out: new Date(Date.now() - 86400000 * 27).toISOString(),
        status: 'Completed',
        host_whatsapp: '+94779876543',
        booking_reference: 'SPS-BK-4910'
    }
];

const defaultOrders: CustomerOrder[] = [
    {
        id: 'ord-8812',
        customer_id: 'cust-101',
        item_name: 'Handwoven Dumbara Mat',
        item_image: 'https://images.unsplash.com/photo-1588611833008-8e62d41b6c7a?w=500&q=80',
        status: 'Shipped',
        order_date: new Date(Date.now() - 86400000 * 3).toISOString(),
        tracking_number: 'DHL-SL-98213',
        total_amount: 45.00,
        currency: 'EUR'
    }
];

const defaultWishlist: WishlistItem[] = [
    {
        id: 'wl-1',
        customer_id: 'cust-101',
        item_type: 'property',
        item_id: 'prop-10',
        title: 'Mirissa Hidden Surf Camp',
        image_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&q=80',
        price: '€65 / night',
        location: 'Mirissa, Southern Province',
        created_at: new Date().toISOString()
    },
    {
        id: 'wl-2',
        customer_id: 'cust-101',
        item_type: 'property',
        item_id: 'prop-15',
        title: 'Nuwara Eliya Tea Estate Bungalow',
        image_url: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500&q=80',
        price: '€120 / night',
        location: 'Nuwara Eliya, Central Province',
        created_at: new Date().toISOString()
    }
];

let currentProfile = defaultProfile;
let currentNotifications = defaultNotifications;
let currentBookings = defaultBookings;
let currentOrders = defaultOrders;
let currentWishlist = defaultWishlist;

if (typeof window !== 'undefined') {
    const p = localStorage.getItem(PROFILE_KEY);
    if (p) {
        currentProfile = JSON.parse(p);
        if (currentProfile.avatar_url?.startsWith('blob:')) {
            currentProfile.avatar_url = defaultProfile.avatar_url;
        }
    }
    
    const n = localStorage.getItem(NOTIFICATIONS_KEY);
    if (n) currentNotifications = JSON.parse(n);
    
    const b = localStorage.getItem(BOOKINGS_KEY);
    if (b) currentBookings = JSON.parse(b);
    
    const o = localStorage.getItem(ORDERS_KEY);
    if (o) currentOrders = JSON.parse(o);
    
    const w = localStorage.getItem(WISHLIST_KEY);
    if (w) currentWishlist = JSON.parse(w);
}

const saveState = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(currentProfile));
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(currentNotifications));
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(currentBookings));
        localStorage.setItem(ORDERS_KEY, JSON.stringify(currentOrders));
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(currentWishlist));
    }
};

type Subscriber = (
    profile: CustomerProfile, 
    notifications: CustomerNotificationSettings,
    bookings: CustomerBooking[],
    orders: CustomerOrder[],
    wishlist: WishlistItem[]
) => void;

let listeners: Subscriber[] = [];

const notify = () => {
    saveState();
    listeners.forEach(l => l(
        { ...currentProfile }, 
        { ...currentNotifications },
        [...currentBookings],
        [...currentOrders],
        [...currentWishlist]
    ));
};

export const customerProfileService = {
    async fetchProfileData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { 
            profile: { ...currentProfile }, 
            notifications: { ...currentNotifications },
            bookings: [...currentBookings],
            orders: [...currentOrders],
            wishlist: [...currentWishlist]
        };
    },

    async updateProfile(updates: Partial<CustomerProfile>) {
        await new Promise(resolve => setTimeout(resolve, 600));
        currentProfile = { ...currentProfile, ...updates, updated_at: new Date().toISOString() };
        notify();
        return { ...currentProfile };
    },
    
    async uploadAvatar(file: File): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = error => reject(error);
        });
    },

    async updatePreferences(updates: Partial<CustomerNotificationSettings>) {
        await new Promise(resolve => setTimeout(resolve, 300));
        currentNotifications = { ...currentNotifications, ...updates };
        notify();
        return { ...currentNotifications };
    },

    async toggleWishlist(itemId: string) {
        await new Promise(resolve => setTimeout(resolve, 400));
        const exists = currentWishlist.find(w => w.item_id === itemId);
        if (exists) {
            currentWishlist = currentWishlist.filter(w => w.item_id !== itemId);
        } else {
            // Note: In a real app, we'd fetch item details. Mocking the add action for demo if needed.
        }
        notify();
    },

    subscribe(callback: Subscriber): () => void {
        listeners.push(callback);
        callback(
            { ...currentProfile }, 
            { ...currentNotifications },
            [...currentBookings],
            [...currentOrders],
            [...currentWishlist]
        );
        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    }
};
