import React, { useState, useEffect } from 'react';
import { profileService } from '@/Services/profileService';
import { Check, Clock, Bell } from 'lucide-react';

export default function PoliciesForm({ profile }) {
    const [formData, setFormData] = useState({
        check_in_time: profile.check_in_time,
        check_out_time: profile.check_out_time,
        cancellation_policy: profile.cancellation_policy,
        notifications: profile.notifications,
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setFormData({
            check_in_time: profile.check_in_time,
            check_out_time: profile.check_out_time,
            cancellation_policy: profile.cancellation_policy,
            notifications: profile.notifications,
        });
    }, [profile]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleToggle = (key) => {
        setFormData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await profileService.updateProfile(formData);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to update policies", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-slate-500" /> Policies & Preferences
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Policies */}
                <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Business Policies</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Check-In Time</label>
                            <input 
                                type="time" 
                                name="check_in_time"
                                value={formData.check_in_time}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Check-Out Time</label>
                            <input 
                                type="time" 
                                name="check_out_time"
                                value={formData.check_out_time}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Cancellation Policy</label>
                            <select 
                                name="cancellation_policy"
                                value={formData.cancellation_policy}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            >
                                <option value="Flexible">Flexible (Full refund 1 day prior)</option>
                                <option value="Moderate">Moderate (Full refund 5 days prior)</option>
                                <option value="Strict">Strict (50% refund up to 1 week prior)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center">
                        <Bell className="w-4 h-4 mr-2 text-slate-500" /> Communication Preferences
                    </h4>
                    <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900">WhatsApp Instant Alerts</p>
                                <p className="text-xs text-slate-500">Receive instant messages for new bookings and cancellations.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggle('whatsapp_alerts')}
                                className={`${
                                    formData.notifications.whatsapp_alerts ? 'bg-emerald-500' : 'bg-slate-200'
                                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            >
                                <span
                                    className={`${
                                        formData.notifications.whatsapp_alerts ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Email Invoices & Reports</p>
                                <p className="text-xs text-slate-500">Receive monthly payout reports and invoice copies.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggle('email_invoices')}
                                className={`${
                                    formData.notifications.email_invoices ? 'bg-emerald-500' : 'bg-slate-200'
                                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            >
                                <span
                                    className={`${
                                        formData.notifications.email_invoices ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900">SMS Dispatch Alerts</p>
                                <p className="text-xs text-slate-500">For e-commerce: receive alerts when guests request shipping updates.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggle('sms_alerts')}
                                className={`${
                                    formData.notifications.sms_alerts ? 'bg-emerald-500' : 'bg-slate-200'
                                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                            >
                                <span
                                    className={`${
                                        formData.notifications.sms_alerts ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </button>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2 bg-[#1B4D3E] text-white font-bold rounded-lg shadow-md shadow-[#1B4D3E]/20 hover:bg-[#143d31] transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Policies'}
                    </button>
                </div>
            </form>

            {showToast && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up">
                    <Check className="w-4 h-4 mr-2" /> Preferences saved
                </div>
            )}
        </div>
    );
}
