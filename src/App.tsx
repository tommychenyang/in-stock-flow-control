import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Procurement from "./pages/Procurement";
import Sales from "./pages/Sales";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/MainLayout";

const queryClient = new QueryClient();

// Placeholder component for modules not yet implemented
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
        🚧
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground">This module will be implemented next</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/suppliers" element={<MainLayout><Suppliers /></MainLayout>} />
          <Route path="/procurement" element={<MainLayout><Procurement /></MainLayout>} />
          <Route path="/sales" element={<MainLayout><Sales /></MainLayout>} />
          <Route path="/inventory" element={<MainLayout><ComingSoon title="Inventory Updates" /></MainLayout>} />
          <Route path="/quotations" element={<MainLayout><ComingSoon title="Quotations & Inquiries" /></MainLayout>} />
          <Route path="/audit" element={<MainLayout><ComingSoon title="Audit Logs" /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><ComingSoon title="User Management" /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
