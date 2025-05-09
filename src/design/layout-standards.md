
# Layout Standards

This document outlines the standardized layout patterns for the application.

## Product and Food Detail Pages

All product and food detail pages follow a consistent layout pattern derived from the `/recent-logs/retinol-cream` page. This standardized format includes:

### Structure
1. **Header** - Contains a back button and the product/food name
2. **Overview Section**
   - Main card with impact indicator (positive/neutral/negative)
   - Basic information (category, brand, etc.)
   - Effect rating with visual progress indicator
   - Summary description
   - Recommendations based on impact

3. **Detail Sections**
   - Benefits (for positive impact items)
   - Concerns (for negative impact items)
   - Application methods (where relevant)
   - Timeline observations (where relevant)

4. **Science Section**
   - Data analysis explanation
   - Related factors
   - Scientific references (where available)

5. **Scoring Method Link** (footer)

### Visual Consistency
- Cards have consistent padding (`p-6`)
- Section headings use `text-xl font-semibold mb-4`
- Subsection headings use `text-lg font-semibold mb-3`
- Consistent spacing between sections (`mb-8`)
- Color-coded indicators for positive (green), neutral (yellow), and negative (red) impacts

### Implementation
This standard layout is implemented in:
- `src/pages/ProductDetail.tsx` - For skincare and makeup products
- `src/pages/RecentLogDetail.tsx` - For food and ingredient logs

Any future product or log detail pages should follow this same pattern for consistency.

### Benefits
- Creates a consistent user experience
- Simplifies understanding of data across different product types
- Makes navigation more intuitive
- Easier to maintain UI code
