// Your App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import AuditPage from "./pages/AuditPage";
import Dashboard from "./pages/Dashboard";
import StartAudit from "./pages/StartAudit";
import PreviewAudit from "./pages/PreviewAudit";

// Import the new tracker component
import AnalyticsTracker from "./components/AnalyticsTracker"; // Adjust the path if needed

function App() {
  return (
    <BrowserRouter>
      {/* Add the tracker component here */}
      <AnalyticsTracker />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/audit/:trackingId" element={<AuditPage />} />
        <Route path="/start-audit" element={<StartAudit />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/preview" element={<PreviewAudit />} />
      </Routes>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          // ... your toast options
        }}
      />
    </BrowserRouter>
  );
}

export default App;