import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const retreatCenters = [
    {
        id: 'nilambe-meditation',
        name: 'Nilambe Meditation Centre',
        location: 'Galaha, Central Province',
        rating: '4.9',
        reviews: '430',
        description: 'A renowned international meditation retreat nestled in the misty hills above Kandy, offering silent Vipassana and mindfulness programs in a serene forest setting.',
        image: '/images/spiritual_wellness.png'
    },
    {
        id: 'kanduboda-centre',
        name: 'Kanduboda Meditation Centre',
        location: 'Delgoda, Western Province',
        rating: '4.8',
        reviews: '310',
        description: 'One of Sri Lanka\'s largest meditation centers offering structured Vipassana courses for both beginners and advanced practitioners in a peaceful forest monastery.',
        image: '/images/jaya_sri_maha_bodhi.png'
    },
    {
        id: 'dhamma-kuta',
        name: 'Dhamma Kuta Vipassana Centre',
        location: 'Hindagala, Central Province',
        rating: '4.9',
        reviews: '290',
        description: 'A 10-day silent Vipassana retreat center overlooking the lush Kandy valley, following the tradition of S.N. Goenka, drawing seekers from around the world.',
        image: '/images/misty_mountains.png'
    },
    {
        id: 'bodhiyana-monastery',
        name: 'Bodhiyana Forest Monastery',
        location: 'Kotmale, Central Province',
        rating: '4.8',
        reviews: '165',
        description: 'An ancient-inspired forest monastery where monks and lay practitioners engage in deep contemplative practices surrounded by pristine highland wilderness.',
        image: '/images/sacred_bodhi_tree_1779382054492.png'
    },
    {
        id: 'ayurveda-retreat',
        name: 'Barberyn Ayurveda Resort',
        location: 'Weligama, Southern Province',
        rating: '4.9',
        reviews: '520',
        description: 'A world-class Ayurveda resort offering authentic healing programs including Panchakarma, herbal therapies, and holistic wellness consultations by senior physicians.',
        image: '/images/hidden_waterfall.png'
    },
    {
        id: 'jungle-beach-retreat',
        name: 'Ulpotha Yoga Retreat',
        location: 'Embogama, North Western Province',
        rating: '4.9',
        reviews: '385',
        description: 'A legendary eco-retreat in the jungle offering traditional yoga, organic farm-to-table meals, and Ayurveda treatments in a beautifully restored ancient village.',
        image: '/images/spiritual_wellness.png'
    },
];

const wellnessSites = [
    {
        id: 'sigiriya-sunrise-yoga',
        name: 'Sigiriya Sunrise Yoga',
        location: 'Sigiriya, North Central Province',
        rating: '4.7',
        reviews: '218',
        description: 'Guided sunrise yoga sessions at the base of the iconic Lion Rock, harmonizing ancient asanas with the profound spiritual energy of this UNESCO World Heritage site.',
        image: '/images/ancient_hydraulic.png'
    },
    {
        id: 'pidurangala-meditation',
        name: 'Pidurangala Rock Meditation',
        location: 'Sigiriya, North Central Province',
        rating: '4.8',
        reviews: '175',
        description: 'Guided mindfulness walks and meditation sessions on Pidurangala rock, offering breathtaking sunrise vistas and a powerful sense of stillness above the jungle canopy.',
        image: '/images/misty_mountains.png'
    },
    {
        id: 'dambulla-forest-walk',
        name: 'Dambulla Forest Mindfulness Walk',
        location: 'Dambulla, Central Province',
        rating: '4.7',
        reviews: '132',
        description: 'Guided silent forest walking meditation through ancient Dambulla\'s sacred jungle, led by experienced forest monks to cultivate deep mindfulness and inner peace.',
        image: '/images/rock_cave_temple_1779382110458.png'
    },
    {
        id: 'knuckles-forest-bathing',
        name: 'Knuckles Forest Bathing',
        location: 'Knuckles Range, Central Province',
        rating: '4.9',
        reviews: '248',
        description: 'Therapeutic Shinrin-yoku (forest bathing) experiences in the pristine Knuckles Mountain Range, guided by naturalists to restore mental clarity and physical vitality.',
        image: '/images/misty_mountains.png'
    },
    {
        id: 'ella-wellness-trail',
        name: 'Ella Wellness & Nature Trail',
        location: 'Ella, Uva Province',
        rating: '4.8',
        reviews: '340',
        description: 'A curated wellness journey through Ella\'s stunning highland scenery, combining gentle tea estate hikes, guided breathwork sessions and traditional herbal tea tastings.',
        image: '/images/hidden_waterfall.png'
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
