import { motion } from 'framer-motion';
import { Star, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function VehicleCard({ vehicle, onBook }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col sm:flex-row group"
        >
            <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:h-full relative overflow-hidden bg-slate-900">
                <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute top-4 left-4 bg-teal-900 text-teal-50 text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-teal-800">
                    {vehicle.type}
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 relative">
                <div className="absolute top-6 right-6 flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-lg text-sm font-bold border border-amber-100">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {vehicle.rating || '4.9'}
                </div>

                <h3 className="font-display text-xl font-bold text-slate-800 mb-1 pr-16 leading-tight">{vehicle.name}</h3>
                
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {vehicle.features.map(feature => (
                        <span key={feature} className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-600" />
                            {feature}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-emerald-700 font-medium">24/7 Breakdown replacement guarantee</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Starting from</p>
                        <p className="text-xl font-bold text-teal-800">{vehicle.price}</p>
                    </div>
                    <button 
                        onClick={() => onBook(vehicle)}
                        className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
