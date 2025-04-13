
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, CreditCard, Building, RefreshCw } from "lucide-react";

export default function Accounts() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading account information...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">
              Manage your financial accounts and payment methods
            </p>
          </div>
          <Button className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
        
        <Tabs defaultValue="bank" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
            <TabsTrigger value="cards">Credit Cards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bank" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Business Checking</CardTitle>
                    <CardDescription>First National Bank</CardDescription>
                  </div>
                  <Building className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$24,625.00</div>
                  <div className="text-sm text-muted-foreground mb-6">
                    Account ending in 4587
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      View Transactions
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Business Savings</CardTitle>
                    <CardDescription>First National Bank</CardDescription>
                  </div>
                  <Building className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$15,840.75</div>
                  <div className="text-sm text-muted-foreground mb-6">
                    Account ending in 8974
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      View Transactions
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Business Platinum</CardTitle>
                    <CardDescription>American Express</CardDescription>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$4,250.50</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Current balance
                  </div>
                  <div className="flex items-center justify-between text-sm mb-6">
                    <span>Credit limit: $10,000.00</span>
                    <span>Due: May 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      View Transactions
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Business Rewards</CardTitle>
                    <CardDescription>Chase</CardDescription>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$2,875.25</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Current balance
                  </div>
                  <div className="flex items-center justify-between text-sm mb-6">
                    <span>Credit limit: $8,000.00</span>
                    <span>Due: May 22, 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      View Transactions
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
