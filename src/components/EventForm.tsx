// src/components/EventForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader, Calendar, Clock, MapPin, Tag, DollarSign, FileText, Image } from 'lucide-react';

interface EventFormProps {
  eventId?: string;
  isEdit?: boolean;
}

interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  imageUrl: string;
  ticketPrice: string;
  status: string;
  description: string;
  featured: boolean;
}

const initialEventData: EventData = {
  title: '',
  date: '',
  time: '',
  location: '',
  address: '',
  category: '',
  imageUrl: '',
  ticketPrice: '',
  status: 'Tickets Available',
  description: '',
  featured: false
};

const EventForm: React.FC<EventFormProps> = ({ eventId, isEdit = false }) => {
  const [eventData, setEventData] = useState<EventData>(initialEventData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Fetch event data if editing
  useEffect(() => {
    const fetchEvent = async () => {
      if (isEdit && eventId) {
        try {
          setIsFetching(true);
          const response = await fetch(`/api/events/${eventId}`);
          const data = await response.json();
          
          if (data.success) {
            setEventData(data.data);
          } else {
            setError('Failed to load event data');
          }
        } catch (err) {
          setError('An error occurred while fetching event data');
          console.error(err);
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchEvent();
  }, [isEdit, eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const url = isEdit ? `/api/events/${eventId}` : '/api/events';
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(isEdit ? 'Event updated successfully!' : 'Event created successfully!');
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push('/admin/events');
        }, 1500);
      } else {
        setError(data.message || 'Failed to save event');
      }
    } catch (err) {
      setError('An error occurred while saving the event');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {error && (
        <div className="bg-red-900/30 text-white p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-900/30 text-green-200 p-4 rounded-lg mb-6">
          <p>{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Event Title *
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter event title"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Date and Time */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
              Event Date *
            </label>
            <div className="relative">
              <input
                type="text"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., March 15, 2025"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
              Event Time *
            </label>
            <div className="relative">
              <input
                type="text"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 4:00 PM - 10:00 PM"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Location and Address */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
              Venue Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Urban District Gallery"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={eventData.address}
              onChange={handleChange}
              required
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Downtown Arts District"
            />
          </div>
          
          {/* Category and Image */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category *
            </label>
            <div className="relative">
              <input
                type="text"
                id="category"
                name="category"
                value={eventData.category}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Art & Culture"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
              Image URL *
            </label>
            <div className="relative">
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={eventData.imageUrl}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URL"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Ticket Price and Status */}
          <div>
            <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-300 mb-1">
              Ticket Price *
            </label>
            <div className="relative">
              <input
                type="text"
                id="ticketPrice"
                name="ticketPrice"
                value={eventData.ticketPrice}
                onChange={handleChange}
                required
                className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., $45 - $75"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={eventData.status}
              onChange={handleChange}
              required
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tickets Available">Tickets Available</option>
              <option value="Selling Fast">Selling Fast</option>
              <option value="Early Bird">Early Bird</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
              rows={4}
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event description"
            ></textarea>
          </div>
          
          {/* Featured */}
          <div className="col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={eventData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-300">
                Feature this event on the homepage
              </label>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={() => router.push('/admin/events')}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading && <Loader size={18} className="mr-2 animate-spin" />}
            {isEdit ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;