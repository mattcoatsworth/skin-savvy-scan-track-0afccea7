
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkinLogForm = ({ addSkinLog }) => {
  const [condition, setCondition] = useState('');
  const [severity, setSeverity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      condition,
      severity,
      notes
    };
    addSkinLog(newLog);
    setCondition('');
    setSeverity(1);
    setNotes('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Skin Condition</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="condition" className="block text-sm font-medium mb-1">Condition</label>
            <input
              id="condition"
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="severity" className="block text-sm font-medium mb-1">Severity (1-10)</label>
            <input
              id="severity"
              type="number"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <Button type="submit">Log Condition</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SkinLogForm;
