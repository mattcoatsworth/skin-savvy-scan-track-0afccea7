
import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";
import TrendChart from "@/components/TrendChart";
import { Link } from "react-router-dom";

const CorrelationsDetail = () => {
  // Generate demo data for correlations
  const correlations = [
    { 
      factor: "Dairy Consumption", 
      impact: "negative", 
      correlation: 92,
      details: "Strong negative correlation between dairy intake and skin clarity. Inflammation increases within 24-48 hours of consumption.",
      trend: [
        { date: "Mon", value: 35 },
        { date: "Tue", value: 40 },
        { date: "Wed", value: 50 },
        { date: "Thu", value: 30 },
        { date: "Fri", value: 60 },
        { date: "Sat", value: 40 },
        { date: "Sun", value: 35 }
      ]
    },
    { 
      factor: "Hydration", 
      impact: "positive", 
      correlation: 89,
      details: "Consistent water intake (8+ cups daily) shows strong positive correlation with skin hydration levels.",
      trend: [
        { date: "Mon", value: 75 },
        { date: "Tue", value: 80 },
        { date: "Wed", value: 85 },
        { date: "Thu", value: 80 },
        { date: "Fri", value: 70 },
        { date: "Sat", value: 85 },
        { date: "Sun", value: 90 }
      ]
    },
    { 
      factor: "Stress Levels", 
      impact: "negative", 
      correlation: 78,
      details: "Heightened stress correlates with increased inflammation and oil production, particularly in T-zone.",
      trend: [
        { date: "Mon", value: 60 },
        { date: "Tue", value: 55 },
        { date: "Wed", value: 40 },
        { date: "Thu", value: 35 },
        { date: "Fri", value: 45 },
        { date: "Sat", value: 65 },
        { date: "Sun", value: 70 }
      ]
    },
    { 
      factor: "Sunscreen Use", 
      impact: "positive", 
      correlation: 85,
      details: "Daily application of SPF 30+ strongly correlates with reduced redness and prevention of UV-related damage.",
      trend: [
        { date: "Mon", value: 80 },
        { date: "Tue", value: 85 },
        { date: "Wed", value: 80 },
        { date: "Thu", value: 90 },
        { date: "Fri", value: 85 },
        { date: "Sat", value: 75 },
        { date: "Sun", value: 80 }
      ]
    },
    { 
      factor: "Sugar Intake", 
      impact: "negative", 
      correlation: 75,
      details: "High sugar consumption correlates with increased breakouts, particularly in chin and jawline areas.",
      trend: [
        { date: "Mon", value: 45 },
        { date: "Tue", value: 50 },
        { date: "Wed", value: 35 },
        { date: "Thu", value: 60 },
        { date: "Fri", value: 40 },
        { date: "Sat", value: 55 },
        { date: "Sun", value: 45 }
      ]
    },
    { 
      factor: "Sleep Quality", 
      impact: "positive", 
      correlation: 72,
      details: "Nights with 7+ hours of uninterrupted sleep correlate with improved skin tone and reduced under-eye circles.",
      trend: [
        { date: "Mon", value: 70 },
        { date: "Tue", value: 65 },
        { date: "Wed", value: 75 },
        { date: "Thu", value: 80 },
        { date: "Fri", value: 60 },
        { date: "Sat", value: 85 },
        { date: "Sun", value: 75 }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold mt-2">Skin Correlations</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Last 7 days</span>
          </div>
        </header>

        <div className="mb-6">
          <Card className="ios-card">
            <CardContent className="p-4">
              <p className="text-sm mb-4">
                Our analysis has identified these factors as having the strongest correlation with your skin condition. 
                Correlation strength is calculated based on the consistent patterns observed over time.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factor</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead className="text-right">Strength</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {correlations.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.factor}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          item.impact === 'positive'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.impact === 'positive' ? 'Positive' : 'Negative'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{item.correlation}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 mb-6">
          <h2 className="text-lg font-semibold">Detailed Correlations</h2>
          
          {correlations.map((correlation, idx) => (
            <Card key={idx} className="ios-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{correlation.factor}</h3>
                    <div className="flex items-center mt-1">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        correlation.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm capitalize">{correlation.impact} Impact</span>
                      <span className="text-sm font-medium ml-2">({correlation.correlation}%)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground my-3">{correlation.details}</p>
                
                <div>
                  <p className="text-xs font-medium mb-1">7-Day Trend:</p>
                  <TrendChart data={correlation.trend} height={50} />
                </div>
                
                {idx < 2 && (
                  <div className="mt-4 pt-3 border-t">
                    <Link 
                      to={`/category-analysis/${correlation.factor === "Dairy Consumption" || correlation.factor === "Sugar Intake" ? "food" : correlation.factor === "Stress Levels" ? "stress" : "products"}`}
                      className="text-skin-teal text-sm font-medium flex items-center justify-end"
                    >
                      See related category <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">How to Use This Data</h2>
          <Card className="ios-card">
            <CardContent className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Focus on reducing factors with strong negative correlations first</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Maintain habits with positive correlations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Test changes one at a time for 1-2 weeks to confirm correlations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-sm">Log consistently to improve correlation accuracy</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CorrelationsDetail;
