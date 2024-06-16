// components/SessionProviderWrapper.tsx

'use client';

import { SessionProvider } from 'next-auth/react';  // Importing SessionProvider from next-auth/react
import React, { ReactNode } from 'react';  // Importing React and ReactNode type

// Interface for the props of SessionProviderWrapper component
interface SessionProviderWrapperProps {
  children: ReactNode;  // ReactNode type for children prop
}

// Functional component for wrapping children with SessionProvider
const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;  // Wrapping children with SessionProvider
};

export default SessionProviderWrapper;  // Exporting the SessionProviderWrapper component as default
