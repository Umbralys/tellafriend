'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, X, Loader2, MailCheck, AlertTriangle, Mail } from 'lucide-react';
import logo from '@/assets/images/tell-a-friend-logo.png';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const success = searchParams.get('success');
  const error = searchParams.get('error');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [message, setMessage] = useState('');

  // If direct verification from email link
  useEffect(() => {
    if (success === 'true') {
      setVerificationStatus('success');
      setMessage('Your email has been verified successfully!');
    } else if (error === 'true') {
      setVerificationStatus('error');
      setMessage('Verification failed. The link may be invalid or expired.');
    } else if (token) {
      verifyEmail(token);
    }
  }, [success, error, token]);

  const verifyEmail = async (tokenValue) => {
    setIsVerifying(true);
    setVerificationStatus('idle');
    
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: tokenValue }),
      });

      const data = await response.json();

      if (data.success) {
        setVerificationStatus('success');
        setMessage(data.message || 'Your email has been verified successfully!');
      } else {
        setVerificationStatus('error');
        setMessage(data.message || 'Verification failed. The link may be invalid or expired.');
      }
    } catch (err) {
      setVerificationStatus('error');
      setMessage('An error occurred during verification. Please try again.');
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <Image
            src={logo}
            alt="Tell a Friend"
            height={60}
            className="h-16 w-auto"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Email Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {isVerifying ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 size={48} className="text-yellow-400 animate-spin" />
                <p className="text-white">Verifying your email...</p>
              </div>
            ) : verificationStatus === 'success' ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-medium text-white">Verification Successful</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <Link href="/signin" className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200">
                  Sign In
                </Link>
              </div>
            ) : verificationStatus === 'error' ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-medium text-white">Verification Failed</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <div className="bg-gray-800 p-4 rounded-md text-sm text-gray-300 text-left">
                  <div className="flex items-start mb-3">
                    <AlertTriangle size={18} className="text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p>The verification link may have expired or is invalid. Verification links are valid for 24 hours after registration.</p>
                  </div>
                  <p className="mb-4">Need a new verification link?</p>
                  <Link href="/resend-verification" className="bg-yellow-400 text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-300 transition-colors">
                    Request New Verification Link
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <MailCheck size={48} className="text-yellow-400" />
                <h3 className="text-xl font-medium text-white">Verify Your Email</h3>
                {token ? (
                  <div>
                    <p className="text-gray-400 mb-6">Click the button below to verify your email address.</p>
                    <button
                      onClick={() => verifyEmail(token)}
                      className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200"
                    >
                      Verify Email
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-400 mb-6">Check your email for a verification link. If you haven't received it, you can request a new one.</p>
                    <Link href="/resend-verification" className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors duration-200">
                      Request Verification Link
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}