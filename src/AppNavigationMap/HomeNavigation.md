
# Home Navigation

## Overview

The Home page serves as the primary dashboard for users, providing an overview of their skin health, recent activities, and personalized recommendations. It's designed to give users quick access to key features of the app.

## Page Structure

The Home page is organized as a vertical scroll with multiple card components:

1. **Weekly Skin Report Card** (Top)
2. **Scan Button**
3. **Daily Skin Snapshot**
4. **Meal Plan Card**
5. **Skin Energy Card**
6. **Recent Scans Carousel**
7. **Insights & Trends Section**
8. **Suggested Actions Section**
9. **Explore Section**

## Navigation Paths

### Weekly Skin Report Card
- **Tap**: Navigates to `/skin?tab=weekly` (Weekly Skin Analysis page with weekly tab selected)
- **View Report Link**: Navigates to `/skin?tab=weekly`

### Scan Button
- **Tap**: Opens scanning interface (camera) for product scanning

### Daily Skin Snapshot
- **Recommendations Item Tap**: Navigates to specific recommendation detail page (`/recommendations-detail/[id]`)

### Meal Plan Card
- **View Full Plan Button**: Navigates to `/fyp` with "Meal Plan" tab selected

### Skin Energy Card
- **View Details Button**: Navigates to `/fyp` with "Skin Energy" tab selected

### Recent Scans Carousel
- **Individual Scan Card**: Navigates to specific log detail page (`/recent-logs/[id]`)
- **View All Link**: Navigates to `/recent-logs` (all logs page)

### Insights & Trends
- **Individual Insight Card**: Navigates to specific insight detail page (`/insights-trends/[id]`)
- **View All Link**: Navigates to `/insights-trends` (all insights page)

### Suggested Actions
- **Individual Action Card**: Navigates to appropriate page based on action type:
  - Log actions: `/day-log/[id]` or `/log-skin-condition`
  - Product recommendations: `/product/[type]/[id]`
  - General actions: `/suggested-actions/[id]`

### Explore Section
- **Individual Explore Card**: Navigates to specific explore page (`/explore/[id]`)

## Back Navigation

- When navigating from Home to any detail page, the back button on the detail page should return to Home

## Implementation Notes for Native iOS

- Implement using `UITableView` or `UICollectionView` with custom cells for each section
- Use proper cell reuse for performance optimization
- Implement horizontal carousels (Recent Scans, Insights) using nested `UICollectionView` with horizontal scroll
- Weekly Skin Report section should use a custom component with circular progress indicators
- Back navigation should be handled through the navigation controller's back stack
- Consider using prefetching APIs to improve scrolling performance
- Implement pull-to-refresh to update dashboard data
- Cache data locally for offline viewing
