import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "elevated" | "outline" | "gradient";
    hover?: boolean;
    glow?: boolean;
  }
>(
  (
    { className, variant = "default", hover = false, glow = false, ...props },
    ref,
  ) => {
    const cardVariants = {
      default: "card-modern bg-card text-card-foreground",
      glass: "glass-card border-white/20 text-card-foreground backdrop-blur-xl",
      elevated:
        "bg-card border shadow-xl hover:shadow-2xl text-card-foreground",
      outline:
        "border-2 border-primary/30 bg-card/80 backdrop-blur-sm shadow-lg text-card-foreground hover:border-primary/50",
      gradient: "bg-gradient-primary text-white shadow-xl border-0",
    };

    const baseClassName = cn(
      "rounded-3xl transition-all duration-300 relative overflow-hidden",
      cardVariants[variant],
      hover &&
        "hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer",
      glow && "hover:shadow-glow",
      className,
    );

    return (
      <div ref={ref} className={baseClassName} {...props}>
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
        {props.children}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-3 p-6 pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    gradient?: boolean;
    glow?: boolean;
  }
>(({ className, gradient = false, glow = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight transition-all duration-200",
      gradient ? "text-gradient" : "text-card-foreground",
      glow && "text-glow",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground leading-relaxed text-sm", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-8 pt-4 border-t border-white/10",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
