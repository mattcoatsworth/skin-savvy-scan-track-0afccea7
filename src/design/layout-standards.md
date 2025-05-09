
# Layout Standards

This document outlines the standardized layout patterns for the application.

## Product and Food Detail Pages

All product and food detail pages follow a consistent layout pattern derived from the `/recent-logs/retinol-cream` page. This standardized format includes:

### Structure
1. **Header** - Contains a back button and the product/food name
   - Back button: positioned left, 20px from edge
   - Title: text-2xl font-bold, centered vertically with back button
   - Padding: py-6 px-4

2. **Overview Section**
   - Main card with impact indicator (positive/neutral/negative)
     - Impact indicator: circle emoji (🟢/🟡/🔴) with 24px font size
     - Title: text-xl font-semibold
     - Description: text-muted-foreground
   - Basic information (category, brand, etc.)
     - Each info row: flex items-center with mb-4
     - Icon: 20px (h-5 w-5), text-muted-foreground
     - Label: text-base font-medium
   - Effect rating with visual progress indicator
     - Progress bar: h-3 with colored indicator based on rating
     - Rating label positioned right of progress bar
     - Rating text: text-base font-semibold
   - Summary description
     - Label: text-base font-medium mb-1
     - Content: text-sm
   - Recommendations based on impact
     - Card with p-6 padding
     - Title: text-xl font-semibold mb-3
     - List items: list-disc pl-4 space-y-2

3. **Detail Sections**
   - Benefits (for positive impact items)
     - CheckCircle2 icon in green (text-green-500)
     - flex items-start layout with mr-2 spacing
     - Each benefit listed with descriptive text
   - Concerns (for negative impact items)
     - XCircle icon in red (text-red-500)
     - flex items-start layout with mr-2 spacing
     - Each concern listed with descriptive text and potential impact
   - Application methods (where relevant)
     - Standard card with p-6 padding
     - Title: text-lg font-semibold mb-3
     - Step-by-step instructions with numbering
     - Optional tips or warnings in highlighted boxes
   - Timeline observations (where relevant)
     - Day number in circle: bg-slate-100 rounded-full h-7 w-7
     - Observation text: text-sm with text-gray-600 for description
     - Progressive observations showing changes over time

4. **Science Section**
   - Data analysis explanation
     - Title: text-lg font-semibold mb-3
     - Explanatory text: text-sm text-gray-600 mb-3
     - List items: list-disc pl-5 text-sm text-gray-600 space-y-1
     - Methodology description: how data was collected and analyzed
   - Related factors
     - Each factor: border-b border-gray-100 last:border-0 pb-3 last:pb-0
     - Impact indicator emoji: mr-2
     - Title: font-medium
     - Description: text-sm text-gray-600 ml-6
     - Correlation strength indicator where applicable
   - Scientific references (where available)
     - Reference title: font-medium text-blue-600
     - Publication details: text-sm text-gray-600
     - Link: text-sm text-blue-500 with ArrowRight icon (h-3 w-3 ml-1)
     - Brief summary of key findings from each reference

5. **Scoring Method Link** (footer)
   - Positioned at bottom with consistent styling
   - Card with subtle background and arrow icon
   - Text explaining that users can learn about the scoring methodology
   - Links to detailed page about calculation methods

### Suggested Actions & Chat Text Box

1. **Chat Input Component**
   - Positioned at the bottom of the content flow (not fixed)
   - Standard padding: paddingTop: 1.5rem, paddingBottom: 4rem
   - Background: bg-slate-50 with subtle shadow (shadow-sm)
   - Contains quick suggestion chips and input field
   - Max width of content matches page container (max-w-md)

### Visual Consistency
- Cards have consistent padding (`p-6`)
- Section headings use `text-xl font-semibold mb-4`
- Subsection headings use `text-lg font-semibold mb-3`
- Consistent spacing between sections (`mb-8`)
- Color-coded indicators for positive (green), neutral (yellow), and negative (red) impacts
- Progress bars: height of 12px (h-3)
- Info icons: 20px (h-5 w-5)

### Color Scheme
- Positive indicators: text-green-500, bg-green-500
- Neutral indicators: text-amber-500, bg-amber-500
- Negative indicators: text-red-500, bg-red-500
- Background: bg-slate-50
- Cards: bg-white
- Main text: text-slate-800
- Secondary text: text-muted-foreground or text-gray-600
- Border colors: border-gray-100

### Spacing Guide
- Page container: max-w-md mx-auto px-4 py-6
- Between sections: mb-8
- Between cards in a section: mt-4
- Card padding: p-6
- Between card elements: mb-4 (last item mb-0)
- List items spacing: space-y-2 or space-y-3
- Icon right margin: mr-2 or mr-3 (based on size)

### Implementation
This standard layout is implemented in:
- `src/pages/ProductDetail.tsx` - For skincare and makeup products
- `src/pages/RecentLogDetail.tsx` - For food and ingredient logs

Any future product or log detail pages should follow this same pattern for consistency. When creating new detail pages, reference these components and ensure all spacing, colors, and layout patterns match exactly.

### Benefits
- Creates a consistent user experience
- Simplifies understanding of data across different product types
- Makes navigation more intuitive
- Easier to maintain UI code

### Example Implementation

For a new product/food detail page:
1. Import standard components: Card, CardContent, Progress, BackButton, SuggestedActions, ChatInput
2. Create header with back button and title
3. Implement overview section with impact indicator, basic info, rating
4. Add appropriate detail sections based on product type
5. Include science section with data analysis
6. Add scoring method link at bottom
7. Include suggested actions section with relevant recommendations
8. Add chat input component at bottom of page for user interaction

Follow the exact spacing, typography, and color guidelines above to maintain visual consistency.
