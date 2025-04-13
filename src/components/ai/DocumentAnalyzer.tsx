
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeFinancialDocument } from "@/utils/openai";
import { Loader2, FileText, FileCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentAnalyzerProps {
  apiKey: string;
  provider: string;
}

export default function DocumentAnalyzer({ apiKey, provider }: DocumentAnalyzerProps) {
  const [documentText, setDocumentText] = useState("");
  const [analysisResult, setAnalysisResult] = useState<{
    documentType: string;
    entities: { name: string; value: string }[];
    summary: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!documentText.trim()) {
      toast({
        title: "No text to analyze",
        description: "Please paste or type the document text to analyze.",
        variant: "destructive",
      });
      return;
    }

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
      const result = await analyzeFinancialDocument(documentText, apiKey, provider);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing the document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Document Analysis
          </CardTitle>
          <CardDescription>
            Paste invoice, receipt, or financial document text for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your document text here..."
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            className="min-h-[150px]"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !documentText.trim() || !apiKey}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>Analyze Document</>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="h-5 w-5 mr-2" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              Document Type: {analysisResult.documentType}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResult.entities.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Extracted Information</h4>
                <div className="bg-muted rounded-md p-3">
                  <ul className="space-y-1">
                    {analysisResult.entities.map((entity, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span className="font-medium">{entity.name}:</span>
                        <span>{entity.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium mb-2">Summary</h4>
              <div className="bg-muted rounded-md p-3">
                <p className="text-sm">{analysisResult.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
