import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { VerificationBadge } from "@/components/governance/VerificationBadge";
import { UpgradeRequiredBanner } from "@/components/governance/UpgradeRequiredBanner";
import { UpgradeFlowDialog } from "@/components/governance/UpgradeFlowDialog";
import { 
  VerificationLevel, 
  logAuditEvent,
  PORTAL_PERMISSIONS,
  isFarmerUsable 
} from "@/lib/governance";
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  BarChart3,
  FileText,
  UserCheck,
  UserPlus,
  Building2,
  Sprout,
  Download,
  Filter,
  Eye,
  Search,
  ArrowUp,
  Shield,
  Lock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "National Overview", href: "/government", icon: LayoutDashboard },
  { label: "Regional Data", href: "/government/regions", icon: MapPin },
  { label: "Farmer Registry", href: "/government/farmers", icon: Users },
  { label: "Program Monitoring", href: "/government/programs", icon: BarChart3 },
  { label: "Policy Reports", href: "/government/reports", icon: FileText },
];

// Mock farmer data with verification levels
const mockFarmers = [
  { id: "FRM-A1B2C3", name: "Ahmed Hassan", phone: "+252634567890", verificationLevel: "B" as VerificationLevel, region: "Benadir", district: "Mogadishu", crops: ["Maize", "Sorghum"], registeredAt: "2024-08-15" },
  { id: "FRM-D4E5F6", name: "Fatima Ali", phone: "+252631234567", verificationLevel: "A" as VerificationLevel, region: "Bay", district: "Baidoa", crops: ["Sesame"], registeredAt: "2024-06-10" },
  { id: "FRM-G7H8I9", name: "Mohamed Omar", phone: "+252637890123", verificationLevel: "C" as VerificationLevel, region: "Hiiraan", district: "Beledweyne", crops: ["Cowpeas", "Maize"], registeredAt: "2024-11-20" },
  { id: "FRM-J1K2L3", name: "Halima Yusuf", phone: "+252635678901", verificationLevel: "B" as VerificationLevel, region: "Gedo", district: "Garbahaarrey", crops: ["Vegetables"], registeredAt: "2024-09-03" },
  { id: "FRM-M4N5O6", name: "Ibrahim Noor", phone: "+252632345678", verificationLevel: "B" as VerificationLevel, region: "Lower Shabelle", district: "Afgooye", crops: ["Maize", "Fruits"], registeredAt: "2024-07-22" },
  { id: "FRM-P7Q8R9", name: "Sahra Mohamed", phone: "+252638901234", verificationLevel: "C" as VerificationLevel, region: "Middle Shabelle", district: "Jowhar", crops: ["Sorghum"], registeredAt: "2024-12-01" },
];

const ageGroups = [
  { range: "18-25 years", percent: 15, count: 18685 },
  { range: "26-35 years", percent: 28, count: 34879 },
  { range: "36-45 years", percent: 32, count: 39861 },
  { range: "46-55 years", percent: 18, count: 22422 },
  { range: "56+ years", percent: 7, count: 8720 },
];

const farmSizes = [
  { category: "Smallholder (<2 ha)", percent: 65, count: 80968, description: "Small-scale farmers with less than 2 hectares" },
  { category: "Small (2-5 ha)", percent: 25, count: 31142, description: "Small farmers with 2-5 hectares" },
  { category: "Medium (5-10 ha)", percent: 8, count: 9965, description: "Medium-scale farmers with 5-10 hectares" },
  { category: "Large (>10 ha)", percent: 2, count: 2491, description: "Large-scale farmers with over 10 hectares" },
];

const crops = [
  { crop: "Maize", farmers: 45670, percent: 37 },
  { crop: "Sorghum", farmers: 32450, percent: 26 },
  { crop: "Sesame", farmers: 18900, percent: 15 },
  { crop: "Cowpeas", farmers: 12340, percent: 10 },
  { crop: "Fruits & Vegetables", farmers: 9870, percent: 8 },
  { crop: "Other", farmers: 5337, percent: 4 },
];

export default function GovernmentFarmers() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"registry" | "statistics">("registry");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  
  // Farmer details dialog
  const [selectedFarmer, setSelectedFarmer] = useState<typeof mockFarmers[0] | null>(null);
  const [farmerDialogOpen, setFarmerDialogOpen] = useState(false);
  
  // Upgrade flow
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [farmerToUpgrade, setFarmerToUpgrade] = useState<typeof mockFarmers[0] | null>(null);
  
  // Statistics dialogs
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof farmSizes[0] | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<typeof crops[0] | null>(null);

  // Filter farmers
  const filteredFarmers = mockFarmers.filter(farmer => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery) ||
      farmer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || farmer.verificationLevel === levelFilter;
    const matchesRegion = regionFilter === "all" || farmer.region === regionFilter;
    return matchesSearch && matchesLevel && matchesRegion;
  });

  const uniqueRegions = [...new Set(mockFarmers.map(f => f.region))];

  const handleViewFarmer = (farmer: typeof mockFarmers[0]) => {
    setSelectedFarmer(farmer);
    setFarmerDialogOpen(true);
    
    logAuditEvent({
      actor: "Ministry of Agriculture",
      actorOrganization: "Federal Government of Somalia",
      actorRole: "government",
      action: "farmer_search",
      farmerId: farmer.id,
      farmerMsisdn: farmer.phone,
      status: "success",
    });
  };

  const handleOpenUpgradeDialog = (farmer: typeof mockFarmers[0]) => {
    // Government can only do B → A upgrades
    if (farmer.verificationLevel !== "B") {
      toast({
        title: "Cannot Upgrade",
        description: farmer.verificationLevel === "A" 
          ? "This farmer is already at Level A (highest level)."
          : "Level C farmers must be upgraded to Level B first by an NGO or Bank.",
        variant: "destructive",
      });
      return;
    }
    setFarmerToUpgrade(farmer);
    setUpgradeDialogOpen(true);
  };

  const handleUpgradeComplete = () => {
    toast({
      title: "Upgrade Complete",
      description: `${farmerToUpgrade?.name} has been upgraded to Level A with formal ID verification.`,
    });
    setUpgradeDialogOpen(false);
    setFarmerDialogOpen(false);
    setFarmerToUpgrade(null);
  };

  const handleCertifyForScheme = (farmer: typeof mockFarmers[0]) => {
    if (farmer.verificationLevel !== "A") {
      toast({
        title: "Certification Requires Level A",
        description: "Only Level A farmers can be certified for government schemes.",
        variant: "destructive",
      });
      return;
    }
    
    logAuditEvent({
      actor: "Ministry of Agriculture",
      actorOrganization: "Federal Government of Somalia",
      actorRole: "government",
      action: "certification",
      farmerId: farmer.id,
      farmerMsisdn: farmer.phone,
      status: "success",
      evidence: "Government Agricultural Subsidy Program 2025",
    });
    
    toast({
      title: "Farmer Certified",
      description: `${farmer.name} has been certified for government agricultural programs.`,
    });
  };

  const handleExportData = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} data export initiated. Download will begin shortly.`,
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filter Options",
      description: "Advanced filtering options coming soon.",
    });
  };

  const handleViewFarmSize = (category: typeof farmSizes[0]) => {
    setSelectedCategory(category);
    setDetailsOpen(true);
  };

  const handleViewCrop = (crop: typeof crops[0]) => {
    setSelectedCrop(crop);
    setCropDialogOpen(true);
  };

  const handleAgeGroupClick = (group: typeof ageGroups[0]) => {
    toast({
      title: `Age Group: ${group.range}`,
      description: `${group.count.toLocaleString()} farmers (${group.percent}% of total) fall within this age range.`,
    });
  };

  const handleGenderClick = (gender: string, percent: number, count: number) => {
    toast({
      title: `${gender} Farmers`,
      description: `${count.toLocaleString()} ${gender.toLowerCase()} farmers represent ${percent}% of the total registered farmers.`,
    });
  };

  const handleChannelClick = (channel: string, percent: number) => {
    toast({
      title: `Registration via ${channel}`,
      description: `${percent}% of farmers registered through ${channel}.`,
    });
  };

  // Count farmers by level
  const levelCounts = {
    A: mockFarmers.filter(f => f.verificationLevel === "A").length,
    B: mockFarmers.filter(f => f.verificationLevel === "B").length,
    C: mockFarmers.filter(f => f.verificationLevel === "C").length,
  };

  return (
    <PortalLayout 
      title="Government Portal" 
      role="government" 
      navItems={navItems}
      userName="Ministry of Agriculture"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">National Farmer Registry</h1>
            <p className="text-sm text-muted-foreground">View and verify farmers for government schemes</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={activeTab === "registry" ? "government" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("registry")}
            >
              <Users className="w-4 h-4 mr-1" />
              Registry
            </Button>
            <Button 
              variant={activeTab === "statistics" ? "government" : "outline"} 
              size="sm"
              onClick={() => setActiveTab("statistics")}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Statistics
            </Button>
          </div>
        </div>

        {/* Governance Notice */}
        <div className="bg-government/5 border border-government/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-government mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Government Portal Permissions</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can view all farmers (Level C is read-only), perform B→A upgrades with formal ID verification, 
                and certify Level A farmers for government schemes. Registration and program operations are not permitted.
              </p>
            </div>
          </div>
        </div>

        {activeTab === "registry" ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Registered"
                value="124,567"
                subtitle="All levels"
                icon={Users}
              />
              <StatCard
                title="Level A (Strong ID)"
                value="45,230"
                subtitle="36% verified"
                icon={Shield}
                variant="success"
              />
              <StatCard
                title="Level B (Community)"
                value="52,890"
                subtitle="42% eligible"
                icon={UserCheck}
                variant="info"
              />
              <StatCard
                title="Level C (Starter)"
                value="26,447"
                subtitle="21% pending"
                icon={UserPlus}
              />
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="A">Level A</SelectItem>
                  <SelectItem value="B">Level B</SelectItem>
                  <SelectItem value="C">Level C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {uniqueRegions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => handleExportData("Farmer Registry")}>
                <Download className="w-4 h-4" />
              </Button>
            </div>

            {/* Farmer List */}
            <div className="bg-card border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Farmer ID</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Phone</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Level</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Region</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFarmers.map((farmer) => (
                      <tr 
                        key={farmer.id} 
                        className={cn(
                          "border-b hover:bg-muted/30 transition-colors",
                          farmer.verificationLevel === "C" && "opacity-60"
                        )}
                      >
                        <td className="p-4 text-sm font-mono text-foreground">{farmer.id}</td>
                        <td className="p-4 text-sm text-foreground">{farmer.name}</td>
                        <td className="p-4 text-sm text-muted-foreground">{farmer.phone}</td>
                        <td className="p-4">
                          <VerificationBadge level={farmer.verificationLevel} size="sm" />
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{farmer.region}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewFarmer(farmer)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {farmer.verificationLevel === "B" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-government border-government/50 hover:bg-government/10"
                                onClick={() => handleOpenUpgradeDialog(farmer)}
                              >
                                <ArrowUp className="w-4 h-4 mr-1" />
                                Upgrade to A
                              </Button>
                            )}
                            {farmer.verificationLevel === "A" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600"
                                onClick={() => handleCertifyForScheme(farmer)}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Certify
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredFarmers.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No farmers found matching your criteria.
                </div>
              )}
            </div>
          </>
        ) : (
          /* Statistics Tab */
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Registered"
                value="124,567"
                subtitle="All-time"
                icon={Users}
                trend={{ value: 15, positive: true }}
              />
              <StatCard
                title="Active Farmers"
                value="98,450"
                subtitle="Platform active"
                icon={UserCheck}
                variant="success"
              />
              <StatCard
                title="New This Quarter"
                value="12,340"
                subtitle="Q4 2024"
                icon={UserPlus}
                variant="info"
              />
              <StatCard
                title="Cooperative Members"
                value="67,890"
                subtitle="54% of total"
                icon={Building2}
              />
            </div>

            {/* Demographics */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Gender Distribution */}
              <div className="bg-card border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Gender Distribution</h2>
                  <Button variant="ghost" size="sm" onClick={() => handleExportData("Gender")}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-8 py-4">
                  <div 
                    className="text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleGenderClick("Male", 62, 77232)}
                  >
                    <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-blue-600">62%</span>
                    </div>
                    <p className="font-medium text-foreground">Male</p>
                    <p className="text-sm text-muted-foreground">77,232</p>
                  </div>
                  <div 
                    className="text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleGenderClick("Female", 38, 47335)}
                  >
                    <div className="w-24 h-24 rounded-full bg-pink-500/20 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-pink-600">38%</span>
                    </div>
                    <p className="font-medium text-foreground">Female</p>
                    <p className="text-sm text-muted-foreground">47,335</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Women farmer representation has increased 8% year-over-year
                </p>
              </div>

              {/* Age Distribution */}
              <div className="bg-card border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Age Distribution</h2>
                  <Button variant="ghost" size="sm" onClick={() => handleExportData("Age Demographics")}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {ageGroups.map((item) => (
                    <div 
                      key={item.range}
                      className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                      onClick={() => handleAgeGroupClick(item)}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{item.range}</span>
                        <span className="text-muted-foreground">{item.count.toLocaleString()} ({item.percent}%)</span>
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

            {/* Farm Size Distribution */}
            <div className="bg-card border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Farm Size Categories</h2>
                <Button variant="ghost" size="sm" onClick={() => handleExportData("Farm Size")}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {farmSizes.map((item) => (
                  <div 
                    key={item.category} 
                    className="bg-muted/30 rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleViewFarmSize(item)}
                  >
                    <Sprout className="w-8 h-8 text-government mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{item.percent}%</p>
                    <p className="text-sm font-medium text-foreground">{item.category}</p>
                    <p className="text-xs text-muted-foreground">{item.count.toLocaleString()} farmers</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Crop Preferences */}
            <div className="bg-card border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Primary Crop Distribution</h2>
                <Button variant="ghost" size="sm" onClick={() => handleExportData("Crop Distribution")}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {crops.map((item) => (
                  <div 
                    key={item.crop} 
                    className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleViewCrop(item)}
                  >
                    <div className="w-12 h-12 rounded-lg bg-government/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-government">{item.percent}%</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.crop}</p>
                      <p className="text-sm text-muted-foreground">{item.farmers.toLocaleString()} farmers</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Channels */}
            <div className="bg-government/5 border border-government/20 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">📱 Registration Channels</h3>
                <Button variant="ghost" size="sm" onClick={() => handleExportData("Registration Channels")}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div 
                  className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleChannelClick("USSD", 58)}
                >
                  <p className="text-2xl font-bold text-foreground">58%</p>
                  <p className="text-sm text-muted-foreground">Via USSD</p>
                </div>
                <div 
                  className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleChannelClick("NGO Field Registration", 32)}
                >
                  <p className="text-2xl font-bold text-foreground">32%</p>
                  <p className="text-sm text-muted-foreground">NGO Field Registration</p>
                </div>
                <div 
                  className="bg-background rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleChannelClick("Web Portal", 10)}
                >
                  <p className="text-2xl font-bold text-foreground">10%</p>
                  <p className="text-sm text-muted-foreground">Web Portal</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Farmer Details Dialog */}
      <Dialog open={farmerDialogOpen} onOpenChange={setFarmerDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Farmer Profile
              {selectedFarmer && <VerificationBadge level={selectedFarmer.verificationLevel} size="sm" />}
            </DialogTitle>
            <DialogDescription>
              Viewing farmer details from the national registry
            </DialogDescription>
          </DialogHeader>
          
          {selectedFarmer && (
            <div className="space-y-4">
              {/* Read-only notice for Level C */}
              {selectedFarmer.verificationLevel === "C" && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Level C farmers are read-only. Contact an NGO or Bank for C→B upgrade.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Farmer ID</p>
                  <p className="font-mono text-sm text-foreground">{selectedFarmer.id}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground">{selectedFarmer.phone}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">{selectedFarmer.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="text-foreground">{selectedFarmer.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">District</span>
                  <span className="text-foreground">{selectedFarmer.district}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Crops</span>
                  <span className="text-foreground">{selectedFarmer.crops.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="text-foreground">{selectedFarmer.registeredAt}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                {/* B → A Upgrade (Government's main action) */}
                {selectedFarmer.verificationLevel === "B" && (
                  <>
                    <UpgradeRequiredBanner
                      currentLevel="B"
                      requiredLevel="A"
                      role="government"
                    />
                    <Button
                      variant="government"
                      className="w-full"
                      onClick={() => handleOpenUpgradeDialog(selectedFarmer)}
                    >
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Upgrade to Level A (Formal ID Verification)
                    </Button>
                  </>
                )}

                {/* C → B: Government cannot do this */}
                {selectedFarmer.verificationLevel === "C" && (
                  <div className="bg-muted/50 border rounded-lg p-3 flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">C→B Upgrade Required</p>
                      <p className="text-xs text-muted-foreground">
                        Contact an NGO or Bank to perform community verification first.
                      </p>
                    </div>
                  </div>
                )}

                {/* Level A: Certification */}
                {selectedFarmer.verificationLevel === "A" && (
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <p className="text-sm text-green-700 dark:text-green-300">
                          This farmer has full verification and is eligible for all government schemes.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="government"
                      className="w-full"
                      onClick={() => handleCertifyForScheme(selectedFarmer)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Certify for Government Scheme
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* B → A Upgrade Flow Dialog */}
      {farmerToUpgrade && (
        <UpgradeFlowDialog
          open={upgradeDialogOpen}
          onOpenChange={setUpgradeDialogOpen}
          farmer={{
            id: farmerToUpgrade.id,
            name: farmerToUpgrade.name,
            phone: farmerToUpgrade.phone,
            currentLevel: farmerToUpgrade.verificationLevel,
          }}
          targetLevel="A"
          role="government"
          actorName="Ministry of Agriculture"
          actorOrganization="Federal Government of Somalia"
          onUpgradeComplete={handleUpgradeComplete}
        />
      )}

      {/* Farm Size Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCategory?.category}</DialogTitle>
            <DialogDescription>{selectedCategory?.description}</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-3xl font-bold text-government">{selectedCategory.percent}%</p>
                  <p className="text-sm text-muted-foreground">of Total Farmers</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-3xl font-bold text-foreground">{selectedCategory.count.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Count</p>
                </div>
              </div>
              <Button className="w-full" variant="government" onClick={() => { handleExportData(selectedCategory.category); setDetailsOpen(false); }}>
                <Download className="w-4 h-4 mr-1" />
                Export Category Data
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Crop Details Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCrop?.crop} Farmers</DialogTitle>
            <DialogDescription>Detailed statistics for {selectedCrop?.crop?.toLowerCase()} cultivation</DialogDescription>
          </DialogHeader>
          {selectedCrop && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-3xl font-bold text-government">{selectedCrop.percent}%</p>
                  <p className="text-sm text-muted-foreground">Market Share</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <p className="text-3xl font-bold text-foreground">{selectedCrop.farmers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Active Farmers</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { handleExportData(selectedCrop.crop); setCropDialogOpen(false); }}>
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button variant="government" className="flex-1" onClick={() => setCropDialogOpen(false)}>
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
