export type PaymentMethod = 'lanka_qr' | 'card' | 'cash';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'partial';
export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';

export interface Reservation {
    id: string;
    host_id: string;
    property_id: string;
    property_name: string; // denormalized for easier display
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    guest_country: string; // ISO code or full name
    check_in_date: string; // YYYY-MM-DD
    check_out_date: string; // YYYY-MM-DD
    guests_count: number;
    special_requests?: string;
    total_price_lkr: number;
    total_price_usd: number;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    booking_status: BookingStatus;
    created_at: string;
    updated_at: string;
}

export interface ReservationUpdateInput {
    id: string;
    booking_status?: BookingStatus;
    payment_status?: PaymentStatus;
}

/*
Example SQL Schema for Supabase/PostgreSQL:

CREATE TYPE payment_method AS ENUM ('lanka_qr', 'card', 'cash');
CREATE TYPE payment_status AS ENUM ('paid', 'pending', 'failed', 'partial');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'checked_in', 'completed', 'cancelled');

CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  property_name VARCHAR(255) NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  guest_country VARCHAR(100),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  special_requests TEXT,
  total_price_lkr NUMERIC(10, 2) NOT NULL,
  total_price_usd NUMERIC(10, 2) NOT NULL,
  payment_method payment_method NOT NULL DEFAULT 'cash',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  booking_status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Hosts can view their own reservations" ON reservations FOR SELECT USING (auth.uid() = host_id);
CREATE POLICY "Hosts can update their own reservations" ON reservations FOR UPDATE USING (auth.uid() = host_id);
*/
