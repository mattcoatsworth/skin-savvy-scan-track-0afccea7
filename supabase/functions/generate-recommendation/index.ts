
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

    const { 
      recommendationType, 
      userData, 
      skinLogs, 
      products 
    } = await req.json();
    
    if (!recommendationType || !userData || !skinLogs) {
      throw new Error('Missing required data: recommendationType, userData, or skinLogs');
    }

    // Structure for the recommendation content based on our static pages
    const contentSections = [
      {
        name: "overview",
        description: "Create an overview section that explains why this recommendation matters for the user's skin specifically, with data points and personalized insights."
      },
      {
        name: "analysis",
        description: "Provide a detailed analysis of the recommendation, including correlation patterns, triggers, and scientific context tailored to the user's skin data."
      },
      {
        name: "benefits",
        description: "List 3-5 benefits this recommendation will have for the user's specific skin condition, with personalized explanations for each."
      },
      {
        name: "implementation",
        description: "Create a step-by-step implementation plan with 3-4 specific actions the user should take, customized to their routine and skin condition."
      },
      {
        name: "scienceResearch",
        description: "Provide 2-3 scientific research points that support this recommendation, with journal references and brief summaries."
      },
      {
        name: "additionalResources",
        description: "Suggest products, tools, or resources that would help implement this recommendation, based on user's profile."
      }
    ];

    // Create system prompt for the OpenAI model
    const systemPrompt = `You are a dermatologist and skin health expert who creates personalized skin care recommendations.
    Based on the user's skin logs, product usage, and profile data, create a personalized recommendation about ${recommendationType}.
    Format your response as a JSON object with the following sections: ${contentSections.map(section => `"${section.name}"`).join(', ')}.
    For each section, provide: title, content, and any relevant subsections.
    Use a friendly, expert tone, and make all content highly personalized to the user's specific skin condition and data.
    Be specific, action-oriented, and back recommendations with scientific evidence.`;
    
    // Create user prompt with relevant data
    const userPrompt = `Create a personalized recommendation about ${recommendationType} for this user.
    
    User Profile: ${JSON.stringify(userData)}
    Skin Logs: ${JSON.stringify(skinLogs)}
    ${products ? `Products: ${JSON.stringify(products)}` : ''}

    For each section, tailor the content to this specific user's needs and skin condition.
    Make the recommendation highly personalized by referencing specific data points from their logs.
    Format your response as a JSON object with separate sections that can be rendered in different UI components.`;

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
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error from OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const recommendation = JSON.parse(data.choices[0].message.content);
    
    // Add metadata to the recommendation
    const recommendationWithMetadata = {
      ...recommendation,
      metadata: {
        type: recommendationType,
        generatedAt: new Date().toISOString(),
        dataPoints: {
          skinLogsCount: skinLogs.length,
          productsCount: products?.length || 0,
        }
      }
    };

    return new Response(JSON.stringify(recommendationWithMetadata), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in generate-recommendation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
