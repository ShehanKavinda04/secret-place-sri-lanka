import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { ShieldCheck, Truck, ArrowLeft, CreditCard, Lock, MoreHorizontal, Plus, Minus, Trash2, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import PriceDisplay, { parsePriceToNumber } from '@/Utils/PriceFormatter';
import { validateCardNumber, validateExpiryDate, validateCvv, validateCardHolder, getCardBrand } from '@/Utils/cardValidation';

export default function Checkout({ auth, item, quantity, laravelVersion, phpVersion }) {
    const initialQty = parseInt(quantity) || 1;
    const [liveProduct, setLiveProduct] = useState(item);

    useEffect(() => {
        if (!item?.id) return;
        const channel = window.Echo.channel(`craft-item.${item.id}`);
        channel.listen('CraftItemUpdated', (e) => {
            if (e.item) {
                setLiveProduct(e.item);
            }
        });
        return () => {
            window.Echo.leaveChannel(`craft-item.${item.id}`);
        };
    }, [item?.id]);

    const numericPrice = parsePriceToNumber(liveProduct?.price);

    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [cardErrors, setCardErrors] = useState({});

    useEffect(() => {
        if (flash?.success) {
            setIsModalOpen(false);
            setShowSuccessPopup(true);
        }
    }, [flash]);

    const user = auth?.user || {};
    
    let defaultFirstName = user.first_name || '';
    let defaultLastName = user.last_name || '';
    if (!defaultFirstName && user.name) {
        const parts = user.name.split(' ');
        defaultFirstName = parts[0];
        defaultLastName = parts.slice(1).join(' ');
    }

    const { data, setData, post, processing, errors } = useForm({
        email: user.email || '',
        firstName: defaultFirstName,
        lastName: defaultLastName,
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postal_code || '',
        phone: user.phone || '',
        payment_method: 'card',
        card_holder: '',
        card_number: '',
        valid_date: '',
        cvv: '',
        item_id: liveProduct?.id,
        quantity: initialQty
    });

    const [formErrors, setFormErrors] = useState({});

    const subtotal = numericPrice * data.quantity;
    const shipping = data.quantity > 0 ? 500.00 : 0;
    const total = subtotal + shipping;

    const validateField = (fieldName, value) => {
        const val = typeof value === 'string' ? value.trim() : '';
        switch (fieldName) {
            case 'email':
                if (!val) return 'Email address is required.';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address (e.g. name@example.com).';
                return '';
            case 'firstName':
                if (!val) return 'First name is required.';
                if (val.length < 2) return 'First name must be at least 2 characters.';
                return '';
            case 'lastName':
                if (!val) return 'Last name is required.';
                if (val.length < 2) return 'Last name must be at least 2 characters.';
                return '';
            case 'address':
                if (!val) return 'Street address is required.';
                if (val.length < 3) return 'Street address must be at least 3 characters.';
                return '';
            case 'city':
                if (!val) return 'City is required.';
                if (val.length < 2) return 'City must be at least 2 characters.';
                return '';
            case 'postalCode':
                if (!val) return 'Postal code is required.';
                if (!/^[0-9A-Za-z\s-]{3,10}$/.test(val)) return 'Please enter a valid postal code.';
                return '';
            case 'phone':
                if (!val) return 'Phone number is required.';
                const cleanedPhone = val.replace(/[\s\-()]/g, '');
                if (!/^(?:0\d{9}|(?:\+94|94)7[0-9]{8}|07[0-9]{8})$/.test(cleanedPhone)) {
                    return 'Please enter a valid 10-digit Sri Lankan phone number (e.g. 077 123 4567 or +94 77 123 4567).';
                }
                return '';
            default:
                return '';
        }
    };

    const validateForm = () => {
        const fields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'phone'];
        const newErrors = {};
        let isValid = true;

        fields.forEach(field => {
            const error = validateField(field, data[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setFormErrors(newErrors);
        return isValid;
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        setFormErrors({});
        // Open the payment modal instead of directly submitting
        setIsModalOpen(true);
    };

    const handlePay = () => {
        if (data.payment_method === 'card') {
            const holderVal = validateCardHolder(data.card_holder);
            const cardVal = validateCardNumber(data.card_number);
            const dateVal = validateExpiryDate(data.valid_date);
            const cvvVal = validateCvv(data.cvv, cardVal.brand);

            const newErrors = {};
            if (!holderVal.isValid) newErrors.card_holder = holderVal.error;
            if (!cardVal.isValid) newErrors.card_number = cardVal.error;
            if (!dateVal.isValid) newErrors.valid_date = dateVal.error;
            if (!cvvVal.isValid) newErrors.cvv = cvvVal.error;

            setCardErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                return;
            }
        }

        post('/checkout/process', {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
            }
        });
    };

    return (
        <>
            <Head title="Secure Checkout - Handcrafted Treasures" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link href={`/crafts/item/${liveProduct?.id}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-royalMaroon-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Item
                        </Link>
                    </div>

                    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
                        
                        {/* Top Section: My Cart */}
                        <div className="w-full">
                            <div className="bg-white rounded-md shadow-sm border border-slate-100 p-6">
                                {/* Header */}
                                <div className="flex items-center justify-center mb-6 pb-4 border-b border-slate-50">
                                    <h2 className="text-base font-medium text-slate-800">My Cart</h2>
                                </div>
                                
                                {/* Item Details */}
                                {data.quantity > 0 ? (
                                    <div className="flex gap-4 p-3 rounded-lg border border-[#F25C2C] border-opacity-40 mb-10 relative bg-white">
                                        <div className="w-16 h-16 bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                                            <img src={liveProduct?.image} alt={liveProduct?.title} className="w-full h-full object-cover mix-blend-screen" />
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <h3 className="font-medium text-slate-800 text-[13px] leading-tight">{liveProduct?.title}</h3>
                                            <p className="text-[10px] text-slate-500 mt-1">High - Quality Craft for your home</p>
                                            <p className="font-bold text-slate-900 text-[14px] mt-2"><PriceDisplay amount={numericPrice * data.quantity} /></p>
                                        </div>
                                        {/* Right controls */}
                                        <div className="flex flex-col items-end justify-between">
                                            <div className="flex items-center gap-2 mt-1">
                                                <button type="button" onClick={() => setData('quantity', Math.max(1, data.quantity - 1))} className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors">
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-[13px] font-medium w-4 text-center border border-orange-200 rounded px-3 py-0.5 text-[#F25C2C] bg-orange-50">{data.quantity}</span>
                                                <button type="button" onClick={() => setData('quantity', data.quantity + 1)} className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors">
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button type="button" onClick={() => setData('quantity', 0)} className="text-[#F25C2C] hover:text-red-600 mt-3 mr-1 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-300 rounded-lg mb-10 bg-slate-50">
                                        <p className="text-slate-500 mb-4">Your cart is empty.</p>
                                        <button type="button" onClick={() => setData('quantity', 1)} className="text-sm font-medium text-[#F25C2C] hover:underline">
                                            Undo
                                        </button>
                                    </div>
                                )}

                                {/* Cost Breakdown */}
                                <div className="space-y-3 text-[13px] text-slate-600 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-slate-900"><PriceDisplay amount={subtotal} /></span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-slate-500">Estimate</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center text-sm font-bold text-slate-900 mb-4 pt-4 border-t border-slate-100">
                                    <span>Total</span>
                                    <span><PriceDisplay amount={total} /></span>
                                </div>

                                {/* Proceed Button */}
                                <button type="button" onClick={() => document.getElementById('checkout-form').scrollIntoView({ behavior: 'smooth' })} disabled={data.quantity === 0} className="w-full bg-[#F25C2C] hover:bg-[#E04B1A] text-white text-[15px] font-medium py-3 rounded shadow-sm text-center transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>

                        {/* Bottom Section: Forms */}
                        <div className="w-full">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <h1 className="text-2xl font-display font-bold text-slate-900 mb-6">Secure Checkout</h1>
                                
                                <form id="checkout-form" onSubmit={handleConfirm} className="space-y-8">
                                    {/* Contact Info */}
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h2>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.email ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                value={data.email}
                                                onChange={e => {
                                                    setData('email', e.target.value);
                                                    if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                                                }}
                                                onBlur={e => {
                                                    const err = validateField('email', e.target.value);
                                                    if (err) setFormErrors(prev => ({ ...prev, email: err }));
                                                }}
                                                required
                                            />
                                            {formErrors.email && (
                                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                                    {formErrors.email}
                                                </p>
                                            )}
                                        </div>
                                    </section>

                                    {/* Shipping Address */}
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Shipping Address</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First name</label>
                                                <input 
                                                    type="text" 
                                                    id="firstName" 
                                                    value={data.firstName} 
                                                    onChange={e => {
                                                        setData('firstName', e.target.value);
                                                        if (formErrors.firstName) setFormErrors(prev => ({ ...prev, firstName: '' }));
                                                    }} 
                                                    onBlur={e => {
                                                        const err = validateField('firstName', e.target.value);
                                                        if (err) setFormErrors(prev => ({ ...prev, firstName: err }));
                                                    }}
                                                    className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.firstName ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                    required 
                                                />
                                                {formErrors.firstName && (
                                                    <p className="mt-1 text-xs text-rose-500 font-medium">
                                                        {formErrors.firstName}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last name</label>
                                                <input 
                                                    type="text" 
                                                    id="lastName" 
                                                    value={data.lastName} 
                                                    onChange={e => {
                                                        setData('lastName', e.target.value);
                                                        if (formErrors.lastName) setFormErrors(prev => ({ ...prev, lastName: '' }));
                                                    }} 
                                                    onBlur={e => {
                                                        const err = validateField('lastName', e.target.value);
                                                        if (err) setFormErrors(prev => ({ ...prev, lastName: err }));
                                                    }}
                                                    className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.lastName ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                    required 
                                                />
                                                {formErrors.lastName && (
                                                    <p className="mt-1 text-xs text-rose-500 font-medium">
                                                        {formErrors.lastName}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Street address</label>
                                            <input 
                                                type="text" 
                                                id="address" 
                                                value={data.address} 
                                                onChange={e => {
                                                    setData('address', e.target.value);
                                                    if (formErrors.address) setFormErrors(prev => ({ ...prev, address: '' }));
                                                }} 
                                                onBlur={e => {
                                                    const err = validateField('address', e.target.value);
                                                    if (err) setFormErrors(prev => ({ ...prev, address: err }));
                                                }}
                                                className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.address ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                required 
                                            />
                                            {formErrors.address && (
                                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                                    {formErrors.address}
                                                </p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                                <input 
                                                    type="text" 
                                                    id="city" 
                                                    value={data.city} 
                                                    onChange={e => {
                                                        setData('city', e.target.value);
                                                        if (formErrors.city) setFormErrors(prev => ({ ...prev, city: '' }));
                                                    }} 
                                                    onBlur={e => {
                                                        const err = validateField('city', e.target.value);
                                                        if (err) setFormErrors(prev => ({ ...prev, city: err }));
                                                    }}
                                                    className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.city ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                    required 
                                                />
                                                {formErrors.city && (
                                                    <p className="mt-1 text-xs text-rose-500 font-medium">
                                                        {formErrors.city}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700 mb-1">Postal code</label>
                                                <input 
                                                    type="text" 
                                                    id="postalCode" 
                                                    value={data.postalCode} 
                                                    onChange={e => {
                                                        setData('postalCode', e.target.value);
                                                        if (formErrors.postalCode) setFormErrors(prev => ({ ...prev, postalCode: '' }));
                                                    }} 
                                                    onBlur={e => {
                                                        const err = validateField('postalCode', e.target.value);
                                                        if (err) setFormErrors(prev => ({ ...prev, postalCode: err }));
                                                    }}
                                                    className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.postalCode ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                    required 
                                                />
                                                {formErrors.postalCode && (
                                                    <p className="mt-1 text-xs text-rose-500 font-medium">
                                                        {formErrors.postalCode}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone number <span className="text-rose-500">*</span></label>
                                            <input 
                                                type="tel" 
                                                id="phone" 
                                                value={data.phone} 
                                                placeholder="e.g. 077 123 4567 or +94 77 123 4567"
                                                onChange={e => {
                                                    setData('phone', e.target.value);
                                                    if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' }));
                                                }} 
                                                onBlur={e => {
                                                    const err = validateField('phone', e.target.value);
                                                    if (err) setFormErrors(prev => ({ ...prev, phone: err }));
                                                }}
                                                className={`w-full rounded-lg shadow-sm transition-colors ${formErrors.phone ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:border-royalMaroon-500 focus:ring-royalMaroon-500'}`} 
                                                required 
                                            />
                                            {formErrors.phone && (
                                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                                    {formErrors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </section>

                                    {/* Submit */}
                                    <div className="pt-4 border-t border-slate-100">
                                        <button 
                                            type="submit" 
                                            className="w-full bg-craft-brown hover:bg-craft-brown-dark text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            disabled={processing}
                                        >
                                            <Lock className="w-4 h-4" />
                                            Confirm Details
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </main>
                
                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>

            {/* Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity overflow-y-auto">
                    <div className="bg-[#f5f5f5] rounded-xl shadow-2xl w-full max-w-[500px] relative animate-in fade-in zoom-in duration-200 my-8">
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-100 text-red-600 px-4 py-3 text-sm font-medium border-b border-red-200">
                                Please fix the validation errors: {Object.values(errors)[0]}
                            </div>
                        )}
                        
                        <div className="p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 font-sans">Payment Method</h2>
                            
                            <div className="p-3 sm:p-4 rounded-lg space-y-3" style={{backgroundColor: '#6F4E37'}}>
                                {/* KOKO Option */}
                                <div className={`bg-white rounded-md p-4 sm:p-5 flex flex-col cursor-pointer shadow-sm transition-all ${data.payment_method === 'koko' ? 'ring-2 ring-craft-brown border-transparent' : ''}`} onClick={() => setData('payment_method', 'koko')}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <input type="radio" checked={data.payment_method === 'koko'} onChange={() => setData('payment_method', 'koko')} className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                            <div>
                                                <span className="font-semibold text-slate-800 text-[15px] block">KOKO - Buy Now, Pay Later</span>
                                                <span className="text-xs text-slate-500">Split into 3 interest-free installments</span>
                                            </div>
                                        </div>
                                        <div className="font-extrabold text-xl tracking-wider px-2 py-0.5 rounded bg-[#fdf5f0] text-[#FF4C00] border border-[#ff4c00]/30 shadow-xs">
                                            KOKO
                                        </div>
                                    </div>

                                    {data.payment_method === 'koko' && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 text-left animate-in fade-in duration-200" onClick={e => e.stopPropagation()}>
                                            <div className="bg-[#FFF9F5] border border-[#FFE4D6] rounded-xl p-4 mb-4">
                                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#FFE4D6]">
                                                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Installment Plan</span>
                                                    <span className="text-xs font-bold text-[#FF4C00]">0% Interest</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-center">
                                                    <div className="bg-white p-2.5 rounded-lg border border-[#FFD8C2] shadow-xs">
                                                        <div className="text-[11px] font-semibold text-slate-500">Today</div>
                                                        <div className="text-xs font-bold text-slate-900 mt-0.5"><PriceDisplay amount={total / 3} /></div>
                                                    </div>
                                                    <div className="bg-white p-2.5 rounded-lg border border-[#FFD8C2] shadow-xs">
                                                        <div className="text-[11px] font-semibold text-slate-500">In 30 Days</div>
                                                        <div className="text-xs font-bold text-slate-900 mt-0.5"><PriceDisplay amount={total / 3} /></div>
                                                    </div>
                                                    <div className="bg-white p-2.5 rounded-lg border border-[#FFD8C2] shadow-xs">
                                                        <div className="text-[11px] font-semibold text-slate-500">In 60 Days</div>
                                                        <div className="text-xs font-bold text-slate-900 mt-0.5"><PriceDisplay amount={total / 3} /></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-2">
                                                <div className="flex items-start gap-2 text-xs text-slate-600">
                                                    <div className="w-5 h-5 rounded-full bg-[#FF4C00]/10 text-[#FF4C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">1</div>
                                                    <p>Click <strong className="text-slate-800">Confirm & Proceed to Koko</strong> below to initiate the secure portal.</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-xs text-slate-600">
                                                    <div className="w-5 h-5 rounded-full bg-[#FF4C00]/10 text-[#FF4C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">2</div>
                                                    <p>You will authenticate with your registered phone number <strong className="text-slate-800">{data.phone || 'provided at checkout'}</strong> via OTP.</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-xs text-slate-600">
                                                    <div className="w-5 h-5 rounded-full bg-[#FF4C00]/10 text-[#FF4C00] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">3</div>
                                                    <p>Approve the first payment of <strong className="text-slate-900"><PriceDisplay amount={total / 3} /></strong> to complete your order instantly.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Credit/Debit Card Option */}
                                <div className={`bg-white rounded-md p-5 shadow-sm cursor-pointer ${data.payment_method === 'card' ? 'ring-2 ring-craft-brown border-transparent' : ''}`} onClick={() => setData('payment_method', 'card')}>
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-4">
                                            <input type="radio" checked={data.payment_method === 'card'} onChange={() => setData('payment_method', 'card')} className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                            <span className="font-medium text-slate-800 text-[15px]">Credit/ Debit Card</span>
                                        </div>
                                        <CreditCard className="w-7 h-7" style={{color: '#3b82f6'}} strokeWidth={1.5} />
                                    </div>
                                    
                                    {data.payment_method === 'card' && (
                                        <>
                                            <div className="mb-6 pl-9">
                                                <p className="text-[13px] text-slate-500 mb-2">We accept</p>
                                                <div className="flex gap-2">
                                                    {/* Visa Badge */}
                                                    <div className="border border-slate-200 rounded px-2.5 py-1 font-bold italic text-[11px] flex items-center justify-center h-7" style={{color: '#1d4ed8'}}>VISA</div>
                                                    {/* Mastercard Badge */}
                                                    <div className="border border-slate-200 rounded px-2.5 py-1 flex items-center justify-center h-7">
                                                        <div className="w-3.5 h-3.5 rounded-full opacity-90" style={{backgroundColor: '#ef4444'}}></div>
                                                        <div className="w-3.5 h-3.5 rounded-full opacity-90 -ml-1.5" style={{backgroundColor: '#facc15', mixBlendMode: 'multiply'}}></div>
                                                    </div>
                                                    {/* Amex Badge */}
                                                    <div className="border border-slate-200 rounded px-2.5 py-1 text-white font-bold text-[10px] flex items-center justify-center h-7 tracking-wider" style={{backgroundColor: '#2563eb'}}>AMEX</div>
                                                    {/* Maestro Badge */}
                                                    <div className="border border-slate-200 rounded px-2.5 py-1 flex items-center justify-center h-7">
                                                        <div className="w-3.5 h-3.5 rounded-full opacity-90" style={{backgroundColor: '#3b82f6'}}></div>
                                                        <div className="w-3.5 h-3.5 rounded-full opacity-90 -ml-1.5" style={{backgroundColor: '#ef4444', mixBlendMode: 'multiply'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Holder</label>
                                                    <input 
                                                        type="text" 
                                                        value={data.card_holder} 
                                                        onChange={e => {
                                                            setData('card_holder', e.target.value);
                                                            if (cardErrors.card_holder) setCardErrors(prev => ({ ...prev, card_holder: '' }));
                                                        }} 
                                                        className={`w-full rounded-md shadow-sm text-sm py-2 text-slate-900 ${cardErrors.card_holder ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'}`} 
                                                        style={{outlineColor: '#6F4E37'}} 
                                                    />
                                                    {cardErrors.card_holder && <div className="text-rose-500 text-xs mt-1 font-medium">{cardErrors.card_holder}</div>}
                                                    {errors.card_holder && <div className="text-red-500 text-xs mt-1">{errors.card_holder}</div>}
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Number</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                            <CreditCard className="h-4 w-4 text-slate-400" />
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            value={data.card_number} 
                                                            onChange={e => {
                                                                let val = e.target.value.replace(/\D/g, '');
                                                                val = val.replace(/(.{4})/g, '$1 ').trim();
                                                                setData('card_number', val.substring(0, 19));
                                                                if (cardErrors.card_number) setCardErrors(prev => ({ ...prev, card_number: '' }));
                                                            }} 
                                                            placeholder="0000 0000 0000 0000" 
                                                            className={`w-full rounded-md shadow-sm text-sm py-2 font-mono text-slate-900 ${cardErrors.card_number ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'}`} 
                                                            style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} 
                                                            maxLength="19"
                                                        />
                                                    </div>
                                                    {cardErrors.card_number && <div className="text-rose-500 text-xs mt-1 font-medium">{cardErrors.card_number}</div>}
                                                    {errors.card_number && <div className="text-red-500 text-xs mt-1">{errors.card_number}</div>}
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Valid Date</label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                            <Calendar className="h-4 w-4 text-slate-400" />
                                                        </div>
                                                        <input 
                                                            type="text" 
                                                            value={data.valid_date} 
                                                            onChange={e => {
                                                                let val = e.target.value.replace(/\D/g, '');
                                                                if (val.length > 2) {
                                                                    val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                                                }
                                                                setData('valid_date', val);
                                                                if (cardErrors.valid_date) setCardErrors(prev => ({ ...prev, valid_date: '' }));
                                                            }} 
                                                            placeholder="MM/YY" 
                                                            className={`w-full rounded-md shadow-sm text-sm py-2 font-mono text-slate-900 ${cardErrors.valid_date ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'}`} 
                                                            style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} 
                                                            maxLength="5"
                                                        />
                                                    </div>
                                                    {cardErrors.valid_date && <div className="text-rose-500 text-xs mt-1 font-medium">{cardErrors.valid_date}</div>}
                                                    {errors.valid_date && <div className="text-red-500 text-xs mt-1">{errors.valid_date}</div>}
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">CVV</label>
                                                    <input 
                                                        type="password" 
                                                        value={data.cvv} 
                                                        onChange={e => {
                                                            setData('cvv', e.target.value);
                                                            if (cardErrors.cvv) setCardErrors(prev => ({ ...prev, cvv: '' }));
                                                        }} 
                                                        placeholder="XXX" 
                                                        maxLength="4"
                                                        className={`w-full rounded-md shadow-sm text-sm py-2 font-mono text-slate-900 ${cardErrors.cvv ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'}`} 
                                                        style={{outlineColor: '#6F4E37'}} 
                                                    />
                                                    {cardErrors.cvv && <div className="text-rose-500 text-xs mt-1 font-medium">{cardErrors.cvv}</div>}
                                                    {errors.cvv && <div className="text-red-500 text-xs mt-1">{errors.cvv}</div>}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                        
                                        <div className="pt-4 mt-4">
                                            <button 
                                                onClick={handlePay}
                                                disabled={processing}
                                                className="w-full text-white font-medium py-3 rounded-lg shadow-sm transition-all text-sm hover:opacity-95 active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
                                                style={{backgroundColor: data.payment_method === 'koko' ? '#FF4C00' : '#6F4E37'}}
                                            >
                                                <Lock className="w-4 h-4" />
                                                {data.payment_method === 'koko' ? 'Confirm & Proceed to KOKO' : 'Confirm & Pay with Card'}
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900 bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center text-center transform transition-all scale-100">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirmed!</h2>
                        <p className="text-slate-600 mb-8">{flash?.success}</p>
                        <button 
                            onClick={() => setShowSuccessPopup(false)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
