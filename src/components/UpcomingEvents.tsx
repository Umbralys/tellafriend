"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Calendar, MapPin, Timer, Ticket } from 'lucide-react';
import streetArtImage from '@/assets/images/4.png';
import danceImage from '@/assets/images/5.png';
import fashionImage from '@/assets/images/6.png';

type EventStatus = 'Selling Fast' | 'Tickets Available' | 'Early Bird' | 'Sold Out';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  imageUrl: StaticImageData;
  ticketPrice: string;
  status: EventStatus;
  description: string;
  featured?: boolean;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Street Art Festival",
    date: "March 15, 2025",
    time: "4:00 PM - 10:00 PM",
    location: "Urban District Gallery",
    address: "Downtown Arts District",
    category: "Art & Culture",
    imageUrl: streetArtImage,
    ticketPrice: "$45 - $75",
    status: "Selling Fast",
    description: "Join us for a celebration of urban art featuring live paintings, installations, and interactive workshops.",
    featured: true
  },
  {
    id: 2,
    title: "Urban Dance Battle",
    date: "March 22, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Metro Arena",
    address: "City Center",
    category: "Dance",
    imageUrl: danceImage,
    ticketPrice: "$35 - $55",
    status: "Tickets Available",
    description: "Witness the ultimate showdown of street dance styles with crews from across the nation."
  },
  {
    id: 3,
    title: "Streetwear Pop-up",
    date: "April 5, 2025",
    time: "12:00 PM - 8:00 PM",
    location: "The Fashion Hub",
    address: "Fashion District",
    category: "Fashion",
    imageUrl: fashionImage,
    ticketPrice: "$25",
    status: "Early Bird",
    description: "Exclusive pop-up featuring limited edition releases and collaborative collections."
  }
];

const UpcomingEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

        {/* Events List */}
        <div className="space-y-8">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
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
      </div>
    </section>
  );
};

export default UpcomingEvents;