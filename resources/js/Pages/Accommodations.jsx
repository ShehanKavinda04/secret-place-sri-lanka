import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
    Search, MapPin, Star, Wifi, Wind, Coffee, Car, 
    ShoppingCart, Heart, User, ChevronDown, Check, X,
    Calendar, Users, CreditCard, ChevronRight, Menu, Home,
    Navigation, Utensils, Phone, Mail, Globe, ArrowLeft, Plus, Minus,
    Compass, Sparkles, Map, CheckCircle2, Crown, Filter, RotateCcw,
    Waves, Send, ArrowRight, Share2, MessageSquare, ShieldCheck,
    Bike, Footprints
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Removed static ACCOMMODATIONS array

const FOOD_MENU = [
    { 
        id: 1, 
        name: "Authentic Sinhala Rice & Curry Banquet (ඇඹුල් තියල් සහ සහල්)", 
        category: "SINHALA TRADITIONAL", 
        mealType: "LUNCH",
        price: 4500, 
        tags: ["Traditional Heritage", "Clay Pot", "Organic"], 
        time: "15 mins",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Organic Red Matara Kakulu rice served with Southern fish Ambul Thiyal, tempered Parippu (dhal), fresh Pol Sambol, Gotukola Mallum, and crispy papadam in authentic clay pots.",
        ingredients: "Red Kakulu Rice, Fresh Tuna Fish, Goraka, Coconut Milk, Sri Lankan Spices, Fresh Coconut, Gotukola, Dhal"
    },
    { 
        id: 2, 
        name: "Crispy Hoppers (Appa) & Egg Hoppers with Seeni Sambol (ආප්ප)", 
        category: "SINHALA TRADITIONAL", 
        mealType: "BREAKFAST",
        price: 2800, 
        tags: ["Live Station", "Signature Sinhala", "Vegetarian Option"], 
        time: "10 mins",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Bowl-shaped crispy fermented rice flour pancakes with soft spongy centers, served with golden farm-egg hoppers, sweet & spicy caramelized seeni sambol, and spicy lunu miris.",
        ingredients: "Fermented Rice Flour, Coconut Milk, Toddy Yeast, Farm-Fresh Eggs, Caramelized Onions, Chili Flakes"
    },
    { 
        id: 3, 
        name: "Pol Roti with Katta Sambol & Lunu Miris (පොල් රොටී)", 
        category: "STREET FOOD & ROTIS", 
        mealType: "BREAKFAST",
        price: 2200, 
        tags: ["Village Style", "Spicy", "Authentic"], 
        time: "10 mins",
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Warm, thick griddle-baked flatbreads packed with freshly grated coconut and green chilies, served with fiery crushed chili-lime lunu miris and dried Maldive fish katta sambol.",
        ingredients: "Stoneground Wheat Flour, Fresh Scraped Coconut, Green Chilies, Red Onions, Lime Juice, Maldive Fish"
    },
    { 
        id: 4, 
        name: "Jaffna Lagoon Crab Curry with Murunga (යාපනයේ කකුළු කරිය)", 
        category: "JAFFNA TAMIL", 
        mealType: "DINNER",
        price: 8500, 
        tags: ["Jaffna Specialty", "Seafood Masterpiece", "Signature Spicy"], 
        time: "25 mins",
        image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Succulent wild blue lagoon crabs stewed in fragrant roasted Jaffna curry powder, fresh drumstick (murunga) leaves, rich coconut milk, tamarind, and fennel seeds.",
        ingredients: "Fresh Blue Lagoon Crabs, Jaffna Roasted Curry Powder, Murunga Leaves, Coconut Cream, Tamarind, Cumin"
    },
    { 
        id: 5, 
        name: "Jaffna Idiyappam (String Hoppers) with Sothi & Chutney (ඉඳිආප්ප)", 
        category: "JAFFNA TAMIL", 
        mealType: "BREAKFAST",
        price: 3200, 
        tags: ["Tamil Heritage", "Gluten-Free", "Vegetarian"], 
        time: "12 mins",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Delicate steamed rice-flour noodle nests served with creamy coconut-turmeric Jaffna sothi gravy, fiery coconut pol sambol, and tangy tomato-mint chutney.",
        ingredients: "Steamed White & Red Rice Flour, Fresh Coconut Milk, Turmeric, Lime, Mustard Seeds, Curry Leaves"
    },
    { 
        id: 6, 
        name: "Crispy Jaffna Medu Vadai with Sambar & Dhal (වාඩේ)", 
        category: "JAFFNA TAMIL", 
        mealType: "STREET FOOD & ROTIS",
        price: 1800, 
        tags: ["Vegan", "Crispy", "Popular Snack"], 
        time: "8 mins",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Golden, crispy-on-the-outside, fluffy-inside savory black gram lentil fritters tempered with green chili, shallots, curry leaves, and served with piping hot vegetable sambar.",
        ingredients: "Ulundu (Black Gram) Dhal, Curry Leaves, Green Chilies, Cumin Seeds, Ginger, Sambar Spices"
    },
    { 
        id: 7, 
        name: "Chicken Kottu Roti with Rich Curry Gravy (කොත්තු රොටී)", 
        category: "STREET FOOD & ROTIS", 
        mealType: "DINNER",
        price: 3600, 
        tags: ["Sri Lankan Street Icon", "Live Griddle", "Chef Special"], 
        time: "15 mins",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "The crown jewel of Sri Lankan night street food: hand-shredded godamba roti chopped rhythmically on a cast-iron griddle with farm eggs, leeks, carrots, spiced chicken, and hot curry gravy.",
        ingredients: "Godamba Roti, Shredded Spiced Chicken, Farm Eggs, Leeks, Cabbage, Onions, Roasted Chili Curry Sauce"
    },
    { 
        id: 8, 
        name: "Negombo Lagoon Jumbo Prawn Curry (මීගමු ඉස්සෝ කරිය)", 
        category: "ROYAL HERITAGE & SEAFOOD", 
        mealType: "DINNER",
        price: 7800, 
        tags: ["Royal Seafood", "Gluten-Free", "Rich Gravy"], 
        time: "20 mins",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Giant ocean-fresh Negombo lagoon prawns cooked gently in a velvety caramelized onion and roasted coriander coconut milk sauce with cinnamon and curry leaves.",
        ingredients: "Wild Giant Lagoon Prawns, Coconut Cream, Fenugreek, Cinnamon, Cardamom, Lemongrass, Garlic"
    },
    { 
        id: 9, 
        name: "Dutch Burgher Ceylon Lamprais in Banana Leaf (ලම්ප්‍රයිස්)", 
        category: "ROYAL HERITAGE & SEAFOOD", 
        mealType: "LUNCH",
        price: 5200, 
        tags: ["Colonial Heritage", "Slow-Baked", "Authentic Recipe"], 
        time: "20 mins",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Historic colonial Ceylon dish: stock-cooked ghee samba rice, slow-cooked meat curry, frikkadels (meatballs), blachan prawn relish, ash plantain curry, and seeni sambol wrapped and baked in a fresh banana leaf.",
        ingredients: "Short-grain Samba Rice, Ghee, Mixed Meat Curry, Frikkadels, Blachan, Ash Plantain, Seeni Sambol, Banana Leaf"
    },
    { 
        id: 10, 
        name: "Fresh King Coconut (Thambili) with Lime (තැඹිලි)", 
        category: "CEYLON TEAS & BEVERAGES", 
        mealType: "BEVERAGES & WINE",
        price: 950, 
        tags: ["100% Natural", "Hydration", "Electrolytes"], 
        time: "5 mins",
        image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Chilled golden king coconut freshly harvested from village palms, sliced open on order and served with a splash of fresh lime and mint.",
        ingredients: "Pure Sri Lankan King Coconut Water, Fresh Lime, Garden Mint"
    },
    { 
        id: 11, 
        name: "Artisanal Ceylon Single-Estate Silver Tips Tea (සිලෝන් තේ)", 
        category: "CEYLON TEAS & BEVERAGES", 
        mealType: "BEVERAGES & WINE",
        price: 1800, 
        tags: ["Nuwara Eliya Estate", "Antioxidants", "Hand-Plucked"], 
        time: "5 mins",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        description: "Ultra-premium handmade white Ceylon tea buds harvested at dawn in the high misty hills of Nuwara Eliya, brewed with pure mountain spring water and wild bee honey.",
        ingredients: "100% Pure Ceylon Silver Tips White Tea, Forest Honey, Raw Jaggery"
    }
];

const formatPrice = (amount) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(amount);

export default function Accommodations({ auth, reviews = [], policy, addons = [], roomsProp = [], estateDetail = {}, accommodations = [] }) {
    const [activeTab, setActiveTab] = useState('listing'); // listing, detail, map, food
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [cart, setCart] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchWishlist();
        fetchBookings();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await axios.get('/api/wishlists');
            setWishlistItems(res.data);
        } catch (e) { console.error("Error fetching wishlist", e); }
    };

    const fetchBookings = async () => {
        try {
            const res = await axios.get('/api/orders');
            setBookings(res.data.filter(order => order.type === 'accommodation'));
        } catch (e) { console.error("Error fetching bookings", e); }
    };

    const toggleWishlist = async (propertyId) => {
        try {
            await axios.post('/api/wishlists/toggle', { accommodation_id: propertyId });
            fetchWishlist();
        } catch (e) { console.error("Error toggling wishlist", e); }
    };


    const handleViewDetails = (property) => {
        setSelectedProperty(property);
        setActiveTab('detail');
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-royalMaroon-800 selection:text-royalGold-400 pb-20">
            <Head title="Luxury Accommodations & Travel" />

            {/* Top Navigation Bar matching the image */}
            <header className="bg-royalMaroon-900 text-white border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-sm font-medium">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors border-r border-white/20 pr-6 mr-2">
                            <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
                        </Link>
                        <button 
                            onClick={() => {setActiveTab('listing'); setSelectedProperty(null);}} 
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-colors ${activeTab === 'listing' && !selectedProperty ? 'bg-royalGold-400 text-royalMaroon-900 font-bold shadow-sm' : 'text-white hover:text-royalGold-400'}`}
                        >
                            <Compass size={16} /> Explore Stays
                        </button>
                        <button 
                            onClick={() => activeTab === 'detail' || selectedProperty ? setActiveTab('detail') : null} 
                            className={`flex items-center gap-2 transition-colors ${activeTab === 'detail' ? 'text-royalGold-400' : !selectedProperty ? 'text-white/50 cursor-not-allowed' : 'text-white hover:text-royalGold-400'}`}
                        >
                            <Sparkles size={16} /> Property Details {selectedProperty && `(${selectedProperty.name.split(' ')[0]})`}
                        </button>
                        <button 
                            onClick={() => setActiveTab('map')} 
                            className={`flex items-center gap-2 transition-colors ${activeTab === 'map' ? 'text-royalGold-400' : 'text-white hover:text-royalGold-400'}`}
                        >
                            <MapPin size={16} /> Route & Map
                        </button>
                        <button 
                            onClick={() => setActiveTab('food')} 
                            className={`flex items-center gap-2 transition-colors ${activeTab === 'food' ? 'text-royalGold-400' : 'text-white hover:text-royalGold-400'}`}
                        >
                            <Utensils size={16} /> In-House Dining
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => setShowWishlist(true)} className="flex items-center gap-2 hover:text-royalGold-400 transition-colors">
                            <Heart size={16} /> Wishlist ({wishlistItems.length})
                        </button>
                        <button onClick={() => setShowBookings(true)} className="flex items-center gap-2 hover:text-royalGold-400 transition-colors">
                            <Calendar size={16} /> Bookings ({bookings.length})
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            {activeTab === 'listing' && !selectedProperty && (
                <>
                    <div className="relative w-full h-[550px] flex flex-col items-center justify-center pt-16">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
                                alt="Luxury Resort Anuradhapura" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        
                        {/* Dark Overlay for Readability */}
                        <div className="absolute inset-0 bg-black/40 z-0"></div>
                        
                        {/* Bottom White Gradient Fade */}
                        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-0 pointer-events-none"></div>
                        
                        {/* Centered Content */}
                        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-[-40px]">
                            <div className="text-royalGold-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2 drop-shadow-md">
                                <Sparkles size={14} /> CATEGORY EXPLORATION
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4 text-white drop-shadow-lg">
                                Sacred City Sanctuaries &<br />Luxury Estates
                            </h1>
                            <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium drop-shadow-md max-w-2xl mx-auto">
                                Discover profound inner peace through 5-star heritage resorts, private villas, and authentic dining spots across the sacred city of Anuradhapura.
                            </p>
                        </div>
                    </div>

                    {/* Lower Description Block matching the first image */}
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative z-10">
                        <div className="text-royalGold-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                            EXPLORATION DESK
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royalMaroon-900 mb-4">
                            Sacred City Sanctuaries & Luxury Estates
                        </h2>
                        <p className="text-gray-500 max-w-3xl text-sm md:text-base leading-relaxed">
                            Rejuvenate mind, body and soul through handpicked heritage resorts, private villas overlooking ancient reservoirs, and transformative high-end wellness experiences nestled in Anuradhapura with personal butler service and live chauffeured route tracking.
                        </p>
                    </div>
                </>
            )}

            {/* Main Content Layout */}
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <AnimatePresence mode="wait">
                    {activeTab === 'listing' && (
                        <ListingView key="listing" onSelect={handleViewDetails} accommodations={accommodations} wishlistItems={wishlistItems} toggleWishlist={toggleWishlist} />
                    )}
                    {activeTab === 'detail' && selectedProperty && (
                        <DetailView property={selectedProperty} onBack={() => setActiveTab('listing')} onMap={() => setActiveTab('map')} onFood={() => setActiveTab('food')} reviews={reviews} policy={policy} addons={addons} roomsProp={roomsProp} estateDetail={estateDetail} wishlistItems={wishlistItems} toggleWishlist={toggleWishlist} />
                    )}
                    {activeTab === 'map' && (
                        <MapView key="map" property={selectedProperty} accommodations={accommodations} />
                    )}
                    {activeTab === 'food' && (
                        <FoodView key="food" cart={cart} setCart={setCart} />
                    )}
                </AnimatePresence>

            </main>

            {/* Wishlist Modal */}
            <AnimatePresence>
                {showWishlist && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
                        >
                            <div className="bg-royalMaroon-800 p-5 text-white flex justify-between items-center border-b border-royalGold-400/30">
                                <h3 className="text-xl font-serif font-bold text-royalGold-400 flex items-center gap-2"><Heart size={20}/> Your Wishlist</h3>
                                <button onClick={() => setShowWishlist(false)} className="text-white/70 hover:text-white"><X size={24}/></button>
                            </div>
                            <div className="p-6 overflow-y-auto max-h-[70vh]">
                                {wishlistItems.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">Your wishlist is empty.</div>
                                ) : (
                                    <div className="space-y-4">
                                        {wishlistItems.map(item => (
                                            <div key={item.id} onClick={() => { handleViewDetails(item.accommodation); setShowWishlist(false); }} className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:border-royalMaroon-800/30 transition-colors cursor-pointer relative group">
                                                <img src={item.accommodation.image || "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"} className="w-20 h-20 rounded-lg object-cover" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-royalTeal">{item.accommodation.name}</h4>
                                                    <p className="text-xs text-gray-500 mb-2">{item.accommodation.location || 'Sri Lanka'}</p>
                                                    <span className="text-xs font-bold text-royalMaroon-900">{formatPrice(item.accommodation.price_per_night || 720000)} / night</span>
                                                </div>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(item.accommodation_id); }}
                                                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 text-red-500"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <button onClick={() => setShowWishlist(false)} className="w-full mt-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                    Close Wishlist
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bookings Modal */}
            <AnimatePresence>
                {showBookings && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
                        >
                            <div className="bg-royalMaroon-800 p-5 text-white flex justify-between items-center border-b border-royalGold-400/30">
                                <h3 className="text-xl font-serif font-bold text-royalGold-400 flex items-center gap-2"><Calendar size={20}/> Upcoming Bookings</h3>
                                <button onClick={() => setShowBookings(false)} className="text-white/70 hover:text-white"><X size={24}/></button>
                            </div>
                            <div className="p-6 overflow-y-auto max-h-[70vh]">
                                {bookings.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">You have no upcoming bookings.</div>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.map(order => (
                                            <div key={order.id} className="border border-royalGold-400/30 rounded-xl p-4 bg-[#fdf9f9]">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-bold text-royalTeal">{order.details.propertyName || 'Luxury Property'}</h4>
                                                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">CONFIRMED</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    <strong>Check-in:</strong> {order.details.checkIn ? new Date(order.details.checkIn).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) + ' (2:00 PM)' : 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    <strong>Check-out:</strong> {order.details.checkOut ? new Date(order.details.checkOut).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) + ' (11:00 AM)' : 'N/A'}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs font-bold text-royalMaroon-900 border-t border-gray-200 pt-3">
                                                    <Sparkles size={12} /> {order.details.roomType} • {order.details.guests} Guests
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-4 flex gap-3">
                                    <button onClick={() => setShowBookings(false)} className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">
                                        Modify
                                    </button>
                                    <button onClick={() => setShowBookings(false)} className="flex-1 py-3 bg-royalMaroon-800 text-royalGold-400 font-bold rounded-xl hover:bg-royalMaroon-700 transition-colors text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

// Subcomponents

function ListingView({ onSelect, accommodations = [], wishlistItems = [], toggleWishlist }) {
    const [activeFilter, setActiveFilter] = useState('All Escapes');
    const [maxPrice, setMaxPrice] = useState(750000);
    const [minRating, setMinRating] = useState(0);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [sortBy, setSortBy] = useState('Featured Curations');

    const toggleAmenity = (amenity) => {
        setSelectedAmenities(prev => 
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    const resetFilters = () => {
        setMaxPrice(750000);
        setMinRating(0);
        setSelectedAmenities([]);
        setActiveFilter('All Escapes');
        setSortBy('Featured Curations');
    };

    // Filter logic
    const filteredAccommodations = accommodations.filter(prop => {
        if (activeFilter !== 'All Escapes' && !prop.category?.toLowerCase().includes(activeFilter.toLowerCase())) return false;
        if (prop.price > maxPrice) return false;
        if (Number(prop.rating) < minRating) return false;
        // if we have amenities in the prop
        if (selectedAmenities.length > 0 && prop.amenities) {
            const hasAllAmenities = selectedAmenities.every(a => 
                prop.amenities.some(pa => typeof pa === 'string' && pa.toLowerCase() === a.toLowerCase())
            );
            if (!hasAllAmenities) return false;
        }
        return true;
    }).sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Highest Rated') return Number(b.rating) - Number(a.rating);
        return 0; // Featured Curations (default)
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            {/* Category Tab Bar (Sub-header) */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
                <div className="flex flex-wrap gap-3">
                    {['All Escapes', 'Hotels', 'Resorts', 'Villas', 'Fine Dining'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                                activeFilter === cat 
                                ? 'bg-royalMaroon-800 text-royalGold-400 border-royalMaroon-800' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {cat === 'All Escapes' && <Compass size={16} />}
                            {cat === 'Hotels' && <Home size={16} />}
                            {cat === 'Resorts' && <Wind size={16} />}
                            {cat === 'Villas' && <Home size={16} />}
                            {cat === 'Fine Dining' && <Utensils size={16} />}
                            {cat}{cat === 'All Escapes' && ` (${accommodations.length})`}
                        </button>
                    ))}
                </div>
                <div className="hidden lg:flex items-center gap-3 text-sm text-gray-500">
                    Sort by: 
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border-none bg-transparent font-semibold text-gray-800 focus:ring-0 cursor-pointer"
                    >
                        <option>Featured Curations</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Highest Rated</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-1/4 xl:w-1/5">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-serif font-bold text-royalTeal flex items-center gap-2">
                                <Filter size={20} className="text-royalTeal" /> Filter Sanctuaries
                            </h3>
                            <button onClick={resetFilters} className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">
                                <RotateCcw size={14} /> Reset
                            </button>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="block text-sm font-bold text-gray-800">Max Starting Price</label>
                                    <span className="text-sm font-bold text-royalTeal">{formatPrice(maxPrice)} / night</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="90000" 
                                    max="750000" 
                                    step="10000"
                                    value={maxPrice} 
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full h-2 bg-slider-track rounded-lg appearance-none cursor-pointer accent-royalMaroon-800" 
                                />
                                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                                    <span>LKR 90,000</span>
                                    <span>LKR 420,000</span>
                                    <span>LKR 750,000+</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-3">Minimum Star Rating</label>
                                <div className="flex gap-2">
                                    {[{label: '4.5+', val: 4.5}, {label: '4.8+', val: 4.8}, {label: '4.9+', val: 4.9}].map((rating) => (
                                        <button 
                                            key={rating.label} 
                                            onClick={() => setMinRating(rating.val === minRating ? 0 : rating.val)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-semibold border flex items-center justify-center gap-1 ${minRating === rating.val ? 'bg-royalMaroon-800 text-royalGold-400 border-royalMaroon-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <Star size={14} className={minRating === rating.val ? "fill-theme-gold" : ""} /> {rating.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-3">Key Amenities</label>
                                <div className="space-y-3">
                                    {['Wi-Fi', 'Pool', 'Parking', 'AC', 'Spa'].map(amenity => (
                                        <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedAmenities.includes(amenity)}
                                                    onChange={() => toggleAmenity(amenity)}
                                                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-royalMaroon-800 checked:border-royalMaroon-800 transition-colors" 
                                                />
                                                <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="w-full lg:w-3/4 xl:w-4/5">
                    <div className="text-sm font-medium text-gray-500 mb-4">Showing {filteredAccommodations.length} luxury stays found</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredAccommodations.map((prop, idx) => (
                            <motion.div 
                                key={prop.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group cursor-pointer flex flex-col"
                                onClick={() => onSelect(prop)}
                            >
                                <div className="relative h-60 overflow-hidden">
                                    <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    
                                    {/* Badges container */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${prop.categoryColor} shadow-md`}>
                                            {prop.category}
                                        </span>
                                        <span className="flex items-center gap-1 px-3 py-1 bg-royalGold-400 text-royalMaroon-900 rounded-full text-[10px] font-bold shadow-md">
                                            <Sparkles size={10} /> {prop.badge}
                                        </span>
                                    </div>
                                    
                                    {/* Heart Button */}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(prop.id); }}
                                        className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition-transform ${wishlistItems.some(i => i.accommodation_id === prop.id) ? 'bg-heart-pink text-white' : 'bg-white text-gray-400 hover:text-heart-pink'}`}
                                    >
                                        <Heart size={16} className={wishlistItems.some(i => i.accommodation_id === prop.id) ? 'fill-current' : ''} />
                                    </button>

                                    {/* Image Slider Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        <div className="w-4 h-1.5 bg-royalGold-400 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                                            <Star size={16} className="text-royalGold-400 fill-theme-gold" /> 
                                            {prop.rating} <span className="text-gray-400 font-normal">({prop.reviews} reviews)</span>
                                        </div>
                                        <span className="text-xs font-semibold text-royalTeal bg-royalMaroon-800/10 px-2 py-1 rounded-md">{prop.distance}</span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-royalTeal font-serif leading-tight group-hover:text-royalGold-400 transition-colors mb-2">{prop.name}</h3>
                                    
                                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                                        <MapPin size={14} className="text-royalTeal" /> {prop.location}
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        {prop.description}
                                    </p>

                                    <div className="border-t border-gray-100 pt-4 mb-4 mt-auto">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-1/3">Key<br/>Highlights:</div>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600"><Wifi size={14} /></div>
                                                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600"><Waves size={14} /></div>
                                                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600"><Car size={14} /></div>
                                                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600"><Wind size={14} /></div>
                                                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-600"><Sparkles size={14} /></div>
                                                <div className="text-xs font-bold text-gray-400 ml-1">+3</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Starting From</div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold text-royalTeal">{formatPrice(prop.price)}</span>
                                                <span className="text-xs text-gray-500">/ night</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-royalTeal hover:bg-gray-100 transition-colors">
                                                <Send size={16} />
                                            </button>
                                            <button className="bg-royalGold-400 hover:bg-royalGold-500 text-royalMaroon-900 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors flex items-center gap-2">
                                                View Details <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function DetailView({ property, onBack, onMap, onFood, reviews, policy, addons, roomsProp, estateDetail, wishlistItems = [], toggleWishlist }) {
    const currentRoomsList = (property?.rooms && property.rooms.length > 0) ? property.rooms : roomsProp;
    const currentAddonsList = (property?.addons && property.addons.length > 0) ? property.addons : addons;
    const currentPolicy = property?.policy || policy;
    const currentPhotos = (property?.photos && property.photos.length > 0) ? property.photos : (estateDetail?.photos || []);
    const currentHostName = property?.host_name || estateDetail?.host_name || "Estate Host & Concierge";
    const currentHostRole = property?.host_role || estateDetail?.host_role || "Resident Host";
    const currentHostImage = property?.host_image || estateDetail?.host_image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
    const currentResponseRate = property?.response_rate || estateDetail?.response_rate || "100%";
    const currentResponseTime = property?.response_time || estateDetail?.response_time || "Within 5 minutes";

    const rooms = currentRoomsList.reduce((acc, room) => {
        const key = room.type_key || room.id;
        acc[key] = room;
        return acc;
    }, {});

    const defaultRoomKey = currentRoomsList[0]?.type_key || currentRoomsList[0]?.id || Object.keys(rooms)[0] || 'deluxe';
    const [roomType, setRoomType] = useState(defaultRoomKey);

    useEffect(() => {
        const firstKey = currentRoomsList[0]?.type_key || currentRoomsList[0]?.id || Object.keys(rooms)[0] || 'deluxe';
        setRoomType(firstKey);
        setSelectedAddons([]);
    }, [property.id]);

    const activeRoom = rooms[roomType] || rooms[defaultRoomKey] || currentRoomsList[0] || {
        name: property.name,
        price: property.price,
        cap: 2,
        bed: "1 King Bed",
        size: "50 m²",
        desc: property.description,
        image: property.image,
        amenities: ["Wi-Fi", "Air Conditioning", "En-suite Bathroom"]
    };

    const [guests, setGuests] = useState(2);
    const [checkIn, setCheckIn] = useState('2026-08-15');
    const [checkOut, setCheckOut] = useState('2026-08-18');
    const [nights, setNights] = useState(3);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [likes, setLikes] = useState(property.likes || 0);
    const [shares, setShares] = useState(property.shares || 0);
    const isFavorited = wishlistItems.some(i => i.accommodation_id === property.id);

    const propertyReviews = (reviews || []).filter(rev => Number(rev.accommodation_id) === Number(property.id));
    const avgRating = propertyReviews.length > 0
        ? (propertyReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) / propertyReviews.length).toFixed(1)
        : (property.rating || '4.95');

    const handleLike = () => {
        toggleWishlist(property.id);
    };

    const handleShare = () => {
        setShares(prev => prev + 1);
        if (navigator.share) {
            navigator.share({
                title: property.name,
                text: 'Check out this amazing property!',
                url: window.location.href,
            }).catch(console.error);
        }
    };

    const { data, setData, post, processing: formProcessing, reset } = useForm({
        accommodation_id: property.id,
        name: '',
        rating: 5,
        review_text: ''
    });

    useEffect(() => {
        setData('accommodation_id', property.id);
    }, [property.id]);

    const submitReview = (e) => {
        e.preventDefault();
        post('/reviews', {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'review_text');
                setData('rating', 5);
            },
        });
    };

    useEffect(() => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        if (start && end && end > start) {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNights(diffDays);
        } else {
            setNights(0);
        }
    }, [checkIn, checkOut]);

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentData, setPaymentData] = useState({
        card_holder: '',
        card_number: '',
        valid_date: '',
        cvv: ''
    });
    const [paymentErrors, setPaymentErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
        const addon = currentAddonsList.find(a => a.id === addonId);
        return sum + (addon ? Number(addon.price) : 0);
    }, 0);

    const activeRoomPrice = Number(activeRoom.price) || Number(property.price) || 100000;
    const total = (activeRoomPrice * nights * guests) + addonsTotal;
    const fee = Math.round(total * 0.08);
    const savings = Math.round(total * 0.05);
    const grandTotal = total + fee - savings;

    const handlePaymentChange = (field, value) => {
        setPaymentData(prev => ({ ...prev, [field]: value }));
        if (paymentErrors[field]) {
            setPaymentErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validatePayment = () => {
        const errors = {};
        if (paymentMethod === 'card') {
            if (!paymentData.card_holder.trim()) errors.card_holder = 'Card holder name is required';
            if (!paymentData.card_number.trim() || paymentData.card_number.replace(/\s/g, '').length < 16) errors.card_number = 'Valid 16-digit card number is required';
            if (!paymentData.valid_date.trim()) errors.valid_date = 'Expiration date is required';
            if (!paymentData.cvv.trim() || paymentData.cvv.length < 3) errors.cvv = '3 or 4 digit CVV is required';
        }
        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleReserve = async (e) => {
        e.preventDefault();
        if (!validatePayment()) return;

        setProcessing(true);

        try {
            const orderPayload = {
                type: 'accommodation',
                payment_method: paymentMethod,
                amount: grandTotal,
                details: {
                    accommodationId: property.id,
                    propertyName: property.name,
                    roomType: activeRoom.name,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    guests: guests,
                    nights: nights,
                    addons: selectedAddons.map(id => {
                        const addon = currentAddonsList.find(a => a.id === id);
                        return addon ? addon.title : '';
                    }).filter(Boolean),
                    paymentInfo: paymentMethod === 'card' ? {
                        cardHolder: paymentData.card_holder,
                        last4: paymentData.card_number.slice(-4)
                    } : { method: paymentMethod }
                }
            };

            await axios.post('/api/orders', orderPayload);
            setProcessing(false);
            setShowCheckout(false);
            router.visit('/checkout?item=' + property.id + '&type=accommodation&success=1');
        } catch (error) {
            console.error('Reservation error:', error);
            setProcessing(false);
            alert('Failed to process reservation. Please try again.');
        }
    };

    return (
        <>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full pb-20">
                {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${property.categoryColor} shadow-sm`}>
                            {property.category}
                        </span>
                        <span className="flex items-center gap-1 px-3 py-1 bg-royalGold-400 text-royalMaroon-900 rounded-full text-[10px] font-bold shadow-sm">
                            <Sparkles size={12} /> {property.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-royalTeal mb-2">{property.name}</h1>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <MapPin size={16} className="text-royalTeal shrink-0" /> 
                        <span>{property.address || property.location || 'Anuradhapura, Sri Lanka'}</span>
                        <span className="mx-2">•</span>
                        <Star size={16} className="text-royalTeal fill-theme-green shrink-0" />
                        <span className="text-royalTeal font-bold">
                            {property.rating} <span className="text-royalTeal font-normal">({property.reviews} reviews)</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onMap} className="flex items-center gap-2 bg-[#f9e6e8] text-royalTeal px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-[#f5ccd1] transition-colors">
                        <Navigation size={16} /> Route & Map
                    </button>
                    <button onClick={onFood} className="flex items-center gap-2 bg-[#faebd7] text-gray-800 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-[#f3dfc6] transition-colors">
                        <Utensils size={16} /> In-House Dining
                    </button>
                    <button onClick={handleLike} className={`w-10 h-10 flex flex-col items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm transition-colors ${isFavorited ? 'text-heart-pink bg-pink-50' : 'text-gray-400 hover:text-heart-pink hover:bg-gray-50'}`}>
                        <Heart size={18} className={isFavorited ? "fill-current" : ""} />
                    </button>
                    <button onClick={handleShare} className="w-10 h-10 flex flex-col items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-gray-600 hover:bg-gray-50 transition-colors relative">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12">
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                    <img 
                        src={property.image} 
                        alt={property.name} 
                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"; }}
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                    <img 
                        src={currentPhotos[0] || property.image} 
                        alt="Gallery 1"
                        onError={(e) => { e.currentTarget.src = property.image; }}
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative shadow-sm bg-gray-100">
                    <img 
                        src={currentPhotos[1] || currentPhotos[0] || property.image} 
                        alt="Gallery 2"
                        onError={(e) => { e.currentTarget.src = property.image; }}
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors flex items-end justify-center pb-8">
                        <button 
                            onClick={() => setShowGallery(true)}
                            className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Sparkles size={14} className="text-royalGold-500"/>
                            View All Photos ({[property.image, ...currentPhotos].filter(Boolean).length})
                        </button>
                    </div>
                </div>
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                    <img 
                        src={currentPhotos[2] || currentPhotos[0] || property.image} 
                        alt="Gallery 3"
                        onError={(e) => { e.currentTarget.src = property.image; }}
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Content */}
                <div className="w-full lg:w-[65%] space-y-8">
                    
                    {/* Host & Description */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-2xl font-serif font-bold text-royalTeal mb-6">{property.name}</h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            {property.description}
                        </p>
                        
                        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <img src={currentHostImage} alt={currentHostName} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">{currentHostName}</span>
                                        <span className="bg-royalGold-400 text-royalMaroon-900 text-[10px] font-bold px-2 py-0.5 rounded-md">Superhost</span>
                                    </div>
                                    <div className="text-xs text-gray-500">{currentHostRole}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-royalTeal">{currentResponseRate} Response Rate</div>
                                <div className="text-xs text-gray-500">{currentResponseTime}</div>
                            </div>
                        </div>
                    </div>

                    {/* Room Selection */}
                    <div>
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-serif font-bold text-royalTeal">Select Room or Villa Type</h2>
                            <span className="text-xs font-bold text-gray-400">{currentRoomsList.length} Options Available</span>
                        </div>
                        <div className="space-y-4">
                            {currentRoomsList.map((room) => {
                                const key = room.type_key || room.id;
                                const isSelected = (roomType === key) || (activeRoom === room);
                                return (
                                    <div 
                                        key={key} 
                                        onClick={() => setRoomType(key)}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col md:flex-row gap-6 ${
                                            isSelected ? 'border-royalMaroon-800 bg-[#fdf9f9] shadow-md' : 'border-gray-100 hover:border-royalMaroon-800/50 bg-white shadow-sm'
                                        }`}
                                    >
                                        <img src={room.image} alt={room.name} className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm" />
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-royalTeal">{room.name}</h3>
                                                <div className="bg-[#fcf0f2] text-royalTeal px-3 py-1 rounded-md flex items-baseline gap-1">
                                                    <span className="font-bold text-sm">{formatPrice(room.price)}</span>
                                                    <span className="text-[10px]">/ night</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mb-4 flex-1 leading-relaxed">{room.desc}</p>
                                            
                                            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600 mb-3">
                                                <span className="flex items-center gap-1"><Users size={14}/> {room.cap} Guests</span>
                                                <span>{room.bed}</span>
                                                <span>{room.size}</span>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {(room.amenities || []).map(am => (
                                                    <span key={am} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 flex items-center gap-1">
                                                        <Check size={10} className="text-royalTeal"/> {am}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Enhance Your Stay */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-serif font-bold text-royalTeal mb-2 flex items-center gap-2">
                            <Sparkles className="text-royalGold-400"/> Enhance Your Stay (Tailored Add-ons)
                        </h2>
                        <p className="text-xs text-gray-500 mb-6">Tailor your stay with private experiences, curated dining, or wellness passes.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentAddonsList.map((addon) => {
                                const isSelected = selectedAddons.includes(addon.id);
                                const IconComponent = {
                                    Wind: Wind,
                                    Coffee: Coffee,
                                    Car: Car,
                                    Sparkles: Sparkles
                                }[addon.icon] || Sparkles;

                                return (
                                    <div 
                                        key={addon.id} 
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                                            } else {
                                                setSelectedAddons([...selectedAddons, addon.id]);
                                            }
                                        }}
                                        className={`border rounded-2xl p-4 flex gap-4 cursor-pointer transition-colors ${isSelected ? 'border-royalGold-400 bg-royalGold-400/5' : 'border-gray-100 hover:border-royalGold-400/50 bg-[#fdfdfd]'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${isSelected ? 'bg-royalGold-400 text-white border-royalGold-400' : 'bg-gray-50 text-royalGold-400 border-gray-100'}`}>
                                            <IconComponent size={20}/>
                                        </div>
                                        <div className="flex-1 w-full min-w-0">
                                            <div className="flex justify-between items-start mb-1 gap-2">
                                                <h4 className="text-sm font-bold text-gray-900 leading-tight pr-2">{addon.title}</h4>
                                                <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${isSelected ? 'text-white bg-royalTeal' : 'text-royalTeal bg-royalMaroon-800/10'}`}>
                                                    +{formatPrice(addon.price)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed mt-1">{addon.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Policies */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-serif font-bold text-royalTeal mb-6 flex items-center gap-2">
                            <ShieldCheck className="text-royalTeal"/> Check-in Policies & Estate Rules
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider mb-2"><Calendar size={12}/> CHECK-IN</div>
                                <div className="text-sm font-bold text-gray-800">{currentPolicy?.check_in_time || '2:00 PM - 11:00 PM (24/7 Check-In)'}</div>
                            </div>
                            <div className="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider mb-2"><Calendar size={12}/> CHECK-OUT</div>
                                <div className="text-sm font-bold text-gray-800">{currentPolicy?.check_out_time || '12:00 PM (Late Check-Out available upon request)'}</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold text-gray-900 mb-3">Estate Guidelines:</div>
                            <ul className="space-y-2 text-xs text-gray-600">
                                {currentPolicy?.guidelines ? currentPolicy.guidelines.map((guideline, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full border-2 border-royalMaroon-800 flex items-center justify-center shrink-0"></div> 
                                        {guideline}
                                    </li>
                                )) : (
                                    <>
                                        <li className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-royalMaroon-800 flex items-center justify-center shrink-0"></div> Respect the cultural heritage and tranquil surroundings</li>
                                        <li className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-royalMaroon-800 flex items-center justify-center shrink-0"></div> Quiet hours observed in nature zones from 10:30 PM</li>
                                        <li className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-royalMaroon-800 flex items-center justify-center shrink-0"></div> Personalized concierge assistance available at front desk</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-serif font-bold text-royalTeal flex items-center gap-2">
                                <MessageSquare className="text-royalTeal"/> Verified Guest Reviews ({propertyReviews.length})
                            </h2>
                            <div className="flex items-center gap-2 text-sm font-bold text-royalGold-400">
                                <Star size={14} className="fill-current"/> {avgRating} <span className="text-gray-400 font-normal">/ 5.0</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {propertyReviews.length > 0 ? (
                                propertyReviews.map((rev) => (
                                    <div key={rev.id} className="border border-gray-100 rounded-2xl p-5 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{rev.name}</div>
                                                    <div className="text-[10px] text-gray-500">{rev.date_string}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-royalGold-400 font-bold text-xs">
                                                <Star size={12} className="fill-current" /> {Number(rev.rating).toFixed(1)}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 italic leading-relaxed">"{rev.review_text}"</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    No verified guest reviews yet for this estate. Be the first to share your experience!
                                </div>
                            )}
                        </div>

                        {/* Add Review Form */}
                        <form onSubmit={submitReview} className="mt-6 border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-4">Leave a Review</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            placeholder="Your Name" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                            className="w-full border border-gray-200 rounded-xl text-sm focus:border-royalTeal focus:ring-1 focus:ring-royalTeal bg-gray-50 p-3 outline-none"
                                        />
                                    </div>
                                    <div className="w-32">
                                        <select 
                                            value={data.rating}
                                            onChange={e => setData('rating', e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl text-sm focus:border-royalTeal focus:ring-1 focus:ring-royalTeal bg-gray-50 p-3 outline-none"
                                        >
                                            <option value="5">5 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="2">2 Stars</option>
                                            <option value="1">1 Star</option>
                                        </select>
                                    </div>
                                </div>
                                <textarea 
                                    placeholder="Share your experience..." 
                                    value={data.review_text}
                                    onChange={e => setData('review_text', e.target.value)}
                                    required
                                    rows="3"
                                    className="w-full border border-gray-200 rounded-xl text-sm focus:border-royalTeal focus:ring-1 focus:ring-royalTeal bg-gray-50 p-3 outline-none"
                                ></textarea>
                                <button 
                                    type="submit" 
                                    disabled={formProcessing}
                                    className="bg-royalTeal hover:bg-teal-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Send size={16} /> {formProcessing ? 'Posting...' : 'Post Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Content - Booking Widget */}
                <div className="w-full lg:w-[35%]">
                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-royalMaroon-800 sticky top-20">
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                            <div>
                                <div className="text-3xl font-bold text-royalTeal flex items-baseline gap-1">
                                    {formatPrice(activeRoom.price)} <span className="text-xs font-normal text-gray-400">/ night</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    Selected: <span className="font-bold text-gray-800">{activeRoom.name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="text-[10px] text-gray-600 uppercase font-bold block mb-2 tracking-widest">Stay Dates ({nights} Nights)</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 p-3 border border-gray-200 rounded-xl flex justify-between items-center bg-gray-50 overflow-hidden relative">
                                        <div className="w-full">
                                            <div className="text-[9px] text-gray-400 font-bold mb-0.5">CHECK-IN</div>
                                            <input 
                                                type="date" 
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0 w-full outline-none" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3 border border-gray-200 rounded-xl flex justify-between items-center bg-gray-50 overflow-hidden relative">
                                        <div className="w-full">
                                            <div className="text-[9px] text-gray-400 font-bold mb-0.5">CHECK-OUT</div>
                                            <input 
                                                type="date" 
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0 w-full outline-none" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-[10px] text-gray-600 uppercase font-bold block mb-2 tracking-widest">Guests</label>
                                <div className="p-3 border border-gray-200 rounded-xl flex justify-between items-center">
                                    <div>
                                        <div className="text-sm font-bold text-gray-800">Adults</div>
                                        <div className="text-[10px] text-gray-400">Age 13+</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Minus size={14}/></button>
                                        <span className="font-bold text-sm w-4 text-center">{guests}</span>
                                        <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Plus size={14}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{formatPrice(activeRoom.price)} × {nights} nights × {guests} guests</span>
                                <span className="font-medium">{formatPrice(activeRoomPrice * nights * guests)}</span>
                            </div>
                            {addonsTotal > 0 && (
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Selected Add-ons</span>
                                    <span className="font-medium">+{formatPrice(addonsTotal)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Concierge & Resort Fee (8%)</span>
                                <span className="font-medium">{formatPrice(fee)}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-royalTeal">
                                <span>Emerald VIP Savings (5%)</span>
                                <span>-{formatPrice(savings)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end pt-6 border-t border-gray-100 mb-8">
                            <span className="text-sm font-bold text-gray-900">Total Price</span>
                            <span className="text-2xl font-bold text-royalTeal">{formatPrice(grandTotal)}</span>
                        </div>

                        <button 
                            onClick={() => setShowCheckout(true)}
                            className="w-full py-4 bg-royalGold-400 hover:bg-royalGold-500 text-royalMaroon-900 font-bold text-sm rounded-xl shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.23)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <Sparkles size={16} /> Reserve Room Now
                        </button>
                        <p className="text-center text-[9px] text-gray-400 mt-4 uppercase tracking-wider">No charge applied until multi-step verification completes</p>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            <AnimatePresence>
                {showCheckout && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="bg-royalMaroon-800 p-6 text-white flex justify-between items-center border-b border-royalGold-400/30 shrink-0">
                                <h3 className="text-xl font-serif font-bold text-royalGold-400">Complete Reservation</h3>
                                <button onClick={() => setShowCheckout(false)} className="text-white/70 hover:text-white"><X size={24}/></button>
                            </div>
                            <div className="p-8 overflow-y-auto">
                                <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100">
                                    <img src={property.image} className="w-24 h-24 rounded-2xl object-cover" />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">{property.name}</h4>
                                        <p className="text-xs text-gray-500 mb-1">{property.address || property.location}</p>
                                        <p className="text-sm font-semibold text-royalMaroon-900">{activeRoom.name} • {nights} Nights • {guests} Guests</p>
                                        <p className="font-bold text-royalTeal mt-2">Total: {formatPrice(grandTotal)}</p>
                                    </div>
                                </div>
                                
                                <h2 className="text-xl font-bold text-slate-900 mb-6 font-sans">Payment Method</h2>
                                
                                <div className="p-3 sm:p-4 rounded-lg space-y-3" style={{backgroundColor: '#6F4E37'}}>
                                    {/* KOKO Option */}
                                    <div className="bg-white rounded-md p-4 flex items-center justify-between cursor-pointer shadow-sm" onClick={() => setPaymentMethod('koko')}>
                                        <div className="flex items-center gap-4">
                                            <input type="radio" checked={paymentMethod === 'koko'} onChange={() => setPaymentMethod('koko')} className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                            <span className="font-medium text-slate-800 text-[15px]">KOKO</span>
                                        </div>
                                        <div className="font-bold text-lg tracking-wider" style={{WebkitTextStroke: "1px #6F4E37", color: "transparent"}}>KOKO</div>
                                    </div>
                                    
                                    {/* Credit/Debit Card Option */}
                                    <div className={`bg-white rounded-md p-5 shadow-sm cursor-pointer ${paymentMethod === 'card' ? 'ring-2 ring-craft-brown border-transparent' : ''}`} onClick={() => setPaymentMethod('card')}>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-4">
                                                <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                                <span className="font-medium text-slate-800 text-[15px]">Credit/ Debit Card</span>
                                            </div>
                                            <CreditCard className="w-7 h-7" style={{color: '#3b82f6'}} strokeWidth={1.5} />
                                        </div>
                                        
                                        {paymentMethod === 'card' && (
                                            <>
                                                <div className="mb-6 pl-9">
                                                    <p className="text-[13px] text-slate-500 mb-2">We accept</p>
                                                    <div className="flex gap-2">
                                                        {/* Visa Badge */}
                                                        <div className="border border-slate-200 rounded px-2.5 py-1 font-bold italic text-[11px] flex items-center justify-center h-7" style={{color: '#1d4ed8'}}>VISA</div>
                                                        {/* Mastercard Badge */}
                                                        <div className="border border-slate-200 rounded px-2.5 py-1 flex items-center justify-center h-7">
                                                            <div className="w-3.5 h-3.5 rounded-full opacity-90" style={{backgroundColor: '#ef4444'}}></div>
                                                            <div className="w-3.5 h-3.5 rounded-full opacity-90 -ml-1.5" style={{backgroundColor: '#facc15', mixBlendMode: 'multiply'}}></div>
                                                        </div>
                                                        {/* Amex Badge */}
                                                        <div className="border border-slate-200 rounded px-2.5 py-1 text-white font-bold text-[10px] flex items-center justify-center h-7 tracking-wider" style={{backgroundColor: '#2563eb'}}>AMEX</div>
                                                        {/* Maestro Badge */}
                                                        <div className="border border-slate-200 rounded px-2.5 py-1 flex items-center justify-center h-7">
                                                            <div className="w-3.5 h-3.5 rounded-full opacity-90" style={{backgroundColor: '#3b82f6'}}></div>
                                                            <div className="w-3.5 h-3.5 rounded-full opacity-90 -ml-1.5" style={{backgroundColor: '#ef4444', mixBlendMode: 'multiply'}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Holder</label>
                                                        <input type="text" value={paymentData.card_holder} onChange={e => setPaymentData({...paymentData, card_holder: e.target.value})} className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 text-slate-900" style={{outlineColor: '#6F4E37'}} />
                                                        {paymentErrors.card_holder && <div className="text-red-500 text-xs mt-1">{paymentErrors.card_holder}</div>}
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Number</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                                <CreditCard className="h-4 w-4 text-slate-400" />
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                value={paymentData.card_number} 
                                                                onChange={e => {
                                                                    let val = e.target.value.replace(/\D/g, '');
                                                                    val = val.replace(/(.{4})/g, '$1 ').trim();
                                                                    setPaymentData({...paymentData, card_number: val.substring(0, 19)});
                                                                }} 
                                                                placeholder="0000 0000 0000 0000" 
                                                                className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono text-slate-900" 
                                                                style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} 
                                                                maxLength="19"
                                                            />
                                                        </div>
                                                        {paymentErrors.card_number && <div className="text-red-500 text-xs mt-1">{paymentErrors.card_number}</div>}
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Valid Date</label>
                                                            <div className="relative">
                                                                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                                </div>
                                                                <input 
                                                                    type="text" 
                                                                    value={paymentData.valid_date} 
                                                                    onChange={e => {
                                                                        let val = e.target.value.replace(/\D/g, '');
                                                                        if (val.length > 2) {
                                                                            val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                                                        }
                                                                        setPaymentData({...paymentData, valid_date: val});
                                                                    }} 
                                                                    placeholder="MM/YY" 
                                                                    className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono text-slate-900" 
                                                                    style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} 
                                                                    maxLength="5"
                                                                />
                                                            </div>
                                                            {paymentErrors.valid_date && <div className="text-red-500 text-xs mt-1">{paymentErrors.valid_date}</div>}
                                                        </div>
                                                        <div>
                                                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">CVV</label>
                                                            <input type="text" value={paymentData.cvv} onChange={e => setPaymentData({...paymentData, cvv: e.target.value})} placeholder="XXX" className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono text-slate-900" style={{outlineColor: '#6F4E37'}} />
                                                            {paymentErrors.cvv && <div className="text-red-500 text-xs mt-1">{paymentErrors.cvv}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                            
                                        <div className="pt-4 mt-4">
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={() => setShowCheckout(false)}
                                                    className="w-full text-slate-700 font-medium py-2.5 rounded shadow-sm transition-all text-sm hover:bg-slate-200 bg-slate-100 flex justify-center items-center"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={async () => {
                                                        setProcessing(true);
                                                        setPaymentErrors({});
                                                        try {
                                                            const response = await axios.post('/api/orders', {
                                                                type: 'accommodation',
                                                                details: {
                                                                    accommodation_id: property.id,
                                                                    propertyName: property.name,
                                                                    checkIn: checkIn,
                                                                    checkOut: checkOut,
                                                                    roomType: activeRoom.name,
                                                                    nights,
                                                                    guests,
                                                                    addons: selectedAddons.map(id => {
                                                                        const addon = currentAddonsList.find(a => a.id === id);
                                                                        return addon ? addon.title : '';
                                                                    }).filter(Boolean)
                                                                },
                                                                total_amount: grandTotal,
                                                                payment_method: paymentMethod,
                                                                payment_details: paymentMethod === 'card' ? paymentData : null
                                                            });
                                                            setProcessing(false);
                                                            setShowCheckout(false);
                                                            alert("Booking Confirmed! Order ID: " + response.data.order.id);
                                                        } catch (error) {
                                                            setProcessing(false);
                                                            if (error.response?.data?.message) {
                                                                alert("Error: " + error.response.data.message);
                                                            } else {
                                                                alert("Payment processing failed.");
                                                            }
                                                        }
                                                    }}
                                                    disabled={processing}
                                                    className="w-full text-white font-medium py-2.5 rounded shadow-sm transition-all text-sm hover:opacity-90 disabled:opacity-70 flex justify-center items-center gap-2"
                                                    style={{backgroundColor: '#6F4E37'}}
                                                >
                                                    {processing ? 'Processing...' : 'Confirm'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            </motion.div>

            {/* Photo Gallery Modal */}
            <AnimatePresence>
                {showGallery && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 bg-black">
                            <h3 className="text-white font-serif text-xl">{property.name} - Gallery</h3>
                            <button 
                                onClick={() => setShowGallery(false)}
                                className="text-white hover:text-royalGold-400 p-2"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
                            <div className="max-w-5xl mx-auto space-y-8 flex flex-col items-center">
                                <img src={property.image} className="w-full max-w-4xl rounded-2xl object-cover shadow-2xl" />
                                {currentPhotos.map((photo, idx) => (
                                    <img key={idx} src={photo} className="w-full max-w-4xl rounded-2xl object-cover shadow-2xl" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function MapView({ property, accommodations }) {
    const currentProperty = property || (accommodations && accommodations.length > 0 ? accommodations[0] : null);
    
    const [originHub, setOriginHub] = useState('Central Executive Hub');

    const originCoords = {
        'Central Executive Hub': [6.9271, 79.8612],
        'Bandaranaike International Airport': [7.1804, 79.8833],
        'Colombo Fort Station': [6.9333, 79.8500]
    };
    
    const startPos = originCoords[originHub] || originCoords['Central Executive Hub'];
    const endPos = currentProperty ? [currentProperty.lat, currentProperty.lng] : [8.1942, 80.5284];
    
    const center = [(startPos[0] + endPos[0]) / 2, (startPos[1] + endPos[1]) / 2];
    const zoom = 8;

    const [transitMethod, setTransitMethod] = useState('car');
    const [isProcessing, setIsProcessing] = useState(false);
    const [gpsProgress, setGpsProgress] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        let interval;
        if (isSimulating && gpsProgress < 100) {
            interval = setInterval(() => {
                setGpsProgress(prev => {
                    const next = prev + Math.floor(Math.random() * 8) + 2;
                    if (next >= 100) {
                        setIsSimulating(false);
                        return 100;
                    }
                    return next;
                });
            }, 300);
        }
        return () => clearInterval(interval);
    }, [isSimulating, gpsProgress]);

    const startSimulation = () => {
        setGpsProgress(0);
        setIsSimulating(true);
    };

    const resetSimulation = () => {
        setGpsProgress(0);
        setIsSimulating(false);
    };

    const handleTransitSelect = (method) => {
        setTransitMethod(method);
        if (currentProperty?.id) {
            setIsProcessing(true);
            router.post(`/accommodations/${currentProperty.id}/transit`, { transit_method: method }, {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsProcessing(false),
            });
        }
    };

    const transitData = {
        car: { label: 'Chauffeured Car', icon: Car, cost: 'LKR 13,500', time: '38 Mins', distance: '42.8 km' },
        shuttle: { label: 'Shuttle Express', icon: Wind, cost: 'LKR 4,500', time: '55 Mins', distance: '45.1 km' },
        rail: { label: 'High-Speed Rail', icon: Compass, cost: 'LKR 7,500', time: '25 Mins', distance: '38.5 km' },
        bicycle: { label: 'Bicycle', icon: Bike, cost: 'Free', time: '2 Hrs 15 Mins', distance: '39.0 km' },
        walking: { label: 'Walking', icon: Footprints, cost: 'Free', time: '8 Hrs 30 Mins', distance: '37.5 km' }
    };
    const currentTransit = transitData[transitMethod];
    const ActiveIcon = currentTransit.icon;

    const getNavigationSteps = () => {
        const destName = currentProperty?.name || 'Aurelia Riviera Resort & Spa';
        const destLoc = currentProperty?.location || 'the destination';
        
        switch (transitMethod) {
            case 'car':
            case 'shuttle':
                return [
                    { step: `Depart from ${originHub} towards A2 Highway`, dist: '2.4 km', time: '5 mins', active: true },
                    { step: `Merge onto Southern Expressway (E01) towards ${destLoc}`, dist: '28.2 km', time: '25 mins', active: false },
                    { step: `Take the exit towards ${destLoc} Scenic Route`, dist: '8.6 km', time: '12 mins', active: false, highlight: true, highlightText: `${destLoc} Scenic Route` },
                    { step: `Arrive at ${destName}`, dist: '3.6 km', time: '13 mins', active: false, highlight: true, highlightText: `Arrive at ${destName}` },
                ];
            case 'rail':
                return [
                    { step: `Board the Intercity Express at ${originHub} Station`, dist: '0 km', time: '0 mins', active: true },
                    { step: `Travel along the Coastal Line towards ${destLoc}`, dist: '35.0 km', time: '20 mins', active: false },
                    { step: `Disembark at ${destLoc} Railway Station`, dist: '0 km', time: '0 mins', active: false, highlight: true, highlightText: `${destLoc} Railway Station` },
                    { step: `Transfer to ${destName}`, dist: '3.5 km', time: '5 mins', active: false, highlight: true, highlightText: `Transfer to ${destName}` },
                ];
            case 'bicycle':
                return [
                    { step: `Start cycling from ${originHub} along Coastal Path`, dist: '5.4 km', time: '25 mins', active: true },
                    { step: `Continue on the Old Galle Road cycle lane`, dist: '18.2 km', time: '1 hr 10 mins', active: false },
                    { step: `Turn left onto ${destLoc} local roads`, dist: '12.6 km', time: '45 mins', active: false, highlight: true, highlightText: `${destLoc} local roads` },
                    { step: `Arrive at ${destName} (Bicycle Parking)`, dist: '2.8 km', time: '15 mins', active: false, highlight: true, highlightText: `Arrive at ${destName}` },
                ];
            case 'walking':
                return [
                    { step: `Head south from ${originHub} walkway`, dist: '2.4 km', time: '30 mins', active: true },
                    { step: `Walk along the Beachfront Promenade`, dist: '15.2 km', time: '3 hrs 15 mins', active: false },
                    { step: `Follow the nature trails towards ${destLoc}`, dist: '16.6 km', time: '4 hrs', active: false, highlight: true, highlightText: `towards ${destLoc}` },
                    { step: `Arrive at ${destName} (Main Reception)`, dist: '3.3 km', time: '45 mins', active: false, highlight: true, highlightText: `Arrive at ${destName}` },
                ];
            default:
                return [];
        }
    };
    
    const navigationSteps = getNavigationSteps();

    const getFooterText = () => {
        if (transitMethod === 'car') return 'Chauffeured vehicle is satellite-monitored 24/7 for security.';
        if (transitMethod === 'shuttle') return 'Shared shuttle is GPS-tracked and sanitized between trips.';
        if (transitMethod === 'rail') return 'First-class rail tickets include priority boarding and lounge access.';
        if (transitMethod === 'bicycle') return 'Bicycles are provided with helmets and safety gear on arrival.';
        if (transitMethod === 'walking') return 'Walking paths are well-lit and patrolled by resort security.';
        return '';
    };

    const getRoutePositions = () => {
        const dx = endPos[0] - startPos[0];
        const dy = endPos[1] - startPos[1];
        let offset1 = 0, offset2 = 0;
        
        if (transitMethod === 'car') { offset1 = 0.1; offset2 = 0.05; }
        else if (transitMethod === 'shuttle') { offset1 = -0.05; offset2 = -0.1; }
        else if (transitMethod === 'rail') { offset1 = 0.02; offset2 = -0.02; }
        else if (transitMethod === 'bicycle') { offset1 = 0.15; offset2 = 0.15; }
        else if (transitMethod === 'walking') { offset1 = -0.1; offset2 = 0.1; }

        const mid1 = [
            startPos[0] + dx * 0.33 + (dy * offset1),
            startPos[1] + dy * 0.33 - (dx * offset1)
        ];
        
        const mid2 = [
            startPos[0] + dx * 0.66 + (dy * offset2),
            startPos[1] + dy * 0.66 - (dx * offset2)
        ];
        
        return [startPos, mid1, mid2, endPos];
    };

    function MapUpdater({ center, zoom }) {
        const map = useMap();
        useEffect(() => {
            map.flyTo(center, zoom, { duration: 1.5 });
        }, [center, zoom, map]);
        return null;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            {/* Control Bar */}
            <div className="bg-royalMaroon-900 text-white rounded-3xl p-6 shadow-xl flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <div className="text-royalGold-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                        LIVE CHAUFFEURED ROUTE & TELEMETRY
                    </div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Route to {currentProperty?.name || 'Ulagalla by Uga Escapes'}</h2>
                    <div className="text-xs text-white/80 flex items-center gap-1">
                        <MapPin size={12} className="text-royalGold-400" /> Origin: 
                        <select 
                            value={originHub} 
                            onChange={(e) => setOriginHub(e.target.value)}
                            className="bg-transparent border-none text-white font-bold text-xs p-0 focus:ring-0 cursor-pointer"
                        >
                            <option className="text-slate-800" value="Central Executive Hub">Central Executive Hub</option>
                            <option className="text-slate-800" value="Bandaranaike International Airport">Bandaranaike International Airport</option>
                            <option className="text-slate-800" value="Colombo Fort Station">Colombo Fort Station</option>
                        </select>
                        <ArrowRight size={12} className="mx-2 text-white/50" /> 
                        Destination: <span className="font-bold text-white">{currentProperty?.location || 'Thirappane, Anuradhapura, Sri Lanka'}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 xl:justify-end w-full">
                    <button 
                        onClick={() => handleTransitSelect('car')}
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${transitMethod === 'car' ? 'bg-royalGold-400 text-royalMaroon-900 shadow-md' : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white border border-white/10'}`}>
                        <Car size={14} /> Chauffeured Car
                    </button>
                    <button 
                        onClick={() => handleTransitSelect('shuttle')}
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${transitMethod === 'shuttle' ? 'bg-royalGold-400 text-royalMaroon-900 shadow-md' : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white border border-white/10'}`}>
                        <Wind size={14} /> Shuttle Express
                    </button>
                    <button 
                        onClick={() => handleTransitSelect('rail')}
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${transitMethod === 'rail' ? 'bg-royalGold-400 text-royalMaroon-900 shadow-md' : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white border border-white/10'}`}>
                        <Compass size={14} /> High-Speed Rail
                    </button>
                    <button 
                        onClick={() => handleTransitSelect('bicycle')}
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${transitMethod === 'bicycle' ? 'bg-royalGold-400 text-royalMaroon-900 shadow-md' : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white border border-white/10'}`}>
                        <Bike size={14} /> Bicycle
                    </button>
                    <button 
                        onClick={() => handleTransitSelect('walking')}
                        disabled={isProcessing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${transitMethod === 'walking' ? 'bg-royalGold-400 text-royalMaroon-900 shadow-md' : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white border border-white/10'}`}>
                        <Footprints size={14} /> Walking
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 flex flex-col xl:flex-row gap-8 rounded-b-3xl shadow-sm border border-gray-100">
                {/* Left Side (Map) */}
                <div className="flex-1 space-y-4">
                    <div className="bg-royalMaroon-950 rounded-3xl overflow-hidden relative border border-gray-200 shadow-md h-[500px]">
                        
                        <div className="absolute top-6 left-6 z-[1000] bg-black/80 backdrop-blur border border-white/10 p-4 rounded-2xl shadow-xl text-white">
                            <div className="text-[9px] uppercase tracking-widest text-white/50 font-bold mb-2">Estimated Transit Stats</div>
                            <div className="flex items-center gap-3">
                                <div className="text-lg font-bold flex items-center gap-1"><Calendar size={16}/> {currentTransit.time.split(' ')[0]} <span className="text-[10px] font-normal text-white/50">Mins</span></div>
                                <div className="h-4 w-px bg-white/20"></div>
                                <div className="text-sm font-bold text-royalGold-400 flex items-center gap-1"><Navigation size={14}/> {gpsProgress}% En Route</div>
                                <div className="h-4 w-px bg-white/20"></div>
                                <div className="text-xs text-royalTeal font-bold flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-royalMaroon-800"></div> Clear Traffic
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-6 right-6 z-[1000] flex gap-2">
                            <button className="w-10 h-10 bg-black/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors">
                                <Compass size={18} />
                            </button>
                            <button className="w-10 h-10 bg-black/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors">
                                <Globe size={18} />
                            </button>
                        </div>

                        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', background: '#40030a' }} zoomControl={false}>
                            <MapUpdater center={center} zoom={zoom} />
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />
                            <Polyline 
                                positions={getRoutePositions()} 
                                color={transitMethod === 'walking' ? '#34d399' : transitMethod === 'bicycle' ? '#3b82f6' : transitMethod === 'rail' ? '#f43f5e' : '#ff8c00'} 
                                weight={4} 
                                dashArray={transitMethod === 'walking' || transitMethod === 'bicycle' ? '8, 8' : ''}
                            />
                            <Marker position={startPos}>
                                <Popup>{originHub}</Popup>
                            </Marker>
                            <Marker position={endPos}>
                                <Popup>{currentProperty?.name || 'Aurelia Riviera Resort'}</Popup>
                            </Marker>
                        </MapContainer>
                        
                        {/* Map Footer Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 z-[1000] flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="flex gap-2">
                                <button 
                                    onClick={startSimulation}
                                    disabled={isSimulating || gpsProgress === 100}
                                    className="bg-royalGold-400 hover:bg-royalGold-500 text-royalMaroon-900 px-6 py-3 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
                                    <Navigation size={16} className="rotate-90" /> {isSimulating ? 'Simulating...' : (gpsProgress === 100 ? 'Arrived' : 'Simulate Live GPS')}
                                </button>
                                <button 
                                    onClick={resetSimulation}
                                    className="w-12 h-12 bg-black/80 backdrop-blur border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
                                    <RotateCcw size={18} />
                                </button>
                            </div>
                            <div className="bg-black/80 backdrop-blur border border-white/10 p-4 rounded-2xl shadow-xl text-white w-full md:w-80">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">GPS Navigation Progress</div>
                                    <div className="text-xs font-bold text-white/90">{gpsProgress}%</div>
                                </div>
                                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                    <div className="bg-royalGold-400 h-full transition-all duration-300" style={{width: `${gpsProgress}%`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-royalTeal">
                                <ActiveIcon size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-royalTeal mb-1">{currentTransit.label} Specification</h4>
                                <div className="text-xs text-gray-500">Estimated Transit Cost: <span className="font-bold text-gray-700">{currentTransit.cost}</span></div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-sm text-royalTeal mb-1">{currentTransit.time}</div>
                            <div className="text-[10px] text-gray-400 font-medium">{currentTransit.distance} distance</div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Steps) */}
                <div className="w-full xl:w-96 border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif font-bold text-royalTeal text-lg flex items-center gap-2">
                            <Navigation size={18} className="text-gray-300" /> Turn-by-Turn Navigation
                        </h3>
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-[10px] font-bold">{navigationSteps.length} Steps</span>
                    </div>

                    <div className="space-y-4 flex-1">
                        {navigationSteps.map((s, i) => (
                            <div key={i} className={`p-4 rounded-xl border ${s.active ? 'border-royalMaroon-800 bg-[#fdf9f9] shadow-sm' : 'border-gray-100 bg-white'}`}>
                                <div className="flex gap-4 items-start">
                                    <div className="mt-0.5 w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center shrink-0">
                                        <ArrowRight size={14} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold leading-relaxed mb-2 ${s.active ? 'text-royalTeal' : 'text-gray-700'}`}>
                                            {s.highlight && s.highlightText ? (
                                                <span dangerouslySetInnerHTML={{__html: s.step.replace(s.highlightText, `<span class="bg-royalGold-400/30 px-1 rounded">${s.highlightText}</span>`)}} />
                                            ) : s.step}
                                        </p>
                                        <div className="flex items-center gap-2 text-[10px] font-bold">
                                            {s.highlight ? (
                                                <>
                                                    <span className="bg-royalGold-400 text-royalMaroon-900 px-1.5 py-0.5 rounded">{s.dist}</span>
                                                    <span className="bg-royalGold-400 text-royalMaroon-900 px-1.5 py-0.5 rounded">{s.time}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-gray-400">{s.dist}</span>
                                                    <span className="text-gray-300">•</span>
                                                    <span className="text-gray-400">{s.time}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full border border-royalGold-400"></div> {getFooterText()}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function FoodView({ cart, setCart }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All Dishes');
    const [showFoodCheckout, setShowFoodCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [paymentData, setPaymentData] = useState({
        card_holder: '',
        card_number: '',
        valid_date: '',
        cvv: ''
    });
    const [paymentErrors, setPaymentErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const categories = [
        'All Dishes',
        'Sinhala Traditional',
        'Jaffna Tamil',
        'Royal Heritage & Seafood',
        'Street Food & Rotis',
        'Ceylon Teas & Beverages',
        'Breakfast',
        'Lunch',
        'Dinner'
    ];

    const filteredMenu = activeCategory === 'All' || activeCategory === 'All Dishes'
        ? FOOD_MENU
        : FOOD_MENU.filter(item => {
            const cat = activeCategory.toUpperCase();
            if (cat.includes('SINHALA')) return item.category === 'SINHALA TRADITIONAL';
            if (cat.includes('JAFFNA') || cat.includes('TAMIL')) return item.category === 'JAFFNA TAMIL';
            if (cat.includes('ROYAL') || cat.includes('SEAFOOD')) return item.category === 'ROYAL HERITAGE & SEAFOOD';
            if (cat.includes('STREET') || cat.includes('ROTI')) return item.category === 'STREET FOOD & ROTIS';
            if (cat.includes('TEA') || cat.includes('BEVERAGE')) return item.category === 'CEYLON TEAS & BEVERAGES';
            if (cat === 'BREAKFAST') return item.mealType === 'BREAKFAST';
            if (cat === 'LUNCH') return item.mealType === 'LUNCH';
            if (cat === 'DINNER') return item.mealType === 'DINNER';
            return item.category === cat || item.mealType === cat;
        });

    const addToCart = (item) => {
        const existing = cart.find(c => c.id === item.id);
        if(existing) {
            setCart(cart.map(c => c.id === item.id ? {...c, qty: c.qty + 1} : c));
        } else {
            setCart([...cart, {...item, qty: 1}]);
        }
        setIsCartOpen(true);
    };

    const updateQty = (id, change) => {
        setCart(cart.map(c => {
            if(c.id === id) {
                const newQty = c.qty + change;
                return newQty > 0 ? {...c, qty: newQty} : null;
            }
            return c;
        }).filter(Boolean));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full pb-20">
            {/* Full Width Header */}
            <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-royalMaroon-800 text-white py-12 px-4 sm:px-6 lg:px-8 mb-10 -mt-8 shadow-md">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="text-royalGold-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
                            <Sparkles size={12} /> AUTHENTIC SRI LANKAN IN-HOUSE GASTRONOMY
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3">Sri Lankan Heritage Cuisine & Room Service</h2>
                        <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
                            Prepared fresh by master heritage chefs celebrating authentic Sinhala, Jaffna Tamil, Royal Seafood, and Ceylon tea traditions delivered hot to your suite or private verandah.
                        </p>
                    </div>
                    <button onClick={() => setIsCartOpen(!isCartOpen)} className="bg-royalGold-400 hover:bg-royalGold-500 text-royalMaroon-900 px-6 py-3 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-colors">
                        <ShoppingCart size={18} /> Room Order Cart ({cart.length})
                    </button>
                </div>
            </div>

            {/* Filter Navigation */}
            <div className="flex gap-3 mb-10 border-b border-gray-100 pb-6 overflow-x-auto scrollbar-hide">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)} 
                        className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                            activeCategory === cat 
                                ? 'bg-royalMaroon-800 text-royalGold-400 border-royalMaroon-800 shadow-md scale-105' 
                                : 'bg-white text-gray-700 border-gray-200 hover:border-royalGold-400 hover:text-royalMaroon-800'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredMenu.map(item => (
                    <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all flex flex-col group">
                        <div className="h-64 relative overflow-hidden bg-gray-100">
                            <img 
                                src={item.image} 
                                alt={item.name}
                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                                <span className="px-3.5 py-1.5 bg-royalMaroon-900/90 backdrop-blur text-royalGold-400 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-lg border border-royalGold-400/20">
                                    {item.category}
                                </span>
                                {item.mealType && (
                                    <span className="px-3 py-1 bg-royalTeal text-white text-[8px] font-bold uppercase tracking-wider rounded-full shadow-md">
                                        {item.mealType}
                                    </span>
                                )}
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-white text-[10px] font-bold border border-white/10 shadow-lg">
                                <Calendar size={12} className="text-royalGold-400"/> {item.time}
                            </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4 gap-4">
                                <h3 className="font-serif font-bold text-xl text-royalTeal leading-tight">{item.name}</h3>
                                <div className="text-royalTeal font-bold text-lg">{formatPrice(item.price)}</div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                                {item.description}
                            </p>
                            
                            <div className="mb-6">
                                <div className="text-[10px] text-gray-400 italic leading-relaxed">
                                    Ingredients: {item.ingredients}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                {item.tags.map(tag => (
                                    <span key={tag} className={`px-2.5 py-1 text-[9px] font-bold flex items-center gap-1 rounded uppercase tracking-widest border ${tag === 'Michelin Signature' ? 'bg-[#fce8eb] border-[#f5aebb] text-royalTeal' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                                        {tag === 'Michelin Signature' && <Sparkles size={10} className="text-royalTeal" />}
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => addToCart(item)}
                                className="w-full py-4 bg-royalGold-400 hover:bg-royalGold-500 text-royalMaroon-900 font-bold text-sm rounded-xl shadow-[0_4px_14px_0_rgba(255,107,53,0.39)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                            >
                                <Plus size={16} /> Customize & Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: 400 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 400 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[420px] bg-white shadow-2xl z-[1000] border-l border-gray-100 flex flex-col"
                    >
                        <div className="p-8 bg-royalMaroon-800 text-white flex justify-between items-center border-b border-royalGold-400/30">
                            <h3 className="text-2xl font-serif font-bold text-royalGold-400 flex items-center gap-3">
                                <ShoppingCart size={24}/> Your Order
                            </h3>
                            <button onClick={() => setIsCartOpen(false)} className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24}/></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
                                    <Utensils size={64} className="mb-6 opacity-20" />
                                    <p className="font-bold text-gray-500">Your cart is empty.</p>
                                    <p className="text-sm mt-2">Select items from our Michelin menu.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <img src={item.image} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{item.name}</h4>
                                                    <div className="text-royalTeal font-bold text-sm">{formatPrice(item.price)}</div>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 shadow-sm"><Minus size={12}/></button>
                                                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 shadow-sm"><Plus size={12}/></button>
                                                    </div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        ${item.price * item.qty}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-8 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between text-sm text-gray-500 mb-3">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-700">${cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mb-5">
                                    <span>Service Charge (10%)</span>
                                    <span className="font-bold text-gray-700">${Math.round(cartTotal * 0.1)}</span>
                                </div>
                                <div className="flex justify-between text-2xl font-bold text-royalTeal mb-6 pb-6 border-b border-gray-100">
                                    <span>Total</span>
                                    <span>${cartTotal + Math.round(cartTotal * 0.1)}</span>
                                </div>
                                <button 
                                    onClick={() => setShowFoodCheckout(true)}
                                    className="w-full py-4 bg-royalMaroon-800 text-royalGold-400 font-bold rounded-xl shadow-lg hover:bg-royalMaroon-700 transition-colors flex items-center justify-center gap-2">
                                    Checkout Order <Check size={18} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Food Checkout Modal */}
            <AnimatePresence>
                {showFoodCheckout && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="bg-royalMaroon-800 p-6 text-white flex justify-between items-center border-b border-royalGold-400/30 shrink-0">
                                <h3 className="text-xl font-serif font-bold text-royalGold-400">Complete Dining Order</h3>
                                <button onClick={() => setShowFoodCheckout(false)} className="text-white/70 hover:text-white"><X size={24}/></button>
                            </div>
                            <div className="p-8 overflow-y-auto">
                                <div className="mb-8 pb-8 border-b border-gray-100 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">Your Cart ({cart.reduce((sum, item) => sum + item.qty, 0)} items)</h4>
                                    </div>
                                    <p className="font-bold text-royalTeal text-xl">Total: ${cart.reduce((sum, item) => sum + (item.price * item.qty), 0) + Math.round(cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * 0.1)}</p>
                                </div>
                                
                                <h2 className="text-xl font-bold text-slate-900 mb-6 font-sans">Payment Method</h2>
                                
                                <div className="p-3 sm:p-4 rounded-lg space-y-3" style={{backgroundColor: '#6F4E37'}}>
                                    {/* KOKO Option */}
                                    <div className="bg-white rounded-md p-4 flex items-center justify-between cursor-pointer shadow-sm" onClick={() => setPaymentMethod('koko')}>
                                        <div className="flex items-center gap-4">
                                            <input type="radio" checked={paymentMethod === 'koko'} onChange={() => setPaymentMethod('koko')} className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                            <span className="font-medium text-slate-800 text-[15px]">KOKO</span>
                                        </div>
                                        <div className="font-bold text-lg tracking-wider" style={{WebkitTextStroke: "1px #6F4E37", color: "transparent"}}>KOKO</div>
                                    </div>
                                    
                                    {/* Credit/Debit Card Option */}
                                    <div className={`bg-white rounded-md p-5 shadow-sm cursor-pointer ${paymentMethod === 'card' ? 'ring-2 ring-craft-brown border-transparent' : ''}`} onClick={() => setPaymentMethod('card')}>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-4">
                                                <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 border-slate-300" style={{accentColor: '#6F4E37'}} />
                                                <span className="font-medium text-slate-800 text-[15px]">Credit/ Debit Card</span>
                                            </div>
                                            <CreditCard className="w-7 h-7" style={{color: '#3b82f6'}} strokeWidth={1.5} />
                                        </div>
                                        
                                        {paymentMethod === 'card' && (
                                            <>
                                                <div className="mb-6 pl-9">
                                                    <p className="text-[13px] text-slate-500 mb-2">We accept</p>
                                                    <div className="flex gap-2">
                                                        <div className="border border-slate-200 rounded px-2.5 py-1 font-bold italic text-[11px] flex items-center justify-center h-7" style={{color: '#1d4ed8'}}>VISA</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Holder</label>
                                                        <input type="text" value={paymentData.card_holder} onChange={e => setPaymentData({...paymentData, card_holder: e.target.value})} className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 text-slate-900" style={{outlineColor: '#6F4E37'}} />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Card Number</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                                <CreditCard className="h-4 w-4 text-slate-400" />
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                value={paymentData.card_number} 
                                                                onChange={e => {
                                                                    let val = e.target.value.replace(/\D/g, '');
                                                                    val = val.replace(/(.{4})/g, '$1 ').trim();
                                                                    setPaymentData({...paymentData, card_number: val.substring(0, 19)});
                                                                }} 
                                                                placeholder="0000 0000 0000 0000" 
                                                                className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono text-slate-900" 
                                                                style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} 
                                                                maxLength="19"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Valid Date</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                value={paymentData.valid_date} 
                                                                onChange={e => {
                                                                    let val = e.target.value.replace(/\D/g, '');
                                                                    if (val.length > 2) {
                                                                        val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                                                    }
                                                                    setPaymentData({...paymentData, valid_date: val});
                                                                }} 
                                                                placeholder="MM/YY" 
                                                                className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono text-slate-900" 
                                                                style={{outlineColor: '#6F4E37', paddingLeft: '1.5rem'}} 
                                                                maxLength="5"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">CVV</label>
                                                        <input type="text" value={paymentData.cvv} onChange={e => setPaymentData({...paymentData, cvv: e.target.value})} placeholder="XXX" className="w-full border-slate-300 rounded-md shadow-sm text-sm py-2 font-mono text-slate-900" style={{outlineColor: '#6F4E37'}} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                            
                                        <div className="pt-4 mt-4">
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={() => setShowFoodCheckout(false)}
                                                    className="w-full text-slate-700 font-medium py-2.5 rounded shadow-sm transition-all text-sm hover:bg-slate-200 bg-slate-100 flex justify-center items-center"
                                                >
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={async () => {
                                                        setProcessing(true);
                                                        setPaymentErrors({});
                                                        try {
                                                            const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                                                            const grandTotal = cartTotal + Math.round(cartTotal * 0.1);
                                                            const response = await axios.post('/api/orders', {
                                                                type: 'food',
                                                                details: { cart },
                                                                total_amount: grandTotal,
                                                                payment_method: paymentMethod,
                                                                payment_details: paymentMethod === 'card' ? paymentData : null
                                                            });
                                                            setProcessing(false);
                                                            setShowFoodCheckout(false);
                                                            setCart([]);
                                                            setIsCartOpen(false);
                                                            alert("Dining Order Confirmed! Order ID: " + response.data.order.id);
                                                        } catch (error) {
                                                            setProcessing(false);
                                                            if (error.response?.data?.message) {
                                                                alert("Error: " + error.response.data.message);
                                                            } else {
                                                                alert("Payment processing failed.");
                                                            }
                                                        }
                                                    }}
                                                    disabled={processing}
                                                    className="w-full text-white font-medium py-2.5 rounded shadow-sm transition-all text-sm hover:opacity-90 disabled:opacity-70 flex justify-center items-center gap-2"
                                                    style={{backgroundColor: '#6F4E37'}}
                                                >
                                                    {processing ? 'Processing...' : 'Confirm'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
