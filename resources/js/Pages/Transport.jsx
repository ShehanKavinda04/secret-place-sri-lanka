import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SpotCard from './Welcome-sub-sub-components/SpotCard';
import { MapPin, Phone, MessageCircle, Calculator, Accessibility, Train, Bus, PhoneCall, Backpack } from 'lucide-react';

const privateVehicles = [
    {
        id: 'tuk-tuk-1',
        type: 'Tuk-Tuk',
        name: 'Atamasthana Tuk-Tuk Sacred Tour',
        capacity: '2-3 passengers',
        price: 'LKR 4,500 / day',
        priceValue: 4500,
        description: 'Dedicated local driver for an all-day tour covering the Atamasthana with local knowledge of optimal visiting hours. Wheelchair/Elderly friendly assistance.',
        features: ['Wheelchair/Elderly friendly assistance', 'Flexible stops', 'Local Guide'],
        image: '/images/tuk_tuk_tour.jpg',
        phone: '+94771234567'
    },
    {
        id: 'van-1',
        type: 'Van',
        name: 'Private AC Van / Family Cruiser',
        capacity: '6-10 passengers',
        price: 'LKR 14,000 / day',
        priceValue: 14000,
        description: 'Comfortable air-conditioned van rental for family pilgrimage groups visiting Anuradhapura, Mihintale, and Tantirimale.',
        features: ['Air Conditioned', 'Spacious Seating', 'Professional Driver'],
        image: '/images/family_van.jpg',
        phone: '+94771234568'
    }
];

const pilgrimageCircuits = [
    {
        id: 'atamasthana-circuit',
        name: 'Atamasthana One-Day Circuit Pass',
        location: 'Anuradhapura Sacred City',
        rating: '4.9',
        reviews: '1240',
        description: 'A highly optimized, pre-planned transport route linking all 8 main worship sites in the sacred city sequentially to avoid midday heat.',
        image: '/images/atamasthana.jpg',
        href: '/experience/atamasthana'
    },
    {
        id: 'solosmasthana-mihintale',
        name: 'Solosmasthana & Mihintale Sunrise Package',
        location: 'Mihintale & Surroundings',
        rating: '4.8',
        reviews: '856',
        description: 'Early morning transport to Mihintale to witness the sunrise from Aradhana Gala, followed by ancient monastery tours in the periphery.',
        image: '/images/mihintale_steps.png',
        href: '/experience/mihintale'
    }
];

const locationsForEstimator = [
    'Anuradhapura Railway Station',
    'Anuradhapura Central Bus Stand',
    'Jaya Sri Maha Bodhi',
    'Ruwanwelisaya',
    'Abhayagiriya',
    'Jetavanaramaya',
    'Thuparamaya',
    'Isurumuniya',
    'Mihintale'
];

// Mock distances matrix for calculator
const getDistance = (from, to) => {
    if (from === to) return 0;
    if (to === 'Mihintale' || from === 'Mihintale') return 15;
    return Math.floor(Math.random() * 5) + 2; // Random 2-7km for city center sites
};

function VehicleCard({ vehicle }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col sm:flex-row group"
        >
            <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:h-full relative overflow-hidden bg-slate-900">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-royalMaroon-950 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {vehicle.type}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-royalMaroon-950 mb-2">{vehicle.name}</h3>
                <p className="text-slate-600 text-sm font-light mb-4 flex-grow">{vehicle.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {vehicle.capacity}
                    </span>
                    <span className="bg-royalGold-100 text-royalMaroon-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                        💳 {vehicle.price}
                    </span>
                </div>
                
                <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                    <a href={`https://wa.me/${vehicle.phone.replace('+','')}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-xl hover:bg-[#20bd5a] transition-colors text-sm shadow-sm">
                        <MessageCircle className="w-4 h-4" /> Book via WhatsApp
                    </a>
                    <a href={`tel:${vehicle.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-2.5 rounded-xl hover:bg-slate-700 transition-colors text-sm shadow-sm">
                        <Phone className="w-4 h-4" /> Call Driver
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Transport({ auth, laravelVersion, phpVersion }) {
    const [fromLocation, setFromLocation] = useState(locationsForEstimator[0]);
    const [toLocation, setToLocation] = useState(locationsForEstimator[3]);
    const [filterType, setFilterType] = useState('All');

    const estimatedDistance = getDistance(fromLocation, toLocation);
    const estimatedTukTukFare = estimatedDistance > 0 ? (estimatedDistance * 100) + 150 : 0;
    const estimatedVanFare = estimatedDistance > 0 ? (estimatedDistance * 200) + 500 : 0;

    const filteredVehicles = privateVehicles.filter(v => filterType === 'All' || v.type === filterType);

    return (
        <>
            <Head title="Anuradhapura Transport & Pilgrimage Logistics" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-80 sm:h-[450px] overflow-hidden"
                >
                    <img src="/images/atamasthana.jpg" alt="Anuradhapura Pilgrimage Logistics" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-4 bg-royalMaroon-950/50 px-4 py-1.5 rounded-full border border-royalGold-500/30 backdrop-blur-sm">
                            Sacred City Navigation
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl max-w-4xl leading-tight">
                            Anuradhapura Transport &amp; Sacred Pilgrimage Logistics
                        </h1>
                        <p className="mt-6 text-white/90 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                            Reliable local transport options, driver rentals, and curated pilgrimage circuits to explore the sacred city seamlessly.
                        </p>
                    </div>
                </motion.div>

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-20 w-full relative -mt-20 z-10">
                    
                    {/* Distance & Fare Estimator */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 backdrop-blur-xl bg-white/95">
                        <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                            <div className="p-3 bg-royalGold-100 rounded-xl text-royalMaroon-950 shadow-inner">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-bold text-slate-800">Distance & Fare Estimator</h2>
                                <p className="text-sm text-slate-500 font-light mt-1">Calculate typical local transport fares between sacred sites.</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Starting Point</label>
                                    <select 
                                        value={fromLocation} 
                                        onChange={e => setFromLocation(e.target.value)} 
                                        className="w-full border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-royalGold-500 focus:border-royalGold-500 text-slate-700 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        {locationsForEstimator.map(loc => <option key={loc}>{loc}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Destination</label>
                                    <select 
                                        value={toLocation} 
                                        onChange={e => setToLocation(e.target.value)} 
                                        className="w-full border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-royalGold-500 focus:border-royalGold-500 text-slate-700 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        {locationsForEstimator.map(loc => <option key={loc}>{loc}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 flex flex-col justify-center shadow-inner relative overflow-hidden">
                                {/* Decorative circle */}
                                <div className="absolute -right-8 -top-8 w-32 h-32 bg-royalGold-500/10 rounded-full blur-2xl"></div>
                                
                                {estimatedDistance === 0 ? (
                                    <p className="text-center text-slate-500 font-medium z-10 relative">Please select different locations to view estimates.</p>
                                ) : (
                                    <div className="space-y-5 z-10 relative">
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-5">
                                            <span className="text-slate-600 font-semibold tracking-wide text-sm uppercase">Estimated Distance</span>
                                            <span className="font-display text-3xl font-bold text-royalMaroon-950">~{estimatedDistance} km</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-slate-700 font-medium">Tuk-Tuk Fare (One-way)</span>
                                            <span className="font-bold text-slate-900 bg-white px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm">LKR {estimatedTukTukFare}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-slate-700 font-medium">AC Van Fare (One-way)</span>
                                            <span className="font-bold text-slate-900 bg-white px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm">LKR {estimatedVanFare}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-4 text-center leading-relaxed">
                                            *Estimates are based on standard meter rates. Night rates (10pm-5am) may incur a 20% surcharge.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Private Vehicle Rentals */}
                    <section className="space-y-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-royalGold-400/20 pb-6">
                            <div>
                                <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Local Driver Rentals</span>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold text-royalMaroon-950 mt-2">Private Vehicles</h2>
                            </div>
                            <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200">
                                {['All', 'Tuk-Tuk', 'Van'].map(type => (
                                    <button 
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filterType === type ? 'bg-white text-royalMaroon-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <AnimatePresence>
                                {filteredVehicles.map(vehicle => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Public Transport Schedules */}
                    <section className="space-y-10">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Hub Connections</span>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-royalMaroon-950 mt-2">Public Transport Logistics</h2>
                            <p className="text-slate-600 font-light mt-4">Essential information on major transit hubs serving the Anuradhapura Sacred City.</p>
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-2xl text-blue-700 border border-blue-100"><Train className="w-8 h-8" /></div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-slate-800">Railway Station</h3>
                                        <p className="text-sm text-slate-500">Major Express Connections</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm font-light leading-relaxed mb-8">
                                    The Anuradhapura Railway Station is the main gateway for pilgrims traveling from Colombo. Major express trains include the <strong>Yal Devi</strong> and <strong>Uttara Devi</strong>.
                                </p>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 space-y-4">
                                    <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-4">
                                        <span className="text-slate-700 font-medium">Colombo Fort → Anuradhapura</span>
                                        <span className="font-bold text-slate-900 bg-white px-3 py-1 rounded-md shadow-sm">~ 4.5 Hrs</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-700 font-medium">Kandy → Anuradhapura</span>
                                        <span className="font-bold text-slate-900 bg-white px-3 py-1 rounded-md shadow-sm">~ 5.0 Hrs</span>
                                    </div>
                                </div>
                                <a href="https://seatreservation.railway.gov.lk/cra/" target="_blank" rel="noreferrer" className="block text-center w-full bg-blue-600 text-white font-bold tracking-wide py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
                                    Book Train Tickets (Official)
                                </a>
                            </div>

                            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-red-50 p-4 rounded-2xl text-red-700 border border-red-100"><Bus className="w-8 h-8" /></div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-slate-800">Central Bus Stand</h3>
                                        <p className="text-sm text-slate-500">Local & Regional Routes</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm font-light leading-relaxed mb-8">
                                    Located in the new town, the Central Bus Stand offers regular AC and non-AC buses to all major cities. Local feeder buses (CTB) frequently run to the sacred city entrances.
                                </p>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 space-y-5 text-sm">
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-xs mt-0.5">R15</div>
                                        <div>
                                            <strong className="text-slate-800 block mb-1">Direct A/C buses to Colombo</strong>
                                            <span className="text-slate-600">Departures every 30 minutes from the main terminal.</span>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-200"></div>
                                    <div className="flex gap-4 items-start">
                                        <div className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs mt-0.5">FEED</div>
                                        <div>
                                            <strong className="text-slate-800 block mb-1">Mihintale Feeder</strong>
                                            <span className="text-slate-600">Local buses depart every 20 minutes during daytime hours.</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="https://sltb.eseat.lk/" target="_blank" rel="noreferrer" className="block text-center w-full bg-red-600 text-white font-bold tracking-wide py-4 rounded-xl hover:bg-red-700 transition-colors shadow-sm hover:shadow">
                                    Book SLTB Bus Tickets
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Curated Pilgrimage Circuits */}
                    <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-2xl mt-12 border border-slate-800">
                        {/* Decorative Background Image */}
                        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
                            <img src="/images/atamasthana.jpg" alt="Background" className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="relative z-10 p-8 sm:p-14 space-y-12">
                            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
                                <div>
                                    <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400">Pre-Planned Routes</span>
                                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">Curated Pilgrimage Circuits</h2>
                                    <p className="text-white/70 font-light mt-4 max-w-xl text-lg leading-relaxed">
                                        Optimized routes for completing your sacred vows and worship without the hassle of planning transport logistics.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                {pilgrimageCircuits.map(spot => (
                                    <SpotCard key={spot.id} spot={spot} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Logistics, Accessibility & Emergency Support */}
                    <section className="pt-10">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="font-display text-3xl font-bold text-royalMaroon-950">Pilgrim Support Services</h2>
                            <p className="text-slate-500 font-light mt-3">Essential logistics and accessibility support for your spiritual journey.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                                    <Accessibility className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-slate-800 mb-2">Elderly & Special Care</h3>
                                    <p className="text-sm text-slate-600 font-light leading-relaxed">Wheelchair-accessible vehicles available upon request. Special vehicle access permits up to the Ruwanwelisaya Maluwa can be arranged for elderly pilgrims.</p>
                                </div>
                            </motion.div>
                            
                            <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
                                    <Backpack className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-slate-800 mb-2">Luggage Transfers</h3>
                                    <p className="text-sm text-slate-600 font-light leading-relaxed">Arriving by train? Book our Station-to-Hotel luggage transfer service so you can head straight to the sacred sites without carrying heavy bags.</p>
                                </div>
                            </motion.div>
                            
                            <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col gap-5 shadow-sm hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100">
                                    <PhoneCall className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-bold text-slate-800 mb-2">24/7 Local Support</h3>
                                    <p className="text-sm text-slate-600 font-light leading-relaxed">Dedicated emergency helpline within the Anuradhapura district for breakdowns, medical assistance, or lost property during your pilgrimage.</p>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                </main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
