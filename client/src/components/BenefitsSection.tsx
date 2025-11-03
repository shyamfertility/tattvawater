import { Card } from "@/components/ui/card";
import { Heart, Zap, Shield, Sparkles, Leaf, Sun } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Cardiovascular Health",
    description: "Improve blood circulation and heart function with proper hydration and natural antioxidants."
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "Energy Boost",
    description: "Natural vitamins and minerals provide sustained energy throughout your day."
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Immunity Support",
    description: "Strengthen your immune system with vitamin-rich infused water recipes."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    title: "Detoxification",
    description: "Flush toxins naturally and support your body's cleansing processes."
  },
  {
    icon: <Leaf className="h-8 w-8 text-green-500" />,
    title: "Natural Ingredients",
    description: "100% natural herbs and fruits with no artificial additives or preservatives."
  },
  {
    icon: <Sun className="h-8 w-8 text-orange-500" />,
    title: "Skin Radiance",
    description: "Hydrate from within for glowing, healthy skin and improved complexion."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            The Power of Infused Water
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how water becomes medicine when combined with nature's finest ingredients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <Card key={idx} className="p-6 space-y-4 hover-elevate" data-testid={`card-benefit-${idx}`}>
              <div className="p-3 rounded-lg bg-muted w-fit">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
