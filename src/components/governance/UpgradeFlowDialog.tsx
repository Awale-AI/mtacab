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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { 
  VerificationLevel, 
  PortalRole, 
  canPerformUpgrade, 
  logAuditEvent,
  LEVEL_METADATA 
} from "@/lib/governance";
import { VerificationBadge } from "./VerificationBadge";
import { 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  User, 
  FileCheck, 
  Loader2,
  Send,
  Shield
} from "lucide-react";

interface UpgradeFlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmer: {
    id: string;
    name: string;
    phone: string;
    currentLevel: VerificationLevel;
  };
  targetLevel: VerificationLevel;
  role: PortalRole;
  actorName: string;
  actorOrganization: string;
  onUpgradeComplete?: (newLevel: VerificationLevel) => void;
}

type FlowStep = "requirements" | "verifier" | "sms_sent" | "confirmation" | "id_review" | "success";

interface Verifier {
  name: string;
  phone: string;
  type: string;
  status: "pending" | "confirmed" | "rejected" | "expired";
}

export function UpgradeFlowDialog({
  open,
  onOpenChange,
  farmer,
  targetLevel,
  role,
  actorName,
  actorOrganization,
  onUpgradeComplete,
}: UpgradeFlowDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<FlowStep>("requirements");
  const [isLoading, setIsLoading] = useState(false);
  
  // C → B flow state
  const [verifier, setVerifier] = useState<Verifier>({
    name: "",
    phone: "",
    type: "",
    status: "pending",
  });
  
  // B → A flow state
  const [idData, setIdData] = useState({
    idType: "",
    idNumber: "",
    verified: false,
    notes: "",
  });

  const canUpgrade = canPerformUpgrade(role, farmer.currentLevel, targetLevel);
  const isCtoB = farmer.currentLevel === "C" && targetLevel === "B";
  const isBtoA = farmer.currentLevel === "B" && targetLevel === "A";

  const resetFlow = () => {
    setStep("requirements");
    setVerifier({ name: "", phone: "", type: "", status: "pending" });
    setIdData({ idType: "", idNumber: "", verified: false, notes: "" });
  };

  const handleSendVerificationSMS = async () => {
    if (!verifier.name || !verifier.phone || !verifier.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all verifier details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate SMS sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    logAuditEvent({
      actor: actorName,
      actorOrganization,
      actorRole: role,
      action: "verification_upgrade",
      farmerId: farmer.id,
      farmerMsisdn: farmer.phone,
      oldLevel: farmer.currentLevel,
      newLevel: targetLevel,
      evidence: `Verifier: ${verifier.name} (${verifier.phone})`,
      status: "success",
      reason: "SMS sent to verifier",
    });
    
    setStep("sms_sent");
    setIsLoading(false);
    
    toast({
      title: "Verification SMS Sent",
      description: `SMS sent to ${verifier.name} at ${verifier.phone}`,
    });
  };

  const handleSimulateVerifierResponse = async (response: "confirmed" | "rejected") => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVerifier(prev => ({ ...prev, status: response }));
    
    if (response === "confirmed") {
      setStep("confirmation");
    } else {
      logAuditEvent({
        actor: actorName,
        actorOrganization,
        actorRole: role,
        action: "verification_upgrade",
        farmerId: farmer.id,
        farmerMsisdn: farmer.phone,
        oldLevel: farmer.currentLevel,
        newLevel: targetLevel,
        status: "failed",
        reason: "Verifier rejected confirmation",
      });
      
      toast({
        title: "Verification Rejected",
        description: "The verifier did not confirm this farmer's identity",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleCompleteCtoBUpgrade = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    logAuditEvent({
      actor: actorName,
      actorOrganization,
      actorRole: role,
      action: "verification_upgrade",
      farmerId: farmer.id,
      farmerMsisdn: farmer.phone,
      oldLevel: "C",
      newLevel: "B",
      evidence: `Verified by ${verifier.name} (${verifier.type})`,
      status: "success",
    });
    
    setStep("success");
    setIsLoading(false);
    onUpgradeComplete?.("B");
  };

  const handleCompleteBtoAUpgrade = async () => {
    if (!idData.idType || !idData.idNumber || !idData.verified) {
      toast({
        title: "ID Verification Required",
        description: "Please verify the ID document before completing upgrade",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logAuditEvent({
      actor: actorName,
      actorOrganization,
      actorRole: role,
      action: "verification_upgrade",
      farmerId: farmer.id,
      farmerMsisdn: farmer.phone,
      oldLevel: "B",
      newLevel: "A",
      evidence: `${idData.idType}: ${idData.idNumber}`,
      status: "success",
    });
    
    setStep("success");
    setIsLoading(false);
    onUpgradeComplete?.("A");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetFlow();
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Verification Upgrade
          </DialogTitle>
          <DialogDescription>
            Upgrade {farmer.name} from Level {farmer.currentLevel} to Level {targetLevel}
          </DialogDescription>
        </DialogHeader>

        {!canUpgrade ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Unauthorized Action</h3>
            <p className="text-sm text-muted-foreground">
              Your role ({role}) is not authorized to perform this upgrade.
              {isBtoA && role === "ngo" && (
                <> Level A upgrades require Bank or Government review.</>
              )}
            </p>
          </div>
        ) : (
          <>
            {/* Requirements Step */}
            {step === "requirements" && (
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <VerificationBadge level={farmer.currentLevel} size="lg" />
                    <p className="text-xs text-muted-foreground mt-1">Current</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <div className="text-center">
                    <VerificationBadge level={targetLevel} size="lg" />
                    <p className="text-xs text-muted-foreground mt-1">Target</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    Requirements for Level {targetLevel}
                  </h4>
                  <ul className="space-y-2">
                    {LEVEL_METADATA[targetLevel].requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => setStep(isCtoB ? "verifier" : "id_review")} 
                  className="w-full"
                >
                  Start Upgrade Process
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* C → B: Verifier Selection */}
            {step === "verifier" && isCtoB && (
              <div className="space-y-4 py-4">
                <div className="space-y-3">
                  <Label>Verifier Name *</Label>
                  <Input
                    value={verifier.name}
                    onChange={(e) => setVerifier(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Community leader, cooperative chair, etc."
                  />
                </div>

                <div className="space-y-3">
                  <Label>Verifier Phone *</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-muted rounded-l-lg border border-r-0">
                      <Phone className="w-4 h-4 text-muted-foreground mr-2" />
                      <span className="text-sm">+252</span>
                    </div>
                    <Input
                      value={verifier.phone}
                      onChange={(e) => setVerifier(prev => ({ 
                        ...prev, 
                        phone: e.target.value.replace(/\D/g, "") 
                      }))}
                      placeholder="63 456 7890"
                      className="flex-1 rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Verifier Type *</Label>
                  <Select
                    value={verifier.type}
                    onValueChange={(value) => setVerifier(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select verifier type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cooperative_leader">Cooperative Leader</SelectItem>
                      <SelectItem value="village_elder">Village Elder</SelectItem>
                      <SelectItem value="vsla_chair">VSLA Chair</SelectItem>
                      <SelectItem value="extension_agent">Extension Agent</SelectItem>
                      <SelectItem value="religious_leader">Religious Leader</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    An SMS will be sent to the verifier asking them to confirm 
                    they know {farmer.name} and can vouch for their farming activity.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("requirements")} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSendVerificationSMS} 
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Send Verification SMS
                  </Button>
                </div>
              </div>
            )}

            {/* C → B: SMS Sent */}
            {step === "sms_sent" && isCtoB && (
              <div className="space-y-4 py-4">
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <Send className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">SMS Sent</h3>
                  <p className="text-sm text-muted-foreground">
                    Waiting for {verifier.name} to respond...
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p className="font-medium mb-2">SMS Preview:</p>
                  <p className="text-muted-foreground italic">
                    "M-TACAB: Do you confirm that {farmer.name} ({farmer.phone}) 
                    is a farmer in your community? Reply YES to confirm or NO to reject."
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground mb-3 text-center">
                    Demo: Simulate verifier response
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleSimulateVerifierResponse("rejected")}
                      disabled={isLoading}
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Simulate: Reject
                    </Button>
                    <Button
                      onClick={() => handleSimulateVerifierResponse("confirmed")}
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simulate: Confirm"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* C → B: Confirmation */}
            {step === "confirmation" && isCtoB && (
              <div className="space-y-4 py-4">
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Verifier Confirmed</h3>
                  <p className="text-sm text-muted-foreground">
                    {verifier.name} has confirmed {farmer.name}'s identity
                  </p>
                </div>

                <Button 
                  onClick={handleCompleteCtoBUpgrade} 
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                  )}
                  Complete Upgrade to Level B
                </Button>
              </div>
            )}

            {/* B → A: ID Review */}
            {step === "id_review" && isBtoA && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ID Type *</Label>
                    <Select
                      value={idData.idType}
                      onValueChange={(value) => setIdData(prev => ({ ...prev, idType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="national_id">National ID</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="voter_card">Voter Card</SelectItem>
                        <SelectItem value="nira">NIRA Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>ID Number *</Label>
                    <Input
                      value={idData.idNumber}
                      onChange={(e) => setIdData(prev => ({ ...prev, idNumber: e.target.value }))}
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Review Notes</Label>
                  <Input
                    value={idData.notes}
                    onChange={(e) => setIdData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any notes about the ID verification"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <Checkbox
                    id="idVerified"
                    checked={idData.verified}
                    onCheckedChange={(checked) => setIdData(prev => ({ 
                      ...prev, 
                      verified: checked as boolean 
                    }))}
                  />
                  <label htmlFor="idVerified" className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                    <span className="font-medium">I confirm</span> that I have physically 
                    reviewed this ID document and verified it matches the farmer's information.
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("requirements")} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleCompleteBtoAUpgrade} 
                    disabled={isLoading || !idData.verified}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <FileCheck className="w-4 h-4 mr-2" />
                    )}
                    Approve & Upgrade
                  </Button>
                </div>
              </div>
            )}

            {/* Success */}
            {step === "success" && (
              <div className="space-y-4 py-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Upgrade Complete!
                </h3>
                <p className="text-muted-foreground">
                  {farmer.name} is now verified at Level {targetLevel}
                </p>
                <div className="flex justify-center">
                  <VerificationBadge level={targetLevel} size="lg" />
                </div>
                <Button onClick={() => onOpenChange(false)} className="w-full mt-4">
                  Done
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
