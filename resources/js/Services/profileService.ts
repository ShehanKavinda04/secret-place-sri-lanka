import { SellerProfile, SellerPayoutSettings } from '../types/profile';

const PROFILE_KEY = 'secret_places_seller_profile';
const PAYOUT_KEY = 'secret_places_seller_payout';

const defaultProfile: SellerProfile = {
    id: 'seller-123',
    user_id: 'user-1',
    business_name: 'Ella Eco Cabin',
    category: 'accommodation',
    owner_name: 'Eco Host',
    email: 'host@sps.lk',
    phone: '+94 77 123 4567',
    whatsapp_number: '+94 77 123 4567',
    bio: 'Experience the serene beauty of Ella in our sustainable, off-grid eco cabin nestled in the lush Sri Lankan jungle.',
    logo_url: `https://ui-avatars.com/api/?name=Ella+Eco+Cabin&color=1B4D3E&background=e2e8f0&bold=true`,
    banner_url: 'https://images.unsplash.com/photo-1588846399949-041473187258?auto=format&fit=crop&q=80&w=2000',
    address: '123 Jungle Road',
    district: 'Badulla',
    latitude: 6.8667,
    longitude: 81.0466,
    check_in_time: '14:00',
    check_out_time: '11:00',
    cancellation_policy: 'Moderate',
    verification_status: 'verified',
    notifications: {
        whatsapp_alerts: true,
        email_invoices: true,
        sms_alerts: false,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

const defaultPayout: SellerPayoutSettings = {
    seller_id: 'seller-123',
    bank_name: 'Commercial Bank',
    account_name: 'Eco Host',
    account_number: '1234567890',
    branch_name: 'Ella Branch',
    lanka_qr_url: null,
    updated_at: new Date().toISOString(),
};

let currentProfile = defaultProfile;
let currentPayout = defaultPayout;

if (typeof window !== 'undefined') {
    const storedProf = localStorage.getItem(PROFILE_KEY);
    if (storedProf) currentProfile = JSON.parse(storedProf);
    
    const storedPay = localStorage.getItem(PAYOUT_KEY);
    if (storedPay) currentPayout = JSON.parse(storedPay);
}

const saveToStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(currentProfile));
        localStorage.setItem(PAYOUT_KEY, JSON.stringify(currentPayout));
    }
};

type ProfileSubscriber = (p: SellerProfile, py: SellerPayoutSettings) => void;
let listeners: ProfileSubscriber[] = [];

const notify = () => {
    saveToStorage();
    listeners.forEach(l => l({ ...currentProfile }, { ...currentPayout }));
};

export const profileService = {
    async fetchProfile() {
        await new Promise(resolve => setTimeout(resolve, 400));
        return { profile: { ...currentProfile }, payout: { ...currentPayout } };
    },

    async updateProfile(updates: Partial<SellerProfile>) {
        await new Promise(resolve => setTimeout(resolve, 500));
        currentProfile = { ...currentProfile, ...updates, updated_at: new Date().toISOString() };
        notify();
        return { ...currentProfile };
    },

    async updatePayoutDetails(updates: Partial<SellerPayoutSettings>) {
        await new Promise(resolve => setTimeout(resolve, 500));
        currentPayout = { ...currentPayout, ...updates, updated_at: new Date().toISOString() };
        notify();
        return { ...currentPayout };
    },

    async uploadMedia(file: File): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock returning a local object URL for preview purposes
        return URL.createObjectURL(file);
    },

    subscribeToProfile(callback: ProfileSubscriber): () => void {
        listeners.push(callback);
        callback({ ...currentProfile }, { ...currentPayout });
        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    }
};
