import React from 'react';
import { adminProfileService } from '@/Services/adminProfileService';
import { Bell, ShieldAlert, DollarSign, Store, Activity } from 'lucide-react';

export default function NotificationPreferences({ notifications }) {
    
    const handleToggle = async (key) => {
        await adminProfileService.updateNotifications({
            [key]: !notifications[key]
        });
    };

    const preferences = [
        {
            id: 'msme_alerts',
            title: 'New MSME Onboarding Requests',
            description: 'Get notified when a new host or merchant submits an application for platform approval.',
            icon: Store,
            color: 'text-indigo-500',
            bg: 'bg-indigo-50'
        },
        {
            id: 'payout_alerts',
            title: 'High-Value Payout Requests',
            description: 'Receive alerts for any pending MSME payout exceeding LKR 100,000.',
            icon: DollarSign,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
        },
        {
            id: 'dispute_alerts',
            title: 'Critical Disputes & Fraud Flags',
            description: 'Immediate notifications for chargebacks, customer disputes, or AI fraud detection flags.',
            icon: ShieldAlert,
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            id: 'security_alerts',
            title: 'System Maintenance & Error Alerts',
            description: 'Platform downtime warnings, server errors, and critical infrastructure notices.',
            icon: Activity,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-indigo-500" /> 
                System Notification Preferences
            </h3>
            <p className="text-sm text-slate-600 mb-8">
                Configure which critical platform events trigger an email or push notification to your devices.
            </p>

            <div className="space-y-6">
                {preferences.map((pref) => (
                    <div key={pref.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex items-start pr-4">
                            <div className={`p-2 rounded-lg ${pref.bg} mr-4 flex-shrink-0`}>
                                <pref.icon className={`w-5 h-5 ${pref.color}`} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">{pref.title}</h4>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    {pref.description}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleToggle(pref.id)}
                            className={`${
                                notifications[pref.id] ? 'bg-indigo-600' : 'bg-slate-300'
                            } mt-1 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                        >
                            <span
                                className={`${
                                    notifications[pref.id] ? 'translate-x-5' : 'translate-x-0'
                                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
