import { router } from '@inertiajs/react';

const CATEGORY_ROUTES = {
    "Sacred Sites & Shrines": '/places',
    "Accommodation Options": '/category/accommodations',
    "Spiritual Experiences & Wellness": '/category/spiritual',
    "Ancient Hydraulic & Architecture Wonders": '/category/hydraulic',
    "Local Heritage MSMEs & Crafts": '/category/heritage',
    "Transport & Pilgrimage Logistics": '/category/transport',
};

import { motion } from 'framer-motion';

export default function CategoriesSection({ categoryCards, setActiveCategory }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };
    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <section id="categories" className="py-24 bg-[#f3efe6] border-b border-royalGold-400/25">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <span className="text-xs uppercase tracking-widest font-extrabold text-royalGold-700">Classification Desk</span>
                    <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-royalMaroon-950 leading-tight">
                        Explore Categories
                    </h2>
                    <p className="text-[#605a54] text-sm sm:text-base font-light max-w-2xl mx-auto">
                        Navigate our curated classifications of Sri Lankan wonders.
                    </p>
                </div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6"
                >
                    {categoryCards.map((card, index) => (
                        <motion.div
                            variants={item}
                            key={index}
                            onClick={() => {
                                const route = CATEGORY_ROUTES[card.title];
                                if (route) {
                                    import('@inertiajs/react').then(({ router }) => {
                                        router.visit(route);
                                    });
                                } else {
                                    setActiveCategory(card.title);
                                    window.dispatchEvent(new CustomEvent('manual-loader', { detail: { duration: 600 } }));
                                    setTimeout(() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }
                            }}
                            className="group relative aspect-square rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 border border-royalGold-500/10"
                        >
                            <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                                <div className="w-full border-t border-white/20 pt-4 flex flex-col space-y-2">
                                    <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider leading-snug">
                                        {card.title}
                                    </h3>
                                    <p className="font-display italic text-royalGold-400 text-[13px] leading-relaxed font-semibold">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="w-full border-t border-white/10 mt-4 pt-4 flex items-center justify-end gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-royalGold-400 transition-colors">
                                            EXPLORE
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-royalGold-400 group-hover:text-royalGold-400 group-hover:bg-royalGold-400/10 transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}