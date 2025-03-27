"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Lock, Users, Calendar, Gift } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Users size={24} />,
    title: "Intimate Gatherings",
    description: "Join exclusive events with limited capacity for deeper connections and genuine relationship building"
  },
  {
    icon: <Calendar size={24} />,
    title: "Priority Access",
    description: "Be first in line for our most anticipated events and get early access to new merchandise drops"
  },
  {
    icon: <Gift size={24} />,
    title: "Member Perks",
    description: "Enjoy exclusive deals, special rewards, and unique experiences crafted for our inner circle"
  }
];

const OnlyFriends = () => {
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
      className="bg-gray-900 py-20 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[#69c2df]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L17.515 10.485 18.93 11.9l7.9-7.9h-2.83zm5.656 0L23.172 12.485 24.586 13.9l7.9-7.9h-2.83zM20 0L0 20h2.83L20 2.828 37.17 20H40L20 0zm0 10.414L10.414 20h2.828L20 13.242 26.758 20h2.828L20 10.414zM30.485 20L20 30.485l-3.657-3.657-1.414 1.414L20 33.313l8.485-8.484-1.414-1.414L24.343 26.7z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center mb-4">
            <Lock size={28} className="text-[#69c2df]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Only <span className="text-[#69c2df]">Friends</span>
          </h2>
          <p className="text-white text-lg">
            An exclusive portal for those who seek deeper connections and authentic experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 h-full hover:border-[#69c2df]/50 transition-colors duration-300">
                <div className="text-[#fad11b] mb-4">{feature.icon}</div>
                <h3 className="text-white text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link href="/only-friends">
            <button className="bg-[#fad11b] text-white px-12 py-4 rounded-full font-bold hover:bg-[#69c2df]/90 transition-all duration-300 group relative overflow-hidden">
              <span className="relative z-10">Enter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#69c2df]/90 to-[#fad11b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OnlyFriends;