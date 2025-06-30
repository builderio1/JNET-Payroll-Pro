import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppLayout } from "./components/AppLayout";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import SalaryStructure from "./pages/SalaryStructure";
import PayheadMaster from "./pages/PayheadMaster";
import Adjustments from "./pages/Adjustments";
import VariablePay from "./pages/VariablePay";
import PTConfig from "./pages/PTConfig";
import StatutorySettings from "./pages/StatutorySettings";
import PaySchedule from "./pages/PaySchedule";
import TDSUpload from "./pages/TDSUpload";
import PayrollRuns from "./pages/PayrollRuns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

// Animated Routes wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/employees" replace />} />
          <Route
            path="employees"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Employees />
              </motion.div>
            }
          />
          <Route
            path="attendance"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Attendance />
              </motion.div>
            }
          />
          <Route
            path="salary-structure"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <SalaryStructure />
              </motion.div>
            }
          />
          <Route
            path="payheads"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PayheadMaster />
              </motion.div>
            }
          />
          <Route
            path="adjustments"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Adjustments />
              </motion.div>
            }
          />
          <Route
            path="variable-pay"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <VariablePay />
              </motion.div>
            }
          />
          <Route
            path="pt-config"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PTConfig />
              </motion.div>
            }
          />
          <Route
            path="statutory-settings"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <StatutorySettings />
              </motion.div>
            }
          />
          <Route
            path="pay-schedule"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PaySchedule />
              </motion.div>
            }
          />
          <Route
            path="tds-upload"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <TDSUpload />
              </motion.div>
            }
          />
          <Route
            path="payroll"
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <PayrollRuns />
              </motion.div>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="jnet-payroll-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </motion.div>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
