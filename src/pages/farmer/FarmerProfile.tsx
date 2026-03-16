import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/governance/VerificationBadge";
import { UpgradeRequiredBanner } from "@/components/governance/UpgradeRequiredBanner";
import { VerificationLevel } from "@/lib/governance";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  MapPin,
  Phone,
  Calendar,
  Sprout,
  ArrowUp,
  Shield,
  CheckCircle2
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

// Demo farmer data - in production this would come from auth/session
const demoFarmer = {
  id: "FRM-X7K2M9",
  name: "Amara Koroma",
  phone: "+252 63 456 7890",
  verificationLevel: "C" as VerificationLevel, // Start at Level C for demo
  region: "Maroodi Jeex",
  district: "Hargeisa",
  registeredDate: "March 15, 2024",
  farmSize: "2.5 hectares",
  primaryCrops: "Maize, Cassava",
  cooperative: "Sunrise Farmers Group",
};

export default function FarmerProfile() {
  const { toast } = useToast();
  const [farmer] = useState(demoFarmer);

  const handleRequestUpgrade = () => {
    toast({
      title: "Upgrade Request Submitted",
      description: "Your request has been sent to your cooperative leader for verification.",
    });
  };

  const isLevelC = farmer.verificationLevel === "C";
  const isLevelB = farmer.verificationLevel === "B";

  return (
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName={farmer.name}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">My Farm Profile</h1>
          <p className="text-muted-foreground">Your registered farm details and verification status</p>
        </div>

        {/* Verification Status Banner */}
        {isLevelC && (
          <UpgradeRequiredBanner
            currentLevel="C"
            requiredLevel="B"
            role="farmer"
            canInitiateUpgrade={false}
            onRequestUpgrade={handleRequestUpgrade}
          />
        )}

        {/* Profile Card */}
        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="bg-farmer/10 p-6 border-b border-farmer/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-farmer/20 flex items-center justify-center">
                <User className="w-8 h-8 text-farmer" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-semibold text-foreground">{farmer.name}</h2>
                  <VerificationBadge level={farmer.verificationLevel} size="md" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Farmer ID: {farmer.id}</p>
                
                {/* Verification Progress */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      farmer.verificationLevel ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"
                    }`}>
                      C
                    </div>
                    <div className={`w-8 h-1 ${farmer.verificationLevel !== "C" ? "bg-emerald-500" : "bg-muted"}`} />
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      farmer.verificationLevel === "B" || farmer.verificationLevel === "A" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      B
                    </div>
                    <div className={`w-8 h-1 ${farmer.verificationLevel === "A" ? "bg-green-500" : "bg-muted"}`} />
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      farmer.verificationLevel === "A" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      A
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Verification Progress</span>
                </div>
              </div>

              {/* Request Upgrade Button */}
              {farmer.verificationLevel !== "A" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRequestUpgrade}
                  className="flex-shrink-0"
                >
                  <ArrowUp className="w-4 h-4 mr-1" />
                  Request Upgrade
                </Button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Personal Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{farmer.phone}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground">{farmer.region}, {farmer.district}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Registered:</span>
                    <span className="text-foreground">{farmer.registeredDate}</span>
                  </div>
                </div>
              </div>

              {/* Farm Info */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-primary" />
                  Farm Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Farm Size:</span>
                    <span className="text-foreground font-medium">{farmer.farmSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary Crops:</span>
                    <span className="text-foreground font-medium">{farmer.primaryCrops}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cooperative:</span>
                    <span className="text-foreground font-medium">{farmer.cooperative}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What each level unlocks */}
        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Verification Benefits
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${farmer.verificationLevel === "C" ? "border-amber-300 bg-amber-50 dark:bg-amber-950/30" : "border-border"}`}>
              <div className="flex items-center gap-2 mb-2">
                <VerificationBadge level="C" size="sm" showTooltip={false} />
                <span className="text-sm font-medium">Current</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Registered in national database</li>
                <li>✓ Receive weather alerts</li>
                <li>✓ Access agricultural advisories</li>
                <li className="text-amber-600">✗ Cannot receive vouchers</li>
                <li className="text-amber-600">✗ Cannot access finance</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-2 ${farmer.verificationLevel === "B" ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30" : "border-border"}`}>
              <div className="flex items-center gap-2 mb-2">
                <VerificationBadge level="B" size="sm" showTooltip={false} />
                {farmer.verificationLevel === "B" && <span className="text-sm font-medium">Current</span>}
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ All Level C benefits</li>
                <li>✓ Receive program vouchers</li>
                <li>✓ Enroll in NGO programs</li>
                <li>✓ Sell produce to aggregators</li>
                <li className="text-amber-600">✗ Limited financial products</li>
              </ul>
            </div>

            <div className={`p-4 rounded-lg border-2 ${farmer.verificationLevel === "A" ? "border-green-300 bg-green-50 dark:bg-green-950/30" : "border-border"}`}>
              <div className="flex items-center gap-2 mb-2">
                <VerificationBadge level="A" size="sm" showTooltip={false} />
                {farmer.verificationLevel === "A" && <span className="text-sm font-medium">Current</span>}
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ All Level B benefits</li>
                <li>✓ Access to bank loans</li>
                <li>✓ Government scheme eligibility</li>
                <li>✓ Insurance products</li>
                <li>✓ Full market access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to upgrade */}
        {farmer.verificationLevel !== "A" && (
          <div className="bg-muted/30 border rounded-xl p-4">
            <h4 className="font-medium text-foreground mb-2">How to upgrade your verification level:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {isLevelC && (
                <>
                  <li>• <strong>Level C → B:</strong> Ask your cooperative leader or village elder to verify you via SMS</li>
                  <li>• Visit your nearest NGO program office or dial *456# on your phone</li>
                </>
              )}
              {isLevelB && (
                <>
                  <li>• <strong>Level B → A:</strong> Present your National ID or passport at a bank branch</li>
                  <li>• A bank officer or government official must verify your ID document</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
