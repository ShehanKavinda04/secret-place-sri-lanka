import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import InteractiveMap from '@/Components/InteractiveMap';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import axios from 'axios';

export default function History({ auth, spot }) {
    // Default to location to match the wireframe image, but normally history
    const [activeTab, setActiveTab] = useState('history');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // Auto-refresh spot data for real-time updates when on the location tab
    useEffect(() => {
        let interval;
        if (activeTab === 'location') {
            interval = setInterval(() => {
                router.reload({
                    only: ['spot'],
                    preserveState: true,
                    preserveScroll: true,
                    showProgress: false,
                });
            }, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeTab]);

    const handleSearch = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setIsSearching(true);
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
                const data = await res.json();
                if (data && data.length > 0) {
                    setSearchedLocation({
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon),
                        name: data[0].display_name
                    });
                    setActiveTab('location');
                } else {
                    alert('Location not found');
                }
            } catch (error) {
                console.error(error);
                alert('Error searching for location');
            } finally {
                setIsSearching(false);
            }
        }
    };

    // Booking Flow State
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        language: 'English',
        attendance: 1,
        agreement: false,
    });
    const [bookingErrors, setBookingErrors] = useState({});
    const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(null);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setBookingErrors({});
        
        if (!bookingForm.agreement) {
            setBookingErrors({ agreement: 'You must agree to the guidelines to proceed.' });
            return;
        }

        setIsSubmittingBooking(true);
        try {
            const res = await axios.post('/api/retreat-booking', {
                ...bookingForm,
                date: selectedDate,
                slot: selectedSlot,
            });
            if (res.data.status === 'success') {
                setBookingSuccess(res.data.reference);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setBookingErrors(error.response.data.errors);
            } else {
                setBookingErrors({ general: 'An error occurred while booking. Please try again.' });
            }
        } finally {
            setIsSubmittingBooking(false);
        }
    };

    const category = spot?.category || 'Sacred Sites';
    let historyLabel = 'History of the Sacred Site'; // Default fallback
    
    if (category === 'Spiritual Experiences & Wellness') {
        historyLabel = 'History of the Sacred Site'; 
    } else if (category === 'Nature & Wildlife') {
        historyLabel = 'About the Nature Reserve';
    } else if (category === 'Historical Ruins' || category === 'Heritage') {
        historyLabel = 'History of the Ruins';
    } else if (category === 'Hydraulic') {
        historyLabel = 'History of the Hydraulic Site';
    } else if (category === 'Rituals') {
        historyLabel = 'About the Rituals';
    } else if (category === 'Sacred Sites') {
        historyLabel = 'History of the Sacred Site';
    } else {
        historyLabel = `About the ${category}`;
    }

    const sidebarItems = [
        { id: 'history', label: historyLabel, icon: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
        { id: 'gallery', label: 'Gallery / Photos', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
        { id: 'location', label: 'Location & Map Information', icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' },
    ];

    return (
        <>
            <Head title={`${spot?.name || 'History'} - Secret Places Sri Lanka`} />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />
                
                <motion.main 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-grow max-w-[1400px] mx-auto w-full flex flex-col md:flex-row py-8 px-4 sm:px-6 lg:px-8 gap-6"
                >
                    {/* Left Sidebar */}
                    <motion.aside 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full md:w-64 shrink-0 bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-fit md:sticky md:top-8 md:self-start z-10"
                    >
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                            <Link href="/places" className="text-royalTeal hover:text-[#0c6b65] text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 transition-colors">
                                <span>←</span> Back to Places
                            </Link>
                        </div>
                        
                        <nav className="flex flex-col py-2">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left px-5 py-3.5 text-sm transition-all duration-300 flex items-center gap-3 border-l-4 ${
                                        activeTab === item.id 
                                        ? 'bg-royalGold-500/10 text-royalMaroon-950 font-bold border-royalGold-500' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-royalMaroon-900 border-transparent font-medium'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className={`w-5 h-5 ${activeTab === item.id ? 'text-royalGold-600' : 'text-slate-400'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.section 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex-1 min-w-0 bg-white border border-slate-200/60 shadow-sm rounded-xl overflow-hidden flex flex-col"
                    >
                        
                        {/* Teal Header Bar */}
                        <div className="bg-[#0f4a45] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-lg font-bold tracking-wide">
                                {sidebarItems.find(i => i.id === activeTab)?.label} - {spot?.name}
                            </h2>
                            
                            {/* Search box (simulating the map wireframe) */}
                            {activeTab !== 'gallery' && (
                                <div className="relative w-full sm:w-64">
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearch}
                                        placeholder="Search Location" 
                                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-1.5 pr-8 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-royalGold-400 focus:border-royalGold-400"
                                        disabled={isSearching}
                                    />
                                    {isSearching ? (
                                        <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin absolute right-3 top-2 pointer-events-none"></div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-white/60 absolute right-3 top-2 pointer-events-none">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Content Container */}
                        <div className="p-6 md:p-8 flex-1 bg-slate-50/30">
                            {activeTab === 'history' && spot ? (
                                <div className="max-w-4xl space-y-10">
                                    {/* Header & Guidelines */}
                                    <div className="space-y-6">
                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                                            <h3 className="text-red-800 font-bold uppercase tracking-widest text-xs mb-1">You Must Need</h3>
                                            <p className="text-sm text-red-700/90 leading-relaxed">
                                                Preserve our sacred heritage: Please dress in traditional white attire, refrain from speaking loudly, and avoid using polythene or plastic to help maintain the serenity and cleanliness of the sacred grounds.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Main Content Card (Image + Text Below) */}
                                    <div className="w-full bg-[#0a0f12] rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                        <div className="w-full aspect-[21/9] md:aspect-[16/9] lg:aspect-[21/9] relative">
                                            <img 
                                                src={spot.image} 
                                                alt={spot.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = 'https://placehold.co/1200x500/e2e8f0/64748b?text=Sacred+Site+Image' }}
                                            />
                                            {/* Gradient to smoothly transition from image to the dark text area below */}
                                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f12] to-transparent pointer-events-none"></div>
                                        </div>
                                        
                                        <div className="px-6 pt-2 pb-12 md:px-10 md:pb-16 text-center flex flex-col items-center justify-center relative z-10">
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-widest uppercase mb-4 drop-shadow-md">
                                                {spot.name}
                                            </h2>
                                            <p className="text-[#e2c792] font-serif text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
                                                {spot.topic}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Topics & Details */}
                                    <div className="space-y-8 text-slate-700">

                                        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                                            <h2 className="text-xl font-bold text-royalMaroon-900 mb-4">Historical Narrative (Sub Topic 1)</h2>
                                            <div className="prose prose-slate max-w-none text-sm leading-relaxed mb-6">
                                                {(() => {
                                                    const text = spot.history_narrative || '';
                                                    const wordCount = text.split(/\s+/).filter(Boolean).length;
                                                    const needsTruncation = wordCount > 100;
                                                    const paragraphs = text.split(/\n\s*\n+/).filter(Boolean);

                                                    if (!needsTruncation) {
                                                        return <p className="whitespace-pre-line">{text}</p>;
                                                    }

                                                    if (!isExpanded) {
                                                        return (
                                                            <div className="space-y-4">
                                                                <p className="whitespace-pre-line">{paragraphs[0]}</p>
                                                                <button
                                                                    onClick={() => setIsExpanded(true)}
                                                                    className="mt-2 text-[#0f4a45] hover:text-[#0c3935] font-bold text-sm flex items-center gap-1 transition-colors group cursor-pointer"
                                                                >
                                                                    Read More...
                                                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                                                </button>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div className="space-y-6">
                                                            {paragraphs.map((p, idx) => {
                                                                if (idx === 0) {
                                                                    return <p key={idx} className="whitespace-pre-line">{p}</p>;
                                                                }
                                                                return (
                                                                    <motion.p
                                                                        key={idx}
                                                                        initial={{ opacity: 0, y: 15 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.4, delay: (idx - 1) * 0.12 }}
                                                                        className="whitespace-pre-line"
                                                                    >
                                                                        {p}
                                                                    </motion.p>
                                                                );
                                                            })}
                                                            <button
                                                                onClick={() => setIsExpanded(false)}
                                                                className="mt-2 text-[#0f4a45] hover:text-[#0c3935] font-bold text-sm flex items-center gap-1 transition-colors group cursor-pointer"
                                                            >
                                                                Read Less
                                                                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                                                            </button>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                            
                                            {spot.history_audio && (
                                                <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-royalGold-100 flex items-center justify-center shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-royalGold-700 ml-1">
                                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <audio key={spot.history_audio} controls className="w-full h-10 outline-none">
                                                        <source src={spot.history_audio} type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            )}
                                        </div>

                                        {!category?.includes('Spiritual') && (
                                            <>
                                                <div className="h-px w-full bg-slate-200"></div>

                                                <div>
                                                    <h2 className="text-xl font-bold text-royalMaroon-900 mb-4">Blueprint / Architectural Layout (Sub Topic 2)</h2>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                                        <div className="bg-slate-100 aspect-square border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                                            {spot.blueprint_image ? (
                                                                <img 
                                                                    src={spot.blueprint_image} 
                                                                    alt="Architectural Blueprint" 
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => { e.target.src = 'https://placehold.co/600x600/e2e8f0/64748b?text=Blueprint+Image' }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">Blueprint Placeholder</div>
                                                            )}
                                                        </div>
                                                        <div className="prose prose-slate max-w-none text-sm leading-relaxed">
                                                            <p>{spot.blueprint_text}</p>
                                                        </div>
                                                    </div>

                                                    {spot.blueprint_audio && (
                                                        <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-xl flex items-center gap-4 mt-6">
                                                            <div className="w-10 h-10 rounded-full bg-royalGold-100 flex items-center justify-center shrink-0">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-royalGold-700 ml-1">
                                                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <audio controls className="w-full h-10 outline-none">
                                                                <source src={spot.blueprint_audio} type="audio/mpeg" />
                                                            </audio>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Booking Section */}
                                        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-xl mt-8" id="booking-section">
                                            <h2 className="text-xl font-bold text-royalMaroon-900 mb-2">
                                                {spot?.id === 'rajarata-ayurveda' 
                                                    ? `Book an Ayurvedic Consultation / Treatment at ${spot?.name}`
                                                    : spot?.id === 'nuwara-wewa-yoga'
                                                    ? `Join a Lakeside Yoga Session / Book a Wellness Retreat at ${spot?.name}`
                                                    : spot?.id === 'ranmasu-uyana'
                                                    ? `Book a Guided Mindfulness Walk at ${spot?.name}`
                                                    : spot?.id === 'mihintale-sunrise'
                                                    ? `Book a Guided Sunrise Meditation at Mihintale`
                                                    : `Join a Meditation Session / Book a Retreat at ${spot?.name}`}
                                            </h2>
                                            <p className="text-slate-600 text-sm mb-6 max-w-2xl">
                                                {spot?.id === 'rajarata-ayurveda'
                                                    ? `Select a preferred date and time slot to register for your wellness therapies and healing sessions at this serene center.`
                                                    : spot?.id === 'nuwara-wewa-yoga'
                                                    ? `Select a preferred date and time slot to register for our guided lakeside yoga programs or a longer wellness retreat.`
                                                    : spot?.id === 'ranmasu-uyana'
                                                    ? `Select a preferred date and time slot to book a guided walking meditation tour through the ancient royal gardens.`
                                                    : spot?.id === 'mihintale-sunrise'
                                                    ? `Select a preferred date and time slot to register for our early morning guided meditation sessions at the sacred Mihintale peak.`
                                                    : `Select a preferred date and time slot to register for our guided meditation programs or a longer retreat at this serene center.`}
                                            </p>

                                            <div className="space-y-6">
                                                {/* Date Picker (Next 7 days) */}
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Select a Date</h3>
                                                    <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
                                                        {[...Array(7)].map((_, i) => {
                                                            const d = new Date();
                                                            d.setDate(d.getDate() + i + 1);
                                                            const dateStr = d.toISOString().split('T')[0];
                                                            const isSelected = selectedDate === dateStr;
                                                            return (
                                                                <button
                                                                    key={dateStr}
                                                                    onClick={() => setSelectedDate(dateStr)}
                                                                    className={`snap-start shrink-0 w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                                                                        isSelected ? 'border-royalTeal bg-royalTeal text-white shadow-md' : 'border-slate-200 bg-white hover:border-royalTeal/50 text-slate-600'
                                                                    }`}
                                                                >
                                                                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                                                                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                                                    </span>
                                                                    <span className="text-2xl font-display font-bold">
                                                                        {d.getDate()}
                                                                    </span>
                                                                    <span className={`text-xs ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                                                                        {d.toLocaleDateString('en-US', { month: 'short' })}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Time Slot Selector */}
                                                {selectedDate && (
                                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Select a Session</h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                            {(spot?.id === 'rajarata-ayurveda' 
                                                                ? ['Morning Consultation (8 AM - 12 PM)', 'Afternoon Treatment (2 PM - 6 PM)', 'Full Day Wellness Program']
                                                                : spot?.id === 'nuwara-wewa-yoga'
                                                                ? ['Morning Sunrise Yoga (6 AM - 8 AM)', 'Evening Sunset Yoga (4 PM - 6 PM)', 'Full Day Wellness Retreat']
                                                                : spot?.id === 'ranmasu-uyana'
                                                                ? ['Morning Guided Walk (7 AM - 9 AM)', 'Evening Guided Walk (4 PM - 6 PM)']
                                                                : spot?.id === 'mihintale-sunrise'
                                                                ? ['Pre-dawn Ascent & Meditation (4:30 AM - 7:30 AM)', 'Early Morning Session (6 AM - 9 AM)']
                                                                : ['Morning Session (6 AM - 10 AM)', 'Afternoon Session (2 PM - 6 PM)', 'Full Day Retreat']
                                                            ).map((slot) => (
                                                                <button
                                                                    key={slot}
                                                                    onClick={() => setSelectedSlot(slot)}
                                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                                                                        selectedSlot === slot ? 'border-royalGold-500 bg-royalGold-50' : 'border-slate-200 bg-white hover:border-royalGold-300'
                                                                    }`}
                                                                >
                                                                    <div className="font-bold text-slate-800 text-sm mb-1">{slot.split(' (')[0]}</div>
                                                                    {slot.includes('(') && <div className="text-xs text-slate-500">{slot.split(' (')[1].replace(')', '')}</div>}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* Proceed Button */}
                                                {selectedDate && selectedSlot && (
                                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 flex justify-end">
                                                        <PrimaryButton onClick={() => setBookingModalOpen(true)} className="px-8 py-3 bg-[#0f4a45] hover:bg-[#0c3935] shadow-md border-none">
                                                            Proceed to Register &rarr;
                                                        </PrimaryButton>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'location' ? (
                                /* Location / Map View matching the wireframe */
                                <div className="h-full min-h-[500px] flex gap-6 relative">
                                    {/* Map Area */}
                                    <div className="flex-1 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden relative shadow-inner z-0">
                                        <InteractiveMap spot={spot} searchedLocation={searchedLocation} />
                                    </div>
                                    
                                    {/* Detail Panel overlay/side */}
                                    <div className="w-72 hidden lg:flex flex-col gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <h4 className="font-bold text-slate-800 text-sm mb-2">Location Details</h4>
                                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                                Anuradhapura, North Central Province, Sri Lanka.
                                            </p>
                                            <button className="w-full bg-[#0f4a45] text-white text-xs font-bold py-2 rounded-md hover:bg-[#0c3935] transition-colors">
                                                Get Directions
                                            </button>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm mb-2">Nearby Sites</h4>
                                            <div className="text-xs text-slate-500 flex flex-col gap-2">
                                                {spot?.nearby_sites && spot.nearby_sites.length > 0 ? (
                                                    spot.nearby_sites.map((site, index) => (
                                                        <span key={index} className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-royalGold-500' : 'bg-royalTeal'}`}></div> 
                                                            {site.name} ({site.distance} km)
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span>No nearby sites found.</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeTab === 'gallery' && spot ? (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                        <h3 className="text-xl font-bold text-royalMaroon-900 font-display">Photo Gallery</h3>
                                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{spot.gallery?.length || 0} Photos</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {spot.gallery && spot.gallery.map((img, idx) => (
                                            <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm cursor-pointer">
                                                <img 
                                                    src={img} 
                                                    alt={`Gallery image ${idx + 1}`} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-10 h-10 drop-shadow-md transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                        {(!spot.gallery || spot.gallery.length === 0) && (
                                            <div className="col-span-full py-12 text-center text-slate-500">
                                                No photos available for this location yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full min-h-[400px] text-slate-500 text-sm border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                    <p>Content for "{sidebarItems.find(i => i.id === activeTab)?.label}" is coming soon.</p>
                                </div>
                            )}
                        </div>
                    </motion.section>
                </motion.main>

                <Footer auth={auth} />
            </div>

            {/* Floating CTA for Booking */}
            {activeTab === 'history' && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 flex justify-center pb-8 lg:pb-4">
                    <div className="max-w-6xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                        <div className="text-sm">
                            <span className="font-bold text-royalMaroon-900 block sm:inline">
                                {spot?.id === 'rajarata-ayurveda' ? 'Seeking Natural Healing?' : spot?.id === 'nuwara-wewa-yoga' ? 'Seeking Wellness & Calm?' : spot?.id === 'ranmasu-uyana' ? 'Seeking Mindful Exploration?' : spot?.id === 'mihintale-sunrise' ? 'Seeking a Spiritual Awakening?' : 'Seeking Inner Peace?'}
                            </span>
                            <span className="text-slate-600 sm:ml-2">
                                {spot?.id === 'rajarata-ayurveda' 
                                    ? 'Book an Ayurvedic consultation or treatment today.' 
                                    : spot?.id === 'nuwara-wewa-yoga'
                                    ? 'Join a lakeside yoga session or book a wellness retreat today.'
                                    : spot?.id === 'ranmasu-uyana'
                                    ? 'Book a guided walking meditation tour through the ancient royal gardens.'
                                    : spot?.id === 'mihintale-sunrise'
                                    ? 'Book a guided sunrise meditation at Mihintale today.'
                                    : 'Join a guided meditation session or book a retreat today.'}
                            </span>
                        </div>
                        <PrimaryButton 
                            onClick={() => {
                                setActiveTab('history');
                                setTimeout(() => {
                                    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="w-full sm:w-auto px-6 py-3 bg-[#0f4a45] hover:bg-[#0c3935] border-none"
                        >
                            {spot?.id === 'rajarata-ayurveda' ? 'Book Treatment' : spot?.id === 'nuwara-wewa-yoga' ? 'Book Yoga Session' : spot?.id === 'ranmasu-uyana' ? 'Book Guided Walk' : spot?.id === 'mihintale-sunrise' ? 'Book Sunrise Meditation' : 'Book a Retreat'}
                        </PrimaryButton>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            <Modal show={bookingModalOpen} onClose={() => {
                if (!isSubmittingBooking) {
                    setBookingModalOpen(false);
                    if (bookingSuccess) {
                        setBookingSuccess(null);
                        setSelectedDate(null);
                        setSelectedSlot(null);
                        setBookingForm({ ...bookingForm, agreement: false });
                    }
                }
            }}>
                <div className="p-6">
                    {!bookingSuccess ? (
                        <>
                            <h2 className="text-xl font-bold text-royalMaroon-900 mb-4 border-b border-slate-100 pb-2">Complete Registration</h2>
                            <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-md border border-slate-100">
                                You are booking <strong>{selectedSlot}</strong> for <strong>{selectedDate}</strong>.
                            </p>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                {bookingErrors.general && (
                                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{bookingErrors.general}</div>
                                )}
                                <div>
                                    <InputLabel htmlFor="name" value="Full Name" />
                                    <TextInput id="name" type="text" className="mt-1 block w-full" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} required disabled={isSubmittingBooking} />
                                    <InputError message={bookingErrors.name} className="mt-2" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="email" value="Email Address" />
                                        <TextInput id="email" type="email" className="mt-1 block w-full" value={bookingForm.email} onChange={e => setBookingForm({...bookingForm, email: e.target.value})} required disabled={isSubmittingBooking} />
                                        <InputError message={bookingErrors.email} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="phone" value="Phone Number" />
                                        <TextInput id="phone" type="tel" className="mt-1 block w-full" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} required disabled={isSubmittingBooking} />
                                        <InputError message={bookingErrors.phone} className="mt-2" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="language" value="Language Preference" />
                                        <select id="language" className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm" value={bookingForm.language} onChange={e => setBookingForm({...bookingForm, language: e.target.value})} disabled={isSubmittingBooking}>
                                            <option value="English">English</option>
                                            <option value="Sinhala">Sinhala</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="attendance" value="Group Size" />
                                        <TextInput id="attendance" type="number" min="1" max="10" className="mt-1 block w-full" value={bookingForm.attendance} onChange={e => setBookingForm({...bookingForm, attendance: parseInt(e.target.value) || 1})} required disabled={isSubmittingBooking} />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 mt-4">
                                    <label className="flex items-start cursor-pointer">
                                        <Checkbox name="agreement" checked={bookingForm.agreement} onChange={(e) => setBookingForm({...bookingForm, agreement: e.target.checked})} disabled={isSubmittingBooking} />
                                        <span className="ms-3 text-sm text-slate-600 leading-tight pt-0.5">
                                            I agree to follow the white dress code and monastery guidelines, preserving the serenity of the sacred grounds.
                                        </span>
                                    </label>
                                    <InputError message={bookingErrors.agreement} className="mt-2" />
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button type="button" onClick={() => setBookingModalOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-bold transition-colors" disabled={isSubmittingBooking}>
                                        Cancel
                                    </button>
                                    <PrimaryButton className="bg-[#0f4a45] hover:bg-[#0c3935] border-none" disabled={isSubmittingBooking}>
                                        {isSubmittingBooking ? 'Confirming...' : 'Confirm Registration'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-display font-bold text-royalMaroon-900 mb-2">Booking Confirmed!</h2>
                            <p className="text-slate-600 mb-6 max-w-sm mx-auto text-sm">
                                An email and SMS with your retreat details have been sent. Please present this QR code at the entrance.
                            </p>
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl inline-block shadow-sm">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Reference Number</div>
                                <div className="text-2xl font-bold font-mono tracking-wider text-[#0f4a45]">{bookingSuccess}</div>
                                <img src="/images/qr_placeholder.jpg" alt="QR Code" className="w-40 h-40 mx-auto mt-4 rounded-md border border-slate-200" />
                            </div>
                            <div className="mt-8">
                                <PrimaryButton onClick={() => {
                                    setBookingModalOpen(false);
                                    setBookingSuccess(null);
                                    setSelectedDate(null);
                                    setSelectedSlot(null);
                                    setBookingForm({ ...bookingForm, agreement: false });
                                }}>Done</PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
