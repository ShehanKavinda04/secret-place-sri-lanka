import { motion } from 'framer-motion';

export default function Newsletter() {
    return (
        <motion.section 
            id="newsletter" 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-24 bg-[#f4ebd9] border-t border-royalGold-500/20"
        >
            <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                <div className="w-16 h-16 rounded-full bg-royalMaroon-800 text-royalGold-300 flex items-center justify-center mx-auto shadow-md border border-royalGold-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.626a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </div>
                <div className="space-y-3">
                    <span className="text-xs uppercase tracking-widest font-extrabold text-royalMaroon-900">Sri Lankan Adventure Club</span>
                    <h2 className="font-display text-3xl font-extrabold text-royalMaroon-950">Join the Secret Travel Group</h2>
                    <p className="text-slate-650 font-light max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                        Subscribe to receive precise maps, safety coordinates, and guidelines for a brand new secret travel spot every month.
                    </p>
                </div>
                <form className="max-w-md mx-auto flex gap-3 p-1.5 bg-white border border-slate-300 rounded-full focus-within:border-royalGold-500 shadow-sm">
                    <input 
                        type="email" 
                        required
                        placeholder="Enter your email address" 
                        className="bg-transparent border-0 outline-none flex-1 px-5 text-sm text-slate-800 placeholder-slate-400"
                    />
                    <button type="submit" className="px-6 py-3 bg-royalMaroon-800 text-royalGold-300 font-bold uppercase tracking-wider text-xs rounded-full hover:bg-royalMaroon-900">
                        Subscribe
                    </button>
                </form>
            </div>
        </motion.section>
    );
}