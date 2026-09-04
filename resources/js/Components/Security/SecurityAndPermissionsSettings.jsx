import React from 'react';
import { useRealtimeSecurityData } from '../../Hooks/useSecuritySettings';
import RolePermissionsCard from './RolePermissionsCard';
import SecurityLoginHub from './SecurityLoginHub';
import NotificationPreferencesPanel from './NotificationPreferencesPanel';
import ActivityAuditLog from './ActivityAuditLog';
import { ShieldAlert } from 'lucide-react';

export default function SecurityAndPermissionsSettings({ userId }) {
    const { data, isLoading } = useRealtimeSecurityData(userId);

    if (isLoading) {
        return (
            <div className="w-full h-96 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0F172A] rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading secure environment...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full p-6 bg-[#EF4444]/10 rounded-2xl border border-[#EF4444]/20 flex items-center gap-4">
                <ShieldAlert className="w-8 h-8 text-[#EF4444]" />
                <div>
                    <h3 className="font-bold text-[#EF4444] text-lg">Security Subsystem Unavailable</h3>
                    <p className="text-sm text-[#EF4444]/80">Failed to establish a secure connection. Please refresh the page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#0F172A] mb-1">Account Security & Roles</h1>
                <p className="text-slate-500">Manage your privileges, active sessions, and system notifications.</p>
            </div>

            {/* Row 1: Role & Core Security */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-1">
                    <RolePermissionsCard role={data.role} />
                </div>
                <div className="xl:col-span-2">
                    <SecurityLoginHub 
                        userId={userId} 
                        is2FAEnabled={data.is2FAEnabled} 
                        sessions={data.sessions} 
                    />
                </div>
            </div>

            {/* Row 2: Notifications */}
            <div>
                <NotificationPreferencesPanel 
                    userId={userId} 
                    settings={data.notifications} 
                />
            </div>

            {/* Row 3: Audit Log */}
            <div>
                <ActivityAuditLog logs={data.auditLogs} />
            </div>
        </div>
    );
}
