export default function FeaturesSection({ features, setSelectedFeature }) {
    return (
        <section id="features" className="py-24 bg-[#FAF9F6] border-b border-royalGold-400/25">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-royalTeal leading-tight">
                        Important Highlights
                    </h2>
                    <p className="text-[#605a54] text-sm sm:text-base font-light max-w-2xl mx-auto">
                        Experience the spiritual heart of Anuradhapura, featuring magnificent ancient stupas, historic monasteries, and deeply revered sacred Buddhist heritage sites.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto pt-6">
                    {features.map((feature) => (
                        <div 
                            key={feature.id}
                            onClick={() => setSelectedFeature(feature)}
                            className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="w-20 h-20 rounded-full bg-royalTeal text-royalGold-300 flex items-center justify-center shadow-lg border-2 border-royalGold-400/30 z-10 group-hover:scale-110 group-hover:bg-[#08423f] transition-all duration-300">
                                {feature.icon}
                            </div>
                            
                            <div className="w-full bg-[#dfbe82] rounded-3xl pt-12 pb-6 px-6 -mt-10 border border-royalGold-500/20 shadow-md group-hover:shadow-xl group-hover:bg-[#e6c78e] transition-all duration-300 flex flex-col justify-between items-center text-center min-h-[220px]">
                                <div className="space-y-2.5">
                                    <h3 className="font-display text-lg font-bold text-royalMaroon-950 uppercase tracking-wider">
                                        {feature.title}
                                    </h3>
                                    <p className="text-royalMaroon-900/90 text-xs sm:text-sm font-medium leading-relaxed px-1">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="w-full pt-4 mt-4 border-t border-royalMaroon-950/15 flex flex-col items-center gap-2">
                                    <span className="px-2.5 py-1 rounded-full bg-royalMaroon-950/10 text-[10px] font-extrabold tracking-wide text-royalMaroon-950 uppercase">
                                        {feature.dynamicTag}
                                    </span>
                                    <span className="text-[10px] font-bold text-royalMaroon-900 uppercase tracking-widest flex items-center gap-1 group-hover:text-royalMaroon-950 transition-colors">
                                        Launch System ➜
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}