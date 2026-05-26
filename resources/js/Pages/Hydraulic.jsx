import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const majorWonders = [
    {
        id: 'sigiriya-rock',
        name: 'Sigiriya Lion Rock Fortress',
        location: 'Sigiriya, North Central Province',
        rating: '4.9',
        reviews: '1850',
        description: 'A UNESCO World Heritage Site and ancient sky palace built atop a volcanic rock column by King Kashyapa, featuring extraordinary frescoes, mirror wall and water gardens.',
        image: '/images/ancient_hydraulic.png'
    },
    {
        id: 'parakrama-samudra',
        name: 'Parakrama Samudra',
        location: 'Polonnaruwa, North Central Province',
        rating: '4.9',
        reviews: '940',
        description: 'The great ancient sea of Parakrama, a vast man-made reservoir covering 2,500 hectares built by King Parakramabahu I, an unparalleled feat of ancient hydraulic engineering.',
        image: '/images/ancient_hydraulic.png'
    },
    {
        id: 'minneriya-tank',
        name: 'Minneriya Ancient Tank',
        location: 'Minneriya, North Central Province',
        rating: '4.8',
        reviews: '620',
        description: 'An ancient irrigation tank built by King Mahasena in the 3rd century, now also a celebrated national park hosting the famous elephant gathering every dry season.',
        image: '/images/ranmasu_uyana.png'
    },
    {
        id: 'kalawewa-tank',
        name: 'Kalawewa Reservoir & Bund',
        location: 'Kekirawa, North Central Province',
        rating: '4.8',
        reviews: '285',
        description: 'A magnificent ancient reservoir built by King Dhatusena, connected by the legendary Yodha Ela (Giant\'s Canal), spanning over 87 km through the jungle without losing elevation.',
        image: '/images/ancient_hydraulic.png'
    },
    {
        id: 'rankoth-vehera',
        name: 'Rankoth Vehera',
        location: 'Polonnaruwa, North Central Province',
        rating: '4.8',
        reviews: '415',
        description: 'The largest stupa in Polonnaruwa, built during the golden age of King Nissankamalla with extraordinary brickwork precision and a commanding 55-metre height.',
        image: '/images/ancient_brick_stupa_1779382089722.png'
    },
    {
        id: 'gal-vihara',
        name: 'Gal Vihara Rock Temple',
        location: 'Polonnaruwa, North Central Province',
        rating: '5.0',
        reviews: '1120',
        description: 'A masterpiece of ancient stone carving featuring four magnificent Buddha statues carved directly into a single granite face, showcasing extraordinary artistic and technical genius.',
        image: '/images/rock_cave_temple_1779382110458.png'
    },
];

const hiddenMarvels = [
    {
        id: 'ranmasu-uyana',
        name: 'Ranmasu Uyana & Stargate',
        location: 'Anuradhapura, North Central Province',
        rating: '4.7',
        reviews: '356',
        description: 'An ancient royal pleasure garden with sophisticated water features and the mysterious Sakwala Chakraya — a circular diagram carved in rock many believe to be a star map.',
        image: '/images/ranmasu_uyana.png'
    },
    {
        id: 'yodha-ela-canal',
        name: 'Yodha Ela Ancient Canal',
        location: 'Anuradhapura District, North Central Province',
        rating: '4.8',
        reviews: '192',
        description: 'The Giant\'s Canal, an 87-km irrigation channel built in the 5th century with a near-zero gradient, demonstrating extraordinary ancient surveying and hydraulic engineering skills.',
        image: '/images/ancient_hydraulic.png'
    },
    {
        id: 'medirigiriya',
        name: 'Medirigiriya Vatadage',
        location: 'Medirigiriya, North Central Province',
        rating: '4.8',
        reviews: '168',
        description: 'A perfectly preserved circular relic house featuring three concentric rings of stone pillars and four standing Buddha statues, dating back over 2,000 years.',
        image: '/images/white_stupa_sunset_1779382070809.png'
    },
    {
        id: 'ritigala-ruins',
        name: 'Ritigala Forest Monastery',
        location: 'Ritigala, North Central Province',
        rating: '4.9',
        reviews: '210',
        description: 'A hidden ancient monastery complex deep in a nature reserve, featuring unique paved stone pathways, twin-pond bathing complexes and enigmatic ruins shrouded in jungle mist.',
        image: '/images/misty_mountains.png'
    },
    {
        id: 'dambulla-caves',
        name: 'Dambulla Cave Temple Complex',
        location: 'Dambulla, Central Province',
        rating: '4.9',
        reviews: '1350',
        description: 'Five magnificent caves carved into a towering granite outcrop sheltering 153 Buddha statues and 1,500 sq meters of ancient murals, a UNESCO World Heritage masterpiece.',
        image: '/images/rock_cave_temple_1779382110458.png'
    },
];

export default function Hydraulic({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Ancient Hydraulic & Architecture Wonders - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
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
                </div>

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20 w-full">
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
                </main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
