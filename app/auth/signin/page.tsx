'use client';

import { signIn, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const SignIn = () => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
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
              Sign in with {provider.name}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
