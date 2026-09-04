import React from 'react';
import { CalendarDays, MapPin, Download, MessageCircle } from 'lucide-react';

export default function ActiveBookings({ bookings }) {
    
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-sansDisplay mb-4">My Bookings & Trips</h3>
            
            {bookings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">No Upcoming Trips</h4>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                        You don't have any active reservations at the moment. Explore our curated list of secret places to start planning your next adventure in Sri Lanka.
                    </p>
                    <a href="/places" className="inline-flex items-center px-6 py-3 bg-forestGreen-700 text-white font-bold rounded-lg hover:bg-forestGreen-800 transition-colors">
                        Explore Destinations
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                            
                            {/* Image Header */}
                            <div className="h-40 w-full relative">
                                <img 
                                    src={booking.property_image} 
                                    alt={booking.property_name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                                        booking.status === 'Upcoming' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                        booking.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                        'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Details */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h4 className="text-lg font-bold text-slate-900 mb-1">{booking.property_name}</h4>
                                <div className="text-sm text-slate-500 mb-4 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1 text-cinnamon-500" /> Sri Lanka
                                    <span className="mx-2">•</span>
                                    <span className="font-mono text-xs">Ref: {booking.booking_reference}</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Check-in</p>
                                        <p className="text-sm font-medium text-slate-900">{formatDate(booking.check_in)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Check-out</p>
                                        <p className="text-sm font-medium text-slate-900">{formatDate(booking.check_out)}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto grid grid-cols-2 gap-3">
                                    <a 
                                        href={`https://wa.me/${booking.host_whatsapp.replace(/[^0-9]/g, '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-4 py-2.5 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 font-bold rounded-lg transition-colors text-sm"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact Host
                                    </a>
                                    <button className="flex items-center justify-center px-4 py-2.5 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 font-bold rounded-lg transition-colors text-sm shadow-sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Voucher
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
