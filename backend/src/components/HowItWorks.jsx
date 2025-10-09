export default function HowItWorks() {
    const steps = [
      {
        number: "01",
        title: "Enter your profile link",
        desc: "Simply paste your LinkedIn, Instagram, or Twitter profile URL",
        icon: "🔗"
      },
      {
        number: "02", 
        title: "AI analyzes your profile",
        desc: "Our advanced AI scans your profile and evaluates your online presence",
        icon: "🤖"
      },
      {
        number: "03",
        title: "Get instant insights",
        desc: "Receive detailed analysis with actionable tips to improve your profile",
        icon: "📊"
      }
    ]
    return (
      <section id="how" className="py-24 px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🚀 How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get your audit in
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> 3 simple steps</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our streamlined process makes it easy to get professional insights about your social media presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connection line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-700 to-gray-800 z-0"></div>
                )}
                
                <div className="relative z-10 bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center text-2xl">
                      {step.icon}
                    </div>
                    <div className="text-4xl font-bold text-gray-700">{step.number}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA section */}
          <div className="mt-16 text-center">
            <a href="#contact" className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white cta-gradient-animate rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span>Let's Start Your Audit</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    )
  }
  