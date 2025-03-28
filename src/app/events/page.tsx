"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Timer, Ticket, Loader } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define the Event interface to match your MongoDB schema
interface Event {
  _id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  address?: string;
  category?: string;
  imageUrl?: string;
  ticketPrice?: string;
  status?: 'Selling Fast' | 'Tickets Available' | 'Early Bird' | 'Sold Out';
  description?: string;
  featured?: boolean;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.data);
        } else {
          setError('Failed to load events');
        }
      } catch (err) {
        setError('An error occurred while fetching events');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Animation effect
  useEffect(() => {
    setIsVisible(true); // Make content visible on page load
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getStatusStyle = (status?: string): string => {
    switch (status) {
      case 'Selling Fast':
        return 'bg-[#fad11b] text-black';
      case 'Early Bird':
        return 'bg-green-500 text-black';
      case 'Sold Out':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-[#e6446a] text-white';
    }
  };

  // Format date from ISO to readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Main content with padding for header */}
      <main className="pt-24 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Upcoming <span className="text-[#e6446a]">Events</span>
        </h1>
        
        <p className="text-gray-300 mb-12 text-lg">
          Browse our upcoming events and secure your tickets before they sell out.
        </p>
        
        {/* Events List */}
        <section 
          ref={sectionRef}
          className="relative overflow-hidden mb-20"
        >
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 text-white animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-900/30 text-white p-4 rounded-lg mb-8">
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <p className="text-white text-lg">No events found</p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event, index) => (
                <div
                  key={event._id}
                  className={`transform transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                >
                  <div className={`bg-gradient-to-b from-gray-900 via-[#1d4d57] to-[#69c2df] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 
                    ${event.featured ? 'border-2 border-[#4ba4bf]' : 'border border-gray-700'}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Image Section */}
                      <div className="relative h-64 lg:h-full">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                            <p className="text-gray-400">No image available</p>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-black/50 text-white backdrop-blur-sm">
                            {event.category || 'General'}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 lg:col-span-2">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                          {event.status && (
                            <span className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusStyle(event.status)}`}>
                              {event.status}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-white mb-6">{event.description || 'No description available'}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center text-white">
                            <Calendar size={20} className="text-[#fad11b] mr-2" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center text-white">
                              <Timer size={20} className="text-[#fad11b] mr-2" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center text-white">
                              <MapPin size={20} className="text-[#fad11b] mr-2" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.ticketPrice && (
                            <div className="flex items-center text-white">
                              <Ticket size={20} className="text-[#fad11b] mr-2" />
                              <span>{event.ticketPrice}</span>
                            </div>
                          )}
                        </div>

                        <button className="bg-[#fad11b]/90 text-black px-8 py-3 rounded-full font-bold hover:bg-[#69c2df] transition-all duration-300">
                          Get Tickets
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;