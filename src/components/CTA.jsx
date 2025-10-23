// src/components/CTA.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { submitAudit } from "../api";
// import PaymentButton from "./PaymentButton"; // We'll redirect instead

export default function CTA() {
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const hasPaid = (() => { try { return localStorage.getItem('auditPaid') === '1'; } catch { return false; } })();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasPaid) {
      toast.error("Please complete payment to start the audit.");
      return;
    }
    const profileUrlToTest = profile.split('?')[0]
    // 3. Validate the URL before submitting
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinRegex.test(profileUrlToTest)) {
      toast.error("Please enter a valid LinkedIn profile URL.");
      return; // Stop the function if invalid
    }

    console.log("Valid LinkedIn URL submitted:", profileUrlToTest); // Log if valid
    setIsLoading(true);
    
    try {
      // Assuming submitAudit now takes an object { profileUrl, authId }
      // You'll need to get the authId from your authentication context or state
      const authId = "user_123"; // Replace with your actual user auth logic
      const data = await submitAudit({ profileUrl: profileUrlToTest, authId });
      
      toast.success(data.message || 'Audit started successfully!');
      const newTrackingId = data?.data?.trackingId;

      if (newTrackingId) {
        // 4. Redirect to the new audit page with the trackingId
        navigate(`/audit/${newTrackingId}`);
      }
      
      setProfile(""); // Clear the form on success
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast.error(error.message || 'Failed to submit audit.');
    } finally {
      setIsLoading(false);
      try { localStorage.removeItem('auditPaid'); } catch {}
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* ... rest of your JSX is fine, no changes needed below ... */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* ... */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to optimize your
          <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"> LinkedIn profile?</span>
        </h2>
        {/* ... */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="url"
                required
                placeholder="Enter your LinkedIn profile URL"
                className="w-full p-4 rounded-xl text-gray-900 placeholder-gray-500 border-0 shadow-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !hasPaid}
              className="px-8 py-4 cta-gradient-animate text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                  Submitting...
                </>
              ) : (
                hasPaid ? 'Start Audit' : 'Complete Payment to Continue'
              )}
            </button>
            {/* We removed the PaymentButton to redirect instead */}
          </div>
        </form>
        {/* ... rest of your JSX ... */}
      </div>
    </section>
  );
}