
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
    console.log("Image data length:", image.length);

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

    console.log("Sending request to OpenAI with image data and GPT-4o model");
    
    // Build additional context from skin logs if available
    let additionalContext = "";
    if (skinLogData) {
      const factors = skinLogData.daily_factors || {};
      
      additionalContext += "\n\nAdditional context about my skin health:";
      
      if (factors.sleep_hours) {
        additionalContext += ` Sleep: ${factors.sleep_hours} hours.`;
      }
      
      if (factors.water_intake_ml) {
        additionalContext += ` Water intake: ${factors.water_intake_ml}ml.`;
      }
      
      if (factors.stress_level !== undefined) {
        additionalContext += ` Stress level: ${factors.stress_level}/10.`;
      }
      
      if (factors.hormone_cycle_day !== undefined) {
        additionalContext += ` Currently on day ${factors.hormone_cycle_day} of hormonal cycle.`;
      }
      
      if (factors.temperature_celsius || factors.humidity_percent) {
        additionalContext += ` Environmental conditions: ${factors.temperature_celsius ? `${factors.temperature_celsius}°C, ` : ''}${factors.humidity_percent ? `${factors.humidity_percent}% humidity` : ''}.`;
      }
      
      if (skinLogData.overall_condition) {
        additionalContext += ` Overall skin condition reported as: ${skinLogData.overall_condition}.`;
      }
      
      if (skinLogData.acne_level !== undefined) {
        additionalContext += ` Acne level reported as: ${skinLogData.acne_level}/10.`;
      }
      
      if (skinLogData.notes) {
        additionalContext += ` Additional notes: ${skinLogData.notes}.`;
      }
    }

    // Process and format the image data 
    let formattedImage = image;
    // Check if the image is already a proper data URL
    if (!formattedImage.startsWith('data:image/')) {
      console.log("Image is not properly formatted as a data URL, fixing format");
      // Remove any existing data URL prefix if present
      const base64Data = formattedImage.replace(/^data:image\/[a-z]+;base64,/, '');
      // Add the proper data URL prefix
      formattedImage = `data:image/jpeg;base64,${base64Data}`;
    }

    console.log("Image properly formatted");
    
    // Call OpenAI API with the structured prompt
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
            role: "user",
            content: [
              { 
                type: "text", 
                text: "Here is an image. Can you interpret the symbolic and energetic meaning of the breakout patterns on the face using metaphysical frameworks like TCM, chakras, and emotion-body maps? This is not for diagnosis, just for holistic self-awareness." + additionalContext 
              },
              {
                type: "image_url",
                image_url: {
                  url: formattedImage,
                  detail: "high"
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
    console.log("OpenAI model used:", openAIData.model || "gpt-4o");
    console.log("Response received from OpenAI");
    
    const energyAnalysis = openAIData.choices[0].message.content;
    console.log("Analysis content snippet:", energyAnalysis.substring(0, 50) + "...");

    return new Response(
      JSON.stringify({ 
        analysis: energyAnalysis,
        includedSkinData: !!skinLogData,
        model: openAIData.model || "gpt-4o"
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
