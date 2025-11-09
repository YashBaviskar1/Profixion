import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRef = useRef(null)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Handle video autoplay and pause
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err)
      })
    } else if (!isModalOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0 // Reset video to beginning
    }
  }, [isModalOpen])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating gradient orbs */}
      <motion.div 
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-gray-700/20 to-gray-900/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-gray-800/20 to-gray-600/20 rounded-full mix-blend-multiply filter blur-xl"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Highlight Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center px-6 py-3 rounded-full border border-gradient-to-r from-gray-400 to-gray-600 bg-gradient-to-r from-gray-600/10 to-gray-800/10 backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-medium">🚀 AI-Powered LinkedIn Profile Audit</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                Audit Your LinkedIn
              </span>
              <br />
              <span className="text-white">
                Profile
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Get AI-powered insights to optimize your LinkedIn profile for maximum professional impact and career opportunities
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start items-center"
            >
              {/* Primary CTA - Start Audit */}
              <motion.a 
                href="#pricing" 
                className="px-8 py-4 cta-gradient-animate text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Audit
              </motion.a>

              {/* Secondary CTA - See How It Works */}
              <motion.button 
                onClick={openModal}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>See How It Works</span>
                <motion.svg 
                  className="ml-2 w-5 h-5 inline" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 mt-12"
            >
              <div className="flex items-center space-x-6">
                <a 
                  href="https://www.linkedin.com/in/profixion-ai-825207384" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm">Follow us on LinkedIn</span>
                </a>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500 mt-8"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                <span>Professional Plan</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                <span>Instant Results</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Audit Report Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center h-full"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl scale-110"></div>
              
              {/* Main image container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  src="/Profixion sample final (1).png" 
                  alt="Social Media Audit Report" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-700/50 hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Enhanced floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-80 shadow-lg"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70 shadow-lg"
                animate={{ 
                  y: [0, 15, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>

              <motion.div 
                className="absolute top-1/4 -left-8 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-60 shadow-lg"
                animate={{ 
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              ></motion.div>

              <motion.div 
                className="absolute bottom-1/4 -right-8 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-70 shadow-lg"
                animate={{ 
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>

              {/* Decorative lines */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                animate={{ 
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>

              <motion.div 
                className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-purple-500/50 to-transparent"
                animate={{ 
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Dark semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          
          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-20"
              aria-label="Close modal"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video container */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-2xl bg-black">
              <video
                ref={videoRef}
                src="/profixion_tutorial.mp4"
                controls
                className="w-full h-auto max-h-[80vh]"
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
