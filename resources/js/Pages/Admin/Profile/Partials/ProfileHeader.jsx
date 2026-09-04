import React, { useRef, useState } from 'react';
import { Camera, ShieldCheck, Mail, Building, Clock } from 'lucide-react';
import { adminProfileService } from '@/Services/adminProfileService';

export default function ProfileHeader({ profile }) {
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setIsUploading(true);
        try {
            const url = await adminProfileService.uploadAvatar(file);
            await adminProfileService.updateProfile({ avatar_url: url });
        } catch (error) {
            console.error("Avatar upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    const formatRole = (role) => {
        return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                {/* Avatar Section */}
                <div className="relative group flex-shrink-0">
                    <div className={`w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden shadow-lg ${isUploading ? 'opacity-50' : ''}`}>
                        <img 
                            src={profile.avatar_url} 
                            alt="Admin Avatar" 
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />
                    </div>
                    
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 translate-y-1 group-hover:translate-y-0 duration-200"
                    >
                        <Camera className="w-5 h-5" />
                    </button>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleUpload}
                    />

                    {/* Online Status Indicator */}
                    {profile.is_online && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
                    )}
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left mt-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                        <h1 className="text-3xl font-bold text-slate-900 font-sansDisplay">{profile.full_name}</h1>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4 mr-1" /> {formatRole(profile.role)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-slate-600">
                        <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-slate-400" />
                            {profile.email}
                        </div>
                        <div className="flex items-center">
                            <Building className="w-4 h-4 mr-2 text-slate-400" />
                            {profile.department}
                        </div>
                        <div className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">
                            <Clock className="w-4 h-4 mr-1.5" />
                            Active Session
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
