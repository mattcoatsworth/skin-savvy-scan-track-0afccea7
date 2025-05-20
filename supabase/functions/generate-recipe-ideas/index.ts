
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
    
    // Check if this is a request to generate a meal plan
    if (requestData.generateMealPlan) {
      // Extract preferences
      const preferences = requestData.preferences || {};
      const includeGroceryList = requestData.includeGroceryList || false;
      
      // Generate a meal plan using OpenAI
      let prompt = `Create a 7-day skin-focused meal plan that supports skin health.`;
      
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
      
      if (includeGroceryList) {
        prompt += ` Also include a comprehensive grocery list organized by category.`;
      }
      
      prompt += ` Format the meal plan as a structured JSON object with these properties:
      1. skinFocus (string describing the skin focus)
      2. weekStartDate (the current date as string)
      3. days (array of day objects)
      4. groceryList (optional, array of category objects with items)
      
      Each day object should have:
      - day (string, e.g., "Monday")
      - breakfast, lunch, dinner (objects with "meal" and "benefits" properties)
      - snacks (array of strings)
      - hydration (string)
      
      Make the meal plans realistic and provide specific benefits related to skin health.`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a nutritionist specializing in creating meal plans that support skin health. You provide detailed, evidence-backed meal plans that address specific skin concerns through nutrition."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });
      
      // Parse the response and return it
      const mealPlanContent = response.choices[0].message.content;
      const mealPlan = JSON.parse(mealPlanContent);
      
      return new Response(JSON.stringify({ mealPlan }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    
    // Original recipe ideas functionality
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
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
