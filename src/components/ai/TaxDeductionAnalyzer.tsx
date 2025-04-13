
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeTaxDeductions } from "@/utils/openai";
import { Loader2, ReceiptText, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface TaxDeductionAnalyzerProps {
  apiKey: string;
  provider: string;
}

// Sample expense data to analyze
const sampleExpenses = [
  { category: "Office supplies", amount: 850.25 },
  { category: "Software subscriptions", amount: 1200.00 },
  { category: "Professional development", amount: 750.00 },
  { category: "Travel expenses", amount: 1100.50 },
  { category: "Client meals", amount: 430.75 },
  { category: "Marketing", amount: 1650.00 }
];

export default function TaxDeductionAnalyzer({ apiKey, provider }: TaxDeductionAnalyzerProps) {
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    deductions: { category: string; amount: number; confidence: number }[];
    summary: string;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: `Please provide a ${provider === "openai" ? "OpenAI" : "Groq"} API key to use this feature.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeTaxDeductions(sampleExpenses, apiKey, provider);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing tax deductions:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing the tax deductions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ReceiptText className="h-5 w-5 mr-2" />
          AI Tax Deduction Analysis
        </CardTitle>
        <CardDescription>
          Use AI to analyze your expenses for potential tax deductions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysisResult ? (
          <>
            <div className="bg-muted rounded-md p-3 mb-4">
              <h4 className="text-sm font-medium mb-2">Current Expense Data</h4>
              <ul className="space-y-1">
                {sampleExpenses.map((expense, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{expense.category}</span>
                    <span className="font-medium">${expense.amount.toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex justify-between text-sm pt-2 border-t border-border mt-2">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">
                    ${sampleExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
            <Button 
              onClick={handleAnalyze} 
              disabled={loading || !apiKey}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Deductions...
                </>
              ) : (
                <>Analyze Tax Deductions</>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Deduction Confidence</h4>
              <div className="space-y-3">
                {analysisResult.deductions.map((deduction, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{deduction.category}</span>
                      <span className={`font-medium ${getConfidenceColor(deduction.confidence)}`}>
                        {deduction.confidence}% confidence
                      </span>
                    </div>
                    <Progress value={deduction.confidence} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                <h4 className="text-sm font-medium">AI Analysis Summary</h4>
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm whitespace-pre-line">{analysisResult.summary}</p>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Note: This analysis is for informational purposes only and does not constitute tax advice. 
              Consult with a qualified tax professional for specific advice about your situation.</p>
            </div>
            
            <Button onClick={() => setAnalysisResult(null)} variant="outline">
              Reset Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
