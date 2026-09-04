export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface HostReply {
    id: string;
    review_id: string;
    host_id: string;
    reply_text: string;
    created_at: string;
    updated_at?: string;
}

export interface Review {
    id: string;
    host_id: string;
    property_id: string;
    reservation_id: string;
    guest_name: string;
    guest_country: string; // ISO Code (e.g., 'GB', 'US', 'AU')
    rating_overall: number; // 1-5
    rating_cleanliness: number;
    rating_hospitality: number;
    rating_location: number;
    rating_eco: number;
    rating_value: number;
    review_text: string;
    guest_photos?: string[];
    sentiment: Sentiment;
    created_at: string;
    is_verified_booking: boolean;
    host_reply?: HostReply | null;
}

/*
Example SQL Schema for Supabase/PostgreSQL:

CREATE TYPE review_sentiment AS ENUM ('positive', 'neutral', 'negative');

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id),
  reservation_id UUID NOT NULL REFERENCES reservations(id),
  guest_name VARCHAR(255) NOT NULL,
  guest_country VARCHAR(2) NOT NULL,
  rating_overall NUMERIC(2, 1) NOT NULL,
  rating_cleanliness NUMERIC(2, 1) NOT NULL,
  rating_hospitality NUMERIC(2, 1) NOT NULL,
  rating_location NUMERIC(2, 1) NOT NULL,
  rating_eco NUMERIC(2, 1) NOT NULL,
  rating_value NUMERIC(2, 1) NOT NULL,
  review_text TEXT NOT NULL,
  guest_photos JSONB, -- Array of URLs
  sentiment review_sentiment NOT NULL,
  is_verified_booking BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE review_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE UNIQUE,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reply_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
-- Select policies allowing public to read reviews and replies
-- Insert/Update policies on review_replies allowing host_id = auth.uid()
*/
