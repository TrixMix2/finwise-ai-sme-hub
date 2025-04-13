
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import IncomeExpensesChart from "@/components/dashboard/IncomeExpensesChart";
import BudgetProgressChart from "@/components/dashboard/BudgetProgressChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import CashFlowForecast from "@/components/dashboard/CashFlowForecast";
import { Activity, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading financial data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your business finances and key metrics
          </p>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Current Balance"
            value="$24,625.00"
            trend="up"
            trendValue="8.2% from last month"
            icon={DollarSign}
          />
          <StatCard
            title="Monthly Revenue"
            value="$18,225.50"
            trend="up"
            trendValue="4.3% from last month"
            icon={TrendingUp}
          />
          <StatCard
            title="Monthly Expenses"
            value="$12,450.25"
            trend="down"
            trendValue="2.1% from last month"
            icon={Activity}
          />
          <StatCard
            title="Tax Estimate (Q2)"
            value="$3,250.00"
            description="Due June 15, 2025"
            icon={AlertTriangle}
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpensesChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetProgressChart />
          <CashFlowForecast />
        </div>
        
        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
}
