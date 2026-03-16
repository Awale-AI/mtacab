import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatusBadge } from "@/components/StatusBadge";
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
  Calendar,
  DollarSign,
  Target,
  Download,
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

const programs = [
  {
    name: "Sustainable Agriculture Initiative",
    partner: "World Food Programme",
    type: "Input Subsidy",
    regions: ["Bay", "Hiiraan"],
    startDate: "Jan 2024",
    endDate: "Dec 2025",
    budget: "$4.5M",
    beneficiaries: { target: 15000, actual: 12450 },
    progress: 72,
    status: "active",
    description: "Providing sustainable agricultural inputs and training to smallholder farmers in drought-affected regions."
  },
  {
    name: "Smallholder Farmer Support",
    partner: "FAO Somalia",
    type: "Capacity Building",
    regions: ["Lower Shabelle"],
    startDate: "Mar 2024",
    endDate: "Feb 2026",
    budget: "$3.2M",
    beneficiaries: { target: 12000, actual: 8920 },
    progress: 65,
    status: "active",
    description: "Building capacity of smallholder farmers through training, extension services, and market linkages."
  },
  {
    name: "Climate-Smart Agriculture",
    partner: "USAID",
    type: "Technology Transfer",
    regions: ["Middle Shabelle"],
    startDate: "Jun 2024",
    endDate: "May 2027",
    budget: "$6.8M",
    beneficiaries: { target: 20000, actual: 6780 },
    progress: 48,
    status: "active",
    description: "Introducing climate-resilient farming techniques and drought-tolerant crop varieties."
  },
  {
    name: "Women in Agriculture",
    partner: "UN Women",
    type: "Livelihood Support",
    regions: ["Banadir", "Bay"],
    startDate: "Sep 2023",
    endDate: "Aug 2025",
    budget: "$2.1M",
    beneficiaries: { target: 5000, actual: 4560 },
    progress: 85,
    status: "active",
    description: "Empowering women farmers through skills training, access to finance, and market opportunities."
  },
  {
    name: "Agricultural Finance Access",
    partner: "IFC / World Bank",
    type: "Credit Facility",
    regions: ["All Regions"],
    startDate: "Jan 2024",
    endDate: "Dec 2026",
    budget: "$12.4M",
    beneficiaries: { target: 8000, actual: 3245 },
    progress: 40,
    status: "active",
    description: "Facilitating access to agricultural credit for farmers and cooperatives through partner banks."
  },
];

const programTypes = [
  { type: "Input Subsidies", count: 12, budget: "$18.5M" },
  { type: "Capacity Building", count: 8, budget: "$12.3M" },
  { type: "Market Linkages", count: 5, budget: "$8.2M" },
  { type: "Credit Facilities", count: 3, budget: "$6.2M" },
];

export default function GovernmentPrograms() {
  const { toast } = useToast();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleViewProgram = (program: typeof programs[0]) => {
    setSelectedProgram(program);
    setDetailsOpen(true);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter === "all" ? "all programs" : `${filter} programs`}.`,
    });
  };

  const handleExportPrograms = () => {
    toast({
      title: "Export Started",
      description: "Program data export initiated. Download will begin shortly.",
    });
  };

  const handleDownloadProgramReport = () => {
    if (selectedProgram) {
      toast({
        title: "Report Download",
        description: `Downloading ${selectedProgram.name} detailed report...`,
      });
      setDetailsOpen(false);
    }
  };

  const handleViewPartnerDetails = () => {
    if (selectedProgram) {
      toast({
        title: "Partner Information",
        description: `Opening details for ${selectedProgram.partner}...`,
      });
    }
  };

  const handleProgramTypeClick = (type: typeof programTypes[0]) => {
    toast({
      title: type.type,
      description: `${type.count} programs with total budget of ${type.budget}.`,
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
            <h1 className="text-2xl font-heading font-semibold text-foreground">Program Monitoring</h1>
            <p className="text-sm text-muted-foreground">Track agricultural development programs and initiatives</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleFilterChange(activeFilter)}>
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPrograms}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            className="bg-card border rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => toast({ title: "Active Programs", description: "28 programs currently active across all regions." })}
          >
            <p className="text-3xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">Active Programs</p>
          </div>
          <div 
            className="bg-card border rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => toast({ title: "Total Budget", description: "$45.2M allocated across all active programs." })}
          >
            <p className="text-3xl font-bold text-government">$45.2M</p>
            <p className="text-sm text-muted-foreground">Total Budget</p>
          </div>
          <div 
            className="bg-card border rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => toast({ title: "Beneficiaries Reached", description: "45,890 farmers benefited from programs this quarter." })}
          >
            <p className="text-3xl font-bold text-foreground">45,890</p>
            <p className="text-sm text-muted-foreground">Beneficiaries Reached</p>
          </div>
          <div 
            className="bg-card border rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => toast({ title: "Average Completion", description: "Programs are 68% complete on average." })}
          >
            <p className="text-3xl font-bold text-green-600">68%</p>
            <p className="text-sm text-muted-foreground">Avg. Completion</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {["all", "Input Subsidy", "Capacity Building", "Technology Transfer", "Credit Facility"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 text-sm rounded-full ${
                activeFilter === filter 
                  ? "bg-government text-government-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter === "all" ? "All Programs" : filter}
            </button>
          ))}
        </div>

        {/* Program Cards */}
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program.name} className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{program.name}</h3>
                    <StatusBadge status="active" />
                  </div>
                  <p className="text-sm text-muted-foreground">{program.partner} • {program.type}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {program.startDate} - {program.endDate}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-government">
                    <DollarSign className="w-4 h-4" />
                    {program.budget}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => handleViewProgram(program)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Regions</p>
                  <div className="flex flex-wrap gap-1">
                    {program.regions.map((region) => (
                      <span key={region} className="text-xs px-2 py-0.5 rounded-full bg-muted text-foreground">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target Beneficiaries</p>
                  <p className="font-semibold text-foreground">{program.beneficiaries.target.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Actual Beneficiaries</p>
                  <p className="font-semibold text-government">{program.beneficiaries.actual.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Achievement Rate</p>
                  <p className="font-semibold text-foreground">
                    {Math.round((program.beneficiaries.actual / program.beneficiaries.target) * 100)}%
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium text-foreground">{program.progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-government rounded-full transition-all"
                    style={{ width: `${program.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Program Types Distribution */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Programs by Type</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programTypes.map((item) => (
              <div 
                key={item.type} 
                className="bg-muted/30 rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleProgramTypeClick(item)}
              >
                <h4 className="font-medium text-foreground mb-2">{item.type}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Programs</span>
                  <span className="font-medium text-foreground">{item.count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="font-medium text-government">{item.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.name}</DialogTitle>
            <DialogDescription>Partner: {selectedProgram?.partner}</DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{selectedProgram.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{selectedProgram.type}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium text-government">{selectedProgram.budget}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium text-foreground">{selectedProgram.startDate} - {selectedProgram.endDate}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Progress</p>
                  <p className="font-medium text-foreground">{selectedProgram.progress}%</p>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Beneficiaries</span>
                  <span className="text-sm font-medium">
                    {selectedProgram.beneficiaries.actual.toLocaleString()} / {selectedProgram.beneficiaries.target.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-government rounded-full"
                    style={{ width: `${(selectedProgram.beneficiaries.actual / selectedProgram.beneficiaries.target) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleViewPartnerDetails}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Partner Details
                </Button>
                <Button variant="government" className="flex-1" onClick={handleDownloadProgramReport}>
                  <Download className="w-4 h-4 mr-1" />
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
