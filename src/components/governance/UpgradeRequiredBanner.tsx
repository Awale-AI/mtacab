import { cn } from "@/lib/utils";
import { VerificationLevel, LEVEL_METADATA, PortalRole, getUpgradeMessage } from "@/lib/governance";
import { AlertTriangle, ArrowUp, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "./VerificationBadge";

interface UpgradeRequiredBannerProps {
  currentLevel: VerificationLevel;
  requiredLevel: VerificationLevel;
  role: PortalRole;
  onRequestUpgrade?: () => void;
  canInitiateUpgrade?: boolean;
  className?: string;
}

export function UpgradeRequiredBanner({
  currentLevel,
  requiredLevel,
  role,
  onRequestUpgrade,
  canInitiateUpgrade = false,
  className,
}: UpgradeRequiredBannerProps) {
  const message = getUpgradeMessage(role, currentLevel, requiredLevel);
  
  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg border",
      "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
      className
    )}>
      <div className="flex-shrink-0 p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
        <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
          Upgrade Required
        </h4>
        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
          {message}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <VerificationBadge level={currentLevel} size="sm" />
          <ArrowUp className="w-3 h-3 text-amber-600 rotate-90" />
          <VerificationBadge level={requiredLevel} size="sm" />
        </div>
      </div>
      {canInitiateUpgrade && onRequestUpgrade && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRequestUpgrade}
          className="flex-shrink-0 border-amber-300 text-amber-700 hover:bg-amber-100"
        >
          <ArrowUp className="w-3.5 h-3.5 mr-1" />
          Upgrade
        </Button>
      )}
    </div>
  );
}

interface ActionBlockedBannerProps {
  action: string;
  reason: string;
  className?: string;
}

export function ActionBlockedBanner({
  action,
  reason,
  className,
}: ActionBlockedBannerProps) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg border",
      "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
      className
    )}>
      <div className="flex-shrink-0 p-2 rounded-full bg-red-100 dark:bg-red-900/50">
        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-red-800 dark:text-red-200">
          {action} — Action Blocked
        </h4>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
          {reason}
        </p>
      </div>
    </div>
  );
}
