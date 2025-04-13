
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export default function ChatAssistant({ open, onOpenChange }: ChatAssistantProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your FinWise AI assistant. How can I help you with your finances today?",
      sender: "assistant",
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample financial questions and responses for the chatbot
  const sampleResponses: Record<string, string> = {
    "expense": "Based on your transaction history, your largest expense category this month is Office Supplies at $450. This is 15% higher than last month.",
    "budget": "You've spent 68% of your monthly budget so far. You're on track to stay under budget in most categories except Marketing, which is currently at 85% of the allocated budget.",
    "tax": "Your estimated tax liability for this quarter is $3,250. I've identified 12 potentially tax-deductible transactions worth $2,800 that could reduce your tax burden.",
    "cash flow": "Your current cash flow projection shows a positive trend for the next 8 weeks. Based on your recurring expenses and expected income, you should maintain a minimum balance of $8,500.",
    "savings": "To improve your savings, consider reviewing your software subscription expenses which total $350/month. There appear to be some overlapping services that could be consolidated.",
    "forecast": "Based on your historical data, I forecast your revenue will increase by approximately 8% next month, with expenses remaining stable.",
    "improve": "To improve your financial position, consider: 1) Reviewing underutilized subscriptions, 2) Negotiating with your top 3 vendors, and 3) Following up on 2 overdue client payments totaling $3,200.",
    "report": "I can generate a comprehensive financial report for you. Would you like to see a monthly summary, quarterly analysis, or year-to-date performance?",
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      // Generate response based on keywords in the input
      let response = "I'm not sure I understand. Could you please rephrase your question about your finances?";
      
      const inputLower = input.toLowerCase();
      
      // Check for keywords in the input
      for (const [keyword, answer] of Object.entries(sampleResponses)) {
        if (inputLower.includes(keyword)) {
          response = answer;
          break;
        }
      }
      
      // Special handling for some specific questions
      if (inputLower.includes("biggest") && inputLower.includes("spending")) {
        response = sampleResponses.expense;
      } else if (inputLower.includes("how") && inputLower.includes("reduce")) {
        response = sampleResponses.improve;
      } else if (inputLower.includes("tax") && inputLower.includes("liability")) {
        response = sampleResponses.tax;
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
        onClick={() => onOpenChange(!open)}
      >
        {open ? <X /> : <MessageCircle />}
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 w-80 md:w-96 bg-background border rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out flex flex-col",
          open 
            ? "opacity-100 translate-y-0 h-[500px]" 
            : "opacity-0 translate-y-4 h-0 pointer-events-none"
        )}
      >
        {/* Chat header */}
        <div className="p-3 border-b flex items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot size={18} />
            <h3 className="font-medium">FinWise Assistant</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
            onClick={() => onOpenChange(false)}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-3 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className="flex items-start max-w-[80%]">
                  {message.sender === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Chat input */}
        <div className="p-3 border-t">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask about your finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              ref={inputRef}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={input.trim() === "" || isTyping}
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Try asking: "What's my biggest expense?" or "How can I reduce expenses?"
          </p>
        </div>
      </div>
    </>
  );
}
