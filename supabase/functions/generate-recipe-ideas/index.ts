import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.28.0";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    
    // If this is a meal plan generation request
    if (requestData.generateMealPlan) {
      const { preferences } = requestData;
      
      let prompt = `Generate a 7-day skin-focused meal plan with breakfast, lunch, dinner, snacks, and hydration recommendations for each day.`;
      
      // Add food preferences if provided
      if (preferences) {
        if (preferences.includeFoods && preferences.includeFoods.trim()) {
          prompt += ` Please include these foods if possible: ${preferences.includeFoods}.`;
        }
        
        if (preferences.avoidFoods && preferences.avoidFoods.trim()) {
          prompt += ` Avoid these foods: ${preferences.avoidFoods}.`;
        }
        
        if (preferences.weeklyBudget && preferences.weeklyBudget.trim()) {
          prompt += ` Keep in mind a weekly budget of ${preferences.weeklyBudget}.`;
        }
      }
      
      prompt += ` Focus on skin health benefits. For each meal, include nutritional benefits for skin health.`;
      
      // For now, we'll respond with a dummy structure
      // In a real implementation, this would call OpenAI
      
      const dummyData = {
        skinFocus: "Hydration and anti-inflammation",
        weekStartDate: new Date().toISOString(),
        days: [
          {
            day: "Monday",
            breakfast: {
              meal: "Greek yogurt with berries and honey",
              benefits: "Rich in probiotics and antioxidants"
            },
            lunch: {
              meal: "Salmon salad with avocado and leafy greens",
              benefits: "Omega-3 fatty acids and healthy fats"
            },
            dinner: {
              meal: "Turmeric chicken with sweet potatoes and broccoli",
              benefits: "Anti-inflammatory properties and vitamin A"
            },
            snacks: ["Handful of almonds", "Sliced cucumber with hummus"],
            hydration: "2-3 liters of water, green tea"
          },
          // Add more days here with the same structure
          {
            day: "Tuesday",
            breakfast: {
              meal: "Overnight oats with chia seeds and blueberries",
              benefits: "Fiber and antioxidants for skin repair"
            },
            lunch: {
              meal: "Quinoa bowl with roasted vegetables and tahini",
              benefits: "Vitamin E and minerals for skin health"
            },
            dinner: {
              meal: "Baked cod with lemon, asparagus and brown rice",
              benefits: "Lean protein and zinc for collagen production"
            },
            snacks: ["Apple slices with almond butter", "Carrot sticks"],
            hydration: "2-3 liters of water, herbal tea"
          },
          // Additional days would go here...
        ],
        groceryList: [
          { category: "Proteins", items: ["Greek yogurt", "Salmon", "Chicken breast", "Tofu", "Eggs", "Cod fillet"] },
          { category: "Fruits & Vegetables", items: ["Mixed berries", "Avocado", "Leafy greens", "Sweet potatoes", "Broccoli", "Cucumber"] },
          { category: "Grains & Legumes", items: ["Overnight oats", "Chia seeds", "Quinoa", "Brown rice"] },
          { category: "Nuts & Seeds", items: ["Almonds"] },
          { category: "Condiments & Other", items: ["Honey", "Tahini", "Olive oil", "Lemon", "Turmeric", "Hummus"] },
          { category: "Beverages", items: ["Green tea", "Herbal tea"] }
        ]
      };
      
      return new Response(JSON.stringify(dummyData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } 
    // Otherwise, this is a recipe ideas request
    else {
      const { mealName, mealType, day, preferences } = requestData;

      let prompt = `Generate a detailed, nutritious ${mealType} recipe idea called "${mealName}" for ${day}.`;
      
      // Add food preferences if provided
      if (preferences) {
        if (preferences.includeFoods && preferences.includeFoods.trim()) {
          prompt += ` Please include these foods if possible: ${preferences.includeFoods}.`;
        }
        
        if (preferences.avoidFoods && preferences.avoidFoods.trim()) {
          prompt += ` Avoid these foods: ${preferences.avoidFoods}.`;
        }
        
        if (preferences.weeklyBudget && preferences.weeklyBudget.trim()) {
          prompt += ` Keep in mind a weekly budget of ${preferences.weeklyBudget}.`;
        }
      }

      prompt += ` Focus on skin health, include nutritional benefits, and structure the response with these sections: 
      1. Recipe name 
      2. Ingredients list 
      3. Preparation steps 
      4. Skin health benefits
      5. Nutritional highlights`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a nutritionist and chef specializing in skin-healthy recipes. Provide detailed, evidence-backed recipe ideas that support skin health."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const recipeIdea = response.choices[0].message.content;

      return new Response(JSON.stringify({ recipeIdea }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
