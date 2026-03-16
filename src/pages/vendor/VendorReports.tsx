import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Package, 
  Ticket, 
  ShoppingBag, 
  BarChart3,
  Download,
  TrendingUp,
  DollarSign,
  FileText,
  Calendar
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "Product Catalog", href: "/vendor/products", icon: Package },
  { label: "Voucher Redemption", href: "/vendor/redemptions", icon: Ticket },
  { label: "Sales & Orders", href: "/vendor/sales", icon: ShoppingBag },
  { label: "Reports & Analytics", href: "/vendor/reports", icon: BarChart3 },
];

export default function VendorReports() {
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

  const handleViewReport = (reportTitle: string) => {
    toast({
      title: "Opening Report",
      description: `Opening ${reportTitle} for viewing.`,
    });
  };

  return (
    <PortalLayout 
      title="Vendor Portal" 
      role="vendor" 
      navItems={navItems}
      userName="Ahmed Hassan"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Reports & Analytics</h1>
            <p className="text-sm text-muted-foreground">Business insights and performance metrics</p>
          </div>
          <Button variant="outline" onClick={handleExportReports}>
            <Download className="w-4 h-4 mr-1" />
            Export Reports
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$45,890"
            subtitle="Year to date"
            icon={DollarSign}
            trend={{ value: 23, positive: true }}
          />
          <StatCard
            title="Vouchers Processed"
            value="1,245"
            subtitle="Year to date"
            icon={Ticket}
            variant="success"
          />
          <StatCard
            title="Growth Rate"
            value="+18%"
            subtitle="vs. last quarter"
            icon={TrendingUp}
            variant="info"
          />
          <StatCard
            title="Avg. Transaction"
            value="$68"
            subtitle="All channels"
            icon={ShoppingBag}
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Monthly Revenue</h2>
            <div className="h-48 flex items-end gap-3 px-2">
              {[
                { month: "Jul", value: 75 },
                { month: "Aug", value: 85 },
                { month: "Sep", value: 60 },
                { month: "Oct", value: 90 },
                { month: "Nov", value: 95 },
                { month: "Dec", value: 80 },
              ].map((item) => (
                <div 
                  key={item.month} 
                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => toast({ title: `${item.month} Revenue`, description: `$${Math.round(item.value * 500)} in revenue` })}
                >
                  <div 
                    className="w-full bg-vendor rounded-t-lg hover:opacity-80 transition-opacity"
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Category Performance */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Sales by Category</h2>
            <div className="space-y-4">
              {[
                { category: "Seeds", percent: 45, amount: "$20,650" },
                { category: "Fertilizers", percent: 30, amount: "$13,767" },
                { category: "Pesticides", percent: 15, amount: "$6,884" },
                { category: "Equipment", percent: 10, amount: "$4,589" },
              ].map((item) => (
                <div 
                  key={item.category}
                  className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                  onClick={() => toast({ title: item.category, description: `${item.amount} (${item.percent}% of sales)` })}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.category}</span>
                    <span className="text-muted-foreground">{item.amount} ({item.percent}%)</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-vendor rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Available Reports</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Sales Summary", desc: "Complete sales breakdown", period: "Monthly" },
              { title: "Voucher Report", desc: "All voucher transactions", period: "Weekly" },
              { title: "Inventory Report", desc: "Stock levels & movements", period: "Daily" },
              { title: "Customer Analysis", desc: "Buying patterns & trends", period: "Quarterly" },
              { title: "Financial Statement", desc: "Revenue & settlements", period: "Monthly" },
              { title: "Product Performance", desc: "Best & worst sellers", period: "Monthly" },
            ].map((report) => (
              <div 
                key={report.title} 
                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleViewReport(report.title)}
              >
                <FileText className="w-5 h-5 text-vendor mt-0.5" />
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