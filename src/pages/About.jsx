import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { motion } from "framer-motion"
import { Rocket, Brain, Briefcase, Target, Sparkles, CheckCircle2, Image as ImageIcon } from "lucide-react"

export default function About() {
	const fadeIn = {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true, amount: 0.2 },
		transition: { duration: 0.6 }
	}

	return (
		<div className="min-h-screen bg-black text-gray-300">
			<Navbar />
			<main className="max-w-6xl mx-auto px-6 py-16">
				<motion.header {...fadeIn} className="mb-12 text-center">
					<span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">About</span>
					<h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
				</motion.header>

				{/* Intro Card */}
				<motion.section {...fadeIn} className="mb-10">
					<div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-black/60 p-6 md:p-8 shadow-2xl">
						<p className="text-lg md:text-xl text-gray-300 leading-relaxed">
							At Profixion, we specialize in transforming first impressions. Our automated audit system delivers a detailed score and personalized recommendations for your social profiles — helping you stand out instantly and build credibility online.
						</p>
					</div>
				</motion.section>

				{/* Gradient divider */}
				<div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

				{/* Mission - two column */}
				<motion.section {...fadeIn} className="mb-10">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-black/60 p-6 md:p-8 shadow-2xl">
						<div>
							<h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 flex items-center gap-2"><Target className="w-6 h-6 text-gray-400" /> Our Mission</h2>
							<p className="text-gray-300 leading-relaxed">
								To empower professionals and businesses with the tools to present their best selves online, building trust and visibility in an increasingly digital world.
							</p>
						</div>
						<div className="flex items-center justify-center">
							<div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-700 flex items-center justify-center shadow-xl">
								<Sparkles className="w-16 h-16 text-gray-300" />
							</div>
						</div>
					</div>
				</motion.section>

				<div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

				{/* Why Choose Us */}
				<motion.section {...fadeIn} className="mb-10">
					<div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-black/60 p-6 md:p-8 shadow-2xl">
						<h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 flex items-center gap-2"><Sparkles className="w-6 h-6 text-gray-400" /> Why Choose Us</h2>
						<ul className="space-y-4">
							<li className="flex items-start gap-3">
								<Rocket className="w-6 h-6 text-gray-400 flex-shrink-0" />
								<span>Instant Results – Get a full audit in minutes, not days.</span>
							</li>
							<li className="flex items-start gap-3">
								<Brain className="w-6 h-6 text-gray-400 flex-shrink-0" />
								<span>AI-Powered Insights – Smart, actionable recommendations tailored to you.</span>
							</li>
							<li className="flex items-start gap-3">
								<Briefcase className="w-6 h-6 text-gray-400 flex-shrink-0" />
								<span>Professional Edge – Shine online and leave a lasting impression.</span>
							</li>
						</ul>
					</div>
				</motion.section>

				<div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

				{/* How It Works */}
				<motion.section {...fadeIn}>
					<div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/60 to-black/60 p-6 md:p-8 shadow-2xl">
						<h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 flex items-center gap-2"><ImageIcon className="w-6 h-6 text-gray-400" /> How It Works</h2>
						<ol className="space-y-4 text-gray-300">
							<li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-gray-400 flex-shrink-0" /><span>Upload your social media profile.</span></li>
							<li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-gray-400 flex-shrink-0" /><span>Receive an instant audit score.</span></li>
							<li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-gray-400 flex-shrink-0" /><span>Get clear recommendations to fix, polish, and shine online.</span></li>
						</ol>
					</div>
				</motion.section>
			</main>
			<Footer />
		</div>
	)
}


