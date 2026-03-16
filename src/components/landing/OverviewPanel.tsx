import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sprout, 
  Users, 
  Ticket, 
  BarChart3, 
  Smartphone, 
  Globe,
  ArrowRight,
  Play 
} from "lucide-react";
import { DemoLoginModal } from "@/components/DemoLoginModal";
import { PriorityLocationsSection } from "./PriorityLocationsSection";

export function OverviewPanel() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Verified national agriculture statistics (contextual facts, not TACAB achievements)
  const nationalStats = [
    { icon: BarChart3, value: "65–72%", label: "Agriculture's GDP Contribution" },
    { icon: Users, value: "80%+", label: "Population Dependent on Agriculture" },
    { icon: Sprout, value: "8.9M ha", label: "Total Arable Land" },
    { icon: Ticket, value: "~3M ha", label: "Currently Cultivable Land" },
  ];

  const features = [
    { icon: Smartphone, title: "USSD Access", desc: "Works on basic phones via *XXX#" },
    { icon: Globe, title: "Web Portals", desc: "Full dashboards for all stakeholders" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Hero Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 mb-6">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Agricultural Transformation Platform
                </h1>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">
                TACAB connects Somalia's agricultural ecosystem — farmers, cooperatives, markets, 
                finance, and government — through a unified digital platform accessible via web and USSD.
              </p>
              <Button 
                onClick={() => setLoginModalOpen(true)}
                className="bg-primary hover:bg-primary/90 gap-2"
              >
                <Play className="w-4 h-4" />
                Launch Interactive Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="lg:w-80">
              <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wide mb-2 text-center lg:text-left">
                National Agriculture Context
              </p>
              <div className="grid grid-cols-2 gap-3">
                {nationalStats.map((stat) => (
                  <div 
                    key={stat.label}
                    className="bg-background/80 backdrop-blur rounded-lg p-3 text-center border border-border"
                  >
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground/60 italic mt-2 text-center lg:text-right">
                Source: FAO Somalia / World Bank agricultural sector data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-4 flex-1">
        {features.map((feature) => (
          <Card 
            key={feature.title}
            className="hover:shadow-md transition-shadow cursor-pointer border-border hover:border-primary/30"
            onClick={() => setLoginModalOpen(true)}
          >
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Locations Section */}
      <PriorityLocationsSection />

      <DemoLoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
}