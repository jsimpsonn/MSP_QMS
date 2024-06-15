'use client';

import { signIn, getProviders, LiteralUnion, ClientSafeProvider, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from 'next/navigation';

const SignIn = () => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    redirect('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* You can add any additional content here if needed */}
        </CardContent>
        <CardFooter>
          {Object.values(providers).map((provider: ClientSafeProvider) => (
            <Button key={provider.name} className="w-full" onClick={() => signIn(provider.id)}>
              Sign in with Microsoft account
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
