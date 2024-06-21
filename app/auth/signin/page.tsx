// app/auth/signin/page.tsx

'use client';

import {ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader,} from "@/components/ui/card";
import {redirect} from 'next/navigation';
import mspLogo from '@/public/images/logo.png';
import Image from 'next/image';
import {Separator} from "@/components/ui/separator";

/**
 * SignIn component to handle user sign-in using NextAuth providers.
 */
const SignIn = () => {
    // Define the BuiltInProviderType type inline
    type BuiltInProviderType = 'email' | 'credentials';

    // State to hold the authentication providers
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    // Use the useSession hook to get current session data and status
    const {data: session, status} = useSession();

    useEffect(() => {
        // Define an async function to fetch providers
        const fetchProviders = async () => {
            try {
                // Check if providers are cached in localStorage
                const cachedProviders = localStorage.getItem('authProviders');

                if (cachedProviders) {
                    // If cached providers exist, parse and use them
                    setProviders(JSON.parse(cachedProviders));
                } else {
                    // If no cached providers, fetch them from the API
                    const res = await getProviders();
                    setProviders(res);

                    // Cache the fetched providers in localStorage
                    localStorage.setItem('authProviders', JSON.stringify(res));
                }
            } catch (error) {
                // Handle any errors (e.g., localStorage not available)
                console.error('Error fetching or caching providers:', error);

                // Fallback to fetching providers without caching
                const res = await getProviders();
                setProviders(res);
            }
        };

        // Call the fetchProviders function
        fetchProviders();

        // Set up a timer to refresh the cache every hour
        const refreshTimer = setInterval(() => {
            try {
                // Remove the cached providers
                localStorage.removeItem('authProviders');
            } catch (error) {
                console.error('Error clearing cached providers:', error);
            }
            // Fetch providers again
            fetchProviders();
        }, 3600000); // 1 hour in milliseconds

        // Clean up function to clear the interval when the component unmounts
        return () => clearInterval(refreshTimer);
    }, []); // Empty dependency array means this effect runs once on mount

    // Show loading state if providers are not yet loaded
    if (!providers) {
        return <div>Loading...</div>;
    }

    // If the user is authenticated, redirect to the home page
    if (status === 'authenticated') {
        redirect('/');
        return null;
    }

    // Render the sign-in UI
    return (
        <div className="login flex items-center justify-center min-h-screen overflow-hidden place-c">
            <Card className="w-96">
                <CardHeader className="flex flex-col items-center">
                    <Image src={mspLogo} alt="Logo" width={220} height={80} className="mb-4"/>
                    <CardDescription>
                        Sign in to your account.
                    </CardDescription>
                </CardHeader>
                <Separator/>
                <CardContent className="grid gap-4">
                    {/* You can add any additional content here if needed */}
                </CardContent>
                <CardFooter>
                    {/* Map through the providers and create a sign-in button for each */}
                    {Object.values(providers).map((provider: ClientSafeProvider) => (
                        <Button
                            key={provider.name}
                            className="w-full"
                            onClick={() => signIn(provider.id)}
                        >
                            Continue with Microsoft account
                        </Button>
                    ))}
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignIn;
