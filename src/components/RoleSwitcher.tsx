import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  Heart, 
  Package, 
  ShoppingCart, 
  Landmark, 
  Building2,
  ChevronDown,
  Check,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleOption {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  path: string;
  demoUser: string;
}

const roles: RoleOption[] = [
  {
    id: "farmer",
    title: "Farmer",
    icon: Sprout,
    color: "text-farmer",
    bgColor: "bg-farmer/10",
    path: "/farmer",
    demoUser: "Ahmed Hassan",
  },
  {
    id: "ngo",
    title: "NGO",
    icon: Heart,
    color: "text-ngo",
    bgColor: "bg-ngo/10",
    path: "/ngo",
    demoUser: "Sarah Ibrahim",
  },
  {
    id: "vendor",
    title: "Vendor",
    icon: Package,
    color: "text-vendor",
    bgColor: "bg-vendor/10",
    path: "/vendor",
    demoUser: "Mohamed Ali",
  },
  {
    id: "buyer",
    title: "Buyer",
    icon: ShoppingCart,
    color: "text-buyer",
    bgColor: "bg-buyer/10",
    path: "/buyer",
    demoUser: "Fatima Omar",
  },
  {
    id: "bank",
    title: "Bank",
    icon: Landmark,
    color: "text-bank",
    bgColor: "bg-bank/10",
    path: "/bank",
    demoUser: "Yusuf Abdi",
  },
  {
    id: "government",
    title: "Government",
    icon: Building2,
    color: "text-government",
    bgColor: "bg-government/10",
    path: "/government",
    demoUser: "Minister Desk",
  },
];

interface RoleSwitcherProps {
  currentRole: string;
  variant?: "default" | "compact";
}

export function RoleSwitcher({ currentRole, variant = "default" }: RoleSwitcherProps) {
  const navigate = useNavigate();
  const current = roles.find(r => r.id === currentRole);

  const handleSwitch = (role: RoleOption) => {
    sessionStorage.setItem('demoUser', JSON.stringify({
      name: role.demoUser,
      role: role.id,
      roleTitle: role.title,
    }));
    navigate(role.path);
  };

  if (!current) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={variant === "compact" ? "sm" : "default"}
          className={cn(
            "gap-2",
            variant === "compact" && "h-8 px-2 text-xs"
          )}
        >
          <current.icon className={cn("w-4 h-4", current.color)} />
          <span className="hidden sm:inline">{current.title}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Switch Demo Role
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => handleSwitch(role)}
            className={cn(
              "gap-3 cursor-pointer",
              role.id === currentRole && "bg-muted"
            )}
          >
            <div className={cn("p-1.5 rounded", role.bgColor)}>
              <role.icon className={cn("w-3.5 h-3.5", role.color)} />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium">{role.title}</span>
              <p className="text-[10px] text-muted-foreground">{role.demoUser}</p>
            </div>
            {role.id === currentRole && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}