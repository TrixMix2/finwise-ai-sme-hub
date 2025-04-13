
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LLMKeyInput from "@/components/ai/OpenAIKeyInput";
import DocumentAnalyzer from "@/components/ai/DocumentAnalyzer";
import TaxDeductionAnalyzer from "@/components/ai/TaxDeductionAnalyzer";
import { Brain, FileText, Calculator, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIFinanceAnalysis() {
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState("openai");
  
  const handleKeySubmit = (key: string, selectedProvider: string) => {
    setApiKey(key);
    setProvider(selectedProvider);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Financial Analysis</h1>
          <p className="text-muted-foreground">
            Automated bookkeeping and financial document analysis
          </p>
        </div>
        
        <LLMKeyInput 
          onKeySubmit={handleKeySubmit} 
          hasKey={!!apiKey} 
          provider={provider}
          onProviderChange={setProvider}
        />
        
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Document Analysis
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center">
              <Calculator className="h-4 w-4 mr-2" />
              Tax Insights
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Financial Forecasting
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-6">
            <DocumentAnalyzer apiKey={apiKey} provider={provider} />
            
            <Card>
              <CardHeader>
                <CardTitle>How Document Analysis Works</CardTitle>
                <CardDescription>Understanding the AI-powered document analysis process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">1. Upload Text</h3>
                      <p className="text-sm text-muted-foreground">Paste text from invoices, receipts, or financial documents</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">2. AI Analysis</h3>
                      <p className="text-sm text-muted-foreground">Our AI extracts and organizes key financial information</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="mx-auto bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <PieChart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">3. Review Results</h3>
                      <p className="text-sm text-muted-foreground">View categorized data, tax implications, and insights</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-md p-3 text-sm">
                    <p><strong>Pro Tip:</strong> For best results, ensure your document text is complete and clearly formatted. 
                    The AI can analyze receipts, invoices, bank statements, tax forms, and most other financial documents.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tax" className="space-y-6">
            <TaxDeductionAnalyzer apiKey={apiKey} provider={provider} />
          </TabsContent>
          
          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Financial Forecasting
                </CardTitle>
                <CardDescription>
                  Predictive analytics for your business finances
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="bg-muted/50 rounded-full p-6 mb-4">
                  <PieChart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Our AI-powered financial forecasting feature is currently in development.
                  Soon you'll be able to get predictive insights about your business finances.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
