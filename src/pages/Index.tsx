import { useState } from "react";
import { SystemNav } from "@/components/SystemNav";
import { HeroSlider } from "@/components/HeroSlider";
import { OverviewPanel } from "@/components/landing/OverviewPanel";
import { StakeholdersPanel } from "@/components/landing/StakeholdersPanel";
import { FeaturesPanel } from "@/components/landing/FeaturesPanel";
import { AccessPanel } from "@/components/landing/AccessPanel";

export default function Index() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Bring the tabbed panels into view so users don't think "nothing happened".
    requestAnimationFrame(() => {
      document.getElementById("landing-panels")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed System Navigation */}
      <SystemNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Hero Slider */}
      <div className="pt-14 md:pt-14">
        <HeroSlider />
      </div>

      {/* Main Content Area - Tabbed panels */}
      <main className="pb-6">
        <div id="landing-panels" className="container py-6">
          {activeTab === "overview" && <OverviewPanel />}
          {activeTab === "stakeholders" && <StakeholdersPanel />}
          {activeTab === "features" && <FeaturesPanel />}
          {activeTab === "access" && <AccessPanel />}
        </div>
      </main>
    </div>
  );
}