export default function SpotCard({ spot }) {
    return (
        <article className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden hover:border-royalGold-500/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img 
                    src={spot.image} 
                    alt={spot.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <span>{spot.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-700">{spot.rating}</span>
                        <span className="text-slate-400">({spot.reviews})</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-royalMaroon-950 group-hover:text-royalMaroon-800 transition-colors">
                        {spot.name}
                    </h3>
                    <p className="text-slate-650 text-sm font-light leading-relaxed">
                        {spot.description}
                    </p>
                </div>

                <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Verified Spot</span>
                    <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-royalTeal hover:text-[#0c6b65] transition-colors">
                        View Details
                        <span>→</span>
                    </button>
                </div>

            </div>
        </article>
    );
}