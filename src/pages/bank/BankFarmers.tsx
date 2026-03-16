import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FarmerSearchCreateFlow } from "@/components/bank/FarmerSearchCreateFlow";
import { 
  LayoutDashboard, 
  Users, 
  Building2,
  Wallet,
  Sprout,
  Handshake,
  BarChart3,
  Search,
  Eye,
  MapPin,
  Leaf,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  UserPlus
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

const farmers = [
  { 
    id: "FRM-001234", 
    name: "Abdi Hassan Mohamed", 
    region: "Middle Shabelle", 
    village: "Jowhar Town",
    primaryCrop: "Maize",
    farmSize: "3.5 ha",
    cooperative: "Jowhar Farmers Coop",
    vsla: "Jowhar Savings Group",
    verificationStatus: "verified",
    programAffiliation: "FAO Somalia",
    programHistory: [
      { program: "FAO Resilience Program", year: "2023", vouchersReceived: 8, advisoryHours: 12 },
      { program: "WFP Input Support", year: "2022", vouchersReceived: 5, advisoryHours: 6 },
    ],
    savingsIndicator: "High",
    dataCompleteness: 92,
    groupParticipation: 85,
    programEngagement: 78
  },
  { 
    id: "FRM-001235", 
    name: "Hawa Osman Ali", 
    region: "Bay", 
    village: "Baidoa",
    primaryCrop: "Sorghum",
    farmSize: "2.0 ha",
    cooperative: "Bay Region Growers",
    vsla: "Bay Women's VSLA",
    verificationStatus: "verified",
    programAffiliation: "WFP",
    programHistory: [
      { program: "WFP Food Security", year: "2023", vouchersReceived: 6, advisoryHours: 8 },
    ],
    savingsIndicator: "Medium",
    dataCompleteness: 85,
    groupParticipation: 90,
    programEngagement: 72
  },
  { 
    id: "FRM-001236", 
    name: "Mohamed Farah Nur", 
    region: "Hiiraan", 
    village: "Beledweyne",
    primaryCrop: "Sesame",
    farmSize: "4.2 ha",
    cooperative: "Hiiraan United",
    vsla: null,
    verificationStatus: "pending",
    programAffiliation: "USAID",
    programHistory: [
      { program: "USAID Agricultural Growth", year: "2023", vouchersReceived: 4, advisoryHours: 5 },
    ],
    savingsIndicator: "Low",
    dataCompleteness: 65,
    groupParticipation: 45,
    programEngagement: 55
  },
  { 
    id: "FRM-001237", 
    name: "Amina Yusuf Hassan", 
    region: "Lower Jubba", 
    village: "Kismayo",
    primaryCrop: "Banana",
    farmSize: "1.8 ha",
    cooperative: "Jubba Valley Farmers",
    vsla: "Jubba Savings Circle",
    verificationStatus: "verified",
    programAffiliation: "FAO Somalia",
    programHistory: [
      { program: "FAO Resilience Program", year: "2023", vouchersReceived: 10, advisoryHours: 15 },
      { program: "FAO Climate Adaptation", year: "2022", vouchersReceived: 7, advisoryHours: 10 },
    ],
    savingsIndicator: "High",
    dataCompleteness: 98,
    groupParticipation: 95,
    programEngagement: 92
  },
  { 
    id: "FRM-001238", 
    name: "Yusuf Ahmed Omar", 
    region: "Banadir", 
    village: "Mogadishu",
    primaryCrop: "Vegetables",
    farmSize: "0.8 ha",
    cooperative: "Mogadishu Urban Farms",
    vsla: null,
    verificationStatus: "verified",
    programAffiliation: null,
    programHistory: [],
    savingsIndicator: "Medium",
    dataCompleteness: 78,
    groupParticipation: 60,
    programEngagement: 40
  },
  { 
    id: "FRM-001239", 
    name: "Khadija Ali Nur", 
    region: "Gedo", 
    village: "Garbaharey",
    primaryCrop: "Cowpea",
    farmSize: "2.5 ha",
    cooperative: "Gedo Farming Collective",
    vsla: "Gedo Women's Group",
    verificationStatus: "unverified",
    programAffiliation: null,
    programHistory: [],
    savingsIndicator: "Low",
    dataCompleteness: 42,
    groupParticipation: 30,
    programEngagement: 15
  },
];

type Farmer = typeof farmers[0];

export default function BankFarmers() {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [createFlowOpen, setCreateFlowOpen] = useState(false);
  const itemsPerPage = 10;

  const handleViewFarmer = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setDetailsOpen(true);
  };

  const getVerificationBadge = (status: string) => {
    switch(status) {
      case "verified":
        return <StatusBadge status="active" label="Verified" />;
      case "pending":
        return <StatusBadge status="pending" label="Pending" />;
      default:
        return <StatusBadge status="inactive" label="Unverified" />;
    }
  };

  const getIndicatorColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getIndicatorBg = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const columns = [
    { header: "Farmer ID", accessor: "id" as const },
    { header: "Farmer Name", accessor: "name" as const },
    { 
      header: "Region", 
      accessor: (row: Farmer) => (
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.region}</span>
        </div>
      )
    },
    { header: "City / Village", accessor: "village" as const },
    { 
      header: "Primary Crop", 
      accessor: (row: Farmer) => (
        <div className="flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-green-600" />
          <span>{row.primaryCrop}</span>
        </div>
      )
    },
    { header: "Farm Size", accessor: "farmSize" as const },
    { header: "Cooperative / VSLA", accessor: (row: Farmer) => row.cooperative || row.vsla || "—" },
    { 
      header: "Verification",
      accessor: (row: Farmer) => getVerificationBadge(row.verificationStatus)
    },
    { header: "Program", accessor: (row: Farmer) => row.programAffiliation || "—" },
    {
      header: "",
      accessor: (row: Farmer) => (
        <Button variant="ghost" size="sm" onClick={() => handleViewFarmer(row)}>
          <Eye className="w-4 h-4" />
        </Button>
      )
    },
  ];

  const totalPages = Math.ceil(farmers.length / itemsPerPage);

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
            <h1 className="text-2xl font-heading font-semibold text-foreground">Farmers</h1>
            <p className="text-sm text-muted-foreground">Search registry, assess readiness, or register new farmers</p>
          </div>
          <Button onClick={() => setCreateFlowOpen(true)} className="bg-bank hover:bg-bank/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Search / Register Farmer
          </Button>
        </div>

        {/* Farmer Search/Create Flow */}
        <FarmerSearchCreateFlow open={createFlowOpen} onOpenChange={setCreateFlowOpen} />

        {/* Search & Filter */}
        <div className="bg-card border rounded-xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or ID..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Regions</option>
                <option>Middle Shabelle</option>
                <option>Bay</option>
                <option>Hiiraan</option>
                <option>Lower Jubba</option>
                <option>Banadir</option>
                <option>Gedo</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Crops</option>
                <option>Maize</option>
                <option>Sorghum</option>
                <option>Sesame</option>
                <option>Banana</option>
                <option>Vegetables</option>
                <option>Cowpea</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Cooperatives</option>
                <option>Jowhar Farmers Coop</option>
                <option>Bay Region Growers</option>
                <option>Hiiraan United</option>
                <option>Jubba Valley Farmers</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Verification</option>
                <option>Verified</option>
                <option>Pending</option>
                <option>Unverified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12,450</p>
            <p className="text-sm text-muted-foreground">Total Farmers</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">9,840</p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-bank">89</p>
            <p className="text-sm text-muted-foreground">Cooperatives</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">14</p>
            <p className="text-sm text-muted-foreground">Regions</p>
          </div>
        </div>

        {/* Farmers Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={farmers} />
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing 1-{Math.min(itemsPerPage, farmers.length)} of {farmers.length} farmers
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Profile Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-bank" />
              Farmer Profile — {selectedFarmer?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedFarmer && (
            <div className="space-y-4">
              {/* Read-only disclaimer */}
              <div className="bg-muted/50 border border-border rounded-lg p-2">
                <p className="text-xs text-muted-foreground italic text-center">
                  📋 Read-only view for assessment purposes
                </p>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="programs">Program History</TabsTrigger>
                  <TabsTrigger value="groups">Group & Savings</TabsTrigger>
                  <TabsTrigger value="readiness">Risk & Readiness</TabsTrigger>
                </TabsList>

                {/* Tab 1: Overview */}
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Farmer ID</p>
                        <p className="font-medium text-foreground">{selectedFarmer.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium text-foreground">{selectedFarmer.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Region</p>
                        <p className="font-medium text-foreground">{selectedFarmer.region}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">City / Village</p>
                        <p className="font-medium text-foreground">{selectedFarmer.village}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Primary Crop</p>
                        <div className="flex items-center gap-1.5">
                          <Leaf className="w-4 h-4 text-green-600" />
                          <p className="font-medium text-foreground">{selectedFarmer.primaryCrop}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Farm Size (approx.)</p>
                        <p className="font-medium text-foreground">{selectedFarmer.farmSize}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Verification Status</p>
                        {getVerificationBadge(selectedFarmer.verificationStatus)}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Program Affiliation</p>
                        <p className="font-medium text-foreground">{selectedFarmer.programAffiliation || "None"}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Program History */}
                <TabsContent value="programs" className="space-y-4 mt-4">
                  {selectedFarmer.programHistory.length > 0 ? (
                    <div className="space-y-3">
                      {selectedFarmer.programHistory.map((program, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-foreground">{program.program}</p>
                              <p className="text-xs text-muted-foreground">{program.year}</p>
                            </div>
                            <Shield className="w-4 h-4 text-bank" />
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="bg-background rounded-md p-2 text-center">
                              <p className="text-lg font-bold text-foreground">{program.vouchersReceived}</p>
                              <p className="text-xs text-muted-foreground">Vouchers Received</p>
                            </div>
                            <div className="bg-background rounded-md p-2 text-center">
                              <p className="text-lg font-bold text-foreground">{program.advisoryHours}</p>
                              <p className="text-xs text-muted-foreground">Advisory Hours</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No program participation history available</p>
                    </div>
                  )}
                </TabsContent>

                {/* Tab 3: Group & Savings */}
                <TabsContent value="groups" className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-5 h-5 text-bank" />
                        <p className="font-medium text-foreground">Cooperative Membership</p>
                      </div>
                      <p className="text-sm text-foreground">{selectedFarmer.cooperative || "Not a member"}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Wallet className="w-5 h-5 text-bank" />
                        <p className="font-medium text-foreground">VSLA Participation</p>
                      </div>
                      <p className="text-sm text-foreground">{selectedFarmer.vsla || "Not a member"}</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-bank" />
                      <p className="font-medium text-foreground">Savings Indicator</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        selectedFarmer.savingsIndicator === "High" ? "text-green-600" :
                        selectedFarmer.savingsIndicator === "Medium" ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {selectedFarmer.savingsIndicator}
                      </span>
                      <span className="text-xs text-muted-foreground">(based on VSLA records)</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 4: Risk & Readiness */}
                <TabsContent value="readiness" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Conceptual indicators for financing readiness assessment
                  </p>
                  
                  <div className="space-y-4">
                    {/* Data Completeness */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium text-foreground">Data Completeness</p>
                        </div>
                        <span className={`font-bold ${getIndicatorColor(selectedFarmer.dataCompleteness)}`}>
                          {selectedFarmer.dataCompleteness}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getIndicatorBg(selectedFarmer.dataCompleteness)}`}
                          style={{ width: `${selectedFarmer.dataCompleteness}%` }}
                        />
                      </div>
                    </div>

                    {/* Group Participation */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium text-foreground">Group Participation</p>
                        </div>
                        <span className={`font-bold ${getIndicatorColor(selectedFarmer.groupParticipation)}`}>
                          {selectedFarmer.groupParticipation}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getIndicatorBg(selectedFarmer.groupParticipation)}`}
                          style={{ width: `${selectedFarmer.groupParticipation}%` }}
                        />
                      </div>
                    </div>

                    {/* Program Engagement */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Handshake className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium text-foreground">Program Engagement</p>
                        </div>
                        <span className={`font-bold ${getIndicatorColor(selectedFarmer.programEngagement)}`}>
                          {selectedFarmer.programEngagement}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getIndicatorBg(selectedFarmer.programEngagement)}`}
                          style={{ width: `${selectedFarmer.programEngagement}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}