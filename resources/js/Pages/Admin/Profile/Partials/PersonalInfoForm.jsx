import React, { useState, useEffect } from 'react';
import { adminProfileService } from '@/Services/adminProfileService';
import { Check, UserCircle } from 'lucide-react';

export default function PersonalInfoForm({ profile }) {
    const [formData, setFormData] = useState({
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        department: profile.department,
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFormData({
            full_name: profile.full_name,
            email: profile.email,
            phone: profile.phone,
            department: profile.department,
        });
    }, [profile]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await adminProfileService.updateProfile(formData);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <UserCircle className="w-5 h-5 mr-2 text-indigo-500" /> 
                Personal Information
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Department / Division</label>
                        <select 
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm bg-slate-50"
                        >
                            <option value="Global Operations">Global Operations</option>
                            <option value="Finance & Accounts">Finance & Accounts</option>
                            <option value="Risk & Compliance">Risk & Compliance</option>
                            <option value="Platform Security">Platform Security</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Official Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">Must be an authorized @sps.lk domain.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Syncing...' : 'Save Changes'}
                    </button>
                </div>
            </form>

            {/* Success Toast */}
            {showToast && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up">
                    <Check className="w-4 h-4 mr-2" /> Details synced to secure database
                </div>
            )}
        </div>
    );
}
