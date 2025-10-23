import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate PDF with exact inspiration design
 */
async function generateInspirationPDF(auditData) {
  const { profileUrl, overallScore, strengths, weaknesses, recommendations } = auditData;
  
  // Truncate content to fit single page (max 5 items per section)
  const truncatedStrengths = strengths.slice(0, 5);
  const truncatedWeaknesses = weaknesses.slice(0, 5);
  const truncatedRecommendations = recommendations.slice(0, 5);
  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Powered Social Media Audit Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            line-height: 1.4;
            padding: 0;
            margin: 0;
            font-size: 12px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 100%;
            margin: 0 auto;
            background-color: #1a1a1a;
            padding: 20px;
            min-height: 100vh;
        }
        
        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #333;
        }
        
        .logo-section {
            text-align: left;
            flex: 1;
        }
        
        .logo {
            text-align: left;
            margin-bottom: 5px;
        }
        
        .logo img {
            height: 60px;
            width: auto;
        }
        
        
        .date-section {
            text-align: right;
        }
        
        .date {
            font-size: 12px;
            color: #ffffff;
            margin-bottom: 5px;
        }
        
        .profile-url {
            font-size: 10px;
            color: #ffffff;
            word-break: break-all;
        }
        
        /* Main Title */
        .main-title {
            font-size: 28px;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 25px;
            line-height: 1.2;
        }
        
        /* Grid Layout */
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        /* Cards */
        .card {
            background-color: #2a2a2a;
            border-radius: 8px;
            padding: 15px;
            border: 1px solid #333;
        }
        
        .card-title {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* Profile Strength Card */
        .profile-strength {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .profile-analysis {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: auto;
        }
        
        .score-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: conic-gradient(#3b82f6 0deg ${overallScore * 3.6}deg, #333 ${overallScore * 3.6}deg 360deg);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            flex-shrink: 0;
        }
        
        .score-circle::before {
            content: '';
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #2a2a2a;
            position: absolute;
        }
        
        .score-text {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            z-index: 1;
        }
        
        .score-info {
            flex: 1;
        }
        
        .score-label {
            font-size: 12px;
            color: #ffffff;
            font-weight: 500;
            margin-bottom: 3px;
        }
        
        .score-description {
            font-size: 10px;
            color: #ccc;
        }
        
        /* Foundation Card */
        .foundation-card {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #3b82f6;
            flex-shrink: 0;
        }
        
        .foundation-text {
            font-size: 12px;
            color: #ffffff;
        }
        
        .foundation-text strong {
            font-weight: 700;
        }
        
        .foundation-description {
            font-size: 10px;
            color: #ccc;
            margin-top: 2px;
        }
        
        /* Profile Info Card */
        .profile-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .profile-icon {
            width: 20px;
            height: 20px;
            background-color: #666;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .profile-icon::before {
            content: '👤';
            font-size: 10px;
        }
        
        .profile-name {
            font-size: 12px;
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 2px;
        }
        
        .profile-roles {
            font-size: 9px;
            color: #999;
            line-height: 1.3;
        }
        
        /* Areas for Improvement Card */
        .improvement-list {
            list-style: none;
            padding: 0;
        }
        
        .improvement-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 10px;
            color: #ffffff;
        }
        
        .checkbox {
            width: 12px;
            height: 12px;
            border: 1px solid #f59e0b;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .checkbox.checked {
            background-color: #f59e0b;
        }
        
        .checkbox.checked::after {
            content: '✓';
            color: #000;
            font-size: 8px;
            font-weight: bold;
        }
        
        /* Strengths Card */
        .strengths-list {
            list-style: none;
            padding: 0;
        }
        
        .strength-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 10px;
            color: #ffffff;
        }
        
        .checkmark {
            width: 12px;
            height: 12px;
            background-color: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .checkmark::after {
            content: '✓';
            color: #000;
            font-size: 8px;
            font-weight: bold;
        }
        
        /* Action Plan Card */
        .action-plan-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .tab {
            padding: 4px 8px;
            font-size: 9px;
            color: #999;
            cursor: pointer;
            border-radius: 3px;
        }
        
        .tab.active {
            background-color: #3b82f6;
            color: #ffffff;
        }
        
        .action-plan-content {
            font-size: 10px;
            color: #ffffff;
            line-height: 1.4;
        }
        
        .action-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        /* Icons */
        .icon {
            width: 12px;
            height: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .icon.warning::after {
            content: '⚠';
            color: #f59e0b;
            font-size: 10px;
        }
        
        .icon.check::after {
            content: '✓';
            color: #10b981;
            font-size: 10px;
        }
        
        .icon.bulb::after {
            content: '💡';
            font-size: 10px;
        }
        
        /* Footer */
        .footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #333;
            text-align: center;
            color: #999;
            font-size: 10px;
        }
        
        @media print {
            body {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div class="logo">
                    <img src="logo.png" alt="Profixion Logo" style="height: 60px; width: auto;" />
                </div>
            </div>
            <div class="date-section">
                <div class="date">${currentDate}</div>
                <div class="profile-url">${profileUrl}</div>
            </div>
        </div>
        
        <!-- Main Title -->
        <div class="main-title">AI-POWERED SOCIAL MEDIA AUDIT REPORT</div>
        
        <!-- Grid Layout -->
        <div class="grid">
            <!-- Profile Strength Card -->
            <div class="card">
                <div class="card-title">Profile Strength</div>
                <div class="profile-strength">
                    <div class="score-circle">
                        <span class="score-text">${overallScore}</span>
                    </div>
                    <div class="score-info">
                        <div class="score-label">${overallScore >= 70 ? 'Excellent' : overallScore >= 50 ? 'Good' : 'Needs Work'}</div>
                        <div class="score-description">Profile optimization score</div>
                    </div>
                    <div class="profile-analysis">
                        <div class="profile-icon"></div>
                        <div>
                            <div class="profile-name">Profile Analysis</div>
                            <div class="profile-roles">LinkedIn Profile Audit<br/>Professional Assessment</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Empty card for spacing -->
            <div class="card" style="visibility: hidden;"></div>
            
            <!-- Areas for Improvement Card -->
            <div class="card">
                <div class="card-title">
                    <div class="icon warning"></div>
                    Areas for improvement
                </div>
                <ul class="improvement-list">
                    ${truncatedWeaknesses.map((weakness, index) => `
                        <li class="improvement-item">
                            <div class="checkbox ${index < 2 ? 'checked' : ''}"></div>
                            <span>${weakness.length > 30 ? weakness.substring(0, 30) + '...' : weakness}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- Strengths Card -->
            <div class="card">
                <div class="card-title">
                    <div class="icon check"></div>
                    Strengths
                </div>
                <ul class="strengths-list">
                    ${truncatedStrengths.map(strength => `
                        <li class="strength-item">
                            <div class="checkmark"></div>
                            <span>${strength.length > 25 ? strength.substring(0, 25) + '...' : strength}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- Action Plan Card -->
            <div class="card">
                <div class="card-title">
                    <div class="icon bulb"></div>
                    Action Plan
                </div>
                <div class="action-plan-tabs">
                    <div class="tab active">Immediate</div>
                    <div class="tab">1 Week</div>
                    <div class="tab">1 Month</div>
                </div>
                <div class="action-plan-content">
                    <div class="action-columns">
                        <div>
                            ${truncatedRecommendations.slice(0, 3).map(rec => `
                                <div>${rec.length > 20 ? rec.substring(0, 20) + '...' : rec}</div>
                            `).join('')}
                        </div>
                        <div>
                            ${truncatedRecommendations.slice(3, 6).map(rec => `
                                <div>${rec.length > 20 ? rec.substring(0, 20) + '...' : rec}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            Generated by Profixion - Enhance your online presence with AI-driven social media insights
        </div>
    </div>
</body>
</html>
  `;

  // Generate PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlContent, { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  const pdfPath = path.join(__dirname, 'reports', `inspiration_design_${Date.now()}.pdf`);
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm'
    },
    preferCSSPageSize: true,
    scale: 0.8
  });
  
  await browser.close();
  
  console.log(`✅ PDF generated: ${pdfPath}`);
  return pdfPath;
}

// Example usage
const sampleData = {
  profileUrl: 'https://www.linkedin.com/in/sahil-more-16975',
  overallScore: 68,
  strengths: [
    'Complete profile',
    'Clear career progression',
    'Recommendations present',
    'Good connection count',
    'Active on LinkedIn',
    'Recent education'
  ],
  weaknesses: [
    'Add job descriptions',
    'Include skills',
    'Missing summary',
    'Inconsistent naming'
  ],
  recommendations: [
    'Add job descriptions',
    'Verify role',
    'Include skills',
    'Create summary',
    'Improve eir'
  ]
};

// Generate the PDF
generateInspirationPDF(sampleData)
  .then(pdfPath => console.log('PDF created at:', pdfPath))
  .catch(error => console.error('Error:', error));
