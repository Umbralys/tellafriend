// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { sendVerificationEmail } from '../../../../../lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: existingUser.email === email 
            ? 'Email already in use' 
            : 'Username already taken'
        },
        { status: 400 }
      );
    }
    
    // Create new user (marked as verified for now to bypass email verification)
    const user = await User.create({
      username,
      email,
      password,
      isVerified: true // Temporarily set to true to bypass verification
    });
    
    // Skip token generation for now
    // const verificationToken = user.generateVerificationToken();
    
    // Return success with user data
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful!',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during registration'
      },
      { status: 500 }
    );
  }
}