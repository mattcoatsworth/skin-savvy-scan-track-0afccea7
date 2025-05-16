
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

    // Call OpenAI API with the image and updated prompt
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
                text: `Analyze this selfie and provide a holistic energy interpretation based on visible skin zones and breakout locations. Format your response as a clean JSON object with these sections:

1. "traditionalChineseMedicine": Focus on organ associations and TCM insights related to visible skin areas
2. "chakraTheory": Explain chakra energy connections to the visible skin areas
3. "metaphysicalSymbolism": Describe metaphysical meanings of the visible skin conditions
4. "holisticRemedies": Suggest natural remedies, practices, or lifestyle changes
5. "suggestedFoods": Recommend specific foods that may support healing for affected organs or energy systems

This is for self-reflection and holistic insight only, not a medical diagnosis. Do not use markdown formatting like ### or *** in your response.`
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
        max_tokens: 800,
        response_format: { type: "json_object" }
      })
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error("OpenAI API error:", errorText);
      throw new Error(`OpenAI API error: ${openAIResponse.status} ${errorText}`);
    }

    const openAIData = await openAIResponse.json();
    console.log("Raw OpenAI response:", JSON.stringify(openAIData));
    
    let analysisContent;
    try {
      // Parse the content as JSON since we requested JSON format
      const content = openAIData.choices[0].message.content;
      
      // Check if the content is null or empty (AI might have refused to generate content)
      if (!content) {
        // If the message includes a refusal reason, use that
        const refusalReason = openAIData.choices[0].message.refusal || "The AI was unable to analyze this image.";
        console.log("AI refused to generate content:", refusalReason);
        throw new Error(`Analysis refused: ${refusalReason}`);
      }
      
      try {
        analysisContent = JSON.parse(content);
      } catch (parseError) {
        console.log("Failed to parse AI response as JSON, using text response instead");
        // If the content isn't valid JSON, create a fallback structure
        analysisContent = {
          traditionalChineseMedicine: content,
          chakraTheory: "No detailed chakra analysis available.",
          metaphysicalSymbolism: "No detailed metaphysical analysis available.",
          holisticRemedies: "No specific holistic remedies available.",
          suggestedFoods: "No specific food suggestions available."
        };
      }
      
      console.log("Parsed analysis content:", JSON.stringify(analysisContent));
    } catch (error) {
      console.error("Error parsing analysis content:", error);
      throw new Error("Failed to parse analysis content");
    }

    console.log("Received analysis from OpenAI");
    console.log("Sending analysis response");

    return new Response(
      JSON.stringify({ 
        analysis: analysisContent,
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
