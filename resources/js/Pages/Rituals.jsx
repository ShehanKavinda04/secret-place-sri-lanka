import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const majorRituals = [
    {
        id: 'esala-perahera',
        name: 'Esala Perahera',
        location: 'Kandy, Central Province',
        rating: '5.0',
        reviews: '1240',
        description: 'The grandest Buddhist pageant in Sri Lanka, featuring magnificently decorated elephants, fire dancers, and sacred relic processions held annually in Kandy.',
        image: '/images/rituals_ceremonies.png'
    },
    {
        id: 'vesak-lantern',
        name: 'Vesak Festival Poojas',
        location: 'Nationwide, Sri Lanka',
        rating: '4.9',
        reviews: '870',
        description: 'The most sacred Buddhist festival celebrating the birth, enlightenment and passing of the Buddha with colorful lanterns, dansalas and temple poojas.',
        image: '/images/ruwanweli_maha_seya.png'
    },
    {
        id: 'kataragama-ritual',
        name: 'Kataragama Firewalking',
        location: 'Kataragama, Uva Province',
        rating: '4.8',
        reviews: '540',
        description: 'A powerful and sacred multi-faith ritual where devotees walk on red-hot coals as a demonstration of deep faith and divine devotion at Kataragama.',
        image: '/images/rituals_ceremonies.png'
    },
    {
        id: 'aluth-sahal-mangalya',
        name: 'Aluth Sahal Mangalya',
        location: 'Anuradhapura & Kandy, Sri Lanka',
        rating: '4.7',
        reviews: '310',
        description: 'The ancient harvest offering ceremony presenting the first grains of the new paddy harvest to the Buddha, a cherished tradition spanning over two millennia.',
        image: '/images/sacred_bodhi_tree_1779382054492.png'
    },
    {
        id: 'thai-pongal',
        name: 'Thai Pongal Celebrations',
        location: 'Northern & Eastern Provinces',
        rating: '4.8',
        reviews: '410',
        description: 'The vibrant Tamil harvest festival giving thanks to the sun god, celebrated with traditional cooking of sweet pongal, kolam art and cultural performances.',
        image: '/images/heritage_crafts.png'
    },
    {
        id: 'milad-un-nabi',
        name: 'Milad-Un-Nabi Processions',
        location: 'Colombo & Galle, Western Province',
        rating: '4.7',
        reviews: '275',
        description: 'Colorful and devout Islamic processions celebrating the birthday of the Prophet Muhammad with elaborate floats, devotional singing and communal prayers.',
        image: '/images/pilgrimage_logistics.png'
    },
];

const localCeremonies = [
    {
        id: 'bali-thovil',
        name: 'Bali & Thovil Ceremonies',
        location: 'Rural Villages, Southern Province',
        rating: '4.9',
        reviews: '185',
        description: 'Ancient Sinhala healing rituals performed by masked dancers to appease planetary deities and ancestral spirits, rich with chanting and elaborate costumes.',
        image: '/images/rock_cave_temple_1779382110458.png'
    },
    {
        id: 'pirith-chanting',
        name: 'Pirith Chanting Ceremonies',
        location: 'Buddhist Temples Nationwide',
        rating: '4.9',
        reviews: '620',
        description: 'Sacred all-night Buddhist blessing ceremonies where monks chant protective Pali suttas, filling the temple with deeply resonant, purifying vibrations.',
        image: '/images/jaya_sri_maha_bodhi.png'
    },
    {
        id: 'poson-poya',
        name: 'Poson Poya at Mihintale',
        location: 'Mihintale, North Central Province',
        rating: '5.0',
        reviews: '720',
        description: 'The sacred full moon poya celebrating the introduction of Buddhism to Sri Lanka by Arahat Mahinda. Thousands of white-clad pilgrims ascend Mihintale hill.',
        image: '/images/mihintale_peak.png'
    },
    {
        id: 'devol-maduwa',
        name: 'Devol Maduwa',
        location: 'Hikkaduwa, Southern Province',
        rating: '4.6',
        reviews: '98',
        description: 'A rare and spectacular coastal ritual for the god Devol Deviyo, featuring elaborate masked performances and community offerings on the southern shores.',
        image: '/images/spiritual_wellness.png'
    },
    {
        id: 'kohomba-kankariya',
        name: 'Kohomba Kankariya',
        location: 'Kandy Region, Central Province',
        rating: '4.8',
        reviews: '145',
        description: 'An elaborate multi-day Kandyan ritual drama invoking the ancient Kohomba deity for healing, blessings and prosperity, preserving classical dance traditions.',
        image: '/images/ancient_hydraulic.png'
    },
];

export default function Rituals({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Rituals, Poojas & Ceremonies - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
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
                </div>

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20 w-full">
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
                </main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
