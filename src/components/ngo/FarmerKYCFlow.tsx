import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Phone,
  Shield,
  MapPin,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Wifi,
  WifiOff,
  Clock,
  Send,
  Camera,
  FileText,
  AlertCircle,
  User,
  Building,
  UserCheck,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Somalia regions and districts
const somaliaRegions = [
  { region: "Hirshabelle", districts: ["Beletweyne", "Jowhar", "Balcad", "Adale"] },
  { region: "South West State", districts: ["Baidoa", "Xudur", "Wajid", "Diinsoor"] },
  { region: "Lower Shabelle", districts: ["Afgooye", "Merca", "Baraawe", "Qoryoley"] },
  { region: "Middle Shabelle", districts: ["Jowhar", "Balcad", "Cadale"] },
  { region: "Banadir", districts: ["Mogadishu", "Waberi", "Hodan", "Wadajir"] },
];

const verifierTypes = [
  { id: "cooperative_leader", label: "Cooperative Leader", icon: Building },
  { id: "elder", label: "Elder / Community Leader", icon: Users },
  { id: "municipality", label: "Municipality Focal Person", icon: UserCheck },
  { id: "extension_officer", label: "Extension Officer (Optional)", icon: User },
];

interface Verifier {
  type: string;
  name: string;
  phone: string;
  status: "pending" | "sent" | "confirmed" | "rejected";
}

export function FarmerKYCFlow() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState<"C" | "B">("C");
  const [isOffline, setIsOffline] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [levelCComplete, setLevelCComplete] = useState(false);

  // Form state - Level C
  const [formData, setFormData] = useState({
    // Required for Level C
    phone: "",
    otp: "",
    consent: false,
    consentTimestamp: "",
    
    // Optional for Level C (Recommended)
    fullName: "",
    region: "",
    district: "",
    village: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
  });

  // Level B State
  const [verifiers, setVerifiers] = useState<Verifier[]>([]);
  const [newVerifier, setNewVerifier] = useState({
    type: "",
    name: "",
    phone: "",
  });
  const [levelBData, setLevelBData] = useState({
    // Optional uploads
    legacyIdType: "",
    legacyIdNumber: "",
    legacyIdPhoto: false,
    farmPhotos: [] as string[],
    cooperativeMembershipNumber: "",
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
        description: `Verification code sent to +252 ${formData.phone}`,
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

  const canSubmitLevelC = () => {
    return otpVerified && formData.consent;
  };

  const handleSubmitLevelC = () => {
    if (!canSubmitLevelC()) {
      toast({
        title: "Incomplete Registration",
        description: "Phone verification and consent are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLevelCComplete(true);
      toast({
        title: "Level C Registration Complete",
        description: "Farmer registered as Starter (OTP-Only). You can now upgrade to Level B.",
      });
    }, 1000);
  };

  const handleAddVerifier = () => {
    if (!newVerifier.type || !newVerifier.name || !newVerifier.phone) {
      toast({
        title: "Incomplete Verifier",
        description: "Please fill in all verifier details.",
        variant: "destructive",
      });
      return;
    }

    setVerifiers(prev => [...prev, {
      ...newVerifier,
      status: "pending"
    }]);
    setNewVerifier({ type: "", name: "", phone: "" });
    toast({
      title: "Verifier Added",
      description: "Verifier has been added to the list.",
    });
  };

  const handleSendVerificationSMS = (index: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setVerifiers(prev => prev.map((v, i) => 
        i === index ? { ...v, status: "sent" as const } : v
      ));
      setIsLoading(false);
      toast({
        title: "SMS Sent",
        description: `Verification request sent to ${verifiers[index].name}`,
      });
    }, 1500);
  };

  const handleSimulateConfirmation = (index: number) => {
    setVerifiers(prev => prev.map((v, i) => 
      i === index ? { ...v, status: "confirmed" as const } : v
    ));
    toast({
      title: "Verification Confirmed",
      description: `${verifiers[index].name} has confirmed the farmer's identity.`,
    });
  };

  const getConfirmedVerifiers = () => verifiers.filter(v => v.status === "confirmed").length;

  const canSubmitLevelB = () => {
    return levelCComplete && getConfirmedVerifiers() >= 1;
  };

  const handleSubmitLevelB = () => {
    if (!canSubmitLevelB()) {
      toast({
        title: "Verification Required",
        description: "At least 1 verifier confirmation is required for Level B.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Level B Registration Complete",
      description: "Farmer upgraded to Community Verified status.",
    });
    navigate("/ngo/beneficiaries");
  };

  const handleSaveAndExit = () => {
    toast({
      title: "Progress Saved",
      description: levelCComplete 
        ? "Farmer saved at Level C (Starter). Can upgrade to Level B later."
        : "Draft saved. Return to complete registration.",
    });
    navigate("/ngo/beneficiaries");
  };

  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentLevel("C")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                currentLevel === "C" 
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              Level C — Starter
            </button>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <button
              onClick={() => levelCComplete && setCurrentLevel("B")}
              disabled={!levelCComplete}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                currentLevel === "B" 
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" 
                  : "text-muted-foreground hover:bg-muted",
                !levelCComplete && "opacity-50 cursor-not-allowed"
              )}
            >
              Level B — Community Verified
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsOffline(!isOffline)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            isOffline 
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          )}
        >
          {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
          {isOffline ? "Offline" : "Online"}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* LEVEL C: Starter (OTP-Only) */}
        {currentLevel === "C" && (
          <div className="space-y-6">
            {levelCComplete && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="font-medium text-emerald-800 dark:text-emerald-200">Level C Complete</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    Farmer is registered. Click "Level B" above to add community verification.
                  </p>
                </div>
              </div>
            )}

            {/* Required Fields */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Shield className="w-4 h-4 text-ngo" />
                <h3 className="font-semibold text-foreground">Required for Level C</h3>
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
                    disabled={otpVerified || levelCComplete}
                    className="flex-1"
                  />
                  {!otpVerified && !levelCComplete && (
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

              {/* OTP Entry */}
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
                    <Clock className="w-3 h-3" /> Code expires in 5 minutes
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
                      setFormData(prev => ({ 
                        ...prev, 
                        consent: checked as boolean,
                        consentTimestamp: checked ? new Date().toISOString() : ""
                      }))
                    }
                    disabled={levelCComplete}
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
            </div>

            {/* Optional Fields */}
            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <User className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-muted-foreground">Optional but Recommended</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="e.g., Ahmed Hassan Mohamed"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  disabled={levelCComplete}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Region</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => setFormData(prev => ({ 
                      ...prev, 
                      region: value,
                      district: ""
                    }))}
                    disabled={levelCComplete}
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
                  <Label className="text-sm">District</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                    disabled={!formData.region || levelCComplete}
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

                <div className="space-y-2">
                  <Label htmlFor="village" className="text-sm">Village</Label>
                  <Input
                    id="village"
                    placeholder="e.g., Xaafadda"
                    value={formData.village}
                    onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                    disabled={levelCComplete}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nextOfKinName" className="text-sm">Next of Kin Name</Label>
                  <Input
                    id="nextOfKinName"
                    placeholder="e.g., Fatima Hassan"
                    value={formData.nextOfKinName}
                    onChange={(e) => setFormData(prev => ({ ...prev, nextOfKinName: e.target.value }))}
                    disabled={levelCComplete}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextOfKinPhone" className="text-sm">Next of Kin Phone</Label>
                  <Input
                    id="nextOfKinPhone"
                    placeholder="+252 63 XXX XXXX"
                    value={formData.nextOfKinPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, nextOfKinPhone: e.target.value }))}
                    disabled={levelCComplete}
                  />
                </div>
              </div>
            </div>

            {/* Level C Actions */}
            {!levelCComplete && (
              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={handleSaveAndExit}>
                  Save & Exit
                </Button>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-muted-foreground">
                    {canSubmitLevelC() 
                      ? "Ready to submit Level C" 
                      : "Complete OTP + Consent to submit"}
                  </p>
                  <Button 
                    variant="ngo" 
                    onClick={handleSubmitLevelC}
                    disabled={!canSubmitLevelC() || isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Complete Level C
                  </Button>
                </div>
              </div>
            )}

            {levelCComplete && (
              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={handleSaveAndExit}>
                  Save at Level C
                </Button>
                <Button 
                  variant="ngo" 
                  onClick={() => setCurrentLevel("B")}
                >
                  Upgrade to Level B
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* LEVEL B: Community Verified */}
        {currentLevel === "B" && (
          <div className="space-y-6">
            <div className="p-4 bg-ngo/5 border border-ngo/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-ngo mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Community Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Verify farmer and farm using trusted local structures. At least 1 verifier confirmation is required (2 recommended).
                  </p>
                </div>
              </div>
            </div>

            {/* Verifier Progress */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                getConfirmedVerifiers() >= 1 
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                  : "bg-muted text-muted-foreground"
              )}>
                {getConfirmedVerifiers()}
              </div>
              <div>
                <p className="font-medium">
                  {getConfirmedVerifiers()} of 2 verifiers confirmed
                </p>
                <p className="text-sm text-muted-foreground">
                  {getConfirmedVerifiers() >= 1 
                    ? "Minimum requirement met. Add more for stronger verification."
                    : "At least 1 verifier confirmation required."}
                </p>
              </div>
            </div>

            {/* Add Verifier */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium flex items-center gap-2">
                <Send className="w-4 h-4 text-ngo" />
                Add Verifier
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Verifier Type</Label>
                  <Select
                    value={newVerifier.type}
                    onValueChange={(value) => setNewVerifier(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {verifierTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Verifier Name</Label>
                  <Input
                    placeholder="e.g., Elder Hassan"
                    value={newVerifier.name}
                    onChange={(e) => setNewVerifier(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Verifier Phone</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="+252 63 XXX XXXX"
                      value={newVerifier.phone}
                      onChange={(e) => setNewVerifier(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    <Button variant="ngo" size="sm" onClick={handleAddVerifier}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verifier List */}
            {verifiers.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Verifiers ({verifiers.length})</h4>
                {verifiers.map((verifier, index) => {
                  const verifierType = verifierTypes.find(t => t.id === verifier.type);
                  const Icon = verifierType?.icon || Users;
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{verifier.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {verifierType?.label} • {verifier.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {verifier.status === "pending" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendVerificationSMS(index)}
                            disabled={isLoading}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send SMS
                          </Button>
                        )}
                        {verifier.status === "sent" && (
                          <>
                            <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Awaiting response
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSimulateConfirmation(index)}
                              className="text-xs"
                            >
                              (Simulate Confirm)
                            </Button>
                          </>
                        )}
                        {verifier.status === "confirmed" && (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                          </span>
                        )}
                        {verifier.status === "rejected" && (
                          <span className="text-xs text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Rejected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Optional Uploads */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2 pb-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-muted-foreground">Optional Uploads</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Legacy ID Type</Label>
                  <Select
                    value={levelBData.legacyIdType}
                    onValueChange={(value) => setLevelBData(prev => ({ ...prev, legacyIdType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="national_id">National ID Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="voter_card">Voter Card</SelectItem>
                      <SelectItem value="community_letter">Community Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Legacy ID Number</Label>
                  <Input
                    placeholder="Enter ID number"
                    value={levelBData.legacyIdNumber}
                    onChange={(e) => setLevelBData(prev => ({ ...prev, legacyIdNumber: e.target.value }))}
                    disabled={!levelBData.legacyIdType}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Legacy ID Photo</Label>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setLevelBData(prev => ({ ...prev, legacyIdPhoto: true }));
                      toast({ title: "Photo Captured", description: "ID photo saved." });
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {levelBData.legacyIdPhoto ? "Photo Captured ✓" : "Capture ID Photo"}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Farm Photos (not geo-tagged)</Label>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      setLevelBData(prev => ({ ...prev, farmPhotos: ["photo1.jpg"] }));
                      toast({ title: "Photo Added", description: "Farm photo saved." });
                    }}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    {levelBData.farmPhotos.length > 0 ? `${levelBData.farmPhotos.length} Photo(s) Added` : "Add Farm Photo"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Cooperative Membership Number</Label>
                <Input
                  placeholder="e.g., COOP-2024-001234"
                  value={levelBData.cooperativeMembershipNumber}
                  onChange={(e) => setLevelBData(prev => ({ ...prev, cooperativeMembershipNumber: e.target.value }))}
                />
              </div>
            </div>

            {/* Level B Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentLevel("C")}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Level C
                </Button>
                <Button variant="ghost" onClick={handleSaveAndExit}>
                  Save & Exit
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xs text-muted-foreground">
                  {canSubmitLevelB() 
                    ? `${getConfirmedVerifiers()} verifier(s) confirmed` 
                    : "Need at least 1 verifier confirmation"}
                </p>
                <Button 
                  variant="ngo" 
                  onClick={handleSubmitLevelB}
                  disabled={!canSubmitLevelB()}
                >
                  Complete Level B
                  <CheckCircle2 className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
