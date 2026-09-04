import { Property, PropertyCreateInput, PropertyUpdateInput, PropertyStatus } from '../types/property';

const STORAGE_KEY = 'secret_places_mock_properties';

// Helper to get initial data
const getInitialData = (): Property[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse stored properties", e);
            }
        }
    }
    
    // Fallback Mocked initial data
    return [
        {
            id: '1',
            host_id: 'host-123',
            title: 'Ella Eco Cabin',
            slug: 'ella-eco-cabin',
            description: 'A beautiful eco cabin nestled in the hills of Ella.',
            property_type: 'Cabin',
            base_price_lkr: 12500,
            base_price_usd: 40,
            latitude: 6.8667,
            longitude: 81.0466,
            district: 'Badulla',
            amenities: ['Wi-Fi', 'Breakfast Included', 'Hot Water'],
            eco_features: ['Solar Power', 'Plastic-free', 'Rainwater Harvesting'],
            images: ['/images/ella_cabin_1.jpg'],
            cover_image: '/images/ella_cabin_1.jpg',
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: '2',
            host_id: 'host-123',
            title: 'Sigiriya Heritage Homestay',
            slug: 'sigiriya-heritage-homestay',
            description: 'Experience traditional Sri Lankan living near the Lion Rock.',
            property_type: 'Homestay',
            base_price_lkr: 8500,
            base_price_usd: 28,
            latitude: 7.9541,
            longitude: 80.7547,
            district: 'Matale',
            amenities: ['Wi-Fi', 'Dinner available', 'Bicycle rental'],
            eco_features: ['Organic Garden', 'Composting'],
            images: ['/images/sigiriya_homestay_1.jpg'],
            cover_image: '/images/sigiriya_homestay_1.jpg',
            status: 'under_review',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ];
};

let mockProperties: Property[] = getInitialData();

// Helper to save data
const saveToStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProperties));
    }
};

// In a real app, this would be a Supabase/Firebase subscription
type SubscriptionCallback = (properties: Property[]) => void;
let listeners: SubscriptionCallback[] = [];

const notifyListeners = () => {
    saveToStorage();
    listeners.forEach(listener => listener([...mockProperties]));
};

export const propertyService = {
    /**
     * Fetches properties for the current host
     */
    async fetchProperties(hostId: string): Promise<Property[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        return mockProperties.filter(p => p.host_id === hostId);
    },

    /**
     * Creates a new property
     */
    async createProperty(input: PropertyCreateInput): Promise<Property> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newProperty: Property = {
            ...input,
            id: Math.random().toString(36).substring(7),
            host_id: 'host-123', // Hardcoded for demo
            slug: input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        mockProperties = [newProperty, ...mockProperties];
        notifyListeners();
        return newProperty;
    },

    /**
     * Updates an existing property
     */
    async updateProperty(input: PropertyUpdateInput): Promise<Property> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const index = mockProperties.findIndex(p => p.id === input.id);
        if (index === -1) throw new Error('Property not found');

        const updatedProperty = {
            ...mockProperties[index],
            ...input,
            updated_at: new Date().toISOString()
        };

        mockProperties[index] = updatedProperty;
        notifyListeners();
        return updatedProperty;
    },

    /**
     * Toggles property status (Optimistic update friendly)
     */
    async toggleStatus(id: string, newStatus: PropertyStatus): Promise<void> {
        // We simulate a fast response for optimistic UI, but could occasionally throw for testing rollback
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const index = mockProperties.findIndex(p => p.id === id);
        if (index > -1) {
            mockProperties[index] = { ...mockProperties[index], status: newStatus };
            notifyListeners();
        }
    },

    /**
     * Subscribes to real-time property changes
     * In Supabase: supabase.channel('properties').on('postgres_changes', ...).subscribe()
     */
    subscribeToPropertyChanges(callback: SubscriptionCallback): () => void {
        listeners.push(callback);
        // Initial emit
        callback([...mockProperties]);
        
        // Return unsubscribe function
        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    }
};
