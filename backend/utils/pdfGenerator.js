import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate a styled HTML template for the audit report
 */
function generateHTMLTemplate(auditData) {
  const { profileUrl, overallScore, strengths, weaknesses, recommendations } = auditData;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinkedIn Profile Audit Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #111827;
            color: #ffffff;
            line-height: 1.6;
            padding: 40px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #1f2937;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #374151;
            padding-bottom: 30px;
        }
        
        .title {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 16px;
            color: #9ca3af;
            margin-bottom: 20px;
        }
        
        .profile-url {
            font-size: 14px;
            color: #60a5fa;
            word-break: break-all;
            background-color: #1e3a8a;
            padding: 8px 12px;
            border-radius: 6px;
            display: inline-block;
        }
        
        .score-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: #0f172a;
            border-radius: 12px;
            border: 1px solid #334155;
        }
        
        .score-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: conic-gradient(#10b981 0deg ${overallScore * 3.6}deg, #374151 ${overallScore * 3.6}deg 360deg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            position: relative;
        }
        
        .score-circle::before {
            content: '';
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: #1f2937;
            position: absolute;
        }
        
        .score-text {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            z-index: 1;
        }
        
        .score-label {
            font-size: 18px;
            color: #9ca3af;
            font-weight: 500;
        }
        
        .section {
            margin: 40px 0;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background-color: #10b981;
            border-radius: 2px;
        }
        
        .strengths .section-title::before {
            background-color: #10b981;
        }
        
        .weaknesses .section-title::before {
            background-color: #f59e0b;
        }
        
        .recommendations .section-title::before {
            background-color: #3b82f6;
        }
        
        .list {
            list-style: none;
            padding: 0;
        }
        
        .list-item {
            background-color: #374151;
            margin: 12px 0;
            padding: 16px 20px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .strengths .list-item {
            border-left-color: #10b981;
        }
        
        .weaknesses .list-item {
            border-left-color: #f59e0b;
        }
        
        .recommendations .list-item {
            border-left-color: #3b82f6;
        }
        
        .list-item::before {
            content: '•';
            color: #10b981;
            font-weight: bold;
            margin-right: 8px;
        }
        
        .strengths .list-item::before {
            color: #10b981;
        }
        
        .weaknesses .list-item::before {
            color: #f59e0b;
        }
        
        .recommendations .list-item::before {
            color: #3b82f6;
        }
        
        .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #374151;
            text-align: center;
            color: #9ca3af;
            font-size: 14px;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        @media print {
            body {
                padding: 20px;
            }
            
            .container {
                box-shadow: none;
                border: 1px solid #374151;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">LinkedIn Profile Audit Report</h1>
            <p class="subtitle">AI-Powered Professional Profile Analysis</p>
            <div class="profile-url">${profileUrl}</div>
        </div>
        
        <div class="score-section">
            <div class="score-circle">
                <span class="score-text">${overallScore}</span>
            </div>
            <div class="score-label">Overall Score / 100</div>
        </div>
        
        <div class="section strengths">
            <h2 class="section-title">Strengths</h2>
            <ul class="list">
                ${strengths.map(strength => `<li class="list-item">${strength}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section weaknesses">
            <h2 class="section-title">Areas for Improvement</h2>
            <ul class="list">
                ${weaknesses.map(weakness => `<li class="list-item">${weakness}</li>`).join('')}
            </ul>
        </div>
        
        <div class="section recommendations">
            <h2 class="section-title">Actionable Recommendations</h2>
            <ul class="list">
                ${recommendations.map(recommendation => `<li class="list-item">${recommendation}</li>`).join('')}
            </ul>
        </div>
        
        <div class="footer">
            <p>Generated by Profixion - AI-Powered Social Media Profile Analysis</p>
            <p>Report generated on ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
        </div>
    </div>
</body>
</html>
  `;
}

/**
 * Generate PDF from audit data
 * @param {Object} auditData - The audit data object
 * @param {string} filename - The filename for the PDF (without extension)
 * @returns {Promise<string>} - The file path of the generated PDF
 */
export async function generateAuditPDF(auditData, filename) {
  let browser;
  
  try {
    // Ensure reports directory exists
    const reportsDir = path.join(__dirname, '..', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content
    const htmlContent = generateHTMLTemplate(auditData);
    
    // Set content and wait for fonts to load
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Generate PDF
    const pdfPath = path.join(reportsDir, `${filename}.pdf`);
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      preferCSSPageSize: true
    });
    
    console.log(`✅ PDF generated successfully: ${pdfPath}`);
    return pdfPath;
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Parse audit report text into structured data
 * @param {string} reportText - The raw audit report text
 * @param {string} profileUrl - The profile URL
 * @returns {Object} - Structured audit data
 */
export function parseAuditData(reportText, profileUrl) {
  const auditData = {
    profileUrl,
    overallScore: 0,
    strengths: [],
    weaknesses: [],
    recommendations: []
  };

  if (!reportText || typeof reportText !== 'string') {
    return auditData;
  }

  // Extract overall score allowing looser phrasing
  const scoreMatch = reportText.match(/Overall\s*Score[^\d]*(\d{1,3})/i);
  if (scoreMatch) {
    const score = parseInt(scoreMatch[1], 10);
    if (!Number.isNaN(score)) {
      auditData.overallScore = Math.max(0, Math.min(100, score));
    }
  }

  const headings = ['Strengths', 'Weaknesses', 'Areas for Improvement', 'Recommendations', 'Actionable Recommendations'];
  const nextHeadingRegex = new RegExp(`(?:^|\n)\s*(?:\\*\\*\s*(?:${headings.join('|')})\s*:?\\*\\*|(?:${headings.join('|')})\s*:?)(?=\n)`, 'i');

  const extractSection = (variants) => {
    const titlePattern = variants.join('|');
    const startRegex = new RegExp(`(?:^|\n)\s*(?:\\*\\*\s*(?:${titlePattern})\s*:?\\*\\*|(?:${titlePattern})\s*:?)(?:\s*\n|\s+)`, 'i');
    const startMatch = startRegex.exec(reportText);
    if (!startMatch) return [];

    const startIdx = startMatch.index + startMatch[0].length;
    const remainder = reportText.slice(startIdx);
    const endMatch = nextHeadingRegex.exec(remainder);
    const sectionText = endMatch ? remainder.slice(0, endMatch.index) : remainder;

    const lines = sectionText.split('\n').map(l => l.trim()).filter(Boolean);
    const items = [];
    for (const line of lines) {
      const bullet = line.match(/^([\\*\\-\\•]|\d+[\.)])\s*(.+)$/);
      const text = bullet ? bullet[2] : line;
      const cleaned = text.replace(/^[-–—]\s*/, '').trim();
      if (cleaned.length >= 3) items.push(cleaned);
    }
    return items;
  };

  auditData.strengths = extractSection(['Strengths']);
  auditData.weaknesses = extractSection(['Weaknesses', 'Areas for Improvement']);
  auditData.recommendations = extractSection(['Recommendations', 'Actionable Recommendations']);

  return auditData;
}
