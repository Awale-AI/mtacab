import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
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
  Download,
  TrendingUp,
  DollarSign,
  AlertCircle,
  FileText,
  Calendar,
  CreditCard
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

export default function BankReports() {
  const { toast } = useToast();

  const handleExportReports = () => {
    toast({
      title: "Exporting Reports",
      description: "Your reports are being prepared for download.",
    });
  };

  const handleDownloadReport = (reportTitle: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportTitle} is being downloaded.`,
    });
  };

  const handleViewRiskDetails = (riskLevel: string, loanCount: number) => {
    toast({
      title: `${riskLevel} Risk Loans`,
      description: `Viewing ${loanCount} loans in this risk category.`,
    });
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground">Portfolio performance and risk analysis</p>
          </div>
          <Button variant="outline" onClick={handleExportReports}>
            <Download className="w-4 h-4 mr-1" />
            Export Reports
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Portfolio Value"
            value="$2.43M"
            subtitle="Total outstanding"
            icon={DollarSign}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Repayment Rate"
            value="94.2%"
            subtitle="On-time payments"
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="Default Rate"
            value="2.1%"
            subtitle="Below 5% threshold"
            icon={AlertCircle}
            variant="info"
          />
          <StatCard
            title="Disbursed (YTD)"
            value="$1.8M"
            subtitle="1,245 loans"
            icon={CreditCard}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Disbursements */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Monthly Disbursements</h2>
            <div className="h-48 flex items-end gap-3 px-2">
              {[
                { month: "Jul", value: 65 },
                { month: "Aug", value: 75 },
                { month: "Sep", value: 85 },
                { month: "Oct", value: 70 },
                { month: "Nov", value: 90 },
                { month: "Dec", value: 80 },
              ].map((item) => (
                <div 
                  key={item.month} 
                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => toast({ title: `${item.month} Disbursements`, description: `$${Math.round(item.value * 3000)} disbursed` })}
                >
                  <div 
                    className="w-full bg-bank rounded-t-lg hover:opacity-80 transition-opacity"
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio by Product */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Portfolio Distribution</h2>
            <div className="space-y-4">
              {[
                { product: "Input Loans", percent: 28, value: "$684K" },
                { product: "Equipment Finance", percent: 31, value: "$756K" },
                { product: "Seasonal Credit", percent: 26, value: "$634K" },
                { product: "Cooperative Loans", percent: 15, value: "$354K" },
              ].map((item) => (
                <div 
                  key={item.product}
                  className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                  onClick={() => toast({ title: item.product, description: `${item.value} outstanding (${item.percent}% of portfolio)` })}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.product}</span>
                    <span className="text-muted-foreground">{item.value} ({item.percent}%)</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-bank rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Risk Analysis</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div 
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleViewRiskDetails("Low", 972)}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-white">78%</span>
              </div>
              <p className="font-medium text-foreground">Low Risk</p>
              <p className="text-sm text-muted-foreground">972 loans</p>
            </div>
            <div 
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleViewRiskDetails("Medium", 224)}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-white">18%</span>
              </div>
              <p className="font-medium text-foreground">Medium Risk</p>
              <p className="text-sm text-muted-foreground">224 loans</p>
            </div>
            <div 
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleViewRiskDetails("High", 49)}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-white">4%</span>
              </div>
              <p className="font-medium text-foreground">High Risk</p>
              <p className="text-sm text-muted-foreground">49 loans</p>
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Available Reports</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Portfolio Summary", desc: "Complete loan overview", period: "Monthly" },
              { title: "Risk Assessment", desc: "Default probability analysis", period: "Weekly" },
              { title: "Repayment Report", desc: "Collection performance", period: "Weekly" },
              { title: "Disbursement Report", desc: "New loans issued", period: "Daily" },
              { title: "Delinquency Report", desc: "Overdue accounts", period: "Daily" },
              { title: "Regulatory Report", desc: "Compliance documentation", period: "Quarterly" },
            ].map((report) => (
              <div 
                key={report.title} 
                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toast({ title: report.title, description: `Opening ${report.title.toLowerCase()} for viewing.` })}
              >
                <FileText className="w-5 h-5 text-bank mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{report.title}</h3>
                  <p className="text-xs text-muted-foreground">{report.desc}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{report.period}</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); handleDownloadReport(report.title); }}
                >
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}