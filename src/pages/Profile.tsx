
import React from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, FileText, Bell } from "lucide-react";

const Profile = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-center">Profile</h1>
        </header>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-skin-lavender rounded-full flex items-center justify-center mb-3">
            <User className="h-12 w-12 text-skin-teal" />
          </div>
          <h2 className="text-xl font-semibold">User</h2>
          <p className="text-sm text-muted-foreground">Skin Type: Combination</p>
        </div>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-left h-12 rounded-sm">
            <FileText className="mr-2 h-5 w-5" />
            Your Skin Journal
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left h-12 rounded-sm">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left h-12 rounded-sm">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>
      
      <AppNavigation />
    </div>
  );
};

export default Profile;
