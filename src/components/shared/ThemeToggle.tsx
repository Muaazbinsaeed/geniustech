"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This pattern is intentional for hydration safety with next-themes
  // The setMounted(true) call is needed to prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR/hydration safety
    setMounted(true);
  }, []);

  const handleToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <button
        className={cn(
          "h-10 w-10 rounded-xl bg-card border border-card-border flex items-center justify-center",
          className
        )}
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "h-10 w-10 rounded-xl bg-card border border-card-border flex items-center justify-center transition-all hover:border-primary/50 hover:bg-background-secondary",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-orange" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
}
