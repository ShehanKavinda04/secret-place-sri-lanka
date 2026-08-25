import { X, MapPin, Clock, Calendar, Car, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CustomRouteBuilderModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        startPoint: '',
        stops: [],
        vehicle: null,
        date: '',
        time: '',
        pickupAddress: ''
    });

    if (!isOpen) return null;

    const availableStops = [
        'Sri Maha Bodhi', 'Ruwanwelisaya', 'Jetavanaramaya', 
        'Abhayagiriya', 'Thuparamaya', 'Isurumuniya', 'Mihintale'
    ];

    const vehicles = [
        { id: 'tuk-tuk', name: 'Tuk-Tuk', pax: '2-3', base: 1000, perStop: 500 },
        { id: 'car', name: 'Sedan Car', pax: '3-4', base: 2000, perStop: 800 },
        { id: 'van', name: 'AC Van', pax: '7-10', base: 5000, perStop: 1500 }
    ];

    const toggleStop = (stop) => {
        setFormData(prev => ({
            ...prev,
            stops: prev.stops.includes(stop) 
                ? prev.stops.filter(s => s !== stop)
                : [...prev.stops, stop]
        }));
    };

    // Mock fare calculation
    const calculateFare = () => {
        if (!formData.vehicle) return 0;
        const vehicle = vehicles.find(v => v.id === formData.vehicle);
        return vehicle.base + (formData.stops.length * vehicle.perStop);
    };

    const handleNext = () => setStep(s => Math.min(s + 1, 4));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-2xl font-display font-bold text-slate-800">1. Select Locations</h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Starting Point / Area</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="e.g. Anuradhapura New Town"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
                                    value={formData.startPoint}
                                    onChange={e => setFormData({...formData, startPoint: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Select Sacred Sites to Visit</label>
                            <div className="flex flex-wrap gap-2">
                                {availableStops.map(stop => (
                                    <button
                                        key={stop}
                                        onClick={() => toggleStop(stop)}
                                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                                            formData.stops.includes(stop)
                                                ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'
                                        }`}
                                    >
                                        {stop}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-2xl font-display font-bold text-slate-800">2. Choose Vehicle</h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {vehicles.map(vehicle => (
                                <button
                                    key={vehicle.id}
                                    onClick={() => setFormData({...formData, vehicle: vehicle.id})}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                                        formData.vehicle === vehicle.id
                                            ? 'border-teal-500 bg-teal-50/50 shadow-md'
                                            : 'border-slate-100 hover:border-slate-300 bg-white'
                                    }`}
                                >
                                    <Car className={`w-8 h-8 mb-4 ${formData.vehicle === vehicle.id ? 'text-teal-600' : 'text-slate-400'}`} />
                                    <h4 className="font-bold text-slate-800 text-lg mb-1">{vehicle.name}</h4>
                                    <p className="text-sm text-slate-500">Up to {vehicle.pax} pax</p>
                                    <div className="mt-4 text-xs font-bold text-teal-600">
                                        From LKR {vehicle.base}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-2xl font-display font-bold text-slate-800">3. Schedule & Pickup</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="date" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                        value={formData.date}
                                        onChange={e => setFormData({...formData, date: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Start Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="time" 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                                        value={formData.time}
                                        onChange={e => setFormData({...formData, time: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Exact Pickup Address / Hotel Name</label>
                            <textarea 
                                rows="3"
                                className="w-full p-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                                placeholder="Where should the driver meet you?"
                                value={formData.pickupAddress}
                                onChange={e => setFormData({...formData, pickupAddress: e.target.value})}
                            ></textarea>
                        </div>
                    </motion.div>
                );
            case 4:
                const fare = calculateFare();
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-slate-800">Review & Confirm</h3>
                            <p className="text-slate-500 mt-2">Your custom pilgrimage route is ready.</p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex justify-between border-b border-slate-200 pb-4">
                                <span className="text-slate-500">Route</span>
                                <span className="font-bold text-slate-800 text-right">
                                    {formData.startPoint || 'Not set'} <br/>
                                    <span className="text-sm font-normal text-teal-600">
                                        + {formData.stops.length} Stops ({formData.stops.join(', ')})
                                    </span>
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-4">
                                <span className="text-slate-500">Vehicle</span>
                                <span className="font-bold text-slate-800">
                                    {vehicles.find(v => v.id === formData.vehicle)?.name || 'Not selected'}
                                </span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-slate-500">Schedule</span>
                                <span className="font-bold text-slate-800 text-right">
                                    {formData.date} at {formData.time} <br/>
                                    <span className="text-sm font-normal text-slate-500">{formData.pickupAddress}</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-teal-900 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
                            <div>
                                <div className="text-teal-200 text-sm font-medium mb-1">Estimated Fare</div>
                                <div className="text-3xl font-display font-bold">LKR {fare.toLocaleString()}</div>
                            </div>
                            <div className="text-right text-teal-100 text-sm">
                                ~{formData.stops.length * 3} km total
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative my-auto"
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8 sm:p-10">
                        {/* Stepper Header */}
                        <div className="flex items-center justify-between mb-10 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
                            <div 
                                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-500 z-0 rounded-full transition-all duration-500"
                                style={{ width: `${((step - 1) / 3) * 100}%` }}
                            ></div>
                            {[1, 2, 3, 4].map(num => (
                                <div 
                                    key={num} 
                                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                        step >= num ? 'bg-teal-600 text-white shadow-md shadow-teal-500/30' : 'bg-slate-200 text-slate-400'
                                    }`}
                                >
                                    {step > num ? <CheckCircle2 className="w-4 h-4" /> : num}
                                </div>
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className="min-h-[350px]">
                            <AnimatePresence mode="wait">
                                {renderStep()}
                            </AnimatePresence>
                        </div>

                        {/* Footer Controls */}
                        <div className="mt-10 flex gap-4 pt-6 border-t border-slate-100">
                            {step > 1 && (
                                <button 
                                    onClick={handlePrev}
                                    className="px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" /> Back
                                </button>
                            )}
                            {step < 4 ? (
                                <button 
                                    onClick={handleNext}
                                    className="ml-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors shadow-lg flex items-center gap-2"
                                >
                                    Next Step <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button 
                                    className="ml-auto flex-1 px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2"
                                >
                                    Confirm & Book via WhatsApp
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
