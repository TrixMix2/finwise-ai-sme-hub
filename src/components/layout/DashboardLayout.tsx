
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  FileText, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  CreditCard,
  DollarSign,
  Brain,
  LucideIcon,
  Menu,
  X
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ChatAssistant from "@/components/chat/ChatAssistant";
import { useAuth } from "@/providers/AuthProvider";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  ownerOnly?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [companyName, setCompanyName] = useState<string>("Your Company");
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { user, session, loading, signOut } = useAuth();

  // Get user metadata
  const userRole = user?.user_metadata?.role || 'owner';
  const userEmail = user?.email || '';

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !session) {
      navigate("/");
      return;
    }

    // Get company name from user metadata
    if (user?.user_metadata?.company_name) {
      setCompanyName(user.user_metadata.company_name);
    }
    
    // Check system preference for theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    
    // Close sidebar on mobile by default
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [navigate, isMobile, session, loading, user]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    signOut();
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transactions",
      href: "/transactions",
      icon: Receipt,
    },
    {
      title: "Budgeting",
      href: "/budgeting",
      icon: PieChart,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileText,
    },
    {
      title: "Tax Compliance",
      href: "/tax-compliance",
      icon: DollarSign,
    },
    {
      title: "Accounts",
      href: "/accounts",
      icon: CreditCard,
    },
    {
      title: "AI Analysis",
      href: "/ai-analysis",
      icon: Brain,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const getInitials = (email: string) => {
    if (!email) return "U";
    return email.split("@")[0].substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <div className="font-semibold">{companyName}</div>
        <Avatar className="h-8 w-8">
          <AvatarFallback>{userEmail ? getInitials(userEmail) : "U"}</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
          fixed md:relative z-30 md:z-auto top-0 left-0 h-full w-64 
          transition-transform duration-300 ease-in-out
          bg-sidebar text-sidebar-foreground flex flex-col
          border-r border-sidebar-border
        `}
      >
        <div className="p-4">
          <div className="text-xl font-bold mb-1 text-white">{companyName}</div>
          <div className="text-xs text-sidebar-foreground/70 mb-6">
            {userRole === "owner" ? "Business Owner" : "Accountant"}
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              // Skip owner-only items for non-owners
              if (item.ownerOnly && userRole !== "owner") return null;
              
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    window.location.pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  }`}
                  onClick={() => navigate(item.href)}
                  disabled={item.disabled}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{userEmail ? getInitials(userEmail) : "U"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{userEmail}</div>
              <div className="text-xs opacity-70">
                {userRole === "owner" ? "Business Owner" : "Accountant"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button 
              variant="ghost"
              className="text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
        
        {/* Chat Assistant */}
        <ChatAssistant open={chatOpen} onOpenChange={setChatOpen} />
      </main>
    </div>
  );
}
