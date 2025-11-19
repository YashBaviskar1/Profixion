import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const articles = [
    // --- 1. Original Article: Unemployment Rate ---
    {
      id: 1,
      title: "India's Unemployment Rate Rises to 5.2% in September, Driven by Rural Job Losses",
      excerpt:
        "According to data reported by The Economic Times, India's unemployment rate rose to 5.2% in September, marking an increase from 4.9% in August. The uptick was primarily driven by job losses in rural areas, reflecting ongoing challenges in the agricultural and informal sectors.",
      content: `According to data reported by The Economic Times, India's unemployment rate rose to 5.2% in September, marking an increase from 4.9% in August. The uptick was primarily driven by job losses in rural areas, reflecting ongoing challenges in the agricultural and informal sectors.

While urban employment remained relatively steady, the rural workforce faced seasonal slowdowns and limited demand in non-farm jobs. Analysts suggest that this shift highlights India's growing need for diversified employment opportunities and digital-ready skills beyond traditional sectors.

At Profixion, we believe that employment readiness now extends beyond qualifications; it includes how professionals present themselves online. With recruiters increasingly relying on digital profiles to evaluate candidates, having a strong LinkedIn presence and a credible online identity can make a real difference in securing opportunities.

As India's job market continues to evolve, professionals who actively build their digital reputation and strengthen their personal brand will stand out. Profixion is here to help bridge that gap, empowering individuals to showcase their skills, credibility, and potential through their online profiles.`,
      author: "Profixion Team",
      date: "October 15, 2024",
      readTime: "3 min read",
      category: "Employment Trends",
      featured: true,
    },

    // --- 2. New Article: Top 10 LinkedIn Mistakes ---
    {
      id: 2,
      title: "Top 10 LinkedIn Mistakes That Are Costing You Job Opportunities",
      excerpt:
        "LinkedIn is the first place recruiters check before deciding whether to call you. But most professionals unknowingly make mistakes that instantly reduce their visibility and credibility — even if they have great skills.",
      content: `LinkedIn is the first place recruiters check before deciding whether to call you. But most professionals unknowingly make mistakes that instantly reduce their visibility and credibility — even if they have great skills.

At Profixion, after auditing thousands of profiles through our AI-powered system, these are the 10 biggest LinkedIn mistakes we see every day. If you’re doing even a few of these, you’re losing opportunities without even knowing it.

1. Weak or Generic Headline  
Fix: Add value + keywords  
“Content Marketer driving 3x engagement | Brand Growth & Strategy”

2. No Profile Picture or an Unprofessional One  
Fix: Clean background, natural lighting, professional attire. A good photo increases profile views by 14x.

3. An Empty or Vague About Section  
Fix: Write in first person. Show impact, numbers, achievements. Make it personal.

4. Experience Listed as Responsibilities, Not Results  
Fix: Use metrics like “Increased lead generation by 45%” instead of “Handled marketing tasks.”

5. Zero Keywords  
Fix: Use keywords relevant to your field — Profixion highlights them in your audit.

6. No Skills or Outdated Skills  
Fix: Add 20–30 relevant skills. Prioritize the top three that match your target job.

7. Ignoring the Cover Photo (Banner)  
Fix: Use a banner that represents your field — this boosts your visual credibility instantly.

8. Not Having Any Activity or Engagement  
Fix: Post twice a month. Comment twice a week. Share insights.

9. No Achievements, Certifications, or Results Added  
Fix: Add certifications, awards, portfolio links, featured posts.

10. Inconsistent or Poorly-Written Profile  
Fix: Let Profixion’s AI analyze tone, clarity, and give you your Social Score.

Final Takeaway  
Optimize your LinkedIn. Boost your visibility. Unlock new career opportunities.  
👉 Start your Profixion Profile Audit today.`,
      author: "Profixion Team",
      date: "November 19, 2025",
      readTime: "6 min read",
      category: "LinkedIn Mistakes",
      featured: false,
    },

    // --- 3. AI & Employment Market ---
    {
      id: 3,
      title: "With AI, India’s Employment Market Is Evolving — And Your Profile Must Too",
      excerpt:
        "India’s job market isn’t shrinking; it’s transforming. Artificial intelligence and automation are reshaping how work gets done and how professionals must present themselves.",
      content: `India’s job market isn’t shrinking; it’s transforming. Artificial intelligence and automation are reshaping how work gets done, how hiring happens, and how professionals must present themselves.

🔍 The Bigger Picture: Why “Jobs Disappearing” Is a Myth  
AI isn’t eliminating jobs — it’s changing job profiles and the skills expected.  
Demand for AI, data analytics, cloud computing, and digital fluency is rising across both technical and non-technical roles.  
Crucially, how you appear online and your digital profile matters more than ever.

🚀 Why Your LinkedIn Profile Matters  
Recruiters increasingly scan LinkedIn profiles before even calling you.  
Having the experience is not enough; your online profile must clearly reflect it.  
Keywords, tone, consistency, and brand image matter.

🎯 How to Stay Ahead  
- Upskill in relevant areas (AI literacy, digital tools, problem-solving)  
- Audit your profile regularly  
- Build your personal brand intentionally  
- Use AI-friendly tools like Profixion to understand how recruiters see your profile.

🔔 Why Profixion Matters  
In the age of AI and automation, let your profile not just reflect your skills but showcase them loud and clear.  
Profixion — we fix what recruiters see first.`,
      author: "Profixion Team",
      date: "November 19, 2025",
      readTime: "5 min read",
      category: "AI & Career Strategy",
      featured: false,
    },

    // --- 4. LinkedIn Profile Essentials ---
    {
      id: 4,
      title: "The 4 Most Important Parts of Your LinkedIn Profile And How to Get Noticed",
      excerpt:
        "In a world where recruiters scroll fast, your LinkedIn profile is your most powerful personal branding tool. There are four critical parts of your profile that decide whether you get noticed or ignored.",
      content: `Your LinkedIn profile is your digital reputation.  
At Profixion, we’ve studied thousands of profiles, and these four elements make all the difference:

1. Headline: The first impression that drives search visibility.  
Use keywords, avoid generic titles.

2. Profile Picture and Banner: Visual credibility in under one second.  
Use clean lighting and professional background.

3. About Section: Tell your story, not your summary.  
Be personal, show intent, use your voice.

4. Experience Section: Focus on results, not tasks.  
Use metrics and achievements.

Profixion’s AI Audit helps measure your visibility, tone, and recruiter-readiness — making sure your profile isn’t just seen but remembered.`,
      author: "Profixion Team",
      date: "November 19, 2025",
      readTime: "4 min read",
      category: "LinkedIn Optimization",
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Blog Header */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <span className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              📝 Blog
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Insights &{" "}
              <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                Industry Trends
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest trends in employment, LinkedIn optimization, and professional development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-900 rounded-2xl border border-gray-800 p-8 hover:border-gray-700 transition-all"
            >
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

              <h2 className="text-3xl font-bold text-white mb-4">{article.title}</h2>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
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

              <div className="prose prose-invert max-w-none">
                {article.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center flex-wrap gap-4">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <Link
                  to="/pricing"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition"
                >
                  Optimize Your LinkedIn Profile
                </Link>
              </div>
            </motion.article>
          ))}

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center bg-gray-900 rounded-2xl border border-gray-800 p-12"
          >
            <h3 className="text-2xl font-bold text-white mb-4">More Articles Coming Soon</h3>
            <p className="text-gray-400 mb-6">
              We're working on bringing you more insights about LinkedIn optimization, professional development, and industry trends. Stay tuned!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition"
            >
              Subscribe for Updates
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
