"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import neonBg from '@/assets/images/neon-waves.png';

const upcomingEvents = [
  { id: 1, name: "Street Art Festival", date: "March 15, 2025" },
  { id: 2, name: "Urban Dance Battle", date: "March 22, 2025" },
  { id: 3, name: "Streetwear Pop-up", date: "April 5, 2025" }
];

const Hero = () => {
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={neonBg}
          alt="Neon Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Multiple overlay layers for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
      </div>

      {/* Events Dropdown Container - Positioned absolutely */}
      <div className="absolute inset-x-0 bottom-0 z-40 container mx-auto px-4 pb-32">
        <div className="relative inline-block text-left w-72">
          <button
            onClick={() => setIsEventsOpen(!isEventsOpen)}
            style={{ backgroundColor: '#e6446a' }}
            className="w-full text-white px-6 py-3 rounded-lg font-bold flex items-center justify-between hover:opacity-90 transition-all duration-200 shadow-[0_0_15px_rgba(230,68,106,0.3)]"
          >
            <span>Upcoming Events</span>
            <ChevronDown size={20} />
          </button>

          {isEventsOpen && (
            <div className="absolute mt-2 w-full bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-[#e6446a]/20">
              {upcomingEvents.map((event) => (
                <a
                  key={event.id}
                  href="#"
                  className="block px-6 py-3 text-white hover:bg-[#e6446a]/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="font-bold">{event.name}</div>
                  <div className="text-sm text-gray-400">{event.date}</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-white text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          THE EVENT LIFESTYLE <span style={{ color: '#e6446a' }}>BRAND</span>
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl">
          Join the movement. Experience urban culture through exclusive events, premium merchandise, and a vibrant community.{' '}
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-500 text-transparent bg-clip-text font-bold animate-pulse-gradient">
            Tell a friend!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Hero;