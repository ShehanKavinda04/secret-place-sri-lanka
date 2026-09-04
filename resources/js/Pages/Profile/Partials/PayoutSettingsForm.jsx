import React, { useState, useEffect, useRef } from 'react';
import { profileService } from '@/Services/profileService';
import { Check, CreditCard, QrCode } from 'lucide-react';

export default function PayoutSettingsForm({ payout }) {
    const sriLankanBanks = [
        'Bank of Ceylon (BOC)',
        'People\'s Bank',
        'Commercial Bank of Ceylon',
        'Hatton National Bank (HNB)',
        'Sampath Bank',
        'Seylan Bank',
        'National Development Bank (NDB)',
        'Nations Trust Bank (NTB)',
        'Pan Asia Bank',
        'DFCC Bank',
        'Amana Bank',
    ];

    const [formData, setFormData] = useState({
        bank_name: payout.bank_name,
        account_name: payout.account_name,
        account_number: payout.account_number,
        branch_name: payout.branch_name,
    });
    
    const [qrUrl, setQrUrl] = useState(payout.lanka_qr_url);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const qrInputRef = useRef(null);

    useEffect(() => {
        setFormData({
            bank_name: payout.bank_name,
            account_name: payout.account_name,
            account_number: payout.account_number,
            branch_name: payout.branch_name,
        });
        setQrUrl(payout.lanka_qr_url);
    }, [payout]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleQrUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await profileService.uploadMedia(file);
            await profileService.updatePayoutDetails({ lanka_qr_url: url });
            setQrUrl(url);
        } catch (error) {
            console.error("QR upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await profileService.updatePayoutDetails(formData);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Failed to update payout settings", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-slate-500" /> Bank Account & Payouts
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name</label>
                        <select 
                            name="bank_name"
                            value={formData.bank_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        >
                            <option value="">Select a Bank...</option>
                            {sriLankanBanks.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name</label>
                        <input 
                            type="text" 
                            name="branch_name"
                            value={formData.branch_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Holder Name</label>
                        <input 
                            type="text" 
                            name="account_name"
                            value={formData.account_name}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                        <input 
                            type="text" 
                            name="account_number"
                            value={formData.account_number}
                            onChange={handleChange}
                            className="w-full rounded-lg border-slate-300 focus:border-[#1B4D3E] focus:ring-[#1B4D3E] shadow-sm text-sm font-mono"
                            required
                        />
                    </div>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-900 flex items-center mb-2">
                                <QrCode className="w-4 h-4 mr-2" /> LankaQR Integration
                            </h4>
                            <p className="text-xs text-slate-500 mb-4">
                                Upload your LankaQR merchant code. We will display this to guests for instant local settlements.
                            </p>
                            <button 
                                type="button"
                                onClick={() => qrInputRef.current?.click()}
                                disabled={isUploading}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                            >
                                {isUploading ? 'Uploading...' : 'Upload QR Image'}
                            </button>
                            <input 
                                type="file" 
                                ref={qrInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleQrUpload}
                            />
                        </div>
                        {qrUrl && (
                            <div className="w-24 h-24 bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex-shrink-0">
                                <img src={qrUrl} alt="LankaQR Code" className="w-full h-full object-contain" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2 bg-[#1B4D3E] text-white font-bold rounded-lg shadow-md shadow-[#1B4D3E]/20 hover:bg-[#143d31] transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Payout Details'}
                    </button>
                </div>
            </form>

            {showToast && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in-up">
                    <Check className="w-4 h-4 mr-2" /> Payout details saved
                </div>
            )}
        </div>
    );
}
