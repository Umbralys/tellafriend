// models/Event.js
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  date: {
    type: String,
    required: [true, 'Please provide an event date']
  },
  time: {
    type: String,
    required: [true, 'Please provide event times']
  },
  location: {
    type: String,
    required: [true, 'Please provide an event location']
  },
  address: {
    type: String,
    required: [true, 'Please provide an event address']
  },
  category: {
    type: String,
    required: [true, 'Please provide an event category']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  ticketPrice: {
    type: String,
    required: [true, 'Please provide ticket price information']
  },
  status: {
    type: String,
    enum: ['Selling Fast', 'Tickets Available', 'Early Bird', 'Sold Out'],
    default: 'Tickets Available'
  },
  description: {
    type: String,
    required: [true, 'Please provide an event description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
EventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Prevent model compile error in development due to hot reloading
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;