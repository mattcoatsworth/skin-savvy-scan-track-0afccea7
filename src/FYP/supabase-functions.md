
# FYP Page Supabase Edge Functions

## analyze-energy Function

This function processes user selfies and provides holistic energy analysis using OpenAI's GPT-4o model.

### Endpoint
`/functions/v1/analyze-energy`

### Request Format
```json
{
  "image": "base64_encoded_image_string",
  "userId": "optional_user_id",
  "timestamp": 1621234567890,
  "requestId": "unique_request_id"
}
```

### Response Format
```json
{
  "analysis": {
    "fullAnalysis": "Complete holistic analysis text",
    "traditionalChineseMedicine": "TCM-specific insights",
    "chakraTheory": "Chakra-related insights",
    "metaphysicalSymbolism": "Metaphysical interpretations",
    "holisticRemedies": "Suggested remedies",
    "suggestedFoods": "Recommended foods"
  },
  "includedSkinData": true
}
```

### OpenAI Prompt used for Energy Analysis
The function uses the following system prompt for OpenAI:

```
You are a holistic skin analysis expert who understands the energetic, metaphysical, and traditional medicine connections between skin conditions and overall wellbeing. You provide detailed, insightful analyses that help people understand the deeper meaning behind their skin conditions. You should focus on Traditional Chinese Medicine (TCM), chakra theory, emotional connections, and holistic remedies. Your tone should be compassionate, insightful and empowering. Always end with a follow-up question asking if they would like a 7-day ritual healing plan.
```

And the user prompt:

```
Using Traditional Chinese Medicine, chakra theory, and metaphysical symbolism, provide an energetic interpretation of the skin zones and breakout locations visible in this image. Focus on both TCM organ associations and chakra energy connections. Format your response with emojis for key sections, include metaphysical interpretations, and suggest holistic healing approaches. This is for self-reflection and holistic insight only, not a medical diagnosis. End with asking if I'd like a 7-day ritual plan that blends metaphysical healing with gentle physical practices.
```

## generate-meal-plan Function

This function generates personalized meal plans for skin health based on user preferences and avoidances.

### Endpoint
`/functions/v1/generate-meal-plan`

### Request Format
```json
{
  "userId": "optional_user_id",
  "preferences": ["avocado", "salmon", "berries"],
  "avoidances": ["dairy", "gluten"],
  "skinConcerns": ["acne", "dryness"]
}
```

### Response Format
```json
{
  "mealPlan": {
    "breakfast": "Breakfast description",
    "lunch": "Lunch description",
    "dinner": "Dinner description",
    "snacks": ["Snack 1", "Snack 2"],
    "hydration": "Hydration recommendation"
  }
}
```

### OpenAI Prompt used for Meal Plan Generation
The function uses the following system prompt for OpenAI:

```
You are a nutritionist specializing in creating meal plans that improve skin health. Focus on anti-inflammatory foods, antioxidants, healthy fats, and adequate hydration. Consider user preferences and avoidances, and suggest specific meals that target their skin concerns. Be specific and practical with your recommendations.
```

## generate-grocery-list Function

This function creates a shopping list based on the meal plan.

### Endpoint
`/functions/v1/generate-grocery-list`

### Request Format
```json
{
  "mealPlan": {
    "breakfast": "Breakfast description",
    "lunch": "Lunch description",
    "dinner": "Dinner description",
    "snacks": ["Snack 1", "Snack 2"],
    "hydration": "Hydration recommendation"
  }
}
```

### Response Format
```json
{
  "groceryList": {
    "produce": ["Item 1", "Item 2"],
    "proteins": ["Item 1", "Item 2"],
    "dairy": ["Item 1", "Item 2"],
    "pantry": ["Item 1", "Item 2"],
    "other": ["Item 1", "Item 2"]
  }
}
```

## Error Handling

All functions implement the following error handling:

1. CORS handling for preflight requests
2. Input validation with appropriate error messages
3. API key validation
4. Request size limits and validation
5. Proper error codes and descriptive error messages

Example error response:
```json
{
  "error": "Error message describing the issue"
}
```

## Security Measures

1. API keys stored in environment variables
2. Input sanitization to prevent injection attacks
3. User authentication validation for user-specific data
4. Rate limiting on sensitive endpoints
5. Content validation for uploads
