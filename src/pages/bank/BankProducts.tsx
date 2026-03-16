import { PortalLayout } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Building2,
  Wallet,
  Sprout,
  Handshake,
  BarChart3,
  Plus,
  Edit,
  Leaf,
  Tractor,
  Calendar,
  Building
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

const products = [
  {
    id: 1,
    name: "Input Loans",
    description: "Short-term financing for seeds, fertilizers, and pesticides",
    icon: Leaf,
    minAmount: "$100",
    maxAmount: "$2,000",
    term: "6 months",
    rate: "12% p.a.",
    active: 456,
    disbursed: "$684K",
    status: "active"
  },
  {
    id: 2,
    name: "Equipment Finance",
    description: "Medium-term loans for farm equipment and machinery",
    icon: Tractor,
    minAmount: "$500",
    maxAmount: "$10,000",
    term: "24 months",
    rate: "15% p.a.",
    active: 189,
    disbursed: "$756K",
    status: "active"
  },
  {
    id: 3,
    name: "Seasonal Credit",
    description: "Working capital tied to crop cycles and harvest seasons",
    icon: Calendar,
    minAmount: "$200",
    maxAmount: "$5,000",
    term: "9 months",
    rate: "14% p.a.",
    active: 423,
    disbursed: "$634K",
    status: "active"
  },
  {
    id: 4,
    name: "Cooperative Loans",
    description: "Group lending to registered farmer cooperatives",
    icon: Building,
    minAmount: "$5,000",
    maxAmount: "$50,000",
    term: "12 months",
    rate: "10% p.a.",
    active: 177,
    disbursed: "$354K",
    status: "active"
  },
];

export default function BankProducts() {
  return (
    <PortalLayout 
      title="Bank Portal" 
      role="bank" 
      navItems={navItems}
      userName="Fatima Yusuf"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Loan Products</h1>
            <p className="text-sm text-muted-foreground">Manage agricultural lending products</p>
          </div>
          <Button variant="bank">
            <Plus className="w-4 h-4 mr-1" />
            Create Product
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-bank/10 flex items-center justify-center">
                    <product.icon className="w-6 h-6 text-bank" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Loan Range</p>
                  <p className="font-medium text-foreground">{product.minAmount} - {product.maxAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Term</p>
                  <p className="font-medium text-foreground">{product.term}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Interest Rate</p>
                  <p className="font-medium text-foreground">{product.rate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-500/10 text-green-600">
                    Active
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Active Loans</p>
                    <p className="text-xl font-bold text-foreground">{product.active}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Total Disbursed</p>
                    <p className="text-xl font-bold text-bank">{product.disbursed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Performance Summary */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Portfolio Overview</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-foreground">1,245</p>
              <p className="text-sm text-muted-foreground">Total Active Loans</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-bank">USD 2.43M</p>
              <p className="text-sm text-muted-foreground">Total Disbursed</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-green-600">94.2%</p>
              <p className="text-sm text-muted-foreground">Avg. Repayment Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-foreground">USD 1,952</p>
              <p className="text-sm text-muted-foreground">Avg. Loan Size</p>
            </div>
          </div>
        </div>

        {/* TACAB Eligibility Criteria */}
        <div className="bg-bank/5 border border-bank/20 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3">📋 TACAB-Integrated Eligibility Criteria</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All loan products leverage TACAB platform data for automated eligibility assessment:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "Verified farmer registration",
              "Active cooperative membership",
              "Minimum 60 credit score",
              "12+ months platform history",
              "No outstanding defaults",
              "Valid produce records",
              "Voucher redemption history",
              "VSLA participation (preferred)"
            ].map((criteria, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-bank/20 text-bank flex items-center justify-center text-xs">✓</span>
                <span className="text-foreground">{criteria}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
