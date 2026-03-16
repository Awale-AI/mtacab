import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LayoutDashboard, 
  Users, 
  Building,
  Ticket, 
  MessageSquare, 
  BarChart3,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  UserPlus
} from "lucide-react";

const navItems = [
  { label: "Program Overview", href: "/ngo", icon: LayoutDashboard },
  { label: "Farmer Lookup", href: "/ngo/beneficiaries", icon: Users },
  { label: "Cooperatives & VSLAs", href: "/ngo/cooperatives", icon: Building },
  { label: "Vouchers & Subsidies", href: "/ngo/vouchers", icon: Ticket },
  { label: "Communications", href: "/ngo/communications", icon: MessageSquare },
  { label: "Monitoring & Reports", href: "/ngo/reports", icon: BarChart3 },
];

const voucherBatches = [
  { id: "BATCH-2025-001", type: "Seed Vouchers", count: 250, value: "USD 12,500", target: "Hargeisa District", date: "Jan 8, 2025", status: "active" as const },
  { id: "BATCH-2025-002", type: "Fertilizer Vouchers", count: 180, value: "USD 11,700", target: "Burao District", date: "Jan 5, 2025", status: "active" as const },
  { id: "BATCH-2024-089", type: "Tool Vouchers", count: 120, value: "USD 4,200", target: "Borama District", date: "Dec 15, 2024", status: "pending" as const },
  { id: "BATCH-2024-088", type: "Seed Vouchers", count: 300, value: "USD 15,000", target: "Gabiley District", date: "Dec 1, 2024", status: "inactive" as const },
];

const columns = [
  { header: "Batch ID", accessor: "id" as const, className: "font-mono text-xs" },
  { header: "Type", accessor: "type" as const },
  { header: "Vouchers", accessor: "count" as const },
  { header: "Total Value", accessor: "value" as const, className: "font-medium" },
  { header: "Target Area", accessor: "target" as const },
  { header: "Created", accessor: "date" as const },
  { header: "Status", accessor: (row: typeof voucherBatches[0]) => <StatusBadge status={row.status} /> },
];

export default function NGOVouchers() {
  const { toast } = useToast();
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  const handleIssueVouchers = () => {
    setIssueDialogOpen(false);
    toast({
      title: "Voucher Batch Created",
      description: "250 vouchers have been issued and are now active.",
    });
  };

  return (
    <>
    <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Issue Voucher Batch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="voucherType">Voucher Type</Label>
            <select id="voucherType" className="w-full px-3 py-2 border rounded-lg bg-background">
              <option>Seed Vouchers</option>
              <option>Fertilizer Vouchers</option>
              <option>Tool Vouchers</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">Number of Vouchers</Label>
            <Input id="count" placeholder="e.g., 250" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value per Voucher (USD)</Label>
            <Input id="value" placeholder="e.g., 50" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">Target Area</Label>
            <Input id="target" placeholder="e.g., Hargeisa District" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIssueDialogOpen(false)}>Cancel</Button>
          <Button variant="ngo" onClick={handleIssueVouchers}>Issue Vouchers</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <PortalLayout 
      title="NGO Portal" 
      role="ngo" 
      navItems={navItems}
      userName="Sarah Okonkwo"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Vouchers & Subsidies</h1>
            <p className="text-muted-foreground">Issue and manage subsidized input vouchers</p>
          </div>
          <Button variant="ngo" onClick={() => setIssueDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Issue Voucher Batch
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Issued"
            value="USD 145K"
            subtitle="This program cycle"
            icon={Ticket}
            variant="info"
          />
          <StatCard
            title="Redeemed"
            value="USD 124K"
            subtitle="85.6% redemption rate"
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Pending"
            value="USD 13.5K"
            subtitle="Awaiting redemption"
            icon={Clock}
          />
          <StatCard
            title="Expired/Cancelled"
            value="USD 7.5K"
            subtitle="5.1% of total"
            icon={XCircle}
          />
        </div>

        {/* Create Voucher Flow */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Issue New Voucher Batch</h2>
          <div className="grid sm:grid-cols-4 gap-4 mb-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <span className="text-2xl font-semibold text-ngo">1</span>
              <p className="text-sm text-muted-foreground mt-1">Select Beneficiaries</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <span className="text-2xl font-semibold text-muted-foreground">2</span>
              <p className="text-sm text-muted-foreground mt-1">Choose Voucher Type</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <span className="text-2xl font-semibold text-muted-foreground">3</span>
              <p className="text-sm text-muted-foreground mt-1">Set Values & Limits</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <span className="text-2xl font-semibold text-muted-foreground">4</span>
              <p className="text-sm text-muted-foreground mt-1">Approve & Issue</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            💡 <strong>Farmer pays nothing</strong> — all vouchers are fully sponsored by your organization.
            Farmers redeem at approved vendors via QR code or USSD.
          </p>
        </div>

        {/* Voucher Batches */}
        <div>
          <h2 className="font-semibold text-foreground mb-4">Recent Voucher Batches</h2>
          <DataTable columns={columns} data={voucherBatches} />
        </div>

        {/* Voucher Types */}
        <div className="bg-muted/30 border rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-3">Available Voucher Types</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { type: "Seed Vouchers", desc: "For improved seed varieties", value: "Up to USD 50" },
              { type: "Fertilizer Vouchers", desc: "NPK, Urea, organic options", value: "Up to USD 80" },
              { type: "Tool Vouchers", desc: "Farming tools and equipment", value: "Up to USD 35" },
            ].map((v) => (
              <div key={v.type} className="bg-card border rounded-lg p-4">
                <h4 className="font-medium text-foreground text-sm">{v.type}</h4>
                <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
                <p className="text-xs text-ngo font-medium mt-2">{v.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
    </>
  );
}
