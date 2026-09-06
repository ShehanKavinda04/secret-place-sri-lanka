export interface CustomerProfile {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    whatsapp_number: string;
    avatar_url: string;
    banner_url?: string;
    nationality: string;
    country_code?: string;
    is_email_verified?: boolean;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    passport_last_four: string;
    dietary_preference: string;
    travel_styles: string[];
    preferred_currency: "LKR" | "USD" | "EUR" | "GBP";
    eco_points: number;
    two_factor_enabled: boolean;
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
    status: "Upcoming" | "Active" | "Completed" | "Cancelled";
    host_whatsapp: string;
    booking_reference: string;
    district?: string;
    category?: string;
    latitude?: number;
    longitude?: number;
    host_name?: string;
    check_in_time?: string;
    check_out_time?: string;
    guests_count?: number;
    total_amount?: number;
    currency?: "LKR" | "USD";
    payment_status?: "paid" | "pending" | "refunded";
    payment_method?: string;
    invoice_number?: string;
    cancellation_reason?: string;
    has_reviewed?: boolean;
}

export interface CustomerOrder {
    id: string;
    customer_id: string;
    item_name: string;
    item_image: string;
    status:
        | "Order Placed"
        | "Processing"
        | "Packed"
        | "Shipped"
        | "Out for Delivery"
        | "Delivered"
        | "Cancelled";
    order_date: string;
    tracking_number?: string;
    total_amount: number;
    currency: string;
    seller_name?: string;
    seller_phone?: string;
    seller_whatsapp?: string;
    items?: Array<{
        product_id: string;
        title: string;
        image_url: string;
        variant: string;
        quantity: number;
        price: number;
    }>;
    subtotal?: number;
    delivery_fee?: number;
    payment_method?: string;
    payment_status?: "paid" | "pending" | "refunded";
    shipping_carrier?: string;
    tracking_url?: string;
    estimated_delivery?: string;
    delivery_address?: string;
    recipient_name?: string;
    recipient_phone?: string;
    invoice_number?: string;
    tracking_events?: Array<{
        label: string;
        timestamp: string;
        completed: boolean;
    }>;
    has_reviewed?: boolean;
}

export interface WishlistItem {
    id: string;
    customer_id: string;
    item_type: "property" | "product";
    item_id: string;
    title: string;
    image_url: string;
    price: string;
    location: string;
    district?: string;
    created_at: string;
    host_name?: string;
    rating?: number;
    eco_rating?: number;
    is_available?: boolean;
    availability_label?: string;
    discount_price?: number;
    seller_name?: string;
    stock_label?: string;
    product_variant?: string;
}

export interface CustomerNotificationSettings {
    customer_id: string;
    whatsapp_notifications: boolean;
    email_promotions: boolean;
    order_sms: boolean;
}
