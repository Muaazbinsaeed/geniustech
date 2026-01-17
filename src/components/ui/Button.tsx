"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:-translate-y-0.5",
        secondary:
          "bg-card border border-card-border text-foreground hover:bg-background-secondary hover:border-primary/50",
        whatsapp:
          "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:-translate-y-0.5",
        ghost:
          "text-foreground hover:bg-background-secondary",
        link:
          "text-primary underline-offset-4 hover:underline",
        outline:
          "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      },
      size: {
        sm: "h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm",
        md: "h-10 px-4 text-sm sm:h-11 sm:px-6 sm:text-base",
        lg: "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg",
        icon: "h-9 w-9 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
