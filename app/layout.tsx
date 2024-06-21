// app/layout.tsx

'use client';  // Indicating that this file contains client-side code

import '../styles/globals.css'; // Importing global CSS styles
import {ThemeProvider} from '../components/theme-provider'; // Importing ThemeProvider component for managing themes
import SessionProviderWrapper from '../components/SessionProviderWrapper'; // Importing SessionProviderWrapper component for session management
import React, {ReactNode} from 'react'; // Importing React and ReactNode types
import {useSession} from 'next-auth/react'; // Importing useSession hook from next-auth/react for session management
import Header from '../components/Header'; // Importing Header component
import Sidebar from '../components/sidebar'; // Importing Sidebar component

// Defining the props interface for the Layout component
interface LayoutProps {
    children: ReactNode;  // ReactNode type for children prop
}

// Functional component for the main layout of the application
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {data: session, status} = useSession();  // Using useSession hook to get session data and status

    if (status === 'loading') {  // If the session status is loading, show a loading message
        return <div>Loading...</div>;
    }

    return (
        <>
            {status === 'authenticated' && <Header/>} {/* Show Header if the user is authenticated */}
            {status === 'authenticated' && <Sidebar/>} {/* Show Sidebar if the user is authenticated */}
            {children} {/* Render children components */}
        </>
    );
};

// Functional component for the layout wrapper
const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <html lang="en">
        <head>
            <title>Quality Management System</title>
        </head>
        <body>
        <SessionProviderWrapper>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AuthenticatedLayout>{children}</AuthenticatedLayout>
            </ThemeProvider>
        </SessionProviderWrapper>
        </body>
        </html>
    );
};

export default Layout;  // Exporting the Layout component as default
