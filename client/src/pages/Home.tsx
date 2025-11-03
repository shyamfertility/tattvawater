import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import RecipeCard from "@/components/RecipeCard";
import ProductCard from "@/components/ProductCard";
import DailyProgress from "@/components/DailyProgress";
import WeeklyChart from "@/components/WeeklyChart";
import StatsGrid from "@/components/StatsGrid";
import TimelineReminder from "@/components/TimelineReminder";
import MotivationalCard from "@/components/MotivationalCard";
import RecipeDetailModal from "@/components/RecipeDetailModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Droplet, Flame, Zap, Award, Sparkles } from "lucide-react";

import strawberryImage from "@assets/generated_images/Strawberry_mint_infused_water_d0a4d439.png";
import citrusImage from "@assets/generated_images/Citrus_blend_infused_water_55726409.png";
import cucumberImage from "@assets/generated_images/Cucumber_herb_spa_water_c31ab401.png";
import berryImage from "@assets/generated_images/Berry_antioxidant_infused_water_d6cb48f0.png";
import tropicalImage from "@assets/generated_images/Tropical_pineapple_coconut_water_26a03ae4.png";
import watermelonImage from "@assets/generated_images/Watermelon_rosemary_infused_water_775b02d5.png";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [motivationVisible, setMotivationVisible] = useState(true);

  const recipes = [
    {
      id: "1",
      name: "Strawberry Mint Fusion",
      image: strawberryImage,
      prepTime: "5 min",
      category: "Detox",
      benefits: ["Antioxidants", "Digestion", "Energy Boost"],
      ingredients: ["Strawberries", "Mint leaves", "Lemon", "Water"],
      temperature: "Cold (4-8°C)",
      bestTime: "Morning",
      price: 299,
      method: [
        "Wash all fresh ingredients thoroughly",
        "Slice strawberries and lemon into thin pieces",
        "Add ingredients to infuser bottle",
        "Fill with cold filtered water",
        "Let infuse for 2-4 hours in refrigerator"
      ],
      benefitDetails: [
        { title: "Rich in Antioxidants", description: "Strawberries are packed with vitamin C and antioxidants that help fight free radicals and reduce inflammation." },
        { title: "Digestive Support", description: "Mint contains menthol which aids digestion and reduces bloating." },
        { title: "Energy Boost", description: "Natural sugars provide gentle energy without the crash." }
      ]
    },
    {
      id: "2",
      name: "Zesty Citrus Blend",
      image: citrusImage,
      prepTime: "3 min",
      category: "Immunity",
      benefits: ["Vitamin C", "Immunity", "Hydration"],
      ingredients: ["Orange", "Lemon", "Grapefruit", "Lime"],
      temperature: "Cold (4-8°C)",
      bestTime: "Morning",
      price: 279,
      method: [
        "Halve and slice all citrus fruits thinly",
        "Add sliced fruit to infuser bottle",
        "Fill with cold water",
        "Infuse for 2-3 hours and enjoy"
      ],
      benefitDetails: [
        { title: "Vitamin C Powerhouse", description: "Citrus fruits provide high doses of vitamin C to boost immunity and skin health." },
        { title: "Alkalizing Effect", description: "Despite being acidic, citrus helps alkalize the body." }
      ]
    },
    {
      id: "3",
      name: "Cucumber Herb Spa",
      image: cucumberImage,
      prepTime: "4 min",
      category: "Relaxation",
      benefits: ["Calming", "Skin Health", "Anti-inflammatory"],
      ingredients: ["Cucumber", "Mint", "Basil", "Lemon"],
      temperature: "Cool (10-12°C)",
      bestTime: "Afternoon",
      price: 259,
      method: [
        "Slice cucumber thinly",
        "Add cucumber, herbs, and lemon to bottle",
        "Fill with cool water",
        "Infuse for 3-4 hours"
      ],
      benefitDetails: [
        { title: "Hydration Boost", description: "Cucumbers are 96% water and provide electrolytes." },
        { title: "Skin Benefits", description: "Silica in cucumbers promotes healthy skin and connective tissue." }
      ]
    },
    {
      id: "4",
      name: "Berry Antioxidant Power",
      image: berryImage,
      prepTime: "5 min",
      category: "Energy",
      benefits: ["Antioxidants", "Brain Health", "Energy"],
      ingredients: ["Blueberries", "Blackberries", "Raspberries", "Water"],
      temperature: "Cold (4-8°C)",
      bestTime: "Mid-Morning",
      price: 349,
      method: [
        "Rinse all berries thoroughly",
        "Add mixed berries to bottle",
        "Fill with cold filtered water",
        "Infuse for 3-5 hours"
      ],
      benefitDetails: [
        { title: "Brain Power", description: "Berries contain anthocyanins that support cognitive function." },
        { title: "Anti-Aging", description: "High antioxidant content fights oxidative stress." }
      ]
    },
    {
      id: "5",
      name: "Tropical Paradise",
      image: tropicalImage,
      prepTime: "6 min",
      category: "Refreshing",
      benefits: ["Vitamin C", "Digestion", "Hydration"],
      ingredients: ["Pineapple", "Coconut", "Vanilla", "Water"],
      temperature: "Cool (8-10°C)",
      bestTime: "Afternoon",
      price: 319,
      method: [
        "Cut pineapple into chunks",
        "Scoop coconut flesh",
        "Add vanilla bean pod",
        "Fill with cool water and infuse 4 hours"
      ],
      benefitDetails: [
        { title: "Digestive Enzymes", description: "Pineapple contains bromelain which aids digestion." },
        { title: "Electrolyte Balance", description: "Coconut provides natural electrolytes." }
      ]
    },
    {
      id: "6",
      name: "Watermelon Rosemary Refresh",
      image: watermelonImage,
      prepTime: "4 min",
      category: "Hydration",
      benefits: ["Hydration", "Antioxidants", "Cooling"],
      ingredients: ["Watermelon", "Rosemary", "Lime", "Water"],
      temperature: "Cold (4-6°C)",
      bestTime: "Evening",
      price: 289,
      method: [
        "Cube fresh watermelon",
        "Add watermelon and rosemary sprig",
        "Squeeze lime juice and add slices",
        "Fill with ice-cold water and infuse 2-3 hours"
      ],
      benefitDetails: [
        { title: "Superior Hydration", description: "Watermelon is 92% water with natural sugars for quick hydration." },
        { title: "Antioxidant Rich", description: "Contains lycopene, a powerful antioxidant." }
      ]
    }
  ];

  const stats = [
    {
      label: "This Week",
      value: "21.5L",
      icon: <Droplet className="h-5 w-5 text-primary" />,
      trend: "+12%",
      color: "bg-primary/10"
    },
    {
      label: "Daily Average",
      value: "3.1L",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      trend: "+5%",
      color: "bg-orange-500/10"
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-500/10"
    },
    {
      label: "Energy Score",
      value: "8.5/10",
      icon: <Award className="h-5 w-5 text-green-500" />,
      trend: "+1.2",
      color: "bg-green-500/10"
    }
  ];

  const weeklyData = [
    { day: "Mon", intake: 2800, goal: 3000 },
    { day: "Tue", intake: 3200, goal: 3000 },
    { day: "Wed", intake: 2500, goal: 3000 },
    { day: "Thu", intake: 3100, goal: 3000 },
    { day: "Fri", intake: 2900, goal: 3000 },
    { day: "Sat", intake: 3400, goal: 3000 },
    { day: "Sun", intake: 2700, goal: 3000 }
  ];

  const reminders = [
    { time: "7:00 AM", label: "Morning Wake-up", amount: "500ml", completed: true, optimal: false },
    { time: "9:30 AM", label: "Mid-morning Boost", amount: "300ml", completed: true, optimal: false },
    { time: "12:00 PM", label: "Before Lunch", amount: "400ml", completed: false, optimal: true },
    { time: "3:00 PM", label: "Afternoon Energy", amount: "300ml", completed: false, optimal: false },
    { time: "6:00 PM", label: "Evening Hydration", amount: "400ml", completed: false, optimal: false },
    { time: "8:30 PM", label: "Before Bed", amount: "200ml", completed: false, optimal: false }
  ];

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe({
      ...recipe,
      benefits: recipe.benefitDetails
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={2} isAuthenticated={true} userName="Sarah" />
      
      <HeroSection />
      
      <section id="track" className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Track Your Hydration
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor your daily water intake with personalized goals and insights
            </p>
          </div>
          
          {motivationVisible && (
            <div className="max-w-2xl mx-auto">
              <MotivationalCard
                message="Small steps every day lead to big changes. Your body is 60% water - honor it with every sip you take."
                author="Tattva Wellness"
                onDismiss={() => setMotivationVisible(false)}
              />
            </div>
          )}
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <DailyProgress current={1750} goal={3000} />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <StatsGrid stats={stats} />
              <WeeklyChart data={weeklyData} />
            </div>
          </div>
          
          <TimelineReminder reminders={reminders} />
        </div>
      </section>
      
      <BenefitsSection />
      
      <section id="recipes" className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Explore Our Recipes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              100+ carefully crafted infused water recipes with detailed health benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" data-testid="button-view-all-recipes">
              <Sparkles className="mr-2 h-5 w-5" />
              View All 100+ Recipes
            </Button>
          </div>
        </div>
      </section>
      
      <section id="shop" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Shop Tattva Bottles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium 1L infused water bottles delivered to your door
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.slice(0, 4).map((recipe) => (
              <ProductCard
                key={recipe.id}
                id={recipe.id}
                name={`${recipe.name} - 1L Bottle`}
                image={recipe.image}
                price={recipe.price}
                originalPrice={recipe.id === "1" ? 399 : undefined}
                rating={4.8}
                reviews={156}
                category={recipe.category}
                isBestSeller={recipe.id === "1"}
                isNew={recipe.id === "2"}
                onAddToCart={() => console.log("Added to cart:", recipe.name)}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
