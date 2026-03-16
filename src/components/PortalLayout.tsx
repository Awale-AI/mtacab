import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { 
  ChevronLeft, 
  Menu, 
  X, 
  LogOut,
  LucideIcon,
  User
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface PortalLayoutProps {
  children: ReactNode;
  title: string;
  role: "farmer" | "ngo" | "vendor" | "buyer" | "bank" | "government";
  navItems: NavItem[];
  userName?: string;
  showRoleSwitcher?: boolean;
}

interface DemoUser {
  name: string;
  role: string;
  roleTitle: string;
}

const roleColors = {
  farmer: "bg-farmer",
  ngo: "bg-ngo",
  vendor: "bg-vendor",
  buyer: "bg-buyer",
  bank: "bg-bank",
  government: "bg-government",
};

const roleTextColors = {
  farmer: "text-farmer",
  ngo: "text-ngo",
  vendor: "text-vendor",
  buyer: "text-buyer",
  bank: "text-bank",
  government: "text-government",
};

const roleBorderColors = {
  farmer: "border-farmer/20",
  ngo: "border-ngo/20",
  vendor: "border-vendor/20",
  buyer: "border-buyer/20",
  bank: "border-bank/20",
  government: "border-government/20",
};

const roleBgColors = {
  farmer: "bg-farmer/10",
  ngo: "bg-ngo/10",
  vendor: "bg-vendor/10",
  buyer: "bg-buyer/10",
  bank: "bg-bank/10",
  government: "bg-government/10",
};

export function PortalLayout({ children, title, role, navItems, userName, showRoleSwitcher = true }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('demoUser');
    if (stored) {
      setDemoUser(JSON.parse(stored));
    }
  }, []);

  const displayName = demoUser?.name || userName || "Demo User";

  const handleLogout = () => {
    sessionStorage.removeItem('demoUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header - Fixed */}
      <header className={cn("sticky top-0 z-50 border-b bg-card shadow-sm", roleBorderColors[role])}>
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left: Menu + Back */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Exit</span>
            </Link>
            
            {/* Portal Title */}
            <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <div className={cn("w-2 h-2 rounded-full", roleColors[role])} />
              <span className="font-heading font-semibold text-foreground text-sm">{title}</span>
            </div>
          </div>

          {/* Center: Logged in as badge - PROMINENT */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border",
            roleBorderColors[role],
            roleBgColors[role]
          )}>
            <User className={cn("w-3.5 h-3.5", roleTextColors[role])} />
            <span className="text-xs font-medium text-foreground">
              <span className="text-muted-foreground hidden sm:inline">Logged in as: </span>
              <span className={roleTextColors[role]}>{displayName}</span>
            </span>
          </div>

          {/* Right: Role Switcher + Logout */}
          <div className="flex items-center gap-2">
            {showRoleSwitcher && <RoleSwitcher currentRole={role} variant="compact" />}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground h-9 w-9"
              title="Exit demo"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Fixed position */}
        <aside className={cn(
          "fixed lg:sticky top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-60 bg-card border-r transition-transform duration-300 lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          roleBorderColors[role]
        )}>
          {/* Mobile Title */}
          <div className="lg:hidden p-4 border-b border-border">
            <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg", roleBgColors[role])}>
              <div className={cn("w-2 h-2 rounded-full", roleColors[role])} />
              <span className={cn("text-sm font-medium", roleTextColors[role])}>{title}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? cn(roleBgColors[role], roleTextColors[role])
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Bottom Info */}
          <div className="p-3 border-t border-border">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-[10px] text-muted-foreground leading-relaxed text-center">
                📱 Also available via <strong>USSD</strong> — Dial *384*1#
              </p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Scrollable */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}