
import { createClient } from '@supabase/supabase-js';

// Get environment variables from Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Make sure to connect Supabase integration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on our schema
export type User = {
  id: string;
  email: string;
  role: 'owner' | 'accountant';
  company_id: string;
  created_at: string;
};

export type Company = {
  id: string;
  name: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  company_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description: string;
  created_at: string;
};

export type Budget = {
  id: string;
  company_id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  start_date: string;
  end_date: string;
};
