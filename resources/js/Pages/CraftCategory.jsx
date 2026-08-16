import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { useState } from 'react';

export default function CraftCategory({ auth, category, laravelVersion, phpVersion }) {
    const categoryDatabase = {
        'stone-carving': { 
            title: 'Traditional Stone Sculpting', 
            desc: 'Master stonemasons recreate the glory of ancient Anuradhapura.',
            filters: [
                { id: 'moonstones', label: 'Moonstones (Sandakada Pahana)' },
                { id: 'guardstones', label: 'Guardstones (Muragala)' },
                { id: 'statues', label: 'Buddha Statues' },
                { id: 'pillars', label: 'Carved Pillars' },
                { id: 'plaques', label: 'Decorative Plaques' },
            ],
            products: [
                { id: 101, filterId: 'moonstones', title: "Granite Moonstone Replica", subtitle: "Intricately carved granite half-lotus moonstone replica.", price: "Rs. 15,000.00", rating: "4.9 stars", image: "/images/crafts/moonstone.png" },
                { id: 102, filterId: 'guardstones', title: "Traditional Guardstone", subtitle: "Detailed Muragala carving for entrance protection.", price: "Rs. 12,500.00", rating: "4.8 stars", image: "/images/crafts/guardstone.png" },
                { id: 103, filterId: 'statues', title: "Samadhi Buddha Statue", subtitle: "Serene Buddha statue carved from solid black granite.", price: "Rs. 25,000.00", rating: "5.0 stars", image: "/images/crafts/samadhi.png" },
                { id: 104, filterId: 'pillars', title: "Lotus Pillar Capital", subtitle: "Traditional Pekada design stone pillar top.", price: "Rs. 8,000.00", rating: "4.7 stars", image: "/images/crafts/pillar.png" },
                { id: 105, filterId: 'plaques', title: "Stone Carved Elephant", subtitle: "Decorative wall plaque featuring the royal elephant.", price: "Rs. 6,500.00", rating: "4.8 stars", image: "/images/crafts/stone_elephant.png" },
            ]
        },
        'rajarata-pottery': { 
            title: 'Rajarata Clay Pottery', 
            desc: 'Discover a world of unique, decorative items, cooking pots, lamps, and more. A heritage of artistry in every piece, crafted from the rich red laterite clay of the dry zone.',
            filters: [
                { id: 'clay-pots', label: 'Clay Pots & Jugs' },
                { id: 'oil-lamps', label: 'Ritual Oil Lamps' },
                { id: 'vases', label: 'Decorative Vases' },
                { id: 'bowls', label: 'Serving Bowls' },
                { id: 'figurines', label: 'Figurines & Decor' },
                { id: 'mugs', label: 'Mugs & Cups' },
                { id: 'planters', label: 'Planters' },
            ],
            products: [
                { id: 1, filterId: 'clay-pots', title: "Traditional Terracotta Water Jug", subtitle: "Hand-thrown Gurulethu with intricate etched patterns, naturally cools water.", price: "Rs. 4,500.00", rating: "4.9 stars", image: "/images/crafts/jug.png" },
                { id: 2, filterId: 'oil-lamps', title: "Multi-spout Ritual Oil Lamp", subtitle: "Traditional Pahana used for temple offerings and blessings.", price: "Rs. 3,200.00", rating: "4.8 stars", image: "/images/crafts/lamp.png" },
                { id: 3, filterId: 'clay-pots', title: "Rustic Clay Cooking Pot", subtitle: "Authentic Chatti for slow-cooking curries, retains heat perfectly.", price: "Rs. 2,800.00", rating: "4.7 stars", image: "/images/crafts/pot.png" },
                { id: 4, filterId: 'vases', title: "Decorative Terracotta Vase", subtitle: "Elegant vase featuring ancient Sri Lankan floral motifs.", price: "Rs. 6,500.00", rating: "4.9 stars", image: "/images/crafts/vase.png" },
                { id: 5, filterId: 'bowls', title: "Wide Serving Bowl", subtitle: "Perfect for serving rice and traditional dishes, unglazed inside.", price: "Rs. 3,000.00", rating: "4.8 stars", image: "/images/crafts/bowl.png" },
                { id: 6, filterId: 'figurines', title: "Handcrafted Clay Elephant", subtitle: "Intricately detailed figurine representing majestic Sri Lankan wildlife.", price: "Rs. 5,000.00", rating: "4.9 stars", image: "/images/crafts/elephant.png" },
                { id: 7, filterId: 'mugs', title: "Rustic Tea Mug", subtitle: "Enjoy Ceylon tea in a traditional, earthy clay mug.", price: "Rs. 1,200.00", rating: "4.6 stars", image: "/images/crafts/mug.png" },
                { id: 8, filterId: 'planters', title: "Traditional Planter Pot", subtitle: "Wide base terracotta planter for indoor and outdoor plants.", price: "Rs. 4,000.00", rating: "4.8 stars", image: "/images/crafts/planter.png" }
            ]
        },
        'rush-reed-weaving': {
            title: 'Rush & Reed Weaving (Pan)',
            desc: 'Women from communities surrounding the ancient reservoirs expertly weave dried reeds and rushes into beautiful, eco-friendly mats, baskets, and intricate household items.',
            filters: [
                { id: 'mats', label: 'Mats (Paduru)' },
                { id: 'baskets', label: 'Baskets' },
                { id: 'bags', label: 'Bags & Totes' },
                { id: 'coasters', label: 'Tableware & Coasters' }
            ],
            products: [
                { id: 201, filterId: 'mats', title: "Traditional Pan Padura", subtitle: "Handwoven reed mat featuring vibrant geometric patterns, perfect for lounging or decoration.", price: "Rs. 4,500.00", rating: "4.9 stars", image: "/images/crafts/reed_mat.png" },
                { id: 202, filterId: 'baskets', title: "Woven Storage Basket", subtitle: "Sturdy and eco-friendly circular reed basket with woven handles.", price: "Rs. 2,800.00", rating: "4.8 stars", image: "/images/crafts/woven_basket.png" },
                { id: 203, filterId: 'bags', label: 'Bags & Totes', title: "Stylish Pan Tote Bag", subtitle: "Fashionable and durable reed tote bag with sturdy leather handles.", price: "Rs. 3,500.00", rating: "4.7 stars", image: "/images/crafts/reed_bag.png" },
                { id: 204, filterId: 'coasters', title: "Woven Coaster Set", subtitle: "Set of 6 intricately patterned circular coasters to protect your tables.", price: "Rs. 1,200.00", rating: "4.6 stars", image: "/images/crafts/reed_coasters.png" }
            ]
        },
        'lotus-fibre-craft': {
            title: 'Lotus Stem Silk Extraction',
            desc: 'An innovative, highly sustainable MSME craft where artisans extract delicate micro-fibres from the lotus stems gathered from Anuradhapura’s ancient lakes to weave rare, luxurious textiles.',
            filters: [
                { id: 'scarves', label: 'Scarves & Shawls' },
                { id: 'fabric', label: 'Fabric Rolls' },
                { id: 'yarn', label: 'Lotus Yarn' },
                { id: 'accessories', label: 'Accessories' }
            ],
            products: [
                { id: 301, filterId: 'scarves', title: "Handwoven Lotus Silk Scarf", subtitle: "Delicate, breathable and luxurious scarf naturally dyed.", price: "Rs. 18,500.00", rating: "5.0 stars", image: "/images/crafts/lotus_scarf.png" },
                { id: 302, filterId: 'fabric', title: "Raw Lotus Fabric Roll", subtitle: "1 meter of unbleached artisanal lotus stem silk fabric.", price: "Rs. 25,000.00", rating: "4.9 stars", image: "/images/crafts/lotus_fabric.png" },
                { id: 303, filterId: 'yarn', title: "Lotus Micro-Fibre Yarn", subtitle: "Spool of pure, naturally extracted lotus stem fibre for weaving.", price: "Rs. 8,500.00", rating: "4.8 stars", image: "/images/crafts/lotus_yarn.png" },
                { id: 304, filterId: 'accessories', title: "Lotus Silk Handkerchief", subtitle: "Soft and sustainable handkerchief with fringed edges.", price: "Rs. 3,500.00", rating: "4.7 stars", image: "/images/crafts/lotus_handkerchief.png" }
            ]
        },
        'wood-carving': {
            title: 'Anuradhapura Woodcraft',
            desc: 'Skilled carpenters shape locally sourced timber into stunning architectural elements.',
            filters: [ { id: 'carvings', label: 'Wood Carvings' }, { id: 'furniture', label: 'Furniture' } ],
            products: [
                { id: 401, filterId: 'carvings', title: "Traditional Wooden Mask", subtitle: "Hand-carved and painted mask.", price: "Rs. 4,500.00", rating: "4.8 stars", image: "/images/woodcraft.png" },
                { id: 402, filterId: 'furniture', title: "Carved Wooden Table", subtitle: "Small intricately carved side table.", price: "Rs. 15,000.00", rating: "4.9 stars", image: "/images/woodcraft.png" }
            ]
        },
        'handloom-textiles': {
            title: 'Rajarata Handloom Centres',
            desc: 'Local handloom cooperatives supporting female artisans who weave vibrant cotton fabrics.',
            filters: [ { id: 'clothing', label: 'Clothing' }, { id: 'homedecor', label: 'Home Decor' } ],
            products: [
                { id: 501, filterId: 'clothing', title: "Handloom Saree", subtitle: "Beautifully woven cotton saree.", price: "Rs. 6,000.00", rating: "4.7 stars", image: "/images/handloom.png" },
                { id: 502, filterId: 'homedecor', title: "Woven Table Runner", subtitle: "Colorful handloom table runner.", price: "Rs. 2,500.00", rating: "4.6 stars", image: "/images/handloom.png" }
            ]
        },
        'craft-village-tour': {
            title: 'Kala Grama Artisan Tour', desc: 'A guided immersive tour through dedicated artisan villages.',
            filters: [{ id: 'tickets', label: 'Tickets' }],
            products: [{ id: 601, filterId: 'tickets', title: "Tour Ticket", subtitle: "Full day guided tour.", price: "Rs. 10,000.00", rating: "5.0 stars", image: "/images/crafts/banner.png" }]
        },
        'pottery-workshop': {
            title: 'Hands-on Clay Workshop', desc: 'Learn the ancient techniques of wheel-throwing.',
            filters: [{ id: 'tickets', label: 'Tickets' }],
            products: [{ id: 701, filterId: 'tickets', title: "Workshop Ticket", subtitle: "3 hour pottery class.", price: "Rs. 5,000.00", rating: "4.9 stars", image: "/images/crafts/pot.png" }]
        },
        'stone-carving-demo': {
            title: 'Stone Sculpting Experience', desc: 'Watch mesmerising demonstrations of granite carving.',
            filters: [{ id: 'tickets', label: 'Tickets' }],
            products: [{ id: 801, filterId: 'tickets', title: "Demo Ticket", subtitle: "2 hour carving demonstration.", price: "Rs. 3,500.00", rating: "4.8 stars", image: "/images/stone_demo.png" }]
        },
        'reed-weaving-class': {
            title: 'Pan Weaving Masterclass', desc: 'Sit alongside local weavers to learn processing reeds.',
            filters: [{ id: 'tickets', label: 'Tickets' }],
            products: [{ id: 901, filterId: 'tickets', title: "Class Ticket", subtitle: "Half-day weaving masterclass.", price: "Rs. 4,500.00", rating: "4.9 stars", image: "/images/crafts/reed_mat.png" }]
        },
        'lotus-silk-experience': {
            title: 'Lotus Silk Farm Visit', desc: 'Experience the magical process of transforming raw lotus stems.',
            filters: [{ id: 'tickets', label: 'Tickets' }],
            products: [{ id: 1001, filterId: 'tickets', title: "Farm Visit Ticket", subtitle: "Guided tour of the lotus silk farm.", price: "Rs. 6,000.00", rating: "5.0 stars", image: "/images/crafts/lotus_fabric.png" }]
        }
    };

    const categoryInfo = {
        'rush-reed-weaving': { title: 'Rush & Reed Weaving (Pan)', desc: 'Women from communities surrounding the ancient reservoirs expertly weave dried reeds and rushes into beautiful mats.' },
        'lotus-fibre-craft': { title: 'Lotus Stem Silk Extraction', desc: 'An innovative MSME craft where artisans extract delicate micro-fibres from lotus stems to weave luxurious textiles.' },
        'wood-carving': { title: 'Anuradhapura Woodcraft', desc: 'Skilled carpenters shape locally sourced timber into stunning architectural elements.' },
        'handloom-textiles': { title: 'Rajarata Handloom Centres', desc: 'Local handloom cooperatives supporting female artisans who weave vibrant cotton fabrics.' },
        'craft-village-tour': { title: 'Kala Grama Artisan Tour', desc: 'A guided immersive tour through dedicated artisan villages.' },
        'pottery-workshop': { title: 'Hands-on Clay Workshop', desc: 'Learn the ancient techniques of wheel-throwing and hand-building from hereditary potters.' },
        'stone-carving-demo': { title: 'Stone Sculpting Experience', desc: 'Watch mesmerising demonstrations of granite carving.' },
        'reed-weaving-class': { title: 'Pan Weaving Masterclass', desc: 'Sit alongside local weavers near the ancient reservoirs to learn the delicate art of processing reeds.' },
        'lotus-silk-experience': { title: 'Lotus Silk Farm Visit', desc: 'Experience the magical process of transforming raw lotus stems into exquisite fabric.' },
    };

    const currentCat = categoryDatabase[category] || 
        (categoryInfo[category] ? { ...categoryInfo[category], filters: [], products: [] } : categoryDatabase['rajarata-pottery']);

    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (filterId) => {
        setSelectedFilters(prev => 
            prev.includes(filterId) 
                ? prev.filter(id => id !== filterId)
                : [...prev, filterId]
        );
    };

    const displayedProducts = (selectedFilters.length > 0 && currentCat.products)
        ? currentCat.products.filter(p => selectedFilters.includes(p.filterId))
        : (currentCat.products || []);

    return (
        <>
            <Head title={`${currentCat.title} - Handcrafted Treasures`} />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <div className="bg-royalMaroon-950 text-white overflow-hidden relative">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between">
                        <div className="p-8 md:p-16 lg:pr-8 z-10 w-full md:w-1/2">
                            <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
                                Sri Lankan Heritage - <span className="font-bold">Handcrafted Treasures</span>
                            </h1>
                            <p className="text-white/80 font-light text-sm md:text-base leading-relaxed max-w-xl">
                                {currentCat.title}: {currentCat.desc}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 h-64 md:h-80 relative">
                            <img src="/images/crafts/banner.png" alt="Artisan working" className="w-full h-full object-cover object-center" />
                            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-royalMaroon-950 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <main className="flex-grow max-w-[1400px] mx-auto w-full flex flex-col md:flex-row py-8 px-4 sm:px-6 lg:px-8 gap-8">

                    {/* Left Sidebar Filter */}
                    <aside className="w-full md:w-64 shrink-0 flex flex-col h-fit md:sticky md:top-8 self-start">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Filter</h2>

                        {/* Product Type Filter */}
                        {currentCat.filters && currentCat.filters.length > 0 && (
                            <div className="mb-6 border-b border-slate-200 pb-4">
                                <button className="w-full flex items-center justify-between font-medium text-slate-700 hover:text-royalMaroon-900 mb-4 transition-colors">
                                    Product Type
                                </button>
                                <div className="space-y-3 pl-2">
                                    {currentCat.filters.map(type => {
                                        const isChecked = selectedFilters.includes(type.id);
                                        return (
                                            <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
                                                <input 
                                                    type="checkbox" 
                                                    className="hidden" 
                                                    checked={isChecked}
                                                    onChange={() => handleFilterChange(type.id)}
                                                />
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isChecked ? 'bg-[#1a1c21] border-[#1a1c21]' : 'border-slate-300 bg-white group-hover:border-[#1a1c21]'}`}>
                                                    {isChecked && (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className={`text-sm ${isChecked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{type.label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1 min-w-0 flex flex-col">

                        {/* Top Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-end mb-6 pb-4 gap-4">
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-slate-500">Page 1 &gt;</span>
                                <select className="bg-white border border-slate-200 text-slate-700 rounded-md py-1.5 px-3 focus:outline-none focus:border-slate-400">
                                    <option>Best Selling</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest Arrivals</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        {displayedProducts.length > 0 ? (
                            <div className="grid grid-cols-3 gap-6">
                                {displayedProducts.map(product => (
                                    <Link href={`/crafts/item/${product.id}`} key={product.id} className="block bg-white rounded-xl border border-slate-200 p-3 flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-50">
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="mt-3 flex flex-col flex-1">
                                            <h3 className="font-bold text-slate-800 text-[15px] mb-2 leading-tight group-hover:text-royalMaroon-900 transition-colors">{product.title}</h3>
                                            <div className="flex flex-col gap-1 mb-4">
                                                <span className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{product.subtitle}</span>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[11.5px] font-bold text-slate-900">{product.price}</span>
                                                    <span className="text-[11px] font-bold text-amber-600">{product.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-20 text-slate-500">
                                No products found for the selected filters.
                            </div>
                        )}
                    </div>
                </main>
                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
