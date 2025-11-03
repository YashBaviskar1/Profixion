import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Determine email transporter based on environment
// Use Ethereal Email for testing (no config needed) or Gmail for production
let transporter;

// Create transporter - use Ethereal for testing if EMAIL_PASS is not set
const createTransporter = async () => {
  if (process.env.EMAIL_PASS) {
    // Production: Use Gmail
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'pro.fixionoff@gmail.com',
        pass: process.env.EMAIL_PASS
      }
    });
    console.log('📧 Using Gmail transporter');
    return transporter;
  } else {
    // Development/Testing: Use Ethereal Email (free test service)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('🧪 Using Ethereal Email for testing');
    console.log('📧 Test account created:', testAccount.user);
    return transporter;
  }
};

// Initialize transporter
let transporterPromise = createTransporter();

// Test endpoint to check email configuration
router.get('/test', async (req, res) => {
  try {
    const transporter = await transporterPromise;
    
    if (process.env.EMAIL_PASS) {
      // Test Gmail connection
      await transporter.verify();
      res.json({
        success: true,
        mode: 'production',
        email: process.env.CONTACT_EMAIL || 'pro.fixionoff@gmail.com',
        message: 'Gmail transporter is ready'
      });
    } else {
      res.json({
        success: true,
        mode: 'testing',
        message: 'Ethereal Email is ready for testing',
        note: 'Emails will be logged to console and Ethereal preview URLs'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Contact form submission endpoint
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Wait for transporter to be ready
    const transporter = await transporterPromise;

    // Determine recipient email
    const recipientEmail = process.env.CONTACT_EMAIL || 
                          (process.env.EMAIL_PASS ? 'pro.fixionoff@gmail.com' : 'test@ethereal.email');

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_USER || (process.env.EMAIL_PASS ? 'pro.fixionoff@gmail.com' : 'noreply@profixion.com'),
      to: recipientEmail,
      replyTo: email, // So you can reply directly to the user
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the Profixion contact form.</p>
            <p>Reply to this email to respond directly to ${name}.</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log email details for testing
    console.log('📧 Email sent successfully!');
    console.log('From:', mailOptions.from);
    console.log('To:', mailOptions.to);
    console.log('Subject:', mailOptions.subject);
    console.log('Reply-To:', email);

    // If using Ethereal Email, log the preview URL
    if (!process.env.EMAIL_PASS && info.messageId) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('✉️  Preview URL:', previewUrl);
      console.log('📋 Copy this URL to view the email in your browser!');
    }

    // Return response with preview URL in testing mode
    const response = { 
      success: true, 
      message: 'Your message has been sent successfully!'
    };

    // Include preview URL if in testing mode
    if (!process.env.EMAIL_PASS && info.messageId) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      response.testMode = true;
      response.previewUrl = previewUrl;
      console.log('\n🎯 TEST MODE - Email Preview URL:', previewUrl);
      console.log('   Open this URL in your browser to see the email!\n');
    }

    res.json(response);

  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;

