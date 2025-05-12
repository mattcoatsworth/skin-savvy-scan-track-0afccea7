
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    const { product, skinLogs } = await req.json();
    
    if (!product || !skinLogs) {
      throw new Error('Missing required data: product or skinLogs');
    }

    // Format data for OpenAI analysis
    const userSkinConditions = skinLogs.map((log: any) => ({
      date: log.log_date,
      overall_condition: log.overall_condition,
      hydration_level: log.hydration_level,
      oiliness_level: log.oiliness_level,
      redness_level: log.redness_level,
      acne_level: log.acne_level,
      notes: log.notes
    }));

    // Create OpenAI prompt
    const systemPrompt = `You are a skin health expert that can analyze a product and determine how suitable it would be for a user based on their skin logs. 
      Use your expertise to provide a personalized rating from 1-5 stars (can use half stars) and explain why this product would or wouldn't work well for the user's skin condition.
      Focus on creating a concise, evidence-based recommendation.`;
    
    const userPrompt = `Based on these recent skin logs: ${JSON.stringify(userSkinConditions)}, 
      analyze this ${product.type} product named "${product.name}" with impact "${product.impact}" 
      and provide a personalized recommendation. Format your response as a JSON with three fields:
      "recommendation" (a concise recommendation statement, 1-2 sentences),
      "reasoning" (why this product may or may not work for the user's skin condition, 2-3 sentences),
      "rating" (a number from 1 to 5, can include half points like 3.5)`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
        temperature: 0.5,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error from OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    // Validate the response has expected structure
    if (!result.recommendation || !result.reasoning || !result.rating) {
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in analyze-product-for-user function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
