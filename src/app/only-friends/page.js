'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Image from 'next/image';
import { Users, Calendar, Gift, Star, Lock } from 'lucide-react';
import Header from '../../components/Header';

export default function OnlyFriendsPortal() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/signin?returnUrl=/only-friends');
    }
  }, [loading, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#69c2df]"></div>
      </div>
    );
  }

  // Show "Access Denied" if not authenticated (this prevents content flash before redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated user view
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[#69c2df]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L17.515 10.485 18.93 11.9l7.9-7.9h-2.83zm5.656 0L23.172 12.485 24.586 13.9l7.9-7.9h-2.83zM20 0L0 20h2.83L20 2.828 37.17 20H40L20 0zm0 10.414L10.414 20h2.828L20 13.242 26.758 20h2.828L20 10.414zM30.485 20L20 30.485l-3.657-3.657-1.414 1.414L20 33.313l8.485-8.484-1.414-1.414L24.343 26.7z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        {/* Welcome header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#69c2df]/20 rounded-full mb-4">
            <Lock size={24} className="text-[#69c2df]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-[#69c2df]">Only Friends</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Exclusive content and experiences for our inner circle
          </p>
          {user && (
            <div className="mt-4 inline-block bg-gray-800 px-4 py-2 rounded-full">
              <p className="text-[#fad11b]">
                Welcome back, <span className="font-bold">{user.username}</span>
              </p>
            </div>
          )}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Exclusive Event Card */}
          <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#69c2df]/20 transition-all duration-300">
            <div className="h-48 bg-gray-700 relative">
              <div className="absolute top-4 left-4 bg-[#fad11b] text-black px-3 py-1 rounded-full text-sm font-bold">
                Upcoming
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-bold mb-2">Private Listening Party</h3>
              <p className="text-gray-400 mb-4">Join us for an intimate listening session with our featured artist of the month.</p>
              <div className="flex items-center text-[#fad11b] text-sm">
                <Calendar size={16} className="mr-2" />
                <span>March 25, 2025</span>
              </div>
            </div>
          </div>

          {/* Member Spotlight */}
          <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#69c2df]/20 transition-all duration-300">
            <div className="h-48 bg-gray-700 relative">
              <div className="absolute top-4 left-4 bg-[#69c2df] text-white px-3 py-1 rounded-full text-sm font-bold">
                Community
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-bold mb-2">Member Spotlight</h3>
              <p className="text-gray-400 mb-4">This month we're highlighting the contributions of our most active community members.</p>
              <div className="flex items-center text-[#69c2df] text-sm">
                <Users size={16} className="mr-2" />
                <span>12 Featured Members</span>
              </div>
            </div>
          </div>

          {/* Exclusive Merch */}
          <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#69c2df]/20 transition-all duration-300">
            <div className="h-48 bg-gray-700 relative">
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                New Drop
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-bold mb-2">Limited Edition Merch</h3>
              <p className="text-gray-400 mb-4">Exclusive merchandise only available to Only Friends members. Limited quantities available.</p>
              <div className="flex items-center text-green-500 text-sm">
                <Gift size={16} className="mr-2" />
                <span>Members-Only Collection</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Coming Soon */}
        <div className="text-center max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 rounded-xl p-8">
          <Star size={32} className="mx-auto mb-4 text-[#fad11b]" />
          <h2 className="text-2xl font-bold text-white mb-2">More Exclusive Content Coming Soon</h2>
          <p className="text-gray-400">
            We're constantly adding new perks and exclusive content for our Only Friends members.
            Check back regularly for updates!
          </p>
        </div>
      </div>
    </div>
  );
}