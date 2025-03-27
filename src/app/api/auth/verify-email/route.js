// src/app/api/auth/verify-email/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { sendWelcomeEmail } from '../../../../../lib/email';

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with the token and check if it's still valid
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid or expired verification token' 
        },
        { status: 400 }
      );
    }
    
    // Mark user as verified
    user.isVerified = true;
    
    // Clear verification fields
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    
    await user.save();
    
    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.username);
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Continue even if welcome email fails
    }
    
    return NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully! You can now sign in.',
        isVerified: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during email verification' },
      { status: 500 }
    );
  }
}

// Also support GET requests for direct verification from email links
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with the token and check if it's still valid
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid or expired verification token' 
        },
        { status: 400 }
      );
    }
    
    // Mark user as verified
    user.isVerified = true;
    
    // Clear verification fields
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    
    await user.save();
    
    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.username);
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Continue even if welcome email fails
    }
    
    // Redirect to verification success page
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?success=true`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Email verification error:', error);
    // Redirect to verification error page
    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?error=true`;
    return NextResponse.redirect(redirectUrl);
  }
}