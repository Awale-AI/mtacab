import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Users, 
  Building,
  Ticket, 
  MessageSquare, 
  BarChart3,
  Download,
  TrendingUp,
  Calendar,
  FileText,
  UserPlus
} from "lucide-react";

const navItems = [
  { label: "Program Overview", href: "/ngo", icon: LayoutDashboard },
  { label: "Farmer Lookup", href: "/ngo/beneficiaries", icon: Users },
  { label: "Cooperatives & VSLAs", href: "/ngo/cooperatives", icon: Building },
  { label: "Vouchers & Subsidies", href: "/ngo/vouchers", icon: Ticket },
  { label: "Communications", href: "/ngo/communications", icon: MessageSquare },
  { label: "Monitoring & Reports", href: "/ngo/reports", icon: BarChart3 },
];

export default function NGOReports() {
  const { toast } = useToast();

  const handleExportFullReport = () => {
    toast({
      title: "Exporting Full Report",
      description: "Preparing comprehensive report for download.",
    });
  };

  const handleDownloadReport = (reportName: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportName} is being downloaded.`,
    });
  };

  return (
    <PortalLayout 
      title="NGO Portal" 
      role="ngo" 
      navItems={navItems}
      userName="Sarah Okonkwo"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Monitoring & Reports</h1>
            <p className="text-muted-foreground">Track program performance and generate reports</p>
          </div>
          <Button variant="ngo" onClick={handleExportFullReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Full Report
          </Button>
        </div>

        {/* Key Indicators */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Key Performance Indicators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Beneficiary Reach", value: "2,847", target: "3,000", percent: 95 },
              { label: "Voucher Redemption", value: "85.6%", target: "90%", percent: 95 },
              { label: "Cooperative Formation", value: "48", target: "50", percent: 96 },
              { label: "VSLA Participation", value: "72%", target: "80%", percent: 90 },
            ].map((kpi) => (
              <div 
                key={kpi.label} 
                className="bg-muted/30 rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toast({ title: kpi.label, description: `Current: ${kpi.value} / Target: ${kpi.target}` })}
              >
                <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-ngo rounded-full" style={{ width: `${kpi.percent}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Target: {kpi.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Beneficiary Registration Trend</h2>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div 
              className="h-48 bg-muted/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/40 transition-colors"
              onClick={() => toast({ title: "Chart View", description: "Opening detailed registration trend chart." })}
            >
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Monthly registration chart</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">Voucher Utilization</h2>
              <Calendar className="w-4 h-4 text-ngo" />
            </div>
            <div 
              className="h-48 bg-muted/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/40 transition-colors"
              onClick={() => toast({ title: "Chart View", description: "Opening voucher utilization breakdown." })}
            >
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Redemption by month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Available Reports</h2>
          <div className="space-y-3">
            {[
              { name: "Beneficiary Registry Export", desc: "Full list with demographics and status", format: "CSV/Excel" },
              { name: "Voucher Distribution Report", desc: "Issuance, redemption, and expiry data", format: "PDF" },
              { name: "Cooperative Performance", desc: "Member activity and VSLA metrics", format: "PDF" },
              { name: "Program Impact Summary", desc: "Key outcomes and donor metrics", format: "PDF" },
              { name: "Geographic Distribution", desc: "Beneficiaries by state and LGA", format: "Excel" },
            ].map((report) => (
              <div key={report.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-ngo" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{report.format}</span>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.name)}>
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donor Reporting Note */}
        <div className="bg-ngo/5 border border-ngo/20 rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-2">Donor Reporting</h3>
          <p className="text-sm text-muted-foreground">
            All reports are formatted for donor requirements. Data can be filtered by date range, 
            geographic area, or program component. Automated reports can be scheduled for quarterly delivery.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}