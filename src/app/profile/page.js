'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../components/Header';
import { User, Mail, Key, Save, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  
  // Profile state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/signin?returnUrl=/profile');
    }
  }, [loading, isAuthenticated, router]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMessage({ type: '', text: '' });
    setIsSaving(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProfileMessage({ type: 'success', text: 'Profile updated successfully' });
        setIsEditing(false);
        // Update local auth context (optional - depends on your implementation)
        // updateUser(data.user);
      } else {
        setProfileMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setProfileMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: '', text: '' });
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }
    
    setIsChangingPassword(true);

    try {
      const response = await fetch('/api/profile/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      console.error('Password change error:', error);
      setPasswordMessage({ type: 'error', text: 'An error occurred while changing password' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // Don't render content for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
          
          {/* Profile Information */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="mr-2 text-yellow-400" />
              Profile Information
            </h2>
            
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Username
                  </label>
                  <div className="flex items-center relative">
                    <User size={18} className="text-gray-500 absolute left-3" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={!isEditing}
                      className={`pl-10 w-full bg-gray-700 border ${
                        isEditing ? 'border-yellow-400' : 'border-gray-700'
                      } rounded-md py-2 px-3 text-white ${
                        !isEditing ? 'opacity-75' : ''
                      } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center relative">
                    <Mail size={18} className="text-gray-500 absolute left-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className={`pl-10 w-full bg-gray-700 border ${
                        isEditing ? 'border-yellow-400' : 'border-gray-700'
                      } rounded-md py-2 px-3 text-white ${
                        !isEditing ? 'opacity-75' : ''
                      } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    />
                  </div>
                </div>
              </div>
              
              {profileMessage.text && (
                <div className={`mb-4 p-3 rounded-md ${
                  profileMessage.type === 'error' 
                    ? 'bg-red-900/40 text-red-200' 
                    : 'bg-green-900/40 text-green-200'
                }`}>
                  {profileMessage.type === 'error' ? (
                    <AlertCircle size={18} className="inline mr-2" />
                  ) : (
                    <CheckCircle size={18} className="inline mr-2" />
                  )}
                  {profileMessage.text}
                </div>
              )}
              
              <div className="flex justify-end">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setUsername(user?.username || '');
                        setEmail(user?.email || '');
                        setProfileMessage({ type: '', text: '' });
                      }}
                      className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Password Change */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Key className="mr-2 text-yellow-400" />
              Change Password
            </h2>
            
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full bg-gray-700 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full bg-gray-700 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full bg-gray-700 border ${
                      confirmPassword && newPassword !== confirmPassword 
                        ? 'border-red-500' 
                        : 'border-gray-700'
                    } rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    placeholder="••••••••"
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">Passwords do not match</p>
                  )}
                </div>
              </div>
              
              {passwordMessage.text && (
                <div className={`mb-4 p-3 rounded-md ${
                  passwordMessage.type === 'error' 
                    ? 'bg-red-900/40 text-red-200' 
                    : 'bg-green-900/40 text-green-200'
                }`}>
                  {passwordMessage.type === 'error' ? (
                    <AlertCircle size={18} className="inline mr-2" />
                  ) : (
                    <CheckCircle size={18} className="inline mr-2" />
                  )}
                  {passwordMessage.text}
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isChangingPassword || (newPassword !== confirmPassword)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Key size={18} className="mr-2" />
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}