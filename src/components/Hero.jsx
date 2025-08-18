export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            🚀 AI-Powered Social Media Audit
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Audit Your Social
          </span>
          <br />
          <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
            Media Profiles
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Get AI-powered insights to improve your credibility & visibility across LinkedIn, Instagram, Twitter, and more
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <span className="relative z-10">Start Free Audit</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a href="#features" className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-300 bg-black/50 border-2 border-gray-700 rounded-full hover:border-gray-500 hover:text-white transition-all duration-300">
            <span>See How It Works</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        
        <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            <span>Free Forever Plan</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-700 rounded-full mr-2"></div>
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  )
}
