import React, { useState } from 'react';
import { Shield, Key, BellRing, Smartphone, Mail, Globe } from 'lucide-react';
import { customerProfileService } from '@/Services/customerProfileService';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm'; // Reusing standard Breeze password form if available, or just mock it

export default function SecurityPreferences({ profile, notifications, headless = false }) {
    
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
            {!headless && (
                <h3 className="text-2xl font-bold text-royalHeritage-textIvory font-display mb-4">Security &amp; Settings</h3>
            )}
            
            {/* Global Settings & Currency */}
            <div className="rounded-2xl shadow-xl border border-[#8B6914]/40 p-6 md:p-8" style={{ background: '#5C1020' }}>
                <h4 className="text-lg font-bold text-royalHeritage-goldAccent mb-6 flex items-center">
                    <Globe className="w-5 h-5 mr-2" /> Display Settings
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-royalHeritage-textWarmWhite mb-2">Preferred Currency</label>
                        <select 
                            value={currency}
                            onChange={handleCurrencyChange}
                            className="w-full rounded-xl text-white border-[#8B6914] focus:border-[#F5C842] focus:ring-[#F5C842]/20 shadow-sm text-sm py-2.5" style={{ background: '#35060D' }}
                        >
                            <option value="LKR">LKR (Rs) - Sri Lankan Rupee</option>
                            <option value="USD">USD ($) - US Dollar</option>
                            <option value="EUR">EUR (€) - Euro</option>
                            <option value="GBP">GBP (£) - British Pound</option>
                        </select>
                        <p className="text-xs text-royalHeritage-textWarmWhite opacity-60 mt-2">All prices on the platform will be displayed in your selected currency.</p>
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="rounded-2xl shadow-xl border border-[#8B6914]/40 p-6 md:p-8" style={{ background: '#5C1020' }}>
                <h4 className="text-lg font-bold text-royalHeritage-goldAccent mb-6 flex items-center">
                    <BellRing className="w-5 h-5 mr-2" /> Notification Preferences
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#8B6914]/40" style={{ background: '#35060D' }}>
                        <div className="flex items-start">
                            <Smartphone className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-royalHeritage-textIvory">WhatsApp Updates</p>
                                <p className="text-xs text-royalHeritage-textWarmWhite opacity-60 mt-0.5">Booking confirmations & host chats.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                            <input type="checkbox" className="sr-only peer" checked={prefs.whatsapp_notifications} onChange={() => handleToggle('whatsapp_notifications')} />
                            <div className="w-11 h-6 bg-royalHeritage-canvasDark border border-royalHeritage-borderGold peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-royalHeritage-textWarmWhite after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-royalHeritage-goldAccentBright"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#8B6914]/40" style={{ background: '#35060D' }}>
                        <div className="flex items-start">
                            <Mail className="w-5 h-5 text-sky-400 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-royalHeritage-textIvory">Email Promotions</p>
                                <p className="text-xs text-royalHeritage-textWarmWhite opacity-60 mt-0.5">Newsletters and special offers.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                            <input type="checkbox" className="sr-only peer" checked={prefs.email_promotions} onChange={() => handleToggle('email_promotions')} />
                            <div className="w-11 h-6 bg-royalHeritage-canvasDark border border-royalHeritage-borderGold peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-royalHeritage-textWarmWhite after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-royalHeritage-goldAccentBright"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#8B6914]/40" style={{ background: '#35060D' }}>
                        <div className="flex items-start">
                            <Smartphone className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-royalHeritage-textIvory">Order SMS tracking</p>
                                <p className="text-xs text-royalHeritage-textWarmWhite opacity-60 mt-0.5">Delivery status for physical goods.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                            <input type="checkbox" className="sr-only peer" checked={prefs.order_sms} onChange={() => handleToggle('order_sms')} />
                            <div className="w-11 h-6 bg-royalHeritage-canvasDark border border-royalHeritage-borderGold peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-royalHeritage-textWarmWhite after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-royalHeritage-goldAccentBright"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Password Section */}
            <div className="rounded-2xl shadow-xl border border-[#8B6914]/40 p-6 md:p-8" style={{ background: '#5C1020' }}>
                <h4 className="text-lg font-bold text-royalHeritage-goldAccent mb-2 flex items-center">
                    <Key className="w-5 h-5 mr-2" /> Update Password
                </h4>
                
                <p className="text-sm text-royalHeritage-textWarmWhite opacity-80 mb-6">
                    Ensure your account is using a long, random password to stay secure.
                </p>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-royalHeritage-textWarmWhite mb-2">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-xl text-white border-[#8B6914] focus:border-[#F5C842] focus:ring-[#F5C842]/20 shadow-sm text-sm py-2.5" style={{ background: '#35060D' }} />
                        </div>
                        
                        {/* Empty column for layout balance if desired, or let next inputs wrap */}
                        <div className="hidden md:block"></div>

                        <div>
                            <label className="block text-sm font-medium text-royalHeritage-textWarmWhite mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-xl text-white border-[#8B6914] focus:border-[#F5C842] focus:ring-[#F5C842]/20 shadow-sm text-sm py-2.5" style={{ background: '#35060D' }} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-royalHeritage-textWarmWhite mb-2">Confirm Password</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-xl text-white border-[#8B6914] focus:border-[#F5C842] focus:ring-[#F5C842]/20 shadow-sm text-sm py-2.5" style={{ background: '#35060D' }} />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-royalHeritage-borderGold/30 mt-6">
                        <button type="button" className="px-8 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] font-extrabold rounded-xl shadow-lg hover:brightness-110 transition-all text-sm">
                            Save Password
                        </button>
                    </div>
                </form>
            </div>

            {/* Delete Account Section */}
            <div className="rounded-2xl border border-red-900/50 shadow-inner p-6 md:p-8" style={{ background: '#2E050B' }}>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="mb-4 sm:mb-0 text-center sm:text-left">
                        <h5 className="text-lg font-bold text-red-400 mb-1">Delete Account</h5>
                        <p className="text-sm text-red-300/70">Once deleted, your bookings, orders, and data are gone forever.</p>
                    </div>
                    <button type="button" className="px-6 py-2.5 bg-red-950 text-red-400 font-bold border border-red-800 rounded-xl hover:bg-red-900 hover:text-red-300 transition-colors shadow-sm text-sm whitespace-nowrap sm:ml-4">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
