import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  BarChart3,
  FileText,
  Download,
  Calendar,
  Filter,
  Eye,
  ExternalLink
} from "lucide-react";

const navItems = [
  { label: "National Overview", href: "/government", icon: LayoutDashboard },
  { label: "Regional Data", href: "/government/regions", icon: MapPin },
  { label: "Farmer Statistics", href: "/government/farmers", icon: Users },
  { label: "Program Monitoring", href: "/government/programs", icon: BarChart3 },
  { label: "Policy Reports", href: "/government/reports", icon: FileText },
];

const reports = [
  { title: "National Agricultural Census 2024", category: "Census", date: "Jan 2024", pages: 245, format: "PDF", description: "Comprehensive survey of agricultural activity across all regions of Somalia.", size: "12.5 MB" },
  { title: "Q4 2024 Platform Performance", category: "Quarterly", date: "Jan 2024", pages: 48, format: "PDF", description: "Quarterly performance metrics and KPIs for the TACAB platform.", size: "3.2 MB" },
  { title: "Farmer Registration Trends", category: "Analytics", date: "Dec 2024", pages: 32, format: "PDF", description: "Analysis of farmer registration patterns and growth metrics.", size: "2.1 MB" },
  { title: "Regional Crop Production Report", category: "Production", date: "Dec 2024", pages: 56, format: "PDF", description: "Detailed crop production statistics by region and crop type.", size: "4.8 MB" },
  { title: "Agricultural Finance Summary", category: "Finance", date: "Nov 2024", pages: 28, format: "PDF", description: "Summary of agricultural financing activities and credit disbursements.", size: "1.9 MB" },
  { title: "Climate Impact Assessment", category: "Climate", date: "Nov 2024", pages: 64, format: "PDF", description: "Assessment of climate impacts on agricultural productivity.", size: "5.6 MB" },
  { title: "Cooperative Development Report", category: "Organization", date: "Oct 2024", pages: 42, format: "PDF", description: "Status and development of farmer cooperatives nationwide.", size: "3.4 MB" },
  { title: "Food Security Dashboard", category: "Security", date: "Oct 2024", pages: 36, format: "PDF", description: "Food security indicators and early warning metrics.", size: "2.8 MB" },
];

const categories = ["All Reports", "Census", "Quarterly", "Analytics", "Production", "Finance", "Climate"];

export default function GovernmentReports() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("All Reports");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);

  const filteredReports = activeCategory === "All Reports" 
    ? reports 
    : reports.filter(r => r.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast({
      title: "Filter Applied",
      description: `Showing ${category === "All Reports" ? "all reports" : `${category} reports`}.`,
    });
  };

  const handleViewReport = (report: typeof reports[0]) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  const handleDownloadReport = (report: typeof reports[0]) => {
    toast({
      title: "Download Started",
      description: `Downloading ${report.title}...`,
    });
  };

  const handleOpenInNewTab = () => {
    if (selectedReport) {
      toast({
        title: "Opening Report",
        description: `Opening ${selectedReport.title} in new tab...`,
      });
      setPreviewOpen(false);
    }
  };

  const handleDownloadFromPreview = () => {
    if (selectedReport) {
      handleDownloadReport(selectedReport);
      setPreviewOpen(false);
    }
  };

  const handleExportData = (format: string) => {
    toast({
      title: "Export Started",
      description: `Preparing ${format} export. Download will begin shortly.`,
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Advanced Filters",
      description: "Advanced filtering options coming soon.",
    });
  };

  return (
    <PortalLayout 
      title="Government Portal" 
      role="government" 
      navItems={navItems}
      userName="Minister's Office"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Policy Reports</h1>
            <p className="text-sm text-muted-foreground">Access national agricultural reports and publications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleFilterClick}>
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>

        {/* Report Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button 
              key={category}
              className={`px-4 py-2 text-sm rounded-full ${
                activeCategory === category 
                  ? "bg-government text-government-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredReports.map((report) => (
            <div key={report.title} className="bg-card border rounded-xl p-5 hover:shadow-lg transition-shadow">
              <div 
                className="w-full h-32 bg-muted/30 rounded-lg mb-4 flex items-center justify-center border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleViewReport(report)}
              >
                <FileText className="w-12 h-12 text-government/30" />
              </div>
              
              <span className="text-xs px-2 py-0.5 rounded-full bg-government/10 text-government">
                {report.category}
              </span>
              
              <h3 className="font-medium text-foreground mt-2 mb-1 line-clamp-2">{report.title}</h3>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar className="w-3 h-3" />
                {report.date}
                <span>•</span>
                <span>{report.pages} pages</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewReport(report)}>
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDownloadReport(report)}>
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Reports */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Featured Publications</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            <div 
              className="flex gap-4 p-4 bg-government/5 rounded-lg border border-government/20 cursor-pointer hover:bg-government/10 transition-colors"
              onClick={() => handleViewReport(reports[0])}
            >
              <div className="w-24 h-32 bg-government/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-government" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">National Agricultural Census 2024</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Comprehensive survey of agricultural activity across all regions of Somalia.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>245 pages</span>
                  <span>•</span>
                  <span>January 2024</span>
                </div>
                <Button variant="government" size="sm" onClick={(e) => { e.stopPropagation(); handleDownloadReport(reports[0]); }}>
                  <Download className="w-3 h-3 mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>

            <div 
              className="flex gap-4 p-4 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleViewReport(reports[1])}
            >
              <div className="w-24 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">Annual Performance Report 2024</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  TACAB platform performance metrics and agricultural sector achievements.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>128 pages</span>
                  <span>•</span>
                  <span>December 2024</span>
                </div>
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleDownloadReport(reports[1]); }}>
                  <Download className="w-3 h-3 mr-1" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="bg-government/5 border border-government/20 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3">📊 Data Export Options</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Export raw data for custom analysis and research purposes. Available in multiple formats.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={() => handleExportData("CSV")}>
              <Download className="w-4 h-4 mr-1" />
              Farmer Data (CSV)
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExportData("Excel")}>
              <Download className="w-4 h-4 mr-1" />
              Regional Stats (Excel)
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExportData("JSON")}>
              <Download className="w-4 h-4 mr-1" />
              Program Data (JSON)
            </Button>
          </div>
        </div>
      </div>

      {/* Report Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
            <DialogDescription>{selectedReport?.category} Report • {selectedReport?.date}</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center border">
                <FileText className="w-16 h-16 text-government/30" />
              </div>
              
              <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground">{selectedReport.pages}</p>
                  <p className="text-xs text-muted-foreground">Pages</p>
                </div>
                <div className="p-2 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground">{selectedReport.format}</p>
                  <p className="text-xs text-muted-foreground">Format</p>
                </div>
                <div className="p-2 bg-muted/30 rounded-lg">
                  <p className="font-semibold text-foreground">{selectedReport.size}</p>
                  <p className="text-xs text-muted-foreground">Size</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleOpenInNewTab}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open in New Tab
                </Button>
                <Button variant="government" className="flex-1" onClick={handleDownloadFromPreview}>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
