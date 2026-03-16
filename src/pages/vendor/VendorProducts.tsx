import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  LayoutDashboard, 
  Package, 
  Ticket, 
  ShoppingBag, 
  BarChart3,
  Plus,
  Search,
  Edit,
  Trash2
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "Product Catalog", href: "/vendor/products", icon: Package },
  { label: "Voucher Redemption", href: "/vendor/redemptions", icon: Ticket },
  { label: "Sales & Orders", href: "/vendor/sales", icon: ShoppingBag },
  { label: "Reports & Analytics", href: "/vendor/reports", icon: BarChart3 },
];

const products = [
  { id: 1, name: "Maize Seeds (10kg)", category: "Seeds", price: "USD 25", stock: 150, status: "active", voucherEligible: true },
  { id: 2, name: "NPK Fertilizer (50kg)", category: "Fertilizer", price: "USD 45", stock: 80, status: "low_stock", voucherEligible: true },
  { id: 3, name: "Pesticide Spray (1L)", category: "Pesticides", price: "USD 15", stock: 200, status: "active", voucherEligible: true },
  { id: 4, name: "Sorghum Seeds (5kg)", category: "Seeds", price: "USD 18", stock: 95, status: "active", voucherEligible: true },
  { id: 5, name: "Herbicide Concentrate (500ml)", category: "Herbicides", price: "USD 22", stock: 45, status: "low_stock", voucherEligible: false },
  { id: 6, name: "Hand Sprayer (5L)", category: "Equipment", price: "$35", stock: 30, status: "low_stock", voucherEligible: false },
  { id: 7, name: "Sesame Seeds (2kg)", category: "Seeds", price: "$12", stock: 180, status: "active", voucherEligible: true },
  { id: 8, name: "Urea Fertilizer (25kg)", category: "Fertilizer", price: "$30", stock: 120, status: "active", voucherEligible: true },
];

export default function VendorProducts() {
  const { toast } = useToast();
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<null | typeof products[0]>(null);

  const handleAddProduct = () => {
    setAddProductOpen(false);
    toast({
      title: "Product Added",
      description: "New product has been added to your catalog.",
    });
  };

  const handleEditProduct = (product: typeof products[0]) => {
    setEditProduct(product);
    toast({
      title: "Edit Product",
      description: `Editing ${product.name}...`,
    });
  };

  const handleDeleteProduct = (product: typeof products[0]) => {
    toast({
      title: "Product Removed",
      description: `${product.name} has been removed from your catalog.`,
      variant: "destructive",
    });
  };

  return (
    <>
    <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" placeholder="e.g., Maize Seeds (10kg)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" className="w-full px-3 py-2 border rounded-lg bg-background">
              <option>Seeds</option>
              <option>Fertilizer</option>
              <option>Pesticides</option>
              <option>Equipment</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input id="price" placeholder="e.g., 25" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input id="stock" placeholder="e.g., 100" type="number" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAddProductOpen(false)}>Cancel</Button>
          <Button variant="vendor" onClick={handleAddProduct}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <PortalLayout 
      title="Vendor Portal" 
      role="vendor" 
      navItems={navItems}
      userName="Ahmed Hassan"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Product Catalog</h1>
            <p className="text-sm text-muted-foreground">Manage your agricultural input listings</p>
          </div>
          <Button variant="vendor" onClick={() => setAddProductOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Product
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          <select className="px-3 py-2 border rounded-lg bg-background text-sm">
            <option>All Categories</option>
            <option>Seeds</option>
            <option>Fertilizer</option>
            <option>Pesticides</option>
            <option>Equipment</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-card border rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {product.category}
                </span>
                {product.voucherEligible && (
                  <span className="text-xs px-2 py-1 rounded-full bg-vendor/10 text-vendor">
                    Voucher OK
                  </span>
                )}
              </div>
              
              <div className="w-full h-24 bg-muted/50 rounded-lg mb-3 flex items-center justify-center">
                <Package className="w-8 h-8 text-muted-foreground/50" />
              </div>
              
              <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-vendor">{product.price}</span>
                <StatusBadge 
                  status={product.status === "low_stock" ? "pending" : "active"} 
                  label={product.status === "low_stock" ? "Low Stock" : `${product.stock} in stock`}
                />
              </div>
              
              <div className="flex gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditProduct(product)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product)}>
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher Info */}
        <div className="bg-vendor/5 border border-vendor/20 rounded-xl p-4">
          <h3 className="font-medium text-foreground mb-2">💳 Voucher-Eligible Products</h3>
          <p className="text-sm text-muted-foreground">
            Products marked with "Voucher OK" can be purchased using program vouchers. Ensure your prices are aligned with NGO subsidy programs for maximum farmer reach.
          </p>
        </div>
      </div>
    </PortalLayout>
    </>
  );
}
