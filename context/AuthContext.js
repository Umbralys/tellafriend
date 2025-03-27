'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      }

      return { 
        success: false, 
        message: data.message || 'Invalid credentials',
        isVerified: data.isVerified
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return { 
        success: false, 
        message: 'An error occurred during sign in' 
      };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        return { success: true };
      }

      return { 
        success: false, 
        message: 'Failed to sign out' 
      };
    } catch (error) {
      console.error('Sign out error:', error);
      return { 
        success: false, 
        message: 'An error occurred during sign out' 
      };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        // Note: In the email verification flow, we don't automatically sign in
        // setUser(data.user);
      }

      return { 
        success: data.success, 
        message: data.message,
        user: data.user
      };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'An error occurred during registration' 
      };
    }
  };

  // Verify email function
  const verifyEmail = async (token) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      return { 
        success: data.success, 
        message: data.message 
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return { 
        success: false, 
        message: 'An error occurred during email verification' 
      };
    }
  };

  // Resend verification email
  const resendVerification = async (email) => {
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      return { 
        success: data.success, 
        message: data.message 
      };
    } catch (error) {
      console.error('Resend verification error:', error);
      return { 
        success: false, 
        message: 'An error occurred while sending verification email' 
      };
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    signIn,
    signOut,
    register,
    verifyEmail,
    resendVerification,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};