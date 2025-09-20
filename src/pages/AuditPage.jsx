import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom'; // ✅ ADD THIS LINE
import { getAuditStatus } from '../api';
// Inlined components to resolve import errors

const ScoreCircle = ({ score }) => {
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

  return (
      <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
              <motion.circle
                  className="text-gray-400"
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
              <span className="text-4xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">{score}</span>
              <span className="text-lg text-gray-400 mt-1">/100</span>
          </div>
      </div>
  );
};
const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Logo container with L-shaped corner brackets */}
        <div className="relative px-4 py-2">
          {/* Top left corner bracket */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white"></div>
          {/* Top right corner bracket */}
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white"></div>
          {/* Bottom left corner bracket */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white"></div>
          {/* Bottom right corner bracket */}
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white"></div>
          
          {/* Logo text */}
          <div className="text-center">
            <div className="text-lg font-bold text-white tracking-wide">PROFIXION</div>
            <div className="text-xs text-white tracking-wider">FIX.POLISH.SHINE ONLINE</div>
          </div>
        </div>
      </div>
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
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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

// In AuditPage.jsx

  // A more robust function to parse the Markdown report
  const parseAuditReport = (markdownText) => {
    if (!markdownText) return null;

    const reportData = {
      overallScore: 0,
      strengths: [],
      weaknesses: [],
      recommendations: [],
    };

    // Extract Score
    const scoreMatch = markdownText.match(/Overall Score:.*?(\d+)/i);
    if (scoreMatch) {
      reportData.overallScore = parseInt(scoreMatch[1], 10);
    }

    // This new function is better at finding the content between titles
    const extractSection = (startTitle, endTitles) => {
      // Create a regex to find the block of text for the section
      const startRegex = new RegExp(`\\*\\*${startTitle}\\*\\*`, 'i');
      const contentMatch = markdownText.split(startRegex)[1];
      
      if (!contentMatch) return [];

      // Figure out where this section ends
      let sectionContent = contentMatch;
      for (const endTitle of endTitles) {
        const endRegex = new RegExp(`\\*\\*${endTitle}\\*\\*`, 'i');
        if (sectionContent.includes(endTitle)) {
           sectionContent = sectionContent.split(endRegex)[0];
        }
      }

      return sectionContent
        .split('\n')
        .map(item => item.trim().replace(/^[\*\-]\s*/, '')) // Remove bullets and trim
        .filter(item => item); // Filter out empty lines
    };

    // Define the titles that mark the start and end of each section
    reportData.strengths = extractSection('Strengths', ['Weaknesses', 'Recommendations']);
    reportData.weaknesses = extractSection('Weaknesses', ['Strengths', 'Recommendations']);
    reportData.recommendations = extractSection('Recommendations', ['Strengths', 'Weaknesses']);
    
    return reportData;
  };

// Main Audit Page Component

const AuditPage = () => {
  const { trackingId } = useParams(); // Get trackingId from the URL
  const [status, setStatus] = useState('pending'); // 'pending', 'processing', 'completed', 'failed'
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  // 3. Helper function to parse the Markdown report from Gemini
  const parseAuditReport = (markdownText) => {
    if (!markdownText) return null;

    const reportData = {
      overallScore: 0,
      strengths: [],
      weaknesses: [],
      recommendations: [],
    };

    // Extract Score
    const scoreMatch = markdownText.match(/Overall Score:.*?(\d+)/i);
    if (scoreMatch) {
      reportData.overallScore = parseInt(scoreMatch[1], 10);
    }

    // Function to extract list items from a section
    const extractSection = (title) => {
      const regex = new RegExp(`\\*\\*${title}:\\*\\*([\\s\\S]*?)(?=\\n\\*\\*|$)`, 'i');
      const match = markdownText.match(regex);
      if (match && match[1]) {
        return match[1]
          .split('\n')
          .map(item => item.trim().replace(/^[\*\-]\s*/, '')) // Remove bullets and trim
          .filter(item => item); // Filter out empty lines
      }
      return [];
    };

    reportData.strengths = extractSection('Strengths');
    reportData.weaknesses = extractSection('Weaknesses');
    // Handle different possible titles for recommendations
    reportData.recommendations = extractSection('Recommendations|Actionable Recommendations');
    
    return reportData;
  };


  // 4. useEffect to fetch and poll for the audit status
  useEffect(() => {
    if (!trackingId) {
      setError("No tracking ID found in the URL.");
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await getAuditStatus(trackingId);
        const auditData = response.data;
        
        if (auditData.status === 'running') {
          setStatus('processing');
        } else if (auditData.status === 'ready') {
          setStatus('completed');
          // Parse the report and set it in state
          const parsedReport = parseAuditReport(auditData.audit_report);
          setReport({ ...parsedReport, profileUrl: auditData.profile_url });
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
      // Use a function form of setStatus to check the current status
      // This prevents the interval from running with stale state
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

  // --- The rest of your JSX is almost perfect! Just a few minor tweaks. ---
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        {/* ... Title and Subtitle section ... no changes needed */}
        <div className="text-center mb-12">
            {/* ... */}
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
                        {/* 5. Simplified status indicator logic */}
                        {getStatusIndicator(step.status)}
                        <p className={`mt-2 text-sm text-center ${step.status === 'pending' ? 'text-gray-500' : 'text-gray-300'}`}>{step.name}</p>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Content Area: Processing or Report */}
        <AnimatePresence mode="wait">
          {/* 6. Use `report` state to check for completion */}
          {!report ? (
            <motion.div
              key="processing"
              /* ... no changes in motion div ... */
            >
                {/* ... processing animation ... */}
            </motion.div>
          ) : (
// In AuditPage.jsx, inside the return statement

            <motion.div
              key="report"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl"
            >
              {/* UPDATED HEADER SECTION */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-6 gap-6">
                {/* Left side: Title and URL */}
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold text-white">Your Audit Report is Ready</h2>
                  <p className="text-gray-400 truncate">Analysis for: {report.profileUrl}</p>
                </div>
                {/* Right side: ScoreCircle */}
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2 text-white">Overall Score</h3>
                    <ScoreCircle score={report.overallScore} />
                </div>
              </div>

              {/* UPDATED CONTENT SECTION */}
              <div className="space-y-8">
                {/* Strengths */}
                <div>
                  <h3 className="flex items-center text-xl font-semibold mb-3 text-white"><CheckIcon /><span className="ml-2">Strengths</span></h3>
                  <ul className="space-y-2 list-inside text-gray-300">
                    {report.strengths.map((item, i) => <li key={i} className="bg-gray-800/50 p-3 rounded-md">{item}</li>)}
                  </ul>
                </div>
                {/* Weaknesses */}
                <div>
                  <h3 className="flex items-center text-xl font-semibold mb-3 text-white"><ExclamationIcon /><span className="ml-2">Areas for Improvement</span></h3>
                  <ul className="space-y-2 list-inside text-gray-300">
                    {report.weaknesses.map((item, i) => <li key={i} className="bg-gray-800/50 p-3 rounded-md">{item}</li>)}
                  </ul>
                </div>
                {/* Recommendations */}
                <div>
                  <h3 className="flex items-center text-xl font-semibold mb-3 text-white"><LightbulbIcon /><span className="ml-2">Actionable Recommendations</span></h3>
                  <ul className="space-y-2 list-inside text-gray-300">
                    {report.recommendations.map((item, i) => <li key={i} className="bg-gray-800/50 p-3 rounded-md">{item}</li>)}
                  </ul>
                </div>
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
