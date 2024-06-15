// src/components/SessionProviderWrapper.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface SessionProviderWrapperProps {
  children: ReactNode;
}

const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
