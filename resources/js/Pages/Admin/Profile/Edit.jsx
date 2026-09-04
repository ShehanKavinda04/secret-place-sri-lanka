import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { adminProfileService } from '@/Services/adminProfileService';
import ProfileHeader from './Partials/ProfileHeader';
import PersonalInfoForm from './Partials/PersonalInfoForm';
import RolePermissionsCard from './Partials/RolePermissionsCard';
import SecuritySessions from './Partials/SecuritySessions';
import NotificationPreferences from './Partials/NotificationPreferences';
import ActivityLog from './Partials/ActivityLog';
import { Settings, Shield, Bell, Activity } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const [profile, setProfile] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [activity, setActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await adminProfileService.fetchProfileData();
                setProfile(data.profile);
                setNotifications(data.notifications);
                setSessions(data.sessions);
                setActivity(data.activity);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        load();

        const unsubscribe = adminProfileService.subscribe((p, n, s, a) => {
            setProfile(p);
            setNotifications(n);
            setSessions(s);
            setActivity(a);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading || !profile) {
        return (
            <AdminLayout header="Admin Profile & Security Settings">
                <div className="p-8 animate-pulse space-y-6">
                    <div className="h-40 bg-slate-200 rounded-xl"></div>
                    <div className="h-96 bg-slate-200 rounded-xl"></div>
                </div>
            </AdminLayout>
        );
    }

    const tabs = [
        { id: 'general', name: 'General & Role', icon: Settings },
        { id: 'security', name: 'Security & Sessions', icon: Shield },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'audit', name: 'Activity Audit', icon: Activity },
    ];

    return (
        <AdminLayout header="Admin Profile & Security Settings">
            <Head title="Admin Profile - Super Admin Control Center" />

            <div className="max-w-6xl mx-auto py-6">
                <ProfileHeader profile={profile} />

                {/* Tab Navigation */}
                <div className="mt-8 border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                                    ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }
                                `}
                            >
                                <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-indigo-500' : 'text-slate-400'}`} />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-8">
                    {activeTab === 'general' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <PersonalInfoForm profile={profile} />
                            </div>
                            <div className="lg:col-span-1">
                                <RolePermissionsCard profile={profile} />
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'security' && (
                        <SecuritySessions profile={profile} sessions={sessions} />
                    )}

                    {activeTab === 'notifications' && (
                        <NotificationPreferences notifications={notifications} />
                    )}

                    {activeTab === 'audit' && (
                        <ActivityLog activity={activity} />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
