import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { ShieldCheck, Truck, ArrowLeft, CreditCard, Lock, MoreHorizontal, Plus, Minus, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Checkout({ auth, itemId, quantity, laravelVersion, phpVersion }) {
    // Determine product based on itemId.
    // Ideally this comes from a database via the controller, but we'll use a local mock for UI purposes.
    const productList = {
        401: { title: "Traditional Wooden Mask", price: 4500.00, image: "/images/woodcraft.png" },
        402: { title: "Carved Wooden Table", price: 15000.00, image: "/images/woodcraft.png" },
        105: { title: "Stone Carved Elephant", price: 6500.00, image: "/images/crafts/stone_elephant.png" },
        104: { title: "Lotus Pillar Capital", price: 8000.00, image: "/images/crafts/pillar.png" },
        201: { title: "Traditional Pan Padura", price: 4500.00, image: "/images/crafts/reed_mat.png" }
    };
    
    // Default to Wooden Mask if not found
    const product = productList[itemId] || productList[401];
    const qty = parseInt(quantity) || 1;
    
    const subtotal = product.price * qty;
    const shipping = 500.00;
    const total = subtotal + shipping;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const handleConfirm = (e) => {
        e.preventDefault();
        // Open the payment modal instead of directly submitting
        setIsModalOpen(true);
    };

    const handlePay = () => {
        alert('Checkout process initiated! Redirecting to payment gateway...');
        setIsModalOpen(false);
    };

    return (
        <>
            <Head title="Secure Checkout - Handcrafted Treasures" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link href={`/crafts/item/${itemId}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-royalMaroon-900 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Item
                        </Link>
                    </div>

                    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
                        
                        {/* Top Section: My Cart */}
                        <div className="w-full">
                            <div className="bg-white rounded-md shadow-sm border border-slate-100 p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                                    <ArrowLeft className="w-5 h-5 text-[#F25C2C] cursor-pointer" />
                                    <h2 className="text-base font-medium text-slate-800">My Cart</h2>
                                    <MoreHorizontal className="w-5 h-5 text-[#F25C2C] cursor-pointer" />
                                </div>
                                
                                {/* Item Details */}
                                <div className="flex gap-4 p-3 rounded-lg border border-[#F25C2C] border-opacity-40 mb-10 relative bg-white">
                                    <div className="w-16 h-16 bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover mix-blend-screen" />
                                    </div>
                                    <div className="flex flex-col justify-center flex-1">
                                        <h3 className="font-medium text-slate-800 text-[13px] leading-tight">{product.title}</h3>
                                        <p className="text-[10px] text-slate-500 mt-1">High - Quality Craft for your home</p>
                                        <p className="font-bold text-slate-900 text-[14px] mt-2">Rs. {(product.price * qty).toLocaleString('en-US')}</p>
                                    </div>
                                    {/* Right controls */}
                                    <div className="flex flex-col items-end justify-between">
                                        <div className="flex items-center gap-2 mt-1">
                                            <button className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                            <span className="text-[13px] font-medium w-4 text-center border border-orange-200 rounded px-3 py-0.5 text-[#F25C2C] bg-orange-50">{qty}</span>
                                            <button className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button className="text-[#F25C2C] hover:text-red-600 mt-3 mr-1 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Cost Breakdown */}
                                <div className="space-y-3 text-[13px] text-slate-600 mb-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-slate-900">Rs. {subtotal.toLocaleString('en-US')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-slate-500">Estimate</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center text-sm font-bold text-slate-900 mb-4 pt-4 border-t border-slate-100">
                                    <span>Total</span>
                                    <span>Rs. {total.toLocaleString('en-US')}</span>
                                </div>

                                {/* Proceed Button */}
                                <button className="w-full bg-[#F25C2C] hover:bg-[#E04B1A] text-white text-[15px] font-medium py-3 rounded shadow-sm text-center transition-all">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>

                        {/* Bottom Section: Forms */}
                        <div className="w-full">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <h1 className="text-2xl font-display font-bold text-slate-900 mb-6">Secure Checkout</h1>
                                
                                <form onSubmit={handleConfirm} className="space-y-8">
                                    {/* Contact Info */}
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h2>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" 
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </section>

                                    {/* Shipping Address */}
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Shipping Address</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First name</label>
                                                <input type="text" id="firstName" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" required />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last name</label>
                                                <input type="text" id="lastName" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" required />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Street address</label>
                                            <input type="text" id="address" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" required />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                                <input type="text" id="city" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" required />
                                            </div>
                                            <div>
                                                <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700 mb-1">Postal code</label>
                                                <input type="text" id="postalCode" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
                                            <input type="tel" id="phone" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-royalMaroon-500 focus:ring-royalMaroon-500" required />
                                        </div>
                                    </section>

                                    {/* Submit */}
                                    <div className="pt-4 border-t border-slate-100">
                                        <button 
                                            type="submit" 
                                            className="w-full bg-craft-brown hover:bg-craft-brown-dark text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
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
                        
                        <div className="p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 font-sans">Payment Method</h2>
                            
                            <div className="p-3 sm:p-4 rounded-lg space-y-3" style={{backgroundColor: '#6F4E37'}}>
                                {/* KOKO Option */}
                                <div className="bg-white rounded-md p-4 flex items-center justify-between cursor-pointer shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <input type="radio" name="payment_method" className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                        <span className="font-medium text-slate-800 text-[15px]">KOKO</span>
                                    </div>
                                    <div className="font-bold text-lg tracking-wider" style={{WebkitTextStroke: "1px #6F4E37", color: "transparent"}}>KOKO</div>
                                </div>
                                
                                {/* Credit/Debit Card Option */}
                                <div className="bg-white rounded-md p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-4">
                                            <input type="radio" name="payment_method" defaultChecked className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                            <span className="font-medium text-slate-800 text-[15px]">Credit/ Debit Card</span>
                                        </div>
                                        <CreditCard className="w-7 h-7" style={{color: '#3b82f6'}} strokeWidth={1.5} />
                                    </div>
                                    
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
                                            <input type="text" className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2" style={{outlineColor: '#6F4E37'}} />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono" style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Valid Date</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <input type="text" placeholder="MM/YY" className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono" style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">CVV</label>
                                            <input type="text" placeholder="XXX" className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono" style={{outlineColor: '#6F4E37'}} />
                                        </div>
                                        
                                        <div className="pt-2">
                                            <button 
                                                onClick={handlePay}
                                                className="w-full text-white font-medium py-2.5 rounded shadow-sm transition-all text-sm hover:opacity-90"
                                                style={{backgroundColor: '#6F4E37'}}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
