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
    const { mealName, mealType, day, onlyBenefits } = await req.json();

    if (!mealName || !mealType || !day) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Choose the appropriate prompt based on the request type
    let prompt;
    if (onlyBenefits) {
      prompt = generateSkinBenefitsPrompt(mealName, mealType);
    } else {
      prompt = generateRecipePrompt(mealName, mealType, day);
    }

    // Call OpenAI API to generate recipe ideas or skin benefits
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
            content: onlyBenefits 
              ? 'You are a nutritionist specialized in skin health. Provide detailed information about how specific foods benefit skin health.'
              : 'You are a nutritionist specialized in skin health. Provide detailed recipe ideas for skin-friendly meals, including ingredients, steps, and skin benefits.'
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

    // Parse the response based on request type
    if (onlyBenefits) {
      const parsedBenefits = parseBenefitsResponse(content, mealName);
      return new Response(
        JSON.stringify(parsedBenefits),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      const parsedRecipes = parseRecipeResponse(content, mealName);
      return new Response(
        JSON.stringify(parsedRecipes),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error generating content:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate content', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function generateRecipePrompt(mealName: string, mealType: string, day: string) {
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

function generateSkinBenefitsPrompt(mealName: string, mealType: string) {
  return `
    Analyze the following foods/drinks from ${mealType}: "${mealName}"

    For each distinct food or ingredient mentioned, provide specific skin health benefits.
    Focus on:
    1. How each ingredient benefits the skin
    2. Key nutrients that impact skin health
    3. How they may address specific skin concerns

    Format the response as a JSON array of benefit descriptions, with one detailed sentence per item:
    [
      "Food item: Specific benefit and mechanism relevant to skin health",
      "Food item: Specific benefit and mechanism relevant to skin health",
      ...
    ]

    Keep each benefit description concise but informative. Include 5-8 items in total.
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

function parseBenefitsResponse(content: string, fallbackMealName: string) {
  try {
    // Try to extract JSON array from the response
    const jsonMatch = content.match(/\[[\s\S]*?\]/);
    
    let benefits;
    
    if (jsonMatch) {
      benefits = JSON.parse(jsonMatch[0]);
      
      // Ensure it's an array with at least one item
      if (!Array.isArray(benefits) || benefits.length === 0) {
        throw new Error("Parsed content is not a valid benefits array");
      }
    } else {
      // If no JSON array found, try to extract bullet points or paragraphs
      const lines = content.split(/\n+/);
      benefits = lines
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().length > 15)
        .map(line => line.trim().replace(/^[-•]\s*/, ''))
        .filter(line => line.length > 0)
        .slice(0, 8); // Limit to 8 items
        
      if (benefits.length === 0) {
        throw new Error("Could not extract benefits from the response");
      }
    }
    
    return { benefits };
  } catch (error) {
    console.error("Error parsing benefits response:", error);
    
    // Return fallback data
    return {
      benefits: [
        `${fallbackMealName} contains nutrients that support healthy skin`,
        "Rich in antioxidants that protect skin cells from damage",
        "Provides hydration which is essential for skin elasticity",
        "Contains vitamins that promote collagen production",
        "May help reduce inflammation associated with skin conditions"
      ]
    };
  }
}
