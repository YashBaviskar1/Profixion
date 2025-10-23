// generate-report.js
// Run with: node generate-report.js

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

/**
 * Reads the logo.png file and returns a Base64 data URL.
 * Provides a fallback SVG placeholder if the file is not found.
 */
function getLogoSrc() {
  const logoPath = path.resolve('./logo.png');
  
  if (fs.existsSync(logoPath)) {
    const logoBase64 = fs.readFileSync(logoPath, 'base64');
    return `data:image/png;base64,${logoBase64}`;
  } 
  
  console.warn('⚠️ logo.png not found. Using a text placeholder.');
  // Fallback SVG placeholder
  const fallbackSvg = `
    <svg width="240" height="50" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="50" fill="transparent"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, sans-serif" font-size="28" fill="#f4f4f5" font-weight="900"
        letter-spacing="0.1em">
        PROFIXION
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(fallbackSvg).toString('base64')}`;
}

async function generatePDF() {
  const logoSrc = getLogoSrc();
  
  // Data for the report, pulled from the image
  const reportData = {
    score: 68,
    linkedinUrl: "https://www.linkedin.com/in/sahil-more-16975",
    date: "October 7, 2025",
    name: "Sahil More",
    title: "Care Owner - Bistro & Breqiirm",
    subtitle: "Former Manager",
  };

  // Calculate SVG stroke offset for the progress circle
  const circumference = 2 * Math.PI * 60; // 2 * pi * radius
  const strokeOffset = circumference * (1 - (reportData.score / 100));

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Profixion Report</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    body {
      background-color: #0a0a0a; /* zinc-950, very dark bg for printing */
      font-family: 'Inter', sans-serif;
      color: #e4e4e7; /* zinc-200 */
    }
    
    #pdf-content {
      width: 794px;   /* A4 width */
      height: 1123px;  /* A4 height */
      background-color: #000000;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
      padding: 40px;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    /* Reusable card component */
    .card {
      background-color: #18181b; /* zinc-900 */
      border-radius: 12px;
      padding: 24px;
    }
  </style>
</head>

<body class="flex items-center justify-center min-h-screen">
  <div id="pdf-content">
    
    <header class="flex flex-col items-center pt-2 pb-6 border-b border-zinc-700">
      <img src="${logoSrc}" alt="PROFIXION" class="h-10">
      <span class="text-xs uppercase tracking-[0.2em] text-zinc-500 mt-2">Fix • Polish • Shine Online</span>
    </header>

    <section class="mt-8 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-extrabold text-blue-400">AI-POWERED</h1>
        <h2 class="text-4xl font-extrabold text-white">LinkedIn Profile AUDIT REPORT</h2>
      </div>
      <div class="text-right text-sm">
        <p class="text-zinc-400">${reportData.date}</p>
        <a href="${reportData.linkedinUrl}" class="text-zinc-400 hover:text-blue-400">
          ${reportData.linkedinUrl.replace('https://www.', '')}
        </a>
      </div>
    </section>

    <main class="mt-8 grid grid-cols-12 gap-6 flex-grow">
      
      <div class="col-span-5 flex flex-col gap-6">
        
        <div class="card flex flex-col items-center">
          <h3 class="text-lg font-semibold text-white mb-4">Profile Strength</h3>
          <div class="relative w-48 h-48">
            <svg class="w-full h-full" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke="#27272a" stroke-width="12"></circle>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#60a5fa" stroke-width="12"
                stroke-linecap="round"
                transform="rotate(-90 70 70)"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${strokeOffset}">
              </circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-5xl font-bold text-white">${reportData.score}</span>
              <span class="text-lg text-zinc-400">/ 100</span>
            </div>
          </div>
          <p class="text-center text-2xl font-semibold text-white mt-4">Good</p>
        </div>

        <div class="card flex items-center gap-4">
          <div class="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.5 1.5 0 0 1 18 21.75H6a1.5 1.5 0 0 1-1.499-1.632Z" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">${reportData.name}</h3>
            <p class="text-sm text-zinc-400">${reportData.title}</p>
            <p class="text-sm text-zinc-400">${reportData.subtitle}</p>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.508 1.333 1.508 2.316V18" />
            </svg>
            <h3 class="text-lg font-semibold text-white">Action Plan</h3>
          </div>
          <ul class="space-y-2 text-zinc-300 text-sm list-disc list-outside pl-5">
            <li>Add job descriptions</li>
            <li>Include key skills</li>
          </ul>
        </div>
        
      </div>

      <div class="col-span-7 flex flex-col gap-6">

        <div class="card">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 class="text-lg font-semibold text-white">Weaknesses</h3>
          </div>
          <ul class="space-y-3">
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
              Placeholder weakness 1
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
              Placeholder weakness 2
            </li>
          </ul>
        </div>

        <div class="card">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <h3 class="text-lg font-semibold text-white">Areas for improvement</h3>
          </div>
          <ul class="space-y-3">
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                 <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
              Add job descriptions
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                 <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
              Include skills
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                 <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
              Missing summary
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                 <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
              Inconsistent naming
            </li>
          </ul>
        </div>
        
        <div class="card">
          <h3 class="text-lg font-semibold text-white mb-4">Strengths</h3>
          <ul class="space-y-3">
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Complete profile
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Clear career progression
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Recommendations present
            </li>
            <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Good connection count
            </li>
             <li class="flex items-center text-zinc-200">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </img>
              Active on LinkedIn
            </li>
          </ul>
        </div>

      </div>
    </main>

    <footer class="absolute bottom-6 left-0 right-0 text-center text-zinc-500 text-xs px-10">
      Generated by <span class="font-semibold text-zinc-300">Profixion</span> - Enhance your online presence with AI-driven social media insights
    </footer>
    
  </div>
</body>
</html>
  `;

  const outputPath = "./profixion-report-final.pdf";
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set content and wait for network (Tailwind CDN, fonts)
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Generate the PDF
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();
  console.log(`✅ Final PDF generated successfully (layout swapped): ${outputPath}`);
}

generatePDF().catch(console.error);