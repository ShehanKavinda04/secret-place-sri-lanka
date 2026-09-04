import React from 'react';
import { Package, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function OrderHistory({ orders }) {
    
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
            <h3 className="text-xl font-bold text-slate-900 font-sansDisplay mb-4">My Orders & Deliveries</h3>
            
            {orders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">No Order History</h4>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                        You haven't purchased any local handicrafts or products yet. Support local artisans by browsing our catalog.
                    </p>
                    <a href="/catalog" className="inline-flex items-center px-6 py-3 bg-forestGreen-700 text-white font-bold rounded-lg hover:bg-forestGreen-800 transition-colors">
                        Browse Catalog
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => {
                        const statusIdx = getStatusIndex(order.status);
                        
                        return (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6">
                                
                                {/* Image & Basic Info */}
                                <div className="flex gap-4 md:w-1/3">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                                        <img src={order.item_image} alt={order.item_name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 line-clamp-2 mb-1">{order.item_name}</h4>
                                        <p className="text-sm font-medium text-slate-900 mb-1">
                                            {order.currency} {order.total_amount.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Ordered on {formatDate(order.order_date)}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Tracker */}
                                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-sm font-bold text-slate-900">Delivery Status</h5>
                                        {order.tracking_number && (
                                            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                Tracking: {order.tracking_number}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Progress Bar Container */}
                                    <div className="relative pt-2">
                                        {/* Connecting Line */}
                                        <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10"></div>
                                        <div 
                                            className="absolute top-5 left-[10%] h-0.5 bg-forestGreen-500 -z-10 transition-all duration-500"
                                            style={{ width: `${(statusIdx / 3) * 80}%` }}
                                        ></div>

                                        <div className="flex justify-between relative z-10">
                                            {/* Step 1: Placed */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${statusIdx >= 0 ? 'bg-forestGreen-500 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                                                    <ShoppingBag className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${statusIdx >= 0 ? 'text-forestGreen-700' : 'text-slate-400'}`}>Placed</span>
                                            </div>

                                            {/* Step 2: Packed */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${statusIdx >= 1 ? 'bg-forestGreen-500 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                                                    <Package className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${statusIdx >= 1 ? 'text-forestGreen-700' : 'text-slate-400'}`}>Packed</span>
                                            </div>

                                            {/* Step 3: Shipped */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${statusIdx >= 2 ? 'bg-forestGreen-500 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                                                    <Truck className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${statusIdx >= 2 ? 'text-forestGreen-700' : 'text-slate-400'}`}>Shipped</span>
                                            </div>

                                            {/* Step 4: Delivered */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${statusIdx >= 3 ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${statusIdx >= 3 ? 'text-emerald-600' : 'text-slate-400'}`}>Delivered</span>
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
