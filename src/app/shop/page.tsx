"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import logo from '@/assets/images/taf-logo.png';

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Main content with padding for header */}
      <main className="pt-24 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Our <span className="text-[#fad11b]">Shop</span>
        </h1>
        
        <p className="text-gray-300 mb-8 text-lg">
          Our merchandise shop is currently under development. We're working on bringing you
          exclusive apparel and accessories from our brand.
        </p>
        
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md text-center">
            <div className="flex justify-center mb-6">
              <Image 
                src={logo} 
                alt="Tell a Friend Logo" 
                width={80} 
                height={80} 
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Store Opening Soon</h2>
            <p className="text-gray-400 mb-6">
              We're putting the finishing touches on our online store. Sign up for our newsletter 
              to be notified when we launch and get access to exclusive opening offers.
            </p>
            <a 
              href="/"
              className="inline-block bg-[#fad11b] text-black px-6 py-3 rounded-full font-bold hover:bg-[#fad11b]/90 transition-colors duration-300"
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

export default ShopPage;