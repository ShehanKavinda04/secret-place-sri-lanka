export default function Hero() {
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
                <div className="lg:col-span-7 space-y-8 text-left">
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-royalGold-300 leading-tight">
                        Welcome to Secret Places Sri Lanka <br />
                        Explore Sacred Anuradhapura
                    </h1>
                    <p className="text-royalGold-400/90 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                        Journey beyond the ordinary into a civilisation 2,500 years in the making. Explore hidden jungle monasteries, awe-inspiring ancient stupas, sacred Bodhi trees, and timeless pilgrimage routes that breathe with living history and profound spiritual energy.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a 
                            href="#discover"
                            className="px-8 py-3 rounded-full bg-royalGold-500 text-royalMaroon-950 hover:bg-royalGold-400 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase shadow-md shadow-royalGold-500/10"
                        >
                            Live Detailing
                        </a>
                        <a 
                            href="#newsletter"
                            className="px-8 py-3 rounded-full border-2 border-royalGold-500 text-royalGold-400 hover:bg-royalMaroon-700/50 active:scale-95 transition-all duration-200 font-bold text-sm sm:text-base tracking-wider uppercase"
                        >
                            Live Booking
                        </a>
                    </div>
                </div>

                {/* Hero Right Graphic */}
                <div className="lg:col-span-5 flex justify-center items-center">
                    <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-royalGold-500/40 bg-royalMaroon-900 group">
                        <img 
                            src="/images/sri_lanka_hero_art.png" 
                            alt="Traditional Sri Lankan Lion and Moonstone" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-royalMaroon-950/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}