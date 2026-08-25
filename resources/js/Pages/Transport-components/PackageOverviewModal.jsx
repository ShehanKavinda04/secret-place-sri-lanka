import { X, MapPin, Clock, Info, ShieldCheck, Car, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function PackageOverviewModal({ isOpen, onClose, packageData }) {
    const [selectedTransport, setSelectedTransport] = useState('tuk-tuk');

    if (!isOpen || !packageData) return null;

    // Mock itinerary based on the selected package
    const itinerary = packageData.package_id === 'atamasthana-circuit' ? [
        { time: '07:00 AM', title: 'Hotel Pickup', desc: 'Driver arrives at your location' },
        { time: '07:30 AM', title: 'Sri Maha Bodhi', desc: 'Avoid the crowds and morning heat' },
        { time: '09:00 AM', title: 'Ruwanwelisaya', desc: 'Walking distance from Bodhi' },
        { time: '11:00 AM', title: 'Thuparamaya & Abhayagiriya', desc: 'Explore the ancient monasteries' },
        { time: '01:00 PM', title: 'Lunch Break', desc: 'Drop off at recommended local restaurant' },
        { time: '02:30 PM', title: 'Remaining Sites', desc: 'Jetavanaramaya, Mirisawetiya, Lankarama' },
        { time: '05:30 PM', title: 'Return', desc: 'Drop off at hotel' }
    ] : [
        { time: '10:00 PM', title: 'Hotel Pickup', desc: 'Late night departure from Nuwara Eliya/Kandy' },
        { time: '01:00 AM', title: 'Arrive at Nallathanniya', desc: 'Base camp drop-off' },
        { time: '02:00 AM', title: 'Begin Climb', desc: 'Driver waits in the vehicle' },
        { time: '09:00 AM', title: 'Return to Base', desc: 'Meet driver for departure' },
        { time: '12:00 PM', title: 'Hotel Drop-off', desc: 'Return to your hotel' }
    ];

    const transportOptions = [
        { id: 'tuk-tuk', name: 'Tuk-Tuk', pax: '2-3', price: 3500 },
        { id: 'sedan', name: 'Sedan Car', pax: '3-4', price: 6000 },
        { id: 'van', name: 'AC Van', pax: '7-10', price: 12000 }
    ];

    const currentPrice = transportOptions.find(t => t.id === selectedTransport)?.price || 0;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative my-auto flex flex-col max-h-[90vh]"
                >
                    {/* Header Image Area */}
                    <div className="relative h-48 sm:h-64 shrink-0">
                        <img src={packageData.image} alt={packageData.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
                            <div className="flex items-center gap-2 text-teal-300 text-sm font-bold tracking-wider uppercase mb-2">
                                <MapPin className="w-4 h-4" /> {packageData.location}
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">{packageData.name}</h2>
                            <div className="flex items-center gap-4 text-white/80 text-sm">
                                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-teal-400" /> Verified Route</span>
                                <span>⭐ {packageData.rating} ({packageData.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid md:grid-cols-5 gap-8">
                        {/* Left Column: Itinerary */}
                        <div className="md:col-span-3 space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Route Overview</h3>
                                <p className="text-slate-600 leading-relaxed">{packageData.description}</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-teal-600" /> Suggested Itinerary
                                </h3>
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                    {itinerary.map((stop, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-teal-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-0 md:ml-0"></div>
                                            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:pr-6 md:group-even:pl-6 text-left md:group-odd:text-right">
                                                <div className="flex flex-col md:group-odd:items-end mb-1">
                                                    <span className="text-sm font-bold text-teal-600">{stop.time}</span>
                                                    <h4 className="text-lg font-bold text-slate-800">{stop.title}</h4>
                                                </div>
                                                <p className="text-sm text-slate-500">{stop.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Transport Options & Booking */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Select Transport</h3>
                                <div className="space-y-3">
                                    {transportOptions.map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => setSelectedTransport(option.id)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                                selectedTransport === option.id 
                                                    ? 'border-teal-500 bg-teal-50/50 shadow-md' 
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="font-bold text-slate-800 flex items-center gap-2">
                                                    <Car className="w-4 h-4 text-slate-500" />
                                                    {option.name}
                                                </div>
                                                {selectedTransport === option.id && <Check className="w-5 h-5 text-teal-600" />}
                                            </div>
                                            <div className="text-sm text-slate-500">Up to {option.pax} passengers</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-xl">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <div className="text-teal-200 text-sm font-medium mb-1">Estimated Fare</div>
                                        <div className="text-3xl font-display font-bold">LKR {currentPrice.toLocaleString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-teal-200 text-sm font-medium mb-1">Duration</div>
                                        <div className="font-bold">~10 Hours</div>
                                    </div>
                                </div>
                                
                                <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-teal-500/20">
                                    Book via WhatsApp
                                </button>
                                <p className="text-center text-xs text-teal-300/60 mt-4 flex items-center justify-center gap-1">
                                    <Info className="w-3 h-3" /> No upfront payment required
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
