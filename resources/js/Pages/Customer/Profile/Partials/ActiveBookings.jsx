import React from 'react';
import { CalendarDays, MapPin, Download, MessageCircle } from 'lucide-react';

export default function ActiveBookings({ bookings, headless = false }) {
    
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="space-y-6">
            {!headless && (
                <h3 className="text-2xl font-bold text-royalHeritage-textIvory font-display mb-4">My Bookings &amp; Trips</h3>
            )}
            
            {bookings.length === 0 ? (
                <div className="rounded-2xl shadow-xl border border-[#8B6914]/40 p-12 text-center" style={{ background: '#5C1020' }}>
                    <CalendarDays className="w-12 h-12 text-royalHeritage-goldAccent mx-auto mb-4 opacity-50" />
                    <h4 className="text-xl font-bold text-royalHeritage-textIvory font-display mb-2">No Upcoming Trips</h4>
                    <p className="text-royalHeritage-textWarmWhite opacity-80 mb-8 max-w-md mx-auto">
                        You don't have any active reservations at the moment. Explore our curated list of secret places to start planning your next adventure in Sri Lanka.
                    </p>
                    <a href="/places" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#2A040A] font-extrabold rounded-full hover:brightness-110 transition-all shadow-lg">
                        Explore Destinations
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map(booking => (
                        <div key={booking.id} className="rounded-2xl shadow-lg border border-[#8B6914]/40 overflow-hidden flex flex-col hover:shadow-2xl transition-shadow" style={{ background: '#5C1020' }}>
                            
                            {/* Image Header */}
                            <div className="h-48 w-full relative group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img 
                                    src={booking.property_image} 
                                    alt={booking.property_name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                                        booking.status === 'Upcoming' ? 'bg-amber-900/80 text-amber-300 border border-amber-500/50 backdrop-blur-md' :
                                        booking.status === 'Active' ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50 backdrop-blur-md' :
                                        booking.status === 'Completed' ? 'bg-slate-800/80 text-royalHeritage-textIvory border border-slate-500/50 backdrop-blur-md' :
                                        booking.status === 'Cancelled' ? 'bg-red-900/80 text-red-300 border border-red-500/50 backdrop-blur-md' :
                                        'bg-royalHeritage-card/80 text-royalHeritage-textWarmWhite border border-royalHeritage-borderGold backdrop-blur-md'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Details */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h4 className="text-xl font-bold text-royalHeritage-textIvory font-display mb-1">{booking.property_name}</h4>
                                <div className="text-sm text-royalHeritage-textWarmWhite opacity-70 mb-5 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1 text-royalHeritage-goldAccentBright" /> Sri Lanka
                                    <span className="mx-3 text-royalHeritage-borderGold">•</span>
                                    <span className="font-mono text-xs opacity-80">Ref: {booking.booking_reference}</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-8 p-4 rounded-xl border border-[#8B6914]/40 shadow-inner" style={{ background: '#35060D' }}>
                                    <div>
                                        <p className="text-xs text-royalHeritage-goldAccent uppercase font-bold tracking-wider mb-1">Check-in</p>
                                        <p className="text-sm font-medium text-royalHeritage-textIvory">{formatDate(booking.check_in)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-royalHeritage-goldAccent uppercase font-bold tracking-wider mb-1">Check-out</p>
                                        <p className="text-sm font-medium text-royalHeritage-textIvory">{formatDate(booking.check_out)}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto grid grid-cols-2 gap-4">
                                    <a 
                                        href={`https://wa.me/${booking.host_whatsapp.replace(/[^0-9]/g, '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-4 py-3 bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/60 hover:border-emerald-500/60 font-bold rounded-xl transition-colors text-sm"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact Host
                                    </a>
                                    <button className="flex items-center justify-center px-4 py-3 bg-royalHeritage-card text-royalHeritage-textWarmWhite border border-royalHeritage-borderGold hover:bg-royalHeritage-canvas hover:text-royalHeritage-textIvory font-bold rounded-xl transition-colors text-sm shadow-sm">
                                        <Download className="w-4 h-4 mr-2 text-royalHeritage-goldAccent" />
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
