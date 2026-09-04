import { useState, useEffect } from 'react';

export type CustomerProfile = {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_email_verified: boolean;
    phone: string;
    whatsapp_number: string;
    avatar_url: string;
    nationality: string;
    country_code: string;
    updated_at: string;
};

// Mock local storage key for simulating backend persistence
const STORAGE_KEY = 'mock_customer_profile_v2';

const getInitialData = (): CustomerProfile => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Realistic sample data for an international tourist
    const defaultData: CustomerProfile = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        user_id: 'user_99812',
        first_name: 'Elena',
        last_name: 'Fischer',
        email: 'elena.fischer@example.com',
        is_email_verified: true,
        phone: '+49 151 2345 6789',
        whatsapp_number: '+49 151 2345 6789',
        avatar_url: 'https://ui-avatars.com/api/?name=Elena+Fischer&background=1B4D3E&color=fff&size=256',
        nationality: 'Germany',
        country_code: 'DE',
        updated_at: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
};

// Event target for pub/sub (simulates Supabase Realtime / Firestore onSnapshot)
const profileEventTarget = new EventTarget();

export function useCustomerPersonalInfo(userId: string) {
    const [profile, setProfile] = useState<CustomerProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay for initial fetch
        const timer = setTimeout(() => {
            setProfile(getInitialData());
            setIsLoading(false);
        }, 800);

        // Real-time listener for updates across the app (like Supabase Listen)
        const handleProfileUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<CustomerProfile>;
            setProfile(customEvent.detail);
        };

        profileEventTarget.addEventListener('profileUpdated', handleProfileUpdate);

        return () => {
            clearTimeout(timer);
            profileEventTarget.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, [userId]);

    return { profile, isLoading };
}

export async function updatePersonalInfo(userId: string, data: Partial<CustomerProfile>): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const current = getInitialData();
                const updated = {
                    ...current,
                    ...data,
                    updated_at: new Date().toISOString()
                };
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                
                // Publish update to all listeners (Optimistic UI sync)
                const event = new CustomEvent('profileUpdated', { detail: updated });
                profileEventTarget.dispatchEvent(event);
                
                resolve();
            } catch (err) {
                reject(new Error("Failed to update profile"));
            }
        }, 600); // Simulate network latency
    });
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
    return new Promise((resolve) => {
        // Simulate uploading to Supabase/Firebase storage and returning a URL
        setTimeout(() => {
            // For mock purposes, we create an object URL. 
            // In production, this would be the bucket public URL.
            const url = URL.createObjectURL(file);
            resolve(url);
        }, 1500); 
    });
}
