
import { createClient } from '@supabase/supabase-js';

// Default values for development - IMPORTANT: Replace these with your actual Supabase project details
// when connecting to the Supabase integration
const DEFAULT_SUPABASE_URL = 'https://your-project-id.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'your-anon-key';

// Get environment variables from Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log connection status
console.log('Supabase client initialized with URL:', supabaseUrl === DEFAULT_SUPABASE_URL ? 'DEFAULT (not connected to integration)' : 'INTEGRATION');

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

export type DocumentAnalysis = {
  id: string;
  user_id: string;
  document_type: string;
  entities: { name: string; value: string }[];
  summary: string;
  document_text: string;
  created_at: string;
};
