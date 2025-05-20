
# Skin Page Navigation

## Overview

The Skin page is dedicated to tracking and analyzing the user's skin condition over time. It provides daily, weekly, and monthly views of skin health data, allows logging of new entries, and displays detailed analytics.

## Page Structure

The Skin page is organized with:

1. **Header with Title and Navigation Options**
2. **Tab Navigation**:
   - Daily View Tab
   - Weekly View Tab
   - Monthly View Tab
3. **Content Area** (changes based on selected tab)

## Important Note

**Today's Skin Card**: When a new day begins, the Today's Skin card should be blank with a "Log Today's Skin" prompt. Clicking this card should navigate to `/log-skin-condition`.

## Tab Details

### Daily View Tab

1. **Calendar/Date Selector**:
   - Shows current month with dates
   - Highlights dates with skin entries
   - Selected date shows detailed view below

2. **Today's Skin Card** (or selected day):
   - If not logged: Shows "Log Today's Skin" button
   - If logged: Shows skin score and summary
   - Tapping navigates to detailed view or logging page

3. **Daily Factors List**:
   - Food items consumed
   - Products used
   - Environmental factors
   - Activities logged

### Weekly View Tab

1. **Week Selector**:
   - Previous/Next week navigation
   - Shows date range

2. **Weekly Overview Chart**:
   - 7-day skin score visualization
   - Trend indicators

3. **Weekly Insights**:
   - Correlations between factors and skin condition
   - Key observations

### Monthly View Tab

1. **Month Selector**:
   - Previous/Next month navigation

2. **Monthly Calendar View**:
   - Color-coded days based on skin score
   - Tap day to see summary

3. **Monthly Trends**:
   - Average scores
   - Identified patterns
   - Most impactful factors

## Navigation Paths

### Tab Navigation
- **Tab Selection**: Changes view without page navigation

### Daily View Navigation
- **Today's Skin Card** (not logged): Navigates to `/log-skin-condition`
- **Today's Skin Card** (logged): Navigates to `/day-log/[date]`
- **Calendar Date Selection**: Updates displayed data without page navigation
- **Factor Item Tap**: Navigates to factor detail (`/product/[type]/[id]` or appropriate page)

### Weekly View Navigation
- **Day in Chart**: Navigates to daily view for that day
- **Insight Item**: Navigates to insight detail (`/weekly-insight/[id]`)
- **Week Selection**: Updates displayed data without page navigation

### Monthly View Navigation
- **Calendar Day Tap**: Updates daily summary without page navigation
- **Monthly Trend Item**: Navigates to detailed analysis (`/monthly-analysis/[id]`)
- **Month Selection**: Updates displayed data without page navigation

### Global Actions
- **Log New Entry Button**: Navigates to `/log-skin-condition`

## Back Navigation
- **Back Button**: Returns to Home page

## Implementation Notes for Native iOS

- Implement tabs using `UISegmentedControl` or custom tab interface
- Today's Skin Card logic requires checking the current date against the most recent log
- Use `FSCalendar` or similar library for calendar implementations
- Charts should be implemented using `Charts` library or similar
- Weekly view should use a custom horizontal bar chart component
- Consider cache mechanism for offline viewing of historical data
- Implement smooth transitions between different date ranges
- Use color coding consistently to indicate skin health levels:
  - Green for good scores (70-100)
  - Yellow for moderate scores (40-69)
  - Red for poor scores (0-39)
