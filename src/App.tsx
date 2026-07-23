import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import PlansPricing from "./pages/PlansPricing";
import Audit from "./pages/Audit";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./components/CaseStudy";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQs from "./pages/FAQs";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import PaymentStatus from "./pages/PaymentStatus";
import AdminDashboard from "./pages/AdminDashboard";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from 'react-helmet';

const queryClient = new QueryClient();

const App = () => (
  <>
    <Helmet>
      <title>Media Levelling - Digital Media Solutions for Business Growth</title>
      <meta name="description" content="Media Levelling offers expert digital media solutions, including SEO, content strategy, social media management, and creative campaigns to help your business grow online." />
      <meta property="og:title" content="Media Levelling - Digital Media Solutions for Business Growth" />
      <meta property="og:description" content="Media Levelling offers expert digital media solutions, including SEO, content strategy, social media management, and creative campaigns to help your business grow online." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://medialevelling.com/" />
      <meta property="og:image" content="/public/bg.jpeg" />
      <meta property="og:site_name" content="Media Levelling" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@medialevelling" />
      <meta name="twitter:title" content="Media Levelling - Digital Media Solutions for Business Growth" />
      <meta name="twitter:description" content="Media Levelling offers expert digital media solutions, including SEO, content strategy, social media management, and creative campaigns to help your business grow online." />
      <meta name="twitter:image" content="/public/bg.jpeg" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/pricing" element={<PageTransition><PlansPricing /></PageTransition>} />
            <Route path="/audit" element={<PageTransition><Audit /></PageTransition>} />
            <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
            <Route path="/case-studies/:id" element={<PageTransition><CaseStudy /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
            <Route path="/faqs" element={<PageTransition><FAQs /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/payment-status/:orderId" element={<PageTransition><PaymentStatus /></PageTransition>} />
            <Route path="/mrshahidbabu" element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="/admin/orders" element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
