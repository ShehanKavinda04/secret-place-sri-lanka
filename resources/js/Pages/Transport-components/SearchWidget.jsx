import { useState } from 'react';
import { MapPin, Calendar, Users, Car, Search, Map, Train, Bus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';

const searchSchema = z.object({
    pickup: z.string().optional(),
    destinations: z.array(z.string()).optional(),
    vehicleType: z.string().default('Any Vehicle'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    passengers: z.string().default('2 Adults, 0 Children')
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, {
    message: 'End date must be on or after start date.',
    path: ['endDate']
});

export default function SearchWidget({ onSearchChange }) {
    const [activeTab, setActiveTab] = useState('private');
    const [pickup, setPickup] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [destinationInput, setDestinationInput] = useState('');
    const [vehicleType, setVehicleType] = useState('Any Vehicle');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [passengers, setPassengers] = useState('2 Adults, 0 Children');
    const [errors, setErrors] = useState({});

    const handleAddDestination = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = destinationInput.trim();
            if (trimmed !== '') {
                if (!destinations.includes(trimmed)) {
                    const newDestinations = [...destinations, trimmed];
                    setDestinations(newDestinations);
                }
                setDestinationInput('');
            }
        }
    };

    const removeDestination = (dest) => {
        setDestinations(destinations.filter(d => d !== dest));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const formData = {
            pickup,
            destinations,
            vehicleType,
            startDate,
            endDate,
            passengers
        };

        const result = searchSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach(err => {
                const path = err.path[0];
                if (path) {
                    fieldErrors[path] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        if (onSearchChange) {
            onSearchChange({ 
                type: vehicleType,
                pickup,
                destinations,
                startDate,
                endDate,
                passengers
            });
        }

        const el = document.getElementById('vehicles-section');
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };


    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-20 mx-4 sm:mx-8 lg:mx-auto max-w-5xl -mt-24 mb-16 backdrop-blur-xl bg-white/95">
            {/* Tabs */}
            <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
                <button 
                    type="button"
                    onClick={() => setActiveTab('private')}
                    className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'private' ? 'text-teal-800 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                    <Car className="w-4 h-4" /> Private Vehicles
                </button>
                <button 
                    type="button"
                    onClick={() => setActiveTab('packages')}
                    className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'packages' ? 'text-teal-800 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                    <Map className="w-4 h-4" /> Pre-planned Packages
                </button>
                <button 
                    type="button"
                    onClick={() => setActiveTab('public')}
                    className={`flex-1 py-4 px-6 text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'public' ? 'text-teal-800 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                    <Train className="w-4 h-4" /> Train/Bus Timetables
                </button>
            </div>

            {/* Form Area */}
            <div className="p-6 sm:p-8">
                {activeTab === 'private' && (
                    <motion.form onSubmit={handleSearchSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Pickup */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Pickup Location
                                </label>
                                <div className="relative">
                                    <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.pickup ? 'text-rose-400' : 'text-slate-400'}`} />
                                    <input 
                                        type="text" 
                                        placeholder="Hotel or Station..." 
                                        value={pickup}
                                        onChange={(e) => {
                                            setPickup(e.target.value);
                                            if (errors.pickup) setErrors(prev => ({ ...prev, pickup: undefined }));
                                        }}
                                        className={`w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl text-sm transition-colors ${
                                            errors.pickup 
                                                ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30' 
                                                : 'border-slate-200 focus:ring-teal-500 focus:border-teal-500'
                                        }`} 
                                    />
                                </div>
                                {errors.pickup && (
                                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.pickup}
                                    </p>
                                )}
                            </div>

                            {/* Destinations */}
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    Destination(s)
                                </label>
                                <div className={`bg-slate-50 border rounded-xl p-2 flex flex-wrap gap-2 items-center transition-colors ${
                                    errors.destinations 
                                        ? 'border-rose-400 bg-rose-50/30 focus-within:ring-1 focus-within:ring-rose-500' 
                                        : 'border-slate-200 focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500'
                                }`}>
                                    {destinations.map(dest => (
                                        <span key={dest} className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                                            {dest}
                                            <button type="button" onClick={() => removeDestination(dest)} className="hover:bg-teal-200 rounded-full p-0.5">&times;</button>
                                        </span>
                                    ))}
                                    <input 
                                        type="text" 
                                        placeholder={destinations.length === 0 ? "Add sites (e.g. Ruwanwelisaya) and press Enter" : "Add more..."} 
                                        value={destinationInput}
                                        onChange={(e) => {
                                            setDestinationInput(e.target.value);
                                            if (errors.destinations) setErrors(prev => ({ ...prev, destinations: undefined }));
                                        }}
                                        onKeyDown={handleAddDestination}
                                        className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 text-sm py-1 px-2"
                                    />
                                </div>
                                {errors.destinations && (
                                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.destinations}
                                    </p>
                                )}
                            </div>

                            {/* Vehicle Type */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vehicle Type</label>
                                <div className="relative">
                                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select 
                                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none"
                                        value={vehicleType}
                                        onChange={(e) => {
                                            setVehicleType(e.target.value);
                                            if (onSearchChange) {
                                                onSearchChange({ type: e.target.value });
                                            }
                                        }}
                                    >
                                        <option>Any Vehicle</option>
                                        <option>Bus</option>
                                        <option>Coaster</option>
                                        <option>KDH Van</option>
                                        <option>Car</option>
                                        <option>Tuk-Tuk</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Date Range */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date Range</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.startDate ? 'text-rose-400' : 'text-slate-400'}`} />
                                        <input 
                                            type="date" 
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                if (errors.startDate) setErrors(prev => ({ ...prev, startDate: undefined }));
                                            }}
                                            className={`w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-600 ${
                                                errors.startDate ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500 focus:border-teal-500'
                                            }`} 
                                        />
                                    </div>
                                    <div className="relative flex-1">
                                        <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.endDate ? 'text-rose-400' : 'text-slate-400'}`} />
                                        <input 
                                            type="date" 
                                            value={endDate}
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                if (errors.endDate) setErrors(prev => ({ ...prev, endDate: undefined }));
                                            }}
                                            className={`w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-600 ${
                                                errors.endDate ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500' : 'border-slate-200 focus:ring-teal-500 focus:border-teal-500'
                                            }`} 
                                        />
                                    </div>
                                </div>
                                {(errors.startDate || errors.endDate) && (
                                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.startDate || errors.endDate}
                                    </p>
                                )}
                            </div>

                            {/* Passengers & Search Button */}
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                                <div className="w-full sm:flex-1 relative">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Passengers</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <select 
                                            value={passengers}
                                            onChange={(e) => setPassengers(e.target.value)}
                                            className="w-full pl-9 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none"
                                        >
                                            <option>2 Adults, 0 Children</option>
                                            <option>Family (4-6)</option>
                                            <option>Small Group (7-12)</option>
                                            <option>Large Group (15+)</option>
                                            <option>Wheelchair Included</option>
                                        </select>
                                    </div>
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                                >
                                    <Search className="w-4 h-4" /> Search Transport Options
                                </button>
                            </div>
                        </div>
                    </motion.form>
                )}

                {activeTab === 'packages' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <p className="text-slate-600 font-light">Explore our curated Atamasthana and Solosmasthana circuits designed for seamless pilgrimage.</p>
                        <button 
                            type="button"
                            onClick={() => {
                                const el = document.getElementById('packages-section');
                                if(el) {
                                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                    window.scrollTo({top: y, behavior: 'smooth'});
                                }
                            }} 
                            className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2"
                        >
                            <Map className="w-4 h-4" /> View Pre-planned Packages
                        </button>
                    </motion.div>
                )}

                {activeTab === 'public' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <p className="text-slate-600 font-light">Check live schedules for Intercity Express trains and SLTB AC buses to sacred destinations.</p>
                        <button 
                            type="button"
                            onClick={() => {
                                const el = document.getElementById('public-section');
                                if(el) {
                                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                    window.scrollTo({top: y, behavior: 'smooth'});
                                }
                            }} 
                            className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2"
                        >
                            <Bus className="w-4 h-4" /> Check Timetables
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

