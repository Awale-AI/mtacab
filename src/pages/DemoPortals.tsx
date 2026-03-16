import { useNavigate } from "react-router-dom";
import { 
  Wheat, 
  Users, 
  Landmark, 
  PackageSearch, 
  Store, 
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PortalCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: "farmer" | "ngo" | "bank" | "buyer" | "vendor" | "government";
  demoUser: string;
}

const portalCards: PortalCard[] = [
  {
    id: "farmer",
    title: "Farmer Portal",
    description: "View farm profile, advisories, vouchers, and produce listings. USSD is primary in real deployment; this portal is optional.",
    icon: Wheat,
    path: "/farmer",
    color: "farmer",
    demoUser: "Amina Hassan"
  },
  {
    id: "ngo",
    title: "NGO Program Portal",
    description: "Manage beneficiaries, cooperatives, vouchers, and program reports.",
    icon: Users,
    path: "/ngo",
    color: "ngo",
    demoUser: "Sarah Johnson"
  },
  {
    id: "bank",
    title: "Bank & Finance Portal",
    description: "View cooperative readiness, VSLA activity, and program-linked finance data.",
    icon: Landmark,
    path: "/bank",
    color: "bank",
    demoUser: "Ahmed Omar"
  },
  {
    id: "buyer",
    title: "Buyer & Aggregator Portal",
    description: "Discover organized farmer supply and structured sourcing opportunities.",
    icon: PackageSearch,
    path: "/buyer",
    color: "buyer",
    demoUser: "Mohamed Ali"
  },
  {
    id: "vendor",
    title: "Vendor Portal",
    description: "Redeem vouchers, manage products, and track settlements.",
    icon: Store,
    path: "/vendor",
    color: "vendor",
    demoUser: "Fatima Hussein"
  },
  {
    id: "government",
    title: "Government Oversight View",
    description: "Monitor national coverage, programs, and alerts. Read-only demo.",
    icon: Shield,
    path: "/government",
    color: "government",
    demoUser: "Dr. Ibrahim Mohamed"
  }
];

const colorClasses = {
  farmer: {
    border: "border-farmer/20 hover:border-farmer/50",
    bg: "hover:bg-farmer/5",
    icon: "bg-farmer/10 text-farmer",
    button: "bg-farmer hover:bg-farmer/90 text-farmer-foreground"
  },
  ngo: {
    border: "border-ngo/20 hover:border-ngo/50",
    bg: "hover:bg-ngo/5",
    icon: "bg-ngo/10 text-ngo",
    button: "bg-ngo hover:bg-ngo/90 text-ngo-foreground"
  },
  bank: {
    border: "border-bank/20 hover:border-bank/50",
    bg: "hover:bg-bank/5",
    icon: "bg-bank/10 text-bank",
    button: "bg-bank hover:bg-bank/90 text-bank-foreground"
  },
  buyer: {
    border: "border-buyer/20 hover:border-buyer/50",
    bg: "hover:bg-buyer/5",
    icon: "bg-buyer/10 text-buyer",
    button: "bg-buyer hover:bg-buyer/90 text-buyer-foreground"
  },
  vendor: {
    border: "border-vendor/20 hover:border-vendor/50",
    bg: "hover:bg-vendor/5",
    icon: "bg-vendor/10 text-vendor",
    button: "bg-vendor hover:bg-vendor/90 text-vendor-foreground"
  },
  government: {
    border: "border-government/20 hover:border-government/50",
    bg: "hover:bg-government/5",
    icon: "bg-government/10 text-government",
    button: "bg-government hover:bg-government/90 text-government-foreground"
  }
};

export default function DemoPortals() {
  const navigate = useNavigate();

  const handlePortalClick = (portal: PortalCard) => {
    sessionStorage.setItem('demoUser', JSON.stringify({
      name: portal.demoUser,
      role: portal.id
    }));
    navigate(portal.path);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-flex items-center gap-1"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Access TACAB Demo Portals
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore role-based dashboards used by farmers, institutions, and partners.
            <br />
            <span className="text-primary font-medium">This is a guided demo environment.</span>
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portalCards.map((portal) => {
            const Icon = portal.icon;
            const colors = colorClasses[portal.color];
            
            return (
              <div
                key={portal.id}
                className={cn(
                  "group relative flex flex-col bg-background rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
                  colors.border,
                  colors.bg
                )}
              >
                {/* Icon */}
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", colors.icon)}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {portal.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {portal.description}
                </p>

                {/* Button */}
                <Button
                  onClick={() => handlePortalClick(portal)}
                  className={cn("w-full justify-center gap-2 group-hover:gap-3 transition-all", colors.button)}
                >
                  View Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-background border border-border rounded-lg px-6 py-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> This is a guided demo environment.
              <br />
              Live systems are permissioned and accessed through authorized institutions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
