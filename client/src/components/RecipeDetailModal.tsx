import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Thermometer, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RecipeDetail {
  id: string;
  name: string;
  image: string;
  category: string;
  prepTime: string;
  ingredients: string[];
  method: string[];
  benefits: Array<{ title: string; description: string }>;
  temperature: string;
  bestTime: string;
  price: number;
}

interface RecipeDetailModalProps {
  recipe: RecipeDetail | null;
  open: boolean;
  onClose: () => void;
}

export default function RecipeDetailModal({ recipe, open, onClose }: RecipeDetailModalProps) {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{recipe.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{recipe.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Thermometer className="h-4 w-4" />
              <span>{recipe.temperature}</span>
            </div>
            <Badge variant="outline">Best: {recipe.bestTime}</Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Preparation Method</h3>
                <ol className="space-y-3">
                  {recipe.method.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <span className="text-sm pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-3">Health Benefits</h3>
                <Accordion type="single" collapsible className="w-full">
                  {recipe.benefits.map((benefit, idx) => (
                    <AccordionItem key={idx} value={`benefit-${idx}`}>
                      <AccordionTrigger className="text-sm">
                        {benefit.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {benefit.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card className="p-4 space-y-4 sticky top-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price per bottle (1L)</p>
                  <p className="font-mono text-3xl font-bold">₹{recipe.price}</p>
                </div>
                
                <Button className="w-full" data-testid="button-add-to-cart-modal">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" data-testid="button-favorite">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="flex-1" data-testid="button-share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
