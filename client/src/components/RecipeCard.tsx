import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, Heart } from "lucide-react";

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
  prepTime: string;
  benefits: string[];
  ingredients: string[];
  category: string;
  onClick?: () => void;
}

export default function RecipeCard({ 
  name, 
  image, 
  prepTime, 
  benefits, 
  ingredients,
  category,
  onClick 
}: RecipeCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
      data-testid={`card-recipe-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${category}`}>
              {category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-3 w-3" />
              <span>{prepTime}</span>
            </div>
          </div>
          
          <h3 className="font-serif text-xl font-medium line-clamp-2" data-testid="text-recipe-name">
            {name}
          </h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span className="font-medium">Key Benefits:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {benefits.slice(0, 3).map((benefit, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {ingredients.slice(0, 3).join(", ")}
            {ingredients.length > 3 && ` +${ingredients.length - 3} more`}
          </p>
        </div>
        
        <button 
          className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          data-testid="link-view-recipe"
        >
          View Recipe
          <Heart className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}
