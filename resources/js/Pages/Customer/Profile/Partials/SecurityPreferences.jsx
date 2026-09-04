import React, { useState } from 'react';
import { Shield, Key, BellRing, Smartphone, Mail, Globe } from 'lucide-react';
import { customerProfileService } from '@/Services/customerProfileService';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'; // Reusing standard Breeze password form if available, or just mock it

export default function SecurityPreferences({ profile, notifications }) {
    
    const [prefs, setPrefs] = useState({
        whatsapp_notifications: notifications.whatsapp_notifications,
        email_promotions: notifications.email_promotions,
        order_sms: notifications.order_sms,
    });
    
    const [currency, setCurrency] = useState(profile.preferred_currency);
    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = async (key) => {
        const newValue = !prefs[key];
        setPrefs(prev => ({ ...prev, [key]: newValue }));
        
        try {
            await customerProfileService.updatePreferences({ [key]: newValue });
        } catch (error) {
            // Rollback on fail
            setPrefs(prev => ({ ...prev, [key]: !newValue }));
            console.error("Failed to update preferences", error);
        }
    };

    const handleCurrencyChange = async (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        try {
            await customerProfileService.updateProfile({ preferred_currency: newCurrency });
        } catch (error) {
            console.error("Failed to update currency", error);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-sansDisplay mb-4">Security & Settings</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Global Settings & Currency */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center">
                            <Globe className="w-4 h-4 mr-2" /> Display Settings
                        </h4>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Currency</label>
                            <select 
                                value={currency}
                                onChange={handleCurrencyChange}
                                className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm"
                            >
                                <option value="LKR">LKR (Rs) - Sri Lankan Rupee</option>
                                <option value="USD">USD ($) - US Dollar</option>
                                <option value="EUR">EUR (€) - Euro</option>
                                <option value="GBP">GBP (£) - British Pound</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-2">All prices on the platform will be displayed in your selected currency.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center">
                            <BellRing className="w-4 h-4 mr-2" /> Notification Preferences
                        </h4>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <Smartphone className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">WhatsApp Updates</p>
                                        <p className="text-xs text-slate-500">Booking confirmations & host chats.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={prefs.whatsapp_notifications} onChange={() => handleToggle('whatsapp_notifications')} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forestGreen-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Email Promotions</p>
                                        <p className="text-xs text-slate-500">Newsletters and special offers.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={prefs.email_promotions} onChange={() => handleToggle('email_promotions')} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forestGreen-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <Smartphone className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Order SMS tracking</p>
                                        <p className="text-xs text-slate-500">Delivery status for physical goods.</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={prefs.order_sms} onChange={() => handleToggle('order_sms')} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forestGreen-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 h-full">
                        <div className="flex items-center mb-6">
                            <Key className="w-5 h-5 mr-2 text-forestGreen-600" />
                            <h4 className="text-lg font-bold text-slate-900">Update Password</h4>
                        </div>
                        
                        <p className="text-sm text-slate-500 mb-6">
                            Ensure your account is using a long, random password to stay secure.
                        </p>

                        {/* We use a mocked form for this since it's UI/UX implementation. A real app uses Laravel Breeze's UpdatePasswordForm */}
                        <form className="space-y-4 max-w-xl">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                <input type="password" placeholder="••••••••" className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                                <input type="password" placeholder="••••••••" className="w-full rounded-lg border-slate-300 focus:border-forestGreen-500 focus:ring-forestGreen-500 shadow-sm text-sm" />
                            </div>
                            <div className="pt-2">
                                <button type="button" className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors">
                                    Save Password
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 pt-6 border-t border-slate-100">
                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                                <div>
                                    <h5 className="text-sm font-bold text-red-800 mb-1">Delete Account</h5>
                                    <p className="text-xs text-red-600">Once deleted, your bookings, orders, and data are gone forever.</p>
                                </div>
                                <button type="button" className="px-4 py-2 bg-white text-red-600 font-bold border border-red-200 rounded-lg hover:bg-red-50 transition-colors shadow-sm text-sm whitespace-nowrap ml-4">
                                    Delete Account
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
