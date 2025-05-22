
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wind } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FactorCardSection from "./FactorCardSection";

interface WeatherSectionProps {
  condition: string;
  temperature: number;
  humidity: number;
  onConditionChange: (condition: string) => void;
  onTemperatureChange: (temp: number) => void;
  onHumidityChange: (humidity: number) => void;
}

const weatherConditions = [
  "Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Stormy", 
  "Snowy", "Foggy", "Windy", "Hot", "Cold", "Humid"
];

const WeatherSection: React.FC<WeatherSectionProps> = ({ 
  condition, 
  temperature, 
  humidity,
  onConditionChange,
  onTemperatureChange,
  onHumidityChange
}) => {
  const [isManualEntry, setIsManualEntry] = useState(false);
  
  return (
    <FactorCardSection 
      title="Weather" 
      icon={<Wind className="h-5 w-5" />}
      description="Record weather conditions"
    >
      <div className="space-y-4">
        {/* Weather condition selection */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Weather condition:</label>
          <Select value={condition} onValueChange={onConditionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select weather condition" />
            </SelectTrigger>
            <SelectContent>
              {weatherConditions.map(weatherType => (
                <SelectItem key={weatherType} value={weatherType}>
                  {weatherType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Temperature input */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Temperature (°C):</label>
          <div className="flex items-center">
            <Input
              type="number"
              value={temperature.toString()}
              onChange={(e) => onTemperatureChange(parseInt(e.target.value) || 0)}
              className="flex-1"
            />
            <span className="ml-2 text-sm">°C</span>
          </div>
        </div>
        
        {/* Humidity input */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Humidity (%):</label>
          <div className="flex items-center">
            <Input
              type="number"
              min="0"
              max="100"
              value={humidity.toString()}
              onChange={(e) => onHumidityChange(parseInt(e.target.value) || 0)}
              className="flex-1"
            />
            <span className="ml-2 text-sm">%</span>
          </div>
        </div>
        
        {/* Auto-fetch weather button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            // In a real app, this would fetch location and then weather data
            // For now, let's simulate with some default values
            onConditionChange("Partly Cloudy");
            onTemperatureChange(22);
            onHumidityChange(45);
          }}
        >
          Get Current Weather
        </Button>
      </div>
    </FactorCardSection>
  );
};

export default WeatherSection;
