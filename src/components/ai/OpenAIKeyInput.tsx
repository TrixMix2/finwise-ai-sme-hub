
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Key, Check, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LLMKeyInputProps {
  onKeySubmit: (key: string, provider: string) => void;
  hasKey: boolean;
  provider: string;
  onProviderChange: (provider: string) => void;
}

export default function LLMKeyInput({ 
  onKeySubmit, 
  hasKey, 
  provider, 
  onProviderChange 
}: LLMKeyInputProps) {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OpenAI key format
    if (provider === "openai" && (!apiKey.trim().startsWith("sk-") || apiKey.length < 20)) {
      toast({
        title: "Invalid OpenAI API key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'",
        variant: "destructive",
      });
      return;
    }
    
    // Validate Groq key format
    if (provider === "groq" && apiKey.trim().length < 20) {
      toast({
        title: "Invalid Groq API key",
        description: "Please enter a valid Groq API key",
        variant: "destructive",
      });
      return;
    }

    onKeySubmit(apiKey.trim(), provider);
    toast({
      title: "API key saved",
      description: `Your ${provider === "openai" ? "OpenAI" : "Groq"} API key has been saved for this session.`,
    });
    setApiKey("");
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-6">
      <div className="flex items-center mb-2">
        <Key className="h-5 w-5 mr-2 text-primary" />
        <h3 className="font-medium">AI Provider API Key</h3>
        {hasKey && (
          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Connected
          </Badge>
        )}
      </div>
      
      {!hasKey ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <p className="text-sm text-muted-foreground mb-2">
            Enter your API key to enable AI-powered financial analysis.
            Your key is used only in your browser and is never stored on our servers.
          </p>
          
          <div className="mb-2">
            <Select 
              value={provider} 
              onValueChange={onProviderChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select AI Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                <SelectItem value="groq">Groq AI (LLama 3.1)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={isVisible ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={provider === "openai" ? "sk-..." : "Enter Groq API key"}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? "Hide" : "Show"}
              </button>
            </div>
            <Button type="submit">Save Key</Button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            {provider === "openai" ? (
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Get an OpenAI API key
              </a>
            ) : (
              <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Get a Groq API key
              </a>
            )}
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {provider === "openai" ? "OpenAI" : "Groq"} API key saved for this session
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onKeySubmit("", provider);
              toast({
                title: "API key removed",
                description: "Your API key has been removed from this session.",
              });
            }}
          >
            <X className="h-4 w-4 mr-1" /> Remove Key
          </Button>
        </div>
      )}
    </div>
  );
}
