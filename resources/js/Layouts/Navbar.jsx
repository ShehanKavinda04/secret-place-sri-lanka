import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import QuickTranslatorModal from '@/Components/QuickTranslatorModal';

export default function Navbar({ auth = {} }) {
    const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);

    const getRoute = (name, fallback) => {
        try {
            return typeof route === 'function' ? route(name) : fallback;
        } catch (e) {
            return fallback;
        }
    };

    return (
        <>
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-royalMaroon-800 border-b border-royalGold-600/20 text-[#FAF9F6] sticky top-0 z-50 shadow-md"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-royalGold-600 via-royalGold-400 to-royalGold-300 flex items-center justify-center shadow-md border border-royalGold-300/30">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-royalMaroon-950">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-display text-xl font-bold tracking-wider text-royalGold-300">SecretPlaces</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide text-royalGold-300/90">
                        <motion.a 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            href="/#hero" 
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent('manual-loader', { detail: { duration: 600 } }));
                                    setTimeout(() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }
                            }}
                            className="hover:text-royalGold-300 transition-colors"
                        >Home</motion.a>
                        
                        <motion.a 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            href="/#categories" 
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent('manual-loader', { detail: { duration: 600 } }));
                                    setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }
                            }}
                            className="hover:text-royalGold-300 transition-colors"
                        >Categories</motion.a>
                        
                        <motion.a 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            href="/#smart-routing" 
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent('manual-loader', { detail: { duration: 600 } }));
                                    setTimeout(() => document.getElementById('smart-routing')?.scrollIntoView({ behavior: 'smooth' }), 100);
                                }
                            }}
                            className="hover:text-royalGold-300 transition-colors"
                        >Map</motion.a>
                        
                        {/* Translator Navigation Link */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link prefetch href="/translator" className="flex items-center gap-1.5 text-royalGold-300 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-royalGold-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                                </svg>
                                <span>AI Translator</span>
                            </Link>
                        </motion.div>

                        {/* CwGBM AI Forecast Link */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link prefetch href="/forecast" className="flex items-center gap-1.5 text-royalGold-300 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-royalGold-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                <span>AI Forecast</span>
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link prefetch href="/about-us" className="hover:text-royalGold-300 transition-colors">About Us</Link>
                        </motion.div>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Quick Translator Overlay Button */}
                        <button
                            onClick={() => setIsTranslatorOpen(true)}
                            className="px-3.5 py-2 rounded-full bg-royalGold-500/10 hover:bg-royalGold-500/20 border border-royalGold-500/30 text-royalGold-300 transition-colors flex items-center gap-1.5 text-xs font-bold"
                            title="Quick AI Translator"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-royalGold-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m0 2.25c0 3.107 1.002 6.012 2.766 8.384m-4.502-1.921A11.96 11.96 0 0 1 3 5.621m15-1.996a48.474 48.474 0 0 0-6-.371" />
                            </svg>
                            <span className="hidden sm:inline">Quick Translate</span>
                        </button>

                        {auth && auth.user ? (
                            <Link 
                                prefetch 
                                href={getRoute('dashboard', '/dashboard')} 
                                className="w-[42px] h-[42px] rounded-full overflow-hidden border-2 border-royalGold-500/50 hover:border-royalGold-400 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all bg-[#D1D5DB] flex items-center justify-center shrink-0"
                                title="My Account"
                            >
                                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="38" r="22" fill="#9CA3AF"/>
                                    <path d="M15 100C15 75 30 65 50 65C70 65 85 75 85 100" fill="#9CA3AF"/>
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <Link prefetch href={getRoute('login', '/login')} className="text-sm font-semibold text-royalGold-400 hover:text-royalGold-300">Log In</Link>
                                <Link prefetch href={getRoute('register', '/register')} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-xs font-bold uppercase tracking-wider text-royalMaroon-950 hover:brightness-110">
                                    Join Group
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </motion.header>

            <QuickTranslatorModal 
                isOpen={isTranslatorOpen} 
                onClose={() => setIsTranslatorOpen(false)} 
            />
        </>
    );
}