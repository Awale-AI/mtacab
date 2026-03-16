import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Phone,
  Shield,
  MapPin,
  Wheat,
  UserCheck,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Wifi,
  WifiOff,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FarmerRegistrationFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Somalia regions and districts
const somaliaRegions = [
  { region: "Maroodi Jeex", districts: ["Hargeisa", "Gabiley", "Baligubadle", "Salahley"] },
  { region: "Togdheer", districts: ["Burao", "Sheikh", "Odweyne", "Buuhoodle"] },
  { region: "Awdal", districts: ["Borama", "Baki", "Lughaya", "Zeila"] },
  { region: "Sanaag", districts: ["Erigavo", "El Afweyn", "Lasqoray", "Badhan"] },
  { region: "Sool", districts: ["Las Anod", "Taleh", "Ainabo", "Hudun"] },
  { region: "Banadir", districts: ["Mogadishu", "Waberi", "Hodan", "Wadajir"] },
  { region: "Lower Shabelle", districts: ["Merca", "Afgooye", "Baraawe", "Qoryoley"] },
  { region: "Bay", districts: ["Baidoa", "Buur Hakaba", "Diinsoor", "Qansax Dheere"] },
];

const crops = [
  "Sorghum", "Maize", "Cowpeas", "Sesame", "Groundnuts", 
  "Tomatoes", "Onions", "Peppers", "Watermelon", "Bananas"
];

const livestock = [
  "Cattle", "Goats", "Sheep", "Camels", "Poultry", "Donkeys"
];

const verificationSteps = [
  { id: 1, title: "Basic Profile", icon: Phone, description: "Phone & Consent" },
  { id: 2, title: "Location", icon: MapPin, description: "Community Details" },
  { id: 3, title: "Farming", icon: Wheat, description: "Agricultural Info" },
  { id: 4, title: "Identity", icon: UserCheck, description: "Document Capture" },
  { id: 5, title: "Verification", icon: Users, description: "Community Verify" },
];

export function FarmerRegistrationFlow({ open, onOpenChange }: FarmerRegistrationFlowProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOffline, setIsOffline] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1 - Basic
    phone: "",
    otp: "",
    consent: false,
    consentTimestamp: "",
    fullName: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
    
    // Step 2 - Location
    region: "",
    district: "",
    village: "",
    gpsCoordinates: "",
    
    // Step 3 - Farming
    farmSize: "",
    farmSizeUnit: "hectares",
    primaryCrops: [] as string[],
    livestock: [] as string[],
    hasIrrigation: false,
    farmingYears: "",
    
    // Step 4 - Identity
    idType: "",
    idNumber: "",
    photoCapture: false,
    
    // Step 5 - Verification
    cooperativeName: "",
    cooperativeRole: "",
    vslaGroup: "",
    communityLeader: "",
    leaderPhone: "",
  });

  const availableDistricts = somaliaRegions.find(r => r.region === formData.region)?.districts || [];

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length < 9) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Somali phone number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formData.phone}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (formData.otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setOtpVerified(true);
      setIsLoading(false);
      setFormData(prev => ({
        ...prev,
        consentTimestamp: new Date().toISOString()
      }));
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully.",
      });
    }, 1000);
  };

  const handleNext = () => {
    // Validation for Step 1
    if (currentStep === 1) {
      if (!otpVerified) {
        toast({
          title: "Phone Verification Required",
          description: "Please verify your phone number before proceeding.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.consent) {
        toast({
          title: "Consent Required",
          description: "Please provide consent to continue registration.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveAndExit = () => {
    toast({
      title: "Progress Saved",
      description: `Farmer profile saved at Step ${currentStep}. You can continue later.`,
    });
    onOpenChange(false);
  };

  const handleComplete = () => {
    toast({
      title: "Registration Complete",
      description: "Farmer has been registered and is pending community verification.",
    });
    onOpenChange(false);
    setCurrentStep(1);
    setOtpSent(false);
    setOtpVerified(false);
    setFormData({
      phone: "", otp: "", consent: false, consentTimestamp: "",
      fullName: "", nextOfKinName: "", nextOfKinPhone: "",
      region: "", district: "", village: "", gpsCoordinates: "",
      farmSize: "", farmSizeUnit: "hectares", primaryCrops: [], livestock: [],
      hasIrrigation: false, farmingYears: "",
      idType: "", idNumber: "", photoCapture: false,
      cooperativeName: "", cooperativeRole: "", vslaGroup: "",
      communityLeader: "", leaderPhone: "",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return otpVerified && formData.consent;
      case 2: return formData.region && formData.district;
      case 3: return formData.primaryCrops.length > 0 || formData.livestock.length > 0;
      case 4: return true; // Optional step
      case 5: return true; // Optional step
      default: return true;
    }
  };

  const getVerificationLevel = () => {
    let level = 0;
    if (otpVerified && formData.consent) level = 1;
    if (level === 1 && formData.region && formData.district) level = 2;
    if (level === 2 && (formData.primaryCrops.length > 0 || formData.livestock.length > 0)) level = 3;
    if (level === 3 && formData.idType) level = 4;
    if (level === 4 && formData.communityLeader) level = 5;
    return level;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-0">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-lg font-heading">
              Beneficiary Registration
            </DialogTitle>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors",
                  isOffline 
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                )}
              >
                {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                {isOffline ? "Offline Mode" : "Online"}
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Farmer Profile & Verification — Step {currentStep} of 5
          </p>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="py-4">
          <div className="flex items-center justify-between mb-6">
            {verificationSteps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                        isCompleted ? "bg-ngo text-white" :
                        isActive ? "bg-ngo/20 text-ngo border-2 border-ngo" :
                        "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    {index < verificationSteps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-1 mx-2",
                        isCompleted ? "bg-ngo" : "bg-muted"
                      )} />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] mt-1.5 text-center hidden sm:block",
                    isActive ? "text-ngo font-medium" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Verification Level Badge */}
          <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
            <Shield className="w-4 h-4 text-ngo" />
            <span className="text-xs text-muted-foreground">Verification Level:</span>
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              getVerificationLevel() === 0 ? "bg-muted text-muted-foreground" :
              getVerificationLevel() <= 2 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
              getVerificationLevel() <= 4 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
              "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            )}>
              {getVerificationLevel() === 0 ? "Not Started" :
               getVerificationLevel() === 1 ? "Starter" :
               getVerificationLevel() === 2 ? "Basic" :
               getVerificationLevel() === 3 ? "Standard" :
               getVerificationLevel() === 4 ? "Verified" :
               "Community Verified"}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-4 py-2">
          {/* STEP 1: Basic Farmer Profile */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="p-3 bg-ngo/5 rounded-lg border border-ngo/20">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-ngo mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Step 1: Basic Profile (Starter)</h4>
                    <p className="text-xs text-muted-foreground">Quick onboarding with phone verification and consent</p>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Primary Mobile Number <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted rounded-md border text-sm text-muted-foreground">
                    +252
                  </div>
                  <Input
                    id="phone"
                    placeholder="63 456 7890"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={otpVerified}
                    className="flex-1"
                  />
                  {!otpVerified && (
                    <Button 
                      variant="ngo" 
                      onClick={handleSendOTP}
                      disabled={isLoading || otpSent}
                      size="sm"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : otpSent ? "Resend" : "Send OTP"}
                    </Button>
                  )}
                  {otpVerified && (
                    <div className="flex items-center gap-1 px-3 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {/* OTP Verification */}
              {otpSent && !otpVerified && (
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium">Enter 6-digit verification code</Label>
                  <div className="flex items-center gap-3">
                    <InputOTP 
                      maxLength={6} 
                      value={formData.otp}
                      onChange={(value) => setFormData(prev => ({ ...prev, otp: value }))}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <Button variant="ngo" onClick={handleVerifyOTP} disabled={isLoading}>
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Code expires in 5 minutes
                  </p>
                </div>
              )}

              {/* Consent Checkbox */}
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, consent: checked as boolean }))
                    }
                    className="mt-0.5"
                  />
                  <div>
                    <Label htmlFor="consent" className="text-sm font-medium cursor-pointer">
                      Consent to Data Sharing <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      I consent to share my information with humanitarian and partner programs for the purpose of receiving agricultural support, vouchers, and services.
                    </p>
                  </div>
                </div>
                {formData.consent && formData.consentTimestamp && (
                  <p className="text-[10px] text-muted-foreground bg-background px-2 py-1 rounded">
                    ✓ Consent recorded: {new Date(formData.consentTimestamp).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Optional Fields */}
              <div className="space-y-4 pt-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Recommended (Optional at this step)
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="e.g., Ahmed Hassan Mohamed"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="nextOfKinName" className="text-sm">Next of Kin Name</Label>
                    <Input
                      id="nextOfKinName"
                      placeholder="e.g., Fatima Hassan"
                      value={formData.nextOfKinName}
                      onChange={(e) => setFormData(prev => ({ ...prev, nextOfKinName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextOfKinPhone" className="text-sm">Next of Kin Phone</Label>
                    <Input
                      id="nextOfKinPhone"
                      placeholder="+252 63 XXX XXXX"
                      value={formData.nextOfKinPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, nextOfKinPhone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Community */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="p-3 bg-ngo/5 rounded-lg border border-ngo/20">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-ngo mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Step 2: Location & Community</h4>
                    <p className="text-xs text-muted-foreground">Geographic and community information for targeting</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Region <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => setFormData(prev => ({ 
                      ...prev, 
                      region: value,
                      district: "" // Reset district when region changes
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {somaliaRegions.map((r) => (
                        <SelectItem key={r.region} value={r.region}>
                          {r.region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    District <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                    disabled={!formData.region}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="village" className="text-sm">Village / Settlement</Label>
                <Input
                  id="village"
                  placeholder="e.g., Xaafadda Koodbuur"
                  value={formData.village}
                  onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gps" className="text-sm">GPS Coordinates (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="gps"
                    placeholder="e.g., 9.5616, 44.0650"
                    value={formData.gpsCoordinates}
                    onChange={(e) => setFormData(prev => ({ ...prev, gpsCoordinates: e.target.value }))}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    Capture
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  GPS helps with service delivery and emergency response
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Farming Profile */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="p-3 bg-ngo/5 rounded-lg border border-ngo/20">
                <div className="flex items-start gap-2">
                  <Wheat className="w-4 h-4 text-ngo mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Step 3: Farming Profile</h4>
                    <p className="text-xs text-muted-foreground">Agricultural activities and farm details</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize" className="text-sm">Farm Size</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    placeholder="e.g., 2.5"
                    value={formData.farmSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, farmSize: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Unit</Label>
                  <Select
                    value={formData.farmSizeUnit}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, farmSizeUnit: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hectares">Hectares</SelectItem>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="feddans">Feddans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Primary Crops <span className="text-destructive">*</span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {crops.map((crop) => (
                    <Button
                      key={crop}
                      variant={formData.primaryCrops.includes(crop) ? "ngo" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          primaryCrops: prev.primaryCrops.includes(crop)
                            ? prev.primaryCrops.filter(c => c !== crop)
                            : [...prev.primaryCrops, crop]
                        }));
                      }}
                    >
                      {crop}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Livestock (if any)</Label>
                <div className="flex flex-wrap gap-2">
                  {livestock.map((animal) => (
                    <Button
                      key={animal}
                      variant={formData.livestock.includes(animal) ? "ngo" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          livestock: prev.livestock.includes(animal)
                            ? prev.livestock.filter(a => a !== animal)
                            : [...prev.livestock, animal]
                        }));
                      }}
                    >
                      {animal}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Checkbox
                  id="irrigation"
                  checked={formData.hasIrrigation}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, hasIrrigation: checked as boolean }))
                  }
                />
                <Label htmlFor="irrigation" className="text-sm cursor-pointer">
                  Has access to irrigation
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingYears" className="text-sm">Years of Farming Experience</Label>
                <Select
                  value={formData.farmingYears}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, farmingYears: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* STEP 4: Identity Verification */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="p-3 bg-ngo/5 rounded-lg border border-ngo/20">
                <div className="flex items-start gap-2">
                  <UserCheck className="w-4 h-4 text-ngo mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Step 4: Identity Verification (Optional)</h4>
                    <p className="text-xs text-muted-foreground">Document capture for higher trust level</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> This step is optional but recommended for finance-ready profiles and voucher programs.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">ID Document Type</Label>
                <Select
                  value={formData.idType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, idType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id">National ID Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="voter_card">Voter Card</SelectItem>
                    <SelectItem value="community_letter">Community Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.idType && (
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm">ID Number</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    value={formData.idNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, idNumber: e.target.value }))}
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-sm font-medium">Photo Capture</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
                    <UserCheck className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Capture farmer's photo</p>
                  <Button variant="outline" size="sm" onClick={() => {
                    setFormData(prev => ({ ...prev, photoCapture: true }));
                    toast({ title: "Photo Captured", description: "Photo saved successfully." });
                  }}>
                    {formData.photoCapture ? "Retake Photo" : "Take Photo"}
                  </Button>
                  {formData.photoCapture && (
                    <p className="text-xs text-emerald-600 mt-2 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Photo captured
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Community Verification */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div className="p-3 bg-ngo/5 rounded-lg border border-ngo/20">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-ngo mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Step 5: Community Verification</h4>
                    <p className="text-xs text-muted-foreground">Group membership and community endorsement</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cooperative" className="text-sm">Cooperative / Farmer Group</Label>
                <Input
                  id="cooperative"
                  placeholder="e.g., Sunrise Farmers Cooperative"
                  value={formData.cooperativeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, cooperativeName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Role in Cooperative</Label>
                <Select
                  value={formData.cooperativeRole}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, cooperativeRole: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="chairperson">Chairperson</SelectItem>
                    <SelectItem value="leader">Group Leader</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vsla" className="text-sm">VSLA Group (if any)</Label>
                <Input
                  id="vsla"
                  placeholder="e.g., Women's Savings Group - Hargeisa"
                  value={formData.vslaGroup}
                  onChange={(e) => setFormData(prev => ({ ...prev, vslaGroup: e.target.value }))}
                />
              </div>

              <div className="p-4 bg-muted/30 rounded-lg border space-y-4">
                <h5 className="text-sm font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-ngo" />
                  Community Leader Endorsement
                </h5>
                <p className="text-xs text-muted-foreground">
                  A community leader or elder can verify this farmer's identity and residency
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="leaderName" className="text-sm">Leader Name</Label>
                    <Input
                      id="leaderName"
                      placeholder="e.g., Elder Hassan Osman"
                      value={formData.communityLeader}
                      onChange={(e) => setFormData(prev => ({ ...prev, communityLeader: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaderPhone" className="text-sm">Leader Phone</Label>
                    <Input
                      id="leaderPhone"
                      placeholder="+252 63 XXX XXXX"
                      value={formData.leaderPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, leaderPhone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <h5 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                  Registration Summary
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Phone:</span> +252 {formData.phone}</div>
                  <div><span className="text-muted-foreground">Name:</span> {formData.fullName || "Not provided"}</div>
                  <div><span className="text-muted-foreground">Location:</span> {formData.district}, {formData.region}</div>
                  <div><span className="text-muted-foreground">Crops:</span> {formData.primaryCrops.join(", ") || "None"}</div>
                  <div><span className="text-muted-foreground">ID:</span> {formData.idType || "Not provided"}</div>
                  <div><span className="text-muted-foreground">Verification:</span> Level {getVerificationLevel()}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleSaveAndExit}>
              Save & Exit
            </Button>
          </div>
          
          <div className="flex gap-2">
            {currentStep < 5 ? (
              <Button 
                variant="ngo" 
                size="sm" 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === 1 && !otpVerified ? "Verify Phone First" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button variant="ngo" size="sm" onClick={handleComplete}>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
