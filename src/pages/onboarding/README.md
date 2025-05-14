
# Onboarding Flow Structure

This directory contains all the onboarding flow screens organized by gender:

## Female Onboarding Flow
- Gender selection (shared) -> `/onboarding`
- Birthdate selection -> `/onboarding/female/birthdate`
- Previous skincare app experience -> `/onboarding/female/previous-apps`
- Skin type selection -> `/onboarding/female/skin-type`
- Skin concerns -> `/onboarding/female/skin-concerns`
- Skin goals -> `/onboarding/female/skin-goals`
- Menstrual cycle information -> `/onboarding/female/menstrual-cycle`
- Food allergies -> `/onboarding/female/food-allergies`
- Product allergies -> `/onboarding/female/product-allergies`
- Goal timeline -> `/onboarding/female/goal-timeline`
- Current routine -> `/onboarding/female/current-routine`
- Routine effectiveness -> `/onboarding/female/routine-effectiveness`
- Family history -> `/onboarding/female/family-history`

## Male Onboarding Flow
- Gender selection (shared) -> `/onboarding`
- (Male-specific screens to be added)

## AI Integration in Onboarding

The onboarding data collected serves as the foundation for the AI-powered personalization throughout the app:

1. **Data Collection**: All onboarding information is stored in the user's profile and used as the baseline for the OpenAI recommendation engine.

2. **Initial Recommendation Generation**: After onboarding is complete, the OpenAI API uses the collected data to create an initial set of personalized recommendations that appear in:
   - Home page "For You" section
   - Skin Analysis page
   - Daily Analysis section

3. **Continuous Refinement**: As the user adds daily logs and product scans, the AI recommendations are continuously refined based on the combination of:
   - Original onboarding data
   - Daily skin condition logs
   - Product usage patterns
   - Other factors logged (diet, sleep, etc.)

4. **Personalization Pipeline**: The data flow follows this pattern:
   - Onboarding data sets baseline profile
   - Daily logs provide ongoing data
   - OpenAI processes combination of all data
   - Personalized recommendations appear across the app
   - Recommendation details are generated on-demand when cards are clicked

The onboarding flow is designed to collect user information for personalized skin care recommendations while establishing a strong foundation for the AI recommendation system.
