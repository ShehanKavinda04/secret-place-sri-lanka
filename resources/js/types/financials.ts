export type TransactionStatus = 'pending' | 'cleared' | 'withdrawn';
export type PaymentMethod = 'lanka_qr' | 'card' | 'cash';
export type Currency = 'LKR' | 'USD';

export interface Transaction {
    id: string;
    host_id: string;
    reservation_id: string;
    guest_name: string;
    gross_amount: number; // Stored in base LKR for simplicity, converted on fly
    platform_commission: number; // e.g. 10%
    gateway_fee: number; // e.g. 2.5%
    net_amount: number;
    payment_method: PaymentMethod;
    status: TransactionStatus;
    created_at: string;
}

export type ExpenseCategory = 'Utilities' | 'Maintenance' | 'Food & Beverage' | 'Staff' | 'Marketing' | 'Other';

export interface Expense {
    id: string;
    host_id: string;
    title: string;
    category: ExpenseCategory;
    amount: number; // Stored in base LKR
    receipt_url?: string;
    expense_date: string;
    created_at: string;
}

export type PayoutStatus = 'requested' | 'processing' | 'completed' | 'rejected';

export interface PayoutRequest {
    id: string;
    host_id: string;
    amount: number; // LKR
    bank_details_json: {
        bank_name: string;
        account_name: string;
        account_number: string;
        branch: string;
    };
    status: PayoutStatus;
    reference_no?: string;
    created_at: string;
}

/*
Example SQL Schema for Supabase/PostgreSQL:

CREATE TYPE transaction_status AS ENUM ('pending', 'cleared', 'withdrawn');
CREATE TYPE expense_category AS ENUM ('Utilities', 'Maintenance', 'Food & Beverage', 'Staff', 'Marketing', 'Other');
CREATE TYPE payout_status AS ENUM ('requested', 'processing', 'completed', 'rejected');

CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reservation_id UUID NOT NULL REFERENCES reservations(id),
  guest_name VARCHAR(255) NOT NULL,
  gross_amount NUMERIC(10, 2) NOT NULL,
  platform_commission NUMERIC(10, 2) NOT NULL,
  gateway_fee NUMERIC(10, 2) NOT NULL,
  net_amount NUMERIC(10, 2) NOT NULL,
  payment_method payment_method NOT NULL,
  status transaction_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category expense_category NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  receipt_url TEXT,
  expense_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE payout_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  bank_details_json JSONB NOT NULL,
  status payout_status NOT NULL DEFAULT 'requested',
  reference_no VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and create policies limiting select/insert/update to host_id = auth.uid()
*/
