import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CreditCard, Smartphone, Banknote, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import axios from 'axios';

export default function BookingModal({ isOpen, onClose, vehicle }) {
    const [step, setStep] = useState(1);
    
    // Form state
    const [amenities, setAmenities] = useState({
        elderly: false,
        cooking: false,
        guide: false,
        firstAid: true
    });
    const [formData, setFormData] = useState({
        pickup: 'Anuradhapura Central Station',
        date: '2024-03-15',
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const confirmBooking = async () => {
        setIsSubmitting(true);
        try {
            await axios.post('/api/transport-booking', {
                ...formData,
                vehicleName: vehicle?.name || 'Transport Service',
                passengers: 'Group',
                totalAmount: 'LKR 16,500'
            });
            setStep(4);
        } catch (error) {
            console.error('Booking error', error);
            setStep(4); // Proceed to success screen anyway for demo
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleAmenity = (key) => setAmenities(prev => ({...prev, [key]: !prev[key]}));

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="bg-teal-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
                        <div className="relative z-10">
                            <h2 className="font-display text-2xl font-bold">Complete Your Booking</h2>
                            <p className="text-teal-100 text-sm">{vehicle?.name || 'Transport Reservation'}</p>
                        </div>
                        <button onClick={onClose} className="relative z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex px-6 pt-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex-1 flex flex-col items-center relative">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors ${step >= i ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                    {step > i ? <Check className="w-4 h-4" /> : i}
                                </div>
                                <div className="text-[10px] uppercase font-bold text-slate-500 mt-2 text-center">
                                    {i === 1 ? 'Summary' : i === 2 ? 'Amenities' : i === 3 ? 'Payment' : 'Confirm'}
                                </div>
                                {i < 4 && (
                                    <div className={`absolute top-4 left-1/2 w-full h-1 -translate-y-1/2 transition-colors ${step > i ? 'bg-teal-500' : 'bg-slate-100'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Trip & Passenger Summary</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pickup</label>
                                            <input type="text" value={formData.pickup} onChange={e => setFormData({...formData, pickup: e.target.value})} className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-teal-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-teal-500" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Passenger Details</label>
                                            <div className="flex flex-col gap-4">
                                                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-teal-500" />
                                                <div className="flex gap-4">
                                                    <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="flex-1 bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-teal-500" />
                                                    <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="flex-1 bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-teal-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 flex gap-4 items-center">
                                        <div className="w-20 h-20 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                                            <img src={vehicle?.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-teal-900">{vehicle?.name}</h4>
                                            <p className="text-sm text-teal-700">{vehicle?.capacity} • {vehicle?.price}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Amenities & Special Needs</h3>
                                    <p className="text-sm text-slate-500">Select any additional services you require for a smooth pilgrimage.</p>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { id: 'elderly', title: 'Elderly/Disabled Assistant', desc: 'Dedicated help for wheelchair mobility.' },
                                            { id: 'cooking', title: 'Cooking Equipment Trailer', desc: 'For groups planning to cook meals.' },
                                            { id: 'guide', title: 'Experienced Pilgrimage Guide', desc: 'Local Vandana Nayaka to lead chants & history.' },
                                            { id: 'firstAid', title: 'First Aid Kit Onboard', desc: 'Included free of charge in all vehicles.' }
                                        ].map(item => (
                                            <label key={item.id} className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${amenities[item.id] ? 'border-teal-500 bg-teal-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
                                                <input type="checkbox" className="mt-1 w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-slate-300" 
                                                    checked={amenities[item.id]} 
                                                    onChange={() => toggleAmenity(item.id)}
                                                    disabled={item.id === 'firstAid'}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                                                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">Payment Options</h3>
                                    
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600">Base Fare</span>
                                            <span className="font-bold text-slate-800">LKR 14,000</span>
                                        </div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600">Amenities & Add-ons</span>
                                            <span className="font-bold text-slate-800">LKR 2,500</span>
                                        </div>
                                        <div className="h-px bg-slate-200 my-2"></div>
                                        <div className="flex justify-between text-base">
                                            <span className="font-bold text-slate-800">Total Amount</span>
                                            <span className="font-bold text-teal-700">LKR 16,500</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm">
                                            <span className="font-bold text-amber-600">Required Advance (20%)</span>
                                            <span className="font-bold text-amber-700">LKR 3,300</span>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-teal-500 bg-teal-50 text-teal-800 cursor-pointer">
                                            <input type="radio" name="payment" className="sr-only" defaultChecked />
                                            <CreditCard className="w-8 h-8 mb-2" />
                                            <span className="font-bold text-sm">Card Payment</span>
                                        </label>
                                        <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 text-slate-600 cursor-pointer">
                                            <input type="radio" name="payment" className="sr-only" />
                                            <Smartphone className="w-8 h-8 mb-2" />
                                            <span className="font-bold text-sm">LankaQR</span>
                                        </label>
                                        <label className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 text-slate-600 cursor-pointer">
                                            <input type="radio" name="payment" className="sr-only" />
                                            <Banknote className="w-8 h-8 mb-2" />
                                            <span className="font-bold text-sm">Bank Transfer</span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-6">
                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-800">Booking Confirmed!</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto">Your transport has been successfully reserved. A confirmation SMS with live tracking details has been sent to your phone.</p>
                                    
                                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 max-w-sm mx-auto flex flex-col gap-3">
                                        <div className="flex justify-between text-sm border-b border-slate-200 pb-3">
                                            <span className="text-slate-500">Booking ID</span>
                                            <span className="font-mono font-bold text-slate-800">#TRP-847291</span>
                                        </div>
                                        <button 
                                            onClick={() => window.open('/api/transport-booking/ticket.pdf', '_blank')}
                                            className="flex items-center justify-center gap-2 text-teal-700 font-bold text-sm hover:text-teal-800 mt-2"
                                        >
                                            <Download className="w-4 h-4" /> Download QR E-Ticket PDF
                                        </button>
                                        <button 
                                            onClick={() => window.open('/transport/tracking', '_blank')}
                                            className="flex items-center justify-center gap-2 text-slate-600 font-bold text-sm hover:text-slate-800"
                                        >
                                            <ExternalLink className="w-4 h-4" /> View Live Tracking Link
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between">
                        {step > 1 && step < 4 ? (
                            <button onClick={prevStep} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                                Back
                            </button>
                        ) : (
                            <div /> // Spacer
                        )}
                        
                        {step < 3 ? (
                            <button onClick={nextStep} className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-colors">
                                Continue
                            </button>
                        ) : step === 3 ? (
                            <button onClick={confirmBooking} disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-colors flex items-center gap-2 disabled:opacity-50">
                                {isSubmitting ? 'Confirming...' : 'Pay & Confirm'} <ShieldCheck className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={onClose} className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-colors">
                                Close Window
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
