import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Globe, 
  Phone, 
  MessageSquare,
  Play,
  ArrowRight
} from "lucide-react";
import { DemoLoginModal } from "@/components/DemoLoginModal";
import { cn } from "@/lib/utils";

const accessMethods = [
  {
    id: "ussd",
    title: "USSD",
    subtitle: "Dial *XXX#",
    description: "Works on any basic phone without internet. Ideal for farmers in remote areas with limited smartphone access.",
    icon: Smartphone,
    color: "text-primary",
    bgColor: "bg-primary/10",
    steps: [
      "Dial *384*1# from any phone",
      "Select language (Somali / English)",
      "Enter registered phone number",
      "Navigate menu with number keys",
    ],
  },
  {
    id: "ivr",
    title: "IVR (Voice)",
    subtitle: "Call Toll-Free",
    description: "Voice-based interface for farmers who cannot read. Listen to menus and respond with voice or keypad.",
    icon: Phone,
    color: "text-accent",
    bgColor: "bg-accent/10",
    steps: [
      "Call toll-free 8001",
      "Listen to menu options",
      "Press number to select",
      "Receive information via voice",
    ],
  },
  {
    id: "sms",
    title: "SMS Alerts",
    subtitle: "Receive Updates",
    description: "Automatic notifications for weather, prices, vouchers, and advisories. No action needed — messages arrive automatically.",
    icon: MessageSquare,
    color: "text-ngo",
    bgColor: "bg-ngo/10",
    steps: [
      "Register phone number",
      "Set preferences (crops, region)",
      "Receive daily/weekly alerts",
      "Reply to confirm actions",
    ],
  },
  {
    id: "web",
    title: "Web Portals",
    subtitle: "Full Access",
    description: "Complete dashboards for NGOs, banks, buyers, and government. Requires internet and smartphone/computer.",
    icon: Globe,
    color: "text-buyer",
    bgColor: "bg-buyer/10",
    steps: [
      "Login with role credentials",
      "Access full dashboard",
      "Manage data and reports",
      "Export and analyze",
    ],
  },
];

export function AccessPanel() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {accessMethods.map((method) => (
          <Card key={method.id} className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className={cn("p-2.5 rounded-lg", method.bgColor)}>
                  <method.icon className={cn("w-5 h-5", method.color)} />
                </div>
                <div>
                  <CardTitle className="text-base">{method.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{method.subtitle}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                {method.description}
              </p>
              <div className="space-y-2">
                {method.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium",
                      method.bgColor, method.color
                    )}>
                      {i + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Try Demo CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Try the Web Portal Demo</h3>
            <p className="text-sm text-muted-foreground">
              Experience the full platform as any stakeholder role — no signup required.
            </p>
          </div>
          <Button 
            onClick={() => setLoginModalOpen(true)}
            className="bg-primary hover:bg-primary/90 gap-2 whitespace-nowrap"
          >
            <Play className="w-4 h-4" />
            Launch Demo
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <DemoLoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
}