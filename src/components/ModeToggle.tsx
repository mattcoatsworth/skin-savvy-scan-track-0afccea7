
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "default" ? "spring" : "default")}
      >
        {theme === "default" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
