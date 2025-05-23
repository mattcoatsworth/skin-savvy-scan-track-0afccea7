
import React from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import FoodProductDetail from "@/components/product/FoodProductDetail";
import NutritionalContent from "@/components/product/NutritionalContent";
import SkinImpactContent from "@/components/product/SkinImpactContent";
import ConsumptionTips from "@/components/product/ConsumptionTips";

const AvocadoProductExample = () => {
  // Add scroll to top functionality
  useScrollToTop();
  
  // Avocado product data
  const avocado = {
    id: "avocado", 
    name: "Avocado", 
    brand: "Organic Produce",
    rating: 90, 
    impact: "Positive", 
    description: "High in healthy fats that improve skin elasticity",
    benefits: [
      "Rich in vitamin E that helps protect skin from oxidative damage",
      "Contains healthy fats that support skin barrier function",
      "Promotes collagen production for firmer skin"
    ]
  };

  // Avocado-specific nutritional information
  const avocadoNutrients = [
    { name: "Healthy Fats", value: "15g", color: "bg-emerald-100 text-emerald-800" },
    { name: "Fiber", value: "7g", color: "bg-amber-100 text-amber-800" },
    { name: "Vitamin E", value: "10%", color: "bg-blue-100 text-blue-800" },
    { name: "Potassium", value: "14%", color: "bg-purple-100 text-purple-800" },
  ];

  // Avocado consumption tips
  const avocadoConsumptionTips = [
    "As a spread on whole grain toast",
    "Added to salads",
    "In smoothies for added creaminess",
    "As guacamole with fresh vegetables"
  ];

  // Avocado skin impact text
  const avocadoSkinImpactText = 
    "Avocados contain essential fatty acids that help maintain skin elasticity and prevent premature aging. " +
    "The vitamin E in avocados acts as an antioxidant, protecting skin cells from oxidative damage.";

  // Personalized content
  const personalRating = 92;
  const recommendationText = "Based on your skin profile, incorporating avocado regularly could help with your dry skin concerns and improve overall elasticity.";
  const whyItWorks = "The healthy fats in avocados align well with your skin's needs, especially considering your recent skin logs showing increased dryness. The antioxidants can also help address the inflammation patterns we've observed.";
  const usageSuggestion = "Try consuming 1/4 to 1/2 an avocado daily for optimal benefits. You may see improvements in your skin's moisture levels within 2-3 weeks of regular consumption.";

  // Create section components
  const nutritionalContent = (
    <NutritionalContent nutrients={avocadoNutrients} />
  );
  
  const skinImpactContent = (
    <SkinImpactContent skinImpactText={avocadoSkinImpactText} />
  );
  
  const consumptionTips = (
    <ConsumptionTips tips={avocadoConsumptionTips} />
  );

  return (
    <FoodProductDetail
      product={avocado}
      nutritionalContent={nutritionalContent}
      skinImpactContent={skinImpactContent}
      consumptionTips={consumptionTips}
      personalRating={personalRating}
      recommendationText={recommendationText}
      whyItWorks={whyItWorks}
      usageSuggestion={usageSuggestion}
    />
  );
};

export default AvocadoProductExample;
