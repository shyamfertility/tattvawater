import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplet className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold">Tattva</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transform your hydration journey with water as medicine and healer. 100+ infused recipes for wellness.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-social-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="#recipes" className="text-muted-foreground hover:text-primary transition-colors">
                Recipes
              </a>
              <a href="#shop" className="text-muted-foreground hover:text-primary transition-colors">
                Shop
              </a>
              <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
              <a href="#shipping" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </a>
              <a href="#returns" className="text-muted-foreground hover:text-primary transition-colors">
                Returns
              </a>
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Get daily hydration tips and exclusive recipes
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button variant="default" data-testid="button-subscribe">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Tattva - The Water Story. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#cookies" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
