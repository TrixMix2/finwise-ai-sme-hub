
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Key, Check, X } from "lucide-react";

interface OpenAIKeyInputProps {
  onKeySubmit: (key: string) => void;
  hasKey: boolean;
}

export default function OpenAIKeyInput({ onKeySubmit, hasKey }: OpenAIKeyInputProps) {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().startsWith("sk-") && apiKey.length > 20) {
      onKeySubmit(apiKey.trim());
      toast({
        title: "API key saved",
        description: "Your OpenAI API key has been saved for this session.",
      });
      setApiKey("");
    } else {
      toast({
        title: "Invalid API key",
        description: "Please enter a valid OpenAI API key starting with 'sk-'",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-6">
      <div className="flex items-center mb-2">
        <Key className="h-5 w-5 mr-2 text-primary" />
        <h3 className="font-medium">OpenAI API Key</h3>
        {hasKey && (
          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Connected
          </Badge>
        )}
      </div>
      
      {!hasKey ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <p className="text-sm text-muted-foreground mb-2">
            Enter your OpenAI API key to enable AI-powered financial analysis.
            Your key is used only in your browser and is never stored on our servers.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={isVisible ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
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
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            API key saved for this session
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onKeySubmit("");
              toast({
                title: "API key removed",
                description: "Your OpenAI API key has been removed from this session.",
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
