import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  onAddToCart?: () => void;
}

export default function ProductCard({
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  category,
  isBestSeller,
  isNew,
  onAddToCart
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 group transition-transform hover:scale-[1.02]">
      <div className="relative aspect-[3/4] overflow-hidden bg-accent/20">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-4"
        />
        
        {(isBestSeller || isNew) && (
          <div className="absolute top-3 right-3">
            {isBestSeller && (
              <Badge className="bg-destructive text-destructive-foreground" data-testid="badge-bestseller">
                Best Seller
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-primary text-primary-foreground" data-testid="badge-new">
                New
              </Badge>
            )}
          </div>
        )}
        
        <Button
          size="icon"
          variant="default"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          data-testid="button-quick-add"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Badge variant="secondary" className="text-xs" data-testid="badge-category">
            {category}
          </Badge>
          <h3 className="font-serif text-lg font-medium line-clamp-2" data-testid="text-product-name">
            {name}
          </h3>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-mono text-xl font-bold" data-testid="text-price">
              ₹{price}
            </div>
            {originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ₹{originalPrice}
              </div>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddToCart}
            data-testid="button-add-to-cart"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
