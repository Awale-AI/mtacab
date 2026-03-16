import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Sprout, 
  Heart, 
  Package, 
  ShoppingCart, 
  Landmark, 
  Building2,
  LucideIcon,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  path: string;
  demoUser: string;
}

const roles: RoleOption[] = [
  {
    id: "farmer",
    title: "Farmer",
    description: "Access farm profile, advisories, produce listings, and vouchers",
    icon: Sprout,
    color: "text-farmer",
    bgColor: "bg-farmer/10",
    borderColor: "border-farmer/30",
    path: "/farmer",
    demoUser: "Ahmed Hassan",
  },
  {
    id: "ngo",
    title: "Humanitarian NGO",
    description: "Manage beneficiaries, vouchers, and program impact",
    icon: Heart,
    color: "text-ngo",
    bgColor: "bg-ngo/10",
    borderColor: "border-ngo/30",
    path: "/ngo",
    demoUser: "Sarah Ibrahim",
  },
  {
    id: "vendor",
    title: "Input Vendor",
    description: "List agricultural inputs and redeem vouchers",
    icon: Package,
    color: "text-vendor",
    bgColor: "bg-vendor/10",
    borderColor: "border-vendor/30",
    path: "/vendor",
    demoUser: "Mohamed Ali",
  },
  {
    id: "buyer",
    title: "Buyer / Aggregator",
    description: "Browse produce and manage aggregation logistics",
    icon: ShoppingCart,
    color: "text-buyer",
    bgColor: "bg-buyer/10",
    borderColor: "border-buyer/30",
    path: "/buyer",
    demoUser: "Fatima Omar",
  },
  {
    id: "bank",
    title: "Bank / Finance",
    description: "Review farmer profiles and manage loan products",
    icon: Landmark,
    color: "text-bank",
    bgColor: "bg-bank/10",
    borderColor: "border-bank/30",
    path: "/bank",
    demoUser: "Yusuf Abdi",
  },
  {
    id: "government",
    title: "Government Admin",
    description: "View national statistics and monitor programs",
    icon: Building2,
    color: "text-government",
    bgColor: "bg-government/10",
    borderColor: "border-government/30",
    path: "/government",
    demoUser: "Minister Desk",
  },
];

export function DemoLoginModal({ open, onOpenChange }: DemoLoginModalProps) {
  const navigate = useNavigate();

  const handleRoleSelect = (role: RoleOption) => {
    // Store the demo user info in sessionStorage for display in portal
    sessionStorage.setItem('demoUser', JSON.stringify({
      name: role.demoUser,
      role: role.id,
      roleTitle: role.title,
    }));
    onOpenChange(false);
    navigate(role.path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl font-heading">
            Select a Demo Role
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose a stakeholder role to explore the TACAB platform demo.
            <br />
            <span className="text-xs text-muted-foreground/70">
              No password required — click to login instantly
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={cn(
                "group relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                role.borderColor,
                role.bgColor,
                "hover:border-opacity-60"
              )}
            >
              <div className={cn(
                "flex-shrink-0 p-2.5 rounded-lg",
                role.bgColor,
                role.color
              )}>
                <role.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn("font-semibold", role.color)}>
                    {role.title}
                  </span>
                  <ArrowRight className={cn(
                    "w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0",
                    role.color
                  )} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {role.description}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1.5">
                  Demo: {role.demoUser}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            🔒 This is a demonstration platform with simulated data.
            <br />
            No real authentication or personal data is collected.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
