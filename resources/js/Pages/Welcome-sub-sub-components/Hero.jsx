import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Hero({ features = [], setSelectedFeature = () => {} }) {
    return (
        <section 
            id="hero" 
            className="relative bg-royalMaroon-800 text-[#FAF9F6] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-royalGold-500 shadow-inner"
        >
            {/* Background Decorative Circles */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-around">
                <div className="w-[400px] h-[400px] rounded-full border-[10px] border-royalGold-300" />
                <div className="w-[500px] h-[500px] rounded-full border-[15px] border-royalGold-300" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Hero Left Content */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}
                    className="lg:col-span-7 space-y-8 text-left"
                >
                    <motion.h1 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-royalGold-300 leading-tight"
                    >
                        Welcome to Secret Places Sri Lanka <br />
                        Explore Sacred Anuradhapura
                    </motion.h1>
                    <motion.p 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-royalGold-400/90 text-base sm:text-lg max-w-xl font-light leading-relaxed"
                    >
                        Journey beyond the ordinary into a civilisation 2,500 years in the making. Explore hidden jungle monasteries, awe-inspiring ancient stupas, sacred Bodhi trees, and timeless pilgrimage routes that breathe with living history and profound spiritual energy.
                    </motion.p>
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-wrap items-center gap-4 pt-2"
                    >
                        <Link 
                            href="/translator"
                            className="px-7 py-3 rounded-full bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-royalMaroon-950 hover:brightness-110 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-royalGold-500/20 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                            </svg>
                            <span>AI Cultural Translator</span>
                        </Link>
                        
                        <button 
                            onClick={() => setSelectedFeature(features.find(f => f.id === 'tracking'))}
                            className="px-6 py-3 rounded-full border-2 border-royalGold-500 text-royalGold-300 hover:bg-royalMaroon-700/50 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase"
                        >
                            Live Detailing
                        </button>
                        
                        <button 
                            onClick={() => setSelectedFeature(features.find(f => f.id === 'booking'))}
                            className="px-6 py-3 rounded-full border border-royalGold-500/50 text-royalGold-400 hover:bg-royalMaroon-700/50 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase"
                        >
                            Live Booking
                        </button>
                    </motion.div>
                </motion.div>

                {/* Hero Right Graphic */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="lg:col-span-5 flex justify-center items-center"
                >
                    <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-royalGold-500/40 bg-royalMaroon-900 group">
                        <img 
                            src="/images/sri_lanka_hero_art.png" 
                            alt="Traditional Sri Lankan Lion and Moonstone" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-royalMaroon-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}