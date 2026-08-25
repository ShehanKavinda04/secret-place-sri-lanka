import { X, ShieldAlert, Phone, MapPin, Navigation2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function EmergencySOSModal({ isOpen, onClose }) {
    const [status, setStatus] = useState('idle'); // 'idle' | 'activating' | 'active'
    const [lat, setLat] = useState(8.3512);
    const [lng, setLng] = useState(80.3982);

    useEffect(() => {
        if (!isOpen) return;

        // Simulate real-time GPS polling
        const gpsInterval = setInterval(() => {
            setLat(prev => prev + (Math.random() - 0.5) * 0.00008);
            setLng(prev => prev + (Math.random() - 0.5) * 0.00008);
        }, 800);

        return () => clearInterval(gpsInterval);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleActivate = () => {
        setStatus('activating');
        // Simulate API call to emergency services
        setTimeout(() => {
            setStatus('active');
        }, 2000);
    };

    const resetAndClose = () => {
        setStatus('idle');
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                >
                    <button 
                        onClick={resetAndClose}
                        className="absolute top-4 right-4 z-10 bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-colors shadow-sm"
                    >
                        <X className="w-5 h-5 text-slate-700" />
                    </button>

                    <div className="p-8">
                        {status === 'idle' && (
                            <div className="text-center space-y-6">
                                <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <ShieldAlert className="w-12 h-12 text-rose-600" />
                                </div>
                                
                                <div>
                                    <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">Emergency SOS</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Are you sure you want to activate the Emergency SOS? This will immediately broadcast your live location to local authorities and your registered emergency contacts.
                                    </p>
                                </div>

                                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3 text-left">
                                    <MapPin className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-rose-900 text-sm flex items-center gap-2">
                                            Current Location to be Shared:
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                            </span>
                                        </div>
                                        <div className="text-rose-700 text-xs mt-1 font-mono">
                                            Anuradhapura Sacred City (Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)})
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button 
                                        onClick={resetAndClose}
                                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleActivate}
                                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors shadow-rose-600/30"
                                    >
                                        Activate SOS
                                    </button>
                                </div>
                            </div>
                        )}

                        {status === 'activating' && (
                            <div className="text-center space-y-6 py-8">
                                <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto relative">
                                    <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
                                    <Navigation2 className="w-10 h-10 text-rose-600 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Connecting...</h3>
                                    <p className="text-slate-600">Broadcasting location and alerting authorities...</p>
                                </div>
                            </div>
                        )}

                        {status === 'active' && (
                            <div className="text-center space-y-6 py-4">
                                <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-12 h-12 text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">SOS Active</h3>
                                    <p className="text-slate-600 mb-6">
                                        Your emergency contacts and local authorities have been notified. Please stay in your current location if safe to do so. Help is on the way.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                        <Phone className="w-5 h-5" /> Call Tourist Police (1912)
                                    </button>
                                    <button 
                                        onClick={resetAndClose}
                                        className="w-full bg-transparent border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
                                    >
                                        I'm Safe Now (Deactivate)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
