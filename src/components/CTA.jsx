// src/components/CTA.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import toast from "react-hot-toast";
import { Loader2, Smartphone, Monitor } from "lucide-react";
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
        {!hasPaid ? (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  How to find your LinkedIn URL
                </h3>
                <p className="text-gray-400 text-sm">Follow these simple steps to locate your profile link</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Mobile Instructions */}
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Mobile</h4>
                  </div>
                  <ol className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">1</span>
                      <span>Open LinkedIn app</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">2</span>
                      <span>Tap your profile photo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">3</span>
                      <span>Tap three dots (⋯)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">4</span>
                      <span>Select <span className="text-gray-200 font-medium">Contact Info</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">5</span>
                      <span>Copy your profile link</span>
                    </li>
                  </ol>
                </div>

                {/* Desktop Instructions */}
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Desktop</h4>
                  </div>
                  <ol className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">1</span>
                      <span>Go to <span className="text-gray-200 font-medium">linkedin.com</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">2</span>
                      <span>Open your profile</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-semibold text-white">3</span>
                      <span>Copy the link from the address bar</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                disabled={isLoading}
                className="px-8 py-4 cta-gradient-animate text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Start Audit'
                )}
              </button>
            </div>
          </form>
        )}
        {/* ... rest of your JSX ... */}
      </div>
    </section>
  );
}