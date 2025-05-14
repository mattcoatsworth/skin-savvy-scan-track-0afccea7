
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Plus, ScanBarcode } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

type FactorCardProps = {
  title: string;
  icon: React.ReactNode;
  type: "slider" | "buttons" | "search" | "mixed";
  category?: string;
  sliderProps?: {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number[]) => void;
    leftLabel?: string;
    rightLabel?: string;
    valueLabel?: string;
    ratingInfo?: {
      label: string;
      color: string;
    };
  };
  buttonOptions?: string[];
  selectedOptions?: string[];
  onOptionSelect?: (option: string) => void;
  searchProps?: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
    options: string[];
  };
  onScan?: (category: string) => void;
  description?: string;
  children?: React.ReactNode;
};

const FactorCard: React.FC<FactorCardProps> = ({
  title,
  icon,
  type,
  category,
  sliderProps,
  buttonOptions,
  selectedOptions = [],
  onOptionSelect,
  searchProps,
  onScan,
  description,
  children
}) => {
  // For search functionality
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Render the card header with icon, title, and optional scan button
  const renderHeader = () => (
    <div className="factor-card-header">
      <h3 className="factor-card-title">
        <span className="factor-card-icon">{icon}</span> {title}
      </h3>
      
      {onScan && category && (
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 text-xs"
          onClick={() => onScan(category)}
        >
          <ScanBarcode className="h-3.5 w-3.5" />
          Scan
        </Button>
      )}
      
      {sliderProps?.ratingInfo && (
        <Badge 
          className="text-xs px-2" 
          style={{ 
            backgroundColor: `${sliderProps.ratingInfo.color}20`, 
            color: sliderProps.ratingInfo.color 
          }}
        >
          {sliderProps.ratingInfo.label}
        </Badge>
      )}
    </div>
  );

  // Render slider content
  const renderSlider = () => {
    if (!sliderProps) return null;
    
    return (
      <div className="factor-card-content">
        <div className="flex justify-between items-center">
          <span className="text-sm text-skin-black">
            {sliderProps.valueLabel || `Value: ${sliderProps.value}`}
          </span>
        </div>
        <Slider
          value={[sliderProps.value]}
          min={sliderProps.min}
          max={sliderProps.max}
          step={sliderProps.step}
          onValueChange={sliderProps.onChange}
          className="factor-card-slider"
        />
        <div className="factor-card-labels">
          <span>{sliderProps.leftLabel || sliderProps.min}</span>
          <span>{sliderProps.rightLabel || sliderProps.max}</span>
        </div>
      </div>
    );
  };

  // Render button options content
  const renderButtons = () => {
    if (!buttonOptions || !onOptionSelect) return null;
    
    return (
      <div className="factor-card-buttons">
        {buttonOptions.map(option => (
          <Button
            key={option}
            variant={selectedOptions.includes(option) ? "default" : "outline"}
            size="sm"
            className={`factor-tag ${
              selectedOptions.includes(option)
                ? 'factor-tag-selected'
                : 'factor-tag-unselected'
            }`}
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    );
  };

  // Render search input and dropdown
  const renderSearch = () => {
    if (!searchProps) return null;
    
    return (
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="relative">
          <Popover
            open={isSearchOpen}
            onOpenChange={setIsSearchOpen}
          >
            <PopoverTrigger asChild>
              <div className="factor-card-search">
                <Search className="factor-card-search-icon" />
                <Input
                  placeholder={searchProps.placeholder}
                  value={searchProps.value}
                  onChange={(e) => searchProps.onChange(e.target.value)}
                  onClick={() => setIsSearchOpen(true)}
                  className="factor-card-search-input"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (searchProps.value) {
                      searchProps.onAdd();
                      setIsSearchOpen(false);
                    }
                  }}
                  className="factor-card-add-button"
                  disabled={!searchProps.value}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </PopoverTrigger>

            <PopoverContent 
              className="factor-card-dropdown p-0 w-[var(--radix-popover-trigger-width)]" 
              align="start"
              sideOffset={5}
            >
              <Command className="w-full">
                <CommandList className="max-h-[200px] overflow-auto">
                  {searchProps.value && (
                    <CommandItem
                      onSelect={searchProps.onAdd}
                      className="flex items-center justify-center h-10"
                    >
                      <div className="flex items-center w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Add "{searchProps.value}"</span>
                      </div>
                    </CommandItem>
                  )}
                  <CommandGroup>
                    {searchProps.options
                      .filter(option => 
                        option.toLowerCase().includes(searchProps.value.toLowerCase())
                      )
                      .map(option => (
                        <CommandItem
                          key={option}
                          onSelect={() => {
                            onOptionSelect?.(option);
                            searchProps.onChange("");
                            setIsSearchOpen(false);
                          }}
                        >
                          {option}
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                  {searchProps.options.filter(option => 
                    option.toLowerCase().includes(searchProps.value.toLowerCase())).length === 0 &&
                    !searchProps.value && (
                    <CommandEmpty>No options found</CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  return (
    <Card className="factor-card ios-card">
      <CardContent className="p-4">
        {renderHeader()}
        
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        
        {type === "slider" && renderSlider()}
        {(type === "buttons" || type === "mixed") && renderButtons()}
        {(type === "search" || type === "mixed") && renderSearch()}
        
        {children}
      </CardContent>
    </Card>
  );
};

export default FactorCard;
