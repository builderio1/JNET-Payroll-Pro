import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden glossy",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary text-white shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] border-0",
        destructive:
          "bg-gradient-danger text-white shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] border-0",
        outline:
          "glass-card hover:glass-card-hover border-white/30 text-foreground hover:text-foreground hover:border-primary/50",
        secondary:
          "bg-gradient-secondary text-white shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] border-0",
        ghost:
          "hover:glass-card-hover text-foreground hover:text-foreground hover:bg-accent/10",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 hover:scale-105",
        success:
          "bg-gradient-success text-white shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] border-0",
        warning:
          "bg-gradient-warning text-white shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] border-0",
        glass:
          "glass-panel hover:glass-card-hover text-foreground border-white/30 hover:border-primary/50 backdrop-blur-md",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-3xl px-8 text-base font-medium",
        icon: "h-12 w-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <motion.div
        whileHover={{
          scale: variant === "link" || variant === "ghost" ? 1.02 : 1.02,
          y: variant === "link" || variant === "ghost" ? 0 : -2,
        }}
        whileTap={{
          scale: variant === "link" || variant === "ghost" ? 1 : 0.98,
          y: variant === "link" || variant === "ghost" ? 0 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-flex"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        >
          {/* Enhanced shimmer effect for gradient buttons */}
          {(variant === "default" ||
            variant === "destructive" ||
            variant === "secondary" ||
            variant === "success" ||
            variant === "warning") && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-60" />
            </>
          )}

          {/* Glass shimmer effect */}
          {(variant === "glass" || variant === "outline") && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-500 ease-in-out" />
          )}

          {/* Loading spinner with modern design */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Content wrapper */}
          <span
            className={cn(
              "flex items-center gap-2 relative z-10 transition-all duration-200",
              loading && "opacity-0",
            )}
          >
            {children}
          </span>

          {/* Focus glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-md" />
        </Comp>
      </motion.div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
