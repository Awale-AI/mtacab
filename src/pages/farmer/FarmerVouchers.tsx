import { PortalLayout } from "@/components/PortalLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable } from "@/components/DataTable";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  QrCode
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/farmer", icon: LayoutDashboard },
  { label: "My Farm Profile", href: "/farmer/profile", icon: User },
  { label: "Advisory & Alerts", href: "/farmer/advisory", icon: MessageSquare },
  { label: "Cooperatives & VSLAs", href: "/farmer/cooperatives", icon: Users },
  { label: "Input Vouchers", href: "/farmer/vouchers", icon: Ticket },
  { label: "My Produce", href: "/farmer/produce", icon: Package },
  { label: "Notifications", href: "/farmer/notifications", icon: Bell },
];

const vouchers = [
  {
    id: "VCH-2025-001",
    type: "Seed Voucher",
    value: "USD 50",
    sponsor: "ACTED Somalia",
    validUntil: "Mar 31, 2025",
    status: "active" as const,
  },
  {
    id: "VCH-2025-002",
    type: "Fertilizer Voucher",
    value: "USD 65",
    sponsor: "ACTED Somalia",
    validUntil: "Mar 31, 2025",
    status: "active" as const,
  },
  {
    id: "VCH-2025-003",
    type: "Tool Voucher",
    value: "USD 35",
    sponsor: "Ministry of Agriculture",
    validUntil: "Apr 15, 2025",
    status: "pending" as const,
  },
  {
    id: "VCH-2024-089",
    type: "Seed Voucher",
    value: "USD 40",
    sponsor: "FAO Somalia",
    validUntil: "Dec 31, 2024",
    status: "inactive" as const,
  },
];

const columns = [
  { header: "Voucher ID", accessor: "id" as const },
  { header: "Type", accessor: "type" as const },
  { header: "Value", accessor: "value" as const, className: "font-medium" },
  { header: "Sponsor", accessor: "sponsor" as const },
  { header: "Valid Until", accessor: "validUntil" as const },
  { 
    header: "Status", 
    accessor: (row: typeof vouchers[0]) => <StatusBadge status={row.status} />
  },
];

export default function FarmerVouchers() {
  return (
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName="Amara Koroma"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Input Vouchers</h1>
          <p className="text-muted-foreground">Your subsidized vouchers for seeds, fertilizers, and tools</p>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-success/5 border border-success/20 rounded-xl p-5">
            <p className="text-sm text-muted-foreground mb-1">Active Vouchers</p>
            <p className="text-3xl font-semibold text-success">2</p>
            <p className="text-sm text-muted-foreground mt-1">USD 115 total value</p>
          </div>
          <div className="bg-warning/5 border border-warning/20 rounded-xl p-5">
            <p className="text-sm text-muted-foreground mb-1">Pending Approval</p>
            <p className="text-3xl font-semibold text-warning">1</p>
            <p className="text-sm text-muted-foreground mt-1">USD 35 value</p>
          </div>
          <div className="bg-muted/50 border rounded-xl p-5">
            <p className="text-sm text-muted-foreground mb-1">Used/Expired</p>
            <p className="text-3xl font-semibold text-muted-foreground">1</p>
            <p className="text-sm text-muted-foreground mt-1">This season</p>
          </div>
        </div>

        {/* QR Code for Redemption */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-foreground mb-2">Redeem at Vendor</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Show this QR code to any approved vendor to redeem your vouchers. 
                The vendor will scan and process your purchase.
              </p>
              <p className="text-xs text-muted-foreground">
                💡 You can also redeem via USSD (*456*2#) using your voucher code
              </p>
            </div>
          </div>
        </div>

        {/* Vouchers Table */}
        <div>
          <h2 className="font-semibold text-foreground mb-4">All Vouchers</h2>
          <DataTable columns={columns} data={vouchers} />
        </div>

        {/* How It Works */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-3">How Vouchers Work</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>NGOs or government programs issue vouchers to eligible farmers</li>
            <li>Vouchers are linked to your farmer ID and phone number</li>
            <li>Visit any approved vendor and show your QR code or use USSD</li>
            <li>Select inputs within your voucher value</li>
            <li>Vendor redeems voucher - you pay nothing (fully sponsored)</li>
          </ol>
        </div>
      </div>
    </PortalLayout>
  );
}
