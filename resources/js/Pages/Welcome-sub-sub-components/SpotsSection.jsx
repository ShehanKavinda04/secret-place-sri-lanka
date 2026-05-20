import SpotCard from './SpotCard';

export default function SpotsSection({ 
    filteredSpots, 
    searchQuery, 
    setSearchQuery, 
    activeCategory, 
    setActiveCategory, 
    categories 
}) {
    return (
        <section id="discover" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-royalGold-400/20 pb-8">
                <div className="space-y-3 text-left">
                    <span className="text-xs uppercase tracking-widest font-bold text-royalGold-700">Exploration Desk</span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-royalMaroon-950">
                        Mapped Secret Spots
                    </h2>
                    <p className="text-slate-500 font-light text-sm max-w-lg">
                        Explore the ancient, sacred heart of Anuradhapura, home to venerable stupas, historic monasteries, and deeply revered Buddhist heritage sites.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0 w-full lg:w-auto">
                    <div className="relative w-full sm:w-72">
                        <input 
                            type="text" 
                            placeholder="Search spots..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-350 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-royalGold-500 focus:border-royalGold-500 text-slate-800"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21-21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                        </svg>
                    </div>
                </div>
            </div>

            {filteredSpots.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSpots.map(spot => (
                        <SpotCard key={spot.id} spot={spot} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-100/50 border border-slate-200 rounded-3xl">
                    <h3 className="text-lg font-bold text-slate-600 mb-1">No Secret Spots Found</h3>
                    <p className="text-slate-450 text-sm font-light">We couldn't find any spots matching "{searchQuery}".</p>
                </div>
            )}

            {/* Explore More Button */}
            <div className="flex flex-col items-center gap-4 pt-4 border-t border-royalGold-400/20">
                <p className="text-xs uppercase tracking-widest font-bold text-royalGold-700">More Awaits You</p>
                <a
                    href="#categories"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-royalMaroon-800 to-royalMaroon-950 text-royalGold-300 font-bold text-sm uppercase tracking-widest border border-royalGold-500/40 shadow-lg hover:shadow-royalGold-500/20 hover:border-royalGold-400/70 hover:from-royalMaroon-700 hover:to-royalMaroon-900 active:scale-95 transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5 text-royalGold-400 group-hover:rotate-12 transition-transform duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    Explore More Sacred Sites
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-royalGold-400 group-hover:translate-x-1 transition-transform duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </a>
                <p className="text-[11px] text-slate-400 font-light">Discover all 6 sacred categories of Anuradhapura's ancient heritage</p>
            </div>
        </section>
    );
}