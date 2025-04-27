
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import RetailersPage from './pages/Retailers';
import Master from "./pages/Master";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/master" element={
            <DashboardLayout>
              <Master />
            </DashboardLayout>
          } />
          <Route
             path="/retailers"
              element={
                <DashboardLayout>
                <RetailersPage />
              </DashboardLayout>
              }
            />

          <Route path="/partners" element={
            <DashboardLayout>
              <div className="p-8">Partners Page (Under Construction)</div>
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <div className="p-8">Settings Page (Under Construction)</div>
            </DashboardLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
