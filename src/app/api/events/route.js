// src/app/api/events/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Helper function to check if user is admin
async function isAdmin(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return false;
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Here you'd typically check if the user has admin privileges
    // For now, we'll just verify they're authenticated
    return !!decoded.id;
  } catch (error) {
    return false;
  }
}

// GET all events (public)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;
    
    await connectToDatabase();
    
    // Build query
    let query = {};
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (category) {
      query.category = category;
    }
    
    // Get events with pagination
    const events = await Event.find(query)
      .sort({ date: 1 }) // Sort by date ascending (upcoming first)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Event.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST new event (admin only)
export async function POST(request) {
  try {
    // Check admin status
    const admin = await isAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // Create new event
    const event = await Event.create(body);
    
    return NextResponse.json(
      { success: true, data: event },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create event',
        error: error.message
      },
      { status: 500 }
    );
  }
}