import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Home,
  Sparkles,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  badge?: string;
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: ReactNode;
    color?: string;
  }>;
  gradient?: boolean;
  compact?: boolean;
}

export function PageHeader({
  title,
  description,
  children,
  className,
  breadcrumbs,
  badge,
  stats,
  gradient = true,
  compact = false,
}: PageHeaderProps) {
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(compact);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Compact Toggle */}
      <motion.div
        className="absolute top-2 right-2 z-10"
        whileHover={{ scale: 1.05 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCompactMode(!isCompactMode)}
          className="h-6 w-6 p-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          {isCompactMode ? (
            <Maximize2 className="h-3 w-3" />
          ) : (
            <Minimize2 className="h-3 w-3" />
          )}
        </Button>
      </motion.div>

      {/* Background gradient overlay - reduced */}
      {gradient && !isCompactMode && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent/3 to-secondary/3 rounded-2xl opacity-50" />
      )}

      <Card
        className={cn(
          "relative border-0 shadow-sm bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl transition-all duration-300 rounded-2xl hover:shadow-md",
          isCompactMode
            ? "shadow-sm hover:shadow-sm"
            : "shadow-sm hover:shadow-md"
        )}
      >
        <div
          className={cn(
            "transition-all duration-300",
            isCompactMode ? "p-1" : "p-2 md:p-3"
          )}
        >
          {/* Breadcrumbs - Compact */}
          {breadcrumbs && breadcrumbs.length > 0 && !isCompactMode && (
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5"
            >
              <Home className="h-3 w-3" />
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-1">
                  <ChevronRight className="h-2 w-2" />
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-primary transition-colors font-medium"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </motion.nav>
          )}

          <div
            className={cn(
              "flex items-center justify-between gap-1",
              isCompactMode ? "flex-row" : "flex-col lg:flex-row lg:items-start"
            )}
          >
            {/* Title and description section - Compact */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1.5 mb-0"
              >
                <div className="relative">
                  <h1
                    className={cn(
                      "font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight",
                      isCompactMode
                        ? "text-base md:text-lg"
                        : "text-lg md:text-xl"
                    )}
                  >
                    {title}
                  </h1>
                  {/* Sparkle decoration - smaller */}
                  {!isCompactMode && (
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-1 -right-1 text-primary/50"
                    >
                      <Sparkles className="h-2 w-2" />
                    </motion.div>
                  )}
                </div>

                {badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary font-semibold text-xs rounded-2xl"
                    >
                      {badge}
                    </Badge>
                  </motion.div>
                )}
              </motion.div>

              {description && !isCompactMode && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-muted-foreground leading-relaxed max-w-2xl mt-0.5"
                >
                  {description}
                </motion.p>
              )}

              {/* Compact description - only first part */}
              {description && isCompactMode && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-muted-foreground truncate max-w-md mt-0.5"
                >
                  {description.split(".")[0]}...
                </motion.p>
              )}
            </div>

            {/* Actions section - Compact */}
            {children && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-shrink-0"
              >
                <div
                  className={cn(
                    "flex gap-1",
                    isCompactMode ? "flex-row" : "flex-wrap"
                  )}
                >
                  {children}
                </div>
              </motion.div>
            )}
          </div>

          {/* Enhanced Stats section - Horizontal and Collapsible */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                "transition-all duration-300",
                isCompactMode ? "mt-0.5" : "mt-1",
                !isStatsExpanded && isCompactMode && "overflow-hidden"
              )}
            >
              {/* Stats Toggle Button for Compact Mode */}
              {isCompactMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsStatsExpanded(!isStatsExpanded)}
                  className="w-full h-5 mb-1 text-xs font-medium hover:bg-primary/5 justify-between rounded-2xl"
                >
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Quick Stats</span>
                    <Badge
                      variant="outline"
                      className="text-xs px-1 py-0 rounded-2xl"
                    >
                      {stats.length}
                    </Badge>
                  </div>
                  {isStatsExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Button>
              )}

              <AnimatePresence>
                {(!isCompactMode || isStatsExpanded) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "grid gap-1",
                      isCompactMode
                        ? "grid-cols-2 sm:grid-cols-4"
                        : "grid-cols-2 md:grid-cols-4"
                    )}
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="relative group"
                      >
                        <div
                          className={cn(
                            "rounded-2xl bg-gradient-to-br from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/15 transition-all duration-200 border border-border/20 hover:border-primary/20",
                            isCompactMode ? "p-1" : "p-1.5"
                          )}
                        >
                          <div className="flex items-center gap-1">
                            {stat.icon && (
                              <div
                                className={cn(
                                  "rounded-2xl text-white shadow-sm flex-shrink-0",
                                  stat.color
                                    ? `bg-gradient-to-br ${stat.color}`
                                    : "bg-gradient-primary",
                                  isCompactMode ? "p-0.5" : "p-1"
                                )}
                              >
                                <div
                                  className={isCompactMode ? "scale-75" : ""}
                                >
                                  {stat.icon}
                                </div>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div
                                className={cn(
                                  "font-bold text-foreground",
                                  isCompactMode ? "text-sm" : "text-base"
                                )}
                              >
                                {stat.value}
                              </div>
                              <div
                                className={cn(
                                  "text-muted-foreground font-medium uppercase tracking-wide truncate",
                                  isCompactMode ? "text-xs" : "text-xs"
                                )}
                              >
                                {stat.label}
                              </div>
                            </div>
                          </div>

                          {/* Subtle hover effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inline Stats for Ultra Compact Mode */}
              {isCompactMode && !isStatsExpanded && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                >
                  {stats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="flex items-center gap-0.5">
                      {stat.icon && <div className="scale-75">{stat.icon}</div>}
                      <span className="font-semibold text-foreground">
                        {stat.value}
                      </span>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                  {stats.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsStatsExpanded(true)}
                      className="h-4 px-1 text-xs rounded-2xl"
                    >
                      +{stats.length - 3} more
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Decorative elements - reduced */}
        {!isCompactMode && (
          <>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-2xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/5 to-success/5 rounded-2xl blur-xl opacity-20 pointer-events-none" />
          </>
        )}
      </Card>
    </motion.div>
  );
}
