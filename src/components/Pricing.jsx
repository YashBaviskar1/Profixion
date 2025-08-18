export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "₹199",
      period: "month",
      description: "Perfect for individuals getting started",
      features: ["5 profile audits per month", "Basic AI insights", "Email support", "Standard reports"],
      popular: false,
      gradient: "from-gray-600 to-gray-700"
    },
    {
      name: "Pro",
      price: "₹499",
      period: "month",
      description: "Best for professionals and small teams",
      features: ["Unlimited profile audits", "Advanced AI insights", "Priority support", "Detailed reports", "Progress tracking", "Custom recommendations"],
      popular: true,
      gradient: "from-gray-500 to-gray-700"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "year",
      description: "For large organizations and agencies",
      features: ["Everything in Pro", "API access", "White-label reports", "Dedicated support", "Custom integrations", "Team management"],
      popular: false,
      gradient: "from-gray-700 to-gray-800"
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            💰 Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose the perfect plan for
            <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"> your needs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI analysis features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
              <div className={`relative h-full flex flex-col p-8 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular
                  ? 'border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl'
                  : 'border-gray-800 bg-gray-900 shadow-lg hover:shadow-xl'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <div className="w-5 h-5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600 hover:text-white'
                  }`}>
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">All plans include a 14-day free trial</p>
          <a href="#contact" className="text-gray-300 hover:text-white font-medium">
            Need a custom plan? Contact us →
          </a>
        </div>
      </div>
    </section>
  )
}
  