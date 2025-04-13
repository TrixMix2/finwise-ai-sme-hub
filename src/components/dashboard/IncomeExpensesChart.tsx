
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

// Mock data
const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 9800, expenses: 2000 },
  { name: "Apr", income: 3908, expenses: 2780 },
  { name: "May", income: 4800, expenses: 1908 },
  { name: "Jun", income: 3800, expenses: 2800 },
  { name: "Jul", income: 4300, expenses: 2300 },
];

export default function IncomeExpensesChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Income & Expenses Overview</CardTitle>
        <CardDescription>
          Monthly comparison of income vs expenses for the current year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
                width={80}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, undefined]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="#0ea5e9" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="expenses" 
                name="Expenses" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
