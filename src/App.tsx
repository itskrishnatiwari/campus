
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import BuzzBoardPage from "./pages/BuzzBoardPage";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

const App = () => {
  // In a real app, userRole would come from an auth context
  const userRole = 'student';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes - would normally be guarded by auth */}
            <Route element={<MainLayout userRole={userRole} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/buzzboard" element={<BuzzBoardPage />} />
              <Route path="/chat" element={<ChatPage />} />
              {/* Additional routes would be added here */}
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
