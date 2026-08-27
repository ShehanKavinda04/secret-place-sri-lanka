import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { useState, useEffect } from 'react';
import { 
    MapPin, Star, ShieldCheck, Clock, Users, Globe, Check, 
    Accessibility, Calendar as CalendarIcon, Minus, Plus, Heart, 
    ChevronRight, ChevronDown, ChevronLeft, Map, Camera, X, MessageCircle, Mail
} from 'lucide-react';

export default function ExperienceDetail({ auth, experienceId, laravelVersion, phpVersion, initialLocation, initialPolicies = [], initialReviews = [] }) {
    const [locationData, setLocationData] = useState(initialLocation);
    const [policyData, setPolicyData] = useState(initialPolicies);
    const [reviewsData, setReviewsData] = useState(initialReviews);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 4);
        }, 10000); // 10s auto slide
        return () => clearInterval(timer);
    }, []);
    
    const { data: reviewForm, setData: setReviewForm, post: postReview, processing: submittingReview, reset: resetReview } = useForm({
        experience_key: experienceId,
        name: auth?.user?.name || '',
        rating: 5,
        review_text: ''
    });

    const submitReview = (e) => {
        e.preventDefault();
        postReview('/api/experience-reviews', {
            preserveScroll: true,
            onSuccess: () => resetReview('rating', 'review_text')
        });
    };

    useEffect(() => {
        if (!experienceId) return;

        const locationChannel = `experience-location.${experienceId}`;
        window.Echo.channel(locationChannel)
            .listen('ExperienceLocationUpdated', (e) => {
                if (e.location) {
                    setLocationData(e.location);
                }
            });
            
        const policyChannel = `experience-policy.${experienceId}`;
        window.Echo.channel(policyChannel)
            .listen('ExperiencePolicyUpdated', (e) => {
                if (e.policies) {
                    setPolicyData(e.policies);
                }
            });
            
        const reviewChannel = `experience-reviews.${experienceId}`;
        window.Echo.channel(reviewChannel)
            .listen('ExperienceReviewSubmitted', (e) => {
                if (e.review) {
                    setReviewsData(prev => [e.review, ...prev]);
                }
            });

        return () => {
            window.Echo.leaveChannel(locationChannel);
            window.Echo.leaveChannel(policyChannel);
            window.Echo.leaveChannel(reviewChannel);
        };
    }, [experienceId]);
    const experienceDetails = {
        'atamasthana': {
            title: "Atamasthana One-Day Circuit Pass",
            subtitle: "A highly optimized, pre-planned transport route linking all 8 main worship sites in the sacred city sequentially.",
            rating: 4.9,
            reviewsCount: 1240,
            location: "Anuradhapura Sacred City",
            price: 45,
            priceLkr: 13500,
            mainImage: "/images/atamasthana.jpg",
            gallery: ["/images/ruwanweli_maha_seya.png", "/images/jaya_sri_maha_bodhi.png", "/images/thuparamaya_1779380449379.png", "/images/abhayagiri_1779380471030.png"],
            duration: "8 Hours",
            groupSize: "Flexible",
            hostName: "Anuradhapura Transport Coop",
            hostAvatar: "ATC",
            overview: "Experience a seamless pilgrimage across the eight most sacred sites (Atamasthana) of Anuradhapura. Our optimized route avoids the midday heat and coordinates perfectly with pooja timings, offering an uninterrupted spiritual journey.",
            itinerary: [
                { step: 1, title: 'Morning Pooja at Sri Maha Bodhi', desc: 'Start early with the morning pooja at the sacred fig tree.' },
                { step: 2, title: 'Ruwanwelisaya & Thuparamaya', desc: 'Visit the majestic Ruwanwelisaya followed by the oldest stupa, Thuparamaya.' },
                { step: 3, title: 'Midday Rest & Dansal', desc: 'Rest during the peak heat at a local pilgrims rest house.' },
                { step: 4, title: 'Evening Monastic Tour', desc: 'Visit Abhayagiriya, Jetavanaramaya, and remaining sites as the evening cools.' }
            ]
        },
        'mihintale': {
            title: "Solosmasthana & Mihintale Sunrise Package",
            subtitle: "Early morning transport to Mihintale to witness the sunrise, followed by ancient monastery tours.",
            rating: 4.8,
            reviewsCount: 856,
            location: "Mihintale & Surroundings",
            price: 35,
            priceLkr: 10500,
            mainImage: "/images/mihintale_steps.png",
            gallery: [
                "/images/mihintale_sunrise_real_1.jpg", 
                "/images/mihintale_sunrise_real_2.jpg", 
                "/images/mihintale_sunrise_real_3.jpg", 
                "/images/mihintale_sunrise_real_4.jpg"
            ],
            duration: "6 Hours",
            groupSize: "Flexible",
            hostName: "Heritage Travels",
            hostAvatar: "HT",
            overview: "An unforgettable early morning pilgrimage. We pick you up before dawn to climb Mihintale's ancient stone steps and witness a breathtaking sunrise from Aradhana Gala, the birthplace of Buddhism in Sri Lanka.",
            itinerary: [
                { step: 1, title: 'Pre-Dawn Pickup', desc: 'Hotel pickup in Anuradhapura and comfortable transport to Mihintale.' },
                { step: 2, title: 'Sunrise at Aradhana Gala', desc: 'Climb the steps in the cool morning air and watch the sunrise over the plains.' },
                { step: 3, title: 'Mihintale Monastic Ruins', desc: 'Guided or self-guided exploration of the ancient hospital, Kantaka Cetiya, and refectory.' },
                { step: 4, title: 'Return Journey', desc: 'Smooth return transport to your accommodation in Anuradhapura.' }
            ]
        },
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
            gallery: ["/images/pottery_wheel.jpg", "/images/clay_molding.jpg", "/images/kiln_firing.jpg", "/images/heritage_crafts.png"],
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
            gallery: ["/images/yarn_dyeing.jpg", "/images/weaving_class.png", "/images/loom_setup.jpg", "/images/weaving_hands.jpg"],
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
            gallery: ["/images/spice_grinding.jpg", "/images/clay_pot_cooking.jpg", "/images/village_feast.jpg", "/images/village_culinary.png"],
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
        },
        'stone-carving-demo': {
            title: "Stone Sculpting Experience",
            subtitle: "Watch mesmerising demonstrations of granite carving, learning about ancient tools and sacred geometry.",
            rating: 4.8,
            reviewsCount: 115,
            location: "Anuradhapura",
            price: 30,
            priceLkr: 9000,
            mainImage: "/images/stone_demo.png",
            gallery: ["/images/stone_carving_tools.jpg", "/images/sacred_geometry.jpg", "/images/stone_sculpting_hands.jpg", "/images/stone_sculpting.png"],
            duration: "2-3 Hours",
            groupSize: "Max 8 People",
            hostName: "Anuradhapura Stonemasons",
            hostAvatar: "Anuradhapura+Stonemasons",
            overview: "Discover the sheer patience and incredible skill required for traditional Sri Lankan stone sculpting. From chiseling rough granite to polishing intricate designs, learn the ancient techniques that built the sacred city of Anuradhapura.",
            itinerary: [
                { step: 1, title: 'Introduction to Tools & Stone', desc: 'Learn about the traditional tools (chisel, mallet) and how to identify the right granite.' },
                { step: 2, title: 'Sacred Geometry Class', desc: 'Understand the mathematical principles and ancient designs (like the moonstone) before carving.' },
                { step: 3, title: 'Masterclass Demonstration', desc: 'Watch a master stonemason swiftly and precisely shape a rough block of granite.' },
                { step: 4, title: 'Hands-on Sculpting', desc: 'Try your hand at chiseling a simple design onto a small stone under expert guidance.' }
            ]
        }
    };

    const experience = experienceDetails[experienceId] || experienceDetails['craft-village-tour'];

    const [guests, setGuests] = useState({ adults: 1, children: 0 });
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('9:00 AM (Morning Session)');
    const [openAccordion, setOpenAccordion] = useState(null);
    const [bookingState, setBookingState] = useState({ status: 'idle', error: '' });
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [showContactModal, setShowContactModal] = useState(false);
    const [contactName, setContactName] = useState(auth?.user?.name || '');
    const [contactEmail, setContactEmail] = useState(auth?.user?.email || '');
    const [contactPhone, setContactPhone] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [contactStatus, setContactStatus] = useState('idle');

    const toggleAccordion = (index) => {
        setOpenAccordion(prev => prev === index ? null : index);
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

    const handleBooking = () => {
        if (!date) {
            setBookingState({ status: 'error', error: 'Please select a date for your experience.' });
            return;
        }
        
        setBookingState({ status: 'processing', error: '' });
        
        // Simulate a network request
        setTimeout(() => {
            setBookingState({ status: 'confirmed', error: '' });
        }, 1500);
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactStatus('sending');
        try {
            await window.axios.post('/api/experience-contact', {
                experience_key: experienceId,
                experience_title: experience.title,
                experience_host: experience.hostName,
                name: contactName,
                email: contactEmail,
                phone: contactPhone,
                message: contactMessage
            });
            setContactStatus('sent');
            setTimeout(() => {
                setShowContactModal(false);
                setContactStatus('idle');
                setContactMessage('');
                setContactPhone('');
            }, 3000);
        } catch (error) {
            console.error(error);
            setContactStatus('idle');
            alert('Failed to send email. Please try again.');
        }
    };

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

                            {/* Grid Image Gallery or Slider */}
                            {experienceId === 'mihintale' ? (
                                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
                                    {experience.gallery.map((img, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                        >
                                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    
                                    {/* Slider Controls */}
                                    <button 
                                        onClick={() => setCurrentSlide((prev) => (prev === 0 ? experience.gallery.length - 1 : prev - 1))}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button 
                                        onClick={() => setCurrentSlide((prev) => (prev + 1) % experience.gallery.length)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                    
                                    {/* Slider Indicators */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {experience.gallery.map((_, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => setCurrentSlide(idx)}
                                                aria-label={`Go to slide ${idx + 1}`}
                                                className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
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
                            )}
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
                                {locationData ? (
                                    <>
                                        <p className="text-slate-600 mb-6 flex items-start gap-2">
                                            <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" />
                                            <span>{locationData.address}<br/>GPS: {locationData.gps_lat}° N, {locationData.gps_lng}° E</span>
                                        </p>
                                        <div className="w-full h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative mb-6 border border-slate-300">
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                style={{ border: 0 }} 
                                                loading="lazy" 
                                                allowFullScreen 
                                                referrerPolicy="no-referrer-when-downgrade" 
                                                src={`https://maps.google.com/maps?q=${locationData.gps_lat},${locationData.gps_lng}&hl=en&z=14&output=embed`}
                                            ></iframe>
                                        </div>
                                        <div className="bg-royalMaroon-950/5 rounded-xl p-5 border border-royalMaroon-950/10">
                                            <h4 className="font-bold text-royalMaroon-950 mb-2 text-sm uppercase tracking-wider">How to get there</h4>
                                            <ul className="text-sm text-slate-700 space-y-2">
                                                {locationData.directions_tuktuk && <li><strong>By Tuk-Tuk:</strong> {locationData.directions_tuktuk}</li>}
                                                {locationData.directions_bus && <li><strong>By Bus:</strong> {locationData.directions_bus}</li>}
                                                {locationData.directions_car && <li><strong>By Private Car:</strong> {locationData.directions_car}</li>}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-slate-500 italic">Location details will be available soon.</p>
                                )}
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
                                        <button 
                                            onClick={() => setShowContactModal(true)}
                                            className="px-6 py-2 border-2 border-royalMaroon-950 text-royalMaroon-950 font-semibold rounded-lg hover:bg-royalMaroon-950 hover:text-white transition-colors"
                                        >
                                            Contact Host
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* 8. Guidelines & Policy Accordions */}
                            <section className="mb-12">
                                <h2 className="text-3xl font-display font-light text-royalMaroon-950 mb-6">Important Information</h2>
                                <div className="space-y-3">
                                    {(policyData && policyData.length > 0 ? policyData : [
                                        { title: 'Dress Code', content: 'We recommend comfortable, loose-fitting cotton clothing suitable for the tropical climate. Modest attire is appreciated when visiting village homes.' },
                                        { title: 'Cancellation Policy', content: 'Free cancellation up to 24 hours before the experience starts for a full refund. Cancellations within 24 hours are non-refundable.' },
                                        { title: 'Safety Guidelines', content: 'Safety goggles and aprons will be provided during the hands-on crafting session. Please follow all instructions given by the master artisans when handling tools.' }
                                    ]).map((acc, idx) => (
                                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                            <button 
                                                type="button"
                                                onClick={() => toggleAccordion(idx)}
                                                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors cursor-pointer text-left focus:outline-none"
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
                                    <span className="text-slate-500 ml-2">({reviewsData.length} verified reviews)</span>
                                </div>
                                
                                {/* Write a Review Form */}
                                <form onSubmit={submitReview} className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Leave a Review</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                                            <input 
                                                type="text" 
                                                className="w-full rounded-lg border-slate-300 focus:border-royalMaroon-950 focus:ring-royalMaroon-950" 
                                                value={reviewForm.name}
                                                onChange={e => setReviewForm('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                                            <div className="flex items-center gap-2 h-[42px]">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button 
                                                        type="button" 
                                                        key={star} 
                                                        onClick={() => setReviewForm('rating', star)}
                                                        className="focus:outline-none transition-transform hover:scale-110"
                                                    >
                                                        <Star className={`w-6 h-6 ${reviewForm.rating >= star ? 'fill-royalGold-500 text-royalGold-500' : 'text-slate-300'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Your Review</label>
                                        <textarea 
                                            rows="3" 
                                            className="w-full rounded-lg border-slate-300 focus:border-royalMaroon-950 focus:ring-royalMaroon-950"
                                            value={reviewForm.review_text}
                                            onChange={e => setReviewForm('review_text', e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={submittingReview}
                                        className="bg-royalMaroon-950 text-white px-6 py-2 rounded-lg font-semibold hover:bg-royalMaroon-900 transition-colors disabled:opacity-50"
                                    >
                                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>

                                <div className="space-y-6">
                                    {reviewsData.map((rev) => (
                                        <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={rev.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.name)}&background=random`} className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <h4 className="font-bold text-slate-800">{rev.name}</h4>
                                                        <p className="text-xs text-slate-500">{new Date(rev.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • Verified Buyer</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 text-royalGold-500">
                                                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= rev.rating ? 'fill-current' : 'text-slate-200'}`} />)}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm">
                                                "{rev.review_text}"
                                            </p>
                                        </div>
                                    ))}
                                    {reviewsData.length === 0 && (
                                        <p className="text-slate-500 text-center py-4">No reviews yet. Be the first to leave one!</p>
                                    )}
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
                                    <button 
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`p-2 transition-colors rounded-full ${isWishlisted ? 'text-[#FF6B35] bg-[#FF6B35]/10' : 'text-slate-400 hover:text-[#FF6B35] hover:bg-[#FF6B35]/10'}`}
                                    >
                                        <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                <div className="border border-slate-300 rounded-xl overflow-hidden mb-6">
                                    <div className={`p-3 border-b border-slate-300 bg-slate-50 ${bookingState.status === 'error' && !date ? 'ring-2 ring-red-500' : ''}`}>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Date</label>
                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 text-slate-400 mr-2" />
                                            <input 
                                                type="date" 
                                                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-800"
                                                value={date}
                                                onChange={(e) => {
                                                    setDate(e.target.value);
                                                    if (bookingState.status === 'error') setBookingState({ status: 'idle', error: '' });
                                                }}
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
                                            <option value="9:00 AM (Morning Session)">9:00 AM (Morning Session)</option>
                                            <option value="2:00 PM (Afternoon Session)">2:00 PM (Afternoon Session)</option>
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
                                
                                {bookingState.status === 'error' && (
                                    <div className="text-red-600 text-sm font-semibold mb-4 text-center">
                                        {bookingState.error}
                                    </div>
                                )}
                                
                                {bookingState.status === 'confirmed' ? (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center mb-3">
                                        <div className="flex justify-center mb-2">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <Check className="w-6 h-6 text-emerald-600" />
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-emerald-800 text-lg mb-1">Booking Confirmed!</h4>
                                        <p className="text-sm text-emerald-600">See you on {new Date(date).toLocaleDateString()} at {timeSlot.split(' ')[0]}.</p>
                                    </div>
                                ) : (
                                    <>
                                        <button 
                                            onClick={handleBooking}
                                            disabled={bookingState.status === 'processing'}
                                            className="w-full flex justify-center items-center gap-2 bg-[#FF6B35] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#e85a25] transition-colors shadow-lg shadow-[#FF6B35]/30 mb-3 disabled:opacity-70"
                                        >
                                            {bookingState.status === 'processing' ? 'Processing...' : 'Book Now'}
                                        </button>
                                        <button 
                                            onClick={() => setIsWishlisted(!isWishlisted)}
                                            className="w-full flex justify-center items-center gap-2 bg-white text-slate-700 font-semibold py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
                                        >
                                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#FF6B35] text-[#FF6B35]' : 'text-slate-400'}`} />
                                            {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                                        </button>
                                        <p className="text-center text-xs text-slate-500 mt-4">You won't be charged yet.</p>
                                    </>
                                )}
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

            {/* Contact Host Modal */}
            {showContactModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="font-display text-2xl text-royalMaroon-950">Contact {experience.hostName}</h3>
                            <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            {contactStatus === 'sent' ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h4>
                                    <p className="text-slate-600">The host will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Inquiry regarding</label>
                                        <input type="text" disabled value={experience.title} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-600" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder="John Doe" 
                                                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50 focus:border-royalGold-500 transition-all" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Your Email</label>
                                            <input 
                                                type="email" 
                                                required
                                                value={contactEmail}
                                                onChange={(e) => setContactEmail(e.target.value)}
                                                placeholder="john@example.com" 
                                                className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50 focus:border-royalGold-500 transition-all" 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Contact Number (Optional)</label>
                                        <input 
                                            type="tel" 
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                            placeholder="+94 77 123 4567" 
                                            className="w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50 focus:border-royalGold-500 transition-all" 
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                                        <textarea 
                                            required
                                            rows="4"
                                            value={contactMessage}
                                            onChange={(e) => setContactMessage(e.target.value)}
                                            placeholder={`Hi ${experience.hostName}, I am very interested in this experience. Could you tell me more about...`}
                                            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-royalGold-500/50 focus:border-royalGold-500 transition-all"
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={contactStatus === 'sending'}
                                        className="w-full bg-royalMaroon-950 text-white font-semibold rounded-lg py-3 hover:bg-royalMaroon-900 transition-colors disabled:opacity-70"
                                    >
                                        {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
