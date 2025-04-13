
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Download, Calendar } from "lucide-react";

export default function TaxCompliance() {
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
            <p className="text-muted-foreground">Loading tax information...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tax Compliance</h1>
          <p className="text-muted-foreground">
            Manage your tax obligations and stay compliant
          </p>
        </div>
        
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="current">Current Quarter</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">Tax History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Tax Estimate</CardTitle>
                  <CardDescription>Q2 2025 (Apr - Jun)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$3,250.00</div>
                  <div className="text-sm text-muted-foreground mb-6">
                    Based on current income and applicable tax rates
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <div className="text-sm font-medium">Due Date</div>
                      <div className="text-sm text-muted-foreground">June 15, 2025</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Deductible Expenses</CardTitle>
                  <CardDescription>Items that may reduce your tax liability</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between py-2 border-b">
                      <span>Office supplies</span>
                      <span className="font-medium">$850.25</span>
                    </li>
                    <li className="flex items-center justify-between py-2 border-b">
                      <span>Software subscriptions</span>
                      <span className="font-medium">$1,200.00</span>
                    </li>
                    <li className="flex items-center justify-between py-2 border-b">
                      <span>Professional development</span>
                      <span className="font-medium">$750.00</span>
                    </li>
                    <li className="flex items-center justify-between py-2 border-b">
                      <span>Travel expenses</span>
                      <span className="font-medium">$1,100.50</span>
                    </li>
                    <li className="flex items-center justify-between py-2">
                      <span className="font-medium">Total Deductibles</span>
                      <span className="font-bold">$3,900.75</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tax Reports</CardTitle>
                <CardDescription>Download tax reports for the current quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>GST/VAT Report</span>
                    <FileDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>Income Summary</span>
                    <FileDown className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="flex items-center justify-between">
                    <span>Deductions Report</span>
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tax Deadlines</CardTitle>
                <CardDescription>Plan ahead for your tax obligations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Q2 Tax Payment</div>
                      <div className="text-sm text-muted-foreground">Quarterly estimated payment</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">June 15, 2025</div>
                      <div className="text-sm text-muted-foreground">Est. $3,250.00</div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Annual GST/VAT Return</div>
                      <div className="text-sm text-muted-foreground">Annual tax summary</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">July 31, 2025</div>
                      <div className="text-sm text-muted-foreground">Required filing</div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium">Q3 Tax Payment</div>
                      <div className="text-sm text-muted-foreground">Quarterly estimated payment</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">September 15, 2025</div>
                      <div className="text-sm text-muted-foreground">Est. $3,800.00</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Payment History</CardTitle>
                <CardDescription>Record of your past tax payments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Q1 2025 Tax Payment</div>
                      <div className="text-sm text-muted-foreground">Paid on March 12, 2025</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2,950.00</div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b">
                    <div>
                      <div className="font-medium">Q4 2024 Tax Payment</div>
                      <div className="text-sm text-muted-foreground">Paid on December 28, 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2,775.00</div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium">Q3 2024 Tax Payment</div>
                      <div className="text-sm text-muted-foreground">Paid on September 10, 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2,650.00</div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
