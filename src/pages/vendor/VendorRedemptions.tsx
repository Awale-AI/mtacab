import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { VerificationBadge } from "@/components/governance/VerificationBadge";
import { 
  VerificationLevel, 
  isFarmerVisible, 
  isFarmerUsable,
  logAuditEvent,
  PORTAL_PERMISSIONS
} from "@/lib/governance";
import { 
  LayoutDashboard, 
  Package, 
  Ticket, 
  ShoppingBag, 
  BarChart3,
  QrCode,
  Search,
  CheckCircle,
  Shield,
  AlertTriangle,
  XCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "Product Catalog", href: "/vendor/products", icon: Package },
  { label: "Voucher Redemption", href: "/vendor/redemptions", icon: Ticket },
  { label: "Sales & Orders", href: "/vendor/sales", icon: ShoppingBag },
  { label: "Reports & Analytics", href: "/vendor/reports", icon: BarChart3 },
];

// Mock redemption data with verification levels (only B+ visible)
const redemptions = [
  { id: "VCH-2024-0892", farmer: "Farah Abdi", farmerLevel: "B" as VerificationLevel, product: "Maize Seeds (10kg)", amount: "USD 45", date: "Today, 10:30 AM", status: "completed" },
  { id: "VCH-2024-0891", farmer: "Amina Hassan", farmerLevel: "A" as VerificationLevel, product: "NPK Fertilizer (50kg)", amount: "USD 120", date: "Today, 09:15 AM", status: "completed" },
  { id: "VCH-2024-0890", farmer: "Mohamed Ali", farmerLevel: "B" as VerificationLevel, product: "Sorghum Seeds (5kg)", amount: "USD 75", date: "Yesterday", status: "pending" },
  { id: "VCH-2024-0889", farmer: "Halima Omar", farmerLevel: "A" as VerificationLevel, product: "Pesticide Spray (1L)", amount: "USD 90", date: "Yesterday", status: "completed" },
  { id: "VCH-2024-0888", farmer: "Yusuf Farah", farmerLevel: "B" as VerificationLevel, product: "Maize Seeds (10kg)", amount: "USD 50", date: "Jan 8, 2024", status: "completed" },
  { id: "VCH-2024-0887", farmer: "Khadija Ahmed", farmerLevel: "A" as VerificationLevel, product: "Urea Fertilizer (25kg)", amount: "USD 60", date: "Jan 8, 2024", status: "completed" },
];

const columns = [
  { header: "Voucher ID", accessor: "id" as const },
  { 
    header: "Farmer", 
    accessor: (row: typeof redemptions[0]) => (
      <div className="flex items-center gap-2">
        <span>{row.farmer}</span>
        <VerificationBadge level={row.farmerLevel} size="sm" />
      </div>
    )
  },
  { header: "Product", accessor: "product" as const },
  { header: "Amount", accessor: "amount" as const },
  { header: "Date", accessor: "date" as const },
  { 
    header: "Status", 
    accessor: (row: typeof redemptions[0]) => <StatusBadge status={row.status as any} />
  },
];

type VoucherVerificationState = "idle" | "loading" | "valid" | "invalid_level" | "invalid_code" | "expired";

interface VerifiedVoucher {
  code: string;
  farmerName: string;
  farmerLevel: VerificationLevel;
  amount: string;
  product: string;
  expiresAt: string;
}

export default function VendorRedemptions() {
  const { toast } = useToast();
  const [voucherCode, setVoucherCode] = useState("");
  const [verificationState, setVerificationState] = useState<VoucherVerificationState>("idle");
  const [verifiedVoucher, setVerifiedVoucher] = useState<VerifiedVoucher | null>(null);

  const handleScanVoucher = () => {
    toast({
      title: "QR Scanner",
      description: "Opening camera for voucher scanning...",
    });
  };

  const handleVerifyVoucher = async () => {
    if (!voucherCode) {
      toast({
        title: "Enter Code",
        description: "Please enter a voucher code to verify.",
        variant: "destructive",
      });
      return;
    }

    setVerificationState("loading");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate different scenarios based on voucher code
    if (voucherCode.toLowerCase().includes("invalid")) {
      setVerificationState("invalid_code");
      logAuditEvent({
        actor: "Ahmed Hassan",
        actorOrganization: "Hassan Agricultural Supplies",
        actorRole: "vendor",
        action: "voucher_redemption",
        status: "failed",
        reason: "Invalid voucher code",
      });
      return;
    }

    if (voucherCode.toLowerCase().includes("expired")) {
      setVerificationState("expired");
      logAuditEvent({
        actor: "Ahmed Hassan",
        actorOrganization: "Hassan Agricultural Supplies",
        actorRole: "vendor",
        action: "voucher_redemption",
        status: "failed",
        reason: "Voucher expired",
      });
      return;
    }

    // Simulate Level C farmer (blocked)
    if (voucherCode.toLowerCase().includes("levelc")) {
      setVerificationState("invalid_level");
      logAuditEvent({
        actor: "Ahmed Hassan",
        actorOrganization: "Hassan Agricultural Supplies",
        actorRole: "vendor",
        action: "voucher_redemption",
        farmerId: "FRM-TEST01",
        farmerMsisdn: "+252631234567",
        status: "blocked",
        reason: "Level C farmer not eligible for voucher redemption",
      });
      return;
    }

    // Valid voucher with B+ farmer
    setVerifiedVoucher({
      code: voucherCode.toUpperCase(),
      farmerName: "Fatima Ali",
      farmerLevel: "B",
      amount: "USD 50",
      product: "Maize Seeds (10kg)",
      expiresAt: "2025-03-15",
    });
    setVerificationState("valid");
    
    logAuditEvent({
      actor: "Ahmed Hassan",
      actorOrganization: "Hassan Agricultural Supplies",
      actorRole: "vendor",
      action: "voucher_redemption",
      farmerId: "FRM-D4E5F6",
      farmerMsisdn: "+252631234567",
      status: "success",
      evidence: `Voucher ${voucherCode.toUpperCase()} verified`,
    });
  };

  const handleCompleteRedemption = () => {
    if (!verifiedVoucher) return;
    
    logAuditEvent({
      actor: "Ahmed Hassan",
      actorOrganization: "Hassan Agricultural Supplies",
      actorRole: "vendor",
      action: "voucher_redemption",
      farmerId: "FRM-D4E5F6",
      farmerMsisdn: "+252631234567",
      status: "success",
      evidence: `Redeemed ${verifiedVoucher.amount} for ${verifiedVoucher.product}`,
    });

    toast({
      title: "Redemption Complete",
      description: `Successfully redeemed ${verifiedVoucher.amount} for ${verifiedVoucher.farmerName}.`,
    });

    // Reset state
    setVoucherCode("");
    setVerificationState("idle");
    setVerifiedVoucher(null);
  };

  const resetVerification = () => {
    setVoucherCode("");
    setVerificationState("idle");
    setVerifiedVoucher(null);
  };

  return (
    <PortalLayout 
      title="Vendor Portal" 
      role="vendor" 
      navItems={navItems}
      userName="Ahmed Hassan"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Voucher Redemption</h1>
            <p className="text-sm text-muted-foreground">Redeem farmer vouchers and track transactions</p>
          </div>
          <Button variant="vendor" onClick={handleScanVoucher}>
            <QrCode className="w-4 h-4 mr-1" />
            Scan New Voucher
          </Button>
        </div>

        {/* Governance Notice */}
        <div className="bg-vendor/5 border border-vendor/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-vendor mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Vendor Portal Visibility Rules</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can only redeem vouchers for <strong>Level B+ farmers</strong> (Community Verified or Strong ID). 
                Level C farmers are not visible and cannot redeem vouchers. This protects against fraud and ensures farmer identity.
              </p>
            </div>
          </div>
        </div>

        {/* Voucher Verification Card */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-vendor" />
            Redeem a Voucher
          </h2>
          
          {verificationState === "idle" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter the voucher code manually or scan the QR code. Only vouchers for Level B+ farmers can be redeemed.
                </p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter voucher code (e.g., VCH-2024-XXXX)" 
                    className="flex-1"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <Button variant="vendor" onClick={handleVerifyVoucher}>Verify</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: "VCH-123" (valid), "levelc" (blocked), "invalid" or "expired"
                </p>
              </div>
              <div 
                className="flex items-center justify-center p-8 bg-muted/50 rounded-lg border-2 border-dashed border-border cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={handleScanVoucher}
              >
                <div className="text-center">
                  <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to scan QR code</p>
                </div>
              </div>
            </div>
          )}

          {verificationState === "loading" && (
            <div className="py-12 text-center">
              <Loader2 className="w-12 h-12 text-vendor mx-auto mb-4 animate-spin" />
              <p className="text-sm text-muted-foreground">Verifying voucher and farmer eligibility...</p>
            </div>
          )}

          {verificationState === "invalid_level" && (
            <div className="py-8">
              <div className="max-w-md mx-auto text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Farmer Not Eligible</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This voucher belongs to a <strong>Level C farmer</strong> who has not completed community verification. 
                  Vendors can only redeem vouchers for Level B+ farmers.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4">
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Action Required:</strong> Direct the farmer to contact their local NGO or cooperative 
                    for community verification upgrade.
                  </p>
                </div>
                <Button variant="outline" onClick={resetVerification}>
                  Try Another Voucher
                </Button>
              </div>
            </div>
          )}

          {verificationState === "invalid_code" && (
            <div className="py-8">
              <div className="max-w-md mx-auto text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Invalid Voucher Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The voucher code "{voucherCode}" was not found in the system. 
                  Please check the code and try again.
                </p>
                <Button variant="outline" onClick={resetVerification}>
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {verificationState === "expired" && (
            <div className="py-8">
              <div className="max-w-md mx-auto text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-900/40 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Voucher Expired</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This voucher has expired and can no longer be redeemed.
                </p>
                <Button variant="outline" onClick={resetVerification}>
                  Try Another Voucher
                </Button>
              </div>
            </div>
          )}

          {verificationState === "valid" && verifiedVoucher && (
            <div className="py-4">
              <div className="max-w-lg mx-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Voucher Verified</h3>
                  <p className="text-sm text-muted-foreground">Ready for redemption</p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Voucher Code</p>
                      <p className="font-mono font-medium text-foreground">{verifiedVoucher.code}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Value</p>
                      <p className="font-semibold text-green-600">{verifiedVoucher.amount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Farmer</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{verifiedVoucher.farmerName}</span>
                        <VerificationBadge level={verifiedVoucher.farmerLevel} size="sm" />
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Product</p>
                      <p className="font-medium text-foreground">{verifiedVoucher.product}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={resetVerification} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="vendor" onClick={handleCompleteRedemption} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Redemption
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Redemption Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Redeemed This Month</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-vendor">USD 8,450</p>
            <p className="text-sm text-muted-foreground">Total Voucher Value</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground">Pending Settlement</p>
          </div>
        </div>

        {/* Redemption History */}
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">Redemption History</h2>
              <p className="text-xs text-muted-foreground">Only Level B+ farmer transactions shown</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-48" />
            </div>
          </div>
          <DataTable columns={columns} data={redemptions} />
        </div>

        {/* How It Works */}
        <div className="bg-muted/30 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">How Voucher Redemption Works</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: 1, title: "Scan/Enter Code", desc: "Farmer presents voucher" },
              { step: 2, title: "Verify Level", desc: "System checks B+ status" },
              { step: 3, title: "Complete Sale", desc: "Select products, confirm" },
              { step: 4, title: "Get Paid", desc: "Settlement within 48hrs" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-vendor text-vendor-foreground flex items-center justify-center font-bold mx-auto mb-2">
                  {item.step}
                </div>
                <p className="font-medium text-foreground text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
