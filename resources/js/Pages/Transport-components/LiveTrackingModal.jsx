import { X, Navigation2, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LiveTrackingModal({ isOpen, onClose }) {
    const [progress, setProgress] = useState(66); // Starts at 2/3rds for the mockup
    const [timeLeft, setTimeLeft] = useState(15);
    const [time, setTime] = useState(new Date(new Date().setHours(10, 45, 0, 0))); // 10:45 AM
    const [speed, setSpeed] = useState(48);
    const [distanceLeft, setDistanceLeft] = useState(24.5);

    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 0.5;
                if (next >= 100) return 100;
                return next;
            });
            
            setTimeLeft(prev => {
                if (prev <= 0) return 0;
                // Roughly decrease 1 min every few updates for simulation
                return prev - 0.25; 
            });

            setSpeed(() => {
                return progress >= 100 ? 0 : Math.floor(45 + Math.random() * 12);
            });

            setDistanceLeft(prev => {
                if (prev <= 0) return 0;
                return prev - 0.35;
            });
        }, 1000); // Fast simulation for demo purposes

        return () => clearInterval(interval);
    }, [isOpen]);

    // Calculate map marker position based on progress (from Colombo to Anuradhapura)
    // Colombo approximate: 25% left, 65% top
    // Anuradhapura approximate: 45% left, 35% top
    const markerLeft = 25 + (progress / 100) * (45 - 25);
    const markerTop = 65 - (progress / 100) * (65 - 35);
    // Auto-panning camera offset logic to keep marker centered
    // We scale the map by 1.5x and translate it oppositely to the marker's movement
    const cameraTranslateX = (50 - markerLeft);
    const cameraTranslateY = (50 - markerTop);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
                    >
                        <X className="w-5 h-5 text-slate-700" />
                    </button>

                    {/* Left Side: Map UI Mockup (with Auto-panning Camera) */}
                    <div className="w-full md:w-2/3 h-64 md:h-[600px] relative bg-slate-100 overflow-hidden">
                        
                        <div 
                            className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-linear origin-center"
                            style={{ transform: `scale(1.8) translate(${cameraTranslateX * 0.5}%, ${cameraTranslateY * 0.5}%)` }}
                        >
                            <img 
                                src="/images/sri_lanka_map.jpg" 
                                alt="Map View" 
                                className="w-full h-full object-cover" 
                            />
                        
                        {/* Map Overlays */}
                        <div className="absolute inset-0 bg-teal-900/10 pointer-events-none"></div>
                        
                        {/* Current Location Pin */}
                        <div 
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-1000 ease-linear z-20"
                            style={{ left: `${markerLeft}%`, top: `${markerTop}%` }}
                        >
                            <div className="w-16 h-16 bg-teal-500/30 rounded-full flex items-center justify-center relative">
                                {progress < 100 && <div className="w-12 h-12 bg-teal-500/40 rounded-full absolute animate-ping"></div>}
                                <div className="w-6 h-6 bg-teal-600 rounded-full relative z-10 border-2 border-white shadow-md"></div>
                            </div>
                            <div className="bg-teal-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg mt-1 whitespace-nowrap">
                                WP-KD 4521
                            </div>
                        </div>

                        {/* Route Line Mockup */}
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}>
                            <path 
                                d="M 25 65 L 45 35" 
                                fill="transparent" 
                                stroke="#0d9488" 
                                strokeWidth="0.5" 
                                strokeDasharray="1 1" 
                                className="animate-[dash_20s_linear_infinite]" 
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>

                        {/* Destination Pin */}
                        <div className="absolute top-[35%] left-[45%] -translate-x-1/2 -translate-y-full">
                            <MapPin className="w-8 h-8 text-rose-600 fill-rose-600 drop-shadow-md" />
                            <div className="absolute top-0 right-0 translate-x-full -translate-y-1/2 bg-white px-2 py-1 rounded text-xs font-bold shadow whitespace-nowrap text-slate-800 scale-75 origin-left">
                                Anuradhapura
                            </div>
                        </div>
                        
                        </div> {/* End of auto-panning camera layer */}
                        
                    </div>

                    {/* Right Side: Tracking Details */}
                    <div className="w-full md:w-1/3 bg-white p-6 md:p-8 flex flex-col h-full md:h-[600px] overflow-y-auto overflow-x-hidden">
                        <div className="flex items-center gap-2 text-teal-600 font-bold tracking-wider text-xs uppercase mb-6">
                            <Navigation2 className="w-4 h-4" /> Live Tracking Active
                        </div>

                        <h3 className="font-display text-2xl font-bold text-slate-800 mb-1">
                            Anuradhapura Sacred Tour
                        </h3>
                        <p className="text-slate-500 text-sm mb-6">Booking Ref: #TRP-847291</p>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600 text-sm">Estimated Arrival</span>
                                <span className="font-bold text-xl text-teal-800">
                                    {progress >= 100 ? "Arrived" : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                                <div>
                                    <div className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Speed</div>
                                    <div className="font-bold text-slate-700">{progress >= 100 ? 0 : speed} <span className="text-xs font-normal text-slate-500">km/h</span></div>
                                </div>
                                <div className="text-right">
                                    <div className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Distance</div>
                                    <div className="font-bold text-slate-700">{progress >= 100 ? 0 : distanceLeft.toFixed(1)} <span className="text-xs font-normal text-slate-500">km</span></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>Colombo</span>
                                    <span>{progress >= 100 ? "0 mins" : `${Math.ceil(timeLeft)} mins remaining`}</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-teal-500 h-full rounded-full relative transition-all duration-1000 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    >
                                        {progress < 100 && <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 animate-[shimmer_2s_infinite]"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Driver Details</h4>
                            <div className="flex items-center gap-4">
                                <img src="https://ui-avatars.com/api/?name=Sunil+Perera&background=0D8ABC&color=fff&size=100" alt="Driver" className="w-14 h-14 rounded-full shadow-sm" />
                                <div>
                                    <div className="font-bold text-slate-800">Sunil Perera</div>
                                    <div className="text-sm text-slate-500">Toyota KDH - WP-KD 4521</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a 
                                    href="tel:+94771234567"
                                    className="flex-1 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold py-2 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Phone className="w-4 h-4" /> Call Driver
                                </a>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4 border-t border-slate-100 pt-6">
                            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Share Tracking</h4>
                            <p className="text-sm text-slate-500 mb-2">Share your live location securely with family members.</p>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    readOnly 
                                    value="https://secretplacesrilanka.com/track/wp-kd-4521" 
                                    className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
                                />
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText("https://secretplacesrilanka.com/track/wp-kd-4521");
                                        const btn = document.getElementById('copyBtn');
                                        const original = btn.innerText;
                                        btn.innerText = 'Copied!';
                                        btn.classList.add('bg-teal-600');
                                        btn.classList.remove('bg-slate-800', 'hover:bg-slate-900');
                                        setTimeout(() => {
                                            btn.innerText = original;
                                            btn.classList.remove('bg-teal-600');
                                            btn.classList.add('bg-slate-800', 'hover:bg-slate-900');
                                        }, 2000);
                                    }}
                                    id="copyBtn"
                                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors w-24 text-center"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
