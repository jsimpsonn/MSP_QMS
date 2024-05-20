import './globals.css';
import './fontawesome';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import React from 'react';

export const metadata = {
  title: 'QMS App',
  description: 'Quality Management System Application',
};

export default function RootLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 overflow-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
