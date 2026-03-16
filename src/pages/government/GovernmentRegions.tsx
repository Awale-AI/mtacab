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
  Building2,
  Sprout,
  TrendingUp,
  Download,
  Eye
} from "lucide-react";

const navItems = [
  { label: "National Overview", href: "/government", icon: LayoutDashboard },
  { label: "Regional Data", href: "/government/regions", icon: MapPin },
  { label: "Farmer Statistics", href: "/government/farmers", icon: Users },
  { label: "Program Monitoring", href: "/government/programs", icon: BarChart3 },
  { label: "Policy Reports", href: "/government/reports", icon: FileText },
];

const regions = [
  { name: "Maroodi Jeex", capital: "Hargeisa", farmers: 22340, cooperatives: 156, hectares: 89000, mainCrops: "Maize, Sorghum", growth: 22, activePrograms: 8, totalBudget: "$3.2M" },
  { name: "Togdheer", capital: "Burao", farmers: 18450, cooperatives: 124, hectares: 75000, mainCrops: "Sorghum, Livestock", growth: 18, activePrograms: 6, totalBudget: "$2.8M" },
  { name: "Awdal", capital: "Borama", farmers: 15680, cooperatives: 98, hectares: 56000, mainCrops: "Fruits, Vegetables", growth: 15, activePrograms: 5, totalBudget: "$2.1M" },
  { name: "Sanaag", capital: "Erigavo", farmers: 12450, cooperatives: 87, hectares: 42000, mainCrops: "Frankincense, Livestock", growth: 12, activePrograms: 4, totalBudget: "$1.8M" },
  { name: "Sahil", capital: "Berbera", farmers: 8920, cooperatives: 65, hectares: 28000, mainCrops: "Fishing, Livestock", growth: 10, activePrograms: 3, totalBudget: "$1.2M" },
  { name: "Sool", capital: "Las Anod", farmers: 10230, cooperatives: 72, hectares: 38000, mainCrops: "Livestock, Sorghum", growth: 14, activePrograms: 4, totalBudget: "$1.6M" },
  { name: "Banadir", capital: "Mogadishu", farmers: 19870, cooperatives: 134, hectares: 45000, mainCrops: "Vegetables, Fruits", growth: 20, activePrograms: 10, totalBudget: "$4.5M" },
  { name: "Lower Shabelle", capital: "Marka", farmers: 14230, cooperatives: 92, hectares: 78000, mainCrops: "Maize, Sesame", growth: 16, activePrograms: 7, totalBudget: "$3.0M" },
];

export default function GovernmentRegions() {
  const { toast } = useToast();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<typeof regions[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleViewRegion = (region: typeof regions[0]) => {
    setSelectedRegion(region);
    setDetailsOpen(true);
  };

  const handleExportRegionData = () => {
    toast({
      title: "Export Started",
      description: "Regional data export initiated. Download will begin shortly.",
    });
  };

  const handleMapClick = () => {
    toast({
      title: "Interactive Map",
      description: "Map interaction coming soon. Click on region cards below for detailed data.",
    });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing regions sorted by ${filter}.`,
    });
  };

  const handleDownloadRegionReport = () => {
    if (selectedRegion) {
      toast({
        title: "Report Download",
        description: `Downloading ${selectedRegion.name} regional report...`,
      });
      setDetailsOpen(false);
    }
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
            <h1 className="text-2xl font-heading font-semibold text-foreground">Regional Data</h1>
            <p className="text-sm text-muted-foreground">Agricultural statistics by administrative region</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportRegionData}>
            <Download className="w-4 h-4 mr-1" />
            Export All
          </Button>
        </div>

        {/* Map Placeholder */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Somalia Agricultural Regions</h2>
          <div 
            className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={handleMapClick}
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 text-government/50 mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map showing regional agricultural data</p>
              <p className="text-xs text-muted-foreground">Click on regions to view detailed statistics</p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {["all", "farmers", "cooperatives", "growth"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 text-sm rounded-full capitalize ${
                activeFilter === filter 
                  ? "bg-government text-government-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter === "all" ? "All Regions" : `By ${filter}`}
            </button>
          ))}
        </div>

        {/* Regional Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {regions.map((region) => (
            <div 
              key={region.name} 
              className="bg-card border rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewRegion(region)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{region.name}</h3>
                  <p className="text-xs text-muted-foreground">{region.capital}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +{region.growth}%
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" /> Farmers
                  </span>
                  <span className="font-medium text-foreground">{region.farmers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" /> Cooperatives
                  </span>
                  <span className="font-medium text-foreground">{region.cooperatives}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" /> Hectares
                  </span>
                  <span className="font-medium text-foreground">{region.hectares.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">Main Crops</p>
                <p className="text-sm font-medium text-foreground">{region.mainCrops}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regional Comparison */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Farmer Distribution by Region</h2>
          <div className="space-y-3">
            {regions.slice(0, 6).map((region) => {
              const maxFarmers = Math.max(...regions.map(r => r.farmers));
              const percent = (region.farmers / maxFarmers) * 100;
              return (
                <div 
                  key={region.name}
                  className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                  onClick={() => handleViewRegion(region)}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{region.name}</span>
                    <span className="text-muted-foreground">{region.farmers.toLocaleString()} farmers</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-government rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Region Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRegion?.name} Region</DialogTitle>
            <DialogDescription>Capital: {selectedRegion?.capital}</DialogDescription>
          </DialogHeader>
          {selectedRegion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Users className="w-5 h-5 text-government mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedRegion.farmers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Farmers</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Building2 className="w-5 h-5 text-government mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedRegion.cooperatives}</p>
                  <p className="text-xs text-muted-foreground">Cooperatives</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <MapPin className="w-5 h-5 text-government mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">{selectedRegion.hectares.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Hectares</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">+{selectedRegion.growth}%</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Main Crops</span>
                  <span className="font-medium">{selectedRegion.mainCrops}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Active Programs</span>
                  <span className="font-medium">{selectedRegion.activePrograms}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-medium text-government">{selectedRegion.totalBudget}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleDownloadRegionReport}>
                  <Download className="w-4 h-4 mr-1" />
                  Download Report
                </Button>
                <Button variant="government" className="flex-1" onClick={() => setDetailsOpen(false)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
