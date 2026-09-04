export interface CustomerProfile {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    whatsapp_number: string;
    avatar_url: string;
    nationality: string;
    dietary_preference: string;
    travel_styles: string[];
    preferred_currency: 'LKR' | 'USD' | 'EUR';
    eco_points: number;
    created_at: string;
    updated_at: string;
}

export interface CustomerBooking {
    id: string;
    customer_id: string;
    property_name: string;
    property_image: string;
    check_in: string;
    check_out: string;
    status: 'Upcoming' | 'Active' | 'Completed' | 'Cancelled';
    host_whatsapp: string;
    booking_reference: string;
}

export interface CustomerOrder {
    id: string;
    customer_id: string;
    item_name: string;
    item_image: string;
    status: 'Order Placed' | 'Packed' | 'Shipped' | 'Delivered';
    order_date: string;
    tracking_number?: string;
    total_amount: number;
    currency: string;
}

export interface WishlistItem {
    id: string;
    customer_id: string;
    item_type: 'property' | 'product';
    item_id: string;
    title: string;
    image_url: string;
    price: string;
    location: string;
    created_at: string;
}

export interface CustomerNotificationSettings {
    customer_id: string;
    whatsapp_notifications: boolean;
    email_promotions: boolean;
    order_sms: boolean;
}
