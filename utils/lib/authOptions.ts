// utils/lib/authOptions.ts

import { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

const clientId = process.env.AZURE_AD_CLIENT_ID!;
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET!;
const tenantId = process.env.AZURE_AD_TENANT_ID!;
const nextAuthSecret = process.env.NEXTAUTH_SECRET!;

if (!clientId || !clientSecret || !tenantId || !nextAuthSecret) {
  console.error('Azure AD environment variables:', {
    clientId,
    clientSecret,
    tenantId,
    nextAuthSecret,
  });
  throw new Error('Missing Azure AD environment variables');
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId,
      clientSecret,
      tenantId,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log('JWT Callback - token:', token);
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      console.log('Session Callback - session:', session);
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log('Redirect Callback - url:', url, 'baseUrl:', baseUrl);
      return baseUrl;
    },
  },
  secret: nextAuthSecret,
  debug: true,
};
