import RecipeCard from '../RecipeCard';
import strawberryMintImage from '@assets/generated_images/Strawberry_mint_infused_water_d0a4d439.png';
import citrusImage from '@assets/generated_images/Citrus_blend_infused_water_55726409.png';
import cucumberImage from '@assets/generated_images/Cucumber_herb_spa_water_c31ab401.png';

export default function RecipeCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <RecipeCard
          id="1"
          name="Strawberry Mint Fusion"
          image={strawberryMintImage}
          prepTime="5 min"
          category="Detox"
          benefits={["Antioxidants", "Digestion", "Energy Boost"]}
          ingredients={["Strawberries", "Mint leaves", "Lemon", "Water"]}
          onClick={() => console.log('Recipe clicked')}
        />
        <RecipeCard
          id="2"
          name="Zesty Citrus Blend"
          image={citrusImage}
          prepTime="3 min"
          category="Immunity"
          benefits={["Vitamin C", "Immunity", "Hydration"]}
          ingredients={["Orange", "Lemon", "Grapefruit", "Lime"]}
          onClick={() => console.log('Recipe clicked')}
        />
        <RecipeCard
          id="3"
          name="Cucumber Herb Spa"
          image={cucumberImage}
          prepTime="4 min"
          category="Relaxation"
          benefits={["Calming", "Skin Health", "Anti-inflammatory"]}
          ingredients={["Cucumber", "Mint", "Basil", "Lemon"]}
          onClick={() => console.log('Recipe clicked')}
        />
      </div>
    </div>
  );
}
