
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

    const { messages, model = "gpt-4o-mini", adviceType = "general" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }
    
    // Add system message based on advice type
    let systemMessage = "You are a helpful skincare assistant that provides personalized advice. ";
    
    // Core skincare guidance principle - this is applied to all advice types
    const corePrinciple = "Always approach every question through the lens of helping users achieve clear, healthy facial skin. Base your advice on scientific evidence and dermatological best practices. Be empathetic but prioritize skin health above all else.";
    
    // Customize system message based on advice type
    switch (adviceType) {
      case "product":
        systemMessage += "You analyze skincare products and provide insights on their ingredients, potential benefits, and whether they're suitable for different skin types. " + corePrinciple;
        break;
      case "recommendation":
        systemMessage += "You provide personalized product and routine recommendations based on skin concerns, type, and history. " + corePrinciple;
        break;
      case "action":
        systemMessage += "You suggest specific actions users can take to improve their skin health, like lifestyle changes, dietary adjustments, or routine modifications. " + corePrinciple;
        break;
      default:
        systemMessage += corePrinciple;
    }

    // Prepend system message to the messages array
    const messagesWithSystem = [
      { role: "system", content: systemMessage },
      ...messages
    ];

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
        max_tokens: 500,
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
