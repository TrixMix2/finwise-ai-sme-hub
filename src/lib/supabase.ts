
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

// Database API functions

// User functions
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as User;
};

// Company functions
export const getCompany = async (companyId: string) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single();
  
  if (error) throw error;
  return data as Company;
};

// Transaction functions
export const getTransactions = async (companyId: string, options: { 
  limit?: number, 
  type?: 'income' | 'expense',
  category?: string,
  startDate?: string,
  endDate?: string
} = {}) => {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('company_id', companyId)
    .order('date', { ascending: false });
  
  if (options.type) {
    query = query.eq('type', options.type);
  }
  
  if (options.category) {
    query = query.eq('category', options.category);
  }
  
  if (options.startDate) {
    query = query.gte('date', options.startDate);
  }
  
  if (options.endDate) {
    query = query.lte('date', options.endDate);
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as Transaction[];
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction])
    .select();
  
  if (error) throw error;
  return data[0] as Transaction;
};

export const updateTransaction = async (id: string, updates: Partial<Omit<Transaction, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0] as Transaction;
};

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Budget functions
export const getBudgets = async (companyId: string) => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('company_id', companyId);
  
  if (error) throw error;
  return data as Budget[];
};

export const createBudget = async (budget: Omit<Budget, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert([budget])
    .select();
  
  if (error) throw error;
  return data[0] as Budget;
};

// Document analysis functions
export const getDocumentAnalyses = async (userId: string) => {
  const { data, error } = await supabase
    .from('document_analyses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as DocumentAnalysis[];
};

// Analytics functions
export const getIncomeVsExpensesByMonth = async (companyId: string, year: number) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('company_id', companyId)
    .gte('date', startDate)
    .lte('date', endDate);
  
  if (error) throw error;
  
  const transactions = data as Transaction[];
  const monthlyData: {
    month: string;
    income: number;
    expenses: number;
  }[] = [];
  
  // Process data into monthly aggregates
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < 12; i++) {
    const monthTransactions = transactions.filter(t => {
      const transactionMonth = new Date(t.date).getMonth();
      return transactionMonth === i;
    });
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    monthlyData.push({
      month: months[i],
      income,
      expenses
    });
  }
  
  return monthlyData;
};

export const getTopExpenseCategories = async (companyId: string, period: 'month' | 'quarter' | 'year' = 'month') => {
  let startDate: string;
  const now = new Date();
  
  // Calculate start date based on period
  if (period === 'month') {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  } else if (period === 'quarter') {
    const quarter = Math.floor(now.getMonth() / 3);
    startDate = new Date(now.getFullYear(), quarter * 3, 1).toISOString().split('T')[0];
  } else {
    startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
  }
  
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('company_id', companyId)
    .eq('type', 'expense')
    .gte('date', startDate);
  
  if (error) throw error;
  
  const transactions = data as Transaction[];
  
  // Group by category and sum
  const categoryMap: Record<string, number> = {};
  transactions.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  
  // Convert to array and sort
  const categories = Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount
  }));
  
  return categories.sort((a, b) => b.amount - a.amount).slice(0, 5);
};
