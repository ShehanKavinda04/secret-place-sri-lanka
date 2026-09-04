import React, { useState } from 'react';
import { Key, Lock, Smartphone, Laptop, Globe, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { updatePassword, setup2FA, verify2FA, revokeSession, revokeAllOtherSessions } from '../../Hooks/useSecuritySettings';

export default function SecurityLoginHub({ userId, is2FAEnabled, sessions }) {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passLoading, setPassLoading] = useState(false);
    const [passError, setPassError] = useState('');
    const [passSuccess, setPassSuccess] = useState(false);

    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');
    const [otp, setOtp] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('');

    const [sessionLoading, setSessionLoading] = useState(null);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPassError('');
        setPassSuccess(false);

        if (newPass !== confirmPass) {
            setPassError("New passwords do not match.");
            return;
        }

        setPassLoading(true);
        try {
            await updatePassword(userId, currentPass, newPass);
            setPassSuccess(true);
            setCurrentPass('');
            setNewPass('');
            setConfirmPass('');
        } catch (err) {
            setPassError(err.message || "Failed to update password");
        } finally {
            setPassLoading(false);
        }
    };

    const handleOpen2FA = async () => {
        if (is2FAEnabled) return;
        setIs2FAModalOpen(true);
        setQrCodeData('');
        const qr = await setup2FA(userId);
        setQrCodeData(qr);
    };

    const handleVerifyOTP = async () => {
        setOtpError('');
        setOtpLoading(true);
        try {
            await verify2FA(userId, otp);
            setIs2FAModalOpen(false);
            setOtp('');
        } catch (err) {
            setOtpError(err.message || "Invalid OTP");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleRevoke = async (id) => {
        setSessionLoading(id);
        await revokeSession(id);
        setSessionLoading(null);
    };

    const handleRevokeAllOthers = async () => {
        setSessionLoading('all');
        await revokeAllOtherSessions(userId);
        setSessionLoading(null);
    };

    const strength = Math.min((newPass.length / 12) * 100, 100);
    const strengthColor = strength < 40 ? 'bg-[#EF4444]' : strength < 80 ? 'bg-[#F59E0B]' : 'bg-[#10B981]';

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Password Form */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#0F172A]">
                            <Key className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A]">Change Password</h3>
                    </div>

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        {passError && (
                            <div className="p-3 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-sm font-medium flex items-center gap-2">
                                <XCircle className="w-4 h-4" /> {passError}
                            </div>
                        )}
                        {passSuccess && (
                            <div className="p-3 rounded-lg bg-[#10B981]/10 text-[#10B981] text-sm font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Password updated successfully.
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
                            <input 
                                type="password" 
                                value={currentPass}
                                onChange={(e) => setCurrentPass(e.target.value)}
                                className="w-full rounded-lg border-slate-300 focus:border-[#0F172A] focus:ring-[#0F172A]" 
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                            <input 
                                type="password" 
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                className="w-full rounded-lg border-slate-300 focus:border-[#0F172A] focus:ring-[#0F172A]" 
                                required
                                minLength={8}
                            />
                            {newPass.length > 0 && (
                                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${strength}%` }}></div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                className="w-full rounded-lg border-slate-300 focus:border-[#0F172A] focus:ring-[#0F172A]" 
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={passLoading}
                            className="w-full py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#0F172A]/90 text-white font-bold text-sm tracking-wide transition-colors disabled:opacity-70"
                        >
                            {passLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>

                {/* 2FA Card */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-center items-center text-center">
                    <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${is2FAEnabled ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-slate-100 text-slate-400'}`}>
                        <Lock className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm">
                        {is2FAEnabled 
                            ? "Your account is highly secure. Two-factor authentication is active and protecting your data."
                            : "Add an extra layer of security to your account by requiring a 6-digit code in addition to your password."}
                    </p>

                    {is2FAEnabled ? (
                        <div className="px-6 py-2.5 rounded-full bg-[#10B981]/10 text-[#10B981] font-bold text-sm tracking-wide border border-[#10B981]/20 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Enabled & Active
                        </div>
                    ) : (
                        <button 
                            onClick={handleOpen2FA}
                            className="px-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#0F172A]/90 text-white font-bold text-sm tracking-wide transition-colors"
                        >
                            Setup 2FA Now
                        </button>
                    )}
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#0F172A]">
                            <Laptop className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#0F172A]">Active Sessions & Devices</h3>
                            <p className="text-sm text-slate-500">Manage the devices currently logged into your account</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleRevokeAllOthers}
                        disabled={sessionLoading === 'all' || sessions.length <= 1}
                        className="px-4 py-2 text-sm font-semibold text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <LogOut className="w-4 h-4" /> Revoke All Others
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {sessions.map(session => (
                        <div key={session.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                    {session.device_name.toLowerCase().includes('iphone') || session.device_name.toLowerCase().includes('android') ? (
                                        <Smartphone className="w-6 h-6" />
                                    ) : (
                                        <Laptop className="w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0F172A] flex items-center gap-2">
                                        {session.device_name}
                                        {session.is_current && (
                                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981]">This Device</span>
                                        )}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {session.browser}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span>IP: {session.ip_address}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span>{session.location}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {!session.is_current && (
                                <button
                                    onClick={() => handleRevoke(session.id)}
                                    disabled={sessionLoading === session.id}
                                    className="self-start md:self-auto px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-[#EF4444]/10 hover:text-[#EF4444] rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {sessionLoading === session.id ? 'Revoking...' : 'Revoke Session'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2FA Modal */}
            {is2FAModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 text-center border-b border-slate-100 relative">
                            <button onClick={() => setIs2FAModalOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-700">
                                <XCircle className="w-6 h-6" />
                            </button>
                            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto mb-3">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A]">Setup Authenticator</h3>
                            <p className="text-sm text-slate-500 mt-1">Scan the QR code with Google Authenticator or Authy.</p>
                        </div>

                        <div className="p-6">
                            {qrCodeData ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-48 h-48 bg-white border-2 border-slate-200 rounded-lg p-2 flex items-center justify-center mb-6">
                                        <div className="w-full h-full bg-slate-800" style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, #0F172A 25%, transparent 25%, transparent 75%, #0F172A 75%, #0F172A), repeating-linear-gradient(45deg, #0F172A 25%, #fff 25%, #fff 75%, #0F172A 75%, #0F172A)',
                                            backgroundPosition: '0 0, 10px 10px',
                                            backgroundSize: '20px 20px'
                                        }}></div>
                                    </div>

                                    {otpError && (
                                        <p className="text-sm text-[#EF4444] font-medium mb-3">{otpError}</p>
                                    )}

                                    <input 
                                        type="text" 
                                        placeholder="Enter 6-digit code" 
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className="w-full text-center tracking-[0.2em] font-mono text-lg rounded-lg border-slate-300 focus:border-[#0F172A] focus:ring-[#0F172A]"
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center py-10">
                                    <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0F172A] rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setIs2FAModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
                                Cancel
                            </button>
                            <button 
                                onClick={handleVerifyOTP}
                                disabled={otp.length !== 6 || otpLoading}
                                className="px-5 py-2 rounded-lg bg-[#0F172A] hover:bg-[#0F172A]/90 text-white font-bold text-sm disabled:opacity-50 transition-colors"
                            >
                                {otpLoading ? 'Verifying...' : 'Verify & Enable'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
