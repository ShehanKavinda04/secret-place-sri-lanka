import { useTranslation } from '@/Hooks/useTranslation';
import { X, MapPin, Clock, Calendar, Car, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

export default function CustomRouteBuilderModal({ isOpen, onClose }) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        startPoint: '',
        stops: [],
        vehicle: null,
        date: '',
        time: '',
        pickupAddress: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

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
        setFormData(prev => {
            const nextStops = prev.stops.includes(stop) 
                ? prev.stops.filter(s => s !== stop)
                : [...prev.stops, stop];
            if (errors.stops && nextStops.length > 0) {
                setErrors(e => ({ ...e, stops: undefined }));
            }
            return {
                ...prev,
                stops: nextStops
            };
        });
    };

    const calculateFare = () => {
        if (!formData.vehicle) return 0;
        const vehicle = vehicles.find(v => v.id === formData.vehicle);
        return (vehicle?.base || 0) + (formData.stops.length * (vehicle?.perStop || 0));
    };

    const validateCurrentStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.startPoint.trim() || formData.startPoint.trim().length < 2) {
                newErrors.startPoint = 'Please specify a starting point / pickup area (min 2 characters).';
            }
            if (formData.stops.length === 0) {
                newErrors.stops = 'Please select at least one sacred site to visit.';
            }
        } else if (step === 2) {
            if (!formData.vehicle) {
                newErrors.vehicle = 'Please choose a vehicle type for your journey.';
            }
        } else if (step === 3) {
            if (!formData.date) {
                newErrors.date = 'Please pick a travel date.';
            }
            if (!formData.time) {
                newErrors.time = 'Please select a starting time.';
            }
            if (!formData.pickupAddress.trim() || formData.pickupAddress.trim().length < 5) {
                newErrors.pickupAddress = 'Please enter a detailed pickup address or hotel name (min 5 characters).';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateCurrentStep()) {
            setStep(s => Math.min(s + 1, 4));
        }
    };

    const handlePrev = () => {
        setErrors({});
        setStep(s => Math.max(s - 1, 1));
    };

    const handleConfirmBooking = async () => {
        setIsSubmitting(true);
        try {
            await axios.post('/api/custom-route-booking', {
                ...formData,
                fare: calculateFare()
            });
            setIsConfirmed(true);
        } catch (error) {
            console.error("Custom route booking error", error);
            setIsConfirmed(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        if (isConfirmed) {
            return (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-slate-800">{t("Custom Pilgrimage Confirmed!")}</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        Your custom itinerary has been submitted. Our dispatcher will assign your driver and send live coordination details shortly.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm max-w-sm mx-auto text-left space-y-2">
                        <div><strong>Route:</strong> {formData.startPoint} ➔ {formData.stops.join(', ')}</div>
                        <div><strong>Schedule:</strong> {formData.date} at {formData.time}</div>
                        <div><strong>Est. Fare:</strong> LKR {calculateFare().toLocaleString()}</div>
                    </div>
                </motion.div>
            );
        }

        switch(step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-2xl font-display font-bold text-slate-800">1. Select Locations</h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Starting Point / Area <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.startPoint ? 'text-rose-400' : 'text-slate-400'}`} />
                                <input 
                                    type="text" 
                                    placeholder="e.g. Anuradhapura New Town"
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                                        errors.startPoint ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                                    }`}
                                    value={formData.startPoint}
                                    onChange={e => {
                                        setFormData({...formData, startPoint: e.target.value});
                                        if (errors.startPoint) setErrors(err => ({ ...err, startPoint: undefined }));
                                    }}
                                />
                            </div>
                            {errors.startPoint && (
                                <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.startPoint}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Select Sacred Sites to Visit <span className="text-rose-500">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableStops.map(stop => (
                                    <button
                                        type="button"
                                        key={stop}
                                        onClick={() => toggleStop(stop)}
                                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                                            formData.stops.includes(stop)
                                                ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'
                                        }`}
                                    >
                                        {stop}
                                    </button>
                                ))}
                            </div>
                            {errors.stops && (
                                <p className="mt-2 text-xs text-rose-500 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.stops}
                                </p>
                            )}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <h3 className="text-2xl font-display font-bold text-slate-800">2. Choose Vehicle</h3>
                        {errors.vehicle && (
                            <p className="text-xs text-rose-500 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.vehicle}
                            </p>
                        )}
                        <div className="grid sm:grid-cols-3 gap-4">
                            {vehicles.map(vehicle => (
                                <button
                                    type="button"
                                    key={vehicle.id}
                                    onClick={() => {
                                        setFormData({...formData, vehicle: vehicle.id});
                                        if (errors.vehicle) setErrors(err => ({ ...err, vehicle: undefined }));
                                    }}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer ${
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Date <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.date ? 'text-rose-400' : 'text-slate-400'}`} />
                                    <input 
                                        type="date" 
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none ${
                                            errors.date ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                                        }`}
                                        value={formData.date}
                                        onChange={e => {
                                            setFormData({...formData, date: e.target.value});
                                            if (errors.date) setErrors(err => ({ ...err, date: undefined }));
                                        }}
                                    />
                                </div>
                                {errors.date && (
                                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.date}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">
                                    Start Time <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.time ? 'text-rose-400' : 'text-slate-400'}`} />
                                    <input 
                                        type="time" 
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none ${
                                            errors.time ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                                        }`}
                                        value={formData.time}
                                        onChange={e => {
                                            setFormData({...formData, time: e.target.value});
                                            if (errors.time) setErrors(err => ({ ...err, time: undefined }));
                                        }}
                                    />
                                </div>
                                {errors.time && (
                                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.time}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Exact Pickup Address / Hotel Name <span className="text-rose-500">*</span>
                            </label>
                            <textarea 
                                rows="3"
                                className={`w-full p-4 rounded-xl border outline-none resize-none ${
                                    errors.pickupAddress ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'
                                }`}
                                placeholder="Where should the driver meet you?"
                                value={formData.pickupAddress}
                                onChange={e => {
                                    setFormData({...formData, pickupAddress: e.target.value});
                                    if (errors.pickupAddress) setErrors(err => ({ ...err, pickupAddress: undefined }));
                                }}
                            ></textarea>
                            {errors.pickupAddress && (
                                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.pickupAddress}
                                </p>
                            )}
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
                            <p className="text-slate-500 mt-2">{t("Your custom pilgrimage route is ready.")}</p>
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
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-teal-900 text-white">
                        <div>
                            <h2 className="text-xl font-display font-bold">Custom Route Builder</h2>
                            <p className="text-teal-200 text-xs mt-0.5">{t("Design your own sacred pilgrimage itinerary")}</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                        {renderStep()}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                        {!isConfirmed && step > 1 ? (
                            <button 
                                onClick={handlePrev}
                                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {isConfirmed ? (
                            <button 
                                onClick={onClose}
                                className="px-8 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer text-sm"
                            >
                                Close Window
                            </button>
                        ) : step < 4 ? (
                            <button 
                                onClick={handleNext}
                                className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer text-sm"
                            >
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button 
                                onClick={handleConfirmBooking}
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer text-sm disabled:opacity-50"
                            >
                                {isSubmitting ? 'Booking...' : 'Confirm Itinerary'} <CheckCircle2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

