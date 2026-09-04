import React, { useState, useEffect } from 'react';
import { customerProfileService } from '@/Services/customerProfileService';
import { Check, User, MapPin } from 'lucide-react';

export default function PersonalDetailsForm({ profile }) {
    const [formData, setFormData] = useState({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        phone: profile.phone,
        whatsapp_number: profile.whatsapp_number,
        nationality: profile.nationality,
        dietary_preference: profile.dietary_preference,
        travel_styles: profile.travel_styles || [],
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFormData({
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email,
            phone: profile.phone,
            whatsapp_number: profile.whatsapp_number,
            nationality: profile.nationality,
            dietary_preference: profile.dietary_preference,
            travel_styles: profile.travel_styles || [],
        });
    }, [profile]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStyleToggle = (style) => {
        setFormData(prev => {
            const styles = [...prev.travel_styles];
            if (styles.includes(style)) {
                return { ...prev, travel_styles: styles.filter(s => s !== style) };
            } else {
                return { ...prev, travel_styles: [...styles, style] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await customerProfileService.updateProfile(formData);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    const availableStyles = ['Hiking', 'Wildlife', 'Wellness', 'Heritage', 'Beach', 'Culinary'];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 relative">
            
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                        <User className="w-5 h-5 mr-2 text-forestGreen-600" /> 
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input 
                                type="text" 
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input 
                                type="text" 
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 bg-slate-50 text-slate-500 shadow-sm text-sm cursor-not-allowed"
                                readOnly
                                title="Contact support to change your email address"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Country of Residence</label>
                            <select 
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm bg-white"
                            >
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Germany">Germany</option>
                                <option value="UK">United Kingdom</option>
                                <option value="USA">United States</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
                            <input 
                                type="tel" 
                                name="whatsapp_number"
                                value={formData.whatsapp_number}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm"
                            />
                            <p className="text-xs text-slate-500 mt-1">Used by hosts to send you check-in instructions.</p>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-100" />

                {/* Travel Preferences */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-forestGreen-600" /> 
                        Travel Preferences
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Requirements</label>
                            <select 
                                name="dietary_preference"
                                value={formData.dietary_preference}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm bg-white"
                            >
                                <option value="None">None</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Halal">Halal</option>
                                <option value="Gluten-Free">Gluten-Free</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">Your Travel Styles</label>
                            <div className="flex flex-wrap gap-3">
                                {availableStyles.map(style => {
                                    const isSelected = formData.travel_styles.includes(style);
                                    return (
                                        <button
                                            type="button"
                                            key={style}
                                            onClick={() => handleStyleToggle(style)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                                                isSelected 
                                                ? 'bg-cinnamon-500 text-white border-cinnamon-500 shadow-sm' 
                                                : 'bg-white text-slate-600 border-slate-300 hover:border-cinnamon-400 hover:text-cinnamon-600'
                                            }`}
                                        >
                                            {style}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-8 py-2.5 bg-forestGreen-700 text-white font-bold rounded-lg shadow-sm hover:bg-forestGreen-800 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>

            {/* Success Toast */}
            {showToast && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up z-10">
                    <Check className="w-4 h-4 mr-2" /> Details synced successfully
                </div>
            )}
        </div>
    );
}
