
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

    const { recommendationType, userSkinData } = await req.json();
    
    if (!recommendationType) {
      throw new Error('Missing required data: recommendationType');
    }

    // Create a system prompt based on the recommendation type
    let systemPrompt = `You are an expert dermatologist and skincare specialist. 
      Create personalized content for a recommendation about ${recommendationType}. 
      The content should be tailored to the user's skin data provided.`;
      
    // Add specific guidance based on recommendation type
    switch (recommendationType) {
      case "gentle-cleanser":
        systemPrompt += `Focus on why gentle cleansers are important for this specific user's skin type, 
          the signs their current cleanser might be too harsh, benefits of switching, and specific product recommendations.`;
        break;
      case "limit-dairy":
        systemPrompt += `Focus on the correlation between dairy consumption and skin problems for this specific user, 
          explaining the science behind it, providing alternatives, and suggesting an implementation plan.`;
        break;
      case "vitamin-c-serum":
        systemPrompt += `Focus on why vitamin C would benefit this specific user's skin concerns,
          explaining the key benefits, proper usage instructions, and product recommendations.`;
        break;
      case "meditation":
        systemPrompt += `Focus on the connection between stress and skin health for this user specifically,
          explaining how meditation can help improve their skin condition, and providing practical meditation recommendations.`;
        break;
      case "zinc-supplement":
        systemPrompt += `Focus on how zinc supplements could help with this user's specific skin issues,
          explaining the benefits, recommended dosage, and precautions.`;
        break;
      default:
        systemPrompt += `Provide a general recommendation about skincare practices and products.`;
    }
    
    // Add formatting guidance
    systemPrompt += `Structure your response as a JSON object with these sections: 
      "overview": {
        "title": "Title of recommendation",
        "emoji": "An appropriate emoji",
        "tagline": "A short tagline to summarize the recommendation",
        "benefitScore": A number between 1-100 representing potential benefit,
        "whyRecommended": "Brief explanation of why this is recommended specifically for the user"
      }, 
      "keyBenefits": [{"title": "Benefit title", "description": "Description of benefit"}],
      "correlationData": [{"title": "Data point title", "description": "Description of correlation or data"}], 
      "howToUse": [{"step": 1, "title": "Step title", "description": "Step description"}],
      "products": [{"name": "Product name", "brand": "Brand name", "price": "Price", "rating": Rating from 1-5, "description": "Product description", "strength": "Key strength of product"}],
      "scientificResearch": [{"journal": "Journal name", "study": "Study year", "findings": "Key findings"}]`;

    const userPrompt = userSkinData 
      ? `Based on this user's skin data: ${JSON.stringify(userSkinData)}, create personalized content for a ${recommendationType} recommendation.`
      : `Create a personalized recommendation for ${recommendationType} for a user with combination skin, occasional breakouts, and some sensitivity.`;

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
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error from OpenAI: ${response.status}`);
    }

    const data = await response.json();
    let contentData;
    
    try {
      contentData = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      throw new Error("Failed to parse OpenAI response as JSON");
    }
    
    return new Response(JSON.stringify(contentData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in generate-recommendation-content function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
