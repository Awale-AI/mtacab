import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  const navLinks = [
    { label: "Overview", href: "#about", id: "overview" },
    { label: "Stakeholders", href: "#stakeholders", id: "stakeholders" },
    { label: "Features", href: "#how-it-works", id: "features" },
    { label: "Access Methods", href: "#contact", id: "access" },
  ];

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
        {/* Row 1: Platform Identity */}
        <div className="bg-white border-b border-border/30">
          <div className="container">
            <div className="flex items-center h-[80px]">
              <Link to="/" className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                  <Leaf className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[28px] font-heading font-bold text-foreground leading-none tracking-tight">
                    TACAB
                  </span>
                  <span className="text-[14px] text-muted-foreground leading-none">
                    National Agriculture Platform
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: Navigation */}
        <div className="bg-white border-b border-border/50">
          <div className="container">
            <div className="flex items-center justify-between h-[56px]">
              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center gap-12">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href, link.id)}
                    className={`relative py-4 text-[16px] transition-colors ${
                      activeSection === link.id
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground font-medium hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Primary CTA */}
              <div className="hidden lg:flex items-center">
                <Button 
                  onClick={() => navigate('/demo')}
                  className="bg-primary hover:bg-primary/90 h-11 px-6 text-[15px] font-semibold"
                >
                  Launch Platform Demo
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center justify-between w-full">
                <span className="text-sm font-medium text-muted-foreground">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href, link.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === link.id
                      ? "text-foreground font-semibold border-l-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <Button 
                  className="w-full justify-center bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/demo');
                  }}
                >
                  Launch Platform Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
