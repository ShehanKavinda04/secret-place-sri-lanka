import React, { useState, useEffect } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head, usePage } from '@inertiajs/react';
import { profileService } from '@/Services/profileService';
import BrandCustomizer from './Partials/BrandCustomizer';
import BusinessInfoForm from './Partials/BusinessInfoForm';
import LocationForm from './Partials/LocationForm';
import PayoutSettingsForm from './Partials/PayoutSettingsForm';
import PoliciesForm from './Partials/PoliciesForm';

// Reusing original forms for the bottom
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    
    // Local state for mock real-time data
    const [profile, setProfile] = useState(null);
    const [payout, setPayout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await profileService.fetchProfile();
                setProfile(data.profile);
                setPayout(data.payout);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        load();

        const unsubscribe = profileService.subscribeToProfile((prof, pay) => {
            setProfile(prof);
            setPayout(pay);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading || !profile || !payout) {
        return (
            <SellerLayout header="Host Profile & Settings">
                <div className="p-8 animate-pulse">
                    <div className="h-64 bg-slate-200 rounded-xl mb-8"></div>
                    <div className="h-96 bg-slate-200 rounded-xl mb-8"></div>
                    <div className="h-96 bg-slate-200 rounded-xl mb-8"></div>
                </div>
            </SellerLayout>
        );
    }

    return (
        <SellerLayout header="Host Profile & Settings">
            <Head title="Profile & Settings - Secret Place Sri Lanka" />

            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* 1. Profile Header & Brand Customizer */}
                <BrandCustomizer profile={profile} />

                {/* 2. General Business Information */}
                <BusinessInfoForm profile={profile} />

                {/* 3. Location & Physical Address */}
                <LocationForm profile={profile} />

                {/* 4. Bank Account & LankaQR Payout Settings */}
                <PayoutSettingsForm payout={payout} />

                {/* 5. Business Policies & Preferences */}
                <PoliciesForm profile={profile} />

                {/* Standard Authentication Security (from Breeze) */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Security & Authentication</h3>
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 md:p-8 mb-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </SellerLayout>
    );
}
