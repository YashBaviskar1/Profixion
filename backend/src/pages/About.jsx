import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">Profixion</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Transforming first impressions with AI-powered social media profile analysis
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                At Profixion, we believe that your social media presence is your digital business card. 
                In today's competitive landscape, first impressions matter more than ever.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our AI-powered audit system analyzes your LinkedIn, Instagram, Twitter, and other social profiles 
                to provide instant scores and personalized recommendations that help you stand out online.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10,000+</div>
                <div className="text-gray-400 mb-6">Profiles Analyzed</div>
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-gray-400 mb-6">Success Rate</div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">AI Analysis</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">Profixion</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our advanced AI technology provides comprehensive insights to help you build credibility and improve your online presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Analysis",
                description: "Advanced machine learning algorithms analyze your profiles for optimization opportunities.",
                icon: "🤖"
              },
              {
                title: "Instant Results",
                description: "Get comprehensive audit reports in minutes, not days or weeks.",
                icon: "⚡"
              },
              {
                title: "Personalized Recommendations",
                description: "Tailored suggestions based on your specific profile and industry standards.",
                icon: "🎯"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">Technology</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with cutting-edge AI and machine learning technologies to deliver accurate, actionable insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Advanced AI Engine</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Natural Language Processing for content analysis
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Computer Vision for visual profile assessment
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Machine Learning for pattern recognition
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Real-time data processing and analysis
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Comprehensive Coverage</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  LinkedIn professional profiles
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  Instagram visual content
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  Twitter/X engagement analysis
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  Cross-platform consistency checks
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">Online Presence</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have improved their social media profiles with our AI-powered insights.
            </p>
            <a 
              href="/#pricing"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-blue-600 transition-all duration-300 hover:scale-105"
            >
              Start Your Audit Today
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}