
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

    // Verify image format - should be base64 or a public https URL
    let imageUrl = image;
    if (!image.startsWith('data:image/') && !image.startsWith('https://')) {
      console.error("Invalid image format. Must be base64 or public HTTPS URL");
      throw new Error('Invalid image format. Must be base64 data URI or public HTTPS URL');
    }

    // Optional: Check image size if possible (client-side validation is better)
    // For base64, we can roughly estimate size
    if (image.startsWith('data:image/')) {
      const base64Size = Math.ceil((image.length - image.indexOf(',') - 1) * 3 / 4);
      const sizeMB = base64Size / (1024 * 1024);
      if (sizeMB > 20) {
        console.error("Image too large:", sizeMB.toFixed(2), "MB");
        throw new Error('Image exceeds 20MB size limit');
      }
      console.log("Estimated image size:", sizeMB.toFixed(2), "MB");
    }

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

    console.log("Sending request to OpenAI with image data");

    // Call OpenAI API with the image and prompt - using improved prompt as suggested
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
                text: "Using Traditional Chinese Medicine, chakra theory, and metaphysical symbolism, provide an energetic interpretation of the skin zones and breakout locations visible in this image. This is for self-reflection and holistic insight only, not a medical diagnosis." 
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
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
