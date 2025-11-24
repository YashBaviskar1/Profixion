// src/utils/googleAds.js

export const trackPurchaseConversion = (transactionId) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17723297852/2LILCL-C1L8bELygkINC', // From your email
      'transaction_id': transactionId, // Prevents duplicate counting
      'value': 99.0, // Optional: Your audit price
      'currency': 'INR' // Optional: Your currency
    });
    console.log("✅ Google Ads Conversion Sent: ", transactionId);
  } else {
    console.warn("⚠️ Google Ads tag not found on window");
  }
};