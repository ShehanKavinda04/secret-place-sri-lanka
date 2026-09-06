import {
    CustomerProfile,
    CustomerBooking,
    CustomerOrder,
    WishlistItem,
    CustomerNotificationSettings,
} from "../types/customerProfile";

const PROFILE_KEY = "secret_places_customer_profile";
const BOOKINGS_KEY = "secret_places_customer_bookings";
const ORDERS_KEY = "secret_places_customer_orders";
const WISHLIST_KEY = "secret_places_customer_wishlist";
const NOTIFICATIONS_KEY = "secret_places_customer_notifications";

const defaultProfile: CustomerProfile = {
    id: "cust-101",
    user_id: "user-201",
    first_name: "Emma",
    last_name: "Schmidt",
    email: "emma.s@example.com",
    phone: "+49 151 2345 6789",
    whatsapp_number: "+49 151 2345 6789",
    avatar_url:
        "https://ui-avatars.com/api/?name=Emma+Schmidt&color=1B4D3E&background=F8FAFC&bold=true",
    nationality: "Germany",
    country_code: "DE",
    is_email_verified: true,
    emergency_contact_name: "Jonas Fischer",
    emergency_contact_relationship: "Partner",
    emergency_contact_phone: "+49 151 9988 7766",
    passport_last_four: "4821",
    dietary_preference: "Vegetarian",
    travel_styles: ["Hiking", "Wildlife"],
    preferred_currency: "EUR",
    eco_points: 1250,
    two_factor_enabled: false,
    created_at: new Date(Date.now() - 31536000000).toISOString(),
    updated_at: new Date().toISOString(),
};

const defaultNotifications: CustomerNotificationSettings = {
    customer_id: "cust-101",
    whatsapp_notifications: true,
    email_promotions: false,
    order_sms: true,
};

const defaultBookings: CustomerBooking[] = [
    {
        id: "bk-5021",
        customer_id: "cust-101",
        property_name: "Ella Eco Cabin Retreat",
        property_image:
            "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=500&q=80",
        check_in: new Date(Date.now() + 86400000 * 5).toISOString(),
        check_out: new Date(Date.now() + 86400000 * 8).toISOString(),
        status: "Upcoming",
        host_whatsapp: "+94771234567",
        booking_reference: "SPS-BK-5021",
        district: "Ella, Uva Province",
        category: "Eco-Cabin",
        latitude: 6.8667,
        longitude: 81.0466,
        host_name: "Nimal Perera",
        check_in_time: "14:00",
        check_out_time: "11:00",
        guests_count: 2,
        total_amount: 78000,
        currency: "LKR",
        payment_status: "paid",
        payment_method: "LankaQR",
        invoice_number: "INV-SPS-5021",
        has_reviewed: false,
    },
    {
        id: "bk-4910",
        customer_id: "cust-101",
        property_name: "Ruwanwelisaya Heritage Homestay",
        property_image: "/images/ruwanweli_maha_seya.png",
        check_in: new Date(Date.now() - 86400000 * 30).toISOString(),
        check_out: new Date(Date.now() - 86400000 * 27).toISOString(),
        status: "Completed",
        host_whatsapp: "+94779876543",
        booking_reference: "SPS-BK-4910",
        district: "Anuradhapura, North Central Province",
        category: "Heritage Homestay",
        latitude: 8.3445,
        longitude: 80.3885,
        host_name: "Maya Fernando",
        check_in_time: "13:00",
        check_out_time: "11:00",
        guests_count: 2,
        total_amount: 54000,
        currency: "LKR",
        payment_status: "paid",
        payment_method: "Card",
        invoice_number: "INV-SPS-4910",
        has_reviewed: false,
    },
];

const defaultOrders: CustomerOrder[] = [
    {
        id: "ord-8812",
        customer_id: "cust-101",
        item_name: "Anuradhapura Heritage Tea & Spice Box",
        item_image:
            "https://images.unsplash.com/photo-1588611833008-8e62d41b6c7a?w=500&q=80",
        status: "Shipped",
        order_date: new Date(Date.now() - 86400000 * 3).toISOString(),
        tracking_number: "ANU-SL-98213",
        total_amount: 9250.0,
        currency: "LKR",
        seller_name: "Anuradhapura Heritage Crafts",
        seller_phone: "+94812234567",
        seller_whatsapp: "+94771239876",
        items: [
            {
                product_id: "tea-01",
                title: "Anuradhapura Heritage Ceylon Tea",
                image_url:
                    "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=80",
                variant: "500g Pack",
                quantity: 2,
                price: 4200,
            },
        ],
        payment_method: "LankaQR",
        payment_status: "paid",
        shipping_carrier: "Anuradhapura Express",
        tracking_url: "https://www.dhl.com/global-en/home/tracking.html",
        estimated_delivery: new Date(Date.now() + 86400000 * 3).toISOString(),
        delivery_address: "24 Sacred City Road, Anuradhapura, Sri Lanka",
        recipient_name: "Emma Schmidt",
        recipient_phone: "+49 151 2345 6789",
        invoice_number: "INV-SPS-8812",
        tracking_events: [
            {
                label: "Order Placed",
                timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
                completed: true,
            },
            {
                label: "Packed",
                timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
                completed: true,
            },
            {
                label: "Dispatched",
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                completed: true,
            },
            { label: "Delivered", timestamp: "", completed: false },
        ],
        has_reviewed: false,
    },
];

const defaultWishlist: WishlistItem[] = [
    {
        id: "wl-1",
        customer_id: "cust-101",
        item_type: "property",
        item_id: "prop-10",
        title: "Abhayagiriya Sacred Retreat",
        image_url: "/images/abhayagiri_1779380471030.png",
        price: "LKR 18,500",
        location: "Anuradhapura, North Central Province",
        district: "Anuradhapura",
        host_name: "Sahan Perera",
        rating: 4.9,
        eco_rating: 4.8,
        is_available: true,
        availability_label: "Few dates left",
        created_at: new Date().toISOString(),
    },
    {
        id: "wl-2",
        customer_id: "cust-101",
        item_type: "product",
        item_id: "prod-15",
        title: "Anuradhapura Cinnamon & Tea Gift Set",
        image_url: "/images/spice_grinding.jpg",
        price: "LKR 3,200",
        location: "Anuradhapura Heritage Crafts",
        discount_price: 2800,
        seller_name: "Anuradhapura Heritage Crafts",
        stock_label: "In stock",
        product_variant: "Hand-packed gift set",
        created_at: new Date().toISOString(),
    },
];

let currentProfile = defaultProfile;
let currentNotifications = defaultNotifications;
let currentBookings = defaultBookings;
let currentOrders = defaultOrders;
let currentWishlist = defaultWishlist;

if (typeof window !== "undefined") {
    const p = localStorage.getItem(PROFILE_KEY);
    if (p) {
        currentProfile = JSON.parse(p);
        if (currentProfile.avatar_url?.startsWith("blob:")) {
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

    currentBookings = currentBookings.map((booking, index) => ({
        ...booking,
        property_name:
            index === 0
                ? "Abhayagiriya Sacred Retreat"
                : "Ruwanwelisaya Heritage Homestay",
        property_image:
            index === 0
                ? "/images/abhayagiri_1779380471030.png"
                : "/images/ruwanweli_maha_seya.png",
        district: "Anuradhapura, North Central Province",
        category: index === 0 ? "Heritage Eco-Lodge" : "Heritage Homestay",
        latitude: index === 0 ? 8.35 : 8.3445,
        longitude: index === 0 ? 80.383 : 80.3885,
    }));

    currentOrders = currentOrders.map((order) => ({
        ...order,
        tracking_number: "ANU-SL-98213",
        seller_name: "Anuradhapura Heritage Crafts",
        shipping_carrier: "Anuradhapura Express",
        delivery_address: "24 Sacred City Road, Anuradhapura, Sri Lanka",
    }));

    currentWishlist = currentWishlist.map((item, index) =>
        index === 0
            ? {
                  ...item,
                  item_type: "property",
                  item_id: "prop-abhayagiriya",
                  title: "Abhayagiriya Sacred Retreat",
                  image_url: "/images/abhayagiri_1779380471030.png",
                  price: "LKR 18,500",
                  location: "Anuradhapura, North Central Province",
                  district: "Anuradhapura",
                  host_name: "Sahan Perera",
                  rating: 4.9,
                  eco_rating: 4.8,
              }
            : {
                  ...item,
                  item_type: "product",
                  item_id: "prod-anuradhapura-gift",
                  title: "Anuradhapura Cinnamon & Tea Gift Set",
                  image_url: "/images/spice_grinding.jpg",
                  price: "LKR 3,200",
                  location: "Anuradhapura Heritage Crafts",
                  seller_name: "Anuradhapura Heritage Crafts",
                  product_variant: "Hand-packed heritage gift set",
                  discount_price: 2800,
              },
    );
}

const saveState = () => {
    if (typeof window !== "undefined") {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(currentProfile));
        localStorage.setItem(
            NOTIFICATIONS_KEY,
            JSON.stringify(currentNotifications),
        );
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
    wishlist: WishlistItem[],
) => void;

let listeners: Subscriber[] = [];

const notify = () => {
    saveState();
    listeners.forEach((l) =>
        l(
            { ...currentProfile },
            { ...currentNotifications },
            [...currentBookings],
            [...currentOrders],
            [...currentWishlist],
        ),
    );
};

export const customerProfileService = {
    async fetchProfileData() {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
            profile: { ...currentProfile },
            notifications: { ...currentNotifications },
            bookings: [...currentBookings],
            orders: [...currentOrders],
            wishlist: [...currentWishlist],
        };
    },

    async updateProfile(updates: Partial<CustomerProfile>) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        currentProfile = {
            ...currentProfile,
            ...updates,
            updated_at: new Date().toISOString(),
        };
        notify();
        return { ...currentProfile };
    },

    async uploadAvatar(file: File): Promise<string> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return new Promise((resolve, reject) => {
            const image = new Image();
            const reader = new FileReader();
            reader.onload = () => {
                image.onload = () => {
                    const maxSize = 640;
                    const scale = Math.min(
                        1,
                        maxSize / Math.max(image.width, image.height),
                    );
                    const canvas = document.createElement("canvas");
                    canvas.width = Math.round(image.width * scale);
                    canvas.height = Math.round(image.height * scale);
                    canvas
                        .getContext("2d")
                        ?.drawImage(image, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL("image/jpeg", 0.82));
                };
                image.onerror = reject;
                image.src = reader.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async updatePreferences(updates: Partial<CustomerNotificationSettings>) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        currentNotifications = { ...currentNotifications, ...updates };
        notify();
        return { ...currentNotifications };
    },

    async toggleWishlist(itemId: string) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const exists = currentWishlist.find((w) => w.item_id === itemId);
        if (exists) {
            currentWishlist = currentWishlist.filter(
                (w) => w.item_id !== itemId,
            );
        } else {
            // Note: In a real app, we'd fetch item details. Mocking the add action for demo if needed.
        }
        notify();
    },

    async cancelBooking(bookingId: string, reason: string) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        currentBookings = currentBookings.map((booking) =>
            booking.id === bookingId
                ? {
                      ...booking,
                      status: "Cancelled",
                      cancellation_reason: reason,
                  }
                : booking,
        );
        notify();
    },

    async submitReview(bookingId: string, review: Record<string, unknown>) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        currentBookings = currentBookings.map((booking) =>
            booking.id === bookingId
                ? { ...booking, has_reviewed: true }
                : booking,
        );
        notify();
        return review;
    },

    async confirmOrderDelivery(orderId: string) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        currentOrders = currentOrders.map((order) =>
            order.id === orderId
                ? {
                      ...order,
                      status: "Delivered",
                      has_reviewed: false,
                      tracking_events: order.tracking_events?.map((event) => ({
                          ...event,
                          completed: true,
                      })),
                  }
                : order,
        );
        notify();
    },

    async cancelCustomerOrder(orderId: string, _reason: string) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        currentOrders = currentOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Cancelled" } : order,
        );
        notify();
    },

    async submitOrderReview(orderId: string, review: Record<string, unknown>) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        currentOrders = currentOrders.map((order) =>
            order.id === orderId ? { ...order, has_reviewed: true } : order,
        );
        notify();
        return review;
    },

    subscribe(callback: Subscriber): () => void {
        listeners.push(callback);
        callback(
            { ...currentProfile },
            { ...currentNotifications },
            [...currentBookings],
            [...currentOrders],
            [...currentWishlist],
        );
        return () => {
            listeners = listeners.filter((l) => l !== callback);
        };
    },
};
