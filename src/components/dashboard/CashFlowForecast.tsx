
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from "recharts";

// Mock data for cash flow forecast
const data = [
  { name: "Week 1", actual: 10000, forecast: 10000 },
  { name: "Week 2", actual: 9200, forecast: 9500 },
  { name: "Week 3", actual: 8700, forecast: 9000 },
  { name: "Week 4", actual: 9500, forecast: 8500 },
  { name: "Week 5", actual: null, forecast: 9200 },
  { name: "Week 6", actual: null, forecast: 9800 },
  { name: "Week 7", actual: null, forecast: 10200 },
  { name: "Week 8", actual: null, forecast: 11000 },
];

export default function CashFlowForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Forecast</CardTitle>
        <CardDescription>
          8-week cash flow projection based on historical data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                tickFormatter={(value) => `$${value / 1000}k`}
                width={80}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, undefined]}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <ReferenceLine x="Week 4" stroke="#888" strokeDasharray="3 3" label="Today" />
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Actual Balance" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                name="Forecast Balance" 
                stroke="#6366f1" 
                strokeWidth={2}
                strokeDasharray="5 5" 
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
