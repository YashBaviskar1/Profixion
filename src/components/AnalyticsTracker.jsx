// src/components/AnalyticsTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This is your Google Ads ID
const GA_TRACKING_ID = 'AW-17723297852';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if window.gtag is available (it should be from your index.html)
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        'page_path': location.pathname + location.search,
      });
    }
  }, [location]); // This effect runs every time the location (URL) changes

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;