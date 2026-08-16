import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { ShieldCheck, Truck, ArrowLeft, CreditCard, Lock } from 'lucide-react';
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

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Here you would typically process the checkout via Inertia.
        alert('Checkout process initiated! This is a UI demonstration.');
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

                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Left Column: Forms */}
                        <div className="w-full lg:w-3/5 order-2 lg:order-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <h1 className="text-2xl font-display font-bold text-slate-900 mb-6">Secure Checkout</h1>
                                
                                <form onSubmit={submit} className="space-y-8">
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

                                    {/* Payment Method placeholder */}
                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 mb-4">Payment Method</h2>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                                            <div className="flex items-center gap-3 text-slate-700 font-medium mb-3">
                                                <CreditCard className="w-5 h-5" />
                                                Credit / Debit Card
                                            </div>
                                            <p className="text-sm text-slate-500 mb-4">You will be redirected to a secure payment gateway to complete your purchase securely.</p>
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
                                            Pay Rs. {total.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                        </button>
                                        <p className="text-center text-xs text-slate-400 mt-4">Your payment information is encrypted and secure.</p>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="w-full lg:w-2/5 order-1 lg:order-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-6">
                                <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>
                                
                                {/* Item Details */}
                                <div className="flex gap-4 mb-6">
                                    <div className="w-20 h-20 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden shrink-0">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="flex flex-col justify-center flex-1">
                                        <h3 className="font-bold text-slate-800 text-[15px]">{product.title}</h3>
                                        <p className="text-slate-500 text-sm">Qty: {qty}</p>
                                        <p className="font-bold text-slate-900 text-sm mt-1">Rs. {(product.price * qty).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </div>
                                </div>

                                {/* Cost Breakdown */}
                                <div className="space-y-3 text-sm text-slate-600 mb-6 border-t border-slate-100 pt-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-slate-900">Rs. {subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping <span className="text-xs text-slate-400">(Island-wide)</span></span>
                                        <span className="font-medium text-slate-900">Rs. {shipping.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center text-lg font-bold text-slate-900 border-t border-slate-100 pt-6 mb-8">
                                    <span>Total</span>
                                    <span className="text-royalMaroon-950">Rs. {total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-col gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                        <span>30-Day Money Back Guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Truck className="w-5 h-5 text-blue-600 shrink-0" />
                                        <span>Secure Delivery in 3-5 Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
                
                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
