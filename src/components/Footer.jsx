import Logo from './Logo'

export default function Footer() {
    return (
      <footer className="bg-black text-gray-400 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="mb-3">
                <Logo className="[&>img]:h-32 md:[&>img]:h-40 lg:[&>img]:h-48" />
              </div>
              <p className="text-gray-400 mb-4 max-w-xl text-sm leading-relaxed">
                AI-powered LinkedIn profile analysis to help you build professional credibility and optimize your career opportunities.
              </p>
              <a 
                href="https://www.linkedin.com/in/profixion-ai-825207384" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex text-gray-400 hover:text-white transition-colors"
                title="Follow us on LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors block">About</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors block">Contact</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors block">Blog</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors block">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Profixion. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  