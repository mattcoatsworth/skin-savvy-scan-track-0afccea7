
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { mealPlan } = await req.json();

    if (!mealPlan || !Array.isArray(mealPlan)) {
      throw new Error('Invalid meal plan data');
    }

    // Prepare the prompt for OpenAI
    const promptContent = `
    Based on the following 7-day meal plan, create an organized grocery list categorized by food types.
    The grocery list should include all ingredients needed for the meals across the week without duplications.
    Group items by categories like "Proteins", "Fruits & Vegetables", "Grains & Legumes", "Nuts & Seeds", "Condiments & Other", and "Beverages".

    Here's the meal plan for analysis:
    ${JSON.stringify(mealPlan, null, 2)}

    Please format the response as JSON with the following structure:
    {
      "groceryList": [
        {
          "category": "Category Name",
          "items": ["Item 1", "Item 2", "Item 3"]
        },
        // Additional categories...
      ]
    }
    `;

    // Make the request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that specializes in nutrition and meal planning.' },
          { role: 'user', content: promptContent }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    let groceryListData;

    try {
      // Try to parse OpenAI's response as JSON
      const content = data.choices[0].message.content;
      // Extract just the JSON part in case there's additional text
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        groceryListData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Couldn't extract JSON from the response");
      }
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      
      // Fallback to a structured response if parsing fails
      groceryListData = {
        groceryList: [
          {
            category: "Proteins",
            items: ["Greek yogurt", "Salmon", "Chicken breast", "Tofu", "Eggs"]
          },
          {
            category: "Fruits & Vegetables",
            items: ["Berries", "Avocado", "Leafy greens", "Sweet potatoes", "Broccoli", "Cucumber", "Spinach"]
          },
          {
            category: "Grains & Legumes",
            items: ["Quinoa", "Chia seeds", "Brown rice", "Whole grain bread", "Black beans", "Lentils"]
          },
          {
            category: "Nuts & Seeds",
            items: ["Almonds", "Flaxseeds", "Pumpkin seeds", "Walnuts", "Hemp seeds"]
          },
          {
            category: "Condiments & Other",
            items: ["Honey", "Tahini", "Olive oil", "Lemon", "Turmeric", "Hummus", "Coconut milk"]
          }
        ]
      };
    }

    return new Response(JSON.stringify(groceryListData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-grocery-list function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
