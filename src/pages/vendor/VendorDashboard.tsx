import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VerificationBadge } from "@/components/governance/VerificationBadge";
import { VerificationLevel } from "@/lib/governance";
import { 
  LayoutDashboard, 
  Package, 
  Ticket, 
  TrendingUp, 
  BarChart3,
  Store,
  ShoppingBag,
  QrCode,
  DollarSign,
  AlertCircle,
  Shield
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "Product Catalog", href: "/vendor/products", icon: Package },
  { label: "Voucher Redemption", href: "/vendor/redemptions", icon: Ticket },
  { label: "Sales & Orders", href: "/vendor/sales", icon: ShoppingBag },
  { label: "Reports & Analytics", href: "/vendor/reports", icon: BarChart3 },
];

// Recent redemptions with verification levels (only B+ shown)
const recentRedemptions = [
  { farmer: "Farah Abdi", farmerLevel: "B" as VerificationLevel, voucher: "VCH-2024-0892", amount: "USD 45", status: "completed" },
  { farmer: "Amina Hassan", farmerLevel: "A" as VerificationLevel, voucher: "VCH-2024-0891", amount: "USD 120", status: "completed" },
  { farmer: "Mohamed Ali", farmerLevel: "B" as VerificationLevel, voucher: "VCH-2024-0890", amount: "USD 75", status: "pending" },
  { farmer: "Halima Omar", farmerLevel: "A" as VerificationLevel, voucher: "VCH-2024-0889", amount: "USD 90", status: "completed" },
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    switch(action) {
      case "Scan Voucher":
        toast({ title: "QR Scanner", description: "Opening camera for voucher scanning..." });
        navigate("/vendor/redemptions");
        break;
      case "Add Product":
        toast({ title: "Product Catalog", description: "Opening product form..." });
        navigate("/vendor/products");
        break;
      case "View Sales":
        toast({ title: "Sales Report", description: "Loading today's transactions..." });
        navigate("/vendor/sales");
        break;
      case "Update Stock":
        toast({ title: "Inventory", description: "Opening stock management..." });
        navigate("/vendor/products");
        break;
    }
  };

  return (
    <PortalLayout 
      title="Vendor Portal" 
      role="vendor" 
      navItems={navItems}
      userName="Ahmed Hassan"
    >
      <div className="space-y-6">
        {/* Store Header */}
        <div className="bg-vendor/5 border border-vendor/20 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-vendor/10 flex items-center justify-center">
                <Store className="w-8 h-8 text-vendor" />
              </div>
              <div>
                <span className="text-xs font-medium text-vendor uppercase tracking-wider">Verified Vendor</span>
                <h1 className="text-2xl font-heading font-semibold text-foreground">
                  Hassan Agricultural Supplies
                </h1>
                <p className="text-sm text-muted-foreground">Mogadishu, Banadir Region • Licensed Agro-dealer</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/vendor/products")}>
                <Package className="w-4 h-4 mr-1" />
                Add Product
              </Button>
              <Button variant="vendor" size="sm" onClick={() => navigate("/vendor/redemptions")}>
                <QrCode className="w-4 h-4 mr-1" />
                Scan Voucher
              </Button>
            </div>
          </div>
        </div>

        {/* Governance Notice */}
        <div className="bg-muted/50 border rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-vendor mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Level B+ Farmers Only</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can only see and transact with farmers who have completed community verification (Level B) or formal ID verification (Level A). 
                Level C farmers are not visible to vendors for fraud protection.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Monthly Sales"
            value="USD 12,450"
            subtitle="This month"
            icon={DollarSign}
            trend={{ value: 18, positive: true }}
          />
          <StatCard
            title="Vouchers Redeemed"
            value="156"
            subtitle="B+ farmers only"
            icon={Ticket}
            variant="success"
          />
          <StatCard
            title="Products Listed"
            value="48"
            subtitle="Active listings"
            icon={Package}
            variant="info"
          />
          <StatCard
            title="Pending Orders"
            value="12"
            subtitle="Awaiting fulfillment"
            icon={ShoppingBag}
          />
        </div>

        {/* Quick Actions & Pending Redemptions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Scan Voucher", icon: QrCode, desc: "Redeem B+ voucher" },
                { label: "Add Product", icon: Package, desc: "List new input" },
                { label: "View Sales", icon: TrendingUp, desc: "Today's transactions" },
                { label: "Update Stock", icon: Store, desc: "Manage inventory" },
              ].map((action) => (
                <button 
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-center"
                >
                  <action.icon className="w-5 h-5 text-vendor mb-2" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                  <span className="text-xs text-muted-foreground">{action.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pending Redemptions */}
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Recent Voucher Redemptions</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">B+ only</span>
            </div>
            <div className="space-y-3">
              {recentRedemptions.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{item.farmer}</p>
                      <VerificationBadge level={item.farmerLevel} size="sm" />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.voucher}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">{item.amount}</span>
                    <StatusBadge status={item.status as any} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Top Selling Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Maize Seeds (10kg)", sold: 234, stock: 150, price: "USD 25" },
              { name: "NPK Fertilizer (50kg)", sold: 189, stock: 80, price: "USD 45" },
              { name: "Pesticide Spray (1L)", sold: 156, stock: 200, price: "USD 15" },
              { name: "Sorghum Seeds (5kg)", sold: 124, stock: 95, price: "USD 18" },
            ].map((product) => (
              <div key={product.name} className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-1">{product.name}</p>
                <p className="text-2xl font-semibold text-foreground">{product.sold}</p>
                <p className="text-xs text-muted-foreground">units sold</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                  <span className="text-sm font-medium text-vendor">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Low Stock Alert</h3>
              <p className="text-sm text-muted-foreground mt-1">
                3 products are running low on stock. Consider restocking: NPK Fertilizer (50kg), Herbicide Concentrate, Hand Sprayers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
