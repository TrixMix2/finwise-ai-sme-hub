
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - Hero */}
      <div className="flex-1 bg-primary p-8 md:p-12 flex flex-col justify-center text-white">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            FinWise AI
            <span className="block text-lg md:text-xl font-normal mt-2">
              Smart Financial Management for SMEs
            </span>
          </h1>
          
          <p className="text-lg mb-8 opacity-90">
            Simplify your business finances with our AI-powered platform. Track expenses, manage budgets, ensure tax compliance, and get actionable insights in real-time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Financial Tracking</h3>
                <p className="text-sm opacity-80">Monitor income and expenses in real time</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">AI Insights</h3>
                <p className="text-sm opacity-80">Get intelligent suggestions to optimize finances</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Tax Compliance</h3>
                <p className="text-sm opacity-80">Stay compliant with automated tax calculations</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">AI Assistant</h3>
                <p className="text-sm opacity-80">24/7 chat support for your financial questions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
            <p className="text-sm italic">
              "FinWise AI has transformed how we manage our business finances. The AI insights helped us cut unnecessary expenses by 15% while maintaining growth."
            </p>
            <p className="text-sm font-medium mt-2">— Sarah Johnson, Founder at GrowthTech</p>
          </div>
        </div>
      </div>
      
      {/* Right section - Auth form */}
      <div className="flex-1 bg-background p-8 md:p-12 flex items-center justify-center">
        <AuthForm />
      </div>
    </div>
  );
};

export default Index;
