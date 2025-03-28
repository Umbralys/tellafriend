// src/app/api/events/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Event from '../../../../../models/Event';
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

// GET a single event by ID (public)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    await connectToDatabase();
    
    const event = await Event.findById(id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT/update an event (admin only)
export async function PUT(request, { params }) {
  try {
    // Check admin status
    const admin = await isAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const body = await request.json();
    
    await connectToDatabase();
    
    const event = await Event.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE an event (admin only)
export async function DELETE(request, { params }) {
  try {
    // Check admin status
    async function isAdmin(request) {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        if (!token) return false;
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user
        await connectToDatabase();
        const user = await user.findById(decoded.id);
        
        // Check if user exists and is an admin
        return !!(user && user.isAdmin);
      } catch (error) {
        return false;
      }
    }
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Event deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete event' },
      { status: 500 }
    );
  }
}