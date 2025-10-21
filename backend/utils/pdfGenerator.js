import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate the new enhanced HTML template matching the frontend design
 */
function generateHTMLTemplate(auditData) {
  const { profileUrl, overallScore, strengths, weaknesses, recommendations } = auditData;
  
  // Extract metrics from audit data
  const connectionCount = auditData.connectionCount || 'N/A';
  const monthlyPosts = auditData.monthlyPosts || 'N/A';
  const engagementRate = auditData.engagementRate || 'N/A';
  
  return `
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
            background-color: #1A1A1A;
            color: #ffffff;
            line-height: 1.4;
            padding: 20px;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        
        .logo {
            text-align: left;
            margin-bottom: 0;
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
            color: #9ca3af;
        }
        
        .main-title {
            font-size: 18px;
            font-weight: 700;
            color: #3b82f6;
            margin: 30px 0;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .card {
            background-color: #2C2C2C;
            border: 1px solid #404040;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
        }
        
        .card-title {
            font-size: 12px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .score-display {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .score-number {
            font-size: 24px;
            font-weight: 700;
            color: #3b82f6;
        }
        
        .score-label {
            font-size: 10px;
            color: #ffffff;
        }
        
        .score-subtitle {
            font-size: 8px;
            color: #9ca3af;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background-color: #404040;
            border-radius: 4px;
            margin-top: 8px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background-color: #3b82f6;
            border-radius: 4px;
            width: ${overallScore}%;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
        }
        
        .metric {
            text-align: center;
        }
        
        .metric-value {
            font-size: 14px;
            font-weight: 700;
            color: #3b82f6;
        }
        
        .metric-label {
            font-size: 8px;
            color: #9ca3af;
        }
        
        .analysis-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        
        .analysis-table th,
        .analysis-table td {
            padding: 6px 8px;
            text-align: left;
            border-bottom: 1px solid #404040;
            font-size: 9px;
        }
        
        .analysis-table th {
            background-color: #2C2C2C;
            color: #ffffff;
            font-weight: 600;
        }
        
        .analysis-table tr:nth-child(even) {
            background-color: #1A1A1A;
        }
        
        .chart-container {
            height: 60px;
            display: flex;
            align-items: end;
            gap: 4px;
            margin-top: 10px;
        }
        
        .chart-bar {
            flex: 1;
            background-color: #3b82f6;
            border-radius: 2px 2px 0 0;
            min-height: 4px;
        }
        
        .chart-bar:nth-child(3) {
            background-color: #f59e0b;
        }
        
        .chart-bar:nth-child(4) {
            background-color: #10b981;
        }
        
        .list-item {
            display: flex;
            align-items: center;
            margin: 6px 0;
            font-size: 9px;
            color: #ffffff;
        }
        
        .list-item::before {
            content: '•';
            color: #10b981;
            margin-right: 8px;
            font-weight: bold;
        }
        
        .weaknesses .list-item::before {
            color: #f59e0b;
        }
        
        .recommendations .list-item::before {
            color: #3b82f6;
        }
        
        .action-item {
            margin: 8px 0;
            font-size: 9px;
            color: #ffffff;
        }
        
        .action-progress {
            width: 100%;
            height: 4px;
            background-color: #404040;
            border-radius: 2px;
            margin-top: 4px;
            overflow: hidden;
        }
        
        .action-progress-fill {
            height: 100%;
            border-radius: 2px;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #404040;
            text-align: center;
            color: #9ca3af;
            font-size: 8px;
        }
        
        @media print {
            body {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <img src="/logo.png" alt="Profixion Logo" style="height: 60px; width: auto;" />
        </div>
        <div class="date-section">
            <div class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            <div class="profile-url">${profileUrl}</div>
        </div>
    </div>
    
    <div class="main-title">AI-POWERED SOCIAL MEDIA AUDIT REPORT</div>
    
    <div class="grid-container">
        <!-- Profile Strength Card -->
        <div class="card">
            <div class="card-title">Profile Strength</div>
            <div class="score-display">
                <div class="score-number">${overallScore}</div>
                <div>
                    <div class="score-label">${overallScore >= 70 ? 'Excellent' : overallScore >= 50 ? 'Good' : 'Needs Work'}</div>
                    <div class="score-subtitle">Profile optimization score</div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
        
        <!-- Key Metrics Card -->
        <div class="card">
            <div class="card-title">Key Metrics</div>
            <div class="metrics-grid">
                <div class="metric">
                    <div class="metric-value">${connectionCount}</div>
                    <div class="metric-label">Connections</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${monthlyPosts}</div>
                    <div class="metric-label">Posts/Month</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${engagementRate}%</div>
                    <div class="metric-label">Engagement</div>
                </div>
            </div>
        </div>
        
        <!-- Profile Analysis Table -->
        <div class="card">
            <div class="card-title">Profile Analysis</div>
            <table class="analysis-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Profile Photo</td>
                        <td>85%</td>
                        <td>Good</td>
                    </tr>
                    <tr>
                        <td>Headline</td>
                        <td>72%</td>
                        <td>Good</td>
                    </tr>
                    <tr>
                        <td>Summary</td>
                        <td>45%</td>
                        <td>Poor</td>
                    </tr>
                    <tr>
                        <td>Experience</td>
                        <td>78%</td>
                        <td>Good</td>
                    </tr>
                    <tr>
                        <td>Skills</td>
                        <td>60%</td>
                        <td>Fair</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Engagement Trends Chart -->
        <div class="card">
            <div class="card-title">Engagement Trends</div>
            <div class="chart-container">
                <div class="chart-bar" style="height: 45%"></div>
                <div class="chart-bar" style="height: 52%"></div>
                <div class="chart-bar" style="height: 38%"></div>
                <div class="chart-bar" style="height: 61%"></div>
                <div class="chart-bar" style="height: 48%"></div>
            </div>
        </div>
        
        <!-- Strengths -->
        <div class="card">
            <div class="card-title">Strengths</div>
            ${strengths.slice(0, 5).map(strength => `<div class="list-item">${strength}</div>`).join('')}
        </div>
        
        <!-- Action Plan -->
        <div class="card">
            <div class="card-title">Action Plan</div>
            <div class="action-item">
                <div>Add job descriptions</div>
                <div class="action-progress">
                    <div class="action-progress-fill" style="width: 85%; background-color: #f59e0b;"></div>
                </div>
            </div>
            <div class="action-item">
                <div>Include skills section</div>
                <div class="action-progress">
                    <div class="action-progress-fill" style="width: 60%; background-color: #3b82f6;"></div>
                </div>
            </div>
            <div class="action-item">
                <div>Create professional summary</div>
                <div class="action-progress">
                    <div class="action-progress-fill" style="width: 40%; background-color: #10b981;"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Generated by Profixion - Enhance your online presence with AI-driven social media insights</p>
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
    // Use path.resolve for consistent cross-platform path handling
    const backendDir = path.resolve(process.cwd(), 'backend');
    const reportsDir = path.resolve(backendDir, 'reports');
    console.log(`📁 Reports directory: ${reportsDir}`);
    
    if (!fs.existsSync(reportsDir)) {
      console.log(`📁 Creating reports directory: ${reportsDir}`);
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
    const pdfPath = path.resolve(reportsDir, `${filename}.pdf`);
    console.log(`📄 Generating PDF at: ${pdfPath}`);
    
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
    
    // Verify the file was created
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file was not created at: ${pdfPath}`);
    }
    
    const stats = fs.statSync(pdfPath);
    console.log(`✅ PDF generated successfully: ${pdfPath} (${stats.size} bytes)`);
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
    recommendations: [],
    // Add new metrics for enhanced design
    connectionCount: 'N/A',
    monthlyPosts: 'N/A',
    engagementRate: 'N/A'
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

  // Try to extract additional metrics from the report text
  const connectionMatch = reportText.match(/(\d+(?:\.\d+)?[KMB]?)\s*(?:connections?|followers?)/i);
  if (connectionMatch) {
    auditData.connectionCount = connectionMatch[1];
  }

  const postsMatch = reportText.match(/(\d+)\s*(?:posts?|updates?)\s*(?:per\s*month|monthly)/i);
  if (postsMatch) {
    auditData.monthlyPosts = postsMatch[1];
  }

  const engagementMatch = reportText.match(/(\d+(?:\.\d+)?)%\s*(?:engagement|interaction)/i);
  if (engagementMatch) {
    auditData.engagementRate = engagementMatch[1];
  }

  return auditData;
}
