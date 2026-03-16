import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  CheckCircle,
  XCircle
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

const applications = [
  { id: "APP-2024-0892", farmer: "Abdi Hassan Mohamed", product: "Input Loans", amount: "$500", submitted: "Jan 10, 2024", creditScore: 85, riskLevel: "low", status: "pending" },
  { id: "APP-2024-0891", farmer: "Hawa Osman Ali", product: "Equipment Finance", amount: "$1,200", submitted: "Jan 9, 2024", creditScore: 78, riskLevel: "low", status: "approved" },
  { id: "APP-2024-0890", farmer: "Mohamed Farah Nur", product: "Seasonal Credit", amount: "$800", submitted: "Jan 9, 2024", creditScore: 65, riskLevel: "medium", status: "review" },
  { id: "APP-2024-0889", farmer: "Amina Yusuf Hassan", product: "Input Loans", amount: "$350", submitted: "Jan 8, 2024", creditScore: 92, riskLevel: "low", status: "approved" },
  { id: "APP-2024-0888", farmer: "Yusuf Ahmed Omar", product: "Seasonal Credit", amount: "$600", submitted: "Jan 8, 2024", creditScore: 71, riskLevel: "low", status: "pending" },
  { id: "APP-2024-0887", farmer: "Khadija Ali Nur", product: "Input Loans", amount: "$450", submitted: "Jan 7, 2024", creditScore: 55, riskLevel: "high", status: "rejected" },
];

export default function BankApplications() {
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<typeof applications[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewApplication = (app: typeof applications[0]) => {
    setSelectedApp(app);
    setDetailsOpen(true);
  };

  const handleApprove = () => {
    if (selectedApp) {
      toast({
        title: "Application Approved",
        description: `Loan for ${selectedApp.farmer} has been approved.`,
      });
      setDetailsOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedApp) {
      toast({
        title: "Application Rejected",
        description: `Loan for ${selectedApp.farmer} has been rejected.`,
        variant: "destructive",
      });
      setDetailsOpen(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter === 'all' ? 'all applications' : filter + ' applications'}`,
    });
  };

  const handleQuickReview = (type: string, count: number) => {
    toast({
      title: `${type} Review`,
      description: `Opening ${count} applications for ${type.toLowerCase()} review.`,
    });
  };

  const columns = [
    { header: "Application ID", accessor: "id" as const },
    { header: "Farmer", accessor: "farmer" as const },
    { header: "Product", accessor: "product" as const },
    { header: "Amount", accessor: "amount" as const },
    { header: "Submitted", accessor: "submitted" as const },
    { 
      header: "Credit Score",
      accessor: (row: typeof applications[0]) => (
        <span className={`font-medium ${row.creditScore >= 80 ? 'text-green-600' : row.creditScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {row.creditScore}
        </span>
      )
    },
    { 
      header: "Risk",
      accessor: (row: typeof applications[0]) => (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          row.riskLevel === "low" ? "bg-green-500/10 text-green-600" : 
          row.riskLevel === "medium" ? "bg-yellow-500/10 text-yellow-600" : 
          "bg-red-500/10 text-red-600"
        }`}>
          {row.riskLevel}
        </span>
      )
    },
    { 
      header: "Status",
      accessor: (row: typeof applications[0]) => (
        <StatusBadge 
          status={row.status === "approved" ? "completed" : row.status === "rejected" ? "inactive" : row.status as any} 
          label={row.status === "approved" ? "Approved" : row.status === "rejected" ? "Rejected" : row.status === "review" ? "In Review" : "Pending"}
        />
      )
    },
    {
      header: "",
      accessor: (row: typeof applications[0]) => (
        <Button variant="ghost" size="sm" onClick={() => handleViewApplication(row)}>
          <Eye className="w-4 h-4" />
        </Button>
      )
    },
  ];

  return (
    <PortalLayout 
      title="Bank Portal" 
      role="bank" 
      navItems={navItems}
      userName="Fatima Yusuf"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">Loan Applications</h1>
          <p className="text-sm text-muted-foreground">Review and process farmer loan applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">48</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">12</p>
            <p className="text-sm text-muted-foreground">In Review</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">156</p>
            <p className="text-sm text-muted-foreground">Approved (MTD)</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">8</p>
            <p className="text-sm text-muted-foreground">Rejected (MTD)</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-bank">$245K</p>
            <p className="text-sm text-muted-foreground">Pending Value</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search applications..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select className="px-3 py-2 border rounded-lg bg-background text-sm">
              <option>All Status</option>
              <option>Pending</option>
              <option>In Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <select className="px-3 py-2 border rounded-lg bg-background text-sm">
              <option>All Products</option>
              <option>Input Loans</option>
              <option>Equipment Finance</option>
              <option>Seasonal Credit</option>
              <option>Cooperative Loans</option>
            </select>
            <select className="px-3 py-2 border rounded-lg bg-background text-sm">
              <option>Risk: All</option>
              <option>Low Risk</option>
              <option>Medium Risk</option>
              <option>High Risk</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'all' ? 'bg-bank text-bank-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('all')}
          >
            All Applications
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'needs_review' ? 'bg-bank text-bank-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('needs_review')}
          >
            Needs Review
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'auto_approved' ? 'bg-bank text-bank-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('auto_approved')}
          >
            Auto-Approved
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'flagged' ? 'bg-bank text-bank-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('flagged')}
          >
            Flagged
          </button>
        </div>

        {/* Applications Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={applications} />
        </div>

        {/* Quick Review Panel */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Quick Review Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div 
              className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg text-center cursor-pointer hover:bg-green-500/10 transition-colors"
              onClick={() => handleQuickReview("Auto-Approve", 12)}
            >
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-foreground">Auto-Approve</h4>
              <p className="text-xs text-muted-foreground mb-3">Low-risk applications with score 80+</p>
              <Button variant="outline" size="sm" className="border-green-500/30 text-green-600 hover:bg-green-500/10">
                Review 12 Apps
              </Button>
            </div>
            <div 
              className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-center cursor-pointer hover:bg-yellow-500/10 transition-colors"
              onClick={() => handleQuickReview("Manual Review", 8)}
            >
              <Eye className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-medium text-foreground">Manual Review</h4>
              <p className="text-xs text-muted-foreground mb-3">Medium-risk requiring assessment</p>
              <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-600 hover:bg-yellow-500/10">
                Review 8 Apps
              </Button>
            </div>
            <div 
              className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-center cursor-pointer hover:bg-red-500/10 transition-colors"
              onClick={() => handleQuickReview("Flagged", 3)}
            >
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h4 className="font-medium text-foreground">Flagged</h4>
              <p className="text-xs text-muted-foreground mb-3">High-risk or incomplete data</p>
              <Button variant="outline" size="sm" className="border-red-500/30 text-red-600 hover:bg-red-500/10">
                Review 3 Apps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              {selectedApp?.id} - {selectedApp?.farmer}
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Product</p>
                  <p className="font-medium">{selectedApp.product}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">{selectedApp.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium">{selectedApp.submitted}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Credit Score</p>
                  <p className={`font-medium ${selectedApp.creditScore >= 80 ? 'text-green-600' : selectedApp.creditScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {selectedApp.creditScore}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Risk Level</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedApp.riskLevel === "low" ? "bg-green-500/10 text-green-600" : 
                    selectedApp.riskLevel === "medium" ? "bg-yellow-500/10 text-yellow-600" : 
                    "bg-red-500/10 text-red-600"
                  }`}>
                    {selectedApp.riskLevel}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <StatusBadge 
                    status={selectedApp.status === "approved" ? "completed" : selectedApp.status === "rejected" ? "inactive" : selectedApp.status as any} 
                    label={selectedApp.status === "approved" ? "Approved" : selectedApp.status === "rejected" ? "Rejected" : selectedApp.status === "review" ? "In Review" : "Pending"}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
            {selectedApp?.status === 'pending' && (
              <>
                <Button variant="destructive" onClick={handleReject}>Reject</Button>
                <Button variant="bank" onClick={handleApprove}>Approve</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}