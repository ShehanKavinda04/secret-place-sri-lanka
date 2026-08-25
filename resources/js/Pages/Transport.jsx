import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Accessibility, Navigation2, Car } from 'lucide-react';

// New Modular Components
import SearchWidget from './Transport-components/SearchWidget';
import VehicleCard from './Transport-components/VehicleCard';
import BookingModal from './Transport-components/BookingModal';
import PublicTransportTable from './Transport-components/PublicTransportTable';
import ReviewsCarousel from './Transport-components/ReviewsCarousel';
import LiveTrackingModal from './Transport-components/LiveTrackingModal';
import EmergencySOSModal from './Transport-components/EmergencySOSModal';
import LiveMapWidget from './Transport-components/LiveMapWidget';
import SpotCard from './Welcome-sub-sub-components/SpotCard';


const pilgrimageCircuits = [
    {
        id: 'atamasthana-circuit',
        name: 'Atamasthana One-Day Circuit',
        location: 'Anuradhapura Sacred City',
        rating: '4.9',
        reviews: '1240',
        description: 'A highly optimized, pre-planned transport route linking all 8 main worship sites in the sacred city sequentially to avoid midday heat.',
        image: '/images/atamasthana.jpg',
        href: '/experience/atamasthana'
    },
    {
        id: 'solosmasthana-mihintale',
        name: 'Sri Pada Shuttle & Stay',
        location: 'Adam\'s Peak (Sri Pada)',
        rating: '4.8',
        reviews: '856',
        description: 'End-to-end transport from your hotel to the Nallathanniya base camp, including overnight waiting for your return.',
        image: '/images/mihintale_steps.png',
        href: '/experience/mihintale'
    }
];

export default function Transport({ auth, laravelVersion, phpVersion }) {
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [liveTrackingModalOpen, setLiveTrackingModalOpen] = useState(false);
    const [emergencySOSModalOpen, setEmergencySOSModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [searchFilters, setSearchFilters] = useState({ type: 'Any Vehicle' });

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('/api/transport-vehicles', { params: searchFilters });
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchVehicles();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchFilters]);

    const handleBook = (vehicle) => {
        setSelectedVehicle(vehicle);
        setBookingModalOpen(true);
    };

    return (
        <>
            <Head title="Transport & Pilgrimage Logistics" />
            <div className="min-h-screen bg-[#F8F9FA] text-[#2c1d11] font-sans selection:bg-teal-500 selection:text-white flex flex-col overflow-x-hidden">
                <Navbar auth={auth} />

                {/* 1. Hero Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[80vh] sm:h-[650px] overflow-hidden"
                >
                    <img src="https://images.unsplash.com/photo-1588667503923-010077b949c8?q=80&w=2000&auto=format&fit=crop" alt="Scenic Sri Lankan Railway" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-[#F8F9FA]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
                        <span className="text-xs uppercase tracking-widest font-bold text-teal-400 mb-6 bg-slate-900/50 px-4 py-1.5 rounded-full border border-teal-500/30 backdrop-blur-sm">
                            Logistics Module
                        </span>
                        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl max-w-5xl leading-tight">
                            Plan Your Sacred Journey Smoothly
                        </h1>
                        <p className="mt-8 text-white/90 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
                            Reliable local transport, customizable routes, and end-to-end pilgrimage logistics.
                        </p>
                    </div>
                </motion.div>

                <main className="flex-grow w-full relative z-10 pb-24">
                    
                    {/* 2. Main Interactive Search & Filter Card (Floating Widget) */}
                    <SearchWidget onSearchChange={(filters) => setSearchFilters(prev => ({...prev, ...filters}))} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                        
                        {/* 3A. Pilgrimage Route & Package Builder */}
                        <section id="packages-section" className="space-y-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800">Pilgrimage Route & Package Builder</h2>
                                    <p className="text-slate-600 mt-2 font-light text-lg">Select a pre-configured package or craft your own sacred path.</p>
                                </div>
                                <button 
                                    onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl border border-slate-300 transition-colors flex items-center gap-2"
                                >
                                    <Navigation2 className="w-5 h-5" /> Build My Own Route
                                </button>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                {pilgrimageCircuits.map(spot => (
                                    <SpotCard key={spot.id} spot={spot} onBook={handleBook} />
                                ))}
                            </div>
                        </section>

                        {/* 3B. Vehicle Fleet Selection Grid */}
                        <section id="vehicles-section" className="space-y-10">
                            <div>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800">Vehicle Fleet Selection</h2>
                                <p className="text-slate-600 mt-2 font-light text-lg">Safe, comfortable, and reliable transport driven by experienced locals.</p>
                            </div>
                            
                            <div className="grid lg:grid-cols-2 gap-8">
                                {vehicles.length > 0 ? (
                                    vehicles.map(vehicle => (
                                        <VehicleCard key={vehicle.id} vehicle={vehicle} onBook={handleBook} />
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <Car className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-slate-700">No vehicles found</h3>
                                        <p className="text-slate-500 mt-2">Try adjusting your search criteria to see more options.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 3C. Public Transport Logistics Table */}
                        <section id="public-section" className="space-y-10">
                            <div>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800">Public Transport Logistics</h2>
                                <p className="text-slate-600 mt-2 font-light text-lg">Live schedules for Intercity Express trains and CTB/SLTB buses.</p>
                            </div>
                            
                            <PublicTransportTable />
                        </section>

                        {/* 4. Safety & Real-time Tracking Section */}
                        <section className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-14 overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center gap-12">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-900/20 blur-3xl rounded-full translate-x-1/3"></div>
                            
                            <div className="w-full md:w-1/2 space-y-6 relative z-10">
                                <span className="text-teal-400 font-bold tracking-widest text-xs uppercase">Safety & Security</span>
                                <h2 className="font-display text-4xl font-bold text-white">Live Tracking & Assistance</h2>
                                <p className="text-slate-300 font-light text-lg leading-relaxed">
                                    Share your live GPS tracking link with your family. All our verified fleet partners offer a 24/7 Breakdown replacement guarantee.
                                </p>
                                
                                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl border border-white/20">
                                        <ShieldAlert className="w-6 h-6 text-teal-400" />
                                        <div className="text-left text-sm text-white">
                                            <div className="font-bold">Replacement Guarantee</div>
                                            <div className="text-slate-400 text-xs">Within 2 hours anywhere</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setEmergencySOSModalOpen(true)}
                                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShieldAlert className="w-5 h-5" /> Emergency SOS Support
                                    </button>
                                </div>
                            </div>

                            {/* Extracted to its own component with real-time state stream */}
                            <LiveMapWidget onClick={() => setLiveTrackingModalOpen(true)} />
                        </section>

                        {/* 5. Social Proof & Reviews */}
                        <section className="space-y-12">
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800">Pilgrim Experiences</h2>
                                <p className="text-slate-600 mt-2 font-light text-lg">Don't just take our word for it. Read reviews from recent travelers.</p>
                            </div>
                            
                            <ReviewsCarousel />
                        </section>

                    </div>
                </main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />

                {/* 6. Booking & Payment Modal (Step-by-Step Flow) */}
                <BookingModal 
                    isOpen={bookingModalOpen} 
                    onClose={() => setBookingModalOpen(false)} 
                    vehicle={selectedVehicle} 
                />

                {/* 7. Live Tracking Modal */}
                <LiveTrackingModal 
                    isOpen={liveTrackingModalOpen} 
                    onClose={() => setLiveTrackingModalOpen(false)} 
                />

                {/* 8. Emergency SOS Modal */}
                <EmergencySOSModal 
                    isOpen={emergencySOSModalOpen} 
                    onClose={() => setEmergencySOSModalOpen(false)} 
                />
            </div>
        </>
    );
}
