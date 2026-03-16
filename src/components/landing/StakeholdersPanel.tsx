import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  Heart, 
  Package, 
  ShoppingCart, 
  Landmark, 
  Building2,
  ArrowRight,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StakeholderRole {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: LucideIcon;
  color: string;
  bgColor: string;
  path: string;
  demoUser: string;
}

const stakeholders: StakeholderRole[] = [
  {
    id: "farmer",
    title: "Farmer",
    description: "Smallholder farmers access their profile, advisories, vouchers, and market info",
    capabilities: ["Farm registration", "Input vouchers", "Produce listing", "Weather alerts"],
    icon: Sprout,
    color: "text-farmer",
    bgColor: "bg-farmer/10",
    path: "/farmer",
    demoUser: "Ahmed Hassan",
  },
  {
    id: "ngo",
    title: "Humanitarian NGO",
    description: "NGOs manage beneficiary registration, voucher distribution, and program impact",
    capabilities: ["Beneficiary registry", "Voucher issuance", "SMS campaigns", "Impact reports"],
    icon: Heart,
    color: "text-ngo",
    bgColor: "bg-ngo/10",
    path: "/ngo",
    demoUser: "Sarah Ibrahim",
  },
  {
    id: "vendor",
    title: "Input Vendor",
    description: "Agro-dealers list products and redeem farmer vouchers at point of sale",
    capabilities: ["Product catalog", "Voucher redemption", "Sales tracking", "Inventory"],
    icon: Package,
    color: "text-vendor",
    bgColor: "bg-vendor/10",
    path: "/vendor",
    demoUser: "Mohamed Ali",
  },
  {
    id: "buyer",
    title: "Buyer / Aggregator",
    description: "Market buyers browse produce listings and coordinate pickup logistics",
    capabilities: ["Produce marketplace", "Order management", "Logistics tracking", "Payments"],
    icon: ShoppingCart,
    color: "text-buyer",
    bgColor: "bg-buyer/10",
    path: "/buyer",
    demoUser: "Fatima Omar",
  },
  {
    id: "bank",
    title: "Bank / MFI",
    description: "Financial institutions access farmer credit scores and manage loan products",
    capabilities: ["Credit scoring", "Loan applications", "Portfolio management", "Risk analysis"],
    icon: Landmark,
    color: "text-bank",
    bgColor: "bg-bank/10",
    path: "/bank",
    demoUser: "Yusuf Abdi",
  },
  {
    id: "government",
    title: "Government",
    description: "Ministry officials monitor programs, view statistics, and manage regions",
    capabilities: ["National dashboard", "Regional data", "Program oversight", "Policy reports"],
    icon: Building2,
    color: "text-government",
    bgColor: "bg-government/10",
    path: "/government",
    demoUser: "Minister Desk",
  },
];

export function StakeholdersPanel() {
  const navigate = useNavigate();

  const handleLogin = (role: StakeholderRole) => {
    sessionStorage.setItem('demoUser', JSON.stringify({
      name: role.demoUser,
      role: role.id,
      roleTitle: role.title,
    }));
    navigate(role.path);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stakeholders.map((role) => (
        <Card 
          key={role.id}
          className="group hover:shadow-lg transition-all duration-200 border-border hover:border-primary/30 cursor-pointer"
          onClick={() => handleLogin(role)}
        >
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className={cn("p-2.5 rounded-lg", role.bgColor)}>
                <role.icon className={cn("w-5 h-5", role.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={cn("font-semibold", role.color)}>{role.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {role.description}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 mb-4">
              {role.capabilities.map((cap) => (
                <div key={cap} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className={cn("w-1 h-1 rounded-full", role.color.replace('text-', 'bg-'))} />
                  {cap}
                </div>
              ))}
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("w-full gap-2 group-hover:bg-muted", role.color)}
            >
              Enter as {role.title}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}