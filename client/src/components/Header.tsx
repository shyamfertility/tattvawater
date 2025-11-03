import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Droplet, ShoppingCart, Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  cartCount?: number;
  isAuthenticated?: boolean;
  userName?: string;
  onAuthClick?: () => void;
}

export default function Header({ 
  cartCount = 0, 
  isAuthenticated = false,
  userName = "User",
  onAuthClick 
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    console.log('Theme toggled to:', !isDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2" data-testid="link-home">
            <Droplet className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold">Tattva</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">The Water Story</span>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#recipes" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-recipes">
              Recipes
            </a>
            <a href="#track" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-track">
              Track
            </a>
            <a href="#shop" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-shop">
              Shop
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-about">
              About
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                data-testid="badge-cart-count"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
          
          {isAuthenticated ? (
            <Avatar className="h-9 w-9 cursor-pointer" data-testid="avatar-user">
              <AvatarImage src="" />
              <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={onAuthClick}
              data-testid="button-login"
            >
              Login
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <nav className="flex flex-col gap-3">
            <a href="#recipes" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Recipes
            </a>
            <a href="#track" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Track
            </a>
            <a href="#shop" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Shop
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors py-2">
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
