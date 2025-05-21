
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://esm.sh/openai@4.28.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.1";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://jgfsyayitqlelvtjresx.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl, supabaseServiceKey || '');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { userId, preferredFoods, excludedFoods, weeklyBudget, includeGroceryList } = await req.json();
    
    console.log("Generating meal plan for user:", userId);
    console.log("Preferences:", { preferredFoods, excludedFoods, weeklyBudget, includeGroceryList });
    
    // Fetch skin logs for the user if available
    let skinData = null;
    let skinConcerns = [];
    
    if (userId) {
      try {
        // Get the most recent skin logs for this user
        const { data: skinLogs, error: skinLogError } = await supabase
          .from('skin_logs')
          .select(`
            *,
            daily_factors(*)
          `)
          .eq('user_id', userId)
          .order('log_date', { ascending: false })
          .limit(5);

        if (skinLogError) throw new Error(skinLogError.message);
        
        if (skinLogs && skinLogs.length > 0) {
          skinData = skinLogs;
          
          // Extract skin concerns from the logs
          skinLogs.forEach(log => {
            if (log.concerns) {
              if (Array.isArray(log.concerns)) {
                skinConcerns = [...skinConcerns, ...log.concerns];
              } else if (typeof log.concerns === 'string') {
                skinConcerns.push(log.concerns);
              }
            }
          });
          
          // Remove duplicates from concerns
          skinConcerns = [...new Set(skinConcerns)];
        }
      } catch (error) {
        console.error("Error fetching skin data:", error);
        // Continue with the meal plan generation even if we can't fetch skin logs
      }
    }
    
    // Prepare the prompt for OpenAI
    const systemPrompt = `You are a nutritionist specializing in creating meal plans that improve skin health. 
    Focus on anti-inflammatory foods, antioxidants, healthy fats, and adequate hydration. 
    Be specific and practical with your recommendations.`;
    
    let userPrompt = `Create a personalized 7-day meal plan for optimal skin health that includes breakfast, lunch, dinner, snacks, and hydration recommendations for each day.`;
    
    // Add skin concerns if available
    if (skinConcerns.length > 0) {
      userPrompt += ` The meal plan should address these specific skin concerns: ${skinConcerns.join(', ')}.`;
    } else {
      userPrompt += ` Create a general skin-healthy meal plan focused on overall skin clarity and health.`;
    }
    
    // Add food preferences if provided
    if (preferredFoods) {
      userPrompt += ` Please include these foods if possible: ${preferredFoods}.`;
    }
    
    // Add food exclusions if provided
    if (excludedFoods) {
      userPrompt += ` Avoid these foods: ${excludedFoods}.`;
    }
    
    // Add budget considerations if provided
    if (weeklyBudget) {
      userPrompt += ` Keep in mind a weekly grocery budget of ${weeklyBudget}.`;
    }
    
    // Add section for expected results
    userPrompt += ` Also include an "expectedResults" section that explains:
    1. What improvements in skin health the user can expect from following this meal plan
    2. A realistic percentage of improvement they might see
    3. How long it may take to see results
    4. Any lifestyle factors that might enhance the effectiveness of the meal plan`;
    
    userPrompt += ` For each meal and snack, include a brief explanation of how it benefits skin health.
    Structure your response in JSON format with this structure:
    {
      "skinFocus": "Brief description of the main nutritional focus for skin health",
      "weekStartDate": "Current date",
      "days": [
        {
          "day": "Day name (e.g., Monday)",
          "breakfast": {
            "meal": "Breakfast description",
            "benefits": "Brief explanation of skin benefits"
          },
          "lunch": {
            "meal": "Lunch description",
            "benefits": "Brief explanation of skin benefits"
          },
          "dinner": {
            "meal": "Dinner description", 
            "benefits": "Brief explanation of skin benefits"
          },
          "snacks": ["Snack 1", "Snack 2"],
          "hydration": "Hydration recommendation"
        }
      ],
      "expectedResults": {
        "improvements": "Description of expected skin improvements",
        "percentageImprovement": "Estimated percentage improvement (e.g., '85%')",
        "timeframe": "Expected timeframe to see results (e.g., '2-4 weeks')",
        "lifestyleFactors": "Additional lifestyle factors that enhance results"
      }
    }
    Include all seven days of the week.`;
    
    // Generate the meal plan with OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });
    
    // Parse the response
    let mealPlanData;
    try {
      const content = response.choices[0].message.content;
      mealPlanData = JSON.parse(content);
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error("Failed to generate a valid meal plan");
    }
    
    // Generate grocery list if requested
    let groceryList = null;
    if (includeGroceryList) {
      try {
        const groceryResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: "You are a nutrition expert specializing in creating organized grocery lists." 
            },
            { 
              role: "user", 
              content: `Based on this 7-day meal plan, create a comprehensive grocery list organized by categories.
              Meal plan: ${JSON.stringify(mealPlanData.days)}
              
              Format your response as JSON with this structure:
              {
                "groceryList": [
                  {
                    "category": "Category name (e.g., Proteins, Fruits & Vegetables)",
                    "items": ["Item 1", "Item 2", "Item 3"]
                  }
                ]
              }
              Common categories include Proteins, Fruits & Vegetables, Grains & Legumes, Nuts & Seeds, Condiments & Other, and Beverages.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          response_format: { type: "json_object" }
        });
        
        const groceryContent = groceryResponse.choices[0].message.content;
        groceryList = JSON.parse(groceryContent).groceryList;
      } catch (error) {
        console.error("Error generating grocery list:", error);
      }
    }
    
    // Add the grocery list to the meal plan data
    if (groceryList) {
      mealPlanData.groceryList = groceryList;
    }

    // Return the generated meal plan
    return new Response(JSON.stringify(mealPlanData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error generating meal plan:', error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate meal plan" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
