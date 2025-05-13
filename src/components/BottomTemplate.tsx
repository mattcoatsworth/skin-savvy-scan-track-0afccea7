
import React from "react";
import DisclaimerCard from "@/components/DisclaimerCard";
import TestAIChatBox from "@/components/TestAIChatBox";
import { isTestAiMode } from "@/lib/utils";

interface BottomTemplateProps {
  pageTitle?: string;
  disclaimerText?: string;
}

const BottomTemplate: React.FC<BottomTemplateProps> = ({ 
  pageTitle,
  disclaimerText 
}) => {
  // Only show the template if we're in test AI mode
  if (!isTestAiMode()) {
    return null;
  }
  
  return (
    <div className="mt-6 mb-20">
      <DisclaimerCard 
        disclaimerText={disclaimerText}
      />
      <TestAIChatBox 
        productTitle={pageTitle}
      />
    </div>
  );
};

export default BottomTemplate;
