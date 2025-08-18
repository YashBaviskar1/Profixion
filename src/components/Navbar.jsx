import Logo from './Logo'
import { motion } from 'framer-motion'

export default function Navbar() {
    return (
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 backdrop-blur-md bg-black/90 border-b border-gray-800/50 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Logo />
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              <motion.a 
                href="#features" 
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              
              <motion.a 
                href="#how" 
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              
              <motion.a 
                href="#pricing" 
                className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 font-medium group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>
    )
  }
  