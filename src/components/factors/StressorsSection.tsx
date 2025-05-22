
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, X, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import FactorCardSection from "./FactorCardSection";

interface StressorsSectionProps {
  stressors: string[];
  onChange: (stressors: string[]) => void;
  suggestions?: string[];
}

const StressorsSection: React.FC<StressorsSectionProps> = ({ 
  stressors, 
  onChange, 
  suggestions = [
    "Work Deadlines", "Family", "Financial Issues", "Health Concerns", 
    "Travel", "Social Events", "Lack of Sleep", "Commuting", "Job Interview",
    "Moving Home", "Relationship Issues"
  ] 
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleAddStressor = () => {
    if (searchValue && !stressors.includes(searchValue)) {
      onChange([...stressors, searchValue]);
      setSearchValue("");
    }
  };
  
  const handleRemoveStressor = (stressor: string) => {
    onChange(stressors.filter(s => s !== stressor));
  };
  
  const handleSelectSuggestion = (stressor: string) => {
    if (!stressors.includes(stressor)) {
      onChange([...stressors, stressor]);
    }
    setSearchValue("");
    setIsSearchOpen(false);
  };

  return (
    <FactorCardSection 
      title="Stressors" 
      icon={<Activity className="h-5 w-5" />}
      description="Identify what's causing stress"
    >
      {/* Stressor tags display */}
      {stressors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {stressors.map(stressor => (
            <Badge 
              key={stressor} 
              variant="secondary"
              className="flex items-center gap-1 pl-3 pr-2 py-1.5"
            >
              <span>{stressor}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 rounded-full hover:bg-muted"
                onClick={() => handleRemoveStressor(stressor)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      
      {/* Search and add field */}
      <div className="relative">
        <Popover
          open={isSearchOpen}
          onOpenChange={setIsSearchOpen}
        >
          <PopoverTrigger asChild>
            <div className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Add what's causing stress..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={() => setIsSearchOpen(true)}
                  className="pl-9"
                />
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddStressor();
                  setIsSearchOpen(false);
                }}
                disabled={!searchValue}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </PopoverTrigger>

          <PopoverContent 
            className="p-0 w-[var(--radix-popover-trigger-width)]" 
            align="start"
            sideOffset={5}
          >
            <Command>
              <CommandList className="max-h-[200px] overflow-auto">
                {searchValue && (
                  <CommandItem
                    onSelect={handleAddStressor}
                    className="flex items-center justify-center h-10"
                  >
                    <div className="flex items-center w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add "{searchValue}"</span>
                    </div>
                  </CommandItem>
                )}
                <CommandGroup heading="Common Stressors">
                  {suggestions
                    .filter(option => 
                      option.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map(option => (
                      <CommandItem
                        key={option}
                        onSelect={() => handleSelectSuggestion(option)}
                        disabled={stressors.includes(option)}
                      >
                        {option}
                        {stressors.includes(option) && 
                          <span className="ml-auto text-xs text-muted-foreground">Added</span>
                        }
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
                {suggestions.filter(option => 
                  option.toLowerCase().includes(searchValue.toLowerCase())).length === 0 &&
                  !searchValue && (
                  <CommandEmpty>No suggestions found</CommandEmpty>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </FactorCardSection>
  );
};

export default StressorsSection;
