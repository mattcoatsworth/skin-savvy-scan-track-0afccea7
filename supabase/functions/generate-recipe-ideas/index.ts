
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
    const { mealName, mealType, day } = await req.json();

    if (!mealName || !mealType || !day) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate the prompt for OpenAI
    const prompt = generatePrompt(mealName, mealType, day);

    // Call OpenAI API to generate recipe ideas
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a nutritionist specialized in skin health. Provide detailed recipe ideas for skin-friendly meals, including ingredients, steps, and skin benefits.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the OpenAI response into a structured format
    const parsedRecipes = parseRecipeResponse(content, mealName);

    return new Response(
      JSON.stringify(parsedRecipes),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating recipe ideas:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recipe ideas', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function generatePrompt(mealName: string, mealType: string, day: string) {
  let mealContext = "";
  
  if (mealType === "breakfast") {
    mealContext = "a healthy, skin-nourishing breakfast";
  } else if (mealType === "lunch") {
    mealContext = "a nutritious lunch that supports skin health";
  } else if (mealType === "dinner") {
    mealContext = "a skin-friendly dinner";
  } else if (mealType === "snacks") {
    mealContext = "healthy snacks that benefit skin health";
  } else if (mealType === "hydration") {
    mealContext = "hydrating beverages that improve skin health";
  }

  return `
    I'm looking for 2 detailed recipe ideas based on "${mealName}" for ${mealContext} on ${day}.

    For each recipe, include:
    1. A creative recipe name
    2. Preparation time and difficulty level
    3. List of ingredients with quantities
    4. Step-by-step instructions (5-7 steps)
    5. Key nutritional benefits for skin health

    After the recipes, add a "Nutrition Information" section with:
    1. A brief summary of how these recipes benefit skin health
    2. 3-5 specific skin benefits from key ingredients

    Format the response in JSON with this structure:
    {
      "recipes": [
        {
          "name": "Recipe name",
          "prepTime": "Preparation time",
          "difficulty": "Easy/Medium/Hard",
          "ingredients": ["ingredient 1", "ingredient 2", ...],
          "instructions": ["step 1", "step 2", ...]
        },
        {
          "name": "Recipe name",
          "prepTime": "Preparation time",
          "difficulty": "Easy/Medium/Hard",
          "ingredients": ["ingredient 1", "ingredient 2", ...],
          "instructions": ["step 1", "step 2", ...]
        }
      ],
      "nutritionInfo": {
        "summary": "Summary text",
        "benefits": ["benefit 1", "benefit 2", ...]
      }
    }
  `;
}

function parseRecipeResponse(content: string, fallbackMealName: string) {
  try {
    // Try to parse the response as JSON directly
    // Extract JSON from the response
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                      content.match(/\{[\s\S]*\}/);

    let parsedData;
    
    if (jsonMatch) {
      parsedData = JSON.parse(jsonMatch[0].replace(/```json|```/g, '').trim());
    } else {
      // If unable to parse JSON, return a fallback structure
      return {
        recipes: [
          {
            name: `${fallbackMealName} - Recipe 1`,
            prepTime: "30 minutes",
            difficulty: "Medium",
            ingredients: ["Ingredient information not available"],
            instructions: ["Recipe details could not be generated. Please try again."]
          },
          {
            name: `${fallbackMealName} - Recipe 2`,
            prepTime: "30 minutes",
            difficulty: "Medium",
            ingredients: ["Ingredient information not available"],
            instructions: ["Recipe details could not be generated. Please try again."]
          }
        ],
        nutritionInfo: {
          summary: "Nutrition information could not be generated.",
          benefits: [
            "Benefits information not available. Please try again."
          ]
        }
      };
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing recipe response:", error);
    
    // Return fallback data
    return {
      recipes: [
        {
          name: `${fallbackMealName} - Recipe 1`,
          prepTime: "30 minutes",
          difficulty: "Medium",
          ingredients: ["Ingredient information not available"],
          instructions: ["Recipe details could not be generated. Please try again."]
        }
      ],
      nutritionInfo: {
        summary: "Nutrition information could not be generated.",
        benefits: [
          "Benefits information not available. Please try again."
        ]
      }
    };
  }
}
