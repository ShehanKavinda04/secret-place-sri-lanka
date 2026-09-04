import React, { useState, useEffect } from 'react';
import { profileService } from '@/Services/profileService';
import { Check } from 'lucide-react';

export default function BusinessInfoForm({ profile }) {
    const [formData, setFormData] = useState({
        business_name: profile.business_name,
        category: profile.category,
        owner_name: profile.owner_name,
        email: profile.email,
        phone: profile.phone,
        whatsapp_number: profile.whatsapp_number,
        bio: profile.bio,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFormData({
            business_name: profile.business_name,
            category: profile.category,
            owner_name: profile.owner_name,
            email: profile.email,
            phone: profile.phone,
            whatsapp_number: profile.whatsapp_number,
            bio: profile.bio,
        });
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await profileService.updateProfile(formData);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">General Business Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Business / Property Name</label>
                        <input 
                            type="text" 
                            name="business_name"
                            value={formData.business_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Business Category</label>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                        >
                            <option value="accommodation">Accommodation (Homestay, Eco-lodge)</option>
                            <option value="ecommerce_crafts">E-Commerce (Handicrafts, Spices)</option>
                            <option value="tours">Tours & Experiences</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Owner Full Name</label>
                        <input 
                            type="text" 
                            name="owner_name"
                            value={formData.owner_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Official Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Business Number</label>
                        <input 
                            type="tel" 
                            name="whatsapp_number"
                            value={formData.whatsapp_number}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio / Our Story</label>
                    <textarea 
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell guests about your local secret experience..."
                        className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2 bg-[#1B4D3E] text-white font-bold rounded-lg shadow-md shadow-[#1B4D3E]/20 hover:bg-[#143d31] transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save General Info'}
                    </button>
                </div>
            </form>

            {/* Success Toast */}
            {showToast && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up">
                    <Check className="w-4 h-4 mr-2" /> Settings saved successfully
                </div>
            )}
        </div>
    );
}
