import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "glass" | "outline";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const variants = {
      default: "form-field bg-background border-input hover:border-primary/30",
      glass:
        "glass-card border-white/30 bg-transparent hover:border-primary/40",
      outline: "border-2 border-input bg-background hover:border-primary/50",
    };

    return (
      <motion.div
        className="relative"
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl px-4 py-3 text-sm font-medium ring-offset-background transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 focus-visible:border-primary/60 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            variants[variant],
            isFocused && "shadow-glow-sm",
            className,
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {/* Focus glow effect */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-sm pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
      </motion.div>
    );
  },
);
Input.displayName = "Input";

export { Input };
