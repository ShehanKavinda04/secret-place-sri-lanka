import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

// Global state to trigger loader manually if needed for section scrolling
export const triggerLoader = (duration = 800) => {
    const event = new CustomEvent('manual-loader', { detail: { duration } });
    window.dispatchEvent(event);
};

export default function PageLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout;
        let startTimeout;

        const handleStart = (event) => {
            if (event.detail.visit.showProgress === false) {
                return;
            }

            // Delay loader appearance slightly so fast/prefetched pages don't cause a flash
            startTimeout = setTimeout(() => {
                setLoading(true);
            }, 150);
        };

        const handleFinish = () => {
            clearTimeout(startTimeout);
            timeout = setTimeout(() => {
                setLoading(false);
            }, 100); // Start fade-out quickly
        };

        const handleManual = (e) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, e.detail.duration);
        };

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);
        window.addEventListener('manual-loader', handleManual);

        return () => {
            removeStart();
            removeFinish();
            window.removeEventListener('manual-loader', handleManual);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] bg-[#FAF9F6]/80 backdrop-blur-md flex flex-col items-center justify-center"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Outer rotating ring */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-24 h-24 rounded-full border-4 border-transparent border-t-royalGold-500 border-r-royalGold-500/50 shadow-lg"
                        />
                        {/* Inner rotating ring (reverse) */}
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute w-16 h-16 rounded-full border-4 border-transparent border-b-royalMaroon-800 border-l-royalMaroon-800/50"
                        />
                        {/* Center dot/icon */}
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", ease: "easeInOut" }}
                            className="absolute w-4 h-4 rounded-full bg-royalGold-600"
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-royalMaroon-950 font-display font-bold tracking-widest uppercase text-sm"
                    >
                        Preparing your journey...
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
