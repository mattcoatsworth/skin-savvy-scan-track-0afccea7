
// Supabase Edge Function for Analyzing Energy
// Path: supabase/functions/analyze-energy/index.ts

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

    // Verify image format - should be base64 or a public https URL
    let imageUrl = image;
    if (!image.startsWith('data:image/') && !image.startsWith('https://')) {
      throw new Error('Invalid image format. Must be base64 data URI or public HTTPS URL');
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

        if (skinLogs && skinLogs.length > 0) {
          skinLogData = skinLogs[0];
        }
      } catch (error) {
        console.error("Error fetching skin data:", error);
        // Continue with the analysis even if we can't fetch skin logs
      }
    }

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
            content: "You are a holistic skin analysis expert who understands the energetic, metaphysical, and traditional medicine connections between skin conditions and overall wellbeing. Structure your responses clearly with distinct labeled sections for Traditional Chinese Medicine (TCM), Chakra Theory, Holistic Approaches, and Overall Insights. Avoid using markdown formatting like #, ##, or * characters. Your tone should be compassionate, insightful and empowering. Always end with a follow-up question asking if they would like a 7-day ritual healing plan."
          },
          {
            role: "user",
            content: [
              { 
                type: "text", 
                text: "Using Traditional Chinese Medicine, chakra theory, and metaphysical symbolism, provide an energetic interpretation of the skin zones and breakout locations visible in this image. Focus on both TCM organ associations and chakra energy connections. Format your response with clearly labeled sections for Traditional Chinese Medicine (TCM), Chakra Theory, Holistic Approaches, and Overall Insights. Include emojis for key sections, include metaphysical interpretations, and suggest holistic healing approaches. This is for self-reflection and holistic insight only, not a medical diagnosis. End with asking if I'd like a 7-day ritual plan that blends metaphysical healing with gentle physical practices."
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
        max_tokens: 1500
      })
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      throw new Error(`OpenAI API error: ${openAIResponse.status} ${errorText}`);
    }

    const openAIData = await openAIResponse.json();
    
    // Get the content from the OpenAI response
    const content = openAIData.choices[0].message.content;
    
    // Check if the content is null or empty (AI might have refused to generate content)
    if (!content) {
      throw new Error("The AI was unable to analyze this image.");
    }
    
    // Extract sections from the content
    const tcmSection = extractSection(content, "Traditional Chinese Medicine");
    const chakraSection = extractSection(content, "Chakra Theory");
    const holisticSection = extractSection(content, "Holistic Approaches");
    const insightsSection = extractSection(content, "Overall Insights");
    
    // Find the follow-up question about the 7-day ritual plan
    const followUpQuestion = extractFollowUpQuestion(content);
    
    // Create analysis content object with structured sections
    const analysisContent = {
      fullAnalysis: content,
      traditionalChineseMedicine: tcmSection || "No TCM analysis available.",
      chakraTheory: chakraSection || "No chakra analysis available.",
      holisticApproaches: holisticSection || "No holistic approaches available.",
      energeticInsights: insightsSection || "No overall insights available.",
      followUpQuestion: followUpQuestion || "Would you like a personalized 7-day ritual plan that blends metaphysical healing with gentle physical practices? 🌼✨"
    };

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

// Helper function to extract a specific section from the content
function extractSection(content: string, sectionName: string): string | null {
  // Look for the section with multiple possible header formats
  const regex = new RegExp(`(?:${sectionName}|${sectionName.toUpperCase()}|${sectionName.toLowerCase()})(?:\\s*\\(.*?\\))?[:\\s]+(.*?)(?=(?:Traditional Chinese Medicine|TCM|CHAKRA|Chakra Theory|HOLISTIC|Holistic Approaches|OVERALL|Overall Insights|Would you like)|$)`, 'is');
  
  const match = content.match(regex);
  if (match && match[1]) {
    return cleanFormatting(match[1].trim());
  }
  
  return null;
}

// Helper function to extract the follow-up question
function extractFollowUpQuestion(content: string): string | null {
  const regex = /Would you like .*?(?:\?|$)/i;
  const match = content.match(regex);
  
  if (match) {
    return cleanFormatting(match[0].trim());
  }
  
  return null;
}

// Helper function to clean formatting from text
function cleanFormatting(text: string): string {
  // Replace markdown headings with plain text
  let cleaned = text.replace(/#+\s+/g, '');
  
  // Replace markdown bold with plain text
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Replace markdown italic with plain text
  cleaned = cleaned.replace(/\*(.*?)\*/g, '$1');
  
  // Preserve emojis but remove excessive whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  // Fix double line breaks
  cleaned = cleaned.replace(/\n\n+/g, '\n\n');
  
  return cleaned.trim();
}
