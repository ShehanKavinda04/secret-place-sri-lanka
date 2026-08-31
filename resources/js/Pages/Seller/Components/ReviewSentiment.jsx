import React from 'react';
import { Star, Smile, Meh, Frown, MessageCircle, ThumbsUp, Send } from 'lucide-react';

export default function ReviewSentiment() {
    const categories = [
        { name: 'Cleanliness', score: 4.9 },
        { name: 'Location', score: 4.8 },
        { name: 'Service', score: 4.9 },
        { name: 'Value for Money', score: 4.7 },
    ];

    const reviews = [
        {
            id: 1,
            guest: 'Sophie Müller',
            date: 'Oct 22, 2026',
            room: 'Ella Eco Cabin',
            rating: 5,
            sentiment: 'Positive',
            text: 'Absolutely magical stay! The eco cabin was pristine and the views of Ella rock were breathtaking. We loved the guided trek.',
            reply: 'Thank you so much Sophie! We are thrilled you enjoyed the eco cabin and the trek. Hope to see you again soon!'
        },
        {
            id: 2,
            guest: 'James Carter',
            date: 'Oct 18, 2026',
            room: 'Knuckles Tent Camp',
            rating: 4,
            sentiment: 'Neutral',
            text: 'Great location and very peaceful. The only issue was the Wi-Fi was quite spotty during the evening.',
            reply: ''
        },
        {
            id: 3,
            guest: 'Amelia Rossi',
            date: 'Oct 10, 2026',
            room: 'Ella Eco Cabin',
            rating: 5,
            sentiment: 'Positive',
            text: 'The best homestay in Sri Lanka! The hosts were incredibly warm, the food was authentic, and they even packed us breakfast for our train ride.',
            reply: 'Amelia, it was our absolute pleasure hosting you! Safe travels on your train journey.'
        }
    ];

    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return <Smile className="w-5 h-5 text-emerald-500" />;
            case 'Neutral': return <Meh className="w-5 h-5 text-orange-500" />;
            case 'Negative': return <Frown className="w-5 h-5 text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 font-sansDisplay">Guest Experience & Reviews</h2>
                    <p className="text-sm text-gray-500">Monitor guest sentiment and respond to recent reviews.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scorecard */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1B4D3E] p-6 rounded-2xl shadow-sm text-white flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full"></div>
                        <h3 className="text-lg font-bold mb-2 z-10 font-sansDisplay">Overall Rating</h3>
                        <div className="text-6xl font-black text-[#D97706] mb-2 z-10">4.8</div>
                        <div className="flex text-[#D97706] mb-2 z-10">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
                        </div>
                        <p className="text-sm text-emerald-100 z-10">Based on 124 reviews</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Category Breakdown</h3>
                        <div className="space-y-4">
                            {categories.map(cat => (
                                <div key={cat.name}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 font-medium">{cat.name}</span>
                                        <span className="font-bold text-gray-900">{cat.score}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-[#1B4D3E] h-2 rounded-full" 
                                            style={{ width: `${(cat.score / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl shadow-sm">
                        <h3 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
                            <ThumbsUp className="w-5 h-5 text-[#D97706]" /> AI Insight
                        </h3>
                        <p className="text-sm text-orange-800">
                            Guests frequently praise your "authentic food" and "views". 
                            Consider mentioning these highlights in your listing description!
                        </p>
                    </div>
                </div>

                {/* Review Stream */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-900 font-sansDisplay">Review Stream</h3>
                        <div className="flex gap-2">
                            <select className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-1.5 focus:ring-[#1B4D3E] focus:border-[#1B4D3E]">
                                <option>All Sentiments</option>
                                <option>Positive</option>
                                <option>Neutral</option>
                                <option>Negative</option>
                            </select>
                            <select className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-1.5 focus:ring-[#1B4D3E] focus:border-[#1B4D3E]">
                                <option>Needs Reply</option>
                                <option>Replied</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {reviews.map(review => (
                            <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#1B4D3E]">
                                            {review.guest.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{review.guest}</h4>
                                            <p className="text-xs text-gray-500">{review.date} • {review.room}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="flex text-[#D97706]">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                                            {getSentimentIcon(review.sentiment)}
                                            <span className="text-[10px] font-bold text-gray-600 uppercase">{review.sentiment}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-700 italic mb-4">"{review.text}"</p>
                                
                                {review.reply ? (
                                    <div className="ml-8 bg-gray-50 rounded-xl p-4 border-l-4 border-[#1B4D3E]">
                                        <p className="text-xs font-bold text-[#1B4D3E] mb-1">Your Response</p>
                                        <p className="text-sm text-gray-600">{review.reply}</p>
                                    </div>
                                ) : (
                                    <div className="ml-8 mt-2 relative">
                                        <textarea 
                                            rows="2" 
                                            placeholder="Write a response..."
                                            className="w-full text-sm rounded-xl border-gray-200 focus:ring-[#1B4D3E] focus:border-[#1B4D3E] resize-none pr-12"
                                        ></textarea>
                                        <button className="absolute bottom-3 right-3 p-1.5 bg-[#D97706] text-white rounded-lg hover:bg-[#b56305] transition-colors">
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
