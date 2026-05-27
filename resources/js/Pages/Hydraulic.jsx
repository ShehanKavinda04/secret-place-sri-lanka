import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const majorWonders = [
    {
        id: 'ruwanweli-maha-seya',
        name: 'Ruwanweli Maha Seya',
        location: 'Anuradhapura Sacred City',
        rating: '5.0',
        reviews: '2100',
        description: 'The "Great Stupa", a marvel of ancient architecture and devotion built by King Dutugemunu. Its enormous white dome remains one of the most sacred Buddhist monuments in the world.',
        image: '/images/ruwanweli_maha_seya.png'
    },
    {
        id: 'jetavanaramaya',
        name: 'Jetavanaramaya Stupa',
        location: 'Anuradhapura Sacred City',
        rating: '4.9',
        reviews: '1850',
        description: 'Once the third tallest structure in the ancient world behind the Pyramids of Giza. This colossal brick stupa is an engineering masterpiece built by King Mahasena.',
        image: '/images/jetavanarama_1779380489792.png'
    },
    {
        id: 'abhayagiri-stupa',
        name: 'Abhayagiri Stupa',
        location: 'Anuradhapura Sacred City',
        rating: '4.9',
        reviews: '1640',
        description: 'A massive architectural wonder that once served as the centerpiece of a sprawling international monastic complex, renowned for its intricate carvings and sheer scale.',
        image: '/images/abhayagiri_1779380471030.png'
    },
    {
        id: 'abhaya-wewa',
        name: 'Abhaya Wewa (Basawakkulama)',
        location: 'Anuradhapura',
        rating: '4.7',
        reviews: '520',
        description: 'Built by King Pandukabhaya in the 4th century BC, this is the oldest recorded man-made reservoir in Sri Lanka, a testament to early hydraulic engineering.',
        image: '/images/abhaya_wewa_actual.jpg'
    },
    {
        id: 'nuwara-wewa',
        name: 'Nuwara Wewa Reservoir',
        location: 'Anuradhapura',
        rating: '4.8',
        reviews: '610',
        description: 'The largest of Anuradhapura\'s three main reservoirs, built to supply water to the ancient capital. Its massive bund reflects highly advanced ancient topographical knowledge.',
        image: '/images/nuwara_wewa_actual.jpg'
    },
    {
        id: 'tissa-wewa',
        name: 'Tissa Wewa',
        location: 'Anuradhapura',
        rating: '4.8',
        reviews: '740',
        description: 'Constructed by King Devanampiya Tissa in the 3rd century BC, this vast reservoir provided water to the Royal Gardens and remains vital to the region\'s agriculture today.',
        image: '/images/tissa_wewa_actual.jpg'
    },
];

const hiddenMarvels = [
    {
        id: 'kuttam-pokuna',
        name: 'Kuttam Pokuna (Twin Ponds)',
        location: 'Abhayagiri Complex, Anuradhapura',
        rating: '4.9',
        reviews: '890',
        description: 'An absolute masterpiece of ancient hydrology and architecture. These beautifully proportioned bathing pools for monks feature advanced underground water filtration systems.',
        image: '/images/kuttam_pokuna_actual.jpg'
    },
    {
        id: 'lovamahapaya',
        name: 'Lovamahapaya (Brazen Palace)',
        location: 'Anuradhapura Sacred City',
        rating: '4.7',
        reviews: '675',
        description: 'The ruins of a magnificent ancient skyscraper that once stood nine stories high, roofed with bronze tiles. Today, 1,600 stone pillars remain perfectly aligned in 40 rows.',
        image: '/images/lovamahaprasaya_1779380558455.png'
    },
    {
        id: 'thuparamaya',
        name: 'Thuparamaya Dagoba',
        location: 'Anuradhapura Sacred City',
        rating: '4.9',
        reviews: '920',
        description: 'The oldest dagoba in Sri Lanka, constructed in the 3rd century BC. It is surrounded by concentric circles of slender stone pillars that once supported a circular roof (vatadage).',
        image: '/images/thuparamaya_1779380449379.png'
    },
    {
        id: 'eth-pokuna',
        name: 'Eth Pokuna (Elephant Pond)',
        location: 'Anuradhapura Sacred City',
        rating: '4.7',
        reviews: '415',
        description: 'A gigantic ancient artificial pool built for the monks of Abhayagiri. It is so large that it can hold six Olympic swimming pools worth of water, fed by an intricate canal system.',
        image: '/images/eth_pokuna_actual.jpg'
    },
    {
        id: 'lankaramaya',
        name: 'Lankaramaya Stupa',
        location: 'Anuradhapura Sacred City',
        rating: '4.8',
        reviews: '530',
        description: 'An elegant 1st-century BC stupa built by King Vattagamani Abhaya. Like Thuparamaya, it features the striking ruins of a vatadage with gracefully carved stone pillars.',
        image: '/images/lankaramaya_1779380541763.png'
    },
    {
        id: 'samadhi-statue',
        name: 'Samadhi Buddha Statue',
        location: 'Mahamevnawa Park, Anuradhapura',
        rating: '5.0',
        reviews: '1420',
        description: 'A 4th-century masterpiece of Sinhalese sculpture depicting the Buddha in deep meditation. The dolomite marble statue is renowned for its profound expression of inner peace.',
        image: '/images/isurumuniya_1779380577189.png'
    }
];

export default function Hydraulic({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Ancient Hydraulic & Architecture Wonders - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-64 sm:h-80 overflow-hidden"
                >
                    <img src="/images/ancient_hydraulic.png" alt="Ancient Hydraulic & Architecture Wonders" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Ancient Hydraulic & Architecture Wonders
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Marvel at the extraordinary engineering genius of Sri Lanka's ancient civilization, from vast reservoirs to sky-kissing stupas.
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
                            Ancient Hydraulic & Architecture Wonders
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            Explore magnificent ancient reservoirs, towering stupas, cave temples, and engineering marvels that testify to the extraordinary genius of Sri Lanka's ancient civilization.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Iconic Wonders & Grand Reservoirs
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {majorWonders.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Hidden Ruins & Architectural Marvels
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {hiddenMarvels.map(spot => (
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
