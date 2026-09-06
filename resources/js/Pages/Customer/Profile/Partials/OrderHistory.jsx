import React from 'react';
import { Package, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function OrderHistory({ orders, headless = false }) {
    
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getStatusIndex = (status) => {
        const statuses = ['Order Placed', 'Packed', 'Shipped', 'Delivered'];
        return statuses.indexOf(status);
    };

    return (
        <div className="space-y-6">
            {!headless && (
                <h3 className="text-2xl font-bold text-royalHeritage-textIvory font-display mb-4">My Orders &amp; Deliveries</h3>
            )}
            
            {orders.length === 0 ? (
                <div className="rounded-2xl shadow-xl border border-[#8B6914]/40 p-12 text-center" style={{ background: '#5C1020' }}>
                    <ShoppingBag className="w-12 h-12 text-royalHeritage-goldAccent mx-auto mb-4 opacity-50" />
                    <h4 className="text-xl font-bold text-royalHeritage-textIvory font-display mb-2">No Order History</h4>
                    <p className="text-royalHeritage-textWarmWhite opacity-80 mb-8 max-w-md mx-auto">
                        You haven't purchased any local handicrafts or products yet. Support local artisans by browsing our catalog.
                    </p>
                    <a href="/catalog" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] font-extrabold rounded-full hover:brightness-110 transition-all shadow-lg">
                        Browse Catalog
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => {
                        const statusIdx = getStatusIndex(order.status);
                        
                        return (
                            <div key={order.id} className="rounded-2xl shadow-lg border border-[#8B6914]/40 p-6 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition-shadow" style={{ background: '#5C1020' }}>
                                
                                {/* Image & Basic Info */}
                                <div className="flex gap-4 md:w-1/3">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-royalHeritage-borderGold shadow-inner">
                                        <img src={order.item_image} alt={order.item_name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-royalHeritage-textIvory font-display line-clamp-2 mb-1">{order.item_name}</h4>
                                        <p className="text-base font-bold text-royalHeritage-goldAccentBright mb-1">
                                            {order.currency} {order.total_amount.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-royalHeritage-textWarmWhite opacity-70">
                                            Ordered on {formatDate(order.order_date)}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Tracker */}
                                <div className="flex-1 border-t md:border-t-0 md:border-l border-royalHeritage-borderGold/30 pt-6 md:pt-0 md:pl-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h5 className="text-sm font-bold text-royalHeritage-textIvory uppercase tracking-wider">Delivery Status</h5>
                                        {order.tracking_number && (
                                            <span className="text-xs font-mono bg-royalHeritage-card border border-royalHeritage-borderGold text-royalHeritage-goldAccent px-3 py-1 rounded-full shadow-sm">
                                                Track: {order.tracking_number}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Progress Bar Container */}
                                    <div className="relative pt-2">
                                        {/* Connecting Line */}
                                        <div className="absolute top-5 left-[10%] right-[10%] h-1 rounded-full -z-10 shadow-inner" style={{ background: '#35060D' }}></div>
                                        <div 
                                            className="absolute top-5 left-[10%] h-1 bg-gradient-to-r from-royalHeritage-goldAccent to-royalHeritage-goldAccentBright rounded-full -z-10 transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                            style={{ width: `${(statusIdx / 3) * 80}%` }}
                                        ></div>

                                        <div className="flex justify-between relative z-10">
                                            {/* Step 1: Placed */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${statusIdx >= 0 ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-royalHeritage-card border border-royalHeritage-borderGold text-royalHeritage-textWarmWhite opacity-50'}`}>
                                                    <ShoppingBag className="w-4 h-4" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${statusIdx >= 0 ? 'text-royalHeritage-goldAccentBright' : 'text-royalHeritage-textWarmWhite opacity-50'}`}>Placed</span>
                                            </div>

                                            {/* Step 2: Packed */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${statusIdx >= 1 ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-royalHeritage-card border border-royalHeritage-borderGold text-royalHeritage-textWarmWhite opacity-50'}`}>
                                                    <Package className="w-4 h-4" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${statusIdx >= 1 ? 'text-royalHeritage-goldAccentBright' : 'text-royalHeritage-textWarmWhite opacity-50'}`}>Packed</span>
                                            </div>

                                            {/* Step 3: Shipped */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${statusIdx >= 2 ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-royalHeritage-card border border-royalHeritage-borderGold text-royalHeritage-textWarmWhite opacity-50'}`}>
                                                    <Truck className="w-4 h-4" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${statusIdx >= 2 ? 'text-royalHeritage-goldAccentBright' : 'text-royalHeritage-textWarmWhite opacity-50'}`}>Shipped</span>
                                            </div>

                                            {/* Step 4: Delivered */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${statusIdx >= 3 ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-royalHeritage-card border border-royalHeritage-borderGold text-royalHeritage-textWarmWhite opacity-50'}`}>
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${statusIdx >= 3 ? 'text-emerald-400' : 'text-royalHeritage-textWarmWhite opacity-50'}`}>Delivered</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
