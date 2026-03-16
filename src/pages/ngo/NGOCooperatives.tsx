import { useState } from "react";
import { PortalLayout } from "@/components/PortalLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Users, 
  Building,
  Ticket, 
  MessageSquare, 
  BarChart3,
  Plus,
  MapPin,
  Wallet,
  UserPlus
} from "lucide-react";

const navItems = [
  { label: "Program Overview", href: "/ngo", icon: LayoutDashboard },
  { label: "Farmer Lookup", href: "/ngo/beneficiaries", icon: Users },
  { label: "Cooperatives & VSLAs", href: "/ngo/cooperatives", icon: Building },
  { label: "Vouchers & Subsidies", href: "/ngo/vouchers", icon: Ticket },
  { label: "Communications", href: "/ngo/communications", icon: MessageSquare },
  { label: "Monitoring & Reports", href: "/ngo/reports", icon: BarChart3 },
];

const initialCooperatives = [
  { id: 1, name: "Sunrise Farmers Cooperative", members: 48, state: "Maroodi Jeex", lga: "Hargeisa", status: "active" as const, vsla: true, fundBalance: 4250 },
  { id: 2, name: "Green Fields Association", members: 35, state: "Togdheer", lga: "Burao", status: "active" as const, vsla: true, fundBalance: 3200 },
  { id: 3, name: "Highland Growers Group", members: 52, state: "Awdal", lga: "Borama", status: "active" as const, vsla: true, fundBalance: 5100 },
  { id: 4, name: "Unity Farmers Network", members: 28, state: "Maroodi Jeex", lga: "Gabiley", status: "pending" as const, vsla: false, fundBalance: 0 },
  { id: 5, name: "Prosperity Agri-Coop", members: 41, state: "Sanaag", lga: "Erigavo", status: "active" as const, vsla: true, fundBalance: 2800 },
];

const regions = [
  { state: "Maroodi Jeex", lgas: ["Hargeisa", "Gabiley", "Berbera"] },
  { state: "Togdheer", lgas: ["Burao", "Odweyne", "Sheikh"] },
  { state: "Awdal", lgas: ["Borama", "Zeila", "Baki"] },
  { state: "Sanaag", lgas: ["Erigavo", "Las Qoray", "El Afweyn"] },
  { state: "Sool", lgas: ["Las Anod", "Taleh", "Ainabo"] },
];

export default function NGOCooperatives() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cooperatives, setCooperatives] = useState(initialCooperatives);
  const [newCoop, setNewCoop] = useState({
    name: "",
    state: "",
    lga: "",
    hasVsla: false,
  });
  const { toast } = useToast();

  const selectedRegion = regions.find((r) => r.state === newCoop.state);

  const handleCreateCooperative = () => {
    if (!newCoop.name || !newCoop.state || !newCoop.lga) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newCooperative = {
      id: cooperatives.length + 1,
      name: newCoop.name,
      members: 0,
      state: newCoop.state,
      lga: newCoop.lga,
      status: "pending" as const,
      vsla: newCoop.hasVsla,
      fundBalance: 0,
    };

    setCooperatives([...cooperatives, newCooperative]);
    setNewCoop({ name: "", state: "", lga: "", hasVsla: false });
    setIsDialogOpen(false);

    toast({
      title: "Cooperative created",
      description: `${newCoop.name} has been created successfully.`,
    });
  };

  return (
    <PortalLayout 
      title="NGO Portal" 
      role="ngo" 
      navItems={navItems}
      userName="Sarah Okonkwo"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-1">Cooperatives & VSLAs</h1>
            <p className="text-muted-foreground">{cooperatives.length} active farmer groups across 3 regions</p>
          </div>
          <Button variant="ngo" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Cooperative
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-ngo/10">
                <Building className="w-5 h-5 text-ngo" />
              </div>
              <span className="text-sm text-muted-foreground">Total Cooperatives</span>
            </div>
            <p className="text-3xl font-semibold text-foreground">{cooperatives.length}</p>
          </div>
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Wallet className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">VSLAs Active</span>
            </div>
            <p className="text-3xl font-semibold text-foreground">{cooperatives.filter(c => c.vsla).length}</p>
          </div>
          <div className="bg-card border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Total VSLA Funds</span>
            </div>
            <p className="text-3xl font-semibold text-foreground">USD {(cooperatives.reduce((sum, c) => sum + c.fundBalance, 0) / 1000).toFixed(1)}K</p>
          </div>
        </div>

        {/* Cooperatives List */}
        <div className="space-y-4">
          {cooperatives.map((coop) => (
            <div key={coop.id} className="bg-card border rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-ngo/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-ngo" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{coop.name}</h3>
                      <StatusBadge status={coop.status} />
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {coop.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {coop.lga}, {coop.state}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {coop.vsla ? (
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">VSLA Balance</span>
                      <p className="font-semibold text-success">USD {(coop.fundBalance / 1000).toFixed(1)}K</p>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">No VSLA</span>
                  )}
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Cooperative Info */}
        <div className="bg-ngo/5 border border-ngo/20 rounded-xl p-5">
          <h3 className="font-medium text-foreground mb-2">Creating Cooperatives</h3>
          <p className="text-sm text-muted-foreground mb-3">
            As an NGO, you can create and manage farmer cooperatives. Cooperatives enable:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Group-based voucher distribution</li>
            <li>• Village Savings & Loan Associations (VSLAs)</li>
            <li>• Collective bargaining for inputs and produce sales</li>
            <li>• Shared training and extension services</li>
          </ul>
        </div>
      </div>

      {/* Create Cooperative Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Cooperative</DialogTitle>
            <DialogDescription>
              Set up a new farmer cooperative or group in your program area.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Cooperative Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Unity Farmers Group"
                value={newCoop.name}
                onChange={(e) => setNewCoop({ ...newCoop, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Region/State *</Label>
              <Select
                value={newCoop.state}
                onValueChange={(value) => setNewCoop({ ...newCoop, state: value, lga: "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.state} value={region.state}>
                      {region.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lga">District/LGA *</Label>
              <Select
                value={newCoop.lga}
                onValueChange={(value) => setNewCoop({ ...newCoop, lga: value })}
                disabled={!newCoop.state}
              >
                <SelectTrigger>
                  <SelectValue placeholder={newCoop.state ? "Select district" : "Select region first"} />
                </SelectTrigger>
                <SelectContent>
                  {selectedRegion?.lgas.map((lga) => (
                    <SelectItem key={lga} value={lga}>
                      {lga}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vsla"
                checked={newCoop.hasVsla}
                onCheckedChange={(checked) => setNewCoop({ ...newCoop, hasVsla: checked === true })}
              />
              <Label htmlFor="vsla" className="text-sm font-normal">
                Enable Village Savings & Loan Association (VSLA)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="ngo" onClick={handleCreateCooperative}>
              Create Cooperative
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalLayout>
  );
}
