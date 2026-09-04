import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, ShieldCheck, AlertCircle } from 'lucide-react';
import { profileService } from '@/Services/profileService';

export default function BrandCustomizer({ profile }) {
    const bannerInputRef = useRef(null);
    const logoInputRef = useRef(null);
    const [isUploadingBanner, setIsUploadingBanner] = useState(false);
    const [isUploadingLogo, setIsUploadingLogo] = useState(false);

    const handleBannerUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploadingBanner(true);
        try {
            const url = await profileService.uploadMedia(file);
            await profileService.updateProfile({ banner_url: url });
        } catch (error) {
            console.error("Banner upload failed", error);
        } finally {
            setIsUploadingBanner(false);
        }
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploadingLogo(true);
        try {
            const url = await profileService.uploadMedia(file);
            await profileService.updateProfile({ logo_url: url });
        } catch (error) {
            console.error("Logo upload failed", error);
        } finally {
            setIsUploadingLogo(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
            {/* Banner Area */}
            <div className="relative h-48 md:h-64 bg-slate-100 group">
                <img 
                    src={profile.banner_url} 
                    alt="Store Banner" 
                    className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <button 
                        onClick={() => bannerInputRef.current?.click()}
                        className="flex items-center px-4 py-2 bg-white/90 text-slate-800 rounded-lg text-sm font-bold shadow-lg hover:bg-white transition"
                        disabled={isUploadingBanner}
                    >
                        {isUploadingBanner ? (
                            <span className="animate-pulse">Uploading...</span>
                        ) : (
                            <>
                                <ImageIcon className="w-4 h-4 mr-2" /> Change Cover Banner
                            </>
                        )}
                    </button>
                    <input 
                        type="file" 
                        ref={bannerInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleBannerUpload}
                    />
                </div>
            </div>

            {/* Profile Info Overlay */}
            <div className="px-6 sm:px-8 pb-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16 mb-4 sm:mb-0 space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Logo */}
                    <div className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex-shrink-0">
                        <img 
                            src={profile.logo_url} 
                            alt="Store Logo" 
                            className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
                        />
                        <button 
                            onClick={() => logoInputRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                            disabled={isUploadingLogo}
                        >
                            <Camera className="w-6 h-6 text-white" />
                        </button>
                        <input 
                            type="file" 
                            ref={logoInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleLogoUpload}
                        />
                    </div>

                    {/* Titles */}
                    <div className="flex-1 pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 font-sansDisplay">{profile.business_name}</h2>
                                <p className="text-sm text-slate-500 font-medium">{profile.owner_name} • {profile.category.replace('_', ' ').toUpperCase()}</p>
                            </div>
                            
                            <div className="mt-3 sm:mt-0">
                                {profile.verification_status === 'verified' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <ShieldCheck className="w-4 h-4 mr-1.5" /> Verified Merchant
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                        <AlertCircle className="w-4 h-4 mr-1.5" /> Pending Review
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
