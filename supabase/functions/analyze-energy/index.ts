
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
    
    const { image, userId } = requestData;
    
    if (!image) {
      throw new Error('No image provided for analysis');
    }

    console.log("Request received with image data. Processing...");
    console.log("User ID provided:", userId || "None");

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

    // For development purposes, we'll generate a holistic analysis based on the image and skin data
    // In production, you would call OpenAI's API here with the image and skin log data
    let energyAnalysis = generateHolisticAnalysis(skinLogData);

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

// Function to generate a holistic analysis based on the image and skin log data
function generateHolisticAnalysis(skinLogData: any): string {
  // Base energy analysis
  let baseAnalysis = "Energetically speaking, your skin is reflecting a balanced flow of vital energy in most areas. There's a subtle glow emanating from your skin that suggests good qi circulation. The areas around your cheeks show signs of heart chakra activation, while your forehead indicates strong third-eye energy. Your skin's natural luminosity points to a well-balanced root chakra providing grounding energy to your entire system.";
  
  // If we don't have skin log data, return the basic analysis
  if (!skinLogData) {
    return baseAnalysis + "\n\nFor a more personalized analysis, continue logging your skin conditions regularly.";
  }

  const factors = skinLogData.daily_factors || {};
  let additionalAnalysis = "\n\n";
  
  // Add insights based on sleep
  if (factors.sleep_hours) {
    if (factors.sleep_hours < 7) {
      additionalAnalysis += `Your recent sleep patterns (${factors.sleep_hours} hours) may be contributing to slight energy stagnation in your skin. Your body's natural restoration cycles need more time to complete, which affects your skin's vital force. Consider extending your rest period to revitalize your natural glow.\n\n`;
    } else {
      additionalAnalysis += `Your healthy sleep patterns (${factors.sleep_hours} hours) are supporting your skin's natural energy renewal process, allowing for proper chi circulation throughout your facial meridians.\n\n`;
    }
  }
  
  // Add insights based on water intake
  if (factors.water_intake_ml) {
    if (factors.water_intake_ml < 2000) {
      additionalAnalysis += `Your hydration level could be affecting your skin's ability to channel and transmit energy. Consider increasing your water intake to enhance the flow of healing energies through your system.\n\n`;
    } else {
      additionalAnalysis += `Your excellent hydration habits are supporting your skin's energy field, creating a protective moisture barrier that helps retain your natural auric vibration.\n\n`;
    }
  }
  
  // Add insights based on stress
  if (factors.stress_level !== undefined) {
    if (factors.stress_level > 7) {
      additionalAnalysis += `The high stress levels recorded in your log are visible in your skin's energy field, particularly around the jaw and forehead. These areas show energy blockages that may benefit from mindfulness practices to restore balance.\n\n`;
    } else if (factors.stress_level > 4) {
      additionalAnalysis += `Your moderate stress levels are showing as slight energy disruptions in your skin's natural flow. Some gentle facial massage may help redistribute this energy more harmoniously.\n\n`;
    } else {
      additionalAnalysis += `Your low stress levels are reflected in the even distribution of energy across your skin, particularly in the smooth flow visible across your cheeks and forehead.\n\n`;
    }
  }
  
  // Add insights based on hormone cycle if available
  if (factors.hormone_cycle_day !== undefined) {
    additionalAnalysis += `Your current position in your hormonal cycle (day ${factors.hormone_cycle_day}) is influencing your skin's energetic pattern, particularly in how it processes and distributes vital nutrients.\n\n`;
  }
  
  // Add insights on environmental factors
  if (factors.temperature_celsius || factors.humidity_percent) {
    additionalAnalysis += `The environmental conditions you've been exposed to (${factors.temperature_celsius ? `${factors.temperature_celsius}°C, ` : ''}${factors.humidity_percent ? `${factors.humidity_percent}% humidity` : ''}) are interacting with your skin's energy field in subtle ways that affect its ability to breathe and process external influences.\n\n`;
  }
  
  // Return combined analysis
  return baseAnalysis + additionalAnalysis + "Continue your journey of self-awareness through regular skin logging to receive increasingly personalized energy insights.";
}
