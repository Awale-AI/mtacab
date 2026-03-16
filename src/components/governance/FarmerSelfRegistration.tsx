import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  logAuditEvent, 
  validateMSISDN, 
  generateFarmerId 
} from "@/lib/governance";
import { VerificationBadge } from "./VerificationBadge";
import { 
  Phone, 
  Loader2, 
  CheckCircle2,
  Shield,
  User,
  Smartphone
} from "lucide-react";

interface FarmerSelfRegistrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegistrationComplete?: (farmerId: string) => void;
}

type FlowStep = "phone" | "otp" | "consent" | "optional" | "success";

export function FarmerSelfRegistration({
  open,
  onOpenChange,
  onRegistrationComplete,
}: FarmerSelfRegistrationProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<FlowStep>("phone");
  const [isLoading, setIsLoading] = useState(false);
  
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [optionalData, setOptionalData] = useState({
    name: "",
    village: "",
    nextOfKin: "",
  });
  const [farmerId, setFarmerId] = useState("");

  const resetFlow = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setConsent(false);
    setOptionalData({ name: "", village: "", nextOfKin: "" });
    setFarmerId("");
  };

  const handleSendOTP = async () => {
    const validation = validateMSISDN(phone);
    if (!validation.valid) {
      toast({
        title: "Invalid Phone",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate OTP sent
    setOtpSent(true);
    setIsLoading(false);
    
    toast({
      title: "OTP Sent",
      description: `Verification code sent to +252 ${phone}`,
    });
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 4-digit code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate OTP verification
    setStep("consent");
    setIsLoading(false);
    
    toast({
      title: "Phone Verified",
      description: "Your phone number has been verified",
    });
  };

  const handleConsentAndContinue = () => {
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to share your data to continue",
        variant: "destructive",
      });
      return;
    }
    setStep("optional");
  };

  const handleComplete = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newFarmerId = generateFarmerId();
    setFarmerId(newFarmerId);
    
    logAuditEvent({
      actor: optionalData.name || "Self",
      actorOrganization: "Self-Registration",
      actorRole: "farmer",
      action: "farmer_registration",
      farmerId: newFarmerId,
      farmerMsisdn: phone,
      newLevel: "C",
      evidence: "OTP verified, consent given",
      status: "success",
    });
    
    setStep("success");
    setIsLoading(false);
    onRegistrationComplete?.(newFarmerId);
    
    toast({
      title: "Registration Complete",
      description: `Welcome to M-TACAB! Your Farmer ID: ${newFarmerId}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetFlow();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-farmer" />
            Farmer Self-Registration
          </DialogTitle>
          <DialogDescription>
            Register as a Level C farmer using your phone number
          </DialogDescription>
        </DialogHeader>

        {/* Phone Step */}
        {step === "phone" && (
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-farmer/10 flex items-center justify-center">
                <Phone className="w-8 h-8 text-farmer" />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your mobile number to receive a verification code
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted rounded-l-lg border border-r-0">
                  <span className="text-sm font-medium">+252</span>
                </div>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="63 456 7890"
                  className="flex-1 rounded-l-none text-lg"
                  maxLength={9}
                />
              </div>
            </div>

            {!otpSent ? (
              <Button 
                onClick={handleSendOTP} 
                disabled={isLoading || phone.length < 8}
                className="w-full bg-farmer hover:bg-farmer/90"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Send Verification Code
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 4-digit code"
                  className="text-center text-2xl tracking-widest"
                  maxLength={4}
                />
                <Button 
                  onClick={handleVerifyOTP} 
                  disabled={isLoading || otp.length < 4}
                  className="w-full bg-farmer hover:bg-farmer/90"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Verify Code
                </Button>
                <button 
                  onClick={() => { setOtp(""); handleSendOTP(); }}
                  className="text-sm text-farmer hover:underline w-full text-center"
                >
                  Resend code
                </button>
              </div>
            )}
          </div>
        )}

        {/* Consent Step */}
        {step === "consent" && (
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">Phone Verified!</h3>
              <p className="text-sm text-muted-foreground">+252 {phone}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Data Consent</h4>
              <p className="text-sm text-muted-foreground mb-4">
                By registering, you agree to share your information with authorized 
                agricultural programs, banks, and government agencies to receive:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>Agricultural advisory services</li>
                <li>Voucher and subsidy programs</li>
                <li>Financial products for farmers</li>
                <li>Market access opportunities</li>
              </ul>
            </div>

            <div className="flex items-start gap-3 p-4 bg-farmer/5 border border-farmer/20 rounded-lg">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
              />
              <label htmlFor="consent" className="text-sm leading-relaxed">
                <span className="font-medium text-foreground">I consent</span>{" "}
                <span className="text-muted-foreground">
                  to share my data with authorized institutions for agricultural services.
                </span>
              </label>
            </div>

            <Button 
              onClick={handleConsentAndContinue} 
              disabled={!consent}
              className="w-full bg-farmer hover:bg-farmer/90"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Optional Data Step */}
        {step === "optional" && (
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                Optional: Add more details to help programs find you
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Your Name (optional)
                </label>
                <Input
                  value={optionalData.name}
                  onChange={(e) => setOptionalData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Village / Town (optional)
                </label>
                <Input
                  value={optionalData.village}
                  onChange={(e) => setOptionalData(prev => ({ ...prev, village: e.target.value }))}
                  placeholder="Your location"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Next of Kin Phone (optional)
                </label>
                <Input
                  value={optionalData.nextOfKin}
                  onChange={(e) => setOptionalData(prev => ({ ...prev, nextOfKin: e.target.value }))}
                  placeholder="Emergency contact"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleComplete}
                disabled={isLoading}
                className="flex-1"
              >
                Skip & Finish
              </Button>
              <Button 
                onClick={handleComplete} 
                disabled={isLoading}
                className="flex-1 bg-farmer hover:bg-farmer/90"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Complete
              </Button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="space-y-4 py-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-foreground">
              Welcome to M-TACAB!
            </h3>
            
            <p className="text-muted-foreground">
              You are now registered as a farmer
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Farmer ID</p>
                <p className="font-mono font-medium text-foreground">{farmerId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">+252 {phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Verification Level</p>
                <VerificationBadge level="C" />
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Next:</strong> Get verified by a community leader or 
                cooperative to access vouchers and programs.
              </p>
            </div>

            <Button onClick={() => onOpenChange(false)} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
