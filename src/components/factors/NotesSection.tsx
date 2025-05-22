
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import FactorCardSection from "./FactorCardSection";
import { ScrollText } from "lucide-react";

interface NotesSectionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ 
  value, 
  onChange, 
  placeholder = "Add any additional notes about your skin or factors that might have affected it today..."
}) => {
  return (
    <FactorCardSection 
      title="Notes" 
      icon={<ScrollText className="h-5 w-5" />}
      description="Add any additional observations"
    >
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] mt-2"
      />
    </FactorCardSection>
  );
};

export default NotesSection;
