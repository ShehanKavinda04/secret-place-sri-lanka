import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-royalMaroon-900 to-royalMaroon-700 p-6 shadow-md border border-royalGold-700/30 group"
        >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" />
            
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <p className="text-sm font-medium text-royalGold-300 font-sansDisplay uppercase tracking-wide">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-display font-semibold text-white">
                        {value}
                    </p>
                </div>
                <div className="rounded-full bg-royalMaroon-950 p-3 border border-royalGold-500/30">
                    <Icon className="h-6 w-6 text-royalGold-500" aria-hidden="true" />
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center text-sm relative z-10">
                    <span className={`font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="ml-2 text-gray-300">{trendLabel}</span>
                </div>
            )}
        </motion.div>
    );
}
