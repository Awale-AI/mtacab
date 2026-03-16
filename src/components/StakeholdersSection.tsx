import { 
  Sprout, 
  Heart, 
  Package, 
  ShoppingCart, 
  Landmark, 
  Building2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const stakeholders = [
  {
    id: "farmer",
    title: "Farmers",
    description: "Register profiles, receive advisories, list produce, and access digital vouchers for inputs",
    icon: Sprout,
    color: "text-farmer",
    bgColor: "bg-farmer/10",
    count: "50,000+",
    countLabel: "registered farmers",
  },
  {
    id: "ngo",
    title: "NGOs & Humanitarians",
    description: "Create beneficiary lists, issue e-vouchers, form cooperatives, and track program outcomes",
    icon: Heart,
    color: "text-ngo",
    bgColor: "bg-ngo/10",
    count: "25+",
    countLabel: "partner organizations",
  },
  {
    id: "vendor",
    title: "Input Vendors",
    description: "Register products, accept voucher payments, and track sales to farming communities",
    icon: Package,
    color: "text-vendor",
    bgColor: "bg-vendor/10",
    count: "200+",
    countLabel: "agro-dealers",
  },
  {
    id: "buyer",
    title: "Buyers & Aggregators",
    description: "Source produce from registered farmers, manage logistics, and ensure traceability",
    icon: ShoppingCart,
    color: "text-buyer",
    bgColor: "bg-buyer/10",
    count: "40+",
    countLabel: "active buyers",
  },
  {
    id: "bank",
    title: "Banks & MFIs",
    description: "Access verified farmer data, offer tailored loan products, and reduce lending risk",
    icon: Landmark,
    color: "text-bank",
    bgColor: "bg-bank/10",
    count: "8",
    countLabel: "partner institutions",
  },
  {
    id: "government",
    title: "Government",
    description: "Monitor national agriculture data, track subsidy programs, and inform policy decisions",
    icon: Building2,
    color: "text-government",
    bgColor: "bg-government/10",
    count: "6",
    countLabel: "ministry dashboards",
  },
];

export function StakeholdersSection() {
  return (
    <section id="stakeholders" className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            Ecosystem Stakeholders
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Connecting All Agricultural Actors
          </h2>
          <p className="text-lg text-muted-foreground">
            Each stakeholder has a dedicated portal with role-specific features and access controls.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder) => (
            <div 
              key={stakeholder.id}
              className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  stakeholder.bgColor
                )}>
                  <stakeholder.icon className={cn("w-6 h-6", stakeholder.color)} />
                </div>
                <div className="text-right">
                  <span className={cn("text-2xl font-bold", stakeholder.color)}>
                    {stakeholder.count}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {stakeholder.countLabel}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {stakeholder.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stakeholder.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
