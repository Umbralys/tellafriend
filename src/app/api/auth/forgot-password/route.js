// src/app/api/auth/forgot-password/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { sendPasswordResetEmail } from '../../../../../lib/email';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Please provide an email address' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Find user with the provided email
    const user = await User.findOne({ email });
    
    // Don't reveal if a user exists or not (security best practice)
    if (!user) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'If a user with that email exists, a password reset link will be sent' 
        },
        { status: 200 }
      );
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Set token expiry (10 minutes)
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    
    await user.save();
    
    // Send password reset email
    try {
      await sendPasswordResetEmail(
        user.email,
        resetToken,
        user.username
      );

      return NextResponse.json(
        { 
          success: true, 
          message: 'If a user with that email exists, a password reset link will be sent' 
        },
        { status: 200 }
      );
    } catch (error) {
      // If email sending fails, remove the reset token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      console.error('Email error:', error);
      
      return NextResponse.json(
        { success: false, message: 'Failed to send reset email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}