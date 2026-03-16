import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Search, 
  UserPlus, 
  Shield, 
  CheckCircle2,
  AlertTriangle,
  Phone,
  User,
  MapPin,
  FileCheck,
  Loader2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FarmerSearchCreateFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FlowStep = "search" | "found" | "create" | "success";
type VerificationLevel = "C" | "B" | "A";

interface ExistingFarmer {
  id: string;
  name: string;
  phone: string;
  region: string;
  village: string;
  verificationLevel: VerificationLevel;
  cooperative?: string;
}

const somaliaRegions = [
  { name: "Middle Shabelle", districts: ["Jowhar", "Balcad", "Adale"] },
  { name: "Lower Shabelle", districts: ["Afgooye", "Merca", "Qoryoley", "Baraawe"] },
  { name: "Hiiraan", districts: ["Beledweyne", "Buloburte", "Jalalaqsi"] },
  { name: "Bay", districts: ["Baidoa", "Diinsoor", "Qansax Dheere"] },
  { name: "Bakool", districts: ["Xudur", "Waajid", "Rab Dhuure"] },
];

export function FarmerSearchCreateFlow({ open, onOpenChange }: FarmerSearchCreateFlowProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<FlowStep>("search");
  const [isSearching, setIsSearching] = useState(false);
  const [msisdn, setMsisdn] = useState("");
  const [existingFarmer, setExistingFarmer] = useState<ExistingFarmer | null>(null);
  
  // Create form state
  const [verificationLevel, setVerificationLevel] = useState<VerificationLevel>("C");
  const [formData, setFormData] = useState({
    fullName: "",
    region: "",
    district: "",
    village: "",
    farmSize: "",
    primaryCrop: "",
    // Level B fields
    verifierName: "",
    verifierPhone: "",
    verifierRelationship: "",
    // Level A fields
    idType: "",
    idNumber: "",
    idVerified: false,
  });

  const [consent, setConsent] = useState(false);

  const resetFlow = () => {
    setStep("search");
    setMsisdn("");
    setExistingFarmer(null);
    setVerificationLevel("C");
    setFormData({
      fullName: "",
      region: "",
      district: "",
      village: "",
      farmSize: "",
      primaryCrop: "",
      verifierName: "",
      verifierPhone: "",
      verifierRelationship: "",
      idType: "",
      idNumber: "",
      idVerified: false,
    });
    setConsent(false);
  };

  const handleSearch = async () => {
    if (!msisdn || msisdn.length < 9) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Somali phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock: 30% chance of finding existing farmer
    const found = Math.random() > 0.7;
    
    if (found) {
      setExistingFarmer({
        id: "FRM-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        name: "Existing Farmer Name",
        phone: msisdn,
        region: "Middle Shabelle",
        village: "Jowhar Town",
        verificationLevel: "B",
        cooperative: "Jowhar Farmers Coop",
      });
      setStep("found");
    } else {
      setStep("create");
    }
    
    setIsSearching(false);
  };

  const handleCreateFarmer = async () => {
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Farmer consent is required before registration",
        variant: "destructive",
      });
      return;
    }

    // Validate based on level
    if (!formData.fullName || !formData.region) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (verificationLevel === "B" && !formData.verifierName) {
      toast({
        title: "Verifier Required",
        description: "Level B requires at least one community verifier",
        variant: "destructive",
      });
      return;
    }

    if (verificationLevel === "A" && (!formData.idType || !formData.idNumber)) {
      toast({
        title: "ID Required",
        description: "Level A requires verified government ID",
        variant: "destructive",
      });
      return;
    }

    // Simulate creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStep("success");
    toast({
      title: "Farmer Registered",
      description: `New farmer registered at Level ${verificationLevel}`,
    });
  };

  const selectedRegion = somaliaRegions.find(r => r.name === formData.region);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetFlow();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-bank" />
            {step === "search" && "Search or Register Farmer"}
            {step === "found" && "Farmer Already Exists"}
            {step === "create" && "Register New Farmer"}
            {step === "success" && "Registration Complete"}
          </DialogTitle>
          <DialogDescription>
            {step === "search" && "Banks must search by MSISDN before creating any farmer record"}
            {step === "found" && "This phone number is already registered in the national registry"}
            {step === "create" && "No existing record found. Create new farmer with evidence-based verification level."}
            {step === "success" && "Farmer has been successfully added to the national registry"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: MSISDN Search */}
        {step === "search" && (
          <div className="space-y-6 py-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-200">Mandatory MSISDN Search</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Per M-TACAB governance rules, you must search for existing farmer records before creating a new one. 
                    Duplicate registrations are not allowed.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="msisdn" className="text-sm font-medium">
                Farmer's Mobile Number (MSISDN)
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 bg-muted rounded-l-lg border border-r-0">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">+252</span>
                </div>
                <Input
                  id="msisdn"
                  placeholder="63 456 7890"
                  value={msisdn}
                  onChange={(e) => setMsisdn(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 rounded-l-none"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the farmer's primary mobile number to check the national registry
              </p>
            </div>

            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !msisdn}
              className="w-full bg-bank hover:bg-bank/90"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching Registry...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search National Registry
                </>
              )}
            </Button>
          </div>
        )}

        {/* Step 2a: Farmer Found */}
        {step === "found" && existingFarmer && (
          <div className="space-y-6 py-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Farmer Found in Registry</h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    This farmer already exists. No duplicate registration allowed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-bank/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-bank" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{existingFarmer.name}</p>
                  <p className="text-sm text-muted-foreground">{existingFarmer.id}</p>
                </div>
                <div className="ml-auto">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    existingFarmer.verificationLevel === "A" && "bg-green-100 text-green-800",
                    existingFarmer.verificationLevel === "B" && "bg-emerald-100 text-emerald-800",
                    existingFarmer.verificationLevel === "C" && "bg-amber-100 text-amber-800",
                  )}>
                    Level {existingFarmer.verificationLevel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">+252 {existingFarmer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Region</p>
                  <p className="text-sm font-medium">{existingFarmer.region}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Village</p>
                  <p className="text-sm font-medium">{existingFarmer.village}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cooperative</p>
                  <p className="text-sm font-medium">{existingFarmer.cooperative || "None"}</p>
                </div>
              </div>
            </div>

            {existingFarmer.verificationLevel !== "A" && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Upgrade Available
                </h4>
                <p className="text-sm text-muted-foreground">
                  This farmer can be upgraded from Level {existingFarmer.verificationLevel} to a higher verification level 
                  by providing additional evidence. Use the "Upgrade Verification" flow.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("search")} className="flex-1">
                Search Another
              </Button>
              <Button onClick={() => onOpenChange(false)} className="flex-1 bg-bank hover:bg-bank/90">
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Step 2b: Create New Farmer */}
        {step === "create" && (
          <div className="space-y-6 py-4">
            {/* Level Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Verification Level (based on evidence)</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { level: "C" as const, name: "Starter", desc: "Phone + Consent only" },
                  { level: "B" as const, name: "Community", desc: "With verifier" },
                  { level: "A" as const, name: "Strong ID", desc: "Gov ID verified" },
                ].map((opt) => (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setVerificationLevel(opt.level)}
                    className={cn(
                      "p-3 rounded-lg border-2 text-center transition-all",
                      verificationLevel === opt.level
                        ? "border-bank bg-bank/5"
                        : "border-border hover:border-bank/50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold",
                      opt.level === "A" && "bg-green-100 text-green-700",
                      opt.level === "B" && "bg-emerald-100 text-emerald-700",
                      opt.level === "C" && "bg-amber-100 text-amber-700",
                    )}>
                      {opt.level}
                    </div>
                    <p className="font-medium text-sm">{opt.name}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Display */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">+252 {msisdn}</span>
                <span className="ml-auto text-xs bg-bank/10 text-bank px-2 py-0.5 rounded">Primary MSISDN</span>
              </div>
            </div>

            {/* Basic Info (All Levels) */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Basic Information
              </h4>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Farmer's full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Region *</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, region: value, district: "" }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {somaliaRegions.map((region) => (
                          <SelectItem key={region.name} value={region.name}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>District</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                      disabled={!formData.region}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedRegion?.districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="village">Village / Town</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                    placeholder="Village or town name"
                  />
                </div>
              </div>
            </div>

            {/* Level B: Community Verifier */}
            {(verificationLevel === "B" || verificationLevel === "A") && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Community Verification (Level B)
                </h4>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="verifierName">Verifier Name *</Label>
                    <Input
                      id="verifierName"
                      value={formData.verifierName}
                      onChange={(e) => setFormData(prev => ({ ...prev, verifierName: e.target.value }))}
                      placeholder="Community leader, coop chair, etc."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="verifierPhone">Verifier Phone</Label>
                      <Input
                        id="verifierPhone"
                        value={formData.verifierPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, verifierPhone: e.target.value }))}
                        placeholder="+252 ..."
                      />
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Select
                        value={formData.verifierRelationship}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, verifierRelationship: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coop_leader">Cooperative Leader</SelectItem>
                          <SelectItem value="village_elder">Village Elder</SelectItem>
                          <SelectItem value="vsla_chair">VSLA Chair</SelectItem>
                          <SelectItem value="extension_agent">Extension Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Level A: Strong ID */}
            {verificationLevel === "A" && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  Government ID Verification (Level A)
                </h4>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>ID Type *</Label>
                      <Select
                        value={formData.idType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, idType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="national_id">National ID</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="voter_card">Voter Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="idNumber">ID Number *</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                        placeholder="ID number"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <Checkbox
                      id="idVerified"
                      checked={formData.idVerified}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, idVerified: checked as boolean }))}
                    />
                    <label htmlFor="idVerified" className="text-sm text-green-800 dark:text-green-200">
                      I have physically verified this ID document
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Consent */}
            <div className="pt-4 border-t">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">Farmer Consent *</span>
                  <br />
                  I confirm that the farmer has given verbal consent to register their information 
                  in the national farmer registry and share it with authorized institutions.
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep("search")} className="flex-1">
                Back to Search
              </Button>
              <Button 
                onClick={handleCreateFarmer} 
                disabled={!consent}
                className="flex-1 bg-bank hover:bg-bank/90"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register Farmer
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="space-y-6 py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Farmer Successfully Registered
              </h3>
              <p className="text-muted-foreground">
                {formData.fullName} has been added to the national registry at Level {verificationLevel}
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Phone (MSISDN)</p>
                  <p className="font-medium">+252 {msisdn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Verification Level</p>
                  <p className="font-medium">Level {verificationLevel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Region</p>
                  <p className="font-medium">{formData.region}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created By</p>
                  <p className="font-medium">Bank / MFI</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={resetFlow} className="flex-1">
                Register Another
              </Button>
              <Button onClick={() => onOpenChange(false)} className="flex-1 bg-bank hover:bg-bank/90">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
