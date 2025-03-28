// src/components/UpcomingEvents.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Timer, Ticket } from 'lucide-react';

type EventStatus = 'Selling Fast' | 'Tickets Available' | 'Early Bird' | 'Sold Out';

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  imageUrl: string;
  ticketPrice: string;
  status: EventStatus;
  description: string;
  featured?: boolean;
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events?featured=true&limit=3');
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

  useEffect(() => {
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

  const getStatusStyle = (status: EventStatus): string => {
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

  return (
    <section 
      ref={sectionRef}
      className="bg-[#69c2df] py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-2">
            Upcoming <span className="text-gray-100">Events</span>
          </h2>
          <p className="text-white text-xl mb-16">Get ready for our next wave of experiences</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-900/30 text-white p-4 rounded-lg mb-8">
            <p>{error}</p>
            <p className="mt-2 text-sm">Please try again later or contact support if the issue persists.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg">No upcoming events at this time.</p>
            <p className="text-white/80 mt-2">Check back soon for new events!</p>
          </div>
        )}

        {/* Events List */}
        {!isLoading && !error && events.length > 0 && (
          <div className="space-y-8">
            {events.map((event, index) => (
              <div
                key={event._id}
                className={`transform transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className={`bg-gradient-to-b from-gray-900 via-[#1d4d57] to-[#69c2df] to-[#69c2df] rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 
                  ${event.featured ? 'border-2 border-[#4ba4bf]' : 'border border-gray-700'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-black/50 text-white backdrop-blur-sm">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 lg:col-span-2">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusStyle(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      
                      <p className="text-white mb-6">{event.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-white">
                          <Calendar size={20} className="text-[#fad11b] mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-white">
                          <Timer size={20} className="text-[#fad11b] mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-white">
                          <MapPin size={20} className="text-[#fad11b] mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-white">
                          <Ticket size={20} className="text-[#fad11b] mr-2" />
                          <span>{event.ticketPrice}</span>
                        </div>
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
      </div>
    </section>
  );
};

export default UpcomingEvents;