// providers/Providers.js
'use client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}