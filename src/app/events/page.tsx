"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Main content with padding for header */}
      <main className="pt-24 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Upcoming <span className="text-[#e6446a]">Events</span>
        </h1>
        
        <p className="text-gray-300 mb-8 text-lg">
          Our events page is currently under construction. Check back soon for a complete 
          list of upcoming events, or return to the home page to see featured events.
        </p>
        
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400 mb-6">
              We're working on bringing you our full events calendar. In the meantime, 
              please check our social media for the latest announcements.
            </p>
            <a 
              href="/"
              className="inline-block bg-[#e6446a] text-white px-6 py-3 rounded-full font-bold hover:bg-[#e6446a]/90 transition-colors duration-300"
            >
              Return to Home
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;