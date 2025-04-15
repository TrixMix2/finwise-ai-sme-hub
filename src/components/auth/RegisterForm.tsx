
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/providers/AuthProvider";

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  companyName: string;
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, signUp } = useAuth();
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    role: "owner",
    companyName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      return;
    }
    await signUp(
      registerData.email, 
      registerData.password, 
      { 
        role: registerData.role,
        company_name: registerData.companyName
      }
    );
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
          value={registerData.email}
          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <Input 
          id="company" 
          type="text" 
          placeholder="Your Company" 
          required
          value={registerData.companyName}
          onChange={(e) => setRegisterData({...registerData, companyName: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={registerData.role}
          onValueChange={(value) => setRegisterData({...registerData, role: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Business Owner</SelectItem>
            <SelectItem value="accountant">Accountant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="••••••••"
            required
            value={registerData.password}
            onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
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
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          placeholder="••••••••"
          required
          value={registerData.confirmPassword}
          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
