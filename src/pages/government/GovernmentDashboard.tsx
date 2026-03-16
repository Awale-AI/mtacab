import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
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
  Landmark,
  TrendingUp,
  Globe,
  Eye,
  ExternalLink,
  Download
} from "lucide-react";

const navItems = [
  { label: "National Overview", href: "/government", icon: LayoutDashboard },
  { label: "Regional Data", href: "/government/regions", icon: MapPin },
  { label: "Farmer Statistics", href: "/government/farmers", icon: Users },
  { label: "Program Monitoring", href: "/government/programs", icon: BarChart3 },
  { label: "Policy Reports", href: "/government/reports", icon: FileText },
];

const regions = [
  { region: "Banadir", farmers: 18450, cooperatives: 124, programs: 12 },
  { region: "Middle Shabelle", farmers: 22340, cooperatives: 156, programs: 15 },
  { region: "Lower Shabelle", farmers: 19870, cooperatives: 134, programs: 11 },
  { region: "Bay", farmers: 15680, cooperatives: 98, programs: 9 },
  { region: "Hiiraan", farmers: 12450, cooperatives: 87, programs: 8 },
  { region: "Lower Jubba", farmers: 14230, cooperatives: 92, programs: 10 },
];

const programs = [
  { name: "Sustainable Agriculture Initiative", partner: "World Food Programme", regions: "Bay, Hiiraan", beneficiaries: 12450, progress: 72 },
  { name: "Smallholder Farmer Support", partner: "FAO Somalia", regions: "Lower Shabelle", beneficiaries: 8920, progress: 65 },
  { name: "Climate-Smart Agriculture", partner: "USAID", regions: "Middle Shabelle", beneficiaries: 6780, progress: 48 },
  { name: "Women in Agriculture", partner: "UN Women", regions: "Banadir, Bay", beneficiaries: 4560, progress: 85 },
];

export default function GovernmentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [regionDialogOpen, setRegionDialogOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<typeof regions[0] | null>(null);
  const [programDialogOpen, setProgramDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  const handleViewRegion = (region: typeof regions[0]) => {
    setSelectedRegion(region);
    setRegionDialogOpen(true);
  };

  const handleViewProgram = (program: typeof programs[0]) => {
    setSelectedProgram(program);
    setProgramDialogOpen(true);
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "National statistics are being exported. Download will begin shortly.",
    });
  };

  const handleViewFullReport = () => {
    toast({
      title: "Report Loading",
      description: "Opening full TACAB impact report...",
    });
    navigate("/government/reports");
  };

  return (
    <PortalLayout 
      title="Government Portal" 
      role="government" 
      navItems={navItems}
      userName="Minister's Office"
    >
      <div className="space-y-6">
        {/* Read-Only Notice */}
        <div className="bg-government/5 border border-government/20 rounded-xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-government" />
              <div>
                <h3 className="font-medium text-foreground">Read-Only Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  This portal provides view-only access to national agricultural statistics and program monitoring.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* National Header */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-government/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-government" />
            </div>
            <div>
              <span className="text-xs font-medium text-government uppercase tracking-wider">Ministry of Agriculture</span>
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                TACAB National Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">Federal Republic of Somalia • Agricultural Development</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" /> Last updated: Jan 10, 2024, 09:00 AM
            </span>
          </div>
        </div>

        {/* Key National Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Registered Farmers"
            value="124,567"
            subtitle="National total"
            icon={Users}
            trend={{ value: 15, positive: true }}
          />
          <StatCard
            title="Active Cooperatives"
            value="892"
            subtitle="Across all regions"
            icon={Building2}
            variant="success"
          />
          <StatCard
            title="Program Beneficiaries"
            value="45,890"
            subtitle="Current quarter"
            icon={Sprout}
            variant="info"
          />
          <StatCard
            title="Credit Facilitated"
            value="$12.4M"
            subtitle="Year to date"
            icon={Landmark}
          />
        </div>

        {/* Regional Overview */}
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Regional Distribution</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/government/regions")}>
              View All <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((item) => (
              <div 
                key={item.region} 
                className="bg-muted/30 rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleViewRegion(item)}
              >
                <h4 className="font-medium text-foreground mb-3">{item.region}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Farmers</span>
                    <span className="font-medium text-foreground">{item.farmers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cooperatives</span>
                    <span className="font-medium text-foreground">{item.cooperatives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Programs</span>
                    <span className="font-medium text-foreground">{item.programs}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Farmer Registration Trend */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Farmer Registration Trend (Monthly)</h2>
            <div className="h-48 flex items-end gap-3 px-2">
              {[
                { month: "Jul", value: 55 },
                { month: "Aug", value: 65 },
                { month: "Sep", value: 75 },
                { month: "Oct", value: 85 },
                { month: "Nov", value: 90 },
                { month: "Dec", value: 95 },
              ].map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-government rounded-t-lg cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ height: `${item.value}%` }}
                    onClick={() => {
                      toast({
                        title: `${item.month} Statistics`,
                        description: `${item.value * 100} new farmers registered in ${item.month}.`,
                      });
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Program Distribution */}
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Program Distribution</h2>
            <div className="space-y-4">
              {[
                { type: "Input Subsidies (NGO)", percent: 35, count: 28 },
                { type: "Credit Programs (Bank)", percent: 25, count: 18 },
                { type: "Market Linkages (Buyer)", percent: 22, count: 15 },
                { type: "Extension Services (Govt)", percent: 18, count: 12 },
              ].map((item) => (
                <div 
                  key={item.type} 
                  className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                  onClick={() => {
                    toast({
                      title: item.type,
                      description: `${item.count} active programs representing ${item.percent}% of total initiatives.`,
                    });
                  }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.type}</span>
                    <span className="text-muted-foreground">{item.count} programs</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-government rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Programs Summary */}
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Major Active Programs</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/government/programs")}>
              View All <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Program</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Partner</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Regions</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Beneficiaries</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Progress</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.name} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="py-3 px-2 font-medium text-foreground">{program.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{program.partner}</td>
                    <td className="py-3 px-2 text-muted-foreground">{program.regions}</td>
                    <td className="py-3 px-2 text-foreground">{program.beneficiaries.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-government rounded-full"
                            style={{ width: `${program.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{program.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewProgram(program)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Impact */}
        <div className="bg-government/5 border border-government/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">📈 TACAB Platform Impact</h3>
            <Button variant="government" size="sm" onClick={handleViewFullReport}>
              View Full Report
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast({ title: "Farmer Market Access", description: "35% increase in farmers accessing formal markets through the TACAB platform." })}>
              <TrendingUp className="w-8 h-8 text-government mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">+35%</p>
              <p className="text-xs text-muted-foreground">Farmer Market Access</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast({ title: "Credit Facilitated", description: "$12.4M in agricultural credit facilitated through partner banks." })}>
              <Landmark className="w-8 h-8 text-government mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">$12.4M</p>
              <p className="text-xs text-muted-foreground">Credit Facilitated</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast({ title: "Cooperatives Formed", description: "892 farmer cooperatives established and registered on the platform." })}>
              <Users className="w-8 h-8 text-government mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">892</p>
              <p className="text-xs text-muted-foreground">Cooperatives Formed</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast({ title: "Input Adoption Rate", description: "28% increase in improved seed and fertilizer adoption among registered farmers." })}>
              <Sprout className="w-8 h-8 text-government mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">+28%</p>
              <p className="text-xs text-muted-foreground">Input Adoption Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Region Details Dialog */}
      <Dialog open={regionDialogOpen} onOpenChange={setRegionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRegion?.region} Region</DialogTitle>
            <DialogDescription>Detailed statistics for this region</DialogDescription>
          </DialogHeader>
          {selectedRegion && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{selectedRegion.farmers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Farmers</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{selectedRegion.cooperatives}</p>
                  <p className="text-xs text-muted-foreground">Cooperatives</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{selectedRegion.programs}</p>
                  <p className="text-xs text-muted-foreground">Programs</p>
                </div>
              </div>
              <Button className="w-full" variant="government" onClick={() => { setRegionDialogOpen(false); navigate("/government/regions"); }}>
                View Full Regional Data
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Program Details Dialog */}
      <Dialog open={programDialogOpen} onOpenChange={setProgramDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProgram?.name}</DialogTitle>
            <DialogDescription>Partner: {selectedProgram?.partner}</DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Regions</span>
                  <span className="font-medium">{selectedProgram.regions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Beneficiaries</span>
                  <span className="font-medium">{selectedProgram.beneficiaries.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{selectedProgram.progress}%</span>
                </div>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-government rounded-full"
                  style={{ width: `${selectedProgram.progress}%` }}
                />
              </div>
              <Button className="w-full" variant="government" onClick={() => { setProgramDialogOpen(false); navigate("/government/programs"); }}>
                View All Programs
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
