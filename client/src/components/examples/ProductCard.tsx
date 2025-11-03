import ProductCard from '../ProductCard';
import strawberryImage from '@assets/generated_images/Strawberry_mint_infused_water_d0a4d439.png';
import citrusImage from '@assets/generated_images/Citrus_blend_infused_water_55726409.png';
import berryImage from '@assets/generated_images/Berry_antioxidant_infused_water_d6cb48f0.png';
import tropicalImage from '@assets/generated_images/Tropical_pineapple_coconut_water_26a03ae4.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <ProductCard
          id="1"
          name="Strawberry Mint Fusion - 1L Bottle"
          image={strawberryImage}
          price={299}
          originalPrice={399}
          rating={4.8}
          reviews={156}
          category="Detox"
          isBestSeller
          onAddToCart={() => console.log('Added to cart')}
        />
        <ProductCard
          id="2"
          name="Zesty Citrus Blend - 1L Bottle"
          image={citrusImage}
          price={279}
          rating={4.6}
          reviews={89}
          category="Immunity"
          isNew
          onAddToCart={() => console.log('Added to cart')}
        />
        <ProductCard
          id="3"
          name="Berry Antioxidant - 1L Bottle"
          image={berryImage}
          price={349}
          rating={4.9}
          reviews={203}
          category="Energy"
          isBestSeller
          onAddToCart={() => console.log('Added to cart')}
        />
        <ProductCard
          id="4"
          name="Tropical Pineapple - 1L Bottle"
          image={tropicalImage}
          price={319}
          originalPrice={379}
          rating={4.7}
          reviews={124}
          category="Refreshing"
          onAddToCart={() => console.log('Added to cart')}
        />
      </div>
    </div>
  );
}
