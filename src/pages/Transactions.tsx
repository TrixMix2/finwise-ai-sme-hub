
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Edit, 
  Trash, 
  MoreHorizontal,
  ArrowUpDown
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

// Mock transaction data
const transactionData = [
  { 
    id: 1, 
    date: "2025-04-10", 
    description: "Office Supplies", 
    category: "Office Expenses",
    paymentMethod: "Credit Card",
    amount: -129.99,
    status: "completed",
    notes: "Purchased printer ink and paper" 
  },
  { 
    id: 2, 
    date: "2025-04-09", 
    description: "Client Payment - ABC Corp", 
    category: "Sales",
    paymentMethod: "Bank Transfer",
    amount: 1500.00,
    status: "completed",
    notes: "Invoice #1234" 
  },
  { 
    id: 3, 
    date: "2025-04-08", 
    description: "Software Subscription", 
    category: "Software",
    paymentMethod: "Credit Card",
    amount: -49.99,
    status: "completed",
    notes: "Monthly subscription for accounting software" 
  },
  { 
    id: 4, 
    date: "2025-04-07", 
    description: "Utility Bill", 
    category: "Utilities",
    paymentMethod: "Direct Debit",
    amount: -175.50,
    status: "pending",
    notes: "Electricity and water" 
  },
  { 
    id: 5, 
    date: "2025-04-05", 
    description: "Client Payment - XYZ Inc", 
    category: "Sales",
    paymentMethod: "Bank Transfer",
    amount: 2250.00,
    status: "completed",
    notes: "Invoice #1235" 
  },
  { 
    id: 6, 
    date: "2025-04-04", 
    description: "Marketing Campaign", 
    category: "Marketing",
    paymentMethod: "Credit Card",
    amount: -350.00,
    status: "completed",
    notes: "Facebook ads for product launch" 
  },
  { 
    id: 7, 
    date: "2025-04-03", 
    description: "Office Rent", 
    category: "Rent",
    paymentMethod: "Bank Transfer",
    amount: -1200.00,
    status: "completed",
    notes: "Monthly office rent" 
  },
  { 
    id: 8, 
    date: "2025-04-02", 
    description: "Equipment Purchase", 
    category: "Equipment",
    paymentMethod: "Credit Card",
    amount: -899.99,
    status: "completed",
    notes: "New laptop for designer" 
  },
  { 
    id: 9, 
    date: "2025-04-01", 
    description: "Client Payment - Acme Ltd", 
    category: "Sales",
    paymentMethod: "PayPal",
    amount: 750.00,
    status: "completed",
    notes: "Invoice #1236" 
  },
  { 
    id: 10, 
    date: "2025-03-31", 
    description: "Employee Salary", 
    category: "Payroll",
    paymentMethod: "Bank Transfer",
    amount: -3500.00,
    status: "completed",
    notes: "Monthly salary for John Doe" 
  },
];

// Categories for filtering and forms
const categories = [
  "All Categories",
  "Office Expenses",
  "Sales",
  "Software",
  "Utilities",
  "Marketing",
  "Rent",
  "Equipment",
  "Payroll",
  "Travel",
  "Meals",
  "Other",
];

// Payment methods
const paymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "Cash",
  "PayPal",
  "Direct Debit",
  "Check",
  "Other",
];

export default function Transactions() {
  const [transactions, setTransactions] = useState(transactionData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    paymentMethod: "",
    notes: "",
  });
  
  const { toast } = useToast();

  // Handle searching
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.notes.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "All Categories" || transaction.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Handle sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc" 
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
    
    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc" 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    const aValue = a[sortConfig.key as keyof typeof a] as string;
    const bValue = b[sortConfig.key as keyof typeof b] as string;
    
    return sortConfig.direction === "asc" 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    
    setSortConfig({ key, direction });
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
    
    toast({
      title: "Transaction deleted",
      description: "The transaction has been successfully deleted.",
    });
  };

  const handleAddTransaction = () => {
    // Basic validation
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new transaction
    const amount = parseFloat(newTransaction.amount);
    
    const newTransactionObj = {
      id: Math.max(...transactions.map(t => t.id)) + 1,
      date: newTransaction.date,
      description: newTransaction.description,
      category: newTransaction.category,
      paymentMethod: newTransaction.paymentMethod,
      amount: amount,
      status: "completed" as const,
      notes: newTransaction.notes,
    };
    
    setTransactions([newTransactionObj, ...transactions]);
    
    // Reset form
    setNewTransaction({
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      paymentMethod: "",
      notes: "",
    });
    
    setIsAddDialogOpen(false);
    
    toast({
      title: "Transaction added",
      description: "The transaction has been successfully added.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              Manage and track all your financial transactions
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Enter the details of the new transaction below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description*
                  </Label>
                  <Input
                    id="description"
                    placeholder="e.g., Office Supplies"
                    className="col-span-3"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount*
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount (negative for expenses)"
                    className="col-span-3"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date*
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="col-span-3"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category*
                  </Label>
                  <Select 
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== "All Categories").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paymentMethod" className="text-right">
                    Payment Method
                  </Label>
                  <Select 
                    value={newTransaction.paymentMethod}
                    onValueChange={(value) => setNewTransaction({...newTransaction, paymentMethod: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    placeholder="Additional details"
                    className="col-span-3"
                    value={newTransaction.notes}
                    onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddTransaction}>Add Transaction</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Select 
              value={categoryFilter} 
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[110px] cursor-pointer" onClick={() => handleSort("date")}>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("description")}>
                  <div className="flex items-center">
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("paymentMethod")}>
                  <div className="flex items-center">
                    Payment Method
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort("amount")}>
                  <div className="flex items-center justify-end">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No transactions found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={transaction.description}>
                      {transaction.description}
                      {transaction.notes && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5" title={transaction.notes}>
                          {transaction.notes}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.paymentMethod}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.amount >= 0 ? "text-success" : "text-danger"}`}>
                      {transaction.amount >= 0 ? "+" : ""}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
