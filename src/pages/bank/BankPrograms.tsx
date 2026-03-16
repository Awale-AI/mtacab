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
  Calendar
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

const programs = [
  { id: "PRG-001", name: "FAO Somalia Resilience", partner: "FAO", type: "Humanitarian", farmers: 3450, regions: 5, startDate: "Jan 2023", status: "active" },
  { id: "PRG-002", name: "WFP Food Security Initiative", partner: "WFP", type: "Food Security", farmers: 2890, regions: 4, startDate: "Mar 2023", status: "active" },
  { id: "PRG-003", name: "USAID Agricultural Growth", partner: "USAID", type: "Development", farmers: 1560, regions: 3, startDate: "Jun 2023", status: "active" },
  { id: "PRG-004", name: "World Bank Rural Finance", partner: "World Bank", type: "Financial Inclusion", farmers: 890, regions: 2, startDate: "Sep 2023", status: "active" },
  { id: "PRG-005", name: "IFAD Climate Adaptation", partner: "IFAD", type: "Climate", farmers: 1234, regions: 4, startDate: "Dec 2023", status: "pending" },
];

export default function BankPrograms() {
  const columns = [
    { header: "Program ID", accessor: "id" as const },
    { header: "Program Name", accessor: "name" as const },
    { header: "Partner", accessor: "partner" as const },
    { header: "Type", accessor: "type" as const },
    { header: "Farmers", accessor: "farmers" as const },
    { header: "Regions", accessor: "regions" as const },
    { 
      header: "Start Date", 
      accessor: (row: typeof programs[0]) => (
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{row.startDate}</span>
        </div>
      )
    },
    { 
      header: "Status",
      accessor: (row: typeof programs[0]) => (
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
          <h1 className="text-2xl font-heading font-semibold text-foreground">Program Partnerships</h1>
          <p className="text-sm text-muted-foreground">NGO and development program partnerships for coordinated financing</p>
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
              <Input placeholder="Search programs..." className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Partners</option>
                <option>FAO</option>
                <option>WFP</option>
                <option>USAID</option>
                <option>World Bank</option>
                <option>IFAD</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Types</option>
                <option>Humanitarian</option>
                <option>Food Security</option>
                <option>Development</option>
                <option>Financial Inclusion</option>
                <option>Climate</option>
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
            <p className="text-2xl font-bold text-foreground">18</p>
            <p className="text-sm text-muted-foreground">Active Programs</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Partner Organizations</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-bank">10,024</p>
            <p className="text-sm text-muted-foreground">Farmers Covered</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">14</p>
            <p className="text-sm text-muted-foreground">Regions Covered</p>
          </div>
        </div>

        {/* Programs Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={programs} />
        </div>

        {/* Partnership Opportunities */}
        <div className="bg-bank/5 border border-bank/20 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3">🤝 Partnership Opportunities</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Leverage program partnerships to expand financial services to underserved farmer populations.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Co-financing Opportunities</p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Guarantee Programs</p>
            </div>
            <div className="bg-background rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">Referral Pipelines</p>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}