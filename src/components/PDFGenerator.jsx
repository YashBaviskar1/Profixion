import React, { useState, useCallback } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PAGE = { W: 595, H: 842 }; // A4 points

const THEME = {
  bg: rgb(0, 0, 0), // Jet black background to match logo
  cardBg: rgb(0.12, 0.12, 0.12), // Slightly lighter card background
  border: rgb(0.25, 0.25, 0.25), // Card borders
  text: rgb(1, 1, 1), // White text
  muted: rgb(0.60, 0.60, 0.60), // Muted text
  blue: rgb(0.23, 0.51, 0.96), // Blue accent
  green: rgb(0.06, 0.73, 0.51), // Green for strengths
  orange: rgb(0.96, 0.62, 0.06), // Orange for warnings
  yellow: rgb(0.98, 0.74, 0.02), // Yellow for action items
};

const LAYOUT = {
  margin: 20,
  headerHeight: 100,
  titleHeight: 40,
  cardPadding: 12,
  cardGap: 10,
  lineHeight: 12,
  sectionGap: 15,
  tablePadding: 8,
  chartHeight: 60,
};

async function fetchAB(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) {
      console.warn(`Resource not found: ${url} (${r.status})`);
      throw new Error(`Fetch failed: ${url} (${r.status})`);
    }
    return await r.arrayBuffer();
  } catch (error) {
    console.warn(`Failed to fetch ${url}:`, error.message);
    throw error;
  }
}

function wrap(font, text, size, maxWidth) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const out = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (maxWidth && font.widthOfTextAtSize(test, size) > maxWidth) {
      if (line) out.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) out.push(line);
  return out;
}

function drawBarChart(page, x, y, width, height, data, font) {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (width - (data.length - 1) * 4) / data.length;
  
  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * (height - 20);
    const barX = x + index * (barWidth + 4);
    const barY = y - barHeight;
    
    // Draw bar
    page.drawRectangle({
      x: barX, y: barY, width: barWidth, height: barHeight,
      color: item.color || THEME.blue
    });
    
    // Draw label
    page.drawText(item.label, {
      x: barX + barWidth/2 - font.widthOfTextAtSize(item.label, 8)/2,
      y: y - height + 5, size: 8, font, color: THEME.muted
    });
    
    // Draw value
    page.drawText(String(item.value), {
      x: barX + barWidth/2 - font.widthOfTextAtSize(String(item.value), 7)/2,
      y: barY - 15, size: 7, font, color: THEME.text
    });
  });
}

function drawTable(page, x, y, width, headers, rows, font) {
  const rowHeight = 20;
  const colWidth = width / headers.length;
  
  // Draw headers
  page.drawRectangle({
    x, y: y - rowHeight, width, height: rowHeight,
    color: THEME.cardBg, borderColor: THEME.border, borderWidth: 1
  });
  
  headers.forEach((header, index) => {
    page.drawText(header, {
      x: x + index * colWidth + LAYOUT.tablePadding,
      y: y - 15, size: 10, font, color: THEME.text
    });
  });
  
  // Draw rows
  rows.forEach((row, rowIndex) => {
    const rowY = y - (rowIndex + 1) * rowHeight;
    page.drawRectangle({
      x, y: rowY, width, height: rowHeight,
      color: rowIndex % 2 === 0 ? THEME.bg : THEME.cardBg,
      borderColor: THEME.border, borderWidth: 0.5
    });
    
    row.forEach((cell, colIndex) => {
      page.drawText(String(cell), {
        x: x + colIndex * colWidth + LAYOUT.tablePadding,
        y: rowY + 5, size: 9, font, color: THEME.text
      });
    });
  });
}

function drawProgressBar(page, x, y, width, height, progress, color = THEME.blue, font) {
  // Background
  page.drawRectangle({
    x, y, width, height,
    color: THEME.border
  });
  
  // Progress fill
  const fillWidth = (progress / 100) * width;
  page.drawRectangle({
    x, y, width: fillWidth, height,
    color: color
  });
  
  // Progress text
  const progressText = `${Math.round(progress)}%`;
  const textWidth = font ? font.widthOfTextAtSize(progressText, 8) : 20;
  page.drawText(progressText, {
    x: x + width/2 - textWidth/2, y: y + height/2 - 4,
    size: 8, font, color: THEME.text
  });
}

export default function PDFGenerator({ data }) {
  const [status, setStatus] = useState('idle');
  const [url, setUrl] = useState('');

  const generate = useCallback(async () => {
    try {
      setStatus('working');
      setUrl('');

      const pdf = await PDFDocument.create();

      // Font (custom if provided)
      let font;
      try {
        const bytes = await fetchAB('/fonts/ProfixionSans-Regular.woff2');
        font = await pdf.embedFont(bytes, { subset: true });
      } catch (error) {
        console.warn('Custom font not found, using Helvetica:', error.message);
        font = await pdf.embedFont(StandardFonts.Helvetica);
      }

      const page = pdf.addPage([PAGE.W, PAGE.H]);
      
      // Dark background
      page.drawRectangle({ 
        x: 0, y: 0, width: PAGE.W, height: PAGE.H, 
        color: THEME.bg 
      });

      let y = PAGE.H - LAYOUT.margin;

      // ---------- HEADER SECTION ----------
      // PROFIXION Logo (centered) - Try to load image first, fallback to text
      let logoBox = null;
      try {
        console.log('Loading logo from /logo.png...');
        const logoBytes = await fetchAB('/logo.png');
        let logoImage;
        try { 
          logoImage = await pdf.embedPng(logoBytes); 
        } catch { 
          logoImage = await pdf.embedJpg(logoBytes); 
        }

        // Scale logo to be even larger and more prominent
        const maxLogoWidth = 500;
        const maxLogoHeight = 150;
        const scale = Math.min(maxLogoWidth / logoImage.width, maxLogoHeight / logoImage.height, 1);
        const logoWidth = logoImage.width * scale;
        const logoHeight = logoImage.height * scale;
        const logoX = (PAGE.W - logoWidth) / 2;
        const logoY = y - logoHeight - 10;

        page.drawImage(logoImage, { 
          x: logoX, y: logoY, 
          width: logoWidth, height: logoHeight 
        });
        
        logoBox = { x: logoX, y: logoY, width: logoWidth, height: logoHeight };
        console.log('Logo image loaded successfully');
      } catch (error) {
        console.warn('Could not load logo image, using text fallback:', error.message);
        // Fallback to text logo
        const logoText = 'PROFIXION';
        const logoSize = 24;
        const logoWidth = font.widthOfTextAtSize(logoText, logoSize);
        const logoX = (PAGE.W - logoWidth) / 2;
        page.drawText(logoText, { 
          x: logoX, y: y - 20, size: logoSize, font, 
          color: THEME.text 
        });
        logoBox = { x: logoX, y: y - 20, width: logoWidth, height: 30 };
      }

      // Update y position to account for logo height (no duplicate tagline)
      y = logoBox.y - 30;

      // Date and URL (top right)
      const dateStr = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric' 
      });
      const dateSize = 10;
      const dateWidth = font.widthOfTextAtSize(dateStr, dateSize);
      page.drawText(dateStr, { 
        x: PAGE.W - LAYOUT.margin - dateWidth, y: y - 20, 
        size: dateSize, font, color: THEME.text 
      });

      const urlText = data.url || data.profileUrl || ''; // Use new 'url' key
      const urlSize = 8;
      const urlWidth = font.widthOfTextAtSize(urlText, urlSize);
      page.drawText(urlText, { 
        x: PAGE.W - LAYOUT.margin - urlWidth, y: y - 35, 
        size: urlSize, font, color: THEME.text 
      });

      y -= 60;

      // ---------- MAIN TITLE ----------
      const title = 'AI-POWERED SOCIAL MEDIA AUDIT REPORT';
      const titleSize = 20;
      page.drawText(title, { 
        x: LAYOUT.margin, y: y, size: titleSize, font, 
        color: THEME.blue 
      });

      y -= 40;

      // ---------- ENHANCED LAYOUT WITH TABLES & CHARTS ----------
      const cardWidth = (PAGE.W - 2 * LAYOUT.margin - LAYOUT.cardGap) / 2;
      const cardHeight = 100;

      // Row 1: Profile Strength + Metrics Overview
      // Profile Strength Card (left) - Enhanced with progress bar
      page.drawRectangle({
        x: LAYOUT.margin, y: y - cardHeight, 
        width: cardWidth, height: cardHeight,
        color: THEME.cardBg, 
        borderColor: THEME.border, 
        borderWidth: 1
      });

      page.drawText('Profile Strength', { 
        x: LAYOUT.margin + LAYOUT.cardPadding, y: y - 15, 
        size: 12, font, color: THEME.text 
      });

      const score = data.overallScore || 0;
      const scoreLabel = score >= 70 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work';
      
      // Large score display
      page.drawText(String(score), { 
        x: LAYOUT.margin + LAYOUT.cardPadding, y: y - 35, 
        size: 24, font, color: THEME.blue 
      });
      
      page.drawText(scoreLabel, { 
        x: LAYOUT.margin + LAYOUT.cardPadding + 40, y: y - 35, 
        size: 10, font, color: THEME.text 
      });

      // Progress bar
      drawProgressBar(page, LAYOUT.margin + LAYOUT.cardPadding, y - 55, cardWidth - 2 * LAYOUT.cardPadding, 8, score, THEME.blue, font);

      // Metrics Overview Card (right)
      page.drawRectangle({
        x: LAYOUT.margin + cardWidth + LAYOUT.cardGap, y: y - cardHeight, 
        width: cardWidth, height: cardHeight,
        color: THEME.cardBg, 
        borderColor: THEME.border, 
        borderWidth: 1
      });

      page.drawText('Key Metrics', { 
        x: LAYOUT.margin + cardWidth + LAYOUT.cardGap + LAYOUT.cardPadding, y: y - 15, 
        size: 12, font, color: THEME.text 
      });

      // Mini metrics - using real data
      const metrics = [
        { 
          label: 'Connections', 
          value: data.connectionCount ? `${data.connectionCount}` : 'N/A', 
          color: THEME.blue 
        },
        { 
          label: 'Posts/Month', 
          value: data.monthlyPosts ? `${data.monthlyPosts}` : 'N/A', 
          color: THEME.green 
        },
        { 
          label: 'Engagement', 
          value: data.engagementRate ? `${data.engagementRate}%` : 'N/A', 
          color: THEME.orange 
        }
      ];

      let metricX = LAYOUT.margin + cardWidth + LAYOUT.cardGap + LAYOUT.cardPadding;
      metrics.forEach((metric, index) => {
        page.drawText(metric.value, { 
          x: metricX, y: y - 35, 
          size: 14, font, color: metric.color 
        });
        page.drawText(metric.label, { 
          x: metricX, y: y - 50, 
          size: 8, font, color: THEME.muted 
        });
        metricX += 45;
      });

      y -= cardHeight + LAYOUT.cardGap;

      // Row 2: Detailed Analysis Table + Engagement Chart
      // Analysis Table Card (left)
      page.drawRectangle({
        x: LAYOUT.margin, y: y - 120, 
        width: cardWidth, height: 120,
        color: THEME.cardBg, 
        borderColor: THEME.border, 
        borderWidth: 1
      });

      page.drawText('Profile Analysis', { 
        x: LAYOUT.margin + LAYOUT.cardPadding, y: y - 15, 
        size: 12, font, color: THEME.text 
      });

      // Analysis table - using real data
      const analysisHeaders = ['Category', 'Score', 'Status'];
      const analysisRows = [
        ['Profile Photo', data.profilePhotoScore ? `${data.profilePhotoScore}%` : 'N/A', data.profilePhotoStatus || 'N/A'],
        ['Headline', data.headlineScore ? `${data.headlineScore}%` : 'N/A', data.headlineStatus || 'N/A'],
        ['Summary', data.summaryScore ? `${data.summaryScore}%` : 'N/A', data.summaryStatus || 'N/A'],
        ['Experience', data.experienceScore ? `${data.experienceScore}%` : 'N/A', data.experienceStatus || 'N/A'],
        ['Skills', data.skillsScore ? `${data.skillsScore}%` : 'N/A', data.skillsStatus || 'N/A']
      ];

      drawTable(page, LAYOUT.margin + LAYOUT.cardPadding, y - 35, cardWidth - 2 * LAYOUT.cardPadding, analysisHeaders, analysisRows, font);

      // Engagement Chart Card (right)
      page.drawRectangle({
        x: LAYOUT.margin + cardWidth + LAYOUT.cardGap, y: y - 120, 
        width: cardWidth, height: 120,
        color: THEME.cardBg, 
        borderColor: THEME.border, 
        borderWidth: 1
      });

      page.drawText('Engagement Trends', { 
        x: LAYOUT.margin + cardWidth + LAYOUT.cardGap + LAYOUT.cardPadding, y: y - 15, 
        size: 12, font, color: THEME.text 
      });

      // Bar chart data - using real data
      const chartData = data.engagementTrends || [
        { label: 'Jan', value: 45, color: THEME.blue },
        { label: 'Feb', value: 52, color: THEME.blue },
        { label: 'Mar', value: 38, color: THEME.orange },
        { label: 'Apr', value: 61, color: THEME.green },
        { label: 'May', value: 48, color: THEME.blue }
      ];

      drawBarChart(page, LAYOUT.margin + cardWidth + LAYOUT.cardGap + LAYOUT.cardPadding, y - 35, cardWidth - 2 * LAYOUT.cardPadding, 60, chartData, font);

      y -= 120 + LAYOUT.cardGap;

      // Row 3: Strengths & Weaknesses with Action Plan
      
      // ✅ CHANGE 1: Define a new height for this row to fit the new content
      const row3Height = 150; 

      // Strengths Card (left)
      // ✅ CHANGE 2: Update height for this card to match its neighbor
      page.drawRectangle({
        x: LAYOUT.margin, y: y - row3Height, 
        width: cardWidth, height: row3Height,
        color: THEME.cardBg, 
        borderColor: THEME.border, 
        borderWidth: 1
      });

      page.drawText('Strengths', { 
        x: LAYOUT.margin + LAYOUT.cardPadding, y: y - 15, 
        size: 12, font, color: THEME.text 
      });

      const strengths = (data.strengths || [
        'Complete profile',
        'Clear career progression', 
        'Recommendations present',
        'Good connection count',
        'Active on LinkedIn'
      ]).slice(0, 5); // Keep it to 5 to fit

      let itemY = y - 35;
      strengths.forEach((item, index) => {
        // Green checkmark
        page.drawCircle({
          x: LAYOUT.margin + LAYOUT.cardPadding + 6, 
          y: itemY - 6, 
          size: 4, 
          color: THEME.green
        });
        
        // This is a bit of a hack to make a checkmark, replace with a real icon if possible
        // page.drawText('✓', { 
        //   x: LAYOUT.margin + LAYOUT.cardPadding + 3, y: itemY - 4, 
        //   size: 3, font, color: THEME.bg 
        // });

        page.drawText(item, { 
          x: LAYOUT.margin + LAYOUT.cardPadding + 15, y: itemY - 6, 
          size: 9, font, color: THEME.text 
        });
        itemY -= 12;
      });

      
      // ✅ CHANGE 3: Replaced "Action Plan" with "Parameter Scores"
      
      // Parameter Scores Card (right)
      page.drawRectangle({
        x: LAYOUT.margin + cardWidth + LAYOUT.cardGap, y: y - row3Height, 
        width: cardWidth, height: row3Height,
        color: THEME.cardBg, 
        borderColor: THEME.border, 
        borderWidth: 1
      });

      page.drawText('Parameter Scores', { 
        x: LAYOUT.margin + cardWidth + LAYOUT.cardGap + LAYOUT.cardPadding, y: y - 15, 
        size: 12, font, color: THEME.text 
      });

      // Get the new parameter scores data
      const scores = data.parameterScores || [
        { parameterName: 'Headline', score: 0, justification: 'N/A' },
        { parameterName: 'About Section', score: 0, justification: 'N/A' },
        { parameterName: 'Experience', score: 0, justification: 'N/A' },
        { parameterName: 'Skills', score: 0, justification: 'N/A' }
      ];

      itemY = y - 35; // Reset Y position for this card's content
      const scoreCardX = LAYOUT.margin + cardWidth + LAYOUT.cardGap + LAYOUT.cardPadding;
      const scoreCardWidth = cardWidth - 2 * LAYOUT.cardPadding;
      
      scores.slice(0, 4).forEach((item, index) => { // Sliced to 4 to ensure it fits
        if (itemY < y - row3Height + 20) return; // Stop if we run out of space

        // Draw Parameter Name
        page.drawText(item.parameterName, { 
          x: scoreCardX, y: itemY, 
          size: 9, font, color: THEME.text 
        });

        // Draw Score (e.g., "8/10")
        const scoreText = `${item.score}/10`;
        const scoreTextWidth = font.widthOfTextAtSize(scoreText, 10);
        page.drawText(scoreText, {
          x: scoreCardX + scoreCardWidth - scoreTextWidth, // Align right
          y: itemY,
          size: 10, font, color: THEME.blue
        });
        
        itemY -= 12; // Move down for justification

        // Draw Justification (wrapped)
        const justificationLines = wrap(font, item.justification, 7, scoreCardWidth);
        justificationLines.slice(0, 2).forEach(line => { // Max 2 lines of justification
          if (itemY < y - row3Height + 10) return;
          page.drawText(line, {
            x: scoreCardX, y: itemY,
            size: 7, font, color: THEME.muted
          });
          itemY -= 9; // Smaller line height for justification
        });
        
        itemY -= 5; // Extra padding between items
      });

      // ✅ CHANGE 4: Update y-position based on new row height
      y -= row3Height + LAYOUT.sectionGap;


      // ---------- FOOTER ----------
      page.drawText(
        'Generated by Profixion - Enhance your online presence with AI-driven social media insights',
        { x: LAYOUT.margin, y: 30, size: 8, font, color: THEME.muted }
      );

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const link = URL.createObjectURL(blob);
      setUrl(link);
      setStatus('ready');
      window.open(link, '_blank');
    } catch (e) {
      console.error(e);
      setStatus('error');
      alert(e.message || 'PDF generation failed');
    }
  }, [data]);

  return (
    <div style={{ color: '#e5e7eb' }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Profixion — Generate PDF</h2>
      <p style={{ opacity: 0.8 }}>Logo file must be at <code>/public/logo.png</code>. This layout avoids overlap and auto-spaces sections.</p>

      <button
        onClick={generate}
        disabled={status === 'working'}
        style={{ background: '#3b82f6', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
      >
        {status === 'working' ? 'Generating…' : 'Generate & Preview PDF'}
      </button>

      {status === 'ready' && url && (
        <div style={{ marginTop: 12 }}>
          <a href={url} download={`profixion_audit_${Date.now()}.pdf`} style={{ color: '#60a5fa' }}>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}