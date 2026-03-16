/**
 * M-TACAB Governance Rules
 * 
 * Core principles:
 * - Farmers register once, MSISDN is unique identifier
 * - Verification levels: C (Starter) → B (Community) → A (Strong ID)
 * - No downgrades, no skipping levels
 * - Donors excluded from platform
 */

export type VerificationLevel = "C" | "B" | "A";
export type PortalRole = "farmer" | "bank" | "ngo" | "government" | "vendor" | "buyer";

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  actor: string;
  actorOrganization: string;
  actorRole: PortalRole;
  action: AuditAction;
  farmerId?: string;
  farmerMsisdn?: string;
  oldLevel?: VerificationLevel;
  newLevel?: VerificationLevel;
  evidence?: string;
  status: "success" | "failed" | "blocked";
  reason?: string;
}

export type AuditAction = 
  | "farmer_registration"
  | "farmer_search"
  | "verification_upgrade"
  | "program_enrollment"
  | "voucher_assignment"
  | "voucher_redemption"
  | "kyc_review"
  | "financial_approval"
  | "certification"
  | "duplicate_blocked"
  | "unauthorized_action";

// Permission matrix for each portal
export const PORTAL_PERMISSIONS: Record<PortalRole, {
  canCreateFarmer: boolean;
  canUpgradeCtoB: boolean;
  canUpgradeBtoA: boolean;
  canViewLevelC: boolean;
  canUseLevelC: boolean; // For programs, vouchers, finance
  canEnrollPrograms: boolean;
  canAssignVouchers: boolean;
  canRedeemVouchers: boolean;
  canReviewKYC: boolean;
  canApproveFinance: boolean;
  canCertifySchemes: boolean;
  canBulkImport: boolean;
}> = {
  farmer: {
    canCreateFarmer: true, // Self only, Level C
    canUpgradeCtoB: false, // Can request, not perform
    canUpgradeBtoA: false,
    canViewLevelC: true,
    canUseLevelC: false,
    canEnrollPrograms: false,
    canAssignVouchers: false,
    canRedeemVouchers: false,
    canReviewKYC: false,
    canApproveFinance: false,
    canCertifySchemes: false,
    canBulkImport: false,
  },
  bank: {
    canCreateFarmer: true, // After MSISDN search
    canUpgradeCtoB: true,
    canUpgradeBtoA: true,
    canViewLevelC: true,
    canUseLevelC: false,
    canEnrollPrograms: false,
    canAssignVouchers: false,
    canRedeemVouchers: false,
    canReviewKYC: true,
    canApproveFinance: true,
    canCertifySchemes: false,
    canBulkImport: false,
  },
  ngo: {
    canCreateFarmer: false,
    canUpgradeCtoB: true,
    canUpgradeBtoA: false, // NGOs never see this
    canViewLevelC: true, // Read-only
    canUseLevelC: false,
    canEnrollPrograms: true, // B+ only
    canAssignVouchers: true, // B+ only
    canRedeemVouchers: false,
    canReviewKYC: false,
    canApproveFinance: false,
    canCertifySchemes: false,
    canBulkImport: false,
  },
  government: {
    canCreateFarmer: false,
    canUpgradeCtoB: false,
    canUpgradeBtoA: true,
    canViewLevelC: true, // Read-only
    canUseLevelC: false,
    canEnrollPrograms: false,
    canAssignVouchers: false,
    canRedeemVouchers: false,
    canReviewKYC: true,
    canApproveFinance: false,
    canCertifySchemes: true,
    canBulkImport: false,
  },
  vendor: {
    canCreateFarmer: false,
    canUpgradeCtoB: false,
    canUpgradeBtoA: false,
    canViewLevelC: false, // Cannot see Level C
    canUseLevelC: false,
    canEnrollPrograms: false,
    canAssignVouchers: false,
    canRedeemVouchers: true,
    canReviewKYC: false,
    canApproveFinance: false,
    canCertifySchemes: false,
    canBulkImport: false,
  },
  buyer: {
    canCreateFarmer: false,
    canUpgradeCtoB: false,
    canUpgradeBtoA: false,
    canViewLevelC: false, // Only B+ visible
    canUseLevelC: false,
    canEnrollPrograms: false,
    canAssignVouchers: false,
    canRedeemVouchers: false,
    canReviewKYC: false,
    canApproveFinance: false,
    canCertifySchemes: false,
    canBulkImport: false,
  },
};

// Check if action is allowed
export function isActionAllowed(
  role: PortalRole,
  action: keyof typeof PORTAL_PERMISSIONS.farmer
): boolean {
  return PORTAL_PERMISSIONS[role]?.[action] ?? false;
}

// Check if farmer is visible to portal
export function isFarmerVisible(
  role: PortalRole,
  farmerLevel: VerificationLevel
): boolean {
  if (farmerLevel === "C") {
    return PORTAL_PERMISSIONS[role].canViewLevelC;
  }
  return true; // B and A always visible
}

// Check if farmer can be used for operations (programs, vouchers, finance)
export function isFarmerUsable(
  role: PortalRole,
  farmerLevel: VerificationLevel
): boolean {
  if (farmerLevel === "C") {
    return false; // Level C never usable for operations
  }
  return true; // B and A are usable
}

// Check if upgrade is valid
export function isUpgradeValid(
  currentLevel: VerificationLevel,
  targetLevel: VerificationLevel
): boolean {
  if (currentLevel === "C" && targetLevel === "B") return true;
  if (currentLevel === "B" && targetLevel === "A") return true;
  return false; // No downgrades, no skipping
}

// Check if role can perform specific upgrade
export function canPerformUpgrade(
  role: PortalRole,
  currentLevel: VerificationLevel,
  targetLevel: VerificationLevel
): boolean {
  if (!isUpgradeValid(currentLevel, targetLevel)) return false;
  
  if (currentLevel === "C" && targetLevel === "B") {
    return PORTAL_PERMISSIONS[role].canUpgradeCtoB;
  }
  if (currentLevel === "B" && targetLevel === "A") {
    return PORTAL_PERMISSIONS[role].canUpgradeBtoA;
  }
  return false;
}

// Get upgrade requirement message
export function getUpgradeMessage(
  role: PortalRole,
  farmerLevel: VerificationLevel,
  requiredLevel: VerificationLevel
): string {
  if (farmerLevel === requiredLevel) return "";
  
  if (farmerLevel === "C" && requiredLevel === "B") {
    if (role === "ngo") {
      return "This farmer requires community verification. Use the C→B upgrade flow.";
    }
    return "Farmer requires Level B verification before this action.";
  }
  
  if (farmerLevel === "C" && requiredLevel === "A") {
    return "Farmer must be upgraded to Level B first, then to Level A.";
  }
  
  if (farmerLevel === "B" && requiredLevel === "A") {
    if (role === "ngo") {
      return "Level A upgrades require Bank or Government review.";
    }
    return "Farmer requires formal ID verification for Level A.";
  }
  
  return "Upgrade required for this action.";
}

// Level metadata
export const LEVEL_METADATA: Record<VerificationLevel, {
  name: string;
  description: string;
  color: string;
  bgColor: string;
  requirements: string[];
}> = {
  C: {
    name: "Starter",
    description: "Phone verified, minimal data",
    color: "text-amber-700 dark:text-amber-300",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    requirements: ["Phone OTP verified", "Consent given"],
  },
  B: {
    name: "Community Verified",
    description: "Verified by trusted community member",
    color: "text-emerald-700 dark:text-emerald-300",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    requirements: ["Level C complete", "1+ verifier confirmed via SMS", "Location data"],
  },
  A: {
    name: "Strong ID",
    description: "Government ID verified",
    color: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-100 dark:bg-green-900/40",
    requirements: ["Level B complete", "National ID/Passport verified", "Bank/Govt approval"],
  },
};

// Generate unique ID
export function generateFarmerId(): string {
  const prefix = "FRM";
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
}

// Validate Somali MSISDN
export function validateMSISDN(msisdn: string): { valid: boolean; formatted: string; error?: string } {
  const cleaned = msisdn.replace(/\D/g, "");
  
  if (cleaned.length < 9) {
    return { valid: false, formatted: msisdn, error: "Phone number too short" };
  }
  
  if (cleaned.length > 12) {
    return { valid: false, formatted: msisdn, error: "Phone number too long" };
  }
  
  // Format: +252 XX XXX XXXX
  const formatted = cleaned.startsWith("252") 
    ? `+${cleaned}` 
    : `+252${cleaned}`;
  
  return { valid: true, formatted };
}

// Audit log storage (in production, this would be a database)
const auditLogs: AuditLogEntry[] = [];

export function logAuditEvent(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
  const fullEntry: AuditLogEntry = {
    ...entry,
    id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
    timestamp: new Date(),
  };
  auditLogs.push(fullEntry);
  console.log("[AUDIT]", fullEntry);
  return fullEntry;
}

export function getAuditLogs(): AuditLogEntry[] {
  return [...auditLogs];
}
