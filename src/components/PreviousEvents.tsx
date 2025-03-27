"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import streetArtImage from '@/assets/images/street-art.png';
import danceImage from '@/assets/images/dance.png';
import fashionImage from '@/assets/images/fashion.png';


const previousEvents = [
  {
    id: 1,
    title: "We Grillin' Too",
    date: "August 2022",
    location: "Downtown District",
    attendees: "2.5K",
    imageUrl: streetArtImage,
    category: "Art & Culture"
  },
  {
    id: 2,
    title: "Salud!",
    date: "May 2023",
    location: "Metro Arena",
    attendees: "1.8K",
    imageUrl: danceImage,
    category: "Dance"
  },
  {
    id: 3,
    title: "Spring Collection Fashion Show",
    date: "March 2024",
    location: "Fashion District",
    attendees: "3K",
    imageUrl: fashionImage,
    category: "Fashion"
  }
];

const PreviousEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section 
      ref={sectionRef}
      className="bg-[#e6446a] py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Previous <span className="inline-block bg-gradient-to-r from-white to-white text-transparent bg-clip-text">Events</span>
          </h2>
          <p className="text-white text-xl mb-12">Relive our most iconic moments</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previousEvents.map((event, index) => (
            <div
              key={event.id}
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  priority={index === 0}
                />
                <div className="p-6">
                  <div className="text-sm text-gray-400 mb-2">{event.category}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <div className="text-gray-400 mb-4">
                    <p>{event.date} • {event.location}</p>
                    <p>{event.attendees} Attendees</p>
                  </div>
                  <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors duration-300">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousEvents;