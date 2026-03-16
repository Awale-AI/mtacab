import { PortalLayout } from "@/components/PortalLayout";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  CloudSun,
  AlertTriangle,
  Sprout,
  Bug,
  Droplets
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

const advisories = [
  {
    id: 1,
    type: "weather",
    icon: CloudSun,
    title: "Weekly Weather Forecast",
    message: "Expect moderate rainfall (40-60mm) this week. Good conditions for planting maize and sorghum. Avoid fertilizer application before heavy rain.",
    date: "Today",
    priority: "info",
  },
  {
    id: 2,
    type: "pest",
    icon: Bug,
    title: "Fall Armyworm Alert",
    message: "Fall armyworm activity detected in Maroodi Jeex region. Inspect your maize crops daily. Contact your extension officer if you notice damage.",
    date: "Yesterday",
    priority: "warning",
  },
  {
    id: 3,
    type: "crop",
    icon: Sprout,
    title: "Maize Planting Advisory",
    message: "Optimal planting window for your zone: Now until end of month. Use recommended seed varieties: SAMMAZ 15 or SAMMAZ 17 for best yields.",
    date: "2 days ago",
    priority: "info",
  },
  {
    id: 4,
    type: "alert",
    icon: AlertTriangle,
    title: "Flood Risk Warning",
    message: "Low-lying areas near rivers may experience flooding. If your farm is in a flood-prone zone, harvest ripe crops immediately.",
    date: "3 days ago",
    priority: "danger",
  },
  {
    id: 5,
    type: "irrigation",
    icon: Droplets,
    title: "Irrigation Tips",
    message: "For cassava fields, reduce watering frequency during rainy season. Ensure proper drainage to prevent root rot.",
    date: "5 days ago",
    priority: "info",
  },
];

const priorityStyles = {
  info: "border-info/20 bg-info/5",
  warning: "border-warning/20 bg-warning/5",
  danger: "border-destructive/20 bg-destructive/5",
};

const priorityIconStyles = {
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
};

export default function FarmerAdvisory() {
  return (
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName="Amara Koroma"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Advisory & Alerts</h1>
          <p className="text-muted-foreground">Weather updates, farming tips, and important alerts for your area</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Active Weather Warning</p>
            <p className="text-sm text-muted-foreground">Heavy rainfall expected tomorrow. Protect harvested crops and avoid field work.</p>
          </div>
        </div>

        {/* Advisories List */}
        <div className="space-y-4">
          {advisories.map((advisory) => (
            <div 
              key={advisory.id} 
              className={`border rounded-xl p-5 ${priorityStyles[advisory.priority as keyof typeof priorityStyles]}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg flex-shrink-0 ${priorityIconStyles[advisory.priority as keyof typeof priorityIconStyles]}`}>
                  <advisory.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground">{advisory.title}</h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{advisory.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{advisory.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SMS/USSD Notice */}
        <div className="bg-muted/30 border rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            📱 Advisories are also sent via <strong>SMS</strong> and available on <strong>USSD (*456#)</strong>
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
