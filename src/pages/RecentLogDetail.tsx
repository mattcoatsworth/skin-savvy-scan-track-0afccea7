
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/BackButton";
import { Progress } from "@/components/ui/progress";

type LogType = {
  title: string;
  status: "positive" | "negative" | "neutral";
  description: string;
  date?: string;
  details?: string;
  rating?: number;
  id?: string;
};

const RecentLogDetail = () => {
  const { logId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [log, setLog] = useState<LogType | null>(null);

  // Sample data - in a real app, this would come from an API or database
  const sampleLogs: LogType[] = [
    { 
      id: "retinol-cream",
      title: "Retinol Cream", 
      status: "positive", 
      description: "No reaction after 3 days",
      date: "May 9, 2025",
      details: "Applied a pea-sized amount before bed. Skin feels smoother in the morning with no irritation. After 3 days of consistent use, I've noticed reduced fine lines around my eyes and improved overall skin texture. No dryness or peeling observed.",
      rating: 85
    },
    { 
      id: "whey-protein", 
      title: "Whey Protein", 
      status: "negative", 
      description: "Possible acne trigger",
      date: "May 8, 2025",
      details: "Noticed small breakouts along jawline 24 hours after consuming whey protein shake. This is the third time I've observed this pattern. The breakouts typically subside after 3-4 days of discontinuing use.",
      rating: 30
    },
    { 
      id: "avocado", 
      title: "Avocado", 
      status: "positive", 
      description: "Skin hydration improved",
      date: "May 7, 2025",
      details: "Ate half an avocado with lunch. Noticed skin felt more hydrated by evening. This continues a pattern I've observed where regular avocado consumption correlates with improved skin moisture levels and fewer dry patches.",
      rating: 92
    },
    { 
      id: "new-foundation",
      title: "New Foundation", 
      status: "neutral", 
      description: "No noticeable change",
      date: "May 6, 2025",
      details: "Tried new mineral foundation. Coverage is good, no reaction but no improvement either. The foundation applied smoothly and lasted throughout the day. Will continue monitoring for any long-term effects.",
      rating: 65
    },
  ];

  useEffect(() => {
    // Check if we have log data passed through location state
    if (location.state && location.state.log) {
      setLog(location.state.log);
    } 
    // Otherwise look for the log by ID
    else if (logId) {
      const foundLog = sampleLogs.find(l => l.id === logId);
      if (foundLog) {
        setLog(foundLog);
      } else {
        // If no log is found, navigate to the logs list
        navigate("/recent-logs");
      }
    }
  }, [location, logId, navigate]);

  // Helper functions for status indicators and ratings
  const getStatusIndicator = (status: LogType['status']) => {
    switch (status) {
      case "positive":
        return "🟢";
      case "negative":
        return "🔴";
      case "neutral":
        return "🟡";
    }
  };

  const getStatusText = (status: LogType['status']) => {
    switch (status) {
      case "positive":
        return "Positive Effect";
      case "negative":
        return "Negative Effect";
      case "neutral":
        return "Neutral Effect";
    }
  };

  const getProgressColor = (rating: number) => {
    if (rating >= 70) return "bg-green-500";
    if (rating >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 80) return "Great";
    if (rating >= 60) return "Good";
    if (rating >= 40) return "OK";
    if (rating >= 20) return "Fair";
    return "Poor";
  };

  if (!log) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <header className="mb-6 flex items-center">
        <BackButton />
        <h1 className="text-2xl font-bold">{log.title}</h1>
      </header>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{getStatusIndicator(log.status)}</span>
            <div>
              <h2 className="text-xl font-semibold">{getStatusText(log.status)}</h2>
              <p className="text-muted-foreground">{log.description}</p>
            </div>
          </div>

          {log.date && (
            <div className="mb-4">
              <h3 className="text-base font-medium mb-1">Log Date</h3>
              <p>{log.date}</p>
            </div>
          )}

          {log.rating !== undefined && (
            <div className="mb-6">
              <h3 className="text-base font-medium mb-1">Effect Rating</h3>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <Progress 
                    value={log.rating} 
                    className="h-3 bg-gray-100" 
                    indicatorClassName={getProgressColor(log.rating)} 
                  />
                </div>
                <div className="text-base font-semibold">{log.rating}/100</div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{getRatingLabel(log.rating)}</p>
            </div>
          )}

          {log.details && (
            <div>
              <h3 className="text-base font-medium mb-1">Detailed Notes</h3>
              <p className="text-sm">{log.details}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
        <Card>
          <CardContent className="p-4">
            {log.status === "positive" ? (
              <ul className="list-disc pl-4 space-y-2">
                <li>Continue using this product/ingredient in your routine</li>
                <li>Consider increasing frequency if beneficial</li>
                <li>Monitor for consistent positive effects</li>
              </ul>
            ) : log.status === "negative" ? (
              <ul className="list-disc pl-4 space-y-2">
                <li>Consider discontinuing use of this product/ingredient</li>
                <li>Look for alternatives without triggering components</li>
                <li>Review ingredients for potential irritants</li>
              </ul>
            ) : (
              <ul className="list-disc pl-4 space-y-2">
                <li>Continue monitoring effects over longer period</li>
                <li>Consider adjusting usage frequency</li>
                <li>Try combining with other beneficial products</li>
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentLogDetail;
