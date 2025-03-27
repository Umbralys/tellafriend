// src/app/api/auth/resend-verification/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { sendVerificationEmail } from '../../../../../lib/email';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // Don't reveal if user exists (security best practice)
    if (!user) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'If your email is registered, a verification link will be sent' 
        },
        { status: 200 }
      );
    }
    
    // Check if already verified
    if (user.isVerified) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'This account is already verified' 
        },
        { status: 400 }
      );
    }
    
    // Generate new verification token
    const verificationToken = user.generateVerificationToken();
    
    await user.save();
    
    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken, user.username);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'If your email is registered, a verification link will be sent' 
        },
        { status: 200 }
      );
    } catch (error) {
      // If email sending fails, remove the token
      user.verificationToken = undefined;
      user.verificationExpires = undefined;
      await user.save();
      
      console.error('Email error:', error);
      
      return NextResponse.json(
        { success: false, message: 'Failed to send verification email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}