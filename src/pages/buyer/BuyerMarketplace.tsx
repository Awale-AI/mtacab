import { PortalLayout } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Search,
  ShoppingCart, 
  Truck, 
  BarChart3,
  MapPin,
  Star,
  Filter,
  Package
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/buyer", icon: LayoutDashboard },
  { label: "Browse Produce", href: "/buyer/marketplace", icon: Search },
  { label: "My Orders", href: "/buyer/orders", icon: ShoppingCart },
  { label: "Logistics", href: "/buyer/logistics", icon: Truck },
  { label: "Reports", href: "/buyer/reports", icon: BarChart3 },
];

const listings = [
  { id: 1, crop: "White Maize (Grade A)", farmer: "Jowhar Farmers Cooperative", location: "Jowhar, Middle Shabelle", quantity: "50 MT", price: "USD 0.42/kg", rating: 4.8, verified: true },
  { id: 2, crop: "Red Sorghum", farmer: "Bay Region Growers Association", location: "Baidoa, Bay", quantity: "35 MT", price: "USD 0.38/kg", rating: 4.5, verified: true },
  { id: 3, crop: "Sesame Seeds (Premium)", farmer: "Hiiraan United Cooperative", location: "Beledweyne, Hiiraan", quantity: "12 MT", price: "USD 1.85/kg", rating: 4.9, verified: true },
  { id: 4, crop: "Cowpeas", farmer: "Jubba Valley Farmers", location: "Kismayo, Lower Jubba", quantity: "20 MT", price: "USD 0.65/kg", rating: 4.3, verified: true },
  { id: 5, crop: "White Maize (Grade B)", farmer: "Shabelle River Farmers", location: "Jowhar, Middle Shabelle", quantity: "30 MT", price: "USD 0.35/kg", rating: 4.1, verified: false },
  { id: 6, crop: "Groundnuts", farmer: "Gedo Farming Collective", location: "Gedo Region", quantity: "15 MT", price: "USD 1.20/kg", rating: 4.6, verified: true },
];

export default function BuyerMarketplace() {
  const { toast } = useToast();

  const handlePlaceOrder = (crop: string) => {
    toast({
      title: "Order Initiated",
      description: `Starting order process for ${crop}. Please confirm quantity and delivery details.`,
    });
  };

  const handleContact = (farmer: string) => {
    toast({
      title: "Contact Request",
      description: `Opening message to ${farmer}...`,
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
          <h1 className="text-2xl font-heading font-semibold text-foreground">Browse Produce</h1>
          <p className="text-sm text-muted-foreground">Find and purchase agricultural produce from verified farmers and cooperatives</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border rounded-xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search crops, farmers, locations..." className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Crops</option>
                <option>Maize</option>
                <option>Sorghum</option>
                <option>Sesame</option>
                <option>Cowpeas</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>All Regions</option>
                <option>Banadir</option>
                <option>Middle Shabelle</option>
                <option>Bay</option>
                <option>Lower Jubba</option>
              </select>
              <select className="px-3 py-2 border rounded-lg bg-background text-sm">
                <option>Any Quantity</option>
                <option>1-10 MT</option>
                <option>10-50 MT</option>
                <option>50+ MT</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {listings.length} listings</p>
          <select className="px-3 py-1 border rounded-lg bg-background text-sm">
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Quantity: High to Low</option>
            <option>Rating: High to Low</option>
          </select>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-card border rounded-xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-lg bg-buyer/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-buyer" />
                </div>
                {listing.verified && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                    ✓ Verified
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-foreground mb-1">{listing.crop}</h3>
              <p className="text-sm text-muted-foreground mb-3">{listing.farmer}</p>

              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="w-3 h-3" />
                {listing.location}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-bold text-buyer">{listing.price}</p>
                  <p className="text-xs text-muted-foreground">Available: {listing.quantity}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{listing.rating}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="buyer" size="sm" className="flex-1" onClick={() => handlePlaceOrder(listing.crop)}>
                  Place Order
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleContact(listing.farmer)}>
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-buyer/5 border border-buyer/20 rounded-xl p-4">
          <h3 className="font-medium text-foreground mb-2">🌾 How Aggregation Works</h3>
          <p className="text-sm text-muted-foreground">
            TACAB connects you directly with verified farmer cooperatives. All listings show real-time availability, 
            quality grades, and transparent pricing. Orders are aggregated at local collection points for efficient logistics.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
