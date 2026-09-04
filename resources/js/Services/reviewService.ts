import { Review, HostReply } from '../types/reviews';

const REVIEWS_KEY = 'secret_places_mock_reviews';

const getInitialReviews = (): Review[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(REVIEWS_KEY);
        if (stored) return JSON.parse(stored);
    }
    const today = new Date();
    return [
        {
            id: 'REV-001',
            host_id: 'host-123',
            property_id: 'PROP-1',
            reservation_id: 'RES-001',
            guest_name: 'David & Sarah',
            guest_country: 'GB',
            rating_overall: 5,
            rating_cleanliness: 5,
            rating_hospitality: 5,
            rating_location: 5,
            rating_eco: 4,
            rating_value: 5,
            review_text: 'Absolutely breathtaking experience! The eco-cabin was nestled right in the jungle. Waking up to the sound of exotic birds and having authentic Sri Lankan tea on the balcony was a dream. The host was incredibly welcoming and arranged a fantastic guided hike.',
            sentiment: 'positive',
            is_verified_booking: true,
            created_at: new Date(today.getTime() - 86400000 * 2).toISOString(),
            host_reply: null
        },
        {
            id: 'REV-002',
            host_id: 'host-123',
            property_id: 'PROP-1',
            reservation_id: 'RES-002',
            guest_name: 'Markus Müller',
            guest_country: 'DE',
            rating_overall: 4,
            rating_cleanliness: 4,
            rating_hospitality: 5,
            rating_location: 4,
            rating_eco: 5,
            rating_value: 4,
            review_text: 'Very unique stay with a strong focus on sustainability. The solar hot water was a nice touch. The only minor issue was the wifi was a bit spotty during the rainstorm, but honestly, it was nice to disconnect. The rice and curry dinner was exceptional!',
            sentiment: 'positive',
            is_verified_booking: true,
            created_at: new Date(today.getTime() - 86400000 * 5).toISOString(),
            host_reply: {
                id: 'REP-001',
                review_id: 'REV-002',
                host_id: 'host-123',
                reply_text: 'Hi Markus, thank you for your wonderful review! We are so glad you enjoyed the authentic rice and curry and appreciated our eco-friendly initiatives. We apologize for the wifi drop during the storm; being in the deep jungle sometimes affects the satellite connection. We hope to welcome you back to disconnect again soon!',
                created_at: new Date(today.getTime() - 86400000 * 4).toISOString(),
            }
        },
        {
            id: 'REV-003',
            host_id: 'host-123',
            property_id: 'PROP-2',
            reservation_id: 'RES-003',
            guest_name: 'Amelia T.',
            guest_country: 'AU',
            rating_overall: 3,
            rating_cleanliness: 3,
            rating_hospitality: 4,
            rating_location: 5,
            rating_eco: 3,
            rating_value: 3,
            review_text: 'The view is unparalleled. You can see the Ella gap perfectly from the bed. However, we found a few insects in the bathroom (though I guess it\'s expected in a jungle cabin). It would be great if mosquito nets were a bit thicker.',
            sentiment: 'neutral',
            is_verified_booking: true,
            created_at: new Date(today.getTime() - 86400000 * 12).toISOString(),
            host_reply: null
        },
        {
            id: 'REV-004',
            host_id: 'host-123',
            property_id: 'PROP-1',
            reservation_id: 'RES-004',
            guest_name: 'Lucas G.',
            guest_country: 'FR',
            rating_overall: 5,
            rating_cleanliness: 5,
            rating_hospitality: 5,
            rating_location: 5,
            rating_eco: 5,
            rating_value: 5,
            review_text: 'The absolute highlight of our 2-week trip in Sri Lanka. Warmest hospitality we have ever experienced.',
            sentiment: 'positive',
            is_verified_booking: true,
            created_at: new Date(today.getTime() - 86400000 * 15).toISOString(),
            host_reply: null
        }
    ];
};

let reviews = getInitialReviews();

const saveToStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    }
};

type Subscriber = (r: Review[]) => void;
let listeners: Subscriber[] = [];

const notify = () => {
    saveToStorage();
    listeners.forEach(l => l([...reviews]));
};

export const reviewService = {
    async fetchReviews(hostId: string) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        return reviews.filter(r => r.host_id === hostId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    async submitHostReply(reviewId: string, replyText: string): Promise<Review> {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let updatedReview: Review | null = null;
        reviews = reviews.map(r => {
            if (r.id === reviewId) {
                updatedReview = {
                    ...r,
                    host_reply: {
                        id: `REP-${Math.floor(Math.random() * 9000) + 1000}`,
                        review_id: r.id,
                        host_id: r.host_id,
                        reply_text: replyText,
                        created_at: new Date().toISOString()
                    }
                };
                return updatedReview;
            }
            return r;
        });

        notify();
        if (!updatedReview) throw new Error("Review not found");
        return updatedReview;
    },

    suggestAiResponse(review: Review): string {
        // Simple heuristic for the simulated AI response
        const firstName = review.guest_name.split(' ')[0] || 'Guest';
        
        if (review.rating_overall >= 4) {
            return `Dear ${firstName},\n\nThank you so much for your wonderful ${review.rating_overall}-star review! We are absolutely thrilled to hear that you enjoyed your stay with us and appreciated the [aspect]. Your kind words mean the world to our team.\n\nIt was a pleasure hosting you, and we sincerely hope to welcome you back to our little slice of paradise in Sri Lanka soon!\n\nWarm regards,\nThe Secret Place Team`;
        } else if (review.rating_overall === 3) {
            return `Dear ${firstName},\n\nThank you for taking the time to share your feedback. We appreciate your balanced review. While we are glad you enjoyed the location, we have taken note of your comments regarding [issue]. We are actively working to improve this aspect to ensure a more comfortable experience for our future guests.\n\nWe hope to have the opportunity to host you again and exceed your expectations.\n\nBest regards,\nThe Secret Place Team`;
        } else {
            return `Dear ${firstName},\n\nWe are genuinely sorry to hear that your stay did not meet your expectations, and we apologize for the inconveniences you faced. We take your feedback regarding [issue] very seriously. We would love the opportunity to discuss this further with you and make things right. Please reach out to us directly.\n\nSincerely,\nThe Secret Place Team`;
        }
    },

    subscribeToReviews(callback: Subscriber): () => void {
        listeners.push(callback);
        // Initial call
        callback([...reviews]);

        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    }
};
