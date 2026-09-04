export type PropertyStatus = 'active' | 'draft' | 'under_review' | 'inactive';

export interface Property {
    id: string;
    host_id: string;
    title: string;
    slug: string;
    description: string;
    property_type: 'Homestay' | 'Cabin' | 'Villa' | 'Boutique Hotel' | 'Eco Lodge';
    base_price_lkr: number;
    base_price_usd: number;
    latitude: number;
    longitude: number;
    district: string;
    amenities: string[];
    eco_features: string[];
    images: string[];
    cover_image?: string;
    status: PropertyStatus;
    created_at: string;
    updated_at: string;
}

export interface PropertyCreateInput extends Omit<Property, 'id' | 'host_id' | 'slug' | 'created_at' | 'updated_at'> {}

export interface PropertyUpdateInput extends Partial<PropertyCreateInput> {
    id: string;
}

/*
Example SQL Schema for Supabase/PostgreSQL:

CREATE TYPE property_status AS ENUM ('active', 'draft', 'under_review', 'inactive');
CREATE TYPE property_type AS ENUM ('Homestay', 'Cabin', 'Villa', 'Boutique Hotel', 'Eco Lodge');

CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  property_type property_type NOT NULL,
  base_price_lkr NUMERIC(10, 2) NOT NULL,
  base_price_usd NUMERIC(10, 2) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  district VARCHAR(100),
  amenities TEXT[] DEFAULT '{}',
  eco_features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status property_status DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Hosts can view their own properties" ON properties FOR SELECT USING (auth.uid() = host_id);
CREATE POLICY "Hosts can insert their own properties" ON properties FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can update their own properties" ON properties FOR UPDATE USING (auth.uid() = host_id);
*/
