export type BusinessCategory = 'accommodation' | 'ecommerce_crafts' | 'tours';
export type VerificationStatus = 'verified' | 'pending' | 'rejected';

export interface SellerProfile {
    id: string;
    user_id: string;
    business_name: string;
    category: BusinessCategory;
    owner_name: string;
    email: string;
    phone: string;
    whatsapp_number: string;
    bio: string;
    logo_url: string;
    banner_url: string;
    address: string;
    district: string;
    latitude: number | null;
    longitude: number | null;
    check_in_time: string;
    check_out_time: string;
    cancellation_policy: 'Flexible' | 'Moderate' | 'Strict';
    verification_status: VerificationStatus;
    notifications: {
        whatsapp_alerts: boolean;
        email_invoices: boolean;
        sms_alerts: boolean;
    };
    created_at: string;
    updated_at: string;
}

export interface SellerPayoutSettings {
    seller_id: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    branch_name: string;
    lanka_qr_url: string | null;
    updated_at: string;
}

/*
Example SQL Schema for Supabase/PostgreSQL:

CREATE TYPE business_category AS ENUM ('accommodation', 'ecommerce_crafts', 'tours');
CREATE TYPE verification_status AS ENUM ('verified', 'pending', 'rejected');

CREATE TABLE seller_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  business_name VARCHAR(255) NOT NULL,
  category business_category NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  whatsapp_number VARCHAR(50),
  bio TEXT,
  logo_url TEXT,
  banner_url TEXT,
  address TEXT,
  district VARCHAR(100),
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  check_in_time TIME,
  check_out_time TIME,
  cancellation_policy VARCHAR(50),
  verification_status verification_status DEFAULT 'pending',
  notifications JSONB DEFAULT '{"whatsapp_alerts": true, "email_invoices": true, "sms_alerts": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE seller_payout_settings (
  seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE PRIMARY KEY,
  bank_name VARCHAR(255),
  account_name VARCHAR(255),
  account_number VARCHAR(100),
  branch_name VARCHAR(255),
  lanka_qr_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Enable RLS and setup policies for sellers to update their own profiles.
*/
