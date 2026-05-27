import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const majorRituals = [
    {
        id: 'poson-poya-mihintale',
        name: 'Poson Poya Festival',
        location: 'Mihintale & Anuradhapura',
        rating: '5.0',
        reviews: '1540',
        description: 'The historic celebration marking the arrival of Buddhism in Sri Lanka. The entire sacred city is illuminated, with massive crowds undertaking pilgrimages and observing sil.',
        image: '/images/poson_poya_festival_1779804284565.png'
    },
    {
        id: 'aluth-sahal-mangalya',
        name: 'Aluth Sahal Mangalya',
        location: 'Jaya Sri Maha Bodhi, Anuradhapura',
        rating: '4.8',
        reviews: '890',
        description: 'The national New Rice Festival where farmers offer their first harvest of paddy to the sacred Jaya Sri Maha Bodhi, ensuring blessings for future prosperity.',
        image: '/images/aluth_sahal_mangalya_1779804303762.png'
    },
    {
        id: 'ruwanwelisaya-pichcha-mal',
        name: 'Pichcha Mal Pooja',
        location: 'Ruwanweli Maha Seya, Anuradhapura',
        rating: '4.9',
        reviews: '1120',
        description: 'A breathtakingly beautiful offering of millions of fragrant white jasmine (pichcha) flowers to the great stupa, filling the air with profound devotion and sweet scent.',
        image: '/images/pichcha_mal_pooja_1779804320556.png'
    },
    {
        id: 'kanchuka-pooja',
        name: 'Kanchuka Pooja (Robe Offering)',
        location: 'Ruwanweli Maha Seya, Anuradhapura',
        rating: '4.8',
        reviews: '675',
        description: 'A majestic ceremony where devotees carry a massive saffron-colored robe wrapped around the enormous dome of the Ruwanwelisaya stupa in a deeply emotional procession.',
        image: '/images/kanchuka_pooja_1779804339624.png'
    },
    {
        id: 'nanumura-mangallaya',
        name: 'Nanumura Mangallaya',
        location: 'Jaya Sri Maha Bodhi, Anuradhapura',
        rating: '4.7',
        reviews: '410',
        description: 'A traditional and rare bathing ceremony of the sacred Bodhi tree using herbal preparations and scented water, invoking blessings for the nation and rain for the harvest.',
        image: '/images/nanumura_mangallaya_1779804357947.png'
    },
    {
        id: 'ill-poya-katina',
        name: 'Katina Robe Month Ceremonies',
        location: 'Atamasthana, Anuradhapura',
        rating: '4.8',
        reviews: '530',
        description: 'The culmination of the monks\' rainy season retreat (Vassa). Devotees offer the sacred Katina robes to the Maha Sangha in grand processions across the Eight Sacred Places.',
        image: '/images/katina_ceremony_1779804386668.png'
    },
];

const localCeremonies = [
    {
        id: 'kapruk-pooja',
        name: 'Kapruk Pooja',
        location: 'Thuparamaya, Anuradhapura',
        rating: '4.9',
        reviews: '345',
        description: 'A special offering representing the mythical wish-fulfilling tree, presented with profound reverence at the oldest dagoba in Sri Lanka to invoke heavenly blessings.',
        image: '/images/kapruk_pooja_1779804403588.png'
    },
    {
        id: 'gilanpasa-pooja',
        name: 'Evening Gilanpasa Pooja',
        location: 'Mirisawetiya Stupa, Anuradhapura',
        rating: '4.8',
        reviews: '280',
        description: 'Serene evening rituals where monks and devotees offer medicinal drinks, lit oil lamps, and incense to the Buddha, creating a deeply tranquil twilight atmosphere.',
        image: '/images/gilanpasa_pooja_1779804420756.png'
    },
    {
        id: 'bodhi-pooja-isurumuniya',
        name: 'Bodhi Pooja at Isurumuniya',
        location: 'Isurumuniya Viharaya, Anuradhapura',
        rating: '4.7',
        reviews: '415',
        description: 'Devotional chanting and water offerings at the sacred Bodhi tree of Isurumuniya, famous for its ancient rock carvings and picturesque setting by the Tissa Wewa.',
        image: '/images/bodhi_pooja_isurumuniya_1779804442648.png'
    },
    {
        id: 'atavisi-buddha-pooja',
        name: 'Atavisi Buddha Pooja',
        location: 'Abhayagiri Viharaya, Anuradhapura',
        rating: '4.9',
        reviews: '190',
        description: 'A magnificent ritual offering homage to the 28 past Buddhas, conducted amidst the sprawling, ancient monastic ruins of the Abhayagiri complex.',
        image: '/images/atavisi_buddha_pooja_1779804459576.png'
    },
    {
        id: 'pahan-pooja',
        name: 'Thousand Lamps Offering',
        location: 'Jetavanaramaya, Anuradhapura',
        rating: '4.8',
        reviews: '310',
        description: 'The awe-inspiring illumination of the ancient Jetavanarama stupa courtyard with thousands of flickering clay oil lamps, a sight of incredible spiritual beauty.',
        image: '/images/thousand_lamps_offering_1779804476762.png'
    },
];

export default function Rituals({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Rituals, Poojas & Ceremonies - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-64 sm:h-80 overflow-hidden"
                >
                    <img src="/images/rituals_ceremonies.png" alt="Rituals & Ceremonies" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Rituals, Poojas & Ceremonies
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Immerse yourself in the living spiritual heritage of Sri Lanka's sacred rituals and ceremonial traditions.
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
                            Rituals, Poojas & Ceremonies
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            Experience the living spiritual heartbeat of Sri Lanka through its vibrant festivals, sacred poojas, ancient healing rituals, and multi-faith ceremonial traditions that have endured for millennia.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Major Festivals & Processions
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {majorRituals.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Local & Temple Ceremonies
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {localCeremonies.map(spot => (
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
