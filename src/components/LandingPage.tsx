"use client";

import React from 'react';
import Header from './Header';
import Hero from './Hero';
import PreviousEvents from './PreviousEvents';
import Merchandise from './Merchandise';
import OnlyFriends from './OnlyFriends';
import UpcomingEvents from './UpcomingEvents';
import PhotoGallery from './PhotoGallery';
import Footer from './Footer';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <PreviousEvents />
      <Merchandise />
      <UpcomingEvents />
      <OnlyFriends />
      <PhotoGallery />
      <Footer />
    </div>
  );
};

export default LandingPage;