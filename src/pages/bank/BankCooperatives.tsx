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

const cooperatives = [
  { id: "COOP-001", name: "Jowhar Farmers Cooperative", region: "Middle Shabelle", members: 156, activeFarmers: 142, status: "active" },
  { id: "COOP-002", name: "Bay Region Growers", region: "Bay", members: 234, activeFarmers: 218, status: "active" },
  { id: "COOP-003", name: "Hiiraan United Farmers", region: "Hiiraan", members: 89, activeFarmers: 78, status: "active" },
  { id: "COOP-004", name: "Jubba Valley Agricultural Coop", region: "Lower Jubba", members: 178, activeFarmers: 165, status: "active" },
  { id: "COOP-005", name: "Banadir Urban Farms", region: "Banadir", members: 67, activeFarmers: 52, status: "pending" },
  { id: "COOP-006", name: "Gedo Farming Collective", region: "Gedo", members: 112, activeFarmers: 98, status: "active" },
];

export default function BankCooperatives() {
  const columns = [
    { header: "Cooperative ID", accessor: "id" as const },
    { header: "Name", accessor: "name" as const },
    { 
      header: "Region", 
      accessor: (row: typeof cooperatives[0]) => (
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.region}</span>
        </div>
      )
    },
    { header: "Total Members", accessor: "members" as const },
    { header: "Active Farmers", accessor: "activeFarmers" as const },
    { 
      header: "Status",
      accessor: (row: typeof cooperatives[0]) => (
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
          <h1 className="text-2xl font-heading font-semibold text-foreground">Cooperatives</h1>
          <p className="text-sm text-muted-foreground">View registered farmer cooperatives and their membership data</p>
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
              <Input placeholder="Search cooperatives..." className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Regions</option>
                <option>Middle Shabelle</option>
                <option>Bay</option>
                <option>Hiiraan</option>
                <option>Lower Jubba</option>
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
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-muted-foreground">Total Cooperatives</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">4,560</p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-bank">12</p>
            <p className="text-sm text-muted-foreground">Regions Covered</p>
          </div>
        </div>

        {/* Cooperatives Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={cooperatives} />
        </div>
      </div>
    </PortalLayout>
  );
}