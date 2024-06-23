'use client';

import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { redirect } from 'next/navigation';
import mspLogo from '@/public/images/logo.png';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";

// Define the BuiltInProviderType type inline
type BuiltInProviderType = 'azure-ad' | 'credentials';

const SignIn = () => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const cachedProviders = localStorage.getItem('authProviders');
        if (cachedProviders) {
          setProviders(JSON.parse(cachedProviders));
        } else {
          const res = await getProviders();
          setProviders(res);
          localStorage.setItem('authProviders', JSON.stringify(res));
        }
      } catch (error) {
        console.error('Error fetching or caching providers:', error);
        const res = await getProviders();
        setProviders(res);
      }
    };

    fetchProviders();

    const refreshTimer = setInterval(() => {
      try {
        localStorage.removeItem('authProviders');
      } catch (error) {
        console.error('Error clearing cached providers:', error);
      }
      fetchProviders();
    }, 3600000);

    return () => clearInterval(refreshTimer);
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    redirect('/');
    return null;
  }

  return (
    <div className="login flex items-center justify-center min-h-screen overflow-hidden">
      <Card className="w-96">
        <CardHeader className="flex flex-col items-center">
          <Image src={mspLogo} alt="Logo" width={220} height={80} className="mb-4" />
          <CardDescription>Sign in to your account.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4">
        </CardContent>
        <CardFooter>
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
