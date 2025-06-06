
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

    const { messages, model = "gpt-4o-mini", adviceType = "general", structuredOutput = false } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }
    
    // Add system message based on advice type
    let systemMessage = "You are a helpful skincare assistant that provides personalized advice. ";
    
    // Core skincare guidance principle - this is applied to all advice types
    const corePrinciple = "Always approach every question through the lens of helping users achieve clear, healthy facial skin. Base your advice on scientific evidence and dermatological best practices. Be empathetic but prioritize skin health above all else.";
    
    // Formatting guidance - applied to all types
    const formattingGuidance = "Format your response with clear structure: use headings with colons (like 'Key Benefits:'), use bullet points for lists, use numbered steps for instructions, keep paragraphs short (2-3 sentences), and organize information in logical sections.";
    
    // Customize system message based on advice type
    switch (adviceType) {
      case "product":
        systemMessage += "You analyze skincare products and provide insights on their ingredients, potential benefits, and whether they're suitable for different skin types. " + corePrinciple + " " + formattingGuidance;
        
        // Add product-specific formatting
        systemMessage += " When analyzing products, structure your response with these sections: 'Key Ingredients:', 'Potential Benefits:', 'Best For:', 'Use With Caution If:', and 'Usage Instructions:'.";
        break;
      case "recommendation":
        systemMessage += "You provide personalized product and routine recommendations based on skin concerns, type, and history. " + corePrinciple + " " + formattingGuidance;
        
        // Add recommendation-specific formatting
        systemMessage += " Structure your recommendations with: 'Current Skin Status:', 'Recommended Solutions:', 'Usage Instructions:', 'Expected Results:', and 'Alternative Options:'.";
        
        // Add supplement disclaimers for recommendation types
        if (messages.some(m => m.content && m.content.includes("supplement"))) {
          systemMessage += " When discussing supplements: Always include disclaimers that this is not medical advice. Never make direct dosage recommendations; instead reference commonly reported dosage ranges from scientific literature. Always advise consulting healthcare providers before starting any supplement. Clarify that individual responses to supplements vary significantly.";
        }
        break;
      case "supplement":
        systemMessage += "You provide information about dietary supplements related to skin health. Always include proper medical disclaimers. Never make direct dosage recommendations; instead reference commonly reported dosage ranges from scientific literature. Always emphasize consulting healthcare providers. Discuss evidence levels objectively. Mention potential side effects and interactions. Clarify that individual responses may vary. " + corePrinciple + " " + formattingGuidance;
        
        // Add supplement-specific formatting
        systemMessage += " Structure your response with: 'Overview:', 'Evidence Level:', 'Common Usage:', 'Potential Benefits:', 'Possible Side Effects:', and 'Important Considerations:'.";
        break;
      case "action":
        systemMessage += "You suggest specific actions users can take to improve their skin health, like lifestyle changes, dietary adjustments, or routine modifications. " + corePrinciple + " " + formattingGuidance;
        
        // Add action-specific formatting
        systemMessage += " Structure your suggestions with: 'Recommended Actions:', 'Implementation Steps:', 'Expected Benefits:', 'Timeframe:', and 'Progress Tracking:'.";
        break;
      case "weekly-insight":
        systemMessage += "You analyze weekly skin trends and provide personalized insights on patterns, correlations, and recommendations for improvement. " + corePrinciple;
        
        // Add formatting guidance for weekly insights with STRONG anti-duplication instructions
        if (!structuredOutput) {
          systemMessage += " Format your response with clear headers for each section, use bullet points for lists, and keep paragraphs concise (3-4 sentences max). Structure your analysis with these sections: 'Key Patterns:', 'Correlations:', 'Progress Metrics:', 'Recommendations:', and 'Focus Areas:'.";
          
          // STRONGER instruction to avoid duplicating the header in the content
          systemMessage += " CRITICALLY IMPORTANT: NEVER repeat the section name in the content of that section. For example, in the 'Key Patterns' section, DO NOT start with 'Key Patterns:' or 'Patterns:' - instead start directly with your analysis. DO NOT DUPLICATE CONTENT between sections. Each piece of information should appear EXACTLY ONCE in your response.";
          
          // Add rating instructions for weekly insights
          systemMessage += " For each section and insight, assign a quantitative rating between 0-100 that represents the health/improvement status or importance of that element. Present this information in a way that can be parsed into a numeric rating for display. For example, 'Hydration efforts have shown excellent results (Rating: 85)'.";
          
          // EXPLICITLY disallow Brief Summary section
          systemMessage += " DO NOT include a 'Brief Summary' or 'Weekly Summary' section in your response. Only use the specified sections above.";
        }
        break;
      default:
        systemMessage += corePrinciple + " " + formattingGuidance;
        systemMessage += " For skin analysis, divide your response into distinct sections with clear headings like: 'Key Benefits/Observations:', 'Contributing Factors:', 'Recommended Actions:', and 'Expected Timeline:'. For each bullet point or numbered step, provide specific, actionable advice that could reasonably be a separate recommendation.";
        
        // EXPLICITLY disallow Brief Summary section
        systemMessage += " DO NOT include a 'Brief Summary' section in your response.";
        
        // STRONGER instruction to avoid duplicating headers in all cases
        systemMessage += " CRITICALLY IMPORTANT: NEVER repeat the section name in the content of that section. For example, in a section, DO NOT start with the section name again - instead start directly with your analysis. DO NOT DUPLICATE CONTENT between sections. Each piece of information should appear EXACTLY ONCE in your response.";
        
        // Add rating instructions for general responses
        systemMessage += " Where appropriate, assign a quantitative rating between 0-100 that represents the health/improvement status or importance of key elements in your response.";
    }

    // For structured output, add response format instructions if requested
    const responseConfig = structuredOutput ? {
      response_format: { type: "json_object" }
    } : {};

    // Prepend system message to the messages array or use the one provided
    const messagesWithSystem = messages[0]?.role === "system" ? 
      messages : 
      [{ role: "system", content: systemMessage }, ...messages];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messagesWithSystem,
        temperature: 0.7,
        max_tokens: 1500,
        ...responseConfig
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error from OpenAI: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({
      content: data.choices[0].message.content
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while processing your request'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
