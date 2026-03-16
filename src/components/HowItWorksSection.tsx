import { UserPlus, Smartphone, ShoppingBag, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Register",
    description: "Farmers register via USSD, field agents, or web. Basic details create a digital profile.",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Engage",
    description: "Receive SMS advisories, market prices, and program notifications on any phone.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Transact",
    description: "Redeem vouchers at vendors, list produce for buyers, or apply for credit products.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Grow",
    description: "Build activity history that unlocks better credit scores and market opportunities.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Simple Journey, Powerful Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            From registration to growth — a seamless experience designed for rural contexts.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-4 border-background shadow-lg mb-6 mx-auto z-10">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-primary/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Access Methods */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
            <span className="text-3xl">📱</span>
            <div>
              <h4 className="font-semibold text-foreground">USSD / IVR</h4>
              <p className="text-sm text-muted-foreground">Dial *XXX# on any phone</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
            <span className="text-3xl">🌐</span>
            <div>
              <h4 className="font-semibold text-foreground">Web Portals</h4>
              <p className="text-sm text-muted-foreground">Full dashboards for partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
