
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials not found in environment variables');
    }

    // Create a Supabase client with the service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user_id from the request body
    const { user_id } = await req.json();

    if (!user_id) {
      throw new Error('User ID is required');
    }

    // Fetch the latest skin logs for this user (up to 10 entries)
    const { data: skinLogs, error: skinLogError } = await supabase
      .from('skin_logs')
      .select(`
        *,
        daily_factors(*)
      `)
      .eq('user_id', user_id)
      .order('log_date', { ascending: false })
      .limit(10);

    if (skinLogError) {
      throw new Error(`Error fetching skin logs: ${skinLogError.message}`);
    }

    // Fetch product usage data
    const { data: productUsage, error: productUsageError } = await supabase
      .from('product_usage')
      .select('*')
      .eq('user_id', user_id)
      .order('usage_date', { ascending: false })
      .limit(10);

    if (productUsageError) {
      throw new Error(`Error fetching product usage: ${productUsageError.message}`);
    }

    // Fetch food intake data
    const { data: foodIntake, error: foodIntakeError } = await supabase
      .from('food_intake')
      .select('*')
      .eq('user_id', user_id)
      .order('intake_date', { ascending: false })
      .limit(10);

    if (foodIntakeError) {
      throw new Error(`Error fetching food intake: ${foodIntakeError.message}`);
    }

    // Structure the prompt for OpenAI
    const systemPrompt = `
      You are a dermatological AI assistant specialized in analyzing skin health data and providing personalized recommendations.
      
      Based on the user's skin logs, product usage, and food intake, create 5-12 highly specific and personalized recommendations
      that could help improve the user's skin health. Each recommendation should be concise (max 30 characters) and fall into one of these categories:
      
      1. "skincare" - Specific skincare products or routines
      2. "food" - Dietary suggestions
      3. "supplements" - Vitamin or supplement recommendations
      4. "makeup" - Makeup products or application techniques
      5. "lifestyle" - Sleep, stress management, or environmental factors
      
      For each recommendation:
      - Consider the user's skin condition trends
      - Look for correlations between products/foods and skin issues
      - Identify potential triggers or beneficial products
      - Provide specific, actionable advice
      
      Return a JSON array of recommendations with these properties:
      - type: One of the five categories above (skincare, food, supplements, makeup, lifestyle)
      - text: The actual recommendation text (max 30 characters)
      - details: A detailed explanation of why this recommendation is made (2-3 sentences)
    `;

    const userPrompt = `
      Here is the user's skin data:
      
      SKIN LOGS AND FACTORS:
      ${JSON.stringify(skinLogs, null, 2)}
      
      PRODUCT USAGE:
      ${JSON.stringify(productUsage, null, 2)}
      
      FOOD INTAKE:
      ${JSON.stringify(foodIntake, null, 2)}
      
      Based on this data, generate personalized skin recommendations for the user.
    `;

    // Call OpenAI API
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
        max_tokens: 1500,
      }),
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json();
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await aiResponse.json();
    let recommendations;
    
    try {
      // Parse the AI response to get the recommendations
      const content = data.choices[0].message.content;
      const parsedContent = JSON.parse(content);
      recommendations = parsedContent.recommendations || [];
      
      // Store the generated recommendations in the database
      if (recommendations.length > 0) {
        const { error: insertError } = await supabase
          .from('ai_generated_content')
          .upsert({
            product_type: 'skin_recommendations',
            product_id: user_id,
            content_type: 'recommendations',
            content: { recommendations },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'product_type,product_id,content_type'
          });
          
        if (insertError) {
          console.error('Error storing recommendations:', insertError);
        }
      }
    } catch (e) {
      console.error('Error parsing AI response:', e);
      throw new Error(`Failed to parse AI recommendations: ${e.message}`);
    }
    
    return new Response(JSON.stringify({
      recommendations
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in generate-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while generating recommendations'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
