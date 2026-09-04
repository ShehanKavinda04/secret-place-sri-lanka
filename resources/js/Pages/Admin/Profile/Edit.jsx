import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { adminProfileService } from '@/Services/adminProfileService';
import ProfileHeader from './Partials/ProfileHeader';
import PersonalInfoForm from './Partials/PersonalInfoForm';
import SecurityAndPermissionsSettings from '@/Components/Security/SecurityAndPermissionsSettings';
import { Settings, ShieldCheck } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('security');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await adminProfileService.fetchProfileData();
                setProfile(data.profile);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        load();

        const unsubscribe = adminProfileService.subscribe((p) => {
            setProfile(p);
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
        { id: 'general', name: 'Personal Information', icon: Settings },
        { id: 'security', name: 'Security & Permissions', icon: ShieldCheck },
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
                                        ? 'border-[#0F172A] text-[#0F172A]'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }
                                `}
                            >
                                <tab.icon className={`w-5 h-5 mr-2 ${activeTab === tab.id ? 'text-[#0F172A]' : 'text-slate-400'}`} />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-8">
                    {activeTab === 'general' && (
                        <PersonalInfoForm profile={profile} />
                    )}
                    
                    {activeTab === 'security' && (
                        <SecurityAndPermissionsSettings userId={profile.id.toString()} />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
