
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
    const { type, id, recommendationText, userData } = await req.json();
    
    if (!recommendationText) {
      throw new Error('Recommendation text is required');
    }
    
    // Build a context-aware prompt based on the recommendation type
    let systemPrompt = `You are a skin health expert creating detailed personalized recommendations. 
Your task is to create a comprehensive analysis for the recommendation: "${recommendationText}".`;

    // Add type-specific context
    if (type.includes('diet') || type.includes('food') || id.includes('dairy')) {
      systemPrompt += `\nFocus on nutritional impact on skin health, potential triggers, and dietary alternatives.`;
    } else if (type.includes('lifestyle') || id.includes('meditation')) {
      systemPrompt += `\nFocus on stress reduction, sleep quality, and lifestyle changes that impact skin health.`;
    } else if (type.includes('product') || id.includes('cleanser') || id.includes('serum')) {
      systemPrompt += `\nFocus on product ingredients, benefits, application methods, and potential skin interactions.`;
    }

    // User data context
    if (userData) {
      systemPrompt += `\nConsider the following user data in your recommendation: ${JSON.stringify(userData)}`;
    }

    // User prompt template
    const userPrompt = `Create a detailed recommendation for "${recommendationText}".
    
Format your response as a structured JSON object with the following fields:
{
  "title": "A clear, concise title for this recommendation (3-5 words)",
  "overview": "A 2-3 sentence overview explaining why this recommendation matters for skin health",
  "details": "Detailed information about the recommendation including scientific basis, benefits, and how it affects skin (3-4 paragraphs)",
  "recommendations": ["Specific actionable step 1", "Specific actionable step 2", "Specific actionable step 3", ...],
  "disclaimer": "A brief medical disclaimer appropriate for this recommendation"
}`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',  // Using a balanced model for cost/quality
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,  // Moderate creativity
        max_tokens: 1500,  // Reasonable length for detailed content
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    // Parse the JSON response from the completion
    let content;
    try {
      // The AI might return the JSON as a code block or plain text, so we need to extract it
      const rawContent = data.choices[0].message.content;
      const jsonMatch = rawContent.match(/```json\n([\s\S]*)\n```/) || 
                        rawContent.match(/```\n([\s\S]*)\n```/) ||
                        rawContent.match(/{[\s\S]*}/);
                        
      const jsonString = jsonMatch ? jsonMatch[0] : rawContent;
      content = JSON.parse(jsonString.replace(/```json|```/g, '').trim());
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      content = {
        title: recommendationText,
        overview: "We couldn't generate a personalized recommendation at this time.",
        details: "Please try again later or contact support if this issue persists.",
        recommendations: ["Try refreshing the page", "Check back later"],
        disclaimer: "This is an automated recommendation system. Always consult with healthcare professionals."
      };
    }

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recommendation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
