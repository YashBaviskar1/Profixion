import { useState } from 'react'
import PaymentButton from './PaymentButton'
import CTA from './CTA'

export default function Pricing() {
  const [showModal, setShowModal] = useState(false)
  const plans = [
    {
      name: "Single Platform",
      badge: "Starter",
      price: "₹299",
      period: "month",
      description: "AI-powered audit for 1 platform",
      features: [
        "AI-powered audit for 1 platform",
        "Basic reports",
        "Email support",
      ],
      popular: false,
      gradient: "from-gray-600 to-gray-700",
    },
    {
      name: "All Platforms",
      badge: "Best value",
      price: "₹999",
      period: "month",
      description: "Audit across all platforms",
      features: [
        "Audit across all platforms",
        "Advanced AI insights",
        "Priority support",
        "Custom recommendations",
      ],
      popular: true,
      gradient: "from-gray-500 to-gray-700",
    },
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
            Start with a single platform or unlock audits across all platforms — both include our AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div key={i} className={`relative group`}>
              <div
                className={`relative h-full min-h-[520px] md:min-h-[600px] grid grid-rows-[auto,1fr,auto] p-8 md:p-10 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl'
                    : 'border-gray-800 bg-gray-900 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-xs mb-4 bg-black/30">
                    {plan.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <div className="">
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start">
                        <div className="mt-1 w-5 h-5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-300 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-center">
                  <PaymentButton
                    amount={plan.price === "₹299" ? 299 : 999}
                    onSuccess={() => {
                      setShowModal(true)
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Cancel anytime. Upgrade or downgrade whenever you want.</p>
          <a href="#contact" className="text-gray-300 hover:text-white font-medium">
            Need help choosing? Contact us →
          </a>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h3 className="text-white text-lg font-semibold">Enter your LinkedIn URL</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <CTA />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
  