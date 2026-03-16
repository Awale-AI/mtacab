import { Leaf, Mail, Phone, MapPin } from "lucide-react";

export function LandingFooter() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-primary/20">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-heading font-bold">TACAB</span>
                <span className="text-xs text-muted-foreground ml-2">M-TACAB / M-Farm Platform</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              A national digital agriculture platform connecting farmers, cooperatives, 
              markets, financial institutions, and development partners across Somaliland.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-background transition-colors">About Platform</a></li>
              <li><a href="#stakeholders" className="hover:text-background transition-colors">Stakeholders</a></li>
              <li><a href="#how-it-works" className="hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@tacab.so</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+252 63 XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Hargeisa, Somaliland</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-muted-foreground/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 TACAB Platform. All rights reserved.</p>
            <p className="text-xs">Demo Version — Designed for donor presentations</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
