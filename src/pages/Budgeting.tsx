
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle, Edit, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock budget data
const budgetData = [
  {
    id: 1,
    category: "Office Expenses",
    budgeted: 1500,
    spent: 1258.75,
    remaining: 241.25,
    status: "on-track", // on-track, warning, exceeded
  },
  {
    id: 2,
    category: "Marketing",
    budgeted: 2000,
    spent: 1850.50,
    remaining: 149.50,
    status: "warning",
  },
  {
    id: 3,
    category: "Payroll",
    budgeted: 8000,
    spent: 8000,
    remaining: 0,
    status: "on-track",
  },
  {
    id: 4,
    category: "Software Subscriptions",
    budgeted: 600,
    spent: 649.99,
    remaining: -49.99,
    status: "exceeded",
  },
  {
    id: 5,
    category: "Travel",
    budgeted: 1200,
    spent: 750.25,
    remaining: 449.75,
    status: "on-track",
  },
  {
    id: 6,
    category: "Equipment",
    budgeted: 2500,
    spent: 1899.99,
    remaining: 600.01,
    status: "on-track",
  },
  {
    id: 7,
    category: "Rent",
    budgeted: 3500,
    spent: 3500,
    remaining: 0,
    status: "on-track",
  },
];

// Categories for the form
const categories = [
  "Office Expenses",
  "Marketing",
  "Payroll",
  "Software Subscriptions",
  "Travel",
  "Equipment",
  "Rent",
  "Utilities",
  "Training",
  "Legal & Professional",
  "Meals & Entertainment",
  "Insurance",
  "Other",
];

export default function Budgeting() {
  const [budgets, setBudgets] = useState(budgetData);
  const [selectedTab, setSelectedTab] = useState("current");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgeted: "",
  });
  
  const { toast } = useToast();

  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const percentSpent = (totalSpent / totalBudgeted) * 100;
  
  // Count statuses
  const statusCounts = budgets.reduce(
    (counts, budget) => {
      counts[budget.status]++;
      return counts;
    },
    { "on-track": 0, warning: 0, exceeded: 0 }
  );

  const handleAddBudget = () => {
    // Basic validation
    if (!newBudget.category || !newBudget.budgeted) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (budgets.some(budget => budget.category === newBudget.category)) {
      toast({
        title: "Error",
        description: "A budget for this category already exists.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new budget
    const amount = parseFloat(newBudget.budgeted);
    
    const newBudgetObj = {
      id: Math.max(...budgets.map(b => b.id)) + 1,
      category: newBudget.category,
      budgeted: amount,
      spent: 0,
      remaining: amount,
      status: "on-track" as "on-track" | "warning" | "exceeded",
    };
    
    setBudgets([...budgets, newBudgetObj]);
    
    // Reset form
    setNewBudget({
      category: "",
      budgeted: "",
    });
    
    setIsAddDialogOpen(false);
    
    toast({
      title: "Budget added",
      description: "The budget has been successfully added.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Budgeting</h1>
            <p className="text-muted-foreground">
              Manage and track your budget allocation
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogDescription>
                  Set up a monthly budget for a specific category.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budgetCategory" className="text-right">
                    Category*
                  </Label>
                  <Select 
                    value={newBudget.category}
                    onValueChange={(value) => setNewBudget({...newBudget, category: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budgetAmount" className="text-right">
                    Amount*
                  </Label>
                  <Input
                    id="budgetAmount"
                    type="number"
                    placeholder="1000.00"
                    className="col-span-3"
                    value={newBudget.budgeted}
                    onChange={(e) => setNewBudget({...newBudget, budgeted: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddBudget}>Add Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Budget</CardTitle>
              <CardDescription>Current month allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalBudgeted.toFixed(2)}</div>
              <div className="flex justify-between mt-4 text-sm">
                <span className="text-muted-foreground">Spent: ${totalSpent.toFixed(2)}</span>
                <span className="text-muted-foreground">Remaining: ${totalRemaining.toFixed(2)}</span>
              </div>
              <Progress value={percentSpent} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {percentSpent.toFixed(1)}% of total budget spent
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Budget Status</CardTitle>
              <CardDescription>Category spending status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex justify-center">
                    <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/20 p-2">
                      <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                  </div>
                  <div className="mt-2 font-medium text-lg">{statusCounts["on-track"]}</div>
                  <div className="text-xs text-muted-foreground">On Track</div>
                </div>
                <div>
                  <div className="flex justify-center">
                    <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-2">
                      <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                    </div>
                  </div>
                  <div className="mt-2 font-medium text-lg">{statusCounts.warning}</div>
                  <div className="text-xs text-muted-foreground">Attention</div>
                </div>
                <div>
                  <div className="flex justify-center">
                    <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-2">
                      <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
                    </div>
                  </div>
                  <div className="mt-2 font-medium text-lg">{statusCounts.exceeded}</div>
                  <div className="text-xs text-muted-foreground">Exceeded</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Suggestions</CardTitle>
              <CardDescription>Budget optimization tips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <p className="font-medium">➡️ Software Subscriptions</p>
                <p className="text-muted-foreground text-xs">
                  Your budget is over by $49.99. Consider consolidating redundant services.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">➡️ Marketing</p>
                <p className="text-muted-foreground text-xs">
                  Approaching budget limit (92.5% used). Prioritize highest ROI campaigns.
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">➡️ Equipment</p>
                <p className="text-muted-foreground text-xs">
                  Consider allocating some of the remaining $600.01 to categories under pressure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Budget Details */}
        <div>
          <Tabs defaultValue="current" onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="current">Current Month</TabsTrigger>
              <TabsTrigger value="history">Budget History</TabsTrigger>
              <TabsTrigger value="planning">Budget Planning</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Budget Categories</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your monthly budget categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {budgets.map((budget) => (
                      <div key={budget.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium">{budget.category}</span>
                            <Badge 
                              variant={
                                budget.status === "on-track" 
                                  ? "outline" 
                                  : budget.status === "warning" 
                                    ? "secondary" 
                                    : "destructive"
                              }
                              className="ml-2"
                            >
                              {budget.status === "on-track" 
                                ? "On Track" 
                                : budget.status === "warning" 
                                  ? "Attention" 
                                  : "Exceeded"
                              }
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${budget.remaining < 0 ? "text-destructive" : ""}`}>
                              ${budget.spent.toFixed(2)} / ${budget.budgeted.toFixed(2)}
                            </span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Progress 
                          value={(budget.spent / budget.budgeted) * 100} 
                          className={`h-2 ${
                            budget.status === "exceeded" 
                              ? "bg-destructive/20" 
                              : budget.status === "warning" 
                                ? "bg-amber-100 dark:bg-amber-900/20" 
                                : ""
                          }`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Spent: ${budget.spent.toFixed(2)}</span>
                          <span className={budget.remaining < 0 ? "text-destructive" : ""}>
                            Remaining: ${budget.remaining.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Budget History</CardTitle>
                  <CardDescription>
                    View and compare your budget across previous months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Historical budget data will be displayed here. You can track how your spending patterns have evolved over time and identify trends.
                  </p>
                  <div className="flex justify-center items-center h-40">
                    <p className="text-muted-foreground">Historical budget data will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="planning">
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Budget Planning</CardTitle>
                  <CardDescription>
                    Plan and forecast your future budgets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Use this space to plan your future budgets. You can create and adjust budgets for upcoming months based on your business forecasts and goals.
                  </p>
                  <div className="flex justify-center items-center h-40">
                    <p className="text-muted-foreground">Budget planning tools will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
