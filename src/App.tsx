import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DemoPortals from "./pages/DemoPortals";
import NotFound from "./pages/NotFound";

// Farmer Portal
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerAdvisory from "./pages/farmer/FarmerAdvisory";
import FarmerCooperatives from "./pages/farmer/FarmerCooperatives";
import FarmerVouchers from "./pages/farmer/FarmerVouchers";
import FarmerProduce from "./pages/farmer/FarmerProduce";
import FarmerNotifications from "./pages/farmer/FarmerNotifications";

// NGO Portal
import NGODashboard from "./pages/ngo/NGODashboard";
import NGOFarmerLookup from "./pages/ngo/NGOFarmerLookup";
import NGOCooperatives from "./pages/ngo/NGOCooperatives";
import NGOVouchers from "./pages/ngo/NGOVouchers";
import NGOCommunications from "./pages/ngo/NGOCommunications";
import NGOReports from "./pages/ngo/NGOReports";

// Vendor Portal
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorRedemptions from "./pages/vendor/VendorRedemptions";
import VendorSales from "./pages/vendor/VendorSales";
import VendorReports from "./pages/vendor/VendorReports";

// Buyer/Aggregator Portal
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerMarketplace from "./pages/buyer/BuyerMarketplace";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerLogistics from "./pages/buyer/BuyerLogistics";
import BuyerReports from "./pages/buyer/BuyerReports";

// Bank Portal
import BankDashboard from "./pages/bank/BankDashboard";
import BankFarmers from "./pages/bank/BankFarmers";
import BankCooperatives from "./pages/bank/BankCooperatives";
import BankVSLAs from "./pages/bank/BankVSLAs";
import BankOutgrower from "./pages/bank/BankOutgrower";
import BankPrograms from "./pages/bank/BankPrograms";
import BankReports from "./pages/bank/BankReports";

// Government Portal
import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import GovernmentRegions from "./pages/government/GovernmentRegions";
import GovernmentFarmers from "./pages/government/GovernmentFarmers";
import GovernmentPrograms from "./pages/government/GovernmentPrograms";
import GovernmentReports from "./pages/government/GovernmentReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo" element={<DemoPortals />} />
          
          {/* Farmer Portal Routes */}
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/profile" element={<FarmerProfile />} />
          <Route path="/farmer/advisory" element={<FarmerAdvisory />} />
          <Route path="/farmer/cooperatives" element={<FarmerCooperatives />} />
          <Route path="/farmer/vouchers" element={<FarmerVouchers />} />
          <Route path="/farmer/produce" element={<FarmerProduce />} />
          <Route path="/farmer/notifications" element={<FarmerNotifications />} />
          
{/* NGO Portal Routes */}
          <Route path="/ngo" element={<NGODashboard />} />
          <Route path="/ngo/beneficiaries" element={<NGOFarmerLookup />} />
          <Route path="/ngo/farmers" element={<NGOFarmerLookup />} />
          <Route path="/ngo/cooperatives" element={<NGOCooperatives />} />
          <Route path="/ngo/vouchers" element={<NGOVouchers />} />
          <Route path="/ngo/communications" element={<NGOCommunications />} />
          <Route path="/ngo/reports" element={<NGOReports />} />
          
          {/* Vendor Portal Routes */}
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/redemptions" element={<VendorRedemptions />} />
          <Route path="/vendor/sales" element={<VendorSales />} />
          <Route path="/vendor/reports" element={<VendorReports />} />
          
          {/* Buyer/Aggregator Portal Routes */}
          <Route path="/buyer" element={<BuyerDashboard />} />
          <Route path="/buyer/marketplace" element={<BuyerMarketplace />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/logistics" element={<BuyerLogistics />} />
          <Route path="/buyer/reports" element={<BuyerReports />} />
          
          {/* Bank Portal Routes */}
          <Route path="/bank" element={<BankDashboard />} />
          <Route path="/bank/farmers" element={<BankFarmers />} />
          <Route path="/bank/cooperatives" element={<BankCooperatives />} />
          <Route path="/bank/vslas" element={<BankVSLAs />} />
          <Route path="/bank/outgrower" element={<BankOutgrower />} />
          <Route path="/bank/programs" element={<BankPrograms />} />
          <Route path="/bank/reports" element={<BankReports />} />
          
          {/* Government Portal Routes */}
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="/government/regions" element={<GovernmentRegions />} />
          <Route path="/government/farmers" element={<GovernmentFarmers />} />
          <Route path="/government/programs" element={<GovernmentPrograms />} />
          <Route path="/government/reports" element={<GovernmentReports />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
