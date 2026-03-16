import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Users, 
  Building,
  Ticket, 
  MessageSquare, 
  BarChart3,
  Upload,
  TrendingUp,
  MapPin,
  Calendar,
  Eye
} from "lucide-react";

const navItems = [
  { label: "Program Overview", href: "/ngo", icon: LayoutDashboard },
  { label: "Farmer Lookup", href: "/ngo/beneficiaries", icon: Users },
  { label: "Cooperatives & VSLAs", href: "/ngo/cooperatives", icon: Building },
  { label: "Vouchers & Subsidies", href: "/ngo/vouchers", icon: Ticket },
  { label: "Communications", href: "/ngo/communications", icon: MessageSquare },
  { label: "Monitoring & Reports", href: "/ngo/reports", icon: BarChart3 },
];

export default function NGODashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    switch(action) {
      case "Upload Beneficiaries":
        toast({ title: "CSV Import", description: "Opening file upload dialog..." });
        navigate("/ngo/beneficiaries");
        break;
      case "Issue Vouchers":
        toast({ title: "Voucher System", description: "Opening voucher issuance workflow..." });
        navigate("/ngo/vouchers");
        break;
      case "Create Cooperative":
        toast({ title: "Cooperative Setup", description: "Starting new cooperative registration..." });
        navigate("/ngo/cooperatives");
        break;
      case "Send SMS Blast":
        toast({ title: "SMS Campaign", description: "Opening mass notification tool..." });
        navigate("/ngo/communications");
        break;
    }
  };

  return (
    <PortalLayout 
      title="NGO Portal" 
      role="ngo" 
      navItems={navItems}
      userName="Sarah Okonkwo"
    >
      <div className="space-y-6">
        {/* Program Header */}
        <div className="bg-ngo/5 border border-ngo/20 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <span className="text-xs font-medium text-ngo uppercase tracking-wider">Active Program</span>
              <h1 className="text-2xl font-heading font-semibold text-foreground mt-1">
                Sustainable Agriculture Support Initiative
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Maroodi Jeex, Togdheer, Awdal
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Jan 2024 - Dec 2025
                </span>
                <StatusBadge status="active" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => {
                toast({ title: "Data Import", description: "Opening import wizard..." });
              }}>
                <Upload className="w-4 h-4 mr-1" />
                Import Data
              </Button>
              <Button variant="ngo" size="sm" onClick={() => navigate("/ngo/beneficiaries")}>
                <Eye className="w-4 h-4 mr-1" />
                View Farmers
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Beneficiaries"
            value="2,847"
            subtitle="Registered farmers"
            icon={Users}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Active Cooperatives"
            value="48"
            subtitle="Across 3 states"
            icon={Building}
            variant="success"
          />
          <StatCard
            title="Vouchers Issued"
            value="USD 145K"
            subtitle="This quarter"
            icon={Ticket}
            variant="info"
          />
          <StatCard
            title="Program Progress"
            value="68%"
            subtitle="Target completion"
            icon={TrendingUp}
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Upload Beneficiaries", icon: Upload, desc: "CSV import" },
                { label: "Issue Vouchers", icon: Ticket, desc: "Bulk create" },
                { label: "Create Cooperative", icon: Building, desc: "New group" },
                { label: "Send SMS Blast", icon: MessageSquare, desc: "Mass notify" },
              ].map((action) => (
                <button 
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-center"
                >
                  <action.icon className="w-5 h-5 text-ngo mb-2" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                  <span className="text-xs text-muted-foreground">{action.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: "250 vouchers issued", detail: "Hargeisa district beneficiaries", time: "2 hours ago" },
                { action: "New cooperative created", detail: "Hope Farmers Group - 32 members", time: "Yesterday" },
                { action: "CSV import completed", detail: "124 new beneficiaries added", time: "2 days ago" },
                { action: "SMS campaign sent", detail: "Weather alert to 1,245 farmers", time: "3 days ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Beneficiary Distribution by State</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { state: "Maroodi Jeex", count: 1245, percent: 44 },
              { state: "Togdheer", count: 892, percent: 31 },
              { state: "Awdal", count: 710, percent: 25 },
            ].map((item) => (
              <div key={item.state} className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">{item.state}</p>
                <p className="text-2xl font-semibold text-foreground">{item.count.toLocaleString()}</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-ngo rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.percent}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
