
export default function Navbar() {
    return (
      <nav className="sticky top-0 backdrop-blur-md bg-black/90 border-b border-gray-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Profixion
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Features</a>
              <a href="#how" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Pricing</a>
              <a href="#contact" className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-2 rounded-full hover:shadow-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 font-medium">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
  