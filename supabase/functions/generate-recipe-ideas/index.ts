
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
    const { mealName, mealType, day, preferences } = await req.json();

    let prompt = `Generate a detailed, nutritious ${mealType} recipe idea called "${mealName}" for ${day}.`;
    
    // Add food preferences if provided
    if (preferences) {
      if (preferences.includeFoods) {
        prompt += ` Please include these foods if possible: ${preferences.includeFoods}.`;
      }
      
      if (preferences.avoidFoods) {
        prompt += ` Avoid these foods: ${preferences.avoidFoods}.`;
      }
      
      if (preferences.weeklyBudget) {
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
