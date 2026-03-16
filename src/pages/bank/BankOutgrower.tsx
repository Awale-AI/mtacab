import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MapPin
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

const schemes = [
  { id: "OGS-001", name: "Sesame Export Initiative", buyer: "Somali Agri-Exports Ltd", region: "Bay", farmers: 245, hectares: 612, crop: "Sesame", status: "active" },
  { id: "OGS-002", name: "Sorghum Value Chain", buyer: "Bay Food Processing", region: "Bay", farmers: 189, hectares: 378, crop: "Sorghum", status: "active" },
  { id: "OGS-003", name: "Banana Cluster Project", buyer: "Jubba Fruits Co.", region: "Lower Shabelle", farmers: 156, hectares: 234, crop: "Banana", status: "active" },
  { id: "OGS-004", name: "Maize Production Scheme", buyer: "National Grain Corp", region: "Middle Shabelle", farmers: 312, hectares: 624, crop: "Maize", status: "active" },
  { id: "OGS-005", name: "Cowpea Partnership", buyer: "Mogadishu Traders", region: "Hiiraan", farmers: 98, hectares: 196, crop: "Cowpea", status: "pending" },
];

export default function BankOutgrower() {
  const columns = [
    { header: "Scheme ID", accessor: "id" as const },
    { header: "Scheme Name", accessor: "name" as const },
    { header: "Buyer/Aggregator", accessor: "buyer" as const },
    { 
      header: "Region", 
      accessor: (row: typeof schemes[0]) => (
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.region}</span>
        </div>
      )
    },
    { header: "Farmers", accessor: "farmers" as const },
    { header: "Hectares", accessor: "hectares" as const },
    { header: "Crop", accessor: "crop" as const },
    { 
      header: "Status",
      accessor: (row: typeof schemes[0]) => (
        <StatusBadge 
          status={row.status === "active" ? "active" : "pending"} 
          label={row.status === "active" ? "Active" : "Pending"}
        />
      )
    },
    {
      header: "",
      accessor: () => (
        <Button variant="ghost" size="sm">
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
      showRoleSwitcher={false}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">Outgrower Schemes</h1>
          <p className="text-sm text-muted-foreground">Buyer-farmer contract farming arrangements for financing assessment</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-muted/50 border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground italic">
            📋 Data shown for assessment and partnership planning only. This is a read-only view.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-card border rounded-xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search schemes..." className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Regions</option>
                <option>Middle Shabelle</option>
                <option>Bay</option>
                <option>Lower Shabelle</option>
                <option>Hiiraan</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Crops</option>
                <option>Sesame</option>
                <option>Sorghum</option>
                <option>Banana</option>
                <option>Maize</option>
                <option>Cowpea</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-sm text-muted-foreground">Active Schemes</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">2,450</p>
            <p className="text-sm text-muted-foreground">Enrolled Farmers</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-bank">5,890</p>
            <p className="text-sm text-muted-foreground">Total Hectares</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-sm text-muted-foreground">Buyer Partners</p>
          </div>
        </div>

        {/* Schemes Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={schemes} />
        </div>
      </div>
    </PortalLayout>
  );
}