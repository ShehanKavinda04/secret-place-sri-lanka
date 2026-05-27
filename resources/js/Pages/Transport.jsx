import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const pilgrimageRoutes = [
    {
        id: 'anuradhapura-circuit',
        name: 'Anuradhapura Sacred City Circuit',
        location: 'Anuradhapura, North Central Province',
        rating: '5.0',
        reviews: '1420',
        description: 'The most important Buddhist pilgrimage circuit in Sri Lanka, encompassing the Jaya Sri Maha Bodhi, Ruwanwelisaya, Jetavanarama, and Thuparamaya Dagobas in a single sacred journey.',
        image: '/images/anuradhapura_circuit.png'
    },
    {
        id: 'kataragama-pilgrimage',
        name: 'Kataragama Pada Yatra',
        location: 'Kataragama, Uva Province',
        rating: '4.9',
        reviews: '870',
        description: 'The legendary 45-day barefoot pilgrimage walk from Jaffna to Kataragama, retracing the ancient route of Skanda, undertaken by tens of thousands of multi-faith devotees annually.',
        image: '/images/kataragama_yatra.png'
    },
    {
        id: 'adams-peak-yatra',
        name: "Sri Pada (Adam's Peak) Pilgrimage",
        location: 'Ratnapura, Sabaragamuwa Province',
        rating: '4.9',
        reviews: '1680',
        description: "The sacred night-climb to Adam's Peak (Sri Pada), revered by Buddhists, Hindus, Muslims, and Christians alike for the holy footprint at the summit, accessible from December to May.",
        image: '/images/adams_peak.png'
    },
    {
        id: 'mihintale-pilgrimage',
        name: 'Mihintale Pilgrimage Circuit',
        location: 'Mihintale, North Central Province',
        rating: '4.9',
        reviews: '730',
        description: 'Ascend the 1,840 ancient granite steps to Mihintale, the sacred hill where Buddhism was introduced to Sri Lanka by Arahat Mahinda, the son of Emperor Asoka, in 247 BC.',
        image: '/images/mihintale_steps.png'
    },
    {
        id: 'nallur-kovil-yatra',
        name: 'Nallur Kovil Festival Yatra',
        location: 'Jaffna, Northern Province',
        rating: '4.8',
        reviews: '545',
        description: 'The 25-day Nallur Kandaswamy Kovil festival pilgrimage, drawing over a million Hindu devotees who travel to Jaffna each August for the grand chariot procession and sacred rituals.',
        image: '/images/rituals_ceremonies.png'
    },
    {
        id: 'munneswaram-pilgrimage',
        name: 'Munneswaram Temple Circuit',
        location: 'Chilaw, North Western Province',
        rating: '4.7',
        reviews: '390',
        description: 'One of the oldest and most powerful Shiva temples in Sri Lanka, believed to have been consecrated by Lord Rama himself, drawing pilgrims from across the island year-round.',
        image: '/images/ancient_hydraulic.png'
    },
];

const transportGuides = [
    {
        id: 'pilgrimage-bus-network',
        name: 'CTB Sacred Sites Bus Network',
        location: 'Island-wide, Sri Lanka',
        rating: '4.5',
        reviews: '620',
        description: 'Sri Lanka\'s Ceylon Transport Board operates dedicated seasonal bus services to major pilgrimage sites including Kataragama, Anuradhapura, and Adam\'s Peak during poya days and festival seasons.',
        image: '/images/pilgrimage_logistics.png'
    },
    {
        id: 'kandy-train',
        name: 'Kandy–Ella Scenic Railway',
        location: 'Kandy to Ella, Central Province',
        rating: '4.9',
        reviews: '2150',
        description: 'One of the world\'s most scenic train journeys, passing through misty highland tea estates, cascading waterfalls, and ancient tunnels — an essential pilgrimage transit for spiritual travellers.',
        image: '/images/misty_mountains.png'
    },
    {
        id: 'tuk-tuk-local',
        name: 'Heritage Tuk-Tuk Local Tours',
        location: 'Anuradhapura & Polonnaruwa',
        rating: '4.7',
        reviews: '845',
        description: 'Licensed local three-wheeler drivers offering curated heritage circuits through ancient city ruins, temple complexes, and sacred tanks — an affordable, immersive, and eco-friendly pilgrimage mode.',
        image: '/images/pilgrimage_logistics.png'
    },
    {
        id: 'pilgrimage-rest-houses',
        name: 'Pilgrimage Rest Houses & Dansalas',
        location: 'Sacred Route Stops, Island-wide',
        rating: '4.8',
        reviews: '412',
        description: 'Traditional dharamshala-style rest houses and community dansalas offering free or subsidised meals, shelter, and guidance to pilgrims travelling the major sacred routes of Sri Lanka.',
        image: '/images/ruwanweli_maha_seya.png'
    },
    {
        id: 'boat-mannar',
        name: 'Mannar Sacred Island Boat Crossing',
        location: 'Mannar, Northern Province',
        rating: '4.6',
        reviews: '185',
        description: 'Traditional wooden boat crossings to Mannar Island and the sacred Thiruketheeshwaram Kovil, following routes used by pilgrims for over 2,000 years between India and Sri Lanka.',
        image: '/images/secret_beach.png'
    },
];

export default function Transport({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Transport & Pilgrimage Logistics - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-64 sm:h-80 overflow-hidden"
                >
                    <img src="/images/pilgrimage_logistics.png" alt="Transport & Pilgrimage Logistics" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Transport &amp; Pilgrimage Logistics
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Plan your sacred journey with confidence — covering every route, rest stop, and mode of transport across Sri Lanka.
                        </p>
                    </div>
                </motion.div>

                {/* Journey Planner Info Strip */}
                <div className="bg-royalMaroon-950/5 border-y border-royalGold-400/20 py-6 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: '🛤️', stat: '12', label: 'Major Pilgrimage Routes' },
                            { icon: '🚌', stat: '340+', label: 'Sacred Site Bus Services' },
                            { icon: '🏨', stat: '85+', label: 'Pilgrimage Rest Houses' },
                            { icon: '📍', stat: '60+', label: 'Mapped Sacred Waypoints' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center gap-1">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="font-display text-2xl font-bold text-royalMaroon-800">{item.stat}</span>
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

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
                            Transport &amp; Pilgrimage Logistics
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            From the ancient Pada Yatra barefoot walks to scenic highland railways, find detailed guidance on sacred pilgrimage routes, reliable transport networks, and rest facilities across Sri Lanka's spiritual landscape.
                        </p>
                    </div>

                    {/* Section 1 — Sacred Pilgrimage Routes */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Sacred Pilgrimage Routes &amp; Circuits
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pilgrimageRoutes.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2 — Transport & Logistics */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Transport Networks &amp; Traveller Facilities
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {transportGuides.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Practical Tips Panel */}
                    <div className="rounded-3xl border border-royalGold-400/30 bg-royalGold-300/10 p-8 grid sm:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <div className="text-2xl">🌕</div>
                            <h4 className="font-display text-base font-bold text-royalMaroon-950">Travel on Poya Days</h4>
                            <p className="text-xs text-slate-600 font-light leading-relaxed">Sri Lanka's full-moon poya days are national holidays with heightened pilgrim activity. Buses and trains fill quickly — book at least 2 days in advance for popular routes.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl">👟</div>
                            <h4 className="font-display text-base font-bold text-royalMaroon-950">Remove Footwear at Temples</h4>
                            <p className="text-xs text-slate-600 font-light leading-relaxed">All sacred Buddhist and Hindu sites require removing shoes at the entrance. Carry a small bag to store your footwear, and wear comfortable slip-on sandals for ease.</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl">🗓️</div>
                            <h4 className="font-display text-base font-bold text-royalMaroon-950">Plan Around Festivals</h4>
                            <p className="text-xs text-slate-600 font-light leading-relaxed">Major festivals like the Esala Perahera and Kataragama Pada Yatra draw enormous crowds. Check the Sri Lanka Tourism calendar and arrange accommodation 3–4 weeks in advance.</p>
                        </div>
                    </div>
                </motion.main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
