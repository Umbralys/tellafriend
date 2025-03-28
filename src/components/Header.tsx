"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/tell-a-friend-logo.png';
import { useAuth } from '../../context/AuthContext'; // Using relative path

// Define TypeScript interfaces for our auth context
interface AuthUser {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  register: (username: string, email: string, password: string) => Promise<any>;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Use type assertion to tell TypeScript about the auth context shape
  const { user, isAuthenticated, signOut } = useAuth() as AuthContextValue;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        setIsDropdownOpen(false);
      } else {
        console.error('Sign out failed:', result.message);
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="h-12 w-auto relative">
            <Link href="/">
              <Image
                src={logo}
                alt="Tell a Friend"
                height={48}
                className="w-auto h-full"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-white">
            <Link href="/shop" className="hover:text-yellow-400 transition-colors duration-200">
              Shop
            </Link>
            <Link href="/events" className="hover:text-yellow-400 transition-colors duration-200">
              Events
            </Link>
            <Link href="/gallery" className="hover:text-yellow-400 transition-colors duration-200">
              Gallery
            </Link>
            <Link href="/community" className="hover:text-yellow-400 transition-colors duration-200">
              Community
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition-colors duration-200">
              About
            </Link>
            
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User size={18} />
                  <span>{user.username}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-200">
                      Profile
                    </Link>
                    {isAuthenticated && user?.isAdmin && (
                      <Link href="/admin/events" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-200">
                        Admin Portal
                      </Link>
                    )}
                    <Link href="/orders" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-200">
                      Orders
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-white hover:bg-yellow-400 hover:text-black transition-colors duration-200"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signin" className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200">
                Sign In
              </Link>
            )}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md">
          <div className="px-4 py-2 space-y-4 text-white">
            <Link href="/shop" className="block hover:text-yellow-400 transition-colors duration-200">
              Shop
            </Link>
            <Link href="/events" className="block hover:text-yellow-400 transition-colors duration-200">
              Events
            </Link>
            <Link href="/gallery" className="block hover:text-yellow-400 transition-colors duration-200">
              Gallery
            </Link>
            <Link href="/community" className="block hover:text-yellow-400 transition-colors duration-200">
              Community
            </Link>
            <Link href="/about" className="block hover:text-yellow-400 transition-colors duration-200">
              About
            </Link>
            
            {isAuthenticated && user ? (
              <>
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-yellow-400 font-semibold">Hello, {user.username}</p>
                </div>
                <Link href="/profile" className="block hover:text-yellow-400 transition-colors duration-200">
                  Profile
                </Link>
                {isAuthenticated && user?.isAdmin && (
                  <Link href="/admin/events" className="block hover:text-yellow-400 transition-colors duration-200">
                    Admin Portal
                  </Link>
                )}
                <Link href="/orders" className="block hover:text-yellow-400 transition-colors duration-200">
                  Orders
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signin" className="w-full block text-center bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;