export default function CategoriesSection({ categoryCards, setActiveCategory }) {
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
                    {categoryCards.map((card, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setActiveCategory(card.title);
                                document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
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

                                <div className="w-full border-t border-white/10 mt-4 pt-4 flex items-center justify-between gap-4">
                                    <span className="text-[10px] text-white/50 tracking-wider font-mono truncate" title={card.hashtags}>
                                        {card.hashtags}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-royalGold-400 transition-colors">
                                            EXPLORE
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-royalGold-400 group-hover:text-royalGold-400 group-hover:bg-royalGold-400/10 transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-5-5-6-10-2-14 4.5-4.5 10-3 10-3s1.5 5.5-3 10c-4 4-9 3-14 2M12 21l3-3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}