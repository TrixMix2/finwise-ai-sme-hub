
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const recentTransactions = [
  { 
    id: 1, 
    date: "2025-04-10", 
    description: "Office Supplies", 
    category: "Expenses",
    amount: -129.99,
    status: "completed" 
  },
  { 
    id: 2, 
    date: "2025-04-09", 
    description: "Client Payment - ABC Corp", 
    category: "Income",
    amount: 1500.00,
    status: "completed" 
  },
  { 
    id: 3, 
    date: "2025-04-08", 
    description: "Software Subscription", 
    category: "Expenses",
    amount: -49.99,
    status: "completed" 
  },
  { 
    id: 4, 
    date: "2025-04-07", 
    description: "Utility Bill", 
    category: "Expenses",
    amount: -175.50,
    status: "pending" 
  },
  { 
    id: 5, 
    date: "2025-04-05", 
    description: "Client Payment - XYZ Inc", 
    category: "Income",
    amount: 2250.00,
    status: "completed" 
  },
];

export default function RecentTransactions() {
  const navigate = useNavigate();

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your most recent financial activities
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/transactions')}>
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={`text-right ${transaction.amount >= 0 ? "text-success" : "text-danger"}`}>
                    {transaction.amount >= 0 ? "+" : ""}
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
