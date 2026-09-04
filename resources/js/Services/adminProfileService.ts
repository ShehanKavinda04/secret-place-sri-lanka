import { AdminProfile, AdminSession, AdminActivityLog, NotificationSettings } from '../types/adminProfile';

const PROFILE_KEY = 'secret_places_admin_profile';
const SESSIONS_KEY = 'secret_places_admin_sessions';
const NOTIFICATIONS_KEY = 'secret_places_admin_notifications';
const ACTIVITY_KEY = 'secret_places_admin_activity';

const defaultProfile: AdminProfile = {
    id: 'admin-001',
    user_id: 'user-001',
    full_name: 'Super Admin',
    email: 'admin@sps.lk',
    phone: '+94 77 000 0000',
    avatar_url: 'https://ui-avatars.com/api/?name=Super+Admin&color=4F46E5&background=EEF2FF&bold=true',
    role: 'super_admin',
    department: 'Global Operations',
    permissions: [
        'Manage MSME Approvals',
        'Execute Bank Payouts',
        'Delete Content',
        'Modify Platform Commission',
        'System Configuration'
    ],
    two_factor_enabled: false,
    is_online: true,
    updated_at: new Date().toISOString(),
};

const defaultNotifications: NotificationSettings = {
    admin_id: 'admin-001',
    msme_alerts: true,
    payout_alerts: true,
    dispute_alerts: true,
    security_alerts: true,
};

const defaultSessions: AdminSession[] = [
    {
        id: 'sess-1',
        admin_id: 'admin-001',
        device_info: 'MacBook Pro 16"',
        browser: 'Chrome 120.0 (macOS)',
        ip_address: '112.134.15.8',
        is_current: true,
        last_active_at: new Date().toISOString(),
    },
    {
        id: 'sess-2',
        admin_id: 'admin-001',
        device_info: 'iPhone 14 Pro',
        browser: 'Safari (iOS)',
        ip_address: '112.134.15.8',
        is_current: false,
        last_active_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    }
];

const defaultActivity: AdminActivityLog[] = [
    {
        id: 'log-1',
        admin_id: 'admin-001',
        action_type: 'Approval',
        description: 'Approved Host ID: #1042 (Ella Eco Cabin)',
        target_entity_id: '1042',
        ip_address: '112.134.15.8',
        created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        id: 'log-2',
        admin_id: 'admin-001',
        action_type: 'Payout Executed',
        description: 'Processed Batch Payouts for September',
        ip_address: '112.134.15.8',
        created_at: new Date(Date.now() - 7200000).toISOString(),
    }
];

let currentProfile = defaultProfile;
let currentNotifications = defaultNotifications;
let currentSessions = defaultSessions;
let currentActivity = defaultActivity;

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
    
    const s = localStorage.getItem(SESSIONS_KEY);
    if (s) currentSessions = JSON.parse(s);
    
    const a = localStorage.getItem(ACTIVITY_KEY);
    if (a) currentActivity = JSON.parse(a);
}

const saveState = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(currentProfile));
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(currentNotifications));
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(currentSessions));
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(currentActivity));
    }
};

type Subscriber = (
    profile: AdminProfile, 
    notifications: NotificationSettings,
    sessions: AdminSession[],
    activity: AdminActivityLog[]
) => void;

let listeners: Subscriber[] = [];

const notify = () => {
    saveState();
    listeners.forEach(l => l(
        { ...currentProfile }, 
        { ...currentNotifications },
        [...currentSessions],
        [...currentActivity]
    ));
};

const logActivity = (action_type: string, description: string, target_entity_id?: string) => {
    const log: AdminActivityLog = {
        id: `log-${Date.now()}`,
        admin_id: currentProfile.id,
        action_type,
        description,
        target_entity_id,
        ip_address: '112.134.15.8', // Mock IP
        created_at: new Date().toISOString(),
    };
    currentActivity = [log, ...currentActivity].slice(0, 50); // Keep last 50
    notify();
};

export const adminProfileService = {
    async fetchProfileData() {
        await new Promise(resolve => setTimeout(resolve, 400));
        return { 
            profile: { ...currentProfile }, 
            notifications: { ...currentNotifications },
            sessions: [...currentSessions],
            activity: [...currentActivity]
        };
    },

    async updateProfile(updates: Partial<AdminProfile>) {
        await new Promise(resolve => setTimeout(resolve, 600));
        currentProfile = { ...currentProfile, ...updates, updated_at: new Date().toISOString() };
        logActivity('Profile Update', 'Updated personal information');
        return { ...currentProfile };
    },
    
    async uploadAvatar(file: File): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                logActivity('Avatar Update', 'Changed profile picture');
                resolve(reader.result as string);
            };
            reader.onerror = error => reject(error);
        });
    },

    async updateNotifications(updates: Partial<NotificationSettings>) {
        await new Promise(resolve => setTimeout(resolve, 300));
        currentNotifications = { ...currentNotifications, ...updates };
        notify();
        return { ...currentNotifications };
    },

    async toggleTwoFactor(enabled: boolean) {
        await new Promise(resolve => setTimeout(resolve, 800));
        currentProfile.two_factor_enabled = enabled;
        logActivity('Security Settings', `${enabled ? 'Enabled' : 'Disabled'} Two-Factor Authentication`);
        notify();
        return enabled;
    },

    async terminateSession(sessionId: string) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const session = currentSessions.find(s => s.id === sessionId);
        if (session) {
            currentSessions = currentSessions.filter(s => s.id !== sessionId);
            logActivity('Security Alert', `Terminated session on ${session.device_info}`);
            notify();
        }
    },

    subscribe(callback: Subscriber): () => void {
        listeners.push(callback);
        callback(
            { ...currentProfile }, 
            { ...currentNotifications },
            [...currentSessions],
            [...currentActivity]
        );
        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    }
};
