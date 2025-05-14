
import React from "react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";
import { useScrollToTop } from "@/hooks/useScrollToTop";

interface ScreenProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  headerRight?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  noPadding?: boolean;
}

/**
 * Screen component that mimics React Navigation's Screen structure
 * This component provides a consistent layout for screens/pages across
 * the application, making the transition to React Native easier
 */
const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  showBack = true,
  headerRight,
  className,
  headerClassName,
  contentClassName,
  noPadding = false,
}) => {
  // Handle scroll behavior (web-only)
  useScrollToTop();

  return (
    <div className={cn("flex flex-col min-h-screen bg-slate-50", className)}>
      {/* Screen Header - similar to navigation header in React Navigation */}
      {(title || showBack || headerRight) && (
        <header className={cn(
          "flex items-center justify-between mb-4",
          headerClassName
        )}>
          <div className="flex items-center">
            {showBack && <BackButton />}
            {title && <h1 className="text-xl font-bold">{title}</h1>}
          </div>
          {headerRight && (
            <div className="flex items-center">{headerRight}</div>
          )}
        </header>
      )}

      {/* Screen Content - main content area */}
      <main className={cn(
        "flex-1 pb-24",
        !noPadding && "px-4",
        contentClassName
      )}>
        {children}
      </main>
    </div>
  );
};

export default Screen;
