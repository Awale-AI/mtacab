import { cn } from "@/lib/utils";
import { LEVEL_METADATA, VerificationLevel } from "@/lib/governance";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  level: VerificationLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function VerificationBadge({ 
  level, 
  showLabel = true, 
  size = "md",
  showTooltip = true 
}: VerificationBadgeProps) {
  const meta = LEVEL_METADATA[level];
  
  const Icon = level === "A" ? ShieldCheck : level === "B" ? Shield : ShieldAlert;
  
  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5 gap-1",
    md: "text-xs px-2 py-0.5 gap-1.5",
    lg: "text-sm px-2.5 py-1 gap-2",
  };
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  const badge = (
    <span className={cn(
      "inline-flex items-center rounded-full font-medium",
      meta.bgColor,
      meta.color,
      sizeClasses[size]
    )}>
      <Icon className={iconSizes[size]} />
      {showLabel && (
        <span>Level {level}</span>
      )}
    </span>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className="font-semibold">{meta.name}</p>
          <p className="text-xs text-muted-foreground">{meta.description}</p>
          <ul className="text-xs space-y-0.5 mt-1">
            {meta.requirements.map((req, i) => (
              <li key={i} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
