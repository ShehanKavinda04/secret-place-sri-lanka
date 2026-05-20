import { Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedFeature, setSelectedFeature] = useState(null);

    // Premium custom-curated secret spots styled to match the royal theme
    const secretSpots = [
        {
            id: 1,
            name: "Jaya Sri Maha Bodhi",
            category: "Sacred Sites & Shrines",
            description: "One of the world's oldest historically documented trees, radiating immense spiritual peace and sacred Buddhist heritage.",
            image: "/images/jaya_sri_maha_bodhi.png",
            rating: "4.9",
            reviews: 320,
            location: "Anuradhapura, North Central Province",
            tags: ["Sacred Tree", "Buddhism", "Ancient Heritage"],
            difficulty: "Easy"
        },
        {
            id: 2,
            name: "Ruwanweli Maha Seya",
            category: "Rituals, Poojas & Ceremonies",
            description: "A magnificent, awe-inspiring ancient stupa housing sacred relics, standing as a grand marvel of engineering and devotion.",
            image: "/images/ruwanweli_maha_seya.png",
            rating: "4.9",
            reviews: 415,
            location: "Anuradhapura, North Central Province",
            tags: ["Ancient Stupa", "Relics", "Devotion"],
            difficulty: "Easy"
        },
        {
            id: 3,
            name: "Vessagiriya",
            category: "Spiritual Experiences & Wellness",
            description: "An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.",
            image: "/images/vessagiriya_monastery.png",
            rating: "4.8",
            reviews: 110,
            location: "Anuradhapura, North Central Province",
            tags: ["Forest Monastery", "Meditation", "Rock Caves"],
            difficulty: "Medium"
        },
        {
            id: 4,
            name: "Ranmasu Uyana",
            category: "Ancient Hydraulic & Architecture Wonders",
            description: "A fascinating ancient royal park renowned for its advanced hydraulic systems and the mysterious, symbolic stargate carving.",
            image: "/images/ranmasu_uyana.png",
            rating: "4.7",
            reviews: 156,
            location: "Anuradhapura, North Central Province",
            tags: ["Royal Park", "Hydraulics", "Stargate Carving"],
            difficulty: "Easy"
        },
        {
            id: 5,
            name: "Kalasohona Monastic Environment",
            category: "Local Heritage MSMEs & Crafts",
            description: "A tranquil, lesser-known historic monastic site wrapped in deep natural solitude, perfect for quiet spiritual contemplation.",
            image: "/images/kalasohona_monastery.png",
            rating: "4.8",
            reviews: 74,
            location: "Anuradhapura Outskirts, North Central Province",
            tags: ["Heritage Crafts", "Stone Carving", "Ancient ruins"],
            difficulty: "Medium"
        },
        {
            id: 6,
            name: "Mihintale",
            category: "Transport & Pilgrimage Logistics",
            description: "The revered, historic mountain peak celebrated as the cradle of Buddhism and spiritual awakening in Sri Lanka.",
            image: "/images/mihintale_peak.png",
            rating: "4.9",
            reviews: 280,
            location: "Mihintale, North Central Province",
            tags: ["Pilgrimage route", "Buddhism Cradle", "Mountain Peak"],
            difficulty: "Medium"
        }
    ];

    const categories = [
        'All', 
        'Sacred Sites & Shrines', 
        'Rituals, Poojas & Ceremonies', 
        'Spiritual Experiences & Wellness', 
        'Ancient Hydraulic & Architecture Wonders', 
        'Local Heritage MSMEs & Crafts', 
        'Transport & Pilgrimage Logistics'
    ];

    const categoryCards = [
        {
            title: "Sacred Sites & Shrines",
            description: "Discover historic temples, ancient shrines, and deeply revered holy places.",
            image: "/images/sacred_sites.png",
            hashtags: "#SacredSites #Shrines #Temples #Ancient",
            exploreText: "EXPLORE THE SACRED"
        },
        {
            title: "Rituals, Poojas & Ceremonies",
            description: "Experience live traditional rituals, sacred poojas, and cultural religious observances.",
            image: "/images/rituals_ceremonies.png",
            hashtags: "#Poojas #Rituals #Ceremonies #Faith",
            exploreText: "WITNESS FAITH"
        },
        {
            title: "Spiritual Experiences & Wellness",
            description: "Rejuvenate with peaceful meditation programs, yoga, and holistic spiritual healing.",
            image: "/images/spiritual_wellness.png",
            hashtags: "#Meditation #Wellness #Yoga #Peace",
            exploreText: "FIND SERENITY"
        },
        {
            title: "Ancient Hydraulic & Architecture Wonders",
            description: "Explore magnificent ancient reservoirs, stone carvings, and historic engineering marvels.",
            image: "/images/ancient_hydraulic.png",
            hashtags: "#Hydraulics #Architecture #Ruins #Wonders",
            exploreText: "UNVEIL MAJESTY"
        },
        {
            title: "Local Heritage MSMEs & Crafts",
            description: "Support traditional local artisans, authentic cottage industries, and cultural crafts.",
            image: "/images/heritage_crafts.png",
            hashtags: "#MSMEs #Crafts #Artisans #Heritage",
            exploreText: "SUPPORT LOCAL"
        },
        {
            title: "Transport & Pilgrimage Logistics",
            description: "Plan your sacred journey smoothly with reliable local transport.",
            image: "/images/pilgrimage_logistics.png",
            hashtags: "#Transport #Logistics #Pilgrimage #Routes",
            exploreText: "JOURNEY SAFELY"
        }
    ];

    const filteredSpots = useMemo(() => {
        return secretSpots.filter(spot => {
            const matchesCategory = activeCategory === 'All' || spot.category === activeCategory;
            const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 spot.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    // 6 Feature Components as requested
    const features = [
        {
            id: 'booking',
            title: "Live Booking System",
            description: "Instant real-time reservations for services and activities at sacred sites.",
            dynamicTag: "🟢 142 Active Bookings",
            details: "Access an automated live scheduling engine. Book local mountain guides, secluded heritage homestays, and sacred site pilgrimage tours. Integrates directly with instant SMS notifications and secure digital ticket verification.",
            // Calendar icon
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
            )
        },
        {
            id: 'tracking',
            title: "Live Location Tracking",
            description: "Real-time map navigation to discover nearby sacred attractions seamlessly.",
            dynamicTag: "📍 87 Mapped Places Near You",
            details: "Navigate remote landscapes using our high-fidelity offline map modules. Discover waterfall pools, ancient trails, and meditation caves. Shows elevation maps, trail conditions, and local ranger safety checkpoints.",
            // Compass / Map-Pin icon
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            )
        },
        {
            id: 'storytelling',
            title: "Digital Storytelling",
            description: "High-quality media and detailed history highlighting religious significance.",
            dynamicTag: "📖 48 Active Stories Mapped",
            details: "Immerse yourself in history through premium audio guides and rich digital chronicles. Learn about ancient inscriptions, temple architecture, and cultural folk tales narrated by local heritage scholars.",
            // Book / Document icon
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0-6-6H3v8.25h3.375A3.375 3.375 0 0 1 9.75 21.137m3.75-2.387a6 6 0 0 1 6-6H21v8.25h-3.375a3.375 3.375 0 0 0-3.375 3.375M9 7.5h.008v.008H9V7.5Zm3 0h.008v.008H12V7.5Zm3 0h.008v.008H15V7.5Zm-6 3h.008v.008H9v-.008Zm3 0h.008v.008H12v-.008Zm3 0h.008v.008H15v-.008Z" />
                </svg>
            )
        },
        {
            id: 'language',
            title: "Multi-Language Content",
            description: "Accessible information tailored in Sinhala, Tamil, or English languages.",
            dynamicTag: "🌐 3 Languages Available",
            details: "Ensure universal accessibility for local pilgrims and foreign nomads alike. Toggle between Sinhala (සිංහල), Tamil (தமிழ்), and English (English) with synchronized local dialect audio transcripts.",
            // Language/Globe icon
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a9.003 9.003 0 0 0 8.354-5.646M10.5 21A9.003 9.003 0 0 1 2.146 15.354M10.5 21V3m0 18c-2.21 0-4-3.582-4-8s1.79-8 4-8m0 18c2.21 0 4-3.582 4-8s-1.79-8-4-8M3.343 7.5a9.001 9.001 0 0 1 14.314 0M2.146 15.354a9 9 0 0 1 16.708 0M10.5 3a9.003 9.003 0 0 0-8.354 5.646M10.5 3a9.003 9.003 0 0 1 8.354 5.646" />
                </svg>
            )
        },
        {
            id: 'analytics',
            title: "MSME Analytics",
            description: "Simplified business dashboard tracking income and visitor insights.",
            dynamicTag: "📈 18 Active MSMEs Online",
            details: "Supporting remote community economics. Local homestay operators, guides, and craft artisans access a clean metrics dashboard to view booking income trends, site traffic, and guest review summaries.",
            // Trend-Up Chart icon
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
            )
        },
        {
            id: 'payments',
            title: "Secure Payments",
            description: "Safe multi-channel environment supporting local and international cards.",
            dynamicTag: "🔒 SSL Certified LankaPay",
            details: "Transact with complete peace of mind. Our robust gateway handles Sri Lankan local cards (LankaPay), international credit cards (Visa/Mastercard), and mobile wallet options seamlessly.",
            // Credit Card & Lock icon
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
            )
        }
    ];

    const [bookingDate, setBookingDate] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    const handleMockBooking = (e) => {
        e.preventDefault();
        setBookingStatus('Processing...');
        setTimeout(() => {
            setBookingStatus(`🎉 Reservation Request for ${bookingDate} Submitted Successfully!`);
        }, 1200);
    };

    return (
        <>
            <Head title="Secret Places Sri Lanka - Royal Travel Guide" />
            
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 relative overflow-hidden">
                
                {/* --- 1. NAVBAR (Deep Royal Maroon Background) --- */}
                <header className="bg-royalMaroon-800 border-b border-royalGold-600/20 text-[#FAF9F6] sticky top-0 z-50 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        
                        {/* Circular Gold Traditional Mandala Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-royalGold-600 via-royalGold-400 to-royalGold-300 flex items-center justify-center shadow-md border border-royalGold-300/30 group cursor-pointer hover:rotate-45 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-royalMaroon-950">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6Z" clipRule="evenodd" />
                                    <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <span className="font-display text-xl font-bold tracking-wider text-royalGold-300">
                                SecretPlaces
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-royalGold-300/90">
                            <a href="#hero" className="hover:text-royalGold-300 transition-colors duration-200 border-b border-transparent hover:border-royalGold-500 pb-1">Home</a>
                            <a href="#features" className="hover:text-royalGold-300 transition-colors duration-200 border-b border-transparent hover:border-royalGold-500 pb-1">Features</a>
                            <a href="#discover" className="hover:text-royalGold-300 transition-colors duration-200 border-b border-transparent hover:border-royalGold-500 pb-1">Places</a>
                            <a href="#newsletter" className="hover:text-royalGold-300 transition-colors duration-200 border-b border-transparent hover:border-royalGold-500 pb-1">Suggestions</a>
                        </nav>

                        {/* Auth / Action button */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-5 py-2.5 rounded-full bg-royalMaroon-900 border border-royalGold-500/50 text-xs font-bold uppercase tracking-wider text-royalGold-300 hover:bg-royalMaroon-950 transition-all duration-300 shadow-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-royalGold-400 hover:text-royalGold-300 transition-colors duration-200"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-xs font-bold uppercase tracking-wider text-royalMaroon-950 hover:brightness-110 active:scale-95 transition-all duration-200 shadow-md shadow-royalGold-500/10 border border-royalGold-400/20"
                                    >
                                        Join Group
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* --- 2. HERO SECTION (Traditional Maroon and Royal Gold Backdrop) --- */}
                <section id="hero" className="relative bg-royalMaroon-800 text-[#FAF9F6] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-royalGold-500 shadow-inner">
                    <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-around">
                        <div className="w-[400px] h-[400px] rounded-full border-[10px] border-royalGold-300" />
                        <div className="w-[500px] h-[500px] rounded-full border-[15px] border-royalGold-300" />
                    </div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
                        {/* Hero Left Content */}
                        <div className="lg:col-span-7 space-y-8 text-left">
                            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-royalGold-300 leading-tight">
                                Welcome to <br />
                                Secret Places Sri Lanka
                            </h1>
                            <p className="text-royalGold-400/90 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                                Explore the most beautiful, secluded, and historic travel destinations in Sri Lanka. Unveil hidden jungle waterfalls, ancient fortress ruins, and misty mountain ranges tucked away from standard tourist trails.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a 
                                    href="#discover"
                                    className="px-8 py-3 rounded-full bg-royalGold-500 text-royalMaroon-950 hover:bg-royalGold-400 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase shadow-md shadow-royalGold-500/10"
                                >
                                    Live Detailing
                                </a>
                                <a 
                                    href="#newsletter"
                                    className="px-8 py-3 rounded-full border-2 border-royalGold-500 text-royalGold-400 hover:bg-royalMaroon-700/50 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase"
                                >
                                    Live Booking
                                </a>
                            </div>
                        </div>

                        {/* Hero Right Graphic Overlay (Traditional Sri Lankan Lion & Sandakada Pahana art) */}
                        <div className="lg:col-span-5 flex justify-center items-center">
                            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-royalGold-500/40 bg-royalMaroon-900 group">
                                <img 
                                    src="/images/sri_lanka_hero_art.png" 
                                    alt="Traditional Sri Lankan Lion and Moonstone" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-royalMaroon-950/20 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. PREMIUM 6-FEATURE GRID (Replaces Important Highlights) --- */}
                <section id="features" className="py-24 bg-[#FAF9F6] border-b border-royalGold-400/25">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
                        
                        {/* Section Header */}
                        <div className="max-w-3xl mx-auto space-y-4">
                            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-royalTeal leading-tight">
                                Important Highlights
                            </h2>
                            <p className="text-[#605a54] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
                                Discover a carefully balanced guide structured around pristine natural wonders, deep ancient heritage, safety compliance, and authentic local experiences.
                            </p>
                        </div>

                        {/* Centered Green-Circle / Gold-Card Responsive Grid (6 components: 3x2 on desktop, 2x3 on tablet, 1x6 on mobile) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto pt-6">
                            {features.map((feature) => (
                                <div 
                                    key={feature.id}
                                    onClick={() => setSelectedFeature(feature)}
                                    className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                                >
                                    {/* Circle Icon Badge */}
                                    <div className="w-20 h-20 rounded-full bg-royalTeal text-royalGold-300 flex items-center justify-center shadow-lg border-2 border-royalGold-400/30 z-10 group-hover:scale-110 group-hover:bg-[#08423f] transition-all duration-300">
                                        {feature.icon}
                                    </div>
                                    
                                    {/* Gold Card Wrapper (Dynamic hover, Interactive link state, clickable) */}
                                    <div className="w-full bg-[#dfbe82] rounded-3xl pt-12 pb-6 px-6 -mt-10 border border-royalGold-500/20 shadow-md group-hover:shadow-xl group-hover:bg-[#e6c78e] transition-all duration-300 flex flex-col justify-between items-center text-center min-h-[220px]">
                                        
                                        <div className="space-y-2.5">
                                            {/* Feature Title */}
                                            <h3 className="font-display text-lg font-bold text-royalMaroon-950 uppercase tracking-wider">
                                                {feature.title}
                                            </h3>
                                            {/* 10-15 Word Concise Description */}
                                            <p className="text-royalMaroon-900/90 text-xs sm:text-sm font-medium leading-relaxed px-1">
                                                {feature.description}
                                            </p>
                                        </div>

                                        <div className="w-full pt-4 mt-4 border-t border-royalMaroon-950/15 flex flex-col items-center gap-2">
                                            {/* Dynamic automated data tag badge */}
                                            <span className="px-2.5 py-1 rounded-full bg-royalMaroon-950/10 text-[10px] font-extrabold tracking-wide text-royalMaroon-950 uppercase">
                                                {feature.dynamicTag}
                                            </span>
                                            {/* Action Link Indicator */}
                                            <span className="text-[10px] font-bold text-royalMaroon-900 uppercase tracking-widest flex items-center gap-1 group-hover:text-royalMaroon-950 transition-colors">
                                                Launch System ➜
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* --- 4. EXPLORE CATEGORIES SECTION --- */}
                <section id="categories" className="py-24 bg-[#f3efe6] border-b border-royalGold-400/25">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
                        
                        {/* Section Header */}
                        <div className="max-w-3xl mx-auto space-y-4">
                            <span className="text-xs uppercase tracking-widest font-extrabold text-royalGold-700">Classification Desk</span>
                            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-royalMaroon-950 leading-tight">
                                Explore Categories
                            </h2>
                            <p className="text-[#605a54] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
                                Navigate our curated classifications of Sri Lankan wonders, each leading to deep-seated cultural mysteries and beautiful landscapes.
                            </p>
                        </div>

                        {/* 6 Category Cards Grid (3x2 on desktop, 2x3 on tablet, and 1x6 on mobile) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
                            {categoryCards.map((card, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setActiveCategory(card.title);
                                        document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group relative aspect-square rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 border border-royalGold-500/10"
                                >
                                    {/* Full-bleed Background Image */}
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Dark bottom gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent transition-opacity duration-300" />

                                    {/* Content Container */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                                        
                                        {/* Divider line separating visual elements */}
                                        <div className="w-full border-t border-white/20 pt-4 flex flex-col space-y-2">
                                            
                                            {/* White Playfair Display serif uppercase title */}
                                            <h3 className="font-display text-2xl sm:text-[22px] md:text-2xl font-bold text-white uppercase tracking-wider leading-snug">
                                                {card.title}
                                            </h3>

                                            {/* Sand-gold (#ebd197) italicized body description */}
                                            <p className="font-display italic text-royalGold-400 text-[13px] leading-relaxed font-semibold">
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Footer details divider line */}
                                        <div className="w-full border-t border-white/10 mt-4 pt-4 flex items-center justify-between gap-4">
                                            {/* Custom hashtags bottom-left */}
                                            <span className="text-[10px] text-white/50 tracking-wider font-mono truncate max-w-[60%]" title={card.hashtags}>
                                                {card.hashtags}
                                            </span>

                                            {/* Leaf-outline circle badge next to the word "EXPLORE" bottom-right */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-royalGold-400 transition-colors">
                                                    EXPLORE
                                                </span>
                                                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-royalGold-400 group-hover:text-royalGold-400 group-hover:bg-royalGold-400/10 transition-all duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-5-5-6-10-2-14 4.5-4.5 10-3 10-3s1.5 5.5-3 10c-4 4-9 3-14 2M12 21l3-3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* --- MOCK INTERACTIVE GLASSMORPHIC MODAL FOR CLICKABLE FEATURES --- */}
                {selectedFeature && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 transition-all duration-300 animate-fadeIn">
                        <div className="bg-royalMaroon-800 border-2 border-royalGold-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#FAF9F6] shadow-2xl relative space-y-6">
                            
                            {/* Close Modal button */}
                            <button 
                                onClick={() => { setSelectedFeature(null); setBookingStatus(''); }}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-royalMaroon-950 text-royalGold-400 hover:text-royalGold-300 flex items-center justify-center font-bold border border-royalGold-500/30 transition-colors"
                            >
                                ✕
                            </button>

                            {/* Header Icon + Info */}
                            <div className="flex items-center gap-4 border-b border-royalGold-600/30 pb-4">
                                <div className="w-14 h-14 rounded-2xl bg-royalTeal text-royalGold-300 flex items-center justify-center border border-royalGold-400/20">
                                    {selectedFeature.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-display text-xl font-bold text-royalGold-300 uppercase tracking-wide">
                                        {selectedFeature.title}
                                    </h3>
                                    <span className="text-[10px] bg-royalGold-500/10 border border-royalGold-400/20 text-royalGold-400 px-2 py-0.5 rounded-full uppercase font-bold tracking-widest mt-1 inline-block">
                                        {selectedFeature.dynamicTag}
                                    </span>
                                </div>
                            </div>

                            {/* Detailed description */}
                            <div className="text-left text-sm text-royalGold-300/80 leading-relaxed font-light">
                                <p>{selectedFeature.details}</p>
                            </div>

                            {/* Functional Live Demos Inside Modal */}
                            <div className="bg-royalMaroon-950/60 rounded-2xl p-4 border border-royalGold-500/10 space-y-3">
                                <span className="text-[9px] uppercase font-bold text-royalGold-400/50 block tracking-widest text-left">Live Functional Sandbox</span>
                                
                                {selectedFeature.id === 'booking' && (
                                    <form onSubmit={handleMockBooking} className="space-y-3 text-left">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-royalGold-400 uppercase tracking-wider">Select Adventure Date</label>
                                            <input 
                                                type="date" 
                                                required
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                className="w-full bg-royalMaroon-900 border border-royalGold-600/30 rounded-xl px-3 py-2 text-sm text-royalGold-300 focus:outline-none focus:border-royalGold-400"
                                            />
                                        </div>
                                        <button type="submit" className="w-full py-2.5 rounded-xl bg-royalGold-500 hover:bg-royalGold-400 text-royalMaroon-950 font-bold text-xs uppercase tracking-wider transition-colors">
                                            Book Instant Slot
                                        </button>
                                        {bookingStatus && (
                                            <div className="text-xs font-semibold text-center text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 rounded-xl py-2">
                                                {bookingStatus}
                                            </div>
                                        )}
                                    </form>
                                )}

                                {selectedFeature.id === 'tracking' && (
                                    <div className="py-4 text-center space-y-3">
                                        {/* Mock map radar animation */}
                                        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-500/40 animate-ping" />
                                            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-100 z-10" />
                                        </div>
                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">📡 Mapped coordinates active: 80.6337° E, 7.2906° N</span>
                                        <p className="text-[11px] text-royalGold-450/60 font-light">Interactive tracking locates 3 hidden waterfall trails within 2.5km radius.</p>
                                    </div>
                                )}

                                {selectedFeature.id === 'storytelling' && (
                                    <div className="p-3 space-y-3 text-left">
                                        <div className="flex items-center justify-between text-xs text-royalGold-300 font-semibold bg-royalMaroon-900 px-3 py-2 rounded-xl border border-royalGold-500/10">
                                            <span>🔊 Play Audio Story: Sigiriya Inscription</span>
                                            <span className="text-[9px] uppercase bg-royalGold-500/20 px-1.5 py-0.5 rounded text-royalGold-400 animate-pulse">Playing</span>
                                        </div>
                                        {/* Mock player slider bar */}
                                        <div className="space-y-1">
                                            <div className="w-full bg-royalMaroon-900 rounded-full h-1.5">
                                                <div className="bg-royalGold-500 h-1.5 rounded-full w-[45%]" />
                                            </div>
                                            <div className="flex justify-between text-[9px] text-royalGold-400/50">
                                                <span>02:18</span>
                                                <span>05:10</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedFeature.id === 'language' && (
                                    <div className="p-3 text-center space-y-3">
                                        <span className="text-xs font-bold text-royalGold-400 uppercase tracking-wider block">Select Platform Language</span>
                                        <div className="flex justify-center gap-2">
                                            <button className="px-3 py-1.5 rounded-lg border-2 border-royalGold-500 bg-royalGold-500 text-royalMaroon-950 text-xs font-bold uppercase">English</button>
                                            <button className="px-3 py-1.5 rounded-lg border border-royalGold-500/40 text-royalGold-400 text-xs font-semibold hover:bg-royalMaroon-900 transition-colors">සිංහල</button>
                                            <button className="px-3 py-1.5 rounded-lg border border-royalGold-500/40 text-royalGold-400 text-xs font-semibold hover:bg-royalMaroon-900 transition-colors">தமிழ்</button>
                                        </div>
                                    </div>
                                )}

                                {selectedFeature.id === 'analytics' && (
                                    <div className="p-2 space-y-3 text-left">
                                        <span className="text-xs font-bold text-royalGold-400 uppercase tracking-wider block">Homestay Revenue Trends</span>
                                        {/* Mock analytical bar chart */}
                                        <div className="flex items-end justify-between h-20 bg-royalMaroon-900/80 rounded-xl p-3 border border-royalGold-500/10">
                                            <div className="w-6 bg-royalGold-500/30 hover:bg-royalGold-500 h-[30%] rounded transition-all duration-300" title="Mar: LKR 45k" />
                                            <div className="w-6 bg-royalGold-500/30 hover:bg-royalGold-500 h-[50%] rounded transition-all duration-300" title="Apr: LKR 75k" />
                                            <div className="w-6 bg-royalGold-500 hover:bg-royalGold-600 h-[85%] rounded transition-all duration-300" title="May: LKR 125k" />
                                            <div className="w-6 bg-royalGold-600 h-[70%] rounded transition-all duration-300" title="Jun (Proj): LKR 100k" />
                                        </div>
                                        <div className="flex justify-between text-[9px] text-royalGold-400/50 px-1">
                                            <span>Mar</span>
                                            <span>Apr</span>
                                            <span>May</span>
                                            <span>Jun (Est)</span>
                                        </div>
                                    </div>
                                )}

                                {selectedFeature.id === 'payments' && (
                                    <div className="p-3 text-left space-y-3">
                                        <span className="text-xs font-bold text-royalGold-400 uppercase tracking-wider block">Mock Payment Gateway</span>
                                        <div className="bg-royalMaroon-900 border border-royalGold-500/10 rounded-xl p-3 space-y-2">
                                            <div className="flex justify-between text-xs text-royalGold-450/70 font-semibold">
                                                <span>LankaPay Network</span>
                                                <span className="text-emerald-400">● Safe</span>
                                            </div>
                                            {/* Dummy credit card fields */}
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="col-span-2 bg-royalMaroon-950 rounded px-2 py-1 text-[10px] text-royalGold-300 font-mono">•••• •••• •••• 4242</div>
                                                <div className="bg-royalMaroon-950 rounded px-2 py-1 text-[10px] text-royalGold-300 font-mono text-center">12/28</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Back to Home Button */}
                            <button 
                                onClick={() => { setSelectedFeature(null); setBookingStatus(''); }}
                                className="w-full py-3 bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-royalMaroon-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-200"
                            >
                                Back to Main Desk
                            </button>

                        </div>
                    </div>
                )}

                {/* --- 4. INTERACTIVE SPOT EXPLORER (Muted Traditional Design Theme) --- */}
                <section id="discover" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
                    
                    {/* Header and Live Filter and Search Controls */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-royalGold-400/20 pb-8">
                        <div className="space-y-3 text-left">
                            <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Exploration Desk</span>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-royalMaroon-950">
                                Mapped Secret Spots
                            </h2>
                            <p className="text-slate-500 font-light text-sm max-w-lg">
                                Use the search desk or category filters below to locate specific waterfalls, beaches, and scenic valleys throughout the island.
                            </p>
                        </div>

                        {/* Search & Categories side-by-side */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full lg:w-auto">
                            {/* Search Box */}
                            <div className="relative w-full sm:w-72">
                                <input 
                                    type="text" 
                                    placeholder="Search spots..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-slate-350 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-royalGold-500 focus:border-royalGold-500 text-slate-800"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                                </svg>
                            </div>

                            {/* Category Filter Badges */}
                            <div className="flex gap-1.5 p-1 bg-slate-200/60 rounded-xl border border-slate-300 shrink-0 overflow-x-auto w-full sm:w-auto">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                                            activeCategory === category 
                                            ? 'bg-royalTeal text-royalGold-300 shadow-sm' 
                                            : 'text-slate-600 hover:text-royalMaroon-950 hover:bg-slate-300/40'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Spot Grid */}
                    {filteredSpots.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredSpots.map(spot => (
                                <article 
                                    key={spot.id} 
                                    className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:border-royalGold-500/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full shadow-md"
                                >
                                    {/* Image Container with Zoom */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                                        <img 
                                            src={spot.image} 
                                            alt={spot.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Destination Details */}
                                    <div className="p-6 flex flex-col flex-1 space-y-4 text-left">
                                        
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                                <span>{spot.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-450">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-bold text-slate-700">{spot.rating}</span>
                                                <span className="text-slate-400">({spot.reviews})</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-display text-xl font-bold text-royalMaroon-950 group-hover:text-royalMaroon-800 transition-colors duration-200">
                                                {spot.name}
                                            </h3>
                                            <p className="text-slate-650 text-sm font-light leading-relaxed">
                                                {spot.description}
                                            </p>
                                        </div>

                                        {/* Tag badges */}
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {spot.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Interactive Button */}
                                        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-[10px] uppercase font-bold text-slate-400">Verified Spot</span>
                                            <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-royalTeal hover:text-[#0c6b65] transition-colors duration-200">
                                                View Details
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-100/50 border border-slate-200 rounded-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-slate-400 mx-auto mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                            </svg>
                            <h3 className="text-lg font-bold text-slate-600 mb-1">No Secret Spots Found</h3>
                            <p className="text-slate-450 text-sm font-light">We couldn't find any spots matching "{searchQuery}".</p>
                        </div>
                    )}

                </section>

                {/* --- 5. ADVENTURE CLUB NEWSLETTER --- */}
                <section id="newsletter" className="py-24 bg-[#f4ebd9] border-t border-royalGold-500/20">
                    <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                        <div className="w-16 h-16 rounded-full bg-royalMaroon-800 text-royalGold-300 flex items-center justify-center mx-auto shadow-md border border-royalGold-400/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.626a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <div className="space-y-3">
                            <span className="text-xs uppercase tracking-widest font-extrabold text-royalMaroon-900">Sri Lankan Adventure Club</span>
                            <h2 className="font-display text-3xl font-extrabold text-royalMaroon-950">Join the Secret Travel Group</h2>
                            <p className="text-slate-650 font-light max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                                Subscribe to receive precise maps, safety coordinates, and guidelines for a brand new secret travel spot in Sri Lanka every single month.
                            </p>
                        </div>
                        <form className="max-w-md mx-auto flex gap-3 p-1.5 bg-white border border-slate-300 rounded-full focus-within:border-royalGold-500 shadow-sm transition-all duration-300">
                            <input 
                                type="email" 
                                required
                                placeholder="Enter your email address" 
                                className="bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-none flex-1 px-5 text-sm text-slate-800 placeholder-slate-400"
                            />
                            <button type="submit" className="px-6 py-3 bg-royalMaroon-800 text-royalGold-300 font-bold uppercase tracking-wider text-xs rounded-full hover:bg-royalMaroon-900 active:scale-95 transition-all duration-200">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

                {/* --- 6. FOOTER SECTION --- */}
                <footer className="border-t border-royalGold-500/20 bg-royalMaroon-900 text-[#FAF9F6] py-16 text-center text-xs space-y-6">
                    <div className="flex justify-center gap-6 text-royalGold-400 font-bold uppercase tracking-wider">
                        <a href="#hero" className="hover:text-royalGold-300 transition-colors">Home</a>
                        <a href="#features" className="hover:text-royalGold-300 transition-colors">Features</a>
                        <a href="#discover" className="hover:text-royalGold-300 transition-colors">Explorer Desk</a>
                        <a href="#newsletter" className="hover:text-royalGold-300 transition-colors">Adventure Club</a>
                    </div>
                    
                    <div className="text-royalGold-500/60 max-w-md mx-auto font-light leading-relaxed px-4">
                        Discover responsibly. Respect local cultures, protect historical sights, and practice strict waste management to preserve the natural beauty of the island.
                    </div>

                    <div className="border-t border-royalGold-600/10 pt-8 w-11/12 max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-slate-400 gap-4">
                        <div>
                            © {new Date().getFullYear()} SecretPlaces Sri Lanka. Coordinated with love by Local Nomads.
                        </div>
                        <div className="font-mono text-[10px] text-royalGold-400/40">
                            Powered by Laravel v{laravelVersion} (PHP v{phpVersion}) • React + Inertia
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
