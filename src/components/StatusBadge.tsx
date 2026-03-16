import { cn } from "@/lib/utils";

type Status = "active" | "pending" | "inactive" | "approved" | "rejected" | "verified" | "unverified";

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusStyles: Record<Status, string> = {
  active: "bg-success/10 text-success border-success/20",
  approved: "bg-success/10 text-success border-success/20",
  verified: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  inactive: "bg-muted text-muted-foreground border-border",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  unverified: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<Status, string> = {
  active: "Active",
  approved: "Approved",
  verified: "Verified",
  pending: "Pending",
  inactive: "Inactive",
  rejected: "Rejected",
  unverified: "Unverified",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      statusStyles[status]
    )}>
      {label || statusLabels[status]}
    </span>
  );
}
