import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { useState } from 'react';
import { 
    MapPin, Star, ShieldCheck, Clock, Users, Globe, Check, 
    Accessibility, Calendar as CalendarIcon, Minus, Plus, Heart, 
    ChevronRight, ChevronDown, Map, Camera
} from 'lucide-react';

export default function ExperienceDetail({ auth, experienceId, laravelVersion, phpVersion }) {
    const experienceDetails = {
        'craft-village-tour': {
            title: "Kala Grama Artisan Tour",
            subtitle: "Guided immersive journey through traditional artisan villages in Anuradhapura.",
            rating: 4.8,
            reviewsCount: 142,
            location: "Anuradhapura Surroundings",
            price: 25,
            priceLkr: 7500,
            mainImage: "/images/heritage_crafts.png",
            gallery: ["/images/clay_workshop.png", "/images/stone_demo.png", "/images/handloom_experience.png", "/images/village_culinary.png"],
            duration: "3-4 Hours",
            groupSize: "Max 10 People",
            hostName: "Rajarata Craftsmen Cooperative",
            hostAvatar: "Rajarata+Craftsmen",
            overview: "Step into the living history of Sri Lanka with a guided journey through Kala Grama, dedicated artisan villages where ancient techniques are preserved. Hear the stories of heritage families, witness their dedication, and provide direct economic support to local MSME artisans keeping these traditions alive.",
            itinerary: [
                { step: 1, title: 'Welcome & Refreshments', desc: 'Arrive at the village and enjoy traditional Sri Lankan herbal tea (Belimal or Ranawara) served with jaggery.' },
                { step: 2, title: 'Live Master Class Demo', desc: 'Watch master artisans demonstrating metal, wood, or pottery crafting techniques passed down through generations.' },
                { step: 3, title: 'Hands-on Crafting Session', desc: 'Roll up your sleeves! Guided by an artisan, try your hand at the craft and create your own small keepsake.' },
                { step: 4, title: 'MSME Artisan Shop Visit', desc: 'Browse the cooperative shop to purchase authentic crafts directly from the makers, supporting the local economy.' }
            ]
        },
        'pottery-workshop': {
            title: "Hands-on Clay Workshop",
            subtitle: "Learn the ancient techniques of wheel-throwing and hand-building from hereditary potters.",
            rating: 4.9,
            reviewsCount: 188,
            location: "Anuradhapura",
            price: 35,
            priceLkr: 10500,
            mainImage: "/images/clay_workshop.png",
            gallery: ["/images/heritage_crafts.png", "/images/stone_demo.png", "/images/handloom_experience.png", "/images/village_culinary.png"],
            duration: "2-3 Hours",
            groupSize: "Max 8 People",
            hostName: "Anuradhapura Potters Guild",
            hostAvatar: "Potters+Guild",
            overview: "Get your hands dirty and learn the ancient art of pottery from hereditary craftsmen. Shape your own terracotta souvenirs and understand the cultural significance of traditional clay items in Sri Lankan households.",
            itinerary: [
                { step: 1, title: 'Introduction to Clay', desc: 'Learn about sourcing and preparing the perfect terracotta clay from local riverbanks.' },
                { step: 2, title: 'Wheel-Throwing Demo', desc: 'Watch the mesmerizing speed and precision of a master potter on the traditional wheel.' },
                { step: 3, title: 'Your Turn at the Wheel', desc: 'With guidance, try shaping your own small clay vessel on the wheel.' },
                { step: 4, title: 'Hand-building & Decorating', desc: 'Learn to add traditional motifs and designs to your piece before it goes to the kiln.' }
            ]
        },
        'handloom-experience': {
            title: "Rajarata Handloom & Weaving Experience",
            subtitle: "Experience the art of authentic handloom weaving and natural dyeing techniques.",
            rating: 4.7,
            reviewsCount: 96,
            location: "Polonnaruwa / Rajarata",
            price: 30,
            priceLkr: 9000,
            mainImage: "/images/handloom_experience.png",
            gallery: ["/images/weaving_class.png", "/images/heritage_crafts.png", "/images/clay_workshop.png", "/images/village_culinary.png"],
            duration: "3 Hours",
            groupSize: "Max 12 People",
            hostName: "Rajarata Women's Weaving Coop",
            hostAvatar: "Weaving+Coop",
            overview: "Join a vibrant community of female weavers and discover the intricate process of creating traditional Sri Lankan handloom textiles. From dyeing the yarn to operating the wooden looms, immerse yourself in this colorful heritage craft.",
            itinerary: [
                { step: 1, title: 'Yarn Preparation & Dyeing', desc: 'See how cotton yarn is prepared and dyed using vibrant, sometimes natural, colors.' },
                { step: 2, title: 'Loom Setup', desc: 'Understand the complex mechanics of setting up the warp threads on a traditional wooden loom.' },
                { step: 3, title: 'Weaving Demonstration', desc: 'Watch the rhythmic and fast-paced weaving process.' },
                { step: 4, title: 'Try Weaving', desc: 'Sit at a loom and try weaving a few rows yourself to understand the skill involved.' }
            ]
        },
        'culinary-walk': {
            title: "Village Culinary & Heritage Walk",
            subtitle: "Walk through heritage villages and participate in traditional clay-pot culinary experiences.",
            rating: 4.9,
            reviewsCount: 210,
            location: "Mihintale Village",
            price: 40,
            priceLkr: 12000,
            mainImage: "/images/village_culinary.png",
            gallery: ["/images/clay_workshop.png", "/images/handloom_experience.png", "/images/heritage_crafts.png", "/images/stone_demo.png"],
            duration: "4 Hours",
            groupSize: "Max 6 People",
            hostName: "Mihintale Heritage Kitchen",
            hostAvatar: "Heritage+Kitchen",
            overview: "Embark on a culinary journey through a traditional Sri Lankan village. Learn to identify local spices, harvest fresh vegetables, and cook an authentic meal in clay pots over an open wood fire.",
            itinerary: [
                { step: 1, title: 'Village & Farm Walk', desc: 'Take a guided walk through the village farms to pick fresh vegetables and herbs.' },
                { step: 2, title: 'Spice Preparation', desc: 'Learn the secrets of Sri Lankan spices and help grind them using a traditional stone mortar.' },
                { step: 3, title: 'Clay Pot Cooking', desc: 'Cook alongside village women over an open wood fire using traditional clay pots.' },
                { step: 4, title: 'Traditional Feast', desc: 'Sit down to enjoy the delicious meal you helped prepare, served on a lotus leaf.' }
            ]
        }
    };

    const experience = experienceDetails[experienceId] || experienceDetails['craft-village-tour'];

    const [guests, setGuests] = useState({ adults: 1, children: 0 });
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('9:00 AM');
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleGuestChange = (type, operation) => {
        setGuests(prev => {
            const current = prev[type];
            if (operation === 'inc') return { ...prev, [type]: current + 1 };
            if (operation === 'dec' && current > (type === 'adults' ? 1 : 0)) return { ...prev, [type]: current - 1 };
            return prev;
        });
    };

    const totalCost = (guests.adults * experience.price) + (guests.children * (experience.price * 0.5));
    const totalCostLkr = (guests.adults * experience.priceLkr) + (guests.children * (experience.priceLkr * 0.5));

    return (
        <>
            <Head title={`${experience.title} - Secret Places Sri Lanka`} />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Section (Maroon Background) */}
                <div className="bg-royalMaroon-950 text-white relative">
                    <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                        
                        {/* 1. Header & Breadcrumb Navigation */}
                        <div className="mb-8">
                            <nav className="flex text-sm text-white/70 mb-4" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <Link href="/" className="hover:text-royalGold-500 transition-colors">Home</Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <ChevronRight className="w-4 h-4 mx-1" />
                                            <Link href="/category/heritage" className="hover:text-royalGold-500 transition-colors">MSME Experiences</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <ChevronRight className="w-4 h-4 mx-1" />
                                            <span className="ml-1 font-medium">Anuradhapura</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <ChevronRight className="w-4 h-4 mx-1" />
                                            <span className="ml-1 text-white font-bold">{experience.title}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Spot
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-royalGold-500/20 text-royalGold-400 border border-royalGold-500/30">
                                    <Map className="w-3.5 h-3.5 mr-1" /> Cultural Heritage
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30">
                                    <Check className="w-3.5 h-3.5 mr-1" /> Instant Confirmation
                                </span>
                            </div>
                        </div>

                        {/* 2. Hero Section Titles */}
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-display font-light text-white mb-3">
                                {experience.title}
                            </h1>
                            <p className="text-lg text-white/80 font-light mb-6 max-w-3xl leading-relaxed">{experience.subtitle}</p>
                            
                            <div className="flex items-center gap-4 text-sm font-medium mb-8">
                                <div className="flex items-center text-royalGold-500">
                                    <Star className="w-5 h-5 fill-current mr-1" />
                                    <span className="text-white text-base">{experience.rating} <span className="text-white/60 font-normal font-light">({experience.reviewsCount} Reviews)</span></span>
                                </div>
                                <span className="text-white/30">|</span>
                                <div className="flex items-center text-white/80">
                                    <MapPin className="w-5 h-5 text-royalGold-500 mr-1" />
                                    {experience.location}
                                </div>
                            </div>

                            {/* Grid Image Gallery */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[500px]">
                                <div className="md:col-span-2 relative rounded-2xl overflow-hidden group">
                                    <img src={experience.mainImage} alt={experience.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur text-royalMaroon-950 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white transition-colors shadow-lg">
                                        <Camera className="w-5 h-5" /> Video Preview
                                    </button>
                                </div>
                                <div className="hidden md:grid grid-rows-2 gap-4 h-full">
                                    <div className="rounded-2xl overflow-hidden relative group">
                                        <img src={experience.gallery[0]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl overflow-hidden relative group">
                                            <img src={experience.gallery[1]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </div>
                                        <div className="rounded-2xl overflow-hidden relative group">
                                            <img src={experience.gallery[2]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-royalMaroon-950/40 flex items-center justify-center cursor-pointer hover:bg-royalMaroon-950/50 transition-colors">
                                                <span className="text-white font-bold text-lg">+4 Photos</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                    
                    <div className="flex flex-col lg:flex-row gap-12 relative">
                        {/* Left Content Area */}
                        <div className="lg:w-2/3">
                            
                            {/* 3. Key Highlights & Specifications Bar */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-10 flex flex-wrap gap-y-6 justify-between">
                                <div className="w-1/2 sm:w-1/4 flex flex-col items-start">
                                    <Clock className="w-6 h-6 text-royalGold-500 mb-2" />
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Duration</span>
                                    <span className="text-sm font-semibold text-slate-800">{experience.duration}</span>
                                </div>
                                <div className="w-1/2 sm:w-1/4 flex flex-col items-start">
                                    <Users className="w-6 h-6 text-royalGold-500 mb-2" />
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Group Size</span>
                                    <span className="text-sm font-semibold text-slate-800">{experience.groupSize}</span>
                                </div>
                                <div className="w-1/2 sm:w-1/4 flex flex-col items-start">
                                    <Globe className="w-6 h-6 text-royalGold-500 mb-2" />
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Languages</span>
                                    <span className="text-sm font-semibold text-slate-800">Sinhala / English</span>
                                </div>
                                <div className="w-1/2 sm:w-1/4 flex flex-col items-start">
                                    <Accessibility className="w-6 h-6 text-royalGold-500 mb-2" />
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Accessibility</span>
                                    <span className="text-sm font-semibold text-slate-800">Kid-friendly</span>
                                </div>
                                <div className="w-full mt-4 pt-4 border-t border-slate-100">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-2">Inclusions</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">Local guide</span>
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">Artisan interactions</span>
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">Light refreshments</span>
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">Traditional souvenir</span>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Detailed Description & Itinerary Timeline */}
                            <section className="mb-12">
                                <h2 className="text-3xl font-display font-light text-royalMaroon-950 mb-4">Experience Overview</h2>
                                <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                                    {experience.overview}
                                </p>

                                <h3 className="text-xl font-bold text-slate-800 mb-6 font-display">Itinerary Timeline</h3>
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                    
                                    {experience.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-royalGold-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                                                {item.step}
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                                                </div>
                                                <p className="text-slate-600 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 6. Location & Interactive Map View */}
                            <section className="mb-12">
                                <h2 className="text-3xl font-display font-light text-royalMaroon-950 mb-4">Location & Meeting Point</h2>
                                <p className="text-slate-600 mb-6 flex items-start gap-2">
                                    <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
                                    <span>Main Entrance, Kala Grama Cooperative Center, Anuradhapura Surroundings.<br/>GPS: 8.3114° N, 80.4037° E</span>
                                </p>
                                <div className="w-full h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative mb-6 border border-slate-300">
                                    {/* Placeholder for actual Mapbox/Leaflet map */}
                                    <div className="absolute inset-0 bg-[#e5e7eb] flex flex-col items-center justify-center">
                                        <Map className="w-12 h-12 text-slate-400 mb-2" />
                                        <span className="text-slate-500 font-medium text-sm">Interactive Map View</span>
                                    </div>
                                </div>
                                <div className="bg-royalMaroon-950/5 rounded-xl p-5 border border-royalMaroon-950/10">
                                    <h4 className="font-bold text-royalMaroon-950 mb-2 text-sm uppercase tracking-wider">How to get there</h4>
                                    <ul className="text-sm text-slate-700 space-y-2">
                                        <li><strong>By Tuk-Tuk:</strong> Approx. 15 mins from Anuradhapura new town (Rs. 500 - 800).</li>
                                        <li><strong>By Bus:</strong> Take route 34/2 towards Mihintale, alight at the cooperative junction.</li>
                                        <li><strong>By Private Car:</strong> Ample free parking available at the visitor center.</li>
                                    </ul>
                                </div>
                            </section>

                            {/* 7. MSME Host Profile */}
                            <section className="mb-12 pt-10 border-t border-slate-200">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-royalGold-500/30">
                                        <img src={`https://ui-avatars.com/api/?name=${experience.hostAvatar}&background=40030a&color=fff&size=128`} alt="Host Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h2 className="text-3xl font-light text-slate-800 font-display mb-1">Hosted by {experience.hostName}</h2>
                                        <p className="text-sm text-slate-500 mb-4">Multi-generational artisans • Hosting since 2018</p>
                                        <p className="text-slate-600 mb-4 max-w-2xl">
                                            Our cooperative unites over 40 family-run MSMEs across the region. We are passionate about sharing our ancestral crafting techniques with visitors to preserve our heritage and sustain our rural communities.
                                        </p>
                                        <button className="px-6 py-2 border-2 border-royalMaroon-950 text-royalMaroon-950 font-semibold rounded-lg hover:bg-royalMaroon-950 hover:text-white transition-colors">
                                            Contact Host
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 8. Guidelines & Policy Accordions */}
                            <section className="mb-12">
                                <h2 className="text-3xl font-display font-light text-royalMaroon-950 mb-6">Important Information</h2>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Dress Code', content: 'We recommend comfortable, loose-fitting cotton clothing suitable for the tropical climate. Modest attire is appreciated when visiting village homes.' },
                                        { title: 'Cancellation Policy', content: 'Free cancellation up to 24 hours before the experience starts for a full refund. Cancellations within 24 hours are non-refundable.' },
                                        { title: 'Safety Guidelines', content: 'Safety goggles and aprons will be provided during the hands-on crafting session. Please follow all instructions given by the master artisans when handling tools.' }
                                    ].map((acc, idx) => (
                                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                            <button 
                                                onClick={() => toggleAccordion(idx)}
                                                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="font-semibold text-slate-800">{acc.title}</span>
                                                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openAccordion === idx ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openAccordion === idx && (
                                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-slate-600 text-sm">
                                                    {acc.content}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 9. Customer Reviews */}
                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <Star className="w-8 h-8 fill-royalGold-500 text-royalGold-500" />
                                    <h2 className="text-4xl font-light text-slate-800 font-display">4.8 <span className="text-xl font-normal text-slate-500">/ 5.0</span></h2>
                                    <span className="text-slate-500 ml-2">({experience.reviewsCount} verified reviews)</span>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 border-b border-slate-200 pb-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-700">Value for Money</span>
                                        <div className="w-1/2 h-2 bg-slate-200 rounded-full overflow-hidden"><div className="w-[95%] h-full bg-royalMaroon-950"></div></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-700">Guide Knowledge</span>
                                        <div className="w-1/2 h-2 bg-slate-200 rounded-full overflow-hidden"><div className="w-[100%] h-full bg-royalMaroon-950"></div></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-700">Experience</span>
                                        <div className="w-1/2 h-2 bg-slate-200 rounded-full overflow-hidden"><div className="w-[98%] h-full bg-royalMaroon-950"></div></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-700">Cleanliness</span>
                                        <div className="w-1/2 h-2 bg-slate-200 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-royalMaroon-950"></div></div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <img src="https://ui-avatars.com/api/?name=Sarah+M&background=random" className="w-10 h-10 rounded-full" />
                                                <div>
                                                    <h4 className="font-bold text-slate-800">Sarah M.</h4>
                                                    <p className="text-xs text-slate-500">August 2026 • Verified Buyer</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-royalGold-500">
                                                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm">
                                            "Incredible experience! The artisans were so patient while teaching us to carve. It was amazing to see how much skill goes into these traditional crafts. The herbal tea was a lovely touch. Highly recommend to anyone visiting Anuradhapura!"
                                        </p>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Right Sidebar - 5. Sticky Booking & Dynamic Pricing Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-6 z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-slate-900">${experience.price}</span>
                                            <span className="text-sm text-slate-500">/ person</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">LKR {experience.priceLkr.toLocaleString()} approx.</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-[#FF6B35] transition-colors rounded-full hover:bg-[#FF6B35]/10">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="border border-slate-300 rounded-xl overflow-hidden mb-6">
                                    <div className="p-3 border-b border-slate-300 bg-slate-50">
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Date</label>
                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 text-slate-400 mr-2" />
                                            <input 
                                                type="date" 
                                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-800"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3 border-b border-slate-300 bg-white">
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Time Slot</label>
                                        <select 
                                            className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-800 cursor-pointer"
                                            value={timeSlot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                        >
                                            <option>9:00 AM (Morning Session)</option>
                                            <option>2:00 PM (Afternoon Session)</option>
                                        </select>
                                    </div>
                                    <div className="p-4 bg-slate-50 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold text-sm text-slate-800">Adults</div>
                                                <div className="text-xs text-slate-500">Age 13+</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleGuestChange('adults', 'dec')} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-800 hover:text-slate-800 transition-colors">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-4 text-center font-semibold text-slate-800">{guests.adults}</span>
                                                <button onClick={() => handleGuestChange('adults', 'inc')} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-800 hover:text-slate-800 transition-colors">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold text-sm text-slate-800">Children</div>
                                                <div className="text-xs text-slate-500">Age 4-12 (50% Off)</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleGuestChange('children', 'dec')} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-800 hover:text-slate-800 transition-colors">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-4 text-center font-semibold text-slate-800">{guests.children}</span>
                                                <button onClick={() => handleGuestChange('children', 'inc')} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-800 hover:text-slate-800 transition-colors">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-6 py-4 border-t border-slate-200">
                                    <span className="font-bold text-slate-800">Total</span>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-slate-900">${totalCost}</div>
                                        <div className="text-xs text-slate-500">LKR {totalCostLkr.toLocaleString()}</div>
                                    </div>
                                </div>

                                <button className="w-full bg-[#FF6B35] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#e85a25] transition-colors shadow-lg shadow-[#FF6B35]/30 mb-3">
                                    Book Now
                                </button>
                                <button className="w-full bg-white text-slate-700 font-semibold py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors">
                                    Add to Wishlist
                                </button>
                                <p className="text-center text-xs text-slate-500 mt-4">You won't be charged yet.</p>
                            </div>
                        </div>

                    </div>

                    {/* 10. Recommended / Similar MSME Experiences Grid */}
                    <section className="mt-16 pt-16 border-t border-slate-200">
                        <h2 className="text-3xl font-display font-light text-royalMaroon-950 mb-8">More Experiences You Might Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'Hands-on Clay Pottery Workshop', location: 'Anuradhapura', image: '/images/clay_workshop.png', rating: 4.9, price: 35 },
                                { title: 'Rajarata Handloom Weaving Tour', location: 'Polonnaruwa', image: '/images/handloom_experience.png', rating: 4.7, price: 20 },
                                { title: 'Village Culinary & Heritage Walk', location: 'Mihintale', image: '/images/village_culinary.png', rating: 4.9, price: 40 },
                                { title: 'Stone Sculpting Experience', location: 'Anuradhapura', image: '/images/stone_demo.png', rating: 4.8, price: 30 }
                            ].map((sim, idx) => (
                                <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer group">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img src={sim.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center">
                                            <Star className="w-3 h-3 fill-royalGold-500 text-royalGold-500 mr-1" /> {sim.rating}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs text-royalMaroon-950 font-semibold mb-1 uppercase tracking-wider">{sim.location}</div>
                                        <h4 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-[#FF6B35] transition-colors">{sim.title}</h4>
                                        <div className="font-bold text-slate-900 text-sm">From ${sim.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
