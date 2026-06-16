import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Navbar({ auth }) {
    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-royalMaroon-800 border-b border-royalGold-600/20 text-[#FAF9F6] sticky top-0 z-50 shadow-md"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-royalGold-600 via-royalGold-400 to-royalGold-300 flex items-center justify-center shadow-md border border-royalGold-300/30">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-royalMaroon-950">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v5.25H6a.75.75 0 0 0 0 1.5h5.25V18a.75.75 0 0 0 1.5 0v-5.25H18a.75.75 0 0 0 0-1.5h-5.25V6Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="font-display text-xl font-bold tracking-wider text-royalGold-300">SecretPlaces</span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-royalGold-300/90">
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
                    <motion.a 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        href="/#features" 
                        onClick={(e) => {
                            if (window.location.pathname === '/') {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('manual-loader', { detail: { duration: 600 } }));
                                setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }
                        }}
                        className="hover:text-royalGold-300 transition-colors"
                    >Features</motion.a>
                    <motion.a 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        href="/#newsletter" 
                        onClick={(e) => {
                            if (window.location.pathname === '/') {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('manual-loader', { detail: { duration: 600 } }));
                                setTimeout(() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }), 100);
                            }
                        }}
                        className="hover:text-royalGold-300 transition-colors"
                    >Suggestions</motion.a>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link prefetch href="/about-us" className="hover:text-royalGold-300 transition-colors">About Us</Link>
                    </motion.div>
                </nav>

                <div className="flex items-center gap-4">
                    {auth.user ? (
                        <Link prefetch href={route('dashboard')} className="px-5 py-2.5 rounded-full bg-royalMaroon-900 border border-royalGold-500/50 text-xs font-bold uppercase tracking-wider text-royalGold-300 hover:bg-royalMaroon-950 transition-all">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link prefetch href={route('login')} className="text-sm font-semibold text-royalGold-400 hover:text-royalGold-300">Log In</Link>
                            <Link prefetch href={route('register')} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-royalGold-500 to-royalGold-300 text-xs font-bold uppercase tracking-wider text-royalMaroon-950 hover:brightness-110">
                                Join Group
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    );
}