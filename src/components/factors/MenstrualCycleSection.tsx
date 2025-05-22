
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import FactorCardSection from "./FactorCardSection";

interface MenstrualCycleSectionProps {
  cyclePhase: string;
  onCyclePhaseChange: (phase: string) => void;
  periodStartDate: Date | undefined;
  onPeriodStartDateChange: (date: Date | undefined) => void;
}

const cyclePhases = [
  "Menstrual", "Follicular", "Ovulation", "Luteal", "Not Tracking"
];

const MenstrualCycleSection: React.FC<MenstrualCycleSectionProps> = ({ 
  cyclePhase, 
  onCyclePhaseChange,
  periodStartDate,
  onPeriodStartDateChange
}) => {
  const [isTracking, setIsTracking] = useState(cyclePhase !== "Not Tracking");

  // Handle toggling tracking on/off
  const handleTrackingChange = (value: string) => {
    onCyclePhaseChange(value);
    setIsTracking(value !== "Not Tracking");
  };

  return (
    <FactorCardSection 
      title="Menstrual Cycle" 
      icon={<CalendarIcon className="h-5 w-5" />}
      description="Track your cycle phase and period start date"
    >
      <div className="space-y-4">
        {/* Cycle phase selection */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Current phase:</label>
          <Select value={cyclePhase} onValueChange={handleTrackingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select cycle phase" />
            </SelectTrigger>
            <SelectContent>
              {cyclePhases.map(phase => (
                <SelectItem key={phase} value={phase}>
                  {phase}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Period start date selection - only show if tracking */}
        {isTracking && (
          <div>
            <label className="text-sm font-medium mb-1.5 block">Period start date:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !periodStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {periodStartDate ? format(periodStartDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={periodStartDate}
                  onSelect={onPeriodStartDateChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        {/* Brief explanation of how cycle phases affect skin */}
        {isTracking && (
          <div className="pt-2 text-xs text-muted-foreground">
            <p>Different cycle phases can impact your skin. Tracking this can help identify patterns and optimize your skincare routine.</p>
          </div>
        )}
      </div>
    </FactorCardSection>
  );
};

export default MenstrualCycleSection;
