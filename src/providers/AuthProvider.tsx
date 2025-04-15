
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      setLoading(true);
      // Changed to use email confirmation disabled for testing
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata,
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      // If user was created successfully and auto-confirmed
      if (data?.user && !data.user.email_confirmed_at) {
        toast({
          title: "Account created!",
          description: "You have successfully registered. Please check your email for verification.",
        });
      } else {
        // Create company after registration (for auto-confirmed users)
        if (data?.user) {
          try {
            // Create the company
            const { error: companyError, data: companyData } = await supabase
              .from('companies')
              .insert([{ name: metadata.company_name }])
              .select();
            
            if (companyError) throw companyError;

            // If company was created successfully, update user with company_id
            if (companyData && companyData.length > 0) {
              const company_id = companyData[0].id;
              const { error: updateError } = await supabase
                .from('users')
                .insert([{
                  id: data.user.id,
                  email: email,
                  role: metadata.role,
                  company_id: company_id
                }]);

              if (updateError) throw updateError;
            }

            toast({
              title: "Success!",
              description: "You have successfully registered and logged in.",
            });
            
            navigate('/dashboard');
          } catch (companyError: any) {
            console.error("Company creation error:", companyError);
            toast({
              title: "Error creating company",
              description: companyError.message || "An error occurred while setting up your account",
              variant: "destructive",
            });
          }
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Error creating account",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
