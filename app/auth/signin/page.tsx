// app/auth/signin/page.tsx

'use client';

import { signIn, getProviders, LiteralUnion, ClientSafeProvider, useSession } from 'next-auth/react';  // Importing necessary functions and types from next-auth/react
import { BuiltInProviderType } from 'next-auth/providers';  // Importing the BuiltInProviderType type
import { useEffect, useState } from 'react';  // Importing React hooks
import { Button } from "@/components/ui/button";  // Importing Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";  // Importing Card components
import { redirect } from 'next/navigation';  // Importing redirect function from next/navigation

// Functional component for the SignIn page
const SignIn = () => {
  // State to hold the authentication providers
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const { data: session, status } = useSession();  // Using useSession hook to get session data and status

  // useEffect hook to fetch the providers when the component mounts
  useEffect(() => {
    (async () => {
      const res = await getProviders();  // Fetching the authentication providers
      setProviders(res);  // Setting the providers state
    })();
  }, []);

  if (!providers) {  // If providers are not yet loaded, show a loading message
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {  // If the user is authenticated, redirect to the home page
    redirect('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>  {/* Card title */}
          <CardDescription>
            Sign in to your account.  {/* Card description */}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* You can add any additional content here if needed */}
        </CardContent>
        <CardFooter>
          {Object.values(providers).map((provider: ClientSafeProvider) => (
            <Button key={provider.name} className="w-full" onClick={() => signIn(provider.id)}>
              Sign in with Microsoft account  {/* Button to sign in with Microsoft account */}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;  // Exporting the SignIn component as default
