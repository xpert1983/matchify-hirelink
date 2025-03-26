
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Vacancies from "./pages/Vacancies";
import VacancyForm from "./pages/VacancyForm";
import Candidates from "./pages/Candidates";
import CandidateForm from "./pages/CandidateForm";
import Matches from "./pages/Matches";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import HiringPipeline from "./components/hiring-funnel/HiringPipeline";
import AdvancedSearch from "./pages/AdvancedSearch";
import CandidateMatch from "./pages/CandidateMatch";
import { lazy, Suspense } from "react";
import Help from "./pages/Help";

// Lazy-loaded pages for better performance
const Analytics = lazy(() => import("./pages/Analytics"));
const Reports = lazy(() => import("./pages/Reports"));
const Calendar = lazy(() => import("./pages/Calendar"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner position="top-center" />
          <HashRouter>
            <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Загрузка...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/vacancies/new" element={<VacancyForm />} />
                <Route path="/vacancies/:id/pipeline" element={<HiringPipeline />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/candidates/new" element={<CandidateForm />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/advanced-search" element={<AdvancedSearch />} />
                <Route path="/candidate-match" element={<CandidateMatch />} />
                <Route path="/profile" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
