import React, { useState, useEffect, useMemo } from 'react';
import SellerLayout from '@/Layouts/SellerLayout';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Search, Filter, ShieldCheck, Flag, Check, Bot, ThumbsUp } from 'lucide-react';
import { reviewService } from '@/Services/reviewService';

// Reusable Star Display
const StarRating = ({ rating, size = "w-5 h-5" }) => (
    <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`${size} ${star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
        ))}
    </div>
);

// Progress Bar Component
const ProgressBar = ({ label, value, max = 5 }) => (
    <div className="flex items-center mb-2">
        <span className="text-sm text-slate-600 w-24 truncate">{label}</span>
        <div className="flex-1 ml-4 relative h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
                className="absolute top-0 left-0 h-full bg-[#1B4D3E] rounded-full transition-all duration-500" 
                style={{ width: `${(value / max) * 100}%` }}
            ></div>
        </div>
        <span className="text-sm font-bold text-slate-700 ml-4 w-6 text-right">{value.toFixed(1)}</span>
    </div>
);

// Review Card Component
const ReviewCard = ({ review, onReplySubmit }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyDraft, setReplyDraft] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSuggestAI = () => {
        setReplyDraft(reviewService.suggestAiResponse(review));
    };

    const handleSubmit = async () => {
        if (!replyDraft.trim()) return;
        setIsSubmitting(true);
        try {
            await onReplySubmit(review.id, replyDraft);
            setIsReplying(false);
            setReplyDraft('');
        } catch (e) {
            console.error("Failed to post reply", e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4 transition hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.guest_name)}&color=1B4D3E&background=e2e8f0&bold=true`}
                        alt={review.guest_name}
                        className="w-12 h-12 rounded-full border border-slate-200 object-cover"
                    />
                    <div>
                        <h4 className="text-base font-bold text-slate-900 flex items-center">
                            {review.guest_name}
                            {review.is_verified_booking && (
                                <span className="ml-2 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified Stay
                                </span>
                            )}
                        </h4>
                        <div className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                            <span className="font-medium text-slate-700">{review.guest_country}</span>
                            <span>•</span>
                            <span>{new Date(review.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>Eco Cabin (PROP-1)</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <StarRating rating={review.rating_overall} />
                    <span className={`mt-2 text-xs font-bold uppercase tracking-wide ${
                        review.sentiment === 'positive' ? 'text-emerald-600' :
                        review.sentiment === 'negative' ? 'text-rose-600' : 'text-amber-600'
                    }`}>
                        {review.sentiment}
                    </span>
                </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-4">
                "{review.review_text}"
            </p>

            {/* Existing Reply */}
            {review.host_reply ? (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 ml-8 relative before:absolute before:left-[-16px] before:top-4 before:w-4 before:h-px before:bg-slate-200 before:content-['']">
                    <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-bold mr-2">H</div>
                        <span className="text-sm font-bold text-[#1B4D3E]">Your Reply</span>
                        <span className="text-xs text-slate-400 ml-2">{new Date(review.host_reply.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 whitespace-pre-line">{review.host_reply.reply_text}</p>
                </div>
            ) : (
                /* Action Area for Unreplied */
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <AnimatePresence>
                        {!isReplying ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-between items-center">
                                <button 
                                    onClick={() => setIsReplying(true)}
                                    className="flex items-center text-sm font-bold text-[#D97706] hover:text-[#b46205] transition"
                                >
                                    <MessageSquare className="w-4 h-4 mr-2" /> Reply to Guest
                                </button>
                                <button className="flex items-center text-xs text-slate-400 hover:text-rose-500 transition">
                                    <Flag className="w-3 h-3 mr-1" /> Report Issue
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }} 
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mb-3 flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-800">Drafting Reply</span>
                                    <button 
                                        onClick={handleSuggestAI}
                                        className="flex items-center text-xs font-bold text-[#1B4D3E] bg-[#1B4D3E]/10 px-3 py-1.5 rounded-full hover:bg-[#1B4D3E]/20 transition"
                                    >
                                        <Bot className="w-3 h-3 mr-1" /> Suggest AI Response
                                    </button>
                                </div>
                                <textarea
                                    className="w-full border-slate-300 rounded-lg shadow-sm focus:border-[#1B4D3E] focus:ring-[#1B4D3E] text-sm text-slate-900 bg-white placeholder-slate-400"
                                    rows="4"
                                    placeholder="Write your professional response here..."
                                    value={replyDraft}
                                    onChange={(e) => setReplyDraft(e.target.value)}
                                ></textarea>
                                <div className="mt-3 flex justify-end space-x-3">
                                    <button 
                                        onClick={() => setIsReplying(false)}
                                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !replyDraft.trim()}
                                        className="px-4 py-2 text-sm font-medium text-white bg-[#1B4D3E] rounded-md hover:bg-[#143d31] transition disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Publishing...' : 'Publish Reply'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStar, setFilterStar] = useState('all'); // all, 5, 4, 3, critical
    const [filterStatus, setFilterStatus] = useState('all'); // all, needs_reply, replied

    useEffect(() => {
        const load = async () => {
            try {
                const data = await reviewService.fetchReviews('host-123');
                setReviews(data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        load();

        const unsubscribe = reviewService.subscribeToReviews((data) => {
            // Need to filter for just this host since the service gives all
            setReviews(data.filter(r => r.host_id === 'host-123').sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        });

        return () => unsubscribe();
    }, []);

    const handleReplySubmit = async (reviewId, text) => {
        await reviewService.submitHostReply(reviewId, text);
    };

    // Derived Analytics
    const analytics = useMemo(() => {
        if (!reviews.length) return null;
        
        const total = reviews.length;
        const avgOverall = reviews.reduce((sum, r) => sum + r.rating_overall, 0) / total;
        const avgClean = reviews.reduce((sum, r) => sum + r.rating_cleanliness, 0) / total;
        const avgHosp = reviews.reduce((sum, r) => sum + r.rating_hospitality, 0) / total;
        const avgLoc = reviews.reduce((sum, r) => sum + r.rating_location, 0) / total;
        const avgEco = reviews.reduce((sum, r) => sum + r.rating_eco, 0) / total;
        const avgVal = reviews.reduce((sum, r) => sum + r.rating_value, 0) / total;

        const posCount = reviews.filter(r => r.sentiment === 'positive').length;
        const neuCount = reviews.filter(r => r.sentiment === 'neutral').length;
        const negCount = reviews.filter(r => r.sentiment === 'negative').length;

        return {
            total,
            avgOverall,
            categories: [
                { label: 'Cleanliness', value: avgClean },
                { label: 'Hospitality', value: avgHosp },
                { label: 'Location', value: avgLoc },
                { label: 'Eco-Friendly', value: avgEco },
                { label: 'Value', value: avgVal },
            ],
            sentiment: {
                positive: (posCount / total) * 100,
                neutral: (neuCount / total) * 100,
                negative: (negCount / total) * 100
            }
        };
    }, [reviews]);

    // Filtering logic
    const filteredReviews = useMemo(() => {
        return reviews.filter(r => {
            // Search
            if (searchQuery && !r.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) && !r.review_text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            
            // Stars
            if (filterStar === '5' && Math.round(r.rating_overall) !== 5) return false;
            if (filterStar === '4' && Math.round(r.rating_overall) !== 4) return false;
            if (filterStar === '3' && Math.round(r.rating_overall) !== 3) return false;
            if (filterStar === 'critical' && Math.round(r.rating_overall) > 2) return false;
            
            // Status
            if (filterStatus === 'needs_reply' && r.host_reply !== null) return false;
            if (filterStatus === 'replied' && r.host_reply === null) return false;

            return true;
        });
    }, [reviews, searchQuery, filterStar, filterStatus]);


    return (
        <SellerLayout header="Guest Reviews">
            <Head title="Guest Reviews & Reputation" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold leading-7 text-[#1B4D3E] sm:text-3xl">Reputation Management</h2>
                    <p className="mt-1 text-sm text-slate-500">Monitor guest feedback, reply to reviews, and maintain your excellent standards.</p>
                </div>

                {/* Analytics Dashboard */}
                {analytics && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Overall Score */}
                        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Rating</h3>
                            <div className="text-6xl font-bold text-slate-900 mb-2">{analytics.avgOverall.toFixed(1)}</div>
                            <StarRating rating={analytics.avgOverall} size="w-6 h-6" />
                            <p className="mt-2 text-sm text-slate-500">Based on {analytics.total} verified reviews</p>
                        </div>

                        {/* Category Progress */}
                        <div className="col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0 md:pr-8">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Rating Breakdown</h3>
                            <div className="space-y-1">
                                {analytics.categories.map(cat => (
                                    <ProgressBar key={cat.label} label={cat.label} value={cat.value} />
                                ))}
                            </div>
                        </div>

                        {/* Sentiment & Highlights */}
                        <div className="col-span-1">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Guest Sentiment</h3>
                            <div className="flex h-3 rounded-full overflow-hidden mb-4">
                                <div style={{ width: `${analytics.sentiment.positive}%` }} className="bg-emerald-500"></div>
                                <div style={{ width: `${analytics.sentiment.neutral}%` }} className="bg-amber-400"></div>
                                <div style={{ width: `${analytics.sentiment.negative}%` }} className="bg-rose-500"></div>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-slate-600 mb-6">
                                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div> {analytics.sentiment.positive.toFixed(0)}% Positive</span>
                                <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber-400 mr-1"></div> {analytics.sentiment.neutral.toFixed(0)}% Neutral</span>
                            </div>

                            <h3 className="text-sm font-bold text-slate-800 mb-2">Top Highlights</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1B4D3E]/10 text-[#1B4D3E]">
                                    <ThumbsUp className="w-3 h-3 mr-1" /> Beautiful Views
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D97706]/10 text-[#D97706]">
                                    <ThumbsUp className="w-3 h-3 mr-1" /> Authentic Food
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] sm:text-sm"
                            placeholder="Search reviews by guest name or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex space-x-2">
                        <select 
                            className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-[#1B4D3E] focus:border-[#1B4D3E] sm:text-sm rounded-lg text-slate-900 bg-white"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="needs_reply">Needs Reply</option>
                            <option value="replied">Replied</option>
                        </select>
                        <select 
                            className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-[#1B4D3E] focus:border-[#1B4D3E] sm:text-sm rounded-lg text-slate-900 bg-white"
                            value={filterStar}
                            onChange={(e) => setFilterStar(e.target.value)}
                        >
                            <option value="all">All Stars</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="critical">Critical (1-2)</option>
                        </select>
                    </div>
                </div>

                {/* Review Feed */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="animate-pulse space-y-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-40"></div>
                            ))}
                        </div>
                    ) : filteredReviews.length > 0 ? (
                        filteredReviews.map(review => (
                            <ReviewCard 
                                key={review.id} 
                                review={review} 
                                onReplySubmit={handleReplySubmit} 
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <MessageSquare className="mx-auto h-12 w-12 text-slate-300" />
                            <h3 className="mt-2 text-sm font-medium text-slate-900">No reviews found</h3>
                            <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or search query.</p>
                        </div>
                    )}
                </div>

            </div>
        </SellerLayout>
    );
}
