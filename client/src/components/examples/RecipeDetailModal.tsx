import RecipeDetailModal from '../RecipeDetailModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import strawberryImage from '@assets/generated_images/Strawberry_mint_infused_water_d0a4d439.png';

export default function RecipeDetailModalExample() {
  const [open, setOpen] = useState(false);
  
  const mockRecipe = {
    id: '1',
    name: 'Strawberry Mint Fusion',
    image: strawberryImage,
    category: 'Detox',
    prepTime: '5 min',
    temperature: 'Cold (4-8°C)',
    bestTime: 'Morning',
    price: 299,
    ingredients: [
      '1 cup fresh strawberries, sliced',
      '10 fresh mint leaves',
      '1/2 lemon, sliced',
      '1 liter filtered water',
      'Ice cubes (optional)'
    ],
    method: [
      'Wash all fresh ingredients thoroughly under running water',
      'Slice strawberries and lemon into thin pieces',
      'Add strawberries, mint leaves, and lemon to your infuser bottle',
      'Fill with cold filtered water',
      'Let infuse in refrigerator for 2-4 hours',
      'Serve chilled and enjoy within 24 hours'
    ],
    benefits: [
      {
        title: 'Rich in Antioxidants',
        description: 'Strawberries are packed with vitamin C and antioxidants that help fight free radicals, reduce inflammation, and support overall cellular health.'
      },
      {
        title: 'Digestive Support',
        description: 'Mint contains menthol which aids digestion, reduces bloating, and soothes the digestive tract. It can help relieve indigestion and nausea.'
      },
      {
        title: 'Immune System Boost',
        description: 'The combination of vitamin C from strawberries and lemon strengthens your immune system, helping your body fight off infections and illnesses.'
      },
      {
        title: 'Natural Energy',
        description: 'Natural sugars and vitamins provide a gentle energy boost without the crash associated with caffeine or processed sugars.'
      },
      {
        title: 'Skin Health',
        description: 'Antioxidants and vitamin C promote collagen production, leading to healthier, more radiant skin and reduced signs of aging.'
      }
    ]
  };

  return (
    <div className="p-8 bg-background">
      <div className="text-center">
        <Button onClick={() => setOpen(true)} data-testid="button-open-modal">
          View Recipe Details
        </Button>
        <RecipeDetailModal 
          recipe={mockRecipe}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
