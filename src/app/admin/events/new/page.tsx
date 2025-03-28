// src/app/admin/events/new/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../context/AuthContext';
import Header from '@/components/Header';
import EventForm from '@/components/EventForm';
import { Loader } from 'lucide-react';

// Define interface for auth context to fix TypeScript errors
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

export default function NewEvent() {
  const router = useRouter();
  const { loading, isAuthenticated, user } = useAuth() as AuthContextValue;

  // Check admin authentication
  React.useEffect(() => {
    if (!loading && (!isAuthenticated || !user?.isAdmin)) {
      router.push('/');
    }
  }, [loading, isAuthenticated, user, router]);

  // Loading state
  if (loading || !isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Create New Event</h1>
          <p className="text-gray-400 mt-2">Fill in the details to create a new event</p>
        </div>
        
        <EventForm />
      </main>
    </div>
  );
}