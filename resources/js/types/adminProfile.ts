export interface AdminProfile {
    id: string;
    user_id: string;
    full_name: string;
    email: string;
    phone: string;
    avatar_url: string;
    role: 'super_admin' | 'finance_admin' | 'moderator';
    department: string;
    permissions: string[];
    two_factor_enabled: boolean;
    is_online: boolean;
    updated_at: string;
}

export interface AdminSession {
    id: string;
    admin_id: string;
    device_info: string;
    browser: string;
    ip_address: string;
    is_current: boolean;
    last_active_at: string;
}

export interface AdminActivityLog {
    id: string;
    admin_id: string;
    action_type: string;
    description: string;
    target_entity_id?: string;
    ip_address: string;
    created_at: string;
}

export interface NotificationSettings {
    admin_id: string;
    msme_alerts: boolean;
    payout_alerts: boolean;
    dispute_alerts: boolean;
    security_alerts: boolean;
}
