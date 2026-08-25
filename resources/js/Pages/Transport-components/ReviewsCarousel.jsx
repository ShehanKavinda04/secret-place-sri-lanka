import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import axios from 'axios';

export default function ReviewsCarousel() {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/transport-reviews');
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
        // Poll for real-time updates every 30 seconds
        const interval = setInterval(fetchReviews, 30000);
        return () => clearInterval(interval);
    }, []);

    const next = () => setCurrentIndex((prev) => (prev + 1) % (reviews.length || 1));
    const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % (reviews.length || 1));

    if (reviews.length === 0) return null; // or a loading spinner

    return (
        <div className="relative max-w-4xl mx-auto px-12 pb-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 flex flex-col items-center text-center relative"
                >
                    <Quote className="absolute top-8 left-8 w-12 h-12 text-teal-100 rotate-180" />
                    
                    <div className="flex gap-1 mb-6">
                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                        ))}
                    </div>
                    
                    <p className="text-lg sm:text-xl text-slate-700 italic font-medium leading-relaxed mb-8 relative z-10">
                        "{reviews[currentIndex].text}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reviews[currentIndex].name)}&background=0f766e&color=fff`} 
                            alt={reviews[currentIndex].name} 
                            className="w-12 h-12 rounded-full border-2 border-slate-100 shadow-sm"
                        />
                        <div className="text-left">
                            <h4 className="font-bold text-slate-900">{reviews[currentIndex].name}</h4>
                            <p className="text-xs text-slate-500">{reviews[currentIndex].service} • {reviews[currentIndex].date}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button 
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:scale-105 transition-all focus:outline-none"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:scale-105 transition-all focus:outline-none"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-teal-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
