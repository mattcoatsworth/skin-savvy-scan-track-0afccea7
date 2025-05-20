
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Trash, ScanBarcode, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const FYPMealPlan = () => {
  const { toast } = useToast();
  const [preferredFoods, setPreferredFoods] = useState<string[]>([]);
  const [excludedFoods, setExcludedFoods] = useState<string[]>([]);
  const [weeklyBudget, setWeeklyBudget] = useState<string>("");
  
  // State for search inputs
  const [searchInputs, setSearchInputs] = useState({
    preferredFoods: "",
    excludedFoods: "",
  });
  
  // State for search popover visibility
  const [searchOpen, setSearchOpen] = useState({
    preferredFoods: false,
    excludedFoods: false,
  });
  
  // State for scan dialog
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [scanningCategory, setScanningCategory] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  const handleSearchChange = (category: string, value: string) => {
    setSearchInputs(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleAddCustomFactor = (category: string) => {
    const value = searchInputs[category as keyof typeof searchInputs];
    
    if (value && value.trim()) {
      if (category === 'preferredFoods' && !preferredFoods.includes(value)) {
        setPreferredFoods(prev => [...prev, value]);
      } else if (category === 'excludedFoods' && !excludedFoods.includes(value)) {
        setExcludedFoods(prev => [...prev, value]);
      }
      
      // Clear the search input after adding
      setSearchInputs(prev => ({
        ...prev,
        [category]: ""
      }));
      
      // Close the popover
      setSearchOpen(prev => ({
        ...prev,
        [category]: false
      }));
    }
  };
  
  const handleRemoveFood = (category: string, food: string) => {
    if (category === 'preferredFoods') {
      setPreferredFoods(prev => prev.filter(item => item !== food));
    } else if (category === 'excludedFoods') {
      setExcludedFoods(prev => prev.filter(item => item !== food));
    }
  };
  
  // Handle scanning functionality
  const handleStartScan = (category: string) => {
    setScanningCategory(category);
    setScanDialogOpen(true);
    
    // Simulate scanning process (in a real app, this would activate a camera)
    setTimeout(() => {
      // Simulate a scan result based on the category
      const foods = [
        'Avocado', 'Green Tea', 'Salmon', 'Sweet Potato', 'Blueberries',
        'Spinach', 'Almond Milk', 'Greek Yogurt', 'Chicken', 'Quinoa'
      ];
      
      const result = foods[Math.floor(Math.random() * foods.length)];
      setScanResult(result);
    }, 1500); // Simulate 1.5 seconds of scanning
  };
  
  // Handle adding scanned item
  const handleAddScannedItem = () => {
    if (scanningCategory && scanResult) {
      if (scanningCategory === 'preferredFoods' && !preferredFoods.includes(scanResult)) {
        setPreferredFoods(prev => [...prev, scanResult]);
      } else if (scanningCategory === 'excludedFoods' && !excludedFoods.includes(scanResult)) {
        setExcludedFoods(prev => [...prev, scanResult]);
      }
      
      toast({
        title: "Item added",
        description: `Added ${scanResult} to your ${scanningCategory === 'preferredFoods' ? 'included' : 'excluded'} foods list.`,
        duration: 3000
      });
      
      // Close dialog and reset scan states
      setScanDialogOpen(false);
      setScanningCategory(null);
      setScanResult(null);
    }
  };
  
  const getDefaultOptions = (category: string) => {
    if (category === 'preferredFoods') {
      return [
        "Avocado", "Salmon", "Berries", "Leafy greens", "Sweet potato", 
        "Nuts", "Olive oil", "Green tea", "Yogurt", "Turmeric"
      ];
    } else {
      return [
        "Dairy", "Gluten", "Processed sugar", "Alcohol", "Fried foods",
        "Soy", "Nuts", "Shellfish", "Caffeine", "Spicy foods"
      ];
    }
  };
  
  // Get the color for the scanning category
  const getCategoryColor = (category: string) => {
    return category === 'preferredFoods' ? "bg-green-600" : "bg-rose-600";
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-100">
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold mb-3">Personalized Meal Plan</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Customize your meal plan to support your skin health goals and dietary preferences.
          </p>
          
          {/* Food Preferences */}
          <div className="space-y-4">
            {/* Include Foods Input with Popover */}
            <div>
              <label htmlFor="includeFoods" className="text-xs text-muted-foreground block mb-1">
                Include these foods if possible (optional):
              </label>
              <div className="relative">
                <Popover 
                  open={searchOpen.preferredFoods} 
                  onOpenChange={(open) => {
                    setSearchOpen(prev => ({ ...prev, preferredFoods: open }));
                  }}
                >
                  <PopoverTrigger asChild>
                    <div className="relative flex-grow cursor-pointer w-full">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="includeFoods"
                        placeholder="e.g., avocado, berries, salmon"
                        value={searchInputs.preferredFoods}
                        onChange={(e) => {
                          handleSearchChange("preferredFoods", e.target.value);
                        }}
                        onClick={() => {
                          setSearchOpen(prev => ({ ...prev, preferredFoods: true }));
                        }}
                        className="pl-8 py-2 text-sm h-9 w-full pr-10"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCustomFactor('preferredFoods');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-green-600 text-white disabled:opacity-50 disabled:bg-gray-400"
                        disabled={!searchInputs.preferredFoods}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </PopoverTrigger>
                  
                  <PopoverContent 
                    className="p-0 w-[var(--radix-popover-trigger-width)]" 
                    align="start"
                    sideOffset={5}
                  >
                    <Command className="w-full">
                      <CommandList className="max-h-[200px] overflow-auto">
                        {searchInputs.preferredFoods && (
                          <CommandItem 
                            onSelect={() => handleAddCustomFactor('preferredFoods')}
                            className="flex items-center justify-center h-10"
                          >
                            <div className="flex items-center w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              <span>Add "{searchInputs.preferredFoods}"</span>
                            </div>
                          </CommandItem>
                        )}
                        <CommandGroup>
                          {getDefaultOptions('preferredFoods')
                            .filter(option => option.toLowerCase().includes((searchInputs.preferredFoods || '').toLowerCase()))
                            .map(option => (
                              <CommandItem 
                                key={option} 
                                onSelect={() => {
                                  if (!preferredFoods.includes(option)) {
                                    setPreferredFoods(prev => [...prev, option]);
                                  }
                                  setSearchInputs(prev => ({ ...prev, preferredFoods: "" }));
                                  setSearchOpen(prev => ({ ...prev, preferredFoods: false }));
                                }}
                              >
                                {option}
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                        {getDefaultOptions('preferredFoods').filter(option => 
                          option.toLowerCase().includes((searchInputs.preferredFoods || '').toLowerCase())).length === 0 &&
                          !searchInputs.preferredFoods && (
                          <CommandEmpty>No options found</CommandEmpty>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-2 max-w-[85%]">
                  {preferredFoods.map((food) => (
                    <Badge 
                      key={food} 
                      variant="secondary"
                      className="px-2 py-1 flex items-center gap-1 bg-green-50 text-green-800 hover:bg-green-100"
                    >
                      {food}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveFood('preferredFoods', food)}
                      />
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-xs h-8"
                  onClick={() => handleStartScan('preferredFoods')}
                >
                  <ScanBarcode className="h-3.5 w-3.5" />
                  Scan
                </Button>
              </div>
            </div>
            
            {/* Exclude Foods Input with Popover */}
            <div>
              <label htmlFor="excludeFoods" className="text-xs text-muted-foreground block mb-1">
                Foods to avoid (optional):
              </label>
              <div className="relative">
                <Popover 
                  open={searchOpen.excludedFoods} 
                  onOpenChange={(open) => {
                    setSearchOpen(prev => ({ ...prev, excludedFoods: open }));
                  }}
                >
                  <PopoverTrigger asChild>
                    <div className="relative flex-grow cursor-pointer w-full">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="excludeFoods"
                        placeholder="e.g., dairy, gluten, nuts"
                        value={searchInputs.excludedFoods}
                        onChange={(e) => {
                          handleSearchChange("excludedFoods", e.target.value);
                        }}
                        onClick={() => {
                          setSearchOpen(prev => ({ ...prev, excludedFoods: true }));
                        }}
                        className="pl-8 py-2 text-sm h-9 w-full pr-10"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCustomFactor('excludedFoods');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-rose-600 text-white disabled:opacity-50 disabled:bg-gray-400"
                        disabled={!searchInputs.excludedFoods}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </PopoverTrigger>
                  
                  <PopoverContent 
                    className="p-0 w-[var(--radix-popover-trigger-width)]" 
                    align="start"
                    sideOffset={5}
                  >
                    <Command className="w-full">
                      <CommandList className="max-h-[200px] overflow-auto">
                        {searchInputs.excludedFoods && (
                          <CommandItem 
                            onSelect={() => handleAddCustomFactor('excludedFoods')}
                            className="flex items-center justify-center h-10"
                          >
                            <div className="flex items-center w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              <span>Add "{searchInputs.excludedFoods}"</span>
                            </div>
                          </CommandItem>
                        )}
                        <CommandGroup>
                          {getDefaultOptions('excludedFoods')
                            .filter(option => option.toLowerCase().includes((searchInputs.excludedFoods || '').toLowerCase()))
                            .map(option => (
                              <CommandItem 
                                key={option} 
                                onSelect={() => {
                                  if (!excludedFoods.includes(option)) {
                                    setExcludedFoods(prev => [...prev, option]);
                                  }
                                  setSearchInputs(prev => ({ ...prev, excludedFoods: "" }));
                                  setSearchOpen(prev => ({ ...prev, excludedFoods: false }));
                                }}
                              >
                                {option}
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                        {getDefaultOptions('excludedFoods').filter(option => 
                          option.toLowerCase().includes((searchInputs.excludedFoods || '').toLowerCase())).length === 0 &&
                          !searchInputs.excludedFoods && (
                          <CommandEmpty>No options found</CommandEmpty>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-2 max-w-[85%]">
                  {excludedFoods.map((food) => (
                    <Badge 
                      key={food} 
                      variant="secondary"
                      className="px-2 py-1 flex items-center gap-1 bg-rose-50 text-rose-800 hover:bg-rose-100"
                    >
                      {food}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveFood('excludedFoods', food)}
                      />
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-xs h-8"
                  onClick={() => handleStartScan('excludedFoods')}
                >
                  <ScanBarcode className="h-3.5 w-3.5" />
                  Scan
                </Button>
              </div>
            </div>
            
            {/* Budget input field */}
            <div>
              <label htmlFor="weeklyBudget" className="text-xs text-muted-foreground block mb-1">
                Weekly budget (optional):
              </label>
              <Input
                id="weeklyBudget"
                type="number"
                placeholder="e.g., 100"
                value={weeklyBudget}
                onChange={(e) => {
                  setWeeklyBudget(e.target.value);
                }}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <Button 
            className="w-full"
            variant="default"
          >
            Generate Meal Plan
          </Button>
        </CardFooter>
      </Card>
      
      {/* Scanning Dialog */}
      <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {scanningCategory && (
                <span>Scanning {scanningCategory === 'preferredFoods' ? 'Food to Include' : 'Food to Avoid'}</span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            {!scanResult ? (
              <>
                <div className={`rounded-full p-6 ${scanningCategory ? getCategoryColor(scanningCategory) : 'bg-gray-600'}`}>
                  <ScanBarcode className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Scanning...</p>
                  <p className="text-sm text-muted-foreground">Hold the food product in front of the camera</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full p-6 bg-green-600">
                  <ScanBarcode className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">Scanned Successfully!</p>
                  <p className="text-xl font-bold my-2">{scanResult}</p>
                </div>
                <Button 
                  className="w-full"
                  onClick={handleAddScannedItem}
                >
                  Add to {scanningCategory === 'preferredFoods' ? 'Included Foods' : 'Avoided Foods'}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FYPMealPlan;
