import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserPlus, 
  Ticket, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  ShieldCheck,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const featureCategories = [
  {
    id: "registration",
    title: "Registration",
    icon: UserPlus,
    features: [
      "Farmer profile creation with biometrics",
      "Farm plot GPS mapping",
      "Cooperative membership tracking",
      "VSLA group formation",
      "Family member registration",
      "ID verification via NIN",
    ],
  },
  {
    id: "vouchers",
    title: "Vouchers",
    icon: Ticket,
    features: [
      "Digital voucher issuance by NGOs",
      "Multi-category vouchers (seeds, fertilizer, tools)",
      "Vendor redemption via USSD",
      "Real-time balance tracking",
      "Expiry management",
      "Audit trail for all transactions",
    ],
  },
  {
    id: "markets",
    title: "Markets",
    icon: TrendingUp,
    features: [
      "Produce listing by farmers",
      "Real-time price information",
      "Buyer order placement",
      "Aggregation point management",
      "Quality grading system",
      "Transport logistics coordination",
    ],
  },
  {
    id: "advisory",
    title: "Advisory",
    icon: MessageSquare,
    features: [
      "Weather forecasts via SMS",
      "Crop-specific farming tips",
      "Pest and disease alerts",
      "Market price broadcasts",
      "Voice IVR for low-literacy",
      "Seasonal planting calendars",
    ],
  },
  {
    id: "groups",
    title: "Groups",
    icon: Users,
    features: [
      "Cooperative formation",
      "VSLA savings tracking",
      "Group loan management",
      "Meeting records",
      "Bulk input purchases",
      "Shared equipment booking",
    ],
  },
  {
    id: "finance",
    title: "Finance",
    icon: ShieldCheck,
    features: [
      "Activity-based credit scoring",
      "Loan product catalog",
      "Application workflow",
      "Repayment tracking",
      "Default risk assessment",
      "Agricultural insurance",
    ],
  },
];

export function FeaturesPanel() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Platform Capabilities</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="registration" className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1">
            {featureCategories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="flex-1 min-w-[100px] gap-1.5 text-xs py-2"
              >
                <cat.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{cat.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {featureCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {cat.features.map((feature) => (
                  <div 
                    key={feature}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}