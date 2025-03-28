// src/app/admin/events/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthContext';
import Header from '@/components/Header';
import { Plus, Pencil, Trash2, AlertCircle, Loader } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  status: string;
  featured: boolean;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  // Check authentication
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/signin?returnUrl=/admin/events');
    }
  }, [loading, isAuthenticated, router]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.data);
        } else {
          setError('Failed to load events');
        }
      } catch (err) {
        setError('An error occurred while fetching events');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  // Delete event
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Remove event from the list
          setEvents(events.filter(event => event._id !== id));
        } else {
          setError('Failed to delete event');
        }
      } catch (err) {
        setError('An error occurred while deleting the event');
        console.error(err);
      }
    }
  };

  // Loading state
  if (loading || !isAuthenticated) {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Manage Events</h1>
          
          <Link 
            href="/admin/events/new" 
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Event
          </Link>
        </div>
        
        {error && (
          <div className="bg-red-900/30 text-white p-4 rounded-lg mb-8 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <p>{error}</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader className="h-8 w-8 text-white animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-white text-lg mb-6">No events found</p>
            <Link 
              href="/admin/events/new" 
              className="bg-yellow-400 text-black px-6 py-2 rounded-full inline-block hover:bg-yellow-300 transition-colors"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {events.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {event.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{event.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{event.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${event.status === 'Selling Fast' ? 'bg-yellow-100 text-yellow-800' : 
                          event.status === 'Early Bird' ? 'bg-green-100 text-green-800' : 
                          event.status === 'Sold Out' ? 'bg-gray-100 text-gray-800' : 
                          'bg-blue-100 text-blue-800'}`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {event.featured ? 'Yes' : 'No'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/admin/events/edit/${event._id}`}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}