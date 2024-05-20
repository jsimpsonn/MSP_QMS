// app/layout.tsx
import './globals.css';
import Sidebar from './components/Sidebar';
import React from 'react';

export const metadata = {
  title: 'QMS App',
  description: 'Quality Management System Application',
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
