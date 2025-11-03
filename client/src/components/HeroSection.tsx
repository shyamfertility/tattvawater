import { Button } from "@/components/ui/button";
import { Droplet, Sparkles, Award } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_water_infusion_background_5bd1f00e.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Tattva - The Water Story
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Transform your hydration with 100+ infused water recipes. Track, learn, and thrive with water as medicine and healer.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              variant="default"
              className="text-lg px-8 h-12"
              data-testid="button-start-tracking"
            >
              <Droplet className="mr-2 h-5 w-5" />
              Start Tracking
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 h-12 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-browse-recipes"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Browse Recipes
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/90">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">100+ Recipes</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5" />
              <span className="text-sm font-medium">Personalized Plans</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Daily Motivation</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
