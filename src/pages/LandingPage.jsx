import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
