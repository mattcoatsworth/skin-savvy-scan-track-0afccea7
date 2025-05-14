
import React, { useState } from "react";
import { Home, User, Plus, Camera, Image, Scan, Smile, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
};

const AppNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  
  // Using window.location.pathname to determine the active route
  const currentPath = window.location.pathname;
  
  const navItems: NavItem[] = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Smile, label: "Skin", path: "/skin" },
    { icon: Scan, label: "Products", path: "/products" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 app-navigation-bar">
      <div className="flex justify-around items-center relative px-2 py-1">
        {navItems.map((item, index) => {
          // All navigation items will be gray (text-gray-500) whether active or not
          
          // Insert the plus button after the second item
          if (index === 2) {
            return (
              <React.Fragment key={`fragment-${item.label}`}>
                {/* Center Plus Button with Popover */}
                <div className="relative -top-5 flex justify-center" key="plus-button">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button 
                        className="rounded-full h-14 w-14 bg-black text-white shadow-lg hover:bg-gray-800 flex items-center justify-center"
                        onClick={() => setOpen(true)}
                      >
                        <Plus className="h-7 w-7" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="center">
                      <div className="flex flex-col space-y-1">
                        <Button 
                          variant="ghost" 
                          className="flex items-center justify-start gap-2"
                          onClick={() => setOpen(false)}
                        >
                          <Camera className="h-5 w-5 text-skin-teal" />
                          <span>Scan Product</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="flex items-center justify-start gap-2"
                          onClick={() => setOpen(false)}
                        >
                          <Image className="h-5 w-5 text-skin-teal" />
                          <span>Take Selfie</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="flex items-center justify-start gap-2"
                          onClick={() => setOpen(false)}
                          asChild
                        >
                          <Link to="/chat">
                            <MessageSquare className="h-5 w-5 text-skin-teal" />
                            <span>Ask Anything</span>
                          </Link>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex flex-col items-center py-1 text-gray-500 hover:text-gray-700"
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs mt-0.5">{item.label}</span>
                </Link>
              </React.Fragment>
            );
          }
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center py-1 text-gray-500 hover:text-gray-700"
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AppNavigation;
