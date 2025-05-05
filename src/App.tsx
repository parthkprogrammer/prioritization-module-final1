
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePrioritizationData } from "./hooks/usePrioritizationData";

const queryClient = new QueryClient();

// This is a minimal root component for the prioritization module
// It sets up the context providers and loads initial data
const AppContent = () => {
  const { loadAllData } = usePrioritizationData();
  
  // Load prioritization data on component mount
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);
  
  return (
    <div className="prioritization-module">
      {/* Your module's main content would go here */}
      {/* For example: <TagManagementPage /> */}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
