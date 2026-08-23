import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import { motion } from 'framer-motion';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const traditionalCrafts = [
    {
        id: 'stone-carving',
        name: 'Traditional Stone Sculpting',
        location: 'Anuradhapura Sacred City',
        rating: '4.9',
        reviews: '310',
        description: "Master stonemasons recreate the glory of ancient Anuradhapura, meticulously chiseling granite to craft exquisite replicas of Moonstones (Sandakada Pahana), Guardstones, and Samadhi statues.",
        image: '/images/stone_sculpting.png',
        href: '/crafts/stone-carving'
    },
    {
        id: 'rajarata-pottery',
        name: 'Rajarata Clay Pottery',
        location: 'Nuwaragam Palatha, Anuradhapura',
        rating: '4.8',
        reviews: '245',
        description: 'Local artisans in traditional pottery villages use the rich red laterite clay from the dry zone to wheel-throw terracotta water jugs (Gurulethu), cooking pots, and ritual oil lamps.',
        image: '/images/clay_pottery.png',
        href: '/crafts/rajarata-pottery'
    },
    {
        id: 'rush-reed-weaving',
        name: 'Rush & Reed Weaving (Pan)',
        location: 'Kala Wewa Environs, Anuradhapura',
        rating: '4.7',
        reviews: '180',
        description: 'Women from communities surrounding the ancient reservoirs expertly weave dried reeds and rushes into beautiful, eco-friendly mats, baskets, and intricate household items.',
        image: '/images/reed_weaving.png',
        href: '/crafts/rush-reed-weaving'
    },
    {
        id: 'lotus-fibre-craft',
        name: 'Lotus Stem Silk Extraction',
        location: 'Nuwara Wewa, Anuradhapura',
        rating: '4.9',
        reviews: '155',
        description: 'An innovative, highly sustainable MSME craft where artisans extract delicate micro-fibres from the lotus stems gathered from Anuradhapura’s ancient lakes to weave rare, luxurious textiles.',
        image: '/images/lotus_silk.png',
        href: '/crafts/lotus-fibre-craft'
    },
    {
        id: 'wood-carving',
        name: 'Anuradhapura Woodcraft',
        location: 'Mihintale, Anuradhapura',
        rating: '4.6',
        reviews: '220',
        description: 'Skilled carpenters and carvers shape locally sourced timber into stunning architectural elements, replicating the floral motifs and ancient designs found in ruins like the Lovamahapaya.',
        image: '/images/woodcraft.png',
        href: '/crafts/wood-carving'
    },
    {
        id: 'handloom-textiles',
        name: 'Rajarata Handloom Centres',
        location: 'Anuradhapura',
        rating: '4.8',
        reviews: '290',
        description: 'Local handloom cooperatives supporting female artisans who weave vibrant cotton fabrics and traditional garments using wooden looms, preserving a vital rural livelihood.',
        image: '/images/handloom.png',
        href: '/crafts/handloom-textiles'
    },
];

const heritageExperiences = [
    {
        id: 'craft-village-tour',
        name: 'Kala Grama Artisan Tour',
        location: 'Anuradhapura Surroundings',
        rating: '4.8',
        reviews: '142',
        description: 'A guided immersive tour through dedicated artisan villages (Kala Grama) where you can interact directly with master craftspeople and support local MSME families.',
        image: '/images/heritage_crafts.png',
        href: '/experience/craft-village-tour'
    },
    {
        id: 'pottery-workshop',
        name: 'Hands-on Clay Workshop',
        location: 'Anuradhapura',
        rating: '4.9',
        reviews: '188',
        description: 'Learn the ancient techniques of wheel-throwing and hand-building from hereditary potters. Shape your own terracotta souvenirs using the distinct red clay of the Rajarata region.',
        image: '/images/clay_workshop.png',
        href: '/experience/pottery-workshop'
    },
    {
        id: 'handloom-experience',
        name: 'Rajarata Handloom & Weaving Experience',
        location: 'Polonnaruwa / Rajarata',
        rating: '4.7',
        reviews: '96',
        description: 'Experience the art of authentic handloom weaving and natural dyeing techniques. Interact with local weavers and create your own custom woven keepsake.',
        image: '/images/handloom_experience.png',
        href: '/experience/handloom-experience'
    },
    {
        id: 'culinary-walk',
        name: 'Village Culinary & Heritage Walk',
        location: 'Mihintale Village',
        rating: '4.9',
        reviews: '210',
        description: 'Walk through heritage villages and participate in traditional clay-pot culinary experiences, discovering authentic local recipes and rural living traditions.',
        image: '/images/village_culinary.png',
        href: '/experience/culinary-walk'
    }
];

export default function Heritage({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Local Heritage MSMEs & Crafts - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-64 sm:h-80 overflow-hidden"
                >
                    <img src="/images/heritage_crafts.png" alt="Local Heritage MSMEs & Crafts" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Local Heritage MSMEs &amp; Crafts
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Support the living artisan traditions that have sustained Anuradhapura's cultural identity for centuries.
                        </p>
                    </div>
                </motion.div>

                {/* Introductory Info Strip */}
                <div className="bg-royalMaroon-950/5 border-y border-royalGold-400/20 py-6 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: '🏺', stat: '50+', label: 'Artisan Workshops' },
                            { icon: '🌿', stat: '10+', label: 'Eco-Craft MSMEs' },
                            { icon: '🏘️', stat: '12', label: 'Heritage Villages' },
                            { icon: '🤝', stat: '1,200+', label: 'Livelihoods Supported' },
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
                            Anuradhapura Heritage Crafts
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            Discover the extraordinary skill of Anuradhapura's craftspeople — from traditional stone sculptors recreating ancient moonstones to skilled potters and rush-weavers around the ancient reservoirs. Every purchase sustains a living heritage tradition in the Sacred City.
                        </p>
                    </div>

                    {/* Section 1 — Traditional Crafts */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Traditional Crafts &amp; Artisan Studios
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {traditionalCrafts.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Section 2 — Heritage Experiences */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-slate-300 flex-grow" />
                            <h3 className="font-display text-xl tracking-wider font-bold text-slate-800 border border-slate-200 px-6 py-2 rounded-lg bg-transparent">
                                Heritage Villages &amp; MSME Experiences
                            </h3>
                            <div className="h-px bg-slate-300 flex-grow" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {heritageExperiences.map(spot => (
                                <SpotCard key={spot.id} spot={spot} />
                            ))}
                        </div>
                    </section>

                    {/* Responsible Tourism Note */}
                    <div className="rounded-3xl bg-royalTeal/5 border border-royalTeal/20 p-8 flex flex-col sm:flex-row items-start gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-royalTeal/10 flex items-center justify-center text-2xl">🌿</div>
                        <div className="space-y-2">
                            <h4 className="font-display text-lg font-bold text-royalMaroon-950">Shop Responsibly, Preserve Heritage</h4>
                            <p className="text-sm text-slate-600 font-light leading-relaxed">
                                When you buy directly from local artisans and MSME cooperatives, you protect centuries of traditional knowledge and ensure fair income for remote communities. Look for the <strong>Authentic Sri Lankan Craft</strong> seal before purchasing.
                            </p>
                        </div>
                    </div>
                </motion.main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
