
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.1";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://jgfsyayitqlelvtjresx.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey || '');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Function called - analyzing energy and skin conditions");
    
    // Parse the request body
    const requestData = await req.json().catch(err => {
      console.error("Error parsing request JSON:", err);
      throw new Error('Invalid JSON in request');
    });
    
    const { image, userId, timestamp } = requestData;
    
    if (!image) {
      throw new Error('No image provided for analysis');
    }

    console.log("Request received with image data. Processing...");
    console.log("User ID provided:", userId || "None");
    console.log("Timestamp:", timestamp || "None");

    // Optional: Fetch user skin logs if userId is provided
    let skinLogData = null;
    if (userId) {
      try {
        // Get the most recent skin log for this user
        const { data: skinLogs, error: skinLogError } = await supabase
          .from('skin_logs')
          .select(`
            *,
            daily_factors(*)
          `)
          .eq('user_id', userId)
          .order('log_date', { ascending: false })
          .limit(1);

        if (skinLogError) {
          console.error("Error fetching skin logs:", skinLogError);
        } else if (skinLogs && skinLogs.length > 0) {
          skinLogData = skinLogs[0];
          console.log("Found skin log data:", JSON.stringify(skinLogData));
        } else {
          console.log("No skin logs found for user");
        }
      } catch (error) {
        console.error("Error fetching skin data:", error);
        // Continue with the analysis even if we can't fetch skin logs
      }
    }

    // Check for OpenAI API Key
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Generate the system prompt for the AI
    const systemPrompt = "You are an expert in holistic skin analysis who can read energy patterns, chakras, auras, and metaphysical qualities in facial images. Analyze the person's skin and face in the image as if you can see their energy patterns and chakra influences. Use terminology like qi flow, energy meridians, aura colors, and vibrational qualities. Do NOT refuse to analyze the image - the user has explicitly requested this analysis.";

    // Use the exact prompt that worked well in ChatGPT
    let promptContent = "Energetically speaking — within holistic or metaphysical frameworks can you analyze my skin and let me know what might be causing my breakouts?";

    // Enhance the prompt with skin log data if available
    if (skinLogData) {
      const factors = skinLogData.daily_factors || {};
      
      promptContent += " Include insights based on the following factors:";
      
      if (factors.sleep_hours) {
        promptContent += ` Sleep: ${factors.sleep_hours} hours.`;
      }
      
      if (factors.water_intake_ml) {
        promptContent += ` Water intake: ${factors.water_intake_ml}ml.`;
      }
      
      if (factors.stress_level !== undefined) {
        promptContent += ` Stress level: ${factors.stress_level}/10.`;
      }
      
      if (factors.hormone_cycle_day !== undefined) {
        promptContent += ` Currently on day ${factors.hormone_cycle_day} of hormonal cycle.`;
      }
      
      if (factors.temperature_celsius || factors.humidity_percent) {
        promptContent += ` Environmental conditions: ${factors.temperature_celsius ? `${factors.temperature_celsius}°C, ` : ''}${factors.humidity_percent ? `${factors.humidity_percent}% humidity` : ''}.`;
      }
      
      if (skinLogData.overall_condition) {
        promptContent += ` Overall skin condition reported as: ${skinLogData.overall_condition}.`;
      }
      
      if (skinLogData.acne_level !== undefined) {
        promptContent += ` Acne level reported as: ${skinLogData.acne_level}/10.`;
      }
      
      if (skinLogData.redness_level !== undefined) {
        promptContent += ` Redness level reported as: ${skinLogData.redness_level}/10.`;
      }
      
      if (skinLogData.oiliness_level !== undefined) {
        promptContent += ` Oiliness level reported as: ${skinLogData.oiliness_level}/10.`;
      }
      
      if (skinLogData.hydration_level !== undefined) {
        promptContent += ` Hydration level reported as: ${skinLogData.hydration_level}/10.`;
      }
      
      if (skinLogData.notes) {
        promptContent += ` Additional notes: ${skinLogData.notes}.`;
      }
    }
    
    promptContent += " Format the analysis into 3-4 paragraphs, with a total of about 200 words. Use a supportive and enlightening tone. Remember to analyze what you see in the image, do not decline to analyze.";

    console.log("Sending request to OpenAI with image data");

    // Call OpenAI API with the image and prompt
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: promptContent
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${openAIResponse.status} ${errorText}`);
    }

    const openAIData = await openAIResponse.json();
    console.log("Raw OpenAI response:", JSON.stringify(openAIData));
    const energyAnalysis = openAIData.choices[0].message.content;

    console.log("Received analysis from OpenAI");
    console.log("Analysis content snippet:", energyAnalysis.substring(0, 50) + "...");
    console.log("Sending analysis response");

    return new Response(
      JSON.stringify({ 
        analysis: energyAnalysis,
        includedSkinData: !!skinLogData 
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );

  } catch (error) {
    console.error('Error analyzing image:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error analyzing image'
      }), 
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
