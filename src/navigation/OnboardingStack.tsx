
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Onboarding pages
import Onboarding from "@/pages/Onboarding";
import FemaleOnboardingBirthdate from "@/pages/onboarding/FemaleOnboardingBirthdate";
import FemaleOnboardingPreviousApps from "@/pages/onboarding/FemaleOnboardingPreviousApps";
import FemaleOnboardingSkinType from "@/pages/onboarding/FemaleOnboardingSkinType";
import FemaleOnboardingSkinConcerns from "@/pages/onboarding/FemaleOnboardingSkinConcerns";
import FemaleOnboardingSkinGoals from "@/pages/onboarding/FemaleOnboardingSkinGoals";
import FemaleOnboardingMenstrualCycle from "@/pages/onboarding/FemaleOnboardingMenstrualCycle";
import FemaleOnboardingFoodAllergies from "@/pages/onboarding/FemaleOnboardingFoodAllergies";
import FemaleOnboardingProductAllergies from "@/pages/onboarding/FemaleOnboardingProductAllergies";
import FemaleOnboardingGoalTimeline from "@/pages/onboarding/FemaleOnboardingGoalTimeline";
import FemaleOnboardingCurrentRoutine from "@/pages/onboarding/FemaleOnboardingCurrentRoutine";
import FemaleOnboardingRoutineEffectiveness from "@/pages/onboarding/FemaleOnboardingRoutineEffectiveness";
import FemaleOnboardingFamilyHistory from "@/pages/onboarding/FemaleOnboardingFamilyHistory";

// Layout
import OnboardingLayout from '@/layouts/OnboardingLayout';

/**
 * Onboarding navigation stack
 * Similar to how you'd define a Stack in React Navigation
 */
export function OnboardingStack() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route element={<OnboardingLayout />}>
        <Route path="/female/birthdate" element={<FemaleOnboardingBirthdate />} />
        <Route path="/female/previous-apps" element={<FemaleOnboardingPreviousApps />} />
        <Route path="/female/skin-type" element={<FemaleOnboardingSkinType />} />
        <Route path="/female/skin-concerns" element={<FemaleOnboardingSkinConcerns />} />
        <Route path="/female/skin-goals" element={<FemaleOnboardingSkinGoals />} />
        <Route path="/female/menstrual-cycle" element={<FemaleOnboardingMenstrualCycle />} />
        <Route path="/female/food-allergies" element={<FemaleOnboardingFoodAllergies />} />
        <Route path="/female/product-allergies" element={<FemaleOnboardingProductAllergies />} />
        <Route path="/female/goal-timeline" element={<FemaleOnboardingGoalTimeline />} />
        <Route path="/female/current-routine" element={<FemaleOnboardingCurrentRoutine />} />
        <Route path="/female/routine-effectiveness" element={<FemaleOnboardingRoutineEffectiveness />} />
        <Route path="/female/family-history" element={<FemaleOnboardingFamilyHistory />} />
      </Route>
    </Routes>
  );
}

export default OnboardingStack;
