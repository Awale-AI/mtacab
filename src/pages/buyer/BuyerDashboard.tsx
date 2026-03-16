import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Search,
  ShoppingCart, 
  Truck, 
  BarChart3,
  Building2,
  MapPin,
  Package,
  Users,
  TrendingUp,
  Calendar
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/buyer", icon: LayoutDashboard },
  { label: "Browse Produce", href: "/buyer/marketplace", icon: Search },
  { label: "My Orders", href: "/buyer/orders", icon: ShoppingCart },
  { label: "Logistics", href: "/buyer/logistics", icon: Truck },
  { label: "Reports", href: "/buyer/reports", icon: BarChart3 },
];

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <PortalLayout 
      title="Buyer Portal" 
      role="buyer" 
      navItems={navItems}
      userName="Ibrahim Osman"
    >
      <div className="space-y-6">
        {/* Company Header */}
        <div className="bg-buyer/5 border border-buyer/20 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-buyer/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-buyer" />
              </div>
              <div>
                <span className="text-xs font-medium text-buyer uppercase tracking-wider">Verified Aggregator</span>
                <h1 className="text-2xl font-heading font-semibold text-foreground">
                  East Africa Grain Trading Co.
                </h1>
                <p className="text-sm text-muted-foreground">Mogadishu, Somalia • Licensed Commodity Trader</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/buyer/logistics")}>
                <Truck className="w-4 h-4 mr-1" />
                Track Shipments
              </Button>
              <Button variant="buyer" size="sm" onClick={() => navigate("/buyer/marketplace")}>
                <Search className="w-4 h-4 mr-1" />
                Find Produce
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Orders"
            value="12"
            subtitle="In progress"
            icon={ShoppingCart}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Tonnage This Month"
            value="145 MT"
            subtitle="Purchased"
            icon={Package}
            variant="success"
          />
          <StatCard
            title="Farmer Partners"
            value="89"
            subtitle="Direct relationships"
            icon={Users}
            variant="info"
          />
          <StatCard
            title="Avg. Price/Kg"
            value="USD 0.42"
            subtitle="Maize (Grade A)"
            icon={TrendingUp}
          />
        </div>

        {/* Available Produce & Active Orders */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Produce */}
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Featured Produce</h2>
              <button onClick={() => navigate("/buyer/marketplace")} className="text-sm text-buyer hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { crop: "White Maize", quantity: "50 MT", location: "Jowhar", price: "USD 0.42/kg", cooperative: "Jowhar Farmers Coop" },
                { crop: "Sorghum", quantity: "35 MT", location: "Baidoa", price: "USD 0.38/kg", cooperative: "Bay Region Growers" },
                { crop: "Sesame Seeds", quantity: "12 MT", location: "Beledweyne", price: "USD 1.85/kg", cooperative: "Hiiraan United" },
                { crop: "Cowpeas", quantity: "20 MT", location: "Kismayo", price: "USD 0.65/kg", cooperative: "Jubba Valley Farmers" },
              ].map((item, i) => (
                <div key={i} onClick={() => { toast({ title: item.crop, description: `Viewing details for ${item.quantity} from ${item.cooperative}` }); navigate("/buyer/marketplace"); }} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-foreground">{item.crop}</p>
                    <p className="text-xs text-muted-foreground">{item.cooperative}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-buyer">{item.price}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                      <MapPin className="w-3 h-3" /> {item.location} • {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Orders */}
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Active Orders</h2>
              <button onClick={() => navigate("/buyer/orders")} className="text-sm text-buyer hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { id: "PO-2024-0156", crop: "White Maize", quantity: "25 MT", status: "in_transit", eta: "Jan 12" },
                { id: "PO-2024-0155", crop: "Sorghum", quantity: "15 MT", status: "processing", eta: "Jan 15" },
                { id: "PO-2024-0154", crop: "Sesame Seeds", quantity: "8 MT", status: "pending", eta: "Jan 18" },
                { id: "PO-2024-0153", crop: "Cowpeas", quantity: "12 MT", status: "completed", eta: "Delivered" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.crop} • {order.quantity}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge 
                      status={order.status === "in_transit" ? "active" : order.status as any} 
                      label={order.status === "in_transit" ? "In Transit" : undefined}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{order.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Produce Availability Map</h2>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-buyer/50 mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map showing produce locations</p>
              <p className="text-xs text-muted-foreground">Click to explore available stocks by region</p>
            </div>
          </div>
        </div>

        {/* Seasonal Calendar */}
        <div className="bg-buyer/5 border border-buyer/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-buyer" />
            <h3 className="font-semibold text-foreground">Harvest Calendar</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Peak harvest seasons for strategic procurement planning
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-buyer text-buyer-foreground text-xs">Maize: Mar-May</span>
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">Sorghum: Oct-Dec</span>
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">Sesame: Nov-Jan</span>
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">Cowpeas: Jul-Sep</span>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
