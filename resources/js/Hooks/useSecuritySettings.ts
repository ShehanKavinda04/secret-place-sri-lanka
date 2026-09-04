import { useState, useEffect } from 'react';

export type SecurityRole = 'Admin' | 'Seller' | 'Customer';

export interface UserSession {
    id: string;
    user_id: string;
    session_token: string;
    device_name: string;
    browser: string;
    ip_address: string;
    location: string;
    is_current: boolean;
    last_active_at: string;
}

export interface NotificationSettings {
    user_id: string;
    notify_new_msme: boolean;
    notify_disputes: boolean;
    notify_payouts: boolean;
    notify_security: boolean;
    channel: 'email' | 'sms' | 'push';
}

export interface AuditLogEntry {
    id: string;
    user_id: string;
    action_type: string;
    description: string;
    target_id?: string;
    ip_address: string;
    status: 'Success' | 'Failed';
    created_at: string;
}

// ----------------------------------------------------------------------------
// Mock Backend Persistence
// ----------------------------------------------------------------------------
const STORAGE_KEY = 'mock_security_settings_v1';

interface SecurityStore {
    role: SecurityRole;
    is2FAEnabled: boolean;
    sessions: UserSession[];
    notifications: NotificationSettings;
    auditLogs: AuditLogEntry[];
}

const getInitialData = (): SecurityStore => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    
    const defaultData: SecurityStore = {
        role: 'Admin',
        is2FAEnabled: false,
        sessions: [
            {
                id: 'sess-1',
                user_id: 'user_1',
                session_token: 'token_1',
                device_name: 'MacBook Pro M2',
                browser: 'Chrome 114',
                ip_address: '192.168.1.42',
                location: 'Colombo, Sri Lanka',
                is_current: true,
                last_active_at: new Date().toISOString()
            },
            {
                id: 'sess-2',
                user_id: 'user_1',
                session_token: 'token_2',
                device_name: 'iPhone 14 Pro',
                browser: 'Safari',
                ip_address: '175.157.100.22',
                location: 'Kandy, Sri Lanka',
                is_current: false,
                last_active_at: new Date(Date.now() - 3600000).toISOString()
            }
        ],
        notifications: {
            user_id: 'user_1',
            notify_new_msme: true,
            notify_disputes: true,
            notify_payouts: true,
            notify_security: true,
            channel: 'email'
        },
        auditLogs: [
            {
                id: 'log-1',
                user_id: 'user_1',
                action_type: 'AUTH_LOGIN',
                description: 'User logged in successfully',
                ip_address: '192.168.1.42',
                status: 'Success',
                created_at: new Date(Date.now() - 7200000).toISOString()
            },
            {
                id: 'log-2',
                user_id: 'user_1',
                action_type: 'UPDATE_ROLE',
                description: 'Approved Host #412 Onboarding',
                target_id: 'host_412',
                ip_address: '192.168.1.42',
                status: 'Success',
                created_at: new Date(Date.now() - 14400000).toISOString()
            }
        ]
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
};

// Event Target for Real-Time Mocking (Pub/Sub)
export const securityEventTarget = new EventTarget();

export function useRealtimeSecurityData(userId: string) {
    const [data, setData] = useState<SecurityStore | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(getInitialData());
            setIsLoading(false);
        }, 500);

        const handleUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<SecurityStore>;
            setData(customEvent.detail);
        };

        securityEventTarget.addEventListener('securityUpdated', handleUpdate);
        return () => {
            clearTimeout(timer);
            securityEventTarget.removeEventListener('securityUpdated', handleUpdate);
        };
    }, [userId]);

    return { data, isLoading };
}

// ----------------------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------------------
export const updateSecurityStore = (updates: Partial<SecurityStore>) => {
    const current = getInitialData();
    const next = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    securityEventTarget.dispatchEvent(new CustomEvent('securityUpdated', { detail: next }));
};

export async function updatePassword(userId: string, currentPass: string, newPass: string): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock validation
            if (currentPass !== 'password123') {
                return reject(new Error("Incorrect current password"));
            }
            
            // Log the action
            const currentStore = getInitialData();
            const newLog: AuditLogEntry = {
                id: `log-${Date.now()}`,
                user_id: userId,
                action_type: 'SECURITY_PASSWORD_CHANGE',
                description: 'Password was updated successfully',
                ip_address: '192.168.1.42', // Mock IP
                status: 'Success',
                created_at: new Date().toISOString()
            };
            
            updateSecurityStore({ auditLogs: [newLog, ...currentStore.auditLogs] });
            resolve();
        }, 800);
    });
}

export async function setup2FA(userId: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve("otpauth://totp/SecretPlaces:admin@example.com?secret=JBSWY3DPEHPK3PXP&issuer=SecretPlaces"), 600);
    });
}

export async function verify2FA(userId: string, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (token !== '123456') {
                return reject(new Error("Invalid 2FA code"));
            }
            updateSecurityStore({ is2FAEnabled: true });
            
            const currentStore = getInitialData();
            const newLog: AuditLogEntry = {
                id: `log-${Date.now()}`,
                user_id: userId,
                action_type: 'SECURITY_2FA_ENABLED',
                description: 'Two-Factor Authentication was enabled',
                ip_address: '192.168.1.42',
                status: 'Success',
                created_at: new Date().toISOString()
            };
            updateSecurityStore({ auditLogs: [newLog, ...currentStore.auditLogs] });
            
            resolve();
        }, 600);
    });
}

export async function revokeSession(sessionId: string): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentStore = getInitialData();
            const updatedSessions = currentStore.sessions.filter(s => s.id !== sessionId);
            updateSecurityStore({ sessions: updatedSessions });
            
            const newLog: AuditLogEntry = {
                id: `log-${Date.now()}`,
                user_id: 'user_1',
                action_type: 'SECURITY_SESSION_REVOKE',
                description: `Revoked session ${sessionId}`,
                ip_address: '192.168.1.42',
                status: 'Success',
                created_at: new Date().toISOString()
            };
            updateSecurityStore({ auditLogs: [newLog, ...currentStore.auditLogs] });
            
            resolve();
        }, 500);
    });
}

export async function revokeAllOtherSessions(userId: string): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentStore = getInitialData();
            const updatedSessions = currentStore.sessions.filter(s => s.is_current);
            updateSecurityStore({ sessions: updatedSessions });
            resolve();
        }, 500);
    });
}

export async function updateNotificationPreferences(userId: string, settings: Partial<NotificationSettings>): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentStore = getInitialData();
            const nextSettings = { ...currentStore.notifications, ...settings };
            updateSecurityStore({ notifications: nextSettings });
            resolve();
        }, 400);
    });
}
