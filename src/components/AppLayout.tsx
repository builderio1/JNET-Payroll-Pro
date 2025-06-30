import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  Settings,
  FileText,
  TrendingUp,
  Calculator,
  Upload,
  CreditCard,
  BarChart3,
  Menu,
  Bell,
  User,
  Search,
  LogOut,
  ChevronRight,
  Home,
  X,
  Moon,
  Sun,
  Monitor,
  BellRing,
  Check,
  UserCircle,
  Shield,
  HelpCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle, useThemeContext } from "@/components/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  {
    title: "Employee Information",
    path: "/employees",
    icon: Users,
    description: "Manage employee data and profiles",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: Calendar,
    description: "Track employee attendance and leaves",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Salary Structure",
    path: "/salary-structure",
    icon: Settings,
    description: "Configure salary structures and components",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Payhead Master",
    path: "/payheads",
    icon: FileText,
    description: "Manage earning and deduction payheads",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Additional Pay Components",
    path: "/adjustments",
    icon: Calculator,
    description: "Process salary adjustments and corrections",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Variable Pay",
    path: "/variable-pay",
    icon: TrendingUp,
    description: "Manage quarterly variable pay tracking",
    color: "from-teal-500 to-green-500",
  },
  {
    title: "TDS Upload",
    path: "/tds-upload",
    icon: Upload,
    description: "Upload and manage TDS data",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "PT Configuration",
    path: "/pt-config",
    icon: CreditCard,
    description: "Configure Professional Tax settings",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Pay Schedule",
    path: "/pay-schedule",
    icon: Calendar,
    description: "Manage payroll schedule and calendar",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Payroll Runs",
    path: "/payroll-runs",
    icon: BarChart3,
    description: "Execute and monitor payroll processing",
    color: "from-emerald-500 to-teal-500",
  },
];

const sidebarVariants = {
  iconOnly: {
    width: "80px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  expanded: {
    width: "280px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  mobileOpen: {
    width: "280px",
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  mobileClosed: {
    width: "280px",
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export function AppLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Enhanced Theme Toggle Component
  function EnhancedThemeToggle() {
    const themeContext = useThemeContext();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative glass-card-hover rounded-xl h-10 w-10 hover:bg-primary/10 transition-all duration-200"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="glass-card border-white/20 shadow-2xl"
        >
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => themeContext.setTheme("light")}
            className="hover:bg-primary/10 cursor-pointer"
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
            {themeContext.theme === "light" && (
              <Check className="ml-auto h-3 w-3" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => themeContext.setTheme("dark")}
            className="hover:bg-primary/10 cursor-pointer"
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
            {themeContext.theme === "dark" && (
              <Check className="ml-auto h-3 w-3" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => themeContext.setTheme("system")}
            className="hover:bg-primary/10 cursor-pointer"
          >
            <Monitor className="mr-2 h-4 w-4" />
            System
            {themeContext.theme === "system" && (
              <Check className="ml-auto h-3 w-3" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Enhanced Notifications Component
  function NotificationsDropdown() {
    const [unreadCount, setUnreadCount] = useState(3);

    const notifications = [
      {
        notificationId: 1,
        title: "Payroll Processing Complete",
        description: "March 2024 payroll has been successfully processed",
        time: "2 hours ago",
        type: "success",
        read: false,
      },
      {
        notificationId: 2,
        title: "New Employee Onboarding",
        description: "5 new employees need document verification",
        time: "4 hours ago",
        type: "info",
        read: false,
      },
      {
        notificationId: 3,
        title: "Attendance Alert",
        description: "12 employees marked late today",
        time: "6 hours ago",
        type: "warning",
        read: false,
      },
      {
        notificationId: 4,
        title: "System Backup Completed",
        description: "Daily backup completed successfully",
        time: "8 hours ago",
        type: "success",
        read: true,
      },
    ];

    const markAllAsRead = () => {
      setUnreadCount(0);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative glass-card-hover rounded-xl h-10 w-10 hover:bg-primary/10 transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-gradient-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg font-semibold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 glass-card border-white/20 shadow-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <DropdownMenuLabel className="text-base font-bold">
              Notifications
            </DropdownMenuLabel>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs hover:bg-primary/10"
              >
                Mark all read
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <motion.div
                key={notification.notificationId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "p-4 border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer",
                  !notification.read && "bg-primary/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                      notification.type === "success" && "bg-green-500",
                      notification.type === "warning" && "bg-yellow-500",
                      notification.type === "info" && "bg-blue-500"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground mb-1">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-3 border-t border-border/50">
            <Button
              variant="ghost"
              className="w-full justify-center text-sm hover:bg-primary/10"
            >
              View all notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Enhanced Profile Dropdown
  function ProfileDropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-xl glass-card-hover hover:bg-primary/10 transition-all duration-200"
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/20 shadow-lg">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Admin User"
                />
                <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 glass-card border-white/20 shadow-2xl"
        >
          {/* Profile Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-primary/20 shadow-lg">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                  alt="Admin User"
                />
                <AvatarFallback className="bg-gradient-primary text-white font-bold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@jnetpayroll.com
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600 font-medium">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer p-3">
              <UserCircle className="mr-3 h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium text-sm">My Profile</div>
                <div className="text-xs text-muted-foreground">
                  View and edit profile
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer p-3">
              <Settings className="mr-3 h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium text-sm">Settings</div>
                <div className="text-xs text-muted-foreground">
                  App preferences
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer p-3">
              <Shield className="mr-3 h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium text-sm">Security</div>
                <div className="text-xs text-muted-foreground">
                  Password & 2FA
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-primary/10 cursor-pointer p-3">
              <HelpCircle className="mr-3 h-4 w-4" />
              <div className="flex-1">
                <div className="font-medium text-sm">Help & Support</div>
                <div className="text-xs text-muted-foreground">
                  Get assistance
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Upgrade Section */}
          <div className="p-3">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Pro Plan</span>
                <Badge
                  variant="secondary"
                  className="text-xs bg-gradient-primary text-white"
                >
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Advanced features enabled
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full h-7 text-xs hover:bg-primary/10"
              >
                Manage Plan
              </Button>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer p-3">
            <LogOut className="mr-3 h-4 w-4" />
            <div className="flex-1">
              <div className="font-medium text-sm">Sign Out</div>
              <div className="text-xs text-muted-foreground">
                Logout from account
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Floating Top Bar Component
  function FloatingTopBar() {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 right-4 z-[100] flex items-center gap-2"
      >
        <div className="flex items-center gap-2 glass-card p-2 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl">
          <EnhancedThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          <NotificationsDropdown />
          <Separator orientation="vertical" className="h-6" />
          <ProfileDropdown />
        </div>
      </motion.div>
    );
  }

  // Check if mobile and set initial state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        // On desktop, always start with icon-only sidebar
        setSidebarExpanded(false);
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem?.title || "Dashboard";
  };

  const handleBurgerClick = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  const getSidebarVariant = () => {
    if (isMobile) {
      return mobileMenuOpen ? "mobileOpen" : "mobileClosed";
    }
    return sidebarExpanded ? "expanded" : "iconOnly";
  };

  const showText = () => {
    return isMobile ? mobileMenuOpen : sidebarExpanded;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-light dark:bg-gradient-dark">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-animated opacity-5 pointer-events-none" />

      {/* Floating Top Bar */}
      <FloatingTopBar />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={getSidebarVariant()}
        className={cn(
          "relative flex flex-col glass-panel border-r-0 shadow-2xl z-50 overflow-hidden",
          isMobile ? "fixed inset-y-0 left-0" : "rounded-r-3xl m-2 mr-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {showText() && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <h1 className="text-xl font-bold gradient-text">JNET</h1>
                  <p className="text-xs text-muted-foreground">Payroll Pro</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Burger Menu - Always visible */}
            <motion.button
              onClick={handleBurgerClick}
              className="p-2 rounded-xl glass-card-hover transition-all duration-200 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobile && mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "group relative flex items-center rounded-2xl p-3 transition-all duration-200 hover:scale-[1.02]",
                    isActive
                      ? "bg-gradient-primary text-white shadow-lg"
                      : "hover:glass-card-hover text-foreground hover:bg-primary/10"
                  )}
                  title={!showText() ? item.title : undefined}
                >
                  {/* Icon Container */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 flex-shrink-0",
                      isActive
                        ? "bg-gradient-to-br " +
                            item.color +
                            " text-white shadow-lg"
                        : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Text Content */}
                  <AnimatePresence>
                    {showText() && (
                      <motion.div
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 min-w-0 overflow-hidden whitespace-nowrap"
                      >
                        <div className="font-semibold text-sm truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-current/70 truncate">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className={cn(
                        "absolute w-1 h-8 bg-white rounded-full",
                        showText() ? "right-2" : "right-1"
                      )}
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Tooltip for icon-only mode */}
                  {!showText() && !isMobile && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.title}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45"></div>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-white/10">
          <AnimatePresence>
            {showText() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <p className="text-xs text-muted-foreground">
                  © 2025 JNET Payroll Pro
                </p>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Hidden as requested */}
        <header
          className="glass-card border-b-0 rounded-none md:rounded-b-3xl mx-0 md:mx-2 mt-0 md:mt-2 shadow-lg z-30"
          style={{ display: "none" }}
        >
          <div className="flex items-center justify-between p-3 md:p-4">
            {/* Mobile Menu Button & Title */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBurgerClick}
                className="md:hidden glass-card-hover rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div>
                <h2 className="text-base md:text-lg font-bold text-foreground">
                  {getCurrentPageTitle()}
                </h2>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Welcome back, manage your payroll efficiently
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative glass-card-hover rounded-xl h-9 w-9"
                >
                  <Bell className="h-4 w-4" />
                  <motion.span
                    className="absolute -top-1 -right-1 bg-gradient-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    3
                  </motion.span>
                </Button>
              </motion.div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-xl glass-card-hover"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/api/placeholder/40/40" alt="User" />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold text-xs">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 glass-card border-white/30"
                  align="end"
                  forceMount
                >
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@jnet.com
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-primary/10 text-sm">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/10 text-sm">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive hover:bg-destructive/10 text-sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 md:p-4 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
