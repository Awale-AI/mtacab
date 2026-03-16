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

const vslas = [
  { id: "VSLA-001", name: "Jowhar Women's Savings", region: "Middle Shabelle", members: 25, totalSavings: "$4,250", loanCirculation: "$2,800", status: "active" },
  { id: "VSLA-002", name: "Bay Youth Group", region: "Bay", members: 30, totalSavings: "$5,100", loanCirculation: "$3,400", status: "active" },
  { id: "VSLA-003", name: "Hiiraan Farmers Savings", region: "Hiiraan", members: 22, totalSavings: "$3,800", loanCirculation: "$2,100", status: "active" },
  { id: "VSLA-004", name: "Jubba Valley VSLA", region: "Lower Jubba", members: 28, totalSavings: "$4,600", loanCirculation: "$2,900", status: "active" },
  { id: "VSLA-005", name: "Banadir Urban Savers", region: "Banadir", members: 18, totalSavings: "$2,900", loanCirculation: "$1,500", status: "pending" },
  { id: "VSLA-006", name: "Gedo Women's Group", region: "Gedo", members: 24, totalSavings: "$3,600", loanCirculation: "$2,200", status: "active" },
];

export default function BankVSLAs() {
  const columns = [
    { header: "VSLA ID", accessor: "id" as const },
    { header: "Name", accessor: "name" as const },
    { 
      header: "Region", 
      accessor: (row: typeof vslas[0]) => (
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.region}</span>
        </div>
      )
    },
    { header: "Members", accessor: "members" as const },
    { header: "Total Savings", accessor: "totalSavings" as const },
    { header: "Loan Circulation", accessor: "loanCirculation" as const },
    { 
      header: "Status",
      accessor: (row: typeof vslas[0]) => (
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
          <h1 className="text-2xl font-heading font-semibold text-foreground">VSLAs</h1>
          <p className="text-sm text-muted-foreground">Village Savings and Loan Associations data for partnership assessment</p>
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
              <Input placeholder="Search VSLAs..." className="pl-10" />
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
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Total VSLAs</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">3,890</p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-bank">$245K</p>
            <p className="text-sm text-muted-foreground">Total Savings</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">$156K</p>
            <p className="text-sm text-muted-foreground">Loan Circulation</p>
          </div>
        </div>

        {/* VSLAs Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={vslas} />
        </div>
      </div>
    </PortalLayout>
  );
}