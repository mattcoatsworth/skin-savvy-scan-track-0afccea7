
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pill, Plus, X, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import FactorCardSection from "./FactorCardSection";

interface SupplementsSectionProps {
  supplements: string[];
  onChange: (supplements: string[]) => void;
  suggestions?: string[];
}

const SupplementsSection: React.FC<SupplementsSectionProps> = ({ 
  supplements, 
  onChange, 
  suggestions = [
    "Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E", "Zinc",
    "Omega-3", "Collagen", "Biotin", "Probiotics", "Hyaluronic Acid",
    "Evening Primrose Oil", "Glutathione", "Selenium", "Iron"
  ] 
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleAddSupplement = () => {
    if (searchValue && !supplements.includes(searchValue)) {
      onChange([...supplements, searchValue]);
      setSearchValue("");
    }
  };
  
  const handleRemoveSupplement = (supplement: string) => {
    onChange(supplements.filter(s => s !== supplement));
  };
  
  const handleSelectSuggestion = (supplement: string) => {
    if (!supplements.includes(supplement)) {
      onChange([...supplements, supplement]);
    }
    setSearchValue("");
    setIsSearchOpen(false);
  };

  return (
    <FactorCardSection 
      title="Supplements" 
      icon={<Pill className="h-5 w-5" />}
      description="Log supplements you're taking"
    >
      {/* Supplement tags display */}
      {supplements.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {supplements.map(supplement => (
            <Badge 
              key={supplement} 
              variant="secondary"
              className="flex items-center gap-1 pl-3 pr-2 py-1.5"
            >
              <span>{supplement}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 rounded-full hover:bg-muted"
                onClick={() => handleRemoveSupplement(supplement)}
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
                  placeholder="Search or add supplement..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={() => setIsSearchOpen(true)}
                  className="pl-9"
                />
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddSupplement();
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
                    onSelect={handleAddSupplement}
                    className="flex items-center justify-center h-10"
                  >
                    <div className="flex items-center w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add "{searchValue}"</span>
                    </div>
                  </CommandItem>
                )}
                <CommandGroup heading="Suggestions">
                  {suggestions
                    .filter(option => 
                      option.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map(option => (
                      <CommandItem
                        key={option}
                        onSelect={() => handleSelectSuggestion(option)}
                        disabled={supplements.includes(option)}
                      >
                        {option}
                        {supplements.includes(option) && 
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

export default SupplementsSection;
