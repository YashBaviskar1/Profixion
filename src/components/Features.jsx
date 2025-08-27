export default function Features() {
    const features = [
      { 
        title: "AI Analysis", 
        desc: "Get AI-driven insights on your LinkedIn, Instagram, Twitter profiles with advanced machine learning algorithms.",
        icon: "🤖",
        gradient: "from-gray-600 to-gray-800"
      },
      { 
        title: "Actionable Tips", 
        desc: "Improve profile strength with personalized suggestions and step-by-step improvement guides.",
        icon: "💡",
        gradient: "from-gray-700 to-gray-900"
      },
      { 
        title: "Score System", 
        desc: "Benchmark your credibility score against industry standards and track your progress over time.",
        icon: "📊",
        gradient: "from-gray-800 to-gray-600"
      },
    ]
    return (
      <section id="features" className="py-24 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              ✨ Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> boost your profile</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform analyzes your social media presence and provides actionable insights to help you stand out.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group relative p-4 sm:p-6 md:p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base">{feature.desc}</p>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
          
          {/* Stats section */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-400 text-xs sm:text-sm">Profiles Analyzed</div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-400 text-xs sm:text-sm">Accuracy Rate</div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-400 text-xs sm:text-sm">AI Analysis</div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent mb-2">5min</div>
              <div className="text-gray-400 text-xs sm:text-sm">Average Time</div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  