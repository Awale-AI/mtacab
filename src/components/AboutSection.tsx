import { useState } from "react";
import { CheckCircle, Smartphone, Globe, Users } from "lucide-react";
import { DemoLoginModal } from "./DemoLoginModal";

export function AboutSection() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const features = [
    {
      icon: Smartphone,
      title: "USSD & IVR Access",
      description: "Works on basic phones without internet — dial *XXX# to access services",
      clickable: false,
    },
    {
      icon: Globe,
      title: "Web Portals",
      description: "Full-featured dashboards for NGOs, banks, buyers, and government",
      clickable: true,
    },
    {
      icon: Users,
      title: "Multi-Stakeholder",
      description: "One platform connecting farmers, markets, finance, and programs",
      clickable: true,
    },
  ];

  const benefits = [
    "Farmer registration and profile management",
    "Digital voucher issuance and redemption",
    "Market price information and produce listings",
    "Cooperative formation and VSLA tracking",
    "Agricultural advisory via SMS and voice",
    "Credit scoring based on activity history",
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About the Platform
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            One Platform for Agricultural Transformation
          </h2>
          <p className="text-lg text-muted-foreground">
            TACAB (M-TACAB / M-Farm) is a national digital infrastructure designed to 
            formalize and connect Somaliland's agricultural ecosystem.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.title}
              onClick={feature.clickable ? () => setLoginModalOpen(true) : undefined}
              className={`p-6 rounded-xl bg-background border border-border transition-all ${
                feature.clickable 
                  ? "cursor-pointer hover:shadow-lg hover:border-primary/50 hover:-translate-y-1" 
                  : "hover:shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
              {feature.clickable && (
                <span className="inline-block mt-3 text-xs font-medium text-primary">
                  Click to explore →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Platform Capabilities
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DemoLoginModal 
        open={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
      />
    </section>
  );
}
