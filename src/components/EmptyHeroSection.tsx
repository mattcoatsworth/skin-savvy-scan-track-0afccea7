
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EmptyHeroSection = () => {
  return (
    <div className="mb-6">
      <Card className="overflow-hidden border-none shadow-sm bg-gradient-to-b from-slate-50 to-white">
        <CardContent className="p-6">
          {/* Header with Profile and Title */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">Welcome</h2>
                <p className="text-sm text-muted-foreground">Let's get started with your skin journey</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <Calendar className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Empty Weekly Calendar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">This Week</h3>
            </div>
            
            <div className="flex justify-center items-center p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Start tracking your skin to see your weekly report</p>
                <Button size="sm" asChild>
                  <Link to="/log-skin-condition">
                    <Plus className="h-4 w-4 mr-1" />
                    Log First Entry
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Empty Skin Care Streak Section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 bg-gradient-to-br from-violet-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-violet-600">0</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base">Skin Care Streak</h3>
                <p className="text-sm font-medium">Start your streak today!</p>
                <p className="text-xs text-muted-foreground mt-1">No logs yet</p>
              </div>
              <Link to="/skin">
                <Button variant="ghost" size="sm" className="text-xs">
                  View History
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyHeroSection;
