import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  CloudSun,
  ShoppingCart,
  CheckCircle,
  AlertTriangle
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

const notifications = [
  {
    id: 1,
    type: "voucher",
    icon: Ticket,
    title: "Voucher Approved",
    message: "Your Tool Voucher (USD 35) has been approved and is now active.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "buyer",
    icon: ShoppingCart,
    title: "Buyer Inquiry",
    message: "Hargeisa Grains Ltd is interested in your maize listing. Check messages.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "weather",
    icon: CloudSun,
    title: "Weather Alert",
    message: "Heavy rainfall expected tomorrow in your area. Protect your crops.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "system",
    icon: CheckCircle,
    title: "Profile Verified",
    message: "Your farm profile has been verified by the extension officer.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "alert",
    icon: AlertTriangle,
    title: "Pest Alert",
    message: "Fall armyworm detected in Maroodi Jeex region. Monitor your crops.",
    time: "3 days ago",
    read: true,
  },
];

export default function FarmerNotifications() {
  const { toast } = useToast();
  const [notificationsList, setNotificationsList] = useState(notifications);
  const unreadCount = notificationsList.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All caught up!",
      description: "All notifications marked as read.",
    });
  };

  const handleNotificationClick = (id: number) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast({
      title: "Notification viewed",
      description: "Opening notification details...",
    });
  };

  return (
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName="Amara Koroma"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="text-sm text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notificationsList.map((notification) => (
            <button
              key={notification.id} 
              onClick={() => handleNotificationClick(notification.id)}
              className={`bg-card border rounded-xl p-4 transition-colors w-full text-left hover:shadow-md ${
                !notification.read ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  !notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  <notification.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-medium ${
                      !notification.read ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* SMS Notice */}
        <div className="bg-muted/30 border rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            📱 Important notifications are also sent via <strong>SMS</strong> to your registered phone number
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
