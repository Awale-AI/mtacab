import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Users, Wheat, Smartphone, Building2, Handshake, ShoppingCart, Eye, FileCheck, Landmark, UserCheck, Shield, ClipboardList, BarChart3, FileText } from "lucide-react";

import heroFarmerUser from "@/assets/hero-farmer-user.jpg";
import heroCooperativeUser from "@/assets/hero-cooperative-user.jpg";
import heroBuyerUser from "@/assets/hero-buyer-user.jpg";
import heroFinanceUser from "@/assets/hero-finance-user.jpg";
import heroGovernmentUser from "@/assets/hero-government-user.jpg";

interface StatItem {
  icon: React.ElementType;
  label: string;
  value?: string;
}

interface Slide {
  id: number;
  image: string;
  userType: string;
  headline: string;
  subtext: string;
  stats: StatItem[];
}

const slides: Slide[] = [
  {
    id: 1,
    image: heroFarmerUser,
    userType: "Farmer User",
    headline: "Empowering Somalia's Farmers",
    subtext: "Digital access to advisory, inputs, and markets — via USSD, web, or voice",
    stats: [
      { icon: Users, label: "Farmers Registered", value: "12,847" },
      { icon: Wheat, label: "Crops Covered", value: "8 Major" },
      { icon: Smartphone, label: "Access Channels", value: "USSD / Web / Mobile App" },
    ],
  },
  {
    id: 2,
    image: heroCooperativeUser,
    userType: "Cooperative User",
    headline: "Strengthening Rural Cooperatives & VSLAs",
    subtext: "Organized farmers gain better access to finance, programs, and buyers",
    stats: [
      { icon: Building2, label: "Active Cooperatives", value: "156" },
      { icon: Handshake, label: "Group-based Delivery", value: "Enabled" },
      { icon: FileCheck, label: "Shared Advisory & Vouchers", value: "Active" },
    ],
  },
  {
    id: 3,
    image: heroBuyerUser,
    userType: "Buyer User",
    headline: "Linking Producers to National Markets",
    subtext: "Transparent pricing, aggregation, and direct buyer connections",
    stats: [
      { icon: Eye, label: "Supply Visibility", value: "Real-time" },
      { icon: ShoppingCart, label: "Structured Sourcing", value: "5 Regions" },
      { icon: FileCheck, label: "Discovery Before Transactions", value: "Enabled" },
    ],
  },
  {
    id: 4,
    image: heroFinanceUser,
    userType: "Finance / Facilitator User",
    headline: "Unlocking Agricultural Finance",
    subtext: "Trusted farmer profiles enable microfinance and credit access",
    stats: [
      { icon: ClipboardList, label: "Finance Readiness Data", value: "Verified" },
      { icon: Landmark, label: "VSLA-linked Profiles", value: "2,400+" },
      { icon: Shield, label: "Risk-aware Enablement", value: "Active" },
    ],
  },
  {
    id: 5,
    image: heroGovernmentUser,
    userType: "Government / NGO User",
    headline: "Coordinating National Agriculture Programs",
    subtext: "One platform for government, NGOs, and development partners",
    stats: [
      { icon: UserCheck, label: "Unified Farmer Registry", value: "National" },
      { icon: Handshake, label: "Program Coordination", value: "Multi-partner" },
      { icon: BarChart3, label: "Comparable Reporting", value: "Standardized" },
    ],
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[480px] max-h-[560px] h-[520px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: 'center 30%'
            }}
          />
          
          {/* Dark Overlay - stronger on right side for data panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/70" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex items-center py-[60px]">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                {/* Left - Headlines */}
                <div className="space-y-4">
                  {/* User Type Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 transition-all duration-700 delay-75 ${
                      index === currentSlide
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="text-xs font-medium text-primary-foreground/90 uppercase tracking-wide">
                      {slide.userType}
                    </span>
                  </div>
                  
                  <h1
                    className={`text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-heading font-bold text-white leading-tight transition-all duration-700 delay-100 ${
                      index === currentSlide
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    {slide.headline}
                  </h1>
                  <p
                    className={`text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
                      index === currentSlide
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    {slide.subtext}
                  </p>
                </div>

                {/* Right - Data Overlay Panel */}
                <div
                  className={`hidden lg:block transition-all duration-700 delay-300 ${
                    index === currentSlide
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                >
                  <div className="bg-background/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
                        Platform Indicators
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {slide.stats.map((stat, statIndex) => {
                        const IconComponent = stat.icon;
                        return (
                          <div
                            key={statIndex}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-white/70">{stat.label}</p>
                              <p className="text-lg font-semibold text-white">{stat.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Stats - Shown below content on smaller screens */}
                <div
                  className={`lg:hidden transition-all duration-700 delay-300 ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex flex-wrap gap-3">
                    {slide.stats.map((stat, statIndex) => {
                      const IconComponent = stat.icon;
                      return (
                        <div
                          key={statIndex}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                        >
                          <IconComponent className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-white">{stat.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 md:w-10 h-2 md:h-2.5 bg-white"
                : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
