import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Building,
  Clock,
  Target,
  Award,
  BarChart3,
  Activity,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const quickStats = [
    {
      label: "Total Employees",
      value: "248",
      icon: <Users className="h-4 w-4" />,
      color: "from-primary/80 to-primary/60",
      change: "+12%",
      changeType: "positive",
    },
    {
      label: "Active Projects",
      value: "42",
      icon: <Target className="h-4 w-4" />,
      color: "from-success/80 to-success/60",
      change: "+8%",
      changeType: "positive",
    },
    {
      label: "Monthly Payroll",
      value: "₹2.4Cr",
      icon: <DollarSign className="h-4 w-4" />,
      color: "from-warning/80 to-warning/60",
      change: "+5%",
      changeType: "positive",
    },
    {
      label: "Performance",
      value: "94%",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "from-accent/80 to-accent/60",
      change: "+2%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      title: "Employee Management",
      description:
        "Manage employee data, profiles, and organizational structure",
      icon: <Users className="h-6 w-6" />,
      href: "/employees",
      color: "from-primary/10 to-primary/5",
      borderColor: "border-primary/20",
      stats: "248 Active",
    },
    {
      title: "Attendance Tracking",
      description: "Monitor attendance, leaves, and working hours",
      icon: <Calendar className="h-6 w-6" />,
      href: "/attendance",
      color: "from-success/10 to-success/5",
      borderColor: "border-success/20",
      stats: "96% Today",
    },
    {
      title: "Payroll Management",
      description: "Process payroll, manage salary structures and calculations",
      icon: <DollarSign className="h-6 w-6" />,
      href: "/payroll",
      color: "from-warning/10 to-warning/5",
      borderColor: "border-warning/20",
      stats: "Due: 15th",
    },
    {
      title: "Performance Analytics",
      description: "Track performance metrics and employee development",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/salary-structure",
      color: "from-accent/10 to-accent/5",
      borderColor: "border-accent/20",
      stats: "94% Avg",
    },
  ];

  const recentActivities = [
    {
      type: "payroll",
      title: "Payroll processed for March 2024",
      description: "Successfully processed salary for 248 employees",
      time: "2 hours ago",
      status: "completed",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    },
    {
      type: "employee",
      title: "New employee onboarding",
      description: "5 new employees joined the Technology department",
      time: "4 hours ago",
      status: "in-progress",
      icon: <Users className="h-4 w-4 text-blue-600" />,
    },
    {
      type: "alert",
      title: "Attendance alert",
      description: "12 employees marked late today",
      time: "6 hours ago",
      status: "warning",
      icon: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    },
    {
      type: "system",
      title: "System backup completed",
      description: "Daily backup of payroll data completed successfully",
      time: "8 hours ago",
      status: "completed",
      icon: <Shield className="h-4 w-4 text-green-600" />,
    },
  ];

  const upcomingTasks = [
    {
      title: "Monthly Payroll Processing",
      dueDate: "April 15, 2024",
      priority: "high",
      progress: 75,
      department: "Finance",
    },
    {
      title: "Performance Review Cycle",
      dueDate: "April 20, 2024",
      priority: "medium",
      progress: 45,
      department: "HR",
    },
    {
      title: "Tax Filing Preparation",
      dueDate: "April 30, 2024",
      priority: "high",
      progress: 20,
      department: "Finance",
    },
    {
      title: "Employee Training Schedule",
      dueDate: "May 5, 2024",
      priority: "low",
      progress: 10,
      department: "HR",
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome to JNET Payroll Pro - Your comprehensive solution for modern payroll management and employee lifecycle."
        breadcrumbs={[{ label: "Dashboard" }]}
        badge="Pro"
        stats={quickStats}
        compact={true}
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-primary/10"
            onClick={() => navigate("/reports")}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 hover:bg-secondary/80"
            onClick={() => navigate("/settings")}
          >
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Setup</span>
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-gradient-primary hover:opacity-90 shadow-lg"
            onClick={() => navigate("/employees")}
          >
            <PlayCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group"
                >
                  <Card
                    className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${action.color} ${action.borderColor} border`}
                    onClick={() => navigate(action.href)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-xl transition-shadow">
                          {action.icon}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {action.stats}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {action.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          Click to manage
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-success">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Recent Activities
              </h2>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-card/95 to-card/80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              activity.status === "completed"
                                ? "border-green-200 text-green-600"
                                : activity.status === "warning"
                                  ? "border-yellow-200 text-yellow-600"
                                  : "border-blue-200 text-blue-600"
                            }`}
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    className="w-full justify-between hover:bg-primary/10"
                    onClick={() => navigate("/activities")}
                  >
                    <span>View all activities</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar - Upcoming Tasks & System Status */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-warning">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Upcoming Tasks
              </h2>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-card/95 to-card/80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm text-foreground">
                          {task.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            task.priority === "high"
                              ? "border-red-200 text-red-600"
                              : task.priority === "medium"
                                ? "border-yellow-200 text-yellow-600"
                                : "border-green-200 text-green-600"
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">
                        Due: {task.dueDate}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-xs font-semibold">
                            {task.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              task.priority === "high"
                                ? "bg-gradient-to-r from-red-500 to-pink-500"
                                : task.priority === "medium"
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            transition={{ duration: 1, delay: 1 + index * 0.2 }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {task.department}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-secondary">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                System Status
              </h2>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-card/95 to-card/80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">
                        All Systems Operational
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-200 text-green-600 text-xs"
                    >
                      100%
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Database
                      </span>
                      <Badge
                        variant="outline"
                        className="border-green-200 text-green-600 text-xs"
                      >
                        Online
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        API Services
                      </span>
                      <Badge
                        variant="outline"
                        className="border-green-200 text-green-600 text-xs"
                      >
                        Online
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Backup System
                      </span>
                      <Badge
                        variant="outline"
                        className="border-green-200 text-green-600 text-xs"
                      >
                        Online
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Last Backup
                      </span>
                      <span className="text-xs font-semibold">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
