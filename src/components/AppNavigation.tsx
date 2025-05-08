
import React, { useState } from "react";
import { Home, BarChart2, User, Plus, Camera, Image, Scan } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
};

const AppNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  const navItems: NavItem[] = [
    { icon: Home, label: "Home", path: "/", active: true },
    { icon: Camera, label: "Skin", path: "/history" },
    { icon: Scan, label: "Scans", path: "/insights" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center relative">
        {navItems.slice(0, 2).map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-4",
              item.active
                ? "text-skin-teal"
                : "text-gray-500 hover:text-skin-teal"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}

        {/* Center Plus Button with Popover */}
        <div className="relative -top-5">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button 
                className="rounded-full h-14 w-14 bg-skin-black text-white shadow-lg flex items-center justify-center"
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
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {navItems.slice(2, 4).map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-4",
              item.active
                ? "text-skin-teal"
                : "text-gray-500 hover:text-skin-teal"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppNavigation;
