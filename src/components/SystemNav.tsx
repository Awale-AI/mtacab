import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Play } from "lucide-react";
import { DemoLoginModal } from "./DemoLoginModal";
import { cn } from "@/lib/utils";

interface SystemNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview", mobileLabel: "Overview" },
  { id: "stakeholders", label: "Stakeholders", mobileLabel: "Roles" },
  { id: "features", label: "Features", mobileLabel: "Features" },
  { id: "access", label: "Access Methods", mobileLabel: "Access" },
];

export function SystemNav({ activeTab, onTabChange }: SystemNavProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold text-foreground leading-none">TACAB</span>
                <span className="text-[10px] text-muted-foreground leading-none">M-TACAB Platform</span>
              </div>
            </Link>

            {/* Center Tabs - Desktop */}
            <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onTabChange(tab.id);
                  }}
                  className={cn(
                    "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                  aria-pressed={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Button 
              onClick={() => setLoginModalOpen(true)}
              size="sm"
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Launch Demo</span>
              <span className="sm:hidden">Demo</span>
            </Button>
          </div>
        </div>

        {/* Mobile Tab Selector */}
        <div className="md:hidden border-t border-border bg-muted/30">
          <div className="container">
            <div className="flex w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onTabChange(tab.id);
                  }}
                  className={cn(
                    "flex-1 py-2.5 text-xs font-medium border-b-2 transition-all",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={activeTab === tab.id}
                >
                  {tab.mobileLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <DemoLoginModal 
        open={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
      />
    </>
  );
}