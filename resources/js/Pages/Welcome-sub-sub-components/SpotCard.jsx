import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function SpotCard({ spot }) {
    return (
        <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
        >
            <Link href={spot.href || `/places/${spot.id}/history`} className="flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                        src={spot.image} 
                        alt={spot.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center shadow">
                        <Star className="w-3 h-3 fill-royalGold-500 text-royalGold-500 mr-1" /> {spot.rating}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                    <div>
                        <div className="text-[11px] text-royalMaroon-950 font-bold mb-1.5 uppercase tracking-wider">{spot.location}</div>
                        <h3 className="text-[17px] font-bold text-slate-800 mb-2 leading-snug group-hover:text-[#FF6B35] transition-colors">
                            {spot.name}
                        </h3>
                    </div>
                    {spot.price ? (
                        <div className="font-bold text-slate-900 text-sm mt-3 pt-3">
                            From ${spot.price}
                        </div>
                    ) : (
                        <div className="font-bold text-slate-900 text-sm mt-3 pt-3 text-royalTeal">
                            Explore
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    );
}