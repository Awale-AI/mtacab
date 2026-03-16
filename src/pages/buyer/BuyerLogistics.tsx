import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
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
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Phone
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/buyer", icon: LayoutDashboard },
  { label: "Browse Produce", href: "/buyer/marketplace", icon: Search },
  { label: "My Orders", href: "/buyer/orders", icon: ShoppingCart },
  { label: "Logistics", href: "/buyer/logistics", icon: Truck },
  { label: "Reports", href: "/buyer/reports", icon: BarChart3 },
];

const shipments = [
  { 
    id: "SHP-2024-0089", 
    order: "PO-2024-0156", 
    crop: "White Maize", 
    quantity: "25 MT",
    origin: "Jowhar Collection Point",
    destination: "Mogadishu Warehouse",
    status: "in_transit",
    driver: "Hassan Mohamed",
    vehicle: "TRK-4521",
    phone: "+252 61 XXX 4521",
    eta: "Jan 12, 2024 - 2:00 PM"
  },
  { 
    id: "SHP-2024-0088", 
    order: "PO-2024-0155", 
    crop: "Sorghum", 
    quantity: "15 MT",
    origin: "Baidoa Aggregation Center",
    destination: "Mogadishu Warehouse",
    status: "loading",
    driver: "Ali Farah",
    vehicle: "TRK-3892",
    phone: "+252 61 XXX 3892",
    eta: "Jan 15, 2024"
  },
];

export default function BuyerLogistics() {
  const { toast } = useToast();
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewShipment = (shipment: typeof shipments[0]) => {
    setSelectedShipment(shipment);
    setDetailsOpen(true);
  };

  const handleCallDriver = (shipment: typeof shipments[0]) => {
    toast({
      title: "Calling Driver",
      description: `Initiating call to ${shipment.driver} at ${shipment.phone}`,
    });
  };

  const handleTrackLive = (shipmentId: string) => {
    toast({
      title: "Live Tracking",
      description: `Opening real-time tracking for ${shipmentId}`,
    });
  };

  const handleViewCollectionPoint = (point: { name: string; region: string }) => {
    toast({
      title: point.name,
      description: `Located in ${point.region}. Click for directions.`,
    });
  };

  return (
    <PortalLayout 
      title="Buyer Portal" 
      role="buyer" 
      navItems={navItems}
      userName="Ibrahim Osman"
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-semibold text-foreground">Logistics & Tracking</h1>
          <p className="text-sm text-muted-foreground">Track shipments and manage delivery logistics</p>
        </div>

        {/* Logistics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">In Transit</p>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">Loading</p>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-xs text-muted-foreground">Delivered (YTD)</p>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-buyer/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-buyer" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2.3 days</p>
                <p className="text-xs text-muted-foreground">Avg. Delivery Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Active Shipments</h2>
          
          {shipments.map((shipment) => (
            <div 
              key={shipment.id} 
              className="bg-card border rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewShipment(shipment)}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{shipment.crop} • {shipment.quantity}</h3>
                    <StatusBadge 
                      status={shipment.status === "in_transit" ? "active" : "pending"} 
                      label={shipment.status === "in_transit" ? "In Transit" : "Loading"}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{shipment.id} • Order: {shipment.order}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">ETA: {shipment.eta}</p>
                  <p className="text-xs text-muted-foreground">Driver: {shipment.driver} • {shipment.vehicle}</p>
                </div>
              </div>

              {/* Route Visualization */}
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-buyer" />
                      <span className="text-sm text-foreground">{shipment.origin}</span>
                    </div>
                    <div className="ml-1.5 border-l-2 border-dashed border-buyer/30 h-8" />
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-foreground">{shipment.destination}</span>
                    </div>
                  </div>
                  
                  {shipment.status === "in_transit" && (
                    <div 
                      className="w-48 h-24 bg-muted/30 rounded-lg flex items-center justify-center border cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={(e) => { e.stopPropagation(); handleTrackLive(shipment.id); }}
                    >
                      <div className="text-center">
                        <Truck className="w-8 h-8 text-buyer mx-auto animate-pulse" />
                        <p className="text-xs text-muted-foreground mt-1">Live tracking</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="bg-card border rounded-xl p-5">
          <h2 className="font-semibold text-foreground mb-4">Delivery Route Map</h2>
          <div 
            className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:bg-muted/40 transition-colors"
            onClick={() => toast({ title: "Map View", description: "Opening interactive map with all shipments." })}
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 text-buyer/50 mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map with real-time tracking</p>
              <p className="text-xs text-muted-foreground">View all active shipments and routes</p>
            </div>
          </div>
        </div>

        {/* Collection Points */}
        <div className="bg-buyer/5 border border-buyer/20 rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3">📍 Partner Collection Points</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: "Jowhar Collection Point", region: "Middle Shabelle" },
              { name: "Baidoa Aggregation Center", region: "Bay" },
              { name: "Kismayo Warehouse", region: "Lower Jubba" },
              { name: "Beledweyne Hub", region: "Hiiraan" },
            ].map((point) => (
              <div 
                key={point.name} 
                className="bg-background rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleViewCollectionPoint(point)}
              >
                <p className="font-medium text-foreground text-sm">{point.name}</p>
                <p className="text-xs text-muted-foreground">{point.region}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipment Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shipment Details</DialogTitle>
            <DialogDescription>
              {selectedShipment?.id} - {selectedShipment?.crop}
            </DialogDescription>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order</p>
                  <p className="font-medium">{selectedShipment.order}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium">{selectedShipment.quantity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Origin</p>
                  <p className="font-medium">{selectedShipment.origin}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Destination</p>
                  <p className="font-medium">{selectedShipment.destination}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Driver</p>
                  <p className="font-medium">{selectedShipment.driver}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vehicle</p>
                  <p className="font-medium">{selectedShipment.vehicle}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ETA</p>
                  <p className="font-medium">{selectedShipment.eta}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <StatusBadge 
                    status={selectedShipment.status === "in_transit" ? "active" : "pending"} 
                    label={selectedShipment.status === "in_transit" ? "In Transit" : "Loading"}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
            <Button variant="buyer" onClick={() => selectedShipment && handleCallDriver(selectedShipment)}>
              <Phone className="w-4 h-4 mr-1" />
              Call Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}