import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Check, CreditCard, Smartphone, Banknote, ShieldCheck, Download, 
    ExternalLink, AlertCircle, QrCode, Copy, CheckCircle2, Lock, Building2,
    Calendar, MapPin, User, Mail, Phone, Sparkles
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { 
    validateCardNumber, 
    validateExpiryDate, 
    validateCvv, 
    validateCardHolder, 
    getCardBrand 
} from '@/Utils/cardValidation';

const bookingSchema = z.object({
    pickup: z.string().trim().min(3, { message: 'Pickup location must be at least 3 characters.' }),
    date: z.string().min(1, { message: 'Please select a valid date.' }),
    name: z.string().trim().min(2, { message: 'Please enter a valid full name.' }),
    email: z.string().trim().email({ message: 'Please enter a valid email address (e.g. name@example.com).' }),
    phone: z.string().trim().refine((val) => {
        // Strip common whitespace/dashes
        const cleaned = val.replace(/[\s\-()]/g, '');
        // Match standard 10-digit format starting with 0 (e.g. 0771234567, 0712345678) or international +94 / 94
        return /^(?:0\d{9}|(?:\+94|94)7\d{8}|07\d{8})$/.test(cleaned);
    }, {
        message: 'Please enter a valid 10-digit phone number (e.g. 077 123 4567 or +94 77 123 4567).'
    }),
});

export default function BookingModal({ isOpen, onClose, vehicle }) {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [serverError, setServerError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingReference, setBookingReference] = useState('TRP-' + Math.floor(100000 + Math.random() * 900000));
    const [copiedAccount, setCopiedAccount] = useState(false);
    
    // Card payment form state
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: ''
    });

    const [cardErrors, setCardErrors] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: ''
    });

    // Bank transfer reference input state
    const [bankReference, setBankReference] = useState('');

    // Amenities state
    const [amenities, setAmenities] = useState({
        elderly: false,
        cooking: false,
        guide: false,
        firstAid: true
    });

    const {
        register,
        trigger,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(bookingSchema),
        mode: 'onChange',
        defaultValues: {
            pickup: 'Anuradhapura Central Station',
            date: new Date().toISOString().split('T')[0],
            name: '',
            email: '',
            phone: ''
        }
    });

    if (!isOpen) return null;

    // Price calculation
    const parseBasePrice = () => {
        if (!vehicle?.price) return 14000;
        const match = vehicle.price.match(/[\d,]+/);
        if (match) {
            const num = parseInt(match[0].replace(/,/g, ''), 10);
            return isNaN(num) ? 14000 : num;
        }
        return 14000;
    };

    const baseFare = parseBasePrice();
    const amenitiesCost = (amenities.elderly ? 1500 : 0) + 
                          (amenities.cooking ? 2500 : 0) + 
                          (amenities.guide ? 2000 : 0);
    const totalFare = baseFare + amenitiesCost;
    const advanceFare = Math.round(totalFare * 0.20);

    const handleContinueStep1 = async () => {
        const isValid = await trigger(['pickup', 'date', 'name', 'email', 'phone']);
        if (isValid) {
            setStep(2);
        }
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2500);
    };

    const detectedBrand = getCardBrand(cardDetails.cardNumber);

    const onSubmitBooking = async () => {
        setServerError(null);

        // Card validation check
        if (paymentMethod === 'card') {
            const numValidation = validateCardNumber(cardDetails.cardNumber);
            const dateValidation = validateExpiryDate(cardDetails.expiry);
            const cvvValidation = validateCvv(cardDetails.cvv, numValidation.brand);
            const holderValidation = validateCardHolder(cardDetails.cardHolder);

            const newCardErrors = {
                cardNumber: numValidation.isValid ? '' : numValidation.error,
                expiry: dateValidation.isValid ? '' : dateValidation.error,
                cvv: cvvValidation.isValid ? '' : cvvValidation.error,
                cardHolder: holderValidation.isValid ? '' : holderValidation.error
            };

            setCardErrors(newCardErrors);

            if (!numValidation.isValid || !dateValidation.isValid || !cvvValidation.isValid || !holderValidation.isValid) {
                return;
            }
        }

        const formValues = getValues();
        setIsSubmitting(true);

        try {
            const res = await axios.post('/api/transport-booking', {
                ...formValues,
                vehicleName: vehicle?.name || 'Transport Service',
                paymentMethod,
                paymentDetails: paymentMethod === 'card' 
                    ? { 
                        cardHolder: cardDetails.cardHolder, 
                        last4: cardDetails.cardNumber.replace(/\D/g, '').slice(-4),
                        brand: detectedBrand || 'card'
                    }
                    : paymentMethod === 'bank' 
                        ? { reference: bankReference } 
                        : { method: 'LankaQR' },
                amenities: Object.keys(amenities).filter(k => amenities[k]),
                passengers: 'Group',
                totalAmount: `LKR ${totalFare.toLocaleString()}`,
                advanceAmount: `LKR ${advanceFare.toLocaleString()}`
            });
            if (res.data?.booking_reference) {
                setBookingReference(res.data.booking_reference);
            }
            setStep(4);
        } catch (error) {
            console.error('Booking error', error);
            if (error.response?.data?.errors) {
                const firstKey = Object.keys(error.response.data.errors)[0];
                setServerError(error.response.data.errors[firstKey][0]);
            } else if (error.response?.data?.message) {
                setServerError(error.response.data.message);
            } else {
                setServerError('Unable to process reservation. Please check your details and try again.');
            }
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
                        <button onClick={onClose} className="relative z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white cursor-pointer">
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
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                Pickup Location <span className="text-rose-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                {...register('pickup')} 
                                                className={`w-full bg-slate-50 rounded-xl px-4 py-2.5 text-sm transition-colors ${errors.pickup ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500'}`} 
                                            />
                                            {errors.pickup && (
                                                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.pickup.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                Date <span className="text-rose-500">*</span>
                                            </label>
                                            <input 
                                                type="date" 
                                                {...register('date')} 
                                                className={`w-full bg-slate-50 rounded-xl px-4 py-2.5 text-sm transition-colors ${errors.date ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500'}`} 
                                            />
                                            {errors.date && (
                                                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.date.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                Passenger Details <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="flex flex-col gap-3">
                                                <div>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Full Name *" 
                                                        {...register('name')} 
                                                        className={`w-full bg-slate-50 rounded-xl px-4 py-2.5 text-sm transition-colors ${errors.name ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500'}`} 
                                                    />
                                                    {errors.name && (
                                                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.name.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <input 
                                                            type="email" 
                                                            placeholder="Email Address *" 
                                                            {...register('email')} 
                                                            className={`w-full bg-slate-50 rounded-xl px-4 py-2.5 text-sm transition-colors ${errors.email ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500'}`} 
                                                        />
                                                        {errors.email && (
                                                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.email.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <input 
                                                            type="tel" 
                                                            placeholder="Phone Number (e.g. 077 123 4567) *" 
                                                            {...register('phone')} 
                                                            className={`w-full bg-slate-50 rounded-xl px-4 py-2.5 text-sm transition-colors ${errors.phone ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500'}`} 
                                                        />
                                                        {errors.phone && (
                                                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                                                <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.phone.message}
                                                            </p>
                                                        )}
                                                    </div>
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
                                            { id: 'elderly', title: 'Elderly/Disabled Assistant', desc: 'Dedicated help for wheelchair mobility (+LKR 1,500).' },
                                            { id: 'cooking', title: 'Cooking Equipment Trailer', desc: 'For groups planning to cook meals (+LKR 2,500).' },
                                            { id: 'guide', title: 'Experienced Pilgrimage Guide', desc: 'Local Vandana Nayaka to lead chants & history (+LKR 2,000).' },
                                            { id: 'firstAid', title: 'First Aid Kit Onboard', desc: 'Included free of charge in all vehicles.' }
                                        ].map(item => (
                                            <label key={item.id} className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${amenities[item.id] ? 'border-teal-500 bg-teal-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
                                                <input type="checkbox" className="mt-1 w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer" 
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
                                    
                                    {serverError && (
                                        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>{serverError}</span>
                                        </div>
                                    )}

                                    {/* Fare Breakdown */}
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600">Base Fare ({vehicle?.name || 'Vehicle'})</span>
                                            <span className="font-bold text-slate-800">LKR {baseFare.toLocaleString()}</span>
                                        </div>
                                        {amenitiesCost > 0 && (
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-slate-600">Amenities & Add-ons</span>
                                                <span className="font-bold text-slate-800">LKR {amenitiesCost.toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="h-px bg-slate-200 my-2"></div>
                                        <div className="flex justify-between text-base">
                                            <span className="font-bold text-slate-800">Total Fare</span>
                                            <span className="font-bold text-teal-700">LKR {totalFare.toLocaleString()}</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm">
                                            <span className="font-bold text-amber-600">Required Advance Payment (20%)</span>
                                            <span className="font-bold text-amber-700">LKR {advanceFare.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Selectable Payment Tabs */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                                            Select Payment Gateway / Method
                                        </label>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('card')} 
                                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-teal-500 bg-teal-50/70 text-teal-800 shadow-sm ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'}`}
                                            >
                                                <CreditCard className="w-8 h-8 mb-2 text-teal-700" />
                                                <span className="font-bold text-sm">Card Payment</span>
                                                <span className="text-[10px] text-slate-400 mt-1">Visa / Master / LankaPay</span>
                                            </button>

                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('lankaqr')} 
                                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'lankaqr' ? 'border-teal-500 bg-teal-50/70 text-teal-800 shadow-sm ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'}`}
                                            >
                                                <Smartphone className="w-8 h-8 mb-2 text-teal-700" />
                                                <span className="font-bold text-sm">LankaQR</span>
                                                <span className="text-[10px] text-slate-400 mt-1">Scan & Pay via Mobile App</span>
                                            </button>

                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('bank')} 
                                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-teal-500 bg-teal-50/70 text-teal-800 shadow-sm ring-2 ring-teal-500/20' : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'}`}
                                            >
                                                <Banknote className="w-8 h-8 mb-2 text-teal-700" />
                                                <span className="font-bold text-sm">Bank Transfer</span>
                                                <span className="text-[10px] text-slate-400 mt-1">Direct Bank Deposit / Slip</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Method Specific Interactive Form View */}
                                    <div className="mt-4">
                                        {paymentMethod === 'card' && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                                                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                                                        <Lock className="w-4 h-4 text-emerald-600" />
                                                        <span>Encrypted Card Checkout (PayHere)</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                                        <span className={`px-2 py-0.5 rounded border transition-all ${detectedBrand === 'visa' ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600'}`}>
                                                            VISA
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded border transition-all ${detectedBrand === 'mastercard' ? 'bg-amber-600 text-white font-bold border-amber-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600'}`}>
                                                            Mastercard
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded border transition-all ${detectedBrand === 'lankapay' ? 'bg-teal-700 text-white font-bold border-teal-700 shadow-sm' : 'bg-white border-slate-200 text-teal-700'}`}>
                                                            LankaPay
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded border transition-all ${detectedBrand === 'amex' ? 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-sm' : 'bg-white border-slate-200 text-slate-600'}`}>
                                                            AMEX
                                                        </span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                        Cardholder Name <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Name on credit/debit card"
                                                        value={cardDetails.cardHolder}
                                                        onChange={(e) => {
                                                            setCardDetails({ ...cardDetails, cardHolder: e.target.value });
                                                            if (cardErrors.cardHolder) {
                                                                setCardErrors(prev => ({ ...prev, cardHolder: '' }));
                                                            }
                                                        }}
                                                        onBlur={() => {
                                                            const res = validateCardHolder(cardDetails.cardHolder);
                                                            setCardErrors(prev => ({ ...prev, cardHolder: res.isValid ? '' : res.error }));
                                                        }}
                                                        className={`w-full bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${cardErrors.cardHolder ? 'border border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-400' : 'border border-slate-200 focus:ring-2 focus:ring-teal-500'}`}
                                                    />
                                                    {cardErrors.cardHolder && (
                                                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                                                            <AlertCircle className="w-3 h-3 flex-shrink-0" /> {cardErrors.cardHolder}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                        Card Number <span className="text-rose-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <input 
                                                            type="text" 
                                                            maxLength={19}
                                                            placeholder="4532 •••• •••• 8920"
                                                            value={cardDetails.cardNumber}
                                                            onChange={(e) => {
                                                                const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                                const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
                                                                setCardDetails({ ...cardDetails, cardNumber: formatted });
                                                                if (cardErrors.cardNumber) {
                                                                    setCardErrors(prev => ({ ...prev, cardNumber: '' }));
                                                                }
                                                            }}
                                                            onBlur={() => {
                                                                const res = validateCardNumber(cardDetails.cardNumber);
                                                                setCardErrors(prev => ({ ...prev, cardNumber: res.isValid ? '' : res.error }));
                                                            }}
                                                            className={`w-full bg-white rounded-xl px-4 py-2.5 text-sm font-mono tracking-wider focus:outline-none transition-colors ${cardErrors.cardNumber ? 'border border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-400' : 'border border-slate-200 focus:ring-2 focus:ring-teal-500'}`}
                                                        />
                                                        <CreditCard className="w-5 h-5 text-slate-400 absolute right-3 top-2.5" />
                                                    </div>
                                                    {cardErrors.cardNumber && (
                                                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                                                            <AlertCircle className="w-3 h-3 flex-shrink-0" /> {cardErrors.cardNumber}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                            Expiry Date <span className="text-rose-500">*</span>
                                                        </label>
                                                        <input 
                                                            type="text" 
                                                            maxLength={5}
                                                            placeholder="MM/YY"
                                                            value={cardDetails.expiry}
                                                            onChange={(e) => {
                                                                let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                                if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                                                                setCardDetails({ ...cardDetails, expiry: v });
                                                                if (cardErrors.expiry) {
                                                                    setCardErrors(prev => ({ ...prev, expiry: '' }));
                                                                }
                                                            }}
                                                            onBlur={() => {
                                                                const res = validateExpiryDate(cardDetails.expiry);
                                                                setCardErrors(prev => ({ ...prev, expiry: res.isValid ? '' : res.error }));
                                                            }}
                                                            className={`w-full bg-white rounded-xl px-4 py-2.5 text-sm font-mono text-center focus:outline-none transition-colors ${cardErrors.expiry ? 'border border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-400' : 'border border-slate-200 focus:ring-2 focus:ring-teal-500'}`}
                                                        />
                                                        {cardErrors.expiry && (
                                                            <p className="mt-1 text-xs text-rose-500 font-medium">
                                                                {cardErrors.expiry}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                            CVV / CVC <span className="text-rose-500">*</span>
                                                        </label>
                                                        <input 
                                                            type="password" 
                                                            maxLength={4}
                                                            placeholder="•••"
                                                            value={cardDetails.cvv}
                                                            onChange={(e) => {
                                                                setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) });
                                                                if (cardErrors.cvv) {
                                                                    setCardErrors(prev => ({ ...prev, cvv: '' }));
                                                                }
                                                            }}
                                                            onBlur={() => {
                                                                const res = validateCvv(cardDetails.cvv, detectedBrand);
                                                                setCardErrors(prev => ({ ...prev, cvv: res.isValid ? '' : res.error }));
                                                            }}
                                                            className={`w-full bg-white rounded-xl px-4 py-2.5 text-sm font-mono text-center focus:outline-none transition-colors ${cardErrors.cvv ? 'border border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-400' : 'border border-slate-200 focus:ring-2 focus:ring-teal-500'}`}
                                                        />
                                                        {cardErrors.cvv && (
                                                            <p className="mt-1 text-xs text-rose-500 font-medium">
                                                                {cardErrors.cvv}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {paymentMethod === 'lankaqr' && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                                                <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-slate-200 mb-3">
                                                    {/* LankaQR SVG Code representation */}
                                                    <div className="w-36 h-36 bg-teal-900 text-white rounded-xl flex flex-col items-center justify-center p-2 relative">
                                                        <QrCode className="w-28 h-28 text-white" />
                                                        <span className="text-[9px] font-bold tracking-wider text-teal-300 uppercase">LankaQR Verified</span>
                                                    </div>
                                                </div>

                                                <div className="text-sm font-bold text-slate-800">Scan with any Sri Lankan Banking App</div>
                                                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                                                    Open Flash, BOC SmartPay, FriMi, Sampath Vishwa, or HNB SOLO and scan to transfer the 20% advance (<strong>LKR {advanceFare.toLocaleString()}</strong>).
                                                </p>

                                                <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2">
                                                    <span className="text-[11px] font-bold text-slate-600">Merchant Reference:</span>
                                                    <span className="font-mono text-xs font-bold bg-white px-3 py-1 rounded-lg border border-slate-200 text-teal-800">
                                                        LQR-TRP-2026-8942
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {paymentMethod === 'bank' && (
                                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                                                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm border-b border-slate-200 pb-3">
                                                    <Building2 className="w-4 h-4 text-teal-700" />
                                                    <span>Official Bank Deposit Account</span>
                                                </div>

                                                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                                                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                                                        <span className="text-slate-400 block font-semibold">Bank & Branch</span>
                                                        <span className="font-bold text-slate-800 text-sm">Commercial Bank of Ceylon</span>
                                                        <span className="text-slate-500 block">Anuradhapura City Branch</span>
                                                    </div>
                                                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                                                        <div>
                                                            <span className="text-slate-400 block font-semibold">Account Number</span>
                                                            <span className="font-mono font-bold text-slate-800 text-sm">8009 2314 9910</span>
                                                        </div>
                                                        <button 
                                                            type="button"
                                                            onClick={() => copyToClipboard('800923149910')}
                                                            className="flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 font-bold bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg border border-teal-200 transition-colors cursor-pointer"
                                                        >
                                                            {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                                            {copiedAccount ? 'Copied' : 'Copy'}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                                        Bank Reference / Transaction ID (Optional)
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="e.g. TXN-928174 or Deposit Slip No."
                                                        value={bankReference}
                                                        onChange={(e) => setBankReference(e.target.value)}
                                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-6">
                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-800">Booking Confirmed!</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto">Your transport has been successfully reserved. A confirmation email and SMS with live tracking details have been dispatched.</p>
                                    
                                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 max-w-sm mx-auto flex flex-col gap-3 text-left">
                                        <div className="flex justify-between text-sm border-b border-slate-200 pb-2">
                                            <span className="text-slate-500">Booking ID</span>
                                            <span className="font-mono font-bold text-slate-800">#{bookingReference}</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-b border-slate-200 pb-2">
                                            <span className="text-slate-500">Payment Mode</span>
                                            <span className="font-bold text-teal-800 uppercase">{paymentMethod}</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-b border-slate-200 pb-2">
                                            <span className="text-slate-500">Total Fare</span>
                                            <span className="font-bold text-slate-800">LKR {totalFare.toLocaleString()}</span>
                                        </div>

                                        <button 
                                            onClick={() => window.open('/api/transport-booking/ticket.pdf', '_blank')}
                                            className="flex items-center justify-center gap-2 text-teal-700 font-bold text-sm hover:text-teal-800 mt-2 cursor-pointer"
                                        >
                                            <Download className="w-4 h-4" /> Download QR E-Ticket PDF
                                        </button>
                                        <button 
                                            onClick={() => window.open('/transport/tracking', '_blank')}
                                            className="flex items-center justify-center gap-2 text-slate-600 font-bold text-sm hover:text-slate-800 cursor-pointer"
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
                            <button onClick={prevStep} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                                Back
                            </button>
                        ) : (
                            <div />
                        )}
                        
                        {step === 1 ? (
                            <button onClick={handleContinueStep1} className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer">
                                Continue
                            </button>
                        ) : step === 2 ? (
                            <button onClick={nextStep} className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer">
                                Continue
                            </button>
                        ) : step === 3 ? (
                            <button onClick={onSubmitBooking} disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer">
                                {isSubmitting ? 'Confirming...' : 'Pay & Confirm'} <ShieldCheck className="w-4 h-4" />
                            </button>
                        ) : (
                            <button onClick={onClose} className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer">
                                Close Window
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}


