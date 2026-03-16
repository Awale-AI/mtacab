import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  LayoutDashboard, 
  Package, 
  Ticket, 
  ShoppingBag, 
  BarChart3,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Eye
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "Product Catalog", href: "/vendor/products", icon: Package },
  { label: "Voucher Redemption", href: "/vendor/redemptions", icon: Ticket },
  { label: "Sales & Orders", href: "/vendor/sales", icon: ShoppingBag },
  { label: "Reports & Analytics", href: "/vendor/reports", icon: BarChart3 },
];

const orders = [
  { id: "ORD-001245", customer: "Cooperative - Farmers United", items: "Bulk Seeds Order", total: "$1,250", date: "Jan 10, 2024", status: "pending" },
  { id: "ORD-001244", customer: "Farah Abdi", items: "Maize Seeds (10kg) x2", total: "$50", date: "Jan 10, 2024", status: "completed" },
  { id: "ORD-001243", customer: "NGO - AgroAid Somalia", items: "Voucher Bulk Purchase", total: "$5,000", date: "Jan 9, 2024", status: "processing" },
  { id: "ORD-001242", customer: "Mohamed Hassan", items: "NPK Fertilizer (50kg)", total: "$45", date: "Jan 9, 2024", status: "completed" },
  { id: "ORD-001241", customer: "Cooperative - Green Valley", items: "Mixed Inputs", total: "$890", date: "Jan 8, 2024", status: "completed" },
];

export default function VendorSales() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("week");

  const handleViewOrder = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleProcessOrder = () => {
    if (selectedOrder) {
      toast({
        title: "Order Processing",
        description: `Order ${selectedOrder.id} is now being processed.`,
      });
      setDetailsOpen(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing sales data for: ${filter}`,
    });
  };

  const handleViewAll = () => {
    toast({
      title: "All Orders",
      description: "Showing complete order history.",
    });
  };

  const columns = [
    { header: "Order ID", accessor: "id" as const },
    { header: "Customer", accessor: "customer" as const },
    { header: "Items", accessor: "items" as const },
    { header: "Total", accessor: "total" as const },
    { header: "Date", accessor: "date" as const },
    { 
      header: "Status", 
      accessor: (row: typeof orders[0]) => <StatusBadge status={row.status as any} />
    },
    {
      header: "",
      accessor: (row: typeof orders[0]) => (
        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(row)}>
          <Eye className="w-4 h-4" />
        </Button>
      )
    },
  ];

  return (
    <PortalLayout 
      title="Vendor Portal" 
      role="vendor" 
      navItems={navItems}
      userName="Ahmed Hassan"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">Sales & Orders</h1>
          <p className="text-sm text-muted-foreground">Track your sales performance and manage orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Sales"
            value="$1,450"
            subtitle="8 transactions"
            icon={DollarSign}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="This Week"
            value="$8,920"
            subtitle="45 transactions"
            icon={TrendingUp}
            variant="success"
          />
          <StatCard
            title="Unique Customers"
            value="124"
            subtitle="This month"
            icon={Users}
            variant="info"
          />
          <StatCard
            title="Avg. Order Value"
            value="$72"
            subtitle="+5% from last month"
            icon={ShoppingBag}
          />
        </div>

        {/* Sales Chart Placeholder */}
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Sales Trend</h2>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 text-xs rounded-full ${activeFilter === 'week' ? 'bg-vendor text-vendor-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => handleFilterChange('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1 text-xs rounded-full ${activeFilter === 'month' ? 'bg-vendor text-vendor-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => handleFilterChange('month')}
              >
                Month
              </button>
              <button 
                className={`px-3 py-1 text-xs rounded-full ${activeFilter === 'year' ? 'bg-vendor text-vendor-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => handleFilterChange('year')}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2 px-4">
            {[65, 45, 80, 55, 90, 75, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-vendor/20 rounded-t-lg transition-all hover:bg-vendor/40 cursor-pointer"
                  style={{ height: `${height}%` }}
                  onClick={() => toast({ title: `${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]} Sales`, description: `$${Math.round(height * 15)} in sales` })}
                >
                  <div 
                    className="w-full bg-vendor rounded-t-lg"
                    style={{ height: `${height * 0.7}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Orders</h2>
            <button className="text-sm text-vendor hover:underline" onClick={handleViewAll}>View All</button>
          </div>
          <DataTable columns={columns} data={orders} />
        </div>

        {/* Sales by Channel */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Sales by Channel</h2>
            <div className="space-y-4">
              {[
                { channel: "Direct Sales", amount: "$5,200", percent: 42 },
                { channel: "Voucher Redemptions", amount: "$4,800", percent: 39 },
                { channel: "Cooperative Orders", amount: "$2,320", percent: 19 },
              ].map((item) => (
                <div 
                  key={item.channel} 
                  className="cursor-pointer hover:bg-muted/20 p-2 rounded-lg transition-colors"
                  onClick={() => toast({ title: item.channel, description: `${item.amount} (${item.percent}% of total sales)` })}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.channel}</span>
                    <span className="font-medium text-foreground">{item.amount}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-vendor rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-xl p-5">
            <h2 className="font-semibold text-foreground mb-4">Top Buying Cooperatives</h2>
            <div className="space-y-3">
              {[
                { name: "Farmers United Cooperative", orders: 24, total: "$3,450" },
                { name: "Green Valley Group", orders: 18, total: "$2,120" },
                { name: "Sunrise Farmers VSLA", orders: 15, total: "$1,890" },
                { name: "Hope Agricultural Coop", orders: 12, total: "$1,450" },
              ].map((coop, i) => (
                <div 
                  key={coop.name} 
                  className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/20 px-2 rounded-lg transition-colors"
                  onClick={() => toast({ title: coop.name, description: `${coop.orders} orders, ${coop.total} total` })}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-vendor/10 text-vendor text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{coop.name}</p>
                      <p className="text-xs text-muted-foreground">{coop.orders} orders</p>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">{coop.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} - {selectedOrder?.customer}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Items</p>
                  <p className="font-medium">{selectedOrder.items}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-medium">{selectedOrder.total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <StatusBadge status={selectedOrder.status as any} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
            {selectedOrder?.status === 'pending' && (
              <Button variant="vendor" onClick={handleProcessOrder}>Process Order</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}