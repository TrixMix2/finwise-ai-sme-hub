import { createClient } from '@supabase/supabase-js';

// Specific Supabase project details
const supabaseUrl = 'https://lpktxlkbkeiklwjtuylb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwa3R4bGtia2Vpa2x3anR1eWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTA3NjEsImV4cCI6MjA2MDE4Njc2MX0.KBmr1rMsIJPxmSkqa0MOLTMYT_NxzKxKEThw4EW5b3k';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log connection status
console.log('Supabase client initialized successfully!');

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
