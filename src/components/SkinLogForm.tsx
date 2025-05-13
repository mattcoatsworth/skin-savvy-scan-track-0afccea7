
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';

interface SkinLogFormProps {
  addSkinLog: (log: any) => void;
}

const SkinLogForm: React.FC<SkinLogFormProps> = ({ addSkinLog }) => {
  const [condition, setCondition] = useState('good');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('face');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new log with current date and values
    const newLog = {
      id: uuidv4(),
      date: new Date().toISOString(),
      condition,
      location,
      notes
    };
    
    // Add log to the list
    addSkinLog(newLog);
    
    // Reset form
    setCondition('good');
    setNotes('');
    setLocation('face');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log Skin Condition</h1>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="very-poor">Very Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="face">Face</SelectItem>
                  <SelectItem value="neck">Neck</SelectItem>
                  <SelectItem value="chest">Chest</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                  <SelectItem value="arms">Arms</SelectItem>
                  <SelectItem value="legs">Legs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any observations or details" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button type="submit" className="w-full">
              Save Entry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkinLogForm;
