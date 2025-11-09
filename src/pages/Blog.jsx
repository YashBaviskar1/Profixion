import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "India's Unemployment Rate Rises to 5.2% in September, Driven by Rural Job Losses",
      excerpt: "According to data reported by The Economic Times, India's unemployment rate rose to 5.2% in September, marking an increase from 4.9% in August.",
      content: `According to data reported by The Economic Times, India's unemployment rate rose to 5.2% in September, marking an increase from 4.9% in August. The uptick was primarily driven by job losses in rural areas, reflecting ongoing challenges in the agricultural and informal sectors.

While urban employment remained relatively steady, the rural workforce faced seasonal slowdowns and limited demand in non-farm jobs. Analysts suggest that this shift highlights India's growing need for diversified employment opportunities and digital-ready skills beyond traditional sectors.

At Profixion, we believe that employment readiness now extends beyond qualifications; it includes how professionals present themselves online. With recruiters increasingly relying on digital profiles to evaluate candidates, having a strong LinkedIn presence and a credible online identity can make a real difference in securing opportunities.

As India's job market continues to evolve, professionals who actively build their digital reputation and strengthen their personal brand will stand out. Profixion is here to help bridge that gap, empowering individuals to showcase their skills, credibility, and potential through their online profiles.`,
      author: "Profixion Team",
      date: "October 15, 2024",
      readTime: "3 min read",
      category: "Employment Trends",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Blog Header */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
              📝 Blog
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Insights & 
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> Industry Trends</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest trends in employment, LinkedIn optimization, and professional development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300"
            >
              {/* Article Header */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {article.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>By {article.author}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="text-gray-300 leading-relaxed space-y-4">
                    {article.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-base sm:text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Article Footer */}
                <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                  
                  <Link 
                    to="/pricing" 
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
                  >
                    Optimize Your LinkedIn Profile
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 sm:p-12">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                More Articles Coming Soon
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                We're working on bringing you more insights about LinkedIn optimization, 
                professional development, and industry trends. Stay tuned!
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all duration-300"
              >
                Subscribe for Updates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;







