
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface SkinLog {
  id: string;
  date: string;
  condition: string;
  location: string;
  notes: string;
}

interface SkinLogListProps {
  skinLogs: SkinLog[];
}

const SkinLogList: React.FC<SkinLogListProps> = ({ skinLogs }) => {
  // Format condition for display
  const formatCondition = (condition: string) => {
    return condition.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  // Get badge color based on condition
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-green-300';
      case 'fair':
        return 'bg-yellow-300';
      case 'poor':
        return 'bg-orange-400';
      case 'very-poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Skin Condition Log</h1>
      
      {skinLogs.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No skin logs recorded yet. Start tracking your skin condition today!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {skinLogs.map((log) => (
            <Card key={log.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{formatCondition(log.location)}</h3>
                    <Badge className={getConditionColor(log.condition)}>
                      {formatCondition(log.condition)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(log.date), 'PPP p')}
                  </p>
                  
                  {log.notes && (
                    <p className="text-sm mt-2 text-gray-700">
                      {log.notes}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkinLogList;
