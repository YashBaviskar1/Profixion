import { useState } from "react"

export default function CTA() {
  const [profile, setProfile] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Submitted profile: ${profile}`)
    // Later: call backend API here
  }

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            🎯 Get Started Today
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to boost your
          <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"> social presence?</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of professionals who have improved their online credibility with our AI-powered analysis.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="url"
                required
                placeholder="Enter your LinkedIn, Instagram, or Twitter profile URL"
                className="w-full p-4 rounded-xl text-gray-900 placeholder-gray-500 border-0 shadow-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Start Free Audit
            </button>
          </div>
        </form>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
            <span>Instant results in 5 minutes</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-700 rounded-full mr-2"></div>
            <span>100% free forever plan</span>
          </div>
        </div>
      </div>
    </section>
  )
}
