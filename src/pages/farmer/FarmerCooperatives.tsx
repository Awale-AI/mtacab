import { PortalLayout } from "@/components/PortalLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  MapPin,
  Calendar,
  Wallet
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/farmer", icon: LayoutDashboard },
  { label: "My Farm Profile", href: "/farmer/profile", icon: User },
  { label: "Advisory & Alerts", href: "/farmer/advisory", icon: MessageSquare },
  { label: "Cooperatives & VSLAs", href: "/farmer/cooperatives", icon: Users },
  { label: "Input Vouchers", href: "/farmer/vouchers", icon: Ticket },
  { label: "My Produce", href: "/farmer/produce", icon: Package },
  { label: "Notifications", href: "/farmer/notifications", icon: Bell },
];

export default function FarmerCooperatives() {
  return (
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName="Amara Koroma"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Cooperatives & VSLAs</h1>
          <p className="text-muted-foreground">Your farmer groups and savings associations</p>
        </div>

        {/* Cooperative Membership */}
        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="bg-primary/5 px-6 py-4 border-b">
            <h2 className="font-semibold text-foreground">My Cooperative</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-lg bg-farmer/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-farmer" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">Sunrise Farmers Cooperative</h3>
                  <StatusBadge status="active" />
                </div>
                <p className="text-sm text-muted-foreground">Member since March 2024</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                <p className="text-2xl font-semibold text-foreground">48</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Combined Farm Size</p>
                <p className="text-2xl font-semibold text-foreground">127 ha</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Primary Crops</p>
                <p className="text-lg font-semibold text-foreground">Maize, Rice</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Hargeisa, Maroodi Jeex</span>
            </div>
          </div>
        </div>

        {/* VSLA Section */}
        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="bg-accent/10 px-6 py-4 border-b">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Village Savings & Loan Association (VSLA)
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                <Wallet className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">Sunrise VSLA Group</h3>
                  <StatusBadge status="active" />
                </div>
                <p className="text-sm text-muted-foreground">Linked to your cooperative</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">My Savings Balance</p>
                <p className="text-2xl font-semibold text-success">USD 85</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Group Fund Total</p>
                <p className="text-2xl font-semibold text-foreground">USD 4,250</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Next Meeting</span>
              </div>
              <p className="text-sm text-muted-foreground">Saturday, January 18, 2025 at 10:00 AM</p>
              <p className="text-xs text-muted-foreground mt-1">Location: Cooperative Office, Hargeisa</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-3">Cooperative Benefits</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Access to group-negotiated input prices
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Collective marketing and better buyer prices
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Shared farming equipment and resources
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Group loan guarantees and VSLA access
            </li>
          </ul>
        </div>
      </div>
    </PortalLayout>
  );
}
