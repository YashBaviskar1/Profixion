import Logo from './Logo'

export default function Footer() {
    return (
      <footer className="bg-black text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-gray-400 mb-6 max-w-xl text-sm sm:text-base">
                AI-powered LinkedIn profile analysis to help you build professional credibility and optimize your career opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.linkedin.com/in/profixion-ai-825207384" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Follow us on LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* About */}
            <div className="mt-2">
              <a 
                href="/about"
                className="text-white font-semibold mb-3 sm:mb-4 hover:text-gray-300 transition-colors"
              >
                About
              </a>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blogs</a></li>
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
  }
  