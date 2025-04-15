
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, signIn } = useAuth();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(loginData.email, loginData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="name@example.com" 
          required
          value={loginData.email}
          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button variant="link" className="p-0 h-auto text-xs">
            Forgot password?
          </Button>
        </div>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••"
            required
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
          />
          <Button 
            type="button"
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
