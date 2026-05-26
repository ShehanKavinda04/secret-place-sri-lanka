import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const retreatCenters = [
    {
        id: 'mahamevnawa-anuradhapura',
        name: 'Mahamevnawa Meditation Centre',
        location: 'Anuradhapura, North Central Province',
        rating: '4.9',
        reviews: '340',
        description: 'A serene monastery offering guided meditation and Dhamma teachings in English and Sinhala, ideal for seekers looking to learn traditional Theravada practices.',
        image: '/images/spiritual_wellness.png'
    },
    {
        id: 'mihintale-aranya',
        name: 'Mihintale Forest Hermitage',
        location: 'Mihintale, Anuradhapura',
        rating: '4.8',
        reviews: '215',
        description: 'An ancient monastic retreat nestled in the hills of Mihintale, offering serious practitioners a deeply quiet environment for Vipassana meditation among ancient caves.',
        image: '/images/mihintale_peak.png'
    },
    {
        id: 'rajarata-ayurveda',
        name: 'Rajarata Ayurvedic Healing',
        location: 'Anuradhapura City',
        rating: '4.7',
        reviews: '180',
        description: 'Experience authentic, traditional Sri Lankan Ayurveda utilizing ancient herbal remedies from the region, offering restorative Panchakarma and stress-relief therapies.',
        image: '/images/hidden_waterfall.png'
    },
    {
        id: 'isinbessagala-hermitage',
        name: 'Isinbessagala Meditation Hermitage',
        location: 'Medawachchiya, Anuradhapura District',
        rating: '4.9',
        reviews: '120',
        description: 'Located on a picturesque rock outcrop near Anuradhapura, this quiet hermitage provides stunning views and profound silence for long-term meditation retreats.',
        image: '/images/rock_cave_temple_1779382110458.png'
    },
    {
        id: 'tapovana-anuradhapura',
        name: 'Tapovana Forest Monastery',
        location: 'Anuradhapura, North Central Province',
        rating: '4.8',
        reviews: '155',
        description: 'A strict ascetic forest monastery where visitors can experience the pure, unadulterated monastic lifestyle, offering alms and participating in brief meditation sessions.',
        image: '/images/jaya_sri_maha_bodhi.png'
    },
    {
        id: 'sri-subodharama',
        name: 'Subodharama Buddhist Centre',
        location: 'Anuradhapura, North Central Province',
        rating: '4.6',
        reviews: '95',
        description: 'A welcoming meditation center close to the sacred city, providing comfortable facilities and expert guidance for beginners exploring mindfulness and breath meditation.',
        image: '/images/ancient_hydraulic.png'
    },
];

const wellnessSites = [
    {
        id: 'kaludiya-pokuna',
        name: 'Kaludiya Pokuna Forest Walk',
        location: 'Mihintale, Anuradhapura',
        rating: '5.0',
        reviews: '280',
        description: 'A deeply spiritual forest walk around the "Dark Water Pool." This ancient meditation site is surrounded by dense jungle and ruins, offering profound stillness and tranquility.',
        image: '/images/spiritual_wellness.png'
    },
    {
        id: 'nuwara-wewa-yoga',
        name: 'Nuwara Wewa Lakeside Yoga',
        location: 'Nuwara Wewa, Anuradhapura',
        rating: '4.8',
        reviews: '190',
        description: 'Gentle morning and sunset yoga sessions on the banks of the massive Nuwara Wewa reservoir, harmonizing breathwork with the cooling breeze of the ancient waters.',
        image: '/images/hidden_waterfall.png'
    },
    {
        id: 'ranmasu-uyana',
        name: 'Ranmasu Uyana Mindfulness Walk',
        location: 'Anuradhapura Sacred City',
        rating: '4.7',
        reviews: '315',
        description: 'Practice walking meditation through the Royal Goldfish Park, an ancient pleasure garden featuring intricate rock carvings, lotus ponds, and the mysterious "Stargate" carving.',
        image: '/images/ancient_hydraulic.png'
    },
    {
        id: 'mihintale-sunrise',
        name: 'Mihintale Sunrise Meditation',
        location: 'Mihintale Peak, Anuradhapura',
        rating: '4.9',
        reviews: '410',
        description: 'Ascend the sacred mountain of Mihintale before dawn for a guided meditation session as the sun rises over the lush plains of the North Central Province.',
        image: '/images/mihintale_peak.png'
    },
    {
        id: 'ritigala-forest-bathing',
        name: 'Ritigala Ancient Forest Bathing',
        location: 'Ritigala, Anuradhapura District',
        rating: '4.9',
        reviews: '255',
        description: 'Therapeutic Shinrin-yoku (forest bathing) amidst the ruins of a 1st-century BCE strictly contemplative monastery, hidden deep within a mystical mountain nature reserve.',
        image: '/images/misty_mountains.png'
    },
];

export default function Spiritual({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Spiritual Experiences & Wellness - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img src="/images/spiritual_wellness.png" alt="Spiritual Experiences & Wellness" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Spiritual Experiences & Wellness
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Discover profound inner peace through meditation, yoga, Ayurveda and sacred nature immersion across Sri Lanka.
                        </p>
                    </div>
                </div>

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20 w-full">
                    {/* Header */}
                    <div className="space-y-3 text-left border-b border-royalGold-400/20 pb-8">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Exploration Desk</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-royalMaroon-950">
                            Spiritual Experiences & Wellness
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            Rejuvenate mind, body and soul through Sri Lanka's world-class meditation retreats, Ayurveda healing programs, and transformative nature-based wellness experiences.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Meditation Retreats & Healing Centres
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {retreatCenters.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Nature & Mindfulness Experiences
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wellnessSites.map(spot => (
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
