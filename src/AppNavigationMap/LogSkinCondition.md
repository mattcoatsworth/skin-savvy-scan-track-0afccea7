
# Log Skin Condition Page

## Overview

The Log Skin Condition page allows users to record their daily skin status, including overall condition, specific concerns, and related factors that might affect skin health.

## Page Structure

The page is organized into several sections:

1. **Header**:
   - Back Button
   - Page Title ("Log Today's Skin")

2. **Overall Rating Section**:
   - Slider or buttons to rate overall skin condition (1-10 or Poor to Excellent)
   - Visual feedback on selection

3. **Concerns Section**:
   - Checkbox list of common skin concerns:
     - Acne/Breakouts
     - Dryness
     - Oiliness
     - Redness
     - Irritation
     - etc.

4. **Factors Section**:
   - Food consumed (with add button)
   - Products used (with add button)
   - Activities (with add button)
   - Environmental factors (with add button)

5. **Notes Section**:
   - Text area for additional observations

6. **Photo Section**:
   - Option to take or upload photos of skin condition
   - Thumbnail preview of added photos

7. **Submit Button**:
   - Save the log entry

## Navigation Paths

### Accessing the Page

This page can be accessed from multiple entry points:

1. **Action Button Menu**: Via "Log Today's Skin" option
2. **Skin Page**: Via empty "Today's Skin" card that appears when no entry exists for current day
3. **Home Page**: Via direct link or suggestion

### Navigation Elements

- **Back Button**: Returns to the originating page (Home, Skin, or Action Button menu)
- **Cancel Button** (optional): Discards entry and returns to previous page
- **Submit Button**: Saves the entry and navigates to one of:
  - Skin page (if originated from there)
  - Home page (if originated from Action Button or Home)

### Add Factor Flows

- **Add Food Item**:
  - Opens search/selection interface
  - Returns to form with selected item added

- **Add Product**:
  - Opens product search/selection interface or scanner
  - Returns to form with selected product added

- **Add Activity**:
  - Opens activity selection interface
  - Returns to form with selected activity added

- **Add Environmental Factor**:
  - Opens factor selection interface
  - Returns to form with selected factor added

## Form Validation

- Rating is required before submission
- Other fields are optional but encouraged
- Validation feedback appears inline when Submit is tapped

## Implementation Notes for Native iOS

- Implement form using `UITableView` with custom sections
- Rating control should be a custom component with visual feedback
- Concerns section should use standard checkboxes or custom toggle controls
- Factor addition should use a unified pattern across different factor types:
  - Search interface with recent/common items
  - Quick add for new items
  - Option to scan products (for product factors)
- Photo section should handle camera permissions appropriately
- Consider using image compression for uploaded photos
- Implement autosave feature to prevent data loss
- Form should adapt to keyboard appearance
- Submit button should show loading state during submission
- After successful submission, show confirmation feedback before navigation
