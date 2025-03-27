// lib/email.js
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send verification email
export const sendVerificationEmail = async (email, token, username) => {
  const transporter = createTransporter();
  
  // Create verification URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const verificationUrl = `${appUrl}/verify-email?token=${token}`;
  
  // Email content
  const mailOptions = {
    from: `"Tell A Friend" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fbbf24; padding: 20px; text-align: center;">
          <h2 style="color: #000; margin: 0;">Tell A Friend</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #eee;">
          <h3>Hello ${username},</h3>
          <p>Thank you for registering with Tell A Friend. To complete your registration and activate your account, please verify your email address.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${verificationUrl}" style="background-color: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold;">Verify My Email</a>
          </div>
          <p>If you did not create an account, you can ignore this email.</p>
          <p><strong>This link is valid for 24 hours.</strong></p>
          <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px;">${verificationUrl}</p>
          <p>Best regards,<br>The Tell A Friend Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Tell A Friend. All rights reserved.</p>
        </div>
      </div>
    `
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, username) => {
  const transporter = createTransporter();
  
  // Email content
  const mailOptions = {
    from: `"Tell A Friend" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Welcome to Tell A Friend!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fbbf24; padding: 20px; text-align: center;">
          <h2 style="color: #000; margin: 0;">Tell A Friend</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #eee;">
          <h3>Welcome, ${username}!</h3>
          <p>Thank you for verifying your email. Your account is now fully activated.</p>
          <p>You can now explore all features and exclusive content on Tell A Friend. We're excited to have you join our community!</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold;">Visit Website</a>
          </div>
          <p>Best regards,<br>The Tell A Friend Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Tell A Friend. All rights reserved.</p>
        </div>
      </div>
    `
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};

// Send password reset email
export const sendPasswordResetEmail = async (email, token, username) => {
  const transporter = createTransporter();
  
  // Create reset URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/reset-password?token=${token}`;
  
  // Email content
  const mailOptions = {
    from: `"Tell A Friend" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fbbf24; padding: 20px; text-align: center;">
          <h2 style="color: #000; margin: 0;">Tell A Friend</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #eee;">
          <h3>Hello ${username},</h3>
          <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
          <p>Please click the button below to complete the process:</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="background-color: #fbbf24; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <p><strong>This link is only valid for 10 minutes.</strong></p>
          <p>If the button above doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px;">${resetUrl}</p>
          <p>Best regards,<br>The Tell A Friend Team</p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Tell A Friend. All rights reserved.</p>
        </div>
      </div>
    `
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};