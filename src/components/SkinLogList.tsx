
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SkinLogList = ({ skinLogs = [] }) => {
  if (skinLogs.length === 0) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-2">Skin Logs</h2>
        <p>No skin condition logs yet. Start tracking your skin's condition!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skin Logs</h2>
      <div className="space-y-4">
        {skinLogs.map((log) => (
          <Card key={log.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{log.condition}</span>
                <Badge>{new Date(log.date).toLocaleDateString()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Severity:</strong> {log.severity}/10</p>
              {log.notes && <p className="mt-2"><strong>Notes:</strong> {log.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkinLogList;
