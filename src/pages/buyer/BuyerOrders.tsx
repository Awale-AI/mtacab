import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortalLayout } from "@/components/PortalLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
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
  Search,
  ShoppingCart, 
  Truck, 
  BarChart3,
  Plus,
  Eye
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/buyer", icon: LayoutDashboard },
  { label: "Browse Produce", href: "/buyer/marketplace", icon: Search },
  { label: "My Orders", href: "/buyer/orders", icon: ShoppingCart },
  { label: "Logistics", href: "/buyer/logistics", icon: Truck },
  { label: "Reports", href: "/buyer/reports", icon: BarChart3 },
];

const orders = [
  { id: "PO-2024-0156", crop: "White Maize", supplier: "Jowhar Farmers Coop", quantity: "25 MT", total: "$10,500", date: "Jan 10, 2024", status: "in_transit" },
  { id: "PO-2024-0155", crop: "Sorghum", supplier: "Bay Region Growers", quantity: "15 MT", total: "$5,700", date: "Jan 8, 2024", status: "processing" },
  { id: "PO-2024-0154", crop: "Sesame Seeds", supplier: "Hiiraan United", quantity: "8 MT", total: "$14,800", date: "Jan 5, 2024", status: "pending" },
  { id: "PO-2024-0153", crop: "Cowpeas", supplier: "Jubba Valley Farmers", quantity: "12 MT", total: "$7,800", date: "Jan 3, 2024", status: "completed" },
  { id: "PO-2024-0152", crop: "White Maize", supplier: "Shabelle River Farmers", quantity: "30 MT", total: "$10,500", date: "Dec 28, 2023", status: "completed" },
  { id: "PO-2024-0151", crop: "Groundnuts", supplier: "Gedo Farming Collective", quantity: "10 MT", total: "$12,000", date: "Dec 22, 2023", status: "completed" },
];

export default function BuyerOrders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleViewOrder = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleNewOrder = () => {
    navigate("/buyer/marketplace");
    toast({
      title: "Browse Marketplace",
      description: "Find produce from verified cooperatives.",
    });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter === 'all' ? 'all orders' : filter + ' orders'}`,
    });
  };

  const handleTrackShipment = () => {
    navigate("/buyer/logistics");
  };

  const handleViewReports = () => {
    navigate("/buyer/reports");
  };

  const handleContactSupplier = () => {
    if (selectedOrder) {
      toast({
        title: "Contacting Supplier",
        description: `Initiating contact with ${selectedOrder.supplier}.`,
      });
    }
  };

  const columns = [
    { header: "Order ID", accessor: "id" as const },
    { header: "Crop", accessor: "crop" as const },
    { header: "Supplier", accessor: "supplier" as const },
    { header: "Quantity", accessor: "quantity" as const },
    { header: "Total Value", accessor: "total" as const },
    { header: "Order Date", accessor: "date" as const },
    { 
      header: "Status", 
      accessor: (row: typeof orders[0]) => (
        <StatusBadge 
          status={row.status === "in_transit" ? "active" : row.status as any} 
          label={row.status === "in_transit" ? "In Transit" : undefined}
        />
      )
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
      title="Buyer Portal" 
      role="buyer" 
      navItems={navItems}
      userName="Ibrahim Osman"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">My Orders</h1>
            <p className="text-sm text-muted-foreground">Track and manage your purchase orders</p>
          </div>
          <Button variant="buyer" onClick={handleNewOrder}>
            <Plus className="w-4 h-4 mr-1" />
            New Order
          </Button>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-buyer">$61,300</p>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">9</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'all' ? 'bg-buyer text-buyer-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('all')}
          >
            All Orders
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'pending' ? 'bg-buyer text-buyer-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'processing' ? 'bg-buyer text-buyer-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('processing')}
          >
            Processing
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'in_transit' ? 'bg-buyer text-buyer-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('in_transit')}
          >
            In Transit
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-full ${activeFilter === 'completed' ? 'bg-buyer text-buyer-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-card border rounded-xl p-5">
          <DataTable columns={columns} data={orders} />
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div 
            className="bg-muted/30 rounded-xl p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={handleNewOrder}
          >
            <ShoppingCart className="w-8 h-8 text-buyer mx-auto mb-2" />
            <p className="font-medium text-foreground">Place New Order</p>
            <p className="text-xs text-muted-foreground">Browse marketplace</p>
          </div>
          <div 
            className="bg-muted/30 rounded-xl p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={handleTrackShipment}
          >
            <Truck className="w-8 h-8 text-buyer mx-auto mb-2" />
            <p className="font-medium text-foreground">Track Shipments</p>
            <p className="text-xs text-muted-foreground">Real-time tracking</p>
          </div>
          <div 
            className="bg-muted/30 rounded-xl p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={handleViewReports}
          >
            <BarChart3 className="w-8 h-8 text-buyer mx-auto mb-2" />
            <p className="font-medium text-foreground">View Reports</p>
            <p className="text-xs text-muted-foreground">Analytics & insights</p>
          </div>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.id} - {selectedOrder?.crop}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Supplier</p>
                  <p className="font-medium">{selectedOrder.supplier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Value</p>
                  <p className="font-medium">{selectedOrder.total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Order Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <StatusBadge 
                    status={selectedOrder.status === "in_transit" ? "active" : selectedOrder.status as any} 
                    label={selectedOrder.status === "in_transit" ? "In Transit" : undefined}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
            <Button variant="buyer" onClick={handleContactSupplier}>Contact Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}