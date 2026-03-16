import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { VerificationBadge } from "@/components/governance/VerificationBadge";
import { UpgradeRequiredBanner } from "@/components/governance/UpgradeRequiredBanner";
import { UpgradeFlowDialog } from "@/components/governance/UpgradeFlowDialog";
import { VerificationLevel, isFarmerUsable, logAuditEvent } from "@/lib/governance";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  LayoutDashboard, 
  Users, 
  Building,
  Ticket, 
  MessageSquare, 
  BarChart3,
  Search,
  Download,
  Filter,
  Eye,
  Phone,
  MapPin,
  ArrowUp,
  AlertCircle,
  Lock,
  CheckCircle2
} from "lucide-react";

const navItems = [
  { label: "Program Overview", href: "/ngo", icon: LayoutDashboard },
  { label: "Farmer Lookup", href: "/ngo/beneficiaries", icon: Users },
  { label: "Cooperatives & VSLAs", href: "/ngo/cooperatives", icon: Building },
  { label: "Vouchers & Subsidies", href: "/ngo/vouchers", icon: Ticket },
  { label: "Communications", href: "/ngo/communications", icon: MessageSquare },
  { label: "Monitoring & Reports", href: "/ngo/reports", icon: BarChart3 },
];

interface Farmer {
  id: string;
  name: string;
  phone: string;
  region: string;
  district: string;
  cooperative: string;
  verificationLevel: "A" | "B" | "C";
  status: "active" | "pending" | "inactive";
  enrolledPrograms: number;
  vouchersReceived: number;
}

const farmers: Farmer[] = [
  { id: "FRM-001234", name: "Amara Koroma", phone: "+252 63 456 7890", region: "Middle Shabelle", district: "Jowhar", cooperative: "Sunrise Farmers", verificationLevel: "B", status: "active", enrolledPrograms: 2, vouchersReceived: 8 },
  { id: "FRM-001235", name: "Ibrahim Musa", phone: "+252 63 123 4567", region: "Middle Shabelle", district: "Jowhar", cooperative: "Sunrise Farmers", verificationLevel: "A", status: "active", enrolledPrograms: 3, vouchersReceived: 12 },
  { id: "FRM-001236", name: "Fatima Abdullahi", phone: "+252 63 789 0123", region: "Hiiraan", district: "Beledweyne", cooperative: "Green Fields", verificationLevel: "C", status: "pending", enrolledPrograms: 1, vouchersReceived: 3 },
  { id: "FRM-001237", name: "Samuel Danjuma", phone: "+252 63 456 7891", region: "Bay", district: "Baidoa", cooperative: "Highland Growers", verificationLevel: "B", status: "active", enrolledPrograms: 2, vouchersReceived: 6 },
  { id: "FRM-001238", name: "Halima Omar", phone: "+252 63 234 5678", region: "Lower Shabelle", district: "Afgooye", cooperative: "Unity Farmers", verificationLevel: "C", status: "inactive", enrolledPrograms: 0, vouchersReceived: 0 },
];

export default function NGOFarmerLookup() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewFarmer = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setDetailsOpen(true);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Downloading farmer list for program reporting...",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Opening filter options...",
    });
  };

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [farmerToUpgrade, setFarmerToUpgrade] = useState<Farmer | null>(null);

  const handleOpenUpgradeDialog = (farmer: Farmer) => {
    // NGO can only upgrade C → B (not B → A per governance rules)
    if (farmer.verificationLevel === "C") {
      setFarmerToUpgrade(farmer);
      setUpgradeDialogOpen(true);
    } else {
      toast({
        title: "Upgrade Not Permitted",
        description: "NGOs can only initiate C → B upgrades. Level B → A upgrades must be performed by Banks or Government.",
        variant: "destructive",
      });
    }
  };

  const handleUpgradeComplete = (verifierName: string, verifierPhone: string) => {
    if (!farmerToUpgrade) return;
    
    // Log the audit event
    logAuditEvent({
      actor: "Sarah Okonkwo",
      actorOrganization: "World Vision Somalia",
      actorRole: "ngo",
      action: "verification_upgrade",
      farmerId: farmerToUpgrade.id,
      farmerMsisdn: farmerToUpgrade.phone,
      oldLevel: "C",
      newLevel: "B",
      evidence: `Community verifier: ${verifierName} (${verifierPhone})`,
      status: "success",
    });

    toast({
      title: "Upgrade Request Submitted",
      description: `${farmerToUpgrade.name} upgrade to Level B pending SMS confirmation from ${verifierName}.`,
    });
    
    setUpgradeDialogOpen(false);
    setFarmerToUpgrade(null);
  };

  const getVerificationBadge = (level: "A" | "B" | "C") => {
    const colors = {
      A: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      B: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
      C: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    };
    return (
      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", colors[level])}>
        Level {level}
      </span>
    );
  };

  const columns = [
    { header: "Farmer ID", accessor: "id" as const, className: "font-mono text-xs" },
    { header: "Name", accessor: "name" as const, className: "font-medium" },
    { header: "Phone", accessor: "phone" as const },
    { header: "Region", accessor: "region" as const },
    { header: "District", accessor: "district" as const },
    { header: "Verification", accessor: (row: Farmer) => getVerificationBadge(row.verificationLevel) },
    { header: "Status", accessor: (row: Farmer) => (
      <StatusBadge status={row.status === "active" ? "verified" : row.status === "pending" ? "pending" : "inactive"} />
    )},
    { header: "", accessor: (row: Farmer) => (
      <Button variant="ghost" size="sm" onClick={() => handleViewFarmer(row)}>
        <Eye className="w-4 h-4" />
      </Button>
    )},
  ];

  return (
    <>
      <PortalLayout 
        title="NGO Portal" 
        role="ngo" 
        navItems={navItems}
        userName="Sarah Okonkwo"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-heading font-semibold text-foreground">
                  Farmer Lookup
                </h1>
                <span className="text-xs bg-ngo/10 text-ngo px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  View Only
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Search and view farmers in the national registry — 2,847 in program coverage
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-1" />
              Export Report
            </Button>
          </div>

          {/* Governance Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200">NGO View-Only Access</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Per M-TACAB governance rules, NGOs cannot create or modify farmer records. 
                  Farmers self-register or are registered by Banks/MFIs with proper evidence. 
                  NGOs can view, enroll in programs, and request verification upgrades.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, ID, phone, or cooperative..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="default" onClick={handleFilter}>
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">2,847</p>
              <p className="text-sm text-muted-foreground">Program Farmers</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">1,892</p>
              <p className="text-sm text-muted-foreground">Level A/B Verified</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">955</p>
              <p className="text-sm text-muted-foreground">Level C (Starter)</p>
            </div>
            <div className="bg-card border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-ngo">12,450</p>
              <p className="text-sm text-muted-foreground">Vouchers Distributed</p>
            </div>
          </div>

          {/* Farmers Table */}
          <DataTable columns={columns} data={farmers} />

          {/* Pagination */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 1-5 of 2,847 farmers</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </PortalLayout>

      {/* Farmer Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-ngo" />
              Farmer Profile
            </DialogTitle>
          </DialogHeader>

          {selectedFarmer && (
            <div className="space-y-4">
              {/* Read-only notice */}
              <div className="bg-muted/50 border rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground italic">
                  📋 View-only — NGOs cannot edit farmer records
                </p>
              </div>

              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-ngo/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-ngo" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{selectedFarmer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFarmer.id}</p>
                </div>
                {getVerificationBadge(selectedFarmer.verificationLevel)}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{selectedFarmer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{selectedFarmer.district}, {selectedFarmer.region}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cooperative</p>
                  <p className="text-sm font-medium">{selectedFarmer.cooperative}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Programs Enrolled</p>
                  <p className="text-sm font-medium">{selectedFarmer.enrolledPrograms}</p>
                </div>
              </div>

              {/* Program Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-ngo/5 border border-ngo/20 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-ngo">{selectedFarmer.vouchersReceived}</p>
                  <p className="text-xs text-muted-foreground">Vouchers Received</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-foreground">{selectedFarmer.enrolledPrograms}</p>
                  <p className="text-xs text-muted-foreground">Active Programs</p>
                </div>
              </div>

              {/* Upgrade Section - NGO can only do C → B */}
              {selectedFarmer.verificationLevel === "C" && (
                <div className="pt-3 border-t">
                  <UpgradeRequiredBanner 
                    currentLevel="C" 
                    requiredLevel="B"
                    role="ngo"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Initiate C → B Upgrade</p>
                      <p className="text-xs text-muted-foreground">
                        Verify with a trusted community member
                      </p>
                    </div>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-ngo hover:bg-ngo/90"
                      onClick={() => handleOpenUpgradeDialog(selectedFarmer)}
                    >
                      <ArrowUp className="w-4 h-4 mr-1" />
                      Upgrade to B
                    </Button>
                  </div>
                </div>
              )}

              {/* B → A is not allowed for NGOs */}
              {selectedFarmer.verificationLevel === "B" && (
                <div className="pt-3 border-t">
                  <div className="bg-muted/50 border rounded-lg p-3 flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Level A Upgrade</p>
                      <p className="text-xs text-muted-foreground">
                        B → A upgrades require Bank/MFI or Government verification with formal ID.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Already Level A */}
              {selectedFarmer.verificationLevel === "A" && (
                <div className="pt-3 border-t">
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">Fully Verified</p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        This farmer has Strong ID verification and full platform access.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setDetailsOpen(false)} className="flex-1">
                  Close
                </Button>
                <Button 
                  variant="ngo" 
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: "Enroll in Program",
                      description: `Opening program enrollment for ${selectedFarmer.name}...`,
                    });
                  }}
                >
                  Enroll in Program
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* C → B Upgrade Flow Dialog */}
      {farmerToUpgrade && (
        <UpgradeFlowDialog
          open={upgradeDialogOpen}
          onOpenChange={setUpgradeDialogOpen}
          farmer={{
            id: farmerToUpgrade.id,
            name: farmerToUpgrade.name,
            phone: farmerToUpgrade.phone,
            currentLevel: farmerToUpgrade.verificationLevel as VerificationLevel,
          }}
          targetLevel="B"
          role="ngo"
          actorName="Sarah Okonkwo"
          actorOrganization="World Vision Somalia"
          onUpgradeComplete={() => {
            toast({
              title: "Upgrade Complete",
              description: `${farmerToUpgrade.name} has been upgraded to Level B.`,
            });
            setUpgradeDialogOpen(false);
            setFarmerToUpgrade(null);
          }}
        />
      )}
    </>
  );
}
