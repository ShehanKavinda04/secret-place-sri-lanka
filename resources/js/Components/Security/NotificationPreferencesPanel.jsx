import React, { useState } from 'react';
import { Bell, Store, Activity, DollarSign, ShieldAlert } from 'lucide-react';
import { updateNotificationPreferences } from '../../Hooks/useSecuritySettings';

export default function NotificationPreferencesPanel({ userId, settings }) {
    const [localSettings, setLocalSettings] = useState(settings);

    const handleToggle = async (key) => {
        if (key === 'user_id' || key === 'channel') return;
        
        const newValue = !localSettings[key];
        setLocalSettings(prev => ({ ...prev, [key]: newValue }));

        try {
            await updateNotificationPreferences(userId, { [key]: newValue });
        } catch (err) {
            setLocalSettings(prev => ({ ...prev, [key]: !newValue }));
        }
    };

    const handleChannelChange = async (e) => {
        const newChannel = e.target.value;
        setLocalSettings(prev => ({ ...prev, channel: newChannel }));
        
        try {
            await updateNotificationPreferences(userId, { channel: newChannel });
        } catch (err) {
            setLocalSettings(prev => ({ ...prev, channel: settings.channel }));
        }
    };

    const toggleClass = (checked) => 
        `relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-2 ${checked ? 'bg-[#10B981]' : 'bg-slate-200'}`;
    
    const sliderClass = (checked) =>
        `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`;

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#0F172A]">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#0F172A]">Notification Preferences</h3>
                        <p className="text-sm text-slate-500">Manage how you receive alerts and system updates</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Channel</label>
                    <select 
                        value={localSettings.channel}
                        onChange={handleChannelChange}
                        className="text-sm font-semibold text-[#0F172A] border-none bg-transparent focus:ring-0 cursor-pointer py-1 pl-1 pr-6"
                    >
                        <option value="email">Email</option>
                        <option value="push">Push Notification</option>
                        <option value="sms">SMS Text</option>
                    </select>
                </div>
            </div>

            <div className="divide-y divide-slate-100">
                <div className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="mt-1 text-[#0F172A]"><Store className="w-5 h-5" /></div>
                        <div>
                            <h4 className="font-bold text-[#0F172A] text-sm">MSME Registrations & Onboarding</h4>
                            <p className="text-sm text-slate-500 mt-0.5">Receive alerts for new host applications, business approvals, and profile updates.</p>
                        </div>
                    </div>
                    <button type="button" className={toggleClass(localSettings.notify_new_msme)} onClick={() => handleToggle('notify_new_msme')}>
                        <span className={sliderClass(localSettings.notify_new_msme)} />
                    </button>
                </div>

                <div className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="mt-1 text-[#0F172A]"><Activity className="w-5 h-5" /></div>
                        <div>
                            <h4 className="font-bold text-[#0F172A] text-sm">Platform Operations</h4>
                            <p className="text-sm text-slate-500 mt-0.5">Alerts for critical customer disputes, booking cancellations, and review moderation requests.</p>
                        </div>
                    </div>
                    <button type="button" className={toggleClass(localSettings.notify_disputes)} onClick={() => handleToggle('notify_disputes')}>
                        <span className={sliderClass(localSettings.notify_disputes)} />
                    </button>
                </div>

                <div className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="mt-1 text-[#0F172A]"><DollarSign className="w-5 h-5" /></div>
                        <div>
                            <h4 className="font-bold text-[#0F172A] text-sm">Financials & Payouts</h4>
                            <p className="text-sm text-slate-500 mt-0.5">Notifications for high-value payout requests and transaction settlement confirmations.</p>
                        </div>
                    </div>
                    <button type="button" className={toggleClass(localSettings.notify_payouts)} onClick={() => handleToggle('notify_payouts')}>
                        <span className={sliderClass(localSettings.notify_payouts)} />
                    </button>
                </div>

                <div className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="mt-1 text-[#EF4444]"><ShieldAlert className="w-5 h-5" /></div>
                        <div>
                            <h4 className="font-bold text-[#0F172A] text-sm">System & Security</h4>
                            <p className="text-sm text-slate-500 mt-0.5">Critical warnings for unauthorized access attempts, role modifications, and system maintenance.</p>
                        </div>
                    </div>
                    <button type="button" className={toggleClass(localSettings.notify_security)} onClick={() => handleToggle('notify_security')}>
                        <span className={sliderClass(localSettings.notify_security)} />
                    </button>
                </div>
            </div>
        </div>
    );
}
