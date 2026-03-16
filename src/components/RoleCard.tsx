import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "farmer" | "ngo" | "vendor" | "buyer" | "bank" | "government";
  onClick: () => void;
}

const colorClasses = {
  farmer: "border-farmer/20 hover:border-farmer/40 hover:bg-farmer/5",
  ngo: "border-ngo/20 hover:border-ngo/40 hover:bg-ngo/5",
  vendor: "border-vendor/20 hover:border-vendor/40 hover:bg-vendor/5",
  buyer: "border-buyer/20 hover:border-buyer/40 hover:bg-buyer/5",
  bank: "border-bank/20 hover:border-bank/40 hover:bg-bank/5",
  government: "border-government/20 hover:border-government/40 hover:bg-government/5",
};

const iconColorClasses = {
  farmer: "bg-farmer/10 text-farmer",
  ngo: "bg-ngo/10 text-ngo",
  vendor: "bg-vendor/10 text-vendor",
  buyer: "bg-buyer/10 text-buyer",
  bank: "bg-bank/10 text-bank",
  government: "bg-government/10 text-government",
};

export function RoleCard({ title, description, icon: Icon, color, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-start p-6 rounded-xl border-2 bg-card text-left transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        colorClasses[color]
      )}
    >
      <div className={cn("p-3 rounded-lg mb-4", iconColorClasses[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Enter Portal →
      </div>
    </button>
  );
}
