import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  Users, 
  Ticket, 
  Package,
  Bell,
  Plus,
  Eye
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

const produceListings = [
  {
    id: 1,
    crop: "Maize (Yellow)",
    quantity: "500 kg",
    quality: "Grade A",
    price: "USD 0.45/kg",
    listedDate: "Jan 5, 2025",
    status: "active" as const,
    views: 12,
  },
  {
    id: 2,
    crop: "Sorghum",
    quantity: "2 tonnes",
    quality: "Fresh",
    price: "USD 0.38/kg",
    listedDate: "Jan 3, 2025",
    status: "active" as const,
    views: 8,
  },
];

export default function FarmerProduce() {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleListProduce = () => {
    setAddDialogOpen(false);
    toast({
      title: "Produce Listed",
      description: "Your produce has been listed successfully. Buyers can now see it.",
    });
  };

  return (
    <>
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List New Produce</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="crop">Crop Type</Label>
            <Input id="crop" placeholder="e.g., Maize, Sorghum, Sesame" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" placeholder="e.g., 500 kg, 2 tonnes" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price per kg (USD)</Label>
            <Input id="price" placeholder="e.g., 0.45" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quality">Quality Grade</Label>
            <Input id="quality" placeholder="e.g., Grade A, Fresh" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="farmer" onClick={handleListProduce}>List Produce</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <PortalLayout 
      title="Farmer Portal" 
      role="farmer" 
      navItems={navItems}
      userName="Amara Koroma"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">My Produce</h1>
            <p className="text-muted-foreground">List and manage your harvest for buyers</p>
          </div>
          <Button variant="farmer" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            List New Produce
          </Button>
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {produceListings.map((listing) => (
            <div key={listing.id} className="bg-card border rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-farmer/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-farmer" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{listing.crop}</h3>
                      <StatusBadge status={listing.status} />
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>Qty: {listing.quantity}</span>
                      <span>•</span>
                      <span>{listing.quality}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground">{listing.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{listing.views} views</span>
                  </div>
                  <span className="text-muted-foreground">Listed {listing.listedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Info */}
        {produceListings.length === 0 && (
          <div className="bg-muted/30 border border-dashed rounded-xl p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-1">No produce listed</h3>
            <p className="text-sm text-muted-foreground mb-4">Start by listing your harvest for buyers to see</p>
            <Button variant="farmer" onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              List Your First Produce
            </Button>
          </div>
        )}

        {/* How Buyers Find You */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-3">How Buyers Find You</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>List your produce with quantity, quality grade, and asking price</li>
            <li>Buyers and aggregators browse listings by crop type and location</li>
            <li>Interested buyers will contact you via the platform or phone</li>
            <li>Negotiate and agree on final price and pickup/delivery</li>
            <li>Complete the sale and update your listing</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-4">
            💡 Tip: You can also list produce via USSD (*456*3#) if you don't have internet access
          </p>
        </div>

        {/* Market Prices */}
        <div className="bg-card border rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-4">Current Market Prices (Your Area)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { crop: "Maize", price: "USD 0.42-0.48/kg" },
              { crop: "Sorghum", price: "USD 0.35-0.42/kg" },
              { crop: "Sesame", price: "USD 1.80-2.10/kg" },
              { crop: "Cowpeas", price: "USD 0.60-0.75/kg" },
            ].map((item) => (
              <div key={item.crop} className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">{item.crop}</p>
                <p className="text-sm font-medium text-foreground">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
    </>
  );
}
