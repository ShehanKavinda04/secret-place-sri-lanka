import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import SpotCard from './Welcome-sub-sub-components/SpotCard';

const traditionalCrafts = [
    {
        id: 'beeralu-lace',
        name: 'Beeralu Lace Weaving',
        location: 'Galle, Southern Province',
        rating: '4.8',
        reviews: '210',
        description: "A centuries-old Portuguese-influenced lacework tradition practised in Galle's coastal villages, where skilled artisans weave intricate patterns using wooden bobbins on padded pillows.",
        image: '/images/heritage_crafts.png'
    },
    {
        id: 'dumbara-weaving',
        name: 'Dumbara Mat Weaving',
        location: 'Hennanigala, Kandy District',
        rating: '4.9',
        reviews: '175',
        description: 'The legendary Dumbara mats, woven from the fibrous bark of the Hana plant using geometric patterns unique to each village, are a protected GI-tagged craft of Sri Lanka.',
        image: '/images/media__1779345162925.png'
    },
    {
        id: 'kandyan-goldsmithing',
        name: 'Kandyan Traditional Goldsmithing',
        location: 'Kandy, Central Province',
        rating: '4.9',
        reviews: '320',
        description: 'Master goldsmiths in Kandy craft exquisite jewellery using traditional repoussé and filigree techniques, producing the regal ornaments once exclusive to Kandyan royalty.',
        image: '/images/heritage_crafts.png'
    },
    {
        id: 'kolam-masks',
        name: 'Ambalangoda Mask Carving',
        location: 'Ambalangoda, Southern Province',
        rating: '4.8',
        reviews: '285',
        description: 'Brightly painted ritual masks hand-carved from the lightweight Kaduru tree by hereditary master craftsmen, used in ancient kolam dance dramas and Thovil healing ceremonies.',
        image: '/images/rock_cave_temple_1779382110458.png'
    },
    {
        id: 'brass-brassware',
        name: 'Traditional Brassware Crafting',
        location: 'Kurunegala, North Western Province',
        rating: '4.7',
        reviews: '148',
        description: 'Artisans using the ancient lost-wax (Cire Perdue) casting method to create sacred oil lamps, temple vessels, and decorative figurines with timeless elegance.',
        image: '/images/heritage_crafts.png'
    },
    {
        id: 'batik-art',
        name: 'Sri Lankan Batik Art Studios',
        location: 'Matale, Central Province',
        rating: '4.8',
        reviews: '390',
        description: 'Vibrant hand-crafted batik fabrics featuring nature motifs and traditional Sri Lankan iconography, produced by skilled artisans in dedicated cottage studios open to visitors.',
        image: '/images/spiritual_wellness.png'
    },
];

const heritageExperiences = [
    {
        id: 'pottuvil-pottery',
        name: 'Traditional Pottery Villages',
        location: 'Kekirawa, North Central Province',
        rating: '4.7',
        reviews: '118',
        description: 'Visit traditional villages where hereditary potters craft terracotta water pots, cooking vessels, and ritual oil lamps using ancient hand-wheel techniques on red laterite clay.',
        image: '/images/kalasohona_monastery.png'
    },
    {
        id: 'coir-weaving',
        name: 'Coir Industry & Weaving Co-ops',
        location: 'Negombo, Western Province',
        rating: '4.6',
        reviews: '96',
        description: 'Explore cooperative workshops where coastal communities process coconut husks into coir rope, mattress fibre, and decorative products, sustaining a 600-year-old maritime craft tradition.',
        image: '/images/hidden_waterfall.png'
    },
    {
        id: 'silver-filigree',
        name: 'Silver Filigree Craft MSMEs',
        location: 'Jaffna, Northern Province',
        rating: '4.9',
        reviews: '162',
        description: 'Extraordinary filigree silverwork unique to Jaffna, where Tamil master craftsmen twist and solder fine silver threads into delicate jewellery of remarkable intricacy.',
        image: '/images/heritage_crafts.png'
    },
    {
        id: 'palmyrah-crafts',
        name: 'Palmyrah Leaf Craft Workshops',
        location: 'Vavuniya, Northern Province',
        rating: '4.7',
        reviews: '84',
        description: 'Traditional Northern Province craft workshops where artisans weave the leaves of the Palmyrah palm into decorative fans, baskets, hats, and ornamental household items.',
        image: '/images/misty_mountains.png'
    },
    {
        id: 'gem-cutting',
        name: 'Ratnapura Gem Cutting Studios',
        location: 'Ratnapura, Sabaragamuwa Province',
        rating: '4.9',
        reviews: '440',
        description: "Sri Lanka's Gem Capital offers unique studio visits to witness master gem cutters and polishers transform rough sapphires, rubies, and cat's eyes into world-class precious stones.",
        image: '/images/ancient_hydraulic.png'
    },
];

export default function Heritage({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Local Heritage MSMEs & Crafts - Secret Places Sri Lanka" />
            <div className="min-h-screen bg-[#FAF9F6] text-[#2c1d11] font-sans selection:bg-royalGold-500 selection:text-royalMaroon-950 flex flex-col">
                <Navbar auth={auth} />

                {/* Hero Banner */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img src="/images/heritage_crafts.png" alt="Local Heritage MSMEs & Crafts" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-[#FAF9F6]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-400 mb-2">Category Exploration</span>
                        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            Local Heritage MSMEs &amp; Crafts
                        </h1>
                        <p className="mt-3 text-white/70 text-sm max-w-xl font-light">
                            Support the living artisan traditions that have sustained Sri Lanka's cultural identity for centuries.
                        </p>
                    </div>
                </div>

                {/* Introductory Info Strip */}
                <div className="bg-royalMaroon-950/5 border-y border-royalGold-400/20 py-6 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: '🏺', stat: '200+', label: 'Artisan Workshops' },
                            { icon: '🧵', stat: '18', label: 'Protected GI Crafts' },
                            { icon: '🏘️', stat: '45', label: 'Heritage Villages' },
                            { icon: '🤝', stat: '3,500+', label: 'MSME Livelihoods Supported' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center gap-1">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="font-display text-2xl font-bold text-royalMaroon-800">{item.stat}</span>
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20 w-full">
                    {/* Header */}
                    <div className="space-y-3 text-left border-b border-royalGold-400/20 pb-8">
                        <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Exploration Desk</span>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-royalMaroon-950">
                            Local Heritage MSMEs &amp; Crafts
                        </h2>
                        <p className="text-slate-500 font-light text-sm max-w-lg">
                            Discover the extraordinary skill of Sri Lanka's craftspeople — from Kandyan goldsmiths and Galle lacemakers to Jaffna silversmiths and Ratnapura gem-cutters. Every purchase sustains a living heritage tradition.
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
                </main>

                <Footer auth={auth} laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
