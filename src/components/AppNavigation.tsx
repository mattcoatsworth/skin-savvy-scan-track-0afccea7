
import React from "react";
import { Home, Search, BarChart2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
};

const AppNavigation: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: Home, label: "Home", path: "/", active: true },
    { icon: Search, label: "Search", path: "/search" },
    { icon: BarChart2, label: "Insights", path: "/insights" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
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
