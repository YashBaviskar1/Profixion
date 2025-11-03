import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Will recruiters really notice my profile after this?",
      answer: "Yes! Our audit highlights what recruiters look for and helps you stand out in searches however profixion only audits your profiles, provides a social score, gives suggestion. No website can GURANTEE you jobs.",
      icon: "🎯"
    },
    {
      question: "How is Profixion different from just editing my LinkedIn myself?",
      answer: "We use professional benchmarks and recruiter insights, not guesswork, so you know exactly what to fix.",
      icon: "⚡"
    },
    {
      question: "What score is considered \"good\" on Profixion?",
      answer: "Anything above 75 shows you're in strong shape. Below that, we'll guide you to improve.",
      icon: "📊"
    },
    {
      question: "Do you rewrite profiles or just give suggestions?",
      answer: "Right now, we provide audits with actionable tips. Profile makeover services are coming soon!",
      icon: "✍️"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* FAQ Header */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
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
              ❓ FAQ
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">Questions</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
              Quick answers to common questions about our AI audit service
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl"></div>
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-8 flex items-start sm:items-center justify-between text-left relative z-10"
                >
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {faq.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 sm:px-8 pb-6 sm:pb-8 relative z-10"
                  >
                    <div className="pl-16 sm:pl-20">
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 sm:p-12">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Please get in touch with our friendly team.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

