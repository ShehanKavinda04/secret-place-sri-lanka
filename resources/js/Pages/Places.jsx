import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const eightSacredPlaces = [
    {
        id: 'jaya-sri',
        name: 'Jaya Sri Maha Bodhi',
        location: 'Anuradhapura, North Central Province',
        rating: '4.9',
        reviews: '320',
        description: "One of the world's oldest historically documented trees, radiating immense spiritual peace and sacred Buddhist heritage.",
        image: '/images/jaya_sri_maha_bodhi.png'
    },
    {
        id: 'ruwanweli',
        name: 'Ruwanwelisaya',
        location: 'Anuradhapura, North Central Province',
        rating: '4.9',
        reviews: '415',
        description: 'A magnificent, awe-inspiring ancient stupa housing sacred relics, standing as a grand marvel of engineering and devotion.',
        image: '/images/ruwanweli_maha_seya.png'
    },
    {
        id: 'thuparamaya',
        name: 'Thuparamaya',
        location: 'Anuradhapura, North Central Province',
        rating: '4.8',
        reviews: '210',
        description: 'The oldest dagoba in Sri Lanka, constructed to enshrine the sacred collarbone relic of the Buddha.',
        image: '/images/thuparamaya_1779380449379.png'
    },
    {
        id: 'abhayagiriya',
        name: 'Abhayagiriya',
        location: 'Anuradhapura, North Central Province',
        rating: '4.8',
        reviews: '275',
        description: 'A massive monastic complex and ancient center of Buddhist scholarship, featuring a towering, majestic brick stupa.',
        image: '/images/abhayagiri_1779380471030.png'
    },
    {
        id: 'jetavanaramaya',
        name: 'Jetavanaramaya',
        location: 'Anuradhapura, North Central Province',
        rating: '4.9',
        reviews: '310',
        description: 'Once the tallest stupa in the ancient world, representing an unparalleled masterpiece of ancient Sri Lankan architecture.',
        image: '/images/jetavanarama_1779380489792.png'
    },
    {
        id: 'mirisawetiya',
        name: 'Mirisawetiya Stupa',
        location: 'Anuradhapura, North Central Province',
        rating: '4.7',
        reviews: '185',
        description: 'Built by King Dutugemunu after leaving his scepter containing Buddha relics, a symbol of profound devotion.',
        image: '/images/mirisawetiya_1779380509748.png'
    },
    {
        id: 'lankarama',
        name: 'Lankarama',
        location: 'Anuradhapura, North Central Province',
        rating: '4.6',
        reviews: '140',
        description: 'An ancient stupa built by King Vattagamani Abhaya, surrounded by beautiful monolithic stone pillars and ruins.',
        image: '/images/lankaramaya_1779380541763.png'
    },
    {
        id: 'lovamahaprasada-1',
        name: 'Lovamahaprasada',
        location: 'Anuradhapura, North Central Province',
        rating: '4.7',
        reviews: '220',
        description: 'The Brazen Palace, an ancient multistoried building with hundreds of stone pillars, once a grand monastery.',
        image: '/images/lovamahaprasaya_1779380558455.png'
    }
];

const otherSites = [
    {
        id: 'isurumuniya',
        name: 'Isurumuniya Rajamaha Viharaya',
        location: 'Anuradhapura, North Central Province',
        rating: '4.8',
        reviews: '350',
        description: 'A beautiful rock temple famous for its exquisite ancient stone carvings, including the renowned Isurumuniya Lovers.',
        image: '/images/isurumuniya_1779380577189.png'
    },
    {
        id: 'vessagiriya',
        name: 'Vessagiriya',
        location: 'Anuradhapura, North Central Province',
        rating: '4.8',
        reviews: '110',
        description: 'An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.',
        image: '/images/vessagiriya_monastery.png'
    },
    {
        id: 'srimahabodhi-malu',
        name: 'Sri Maha Bodhi Malu Vihara',
        location: 'Anuradhapura, North Central Province',
        rating: '4.9',
        reviews: '280',
        description: 'A serene temple complex surrounding the sacred Bodhi tree, offering a profoundly peaceful environment for reflection.',
        image: '/images/srimaha_bodhi_malu_1779380597304.png'
    },
    {
        id: 'mihintale',
        name: 'Mihintale',
        location: 'Anuradhapura, North Central Province',
        rating: '4.9',
        reviews: '490',
        description: 'The sacred mountain peak where Buddhism was introduced to Sri Lanka, featuring ancient steps and panoramic views.',
        image: '/images/mihintale_peak.png'
    }
];

export default function Places({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Sacred Sites & Shrines - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />
                
                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-64 sm:h-80 overflow-hidden"
                >
                    <img src="/images/sacred_sites.png" alt="Sacred Sites & Shrines" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Sacred Sites & Shrines
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Explore the ancient, sacred heart of Anuradhapura, home to venerable stupas, historic monasteries, and deeply revered Buddhist heritage sites.
                        </p>
                    </div>
                </motion.div>

                <motion.main 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20 w-full"
                >
                    {/* Header */}
                    <div className="space-y-3 text-left border-b border-royalGold-400/20 pb-8">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Exploration Desk</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-royalMaroon-950">
                            Sacred Sites & Shrines
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            Explore the ancient, sacred heart of Anuradhapura, home to venerable stupas, historic monasteries, and deeply revered Buddhist heritage sites.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                The Eight Sacred Places
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {eightSacredPlaces.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Other Sacred & Monastic Sites
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherSites.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>
                </motion.main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
