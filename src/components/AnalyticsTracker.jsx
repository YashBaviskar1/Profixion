// src/components/AnalyticsTracker.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API_BASE_URL from '../config'; // Make sure this points to your backend

const GA_TRACKING_ID = 'AW-17723297852';

const AnalyticsTracker = () => {
  const location = useLocation();
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    // 1. Google Ads Tracking (Existing)
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        'page_path': location.pathname + location.search,
      });
    }

    // 2. Custom Backend Tracking (New)
    // We send a POST to increment, and the backend should return the new total
    const trackAndFetch = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stats/visit`, {
          method: 'POST',
        });
        const data = await response.json();
        if (data.visits) {
          setVisitCount(data.visits);
        }
      } catch (error) {
        console.error("Stats error:", error);
      }
    };

    trackAndFetch();

  }, [location]); // Runs on every URL change

  // 3. Render the "Secret" Counter (Bottom Left Fixed)
  // You can remove 'hidden' class to see it, or keep it subtle
  if (!visitCount) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      zIndex: 9999,
      background: 'rgba(0,0,0,0.7)',
      color: '#4ade80', // Matrix green
      padding: '5px 5px',
      borderRadius: '8px',
      fontSize: '8px',
      fontFamily: 'monospace',
      pointerEvents: 'none', // Lets you click through it
      border: '1px solid #333'
    }}>
      Live Hits: {visitCount}
    </div>
  );
};

export default AnalyticsTracker;