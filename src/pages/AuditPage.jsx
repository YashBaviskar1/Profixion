import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { getAuditStatus, generateAuditPDF, downloadPDF } from '../api';
import ReactMarkdown from 'react-markdown';

// Inlined components to resolve import errors
const ScoreCircle = ({ score }) => {
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        {/* Background circle (made darker) */}
        <circle className="text-gray-800" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
        <motion.circle
          className="text-gray-200"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Score text (made much brighter) */}
        <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{score}</span>
        {/* /100 text (made brighter) */}
        <span className="text-lg text-gray-300 mt-1">/100</span>
      </div>
    </div>
  );
};
const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src="/logo.png"
        alt="Profixion Logo"
        className="h-12 w-auto"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x50/000000/FFFFFF?text=PROFIXION'; }}
      />
    </div>
  )
};

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 backdrop-blur-md bg-black/90 border-b border-gray-800/50 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Logo />
          </motion.div>

          <div className="hidden md:flex space-x-8">
            <motion.a
              href="#features"
              className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              href="#how"
              className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              href="#pricing"
              className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>

            <motion.a
              href="#contact"
              className="relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 font-medium group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
};

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 mb-6 max-w-xl text-sm sm:text-base">
              AI-powered social media profile analysis to help you build credibility and improve your online presence.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Profixion. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
};


// Helper components for icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);
const ExclamationIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const LightbulbIcon = () => (
  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
// Added a new icon for the Action Plan
const ActionIcon = () => (
  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);


// Main Audit Page Component

const AuditPage = () => {
  const { trackingId } = useParams(); // Get trackingId from the URL
  const [status, setStatus] = useState('pending'); // 'pending', 'processing', 'completed', 'failed'
  const [report, setReport] = useState(null); // This will hold the JSON object from Gemini
  const [error, setError] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);



  // useEffect to fetch and poll for the audit status
  useEffect(() => {
    if (!trackingId) {
      setError("No tracking ID found in the URL.");
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await getAuditStatus(trackingId);
        const auditData = response.data;
        console.log("Fetched audit data:", auditData);
        if (auditData.status === 'running') {
          setStatus('processing');
        } else if (auditData.status === 'ready') {
          setStatus('completed');
          // ✅ UPDATED: 'audit_report' is now the JSON object.
          // No parsing needed. We set it directly to state.
          
          // 🛑 FIX: 'audit_report' is a STRING, we MUST parse it.
          try {
            const parsedReport = JSON.parse(auditData.audit_report);
            setReport(parsedReport);
          } catch (parseError) {
            console.error("Failed to parse audit report JSON:", parseError);
            setError("Failed to read the audit report. Data might be corrupted.");
          }
        }
      } catch (err) {
        setError('Failed to fetch audit status or audit not found.');
        console.error(err);
      }
    };

    // Initial fetch
    fetchStatus();

    // Polling logic
    const interval = setInterval(() => {
      setStatus(currentStatus => {
        if (currentStatus !== 'completed' && !error) {
          fetchStatus();
        }
        return currentStatus;
      });
    }, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [trackingId, error]); // Add error to dependency array to stop polling on error

  // PDF Download Handler
  const handleDownloadPDF = async () => {
    if (!trackingId) return;

    try {
      setIsGeneratingPDF(true);
      console.log('📄 Generating PDF for audit:', trackingId);

      // Generate PDF
      const response = await generateAuditPDF(trackingId);

      if (response.success) {
        // Download the PDF
        await downloadPDF(response.data.downloadUrl, response.data.filename);
        console.log('✅ PDF downloaded successfully');
      } else {
        throw new Error(response.msg || 'Failed to generate PDF');
      }
    } catch (err) {
      console.error('❌ PDF generation failed:', err);
      // Use a modal or non-blocking notification instead of alert() in a real app
      console.error(`Failed to generate PDF: ${err.message}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Update auditSteps based on the live status
  const auditSteps = [
    { name: 'Profile Submitted', status: 'completed' },
    { name: 'AI Analysis', status: (status === 'processing' || status === 'completed') ? 'completed' : 'pending' },
    { name: 'Generating Report', status: status === 'completed' ? 'completed' : 'pending' },
  ];

  const getStatusIndicator = (stepStatus) => {
    if (stepStatus === 'completed') {
      return <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"><CheckIcon /></div>;
    }
    if (stepStatus === 'processing' || (stepStatus === 'pending' && status === 'processing')) {
      return <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-spin"><div className="w-2 h-2 bg-white rounded-full"></div></div>;
    }
    return <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-center px-6">
          <h1 className="text-2xl text-red-500">{error}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  // --- JSX Rendering ---
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        {/* ... Title and Subtitle section ... */}
        <div className="text-center mb-12">
          {/* ... (Your title/subtitle motion divs) ... */}
        </div>

        {/* Status Tracker */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-700 -translate-y-1/2"></div>
            <div
              className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-gray-500 to-gray-600 -translate-y-1/2 transition-all duration-1000"
              style={{ width: status === 'completed' ? '100%' : (status === 'processing' ? '50%' : '0%') }}
            ></div>
            {auditSteps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center">
                {getStatusIndicator(step.status)}
                <p className={`mt-2 text-sm text-center ${step.status === 'pending' ? 'text-gray-500' : 'text-gray-300'}`}>{step.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area: Processing or Report */}
        <AnimatePresence mode="wait">
          {/* Use `report` state to check for completion */}
          {!report ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* ... (processing animation) ... */}
              <div className="flex justify-center items-center mb-6">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-gray-400 rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-300 mb-2">Analyzing your profile...</h2>
              <p className="text-gray-500">This may take a moment. We're firing up the AI!</p>
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              {/* UPDATED HEADER SECTION */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-6 gap-6">
                {/* Left side: Title and URL */}
              <div className="flex-grow min-w-0 w-full text-center md:text-left">
                    {/* Added: text-2xl (Smaller font on mobile) */}
                    <h2 className="text-4xl sm:text-3xl font-bold text-white break-words leading-tight">
                      Your Audit Report is Ready
                    </h2>
                    {/* Added: break-all (Wraps long URLs nicely), Removed: truncate */}
                    <p className="text-gray-400 mt-2 text-sm sm:text-base break-all">
                      Analysis for: <span className="text-blue-400/80">{report.url}</span>
                    </p>
                </div>
                {/* Right side: ScoreCircle and PDF Button */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2 text-white">Overall Score</h3>
                    {/* ✅ UPDATED: Use `report.overallScore` */}
                    <ScoreCircle score={report.overallScore} />
                  </div>
                  {/* PDF Download Button */}
                  <motion.button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                    whileHover={{ scale: isGeneratingPDF ? 1 : 1.05 }}
                    whileTap={{ scale: isGeneratingPDF ? 1 : 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isGeneratingPDF ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Report (PDF)</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* UPDATED CONTENT SECTION */}
              <div className="space-y-8">
                {/* Strengths */}
                <div>
                  <h3 className="flex items-center text-xl font-semibold mb-3 text-white"><CheckIcon /><span className="ml-2">Strengths</span></h3>
                  <ul className="space-y-2 list-inside text-gray-300">
                    {/* ✅ UPDATED: Use `report.strengths` */}
                    {report.strengths.map((item, i) => <li key={i} className="bg-gray-800/50 p-3 rounded-md"> <ReactMarkdown>{item}</ReactMarkdown></li>)}
                  </ul>
                </div>
                
                {/* Weaknesses (Displayed as 'Areas for Improvement') */}
                <div>
                  <h3 className="flex items-center text-xl font-semibold mb-3 text-white"><ExclamationIcon /><span className="ml-2">Areas for Improvement</span></h3>
                  <ul className="space-y-2 list-inside text-gray-300">
                    {/* ✅ UPDATED: Use `report.weaknesses` */}
                    {report.weaknesses.map((item, i) => <li key={i} className="bg-gray-800/50 p-3 rounded-md"> <ReactMarkdown>{item}</ReactMarkdown></li>)}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="flex items-center text-xl font-semibold mb-3 text-white"><LightbulbIcon /><span className="ml-2">Actionable Recommendations</span></h3>
                  <ul className="space-y-2 list-inside text-gray-300">
                    {/* ✅ UPDATED: Use `report.recommendations` */}
                    {report.recommendations.map((item, i) => <li key={i} className="bg-gray-800/50 p-3 rounded-md"> <ReactMarkdown>{item}</ReactMarkdown></li>)}
                  </ul>
                </div>
                
                {/* ✨ NEW: Action Plan Section */}


              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default AuditPage;


