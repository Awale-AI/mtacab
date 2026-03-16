import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Search,
  ShoppingCart, 
  Truck, 
  BarChart3,
  Download,
  TrendingUp,
  Package,
  DollarSign,
  FileText,
  Calendar
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/buyer", icon: LayoutDashboard },
  { label: "Browse Produce", href: "/buyer/marketplace", icon: Search },
  { label: "My Orders", href: "/buyer/orders", icon: ShoppingCart },
  { label: "Logistics", href: "/buyer/logistics", icon: Truck },
  { label: "Reports", href: "/buyer/reports", icon: BarChart3 },
];

export default function BuyerReports() {
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

  const handleViewSupplier = (supplier: { name: string; volume: string }) => {
    toast({
      title: supplier.name,
      description: `Total volume: ${supplier.volume}. Click to view full profile.`,
    });
  };

  return (
    <PortalLayout 
      title="Buyer Portal" 
      role="buyer" 
      navItems={navItems}
      userName="Ibrahim Osman"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground">Procurement insights and performance metrics</p>
          </div>
          <Button variant="outline" onClick={handleExportReports}>
            <Download className="w-4 h-4 mr-1" />
            Export Reports
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Purchases"
            value="$245,000"
            subtitle="Year to date"
            icon={DollarSign}
            trend={{ value: 18, positive: true }}
          />
          <StatCard
            title="Tonnage Procured"
            value="580 MT"
            subtitle="Year to date"
            icon={Package}
            variant="success"
          />
          <StatCard
            title="Avg. Cost Savings"
            value="12%"
            subtitle="vs. market price"
            icon={TrendingUp}
            variant="info"
          />
          <StatCard
            title="Supplier Partners"
            value="24"
            subtitle="Active cooperatives"
            icon={ShoppingCart}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Procurement */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Monthly Procurement Volume</h2>
            <div className="h-48 flex items-end gap-3 px-2">
              {[
                { month: "Jul", value: 60 },
                { month: "Aug", value: 75 },
                { month: "Sep", value: 85 },
                { month: "Oct", value: 70 },
                { month: "Nov", value: 90 },
                { month: "Dec", value: 95 },
              ].map((item) => (
                <div 
                  key={item.month} 
                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => toast({ title: `${item.month} Procurement`, description: `${Math.round(item.value * 6)} MT procured` })}
                >
                  <div 
                    className="w-full bg-buyer rounded-t-lg hover:opacity-80 transition-opacity"
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Procurement by Crop */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Procurement by Crop</h2>
            <div className="space-y-4">
              {[
                { crop: "Maize", percent: 45, volume: "261 MT" },
                { crop: "Sorghum", percent: 25, volume: "145 MT" },
                { crop: "Sesame", percent: 18, volume: "104 MT" },
                { crop: "Cowpeas", percent: 12, volume: "70 MT" },
              ].map((item) => (
                <div 
                  key={item.crop}
                  className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                  onClick={() => toast({ title: item.crop, description: `${item.volume} procured (${item.percent}% of total)` })}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.crop}</span>
                    <span className="text-muted-foreground">{item.volume} ({item.percent}%)</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-buyer rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supplier Performance */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Top Performing Suppliers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Jowhar Farmers Coop", volume: "120 MT", rating: 4.8, onTime: "98%" },
              { name: "Bay Region Growers", volume: "85 MT", rating: 4.6, onTime: "95%" },
              { name: "Hiiraan United", volume: "65 MT", rating: 4.9, onTime: "100%" },
              { name: "Jubba Valley Farmers", volume: "55 MT", rating: 4.4, onTime: "92%" },
            ].map((supplier) => (
              <div 
                key={supplier.name} 
                className="bg-muted/30 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleViewSupplier(supplier)}
              >
                <h4 className="font-medium text-foreground mb-2">{supplier.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-medium text-foreground">{supplier.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium text-foreground">⭐ {supplier.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time</span>
                    <span className="font-medium text-green-600">{supplier.onTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Available Reports</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Procurement Summary", desc: "Monthly purchase breakdown", period: "Monthly" },
              { title: "Supplier Analysis", desc: "Performance & reliability", period: "Quarterly" },
              { title: "Price Trends", desc: "Market vs. actual prices", period: "Weekly" },
              { title: "Quality Reports", desc: "Grade distribution", period: "Per shipment" },
              { title: "Logistics Report", desc: "Delivery times & costs", period: "Monthly" },
              { title: "Financial Statement", desc: "Payments & settlements", period: "Monthly" },
            ].map((report) => (
              <div 
                key={report.title} 
                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toast({ title: report.title, description: `Opening ${report.title.toLowerCase()} for viewing.` })}
              >
                <FileText className="w-5 h-5 text-buyer mt-0.5" />
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