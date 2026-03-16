import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Users, 
  Building2,
  Wallet,
  Sprout,
  Handshake,
  BarChart3,
  Landmark,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Search,
  Shield,
  CreditCard,
  FileCheck
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/bank", icon: LayoutDashboard },
  { label: "Farmers", href: "/bank/farmers", icon: Users },
  { label: "Cooperatives", href: "/bank/cooperatives", icon: Building2 },
  { label: "VSLAs", href: "/bank/vslas", icon: Wallet },
  { label: "Outgrower Schemes", href: "/bank/outgrower", icon: Sprout },
  { label: "Program Partnerships", href: "/bank/programs", icon: Handshake },
  { label: "Reports / Insights", href: "/bank/reports", icon: BarChart3 },
];

export default function BankDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    switch(action) {
      case "Search Farmer":
        navigate("/bank/farmers");
        break;
      case "Review Apps":
        navigate("/bank/applications");
        break;
      case "Disbursements":
        toast({ title: "Disbursements", description: "Opening payment processing..." });
        break;
      case "Risk Analysis":
        toast({ title: "Risk Analysis", description: "Loading portfolio risk report..." });
        navigate("/bank/reports");
        break;
    }
  };

  return (
    <PortalLayout 
      title="Bank Portal" 
      role="bank" 
      navItems={navItems}
      userName="Fatima Yusuf"
      showRoleSwitcher={false}
    >
      <div className="space-y-6">
        {/* Institution Header */}
        <div className="bg-bank/5 border border-bank/20 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-bank/10 flex items-center justify-center">
                <Landmark className="w-8 h-8 text-bank" />
              </div>
              <div>
                <span className="text-xs font-medium text-bank uppercase tracking-wider">Financial Partner</span>
                <h1 className="text-2xl font-heading font-semibold text-foreground">
                  Somali Agricultural Development Bank
                </h1>
                <p className="text-sm text-muted-foreground">Licensed Agricultural Lender • TACAB Partner</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/bank/reports")}>
                <BarChart3 className="w-4 h-4 mr-1" />
                View Reports
              </Button>
              <Button variant="bank" size="sm" onClick={() => navigate("/bank/farmers")}>
                <Search className="w-4 h-4 mr-1" />
                Search Farmers
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Loans"
            value="1,245"
            subtitle="Outstanding"
            icon={CreditCard}
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Portfolio Value"
            value="$2.4M"
            subtitle="Total disbursed"
            icon={DollarSign}
            variant="success"
          />
          <StatCard
            title="Repayment Rate"
            value="94.2%"
            subtitle="On-time payments"
            icon={TrendingUp}
            variant="info"
          />
          <StatCard
            title="Pending Apps"
            value="48"
            subtitle="Awaiting review"
            icon={FileCheck}
          />
        </div>

        {/* Risk Indicator */}
        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Portfolio Health: Excellent</h3>
              <p className="text-sm text-muted-foreground mt-1">
                94.2% on-time repayment rate. Default rate of 2.1% is well below the 5% threshold. 
                TACAB data integration has reduced default risk by 35% compared to traditional lending.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Applications */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Search Farmer", icon: Search, desc: "By ID or phone" },
                { label: "Review Apps", icon: FileCheck, desc: "48 pending" },
                { label: "Disbursements", icon: DollarSign, desc: "Process payments" },
                { label: "Risk Analysis", icon: AlertCircle, desc: "Portfolio review" },
              ].map((action) => (
                <button 
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-center"
                >
                  <action.icon className="w-5 h-5 text-bank mb-2" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                  <span className="text-xs text-muted-foreground">{action.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Recent Applications</h2>
              <button onClick={() => navigate("/bank/applications")} className="text-sm text-bank hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { farmer: "Abdi Hassan Mohamed", amount: "$500", purpose: "Seeds & Fertilizer", status: "pending", risk: "low" },
                { farmer: "Hawa Osman Ali", amount: "$1,200", purpose: "Equipment", status: "approved", risk: "low" },
                { farmer: "Mohamed Farah Nur", amount: "$800", purpose: "Irrigation", status: "review", risk: "medium" },
                { farmer: "Amina Yusuf Hassan", amount: "$350", purpose: "Seeds", status: "approved", risk: "low" },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.farmer}</p>
                    <p className="text-xs text-muted-foreground">{app.purpose} • {app.amount}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      app.risk === "low" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                    }`}>
                      {app.risk} risk
                    </span>
                    <StatusBadge status={app.status as any} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loan Performance by Product */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Loan Performance by Product</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { product: "Input Loans", active: 456, value: "$684K", rate: "96%" },
              { product: "Equipment Finance", active: 189, value: "$756K", rate: "94%" },
              { product: "Seasonal Credit", active: 423, value: "$634K", rate: "93%" },
              { product: "Cooperative Loans", active: 177, value: "$354K", rate: "98%" },
            ].map((item) => (
              <div key={item.product} className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">{item.product}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Loans</span>
                    <span className="font-medium text-foreground">{item.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repayment</span>
                    <span className="font-medium text-green-600">{item.rate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TACAB Integration Info */}
        <div className="bg-bank/5 border border-bank/20 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3">📊 TACAB Data Integration</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Access verified farmer profiles with complete agricultural history, cooperative membership, 
            voucher usage, and produce sales data for informed lending decisions.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-foreground">12,450</p>
              <p className="text-xs text-muted-foreground">Verified Farmer Profiles</p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-foreground">89</p>
              <p className="text-xs text-muted-foreground">Partner Cooperatives</p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-foreground">-35%</p>
              <p className="text-xs text-muted-foreground">Reduced Default Risk</p>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
