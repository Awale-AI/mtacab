import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  CloudSun,
  Sprout,
  AlertTriangle
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

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleReadMore = (topic: string) => {
    toast({
      title: "Opening Advisory",
      description: `Loading full article: ${topic}`,
    });
    navigate("/farmer/advisory");
  };

  return (
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName="Amara Koroma"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-farmer/5 border border-farmer/20 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-farmer/10">
              <Sprout className="w-6 h-6 text-farmer" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-semibold text-foreground mb-1">
                Welcome back, Amara!
              </h1>
              <p className="text-sm text-muted-foreground">
                Your farm is doing well this season. Check out your latest updates below.
              </p>
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Weather Alert</p>
            <p className="text-xs text-muted-foreground">Heavy rainfall expected in your area tomorrow. Consider harvesting ripe crops today.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Farm Size"
            value="2.5 ha"
            subtitle="Registered land"
            icon={Sprout}
          />
          <StatCard
            title="Active Vouchers"
            value="3"
            subtitle="USD 150 total value"
            icon={Ticket}
            variant="success"
          />
          <StatCard
            title="Produce Listed"
            value="2"
            subtitle="Awaiting buyers"
            icon={Package}
          />
          <StatCard
            title="Cooperative"
            value="1"
            subtitle="Sunrise Farmers Group"
            icon={Users}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Recent Advisory */}
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Latest Advisory</h2>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => handleReadMore("Maize Planting Tips")}
                className="p-3 bg-muted/50 rounded-lg text-left hover:bg-muted transition-colors w-full"
              >
                <p className="text-sm font-medium text-foreground mb-1">Maize Planting Tips</p>
                <p className="text-xs text-muted-foreground">Best practices for your region this season...</p>
                <span className="text-xs text-primary mt-2 inline-block">Read more →</span>
              </button>
              <button 
                onClick={() => handleReadMore("Pest Alert: Fall Armyworm")}
                className="p-3 bg-muted/50 rounded-lg text-left hover:bg-muted transition-colors w-full"
              >
                <p className="text-sm font-medium text-foreground mb-1">Pest Alert: Fall Armyworm</p>
                <p className="text-xs text-muted-foreground">Monitor your crops for signs of infestation...</p>
                <span className="text-xs text-primary mt-2 inline-block">Read more →</span>
              </button>
            </div>
          </div>

          {/* Voucher Status */}
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Ticket className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Voucher Status</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Seed Voucher</p>
                  <p className="text-xs text-muted-foreground">USD 50 value</p>
                </div>
                <StatusBadge status="active" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Fertilizer Voucher</p>
                  <p className="text-xs text-muted-foreground">USD 65 value</p>
                </div>
                <StatusBadge status="active" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">Tool Voucher</p>
                  <p className="text-xs text-muted-foreground">USD 35 value</p>
                </div>
                <StatusBadge status="pending" />
              </div>
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CloudSun className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-foreground">Weather Forecast</h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["Today", "Tue", "Wed", "Thu"].map((day, i) => (
              <div key={day} className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">{day}</p>
                <CloudSun className="w-6 h-6 mx-auto text-accent mb-2" />
                <p className="text-sm font-medium text-foreground">{28 + i}°C</p>
                <p className="text-xs text-muted-foreground">{i === 1 ? "Rain" : "Sunny"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
