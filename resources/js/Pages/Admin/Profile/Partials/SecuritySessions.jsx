import React, { useState } from 'react';
import { adminProfileService } from '@/Services/adminProfileService';
import { Shield, Smartphone, Monitor, Trash2, Check, Lock, QrCode } from 'lucide-react';

export default function SecuritySessions({ profile, sessions }) {
    const [is2FAEnabled, setIs2FAEnabled] = useState(profile.two_factor_enabled);
    const [showQrCode, setShowQrCode] = useState(false);
    const [toggling2FA, setToggling2FA] = useState(false);
    
    // Password state
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [passwordToast, setPasswordToast] = useState(false);

    const handle2FAToggle = async () => {
        if (!is2FAEnabled && !showQrCode) {
            setShowQrCode(true); // Initiate setup flow
            return;
        }

        setToggling2FA(true);
        try {
            const newState = await adminProfileService.toggleTwoFactor(!is2FAEnabled);
            setIs2FAEnabled(newState);
            if (newState) setShowQrCode(false); // Hide QR after enabling
        } catch (e) {
            console.error("2FA Toggle failed", e);
        } finally {
            setToggling2FA(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setIsSavingPassword(true);
        try {
            // Mock network delay for password change
            await new Promise(resolve => setTimeout(resolve, 800));
            adminProfileService.logActivity('Security Settings', 'Changed account password');
            setPasswords({ current: '', new: '', confirm: '' });
            setPasswordToast(true);
            setTimeout(() => setPasswordToast(false), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSavingPassword(false);
        }
    };

    const terminateSession = async (id) => {
        await adminProfileService.terminateSession(id);
    };

    return (
        <div className="space-y-8">
            
            {/* Password & 2FA Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Change Password Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-indigo-500" /> 
                        Update Master Password
                    </h3>
                    
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                            <input 
                                type="password" 
                                value={passwords.current}
                                onChange={e => setPasswords({...passwords, current: e.target.value})}
                                className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                            <input 
                                type="password" 
                                value={passwords.new}
                                onChange={e => setPasswords({...passwords, new: e.target.value})}
                                className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={passwords.confirm}
                                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                                className="w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                                required
                            />
                        </div>
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={isSavingPassword || passwords.new !== passwords.confirm}
                                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                {isSavingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>

                    {passwordToast && (
                        <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up z-10">
                            <Check className="w-4 h-4 mr-2" /> Password Updated
                        </div>
                    )}
                </div>

                {/* 2FA Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-indigo-500" /> 
                        Two-Factor Authentication (2FA)
                    </h3>
                    
                    <div className="mb-6">
                        <p className="text-sm text-slate-600 mb-4">
                            Add an additional layer of security to your Super Admin account by requiring an authenticator code during login.
                        </p>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Authenticator App</h4>
                                <p className="text-xs text-slate-500">Google Authenticator, Authy, etc.</p>
                            </div>
                            <button
                                type="button"
                                onClick={handle2FAToggle}
                                disabled={toggling2FA}
                                className={`${
                                    is2FAEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50`}
                            >
                                <span
                                    className={`${
                                        is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </button>
                        </div>
                    </div>

                    {showQrCode && !is2FAEnabled && (
                        <div className="animate-fade-in-up border border-indigo-100 bg-indigo-50/50 p-4 rounded-xl text-center">
                            <h4 className="text-sm font-bold text-indigo-900 mb-2">Scan QR Code</h4>
                            <div className="bg-white p-2 inline-block rounded-lg shadow-sm mb-3">
                                <QrCode className="w-32 h-32 text-slate-900" />
                            </div>
                            <p className="text-xs text-slate-600 mb-3">Scan this code with your authenticator app.</p>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Enter 6-digit OTP" className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                                <button onClick={handle2FAToggle} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-bold">Verify</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-indigo-500" /> 
                    Active Login Sessions
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                    Manage and revoke your active sessions across other browsers and devices.
                </p>

                <div className="space-y-4">
                    {sessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center">
                                <div className="p-2 bg-white rounded-full shadow-sm mr-4 border border-slate-200">
                                    {session.device_info.includes('iPhone') || session.device_info.includes('Mobile') ? (
                                        <Smartphone className="w-5 h-5 text-slate-600" />
                                    ) : (
                                        <Monitor className="w-5 h-5 text-slate-600" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 flex items-center">
                                        {session.device_info}
                                        {session.is_current && (
                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                                This device
                                            </span>
                                        )}
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        {session.browser} • {session.ip_address}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Last active: {new Date(session.last_active_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            
                            {!session.is_current && (
                                <button 
                                    onClick={() => terminateSession(session.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Revoke Session"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                    {sessions.length === 0 && (
                        <p className="text-sm text-slate-500 italic py-4">No active sessions found.</p>
                    )}
                </div>
            </div>

        </div>
    );
}
