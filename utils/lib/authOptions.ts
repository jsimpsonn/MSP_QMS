// utils/lib/authOptions.ts

import { NextAuthOptions } from 'next-auth';  // Importing the NextAuthOptions type from next-auth
import AzureADProvider from 'next-auth/providers/azure-ad';  // Importing the Azure AD provider from next-auth
import { JWT } from 'next-auth/jwt';  // Importing the JWT type from next-auth
import { Session } from 'next-auth';  // Importing the Session type from next-auth

// Getting environment variables for Azure AD and NextAuth
const clientId = process.env.AZURE_AD_CLIENT_ID!;
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET!;
const tenantId = process.env.AZURE_AD_TENANT_ID!;
const nextAuthSecret = process.env.NEXTAUTH_SECRET!;

// Check if any of the environment variables are missing and log an error if they are
if (!clientId || !clientSecret || !tenantId || !nextAuthSecret) {
  console.error('Azure AD environment variables:', {
    clientId,
    clientSecret,
    tenantId,
    nextAuthSecret,
  });
  throw new Error('Missing Azure AD environment variables');
}

// Exporting the NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId,  // Azure AD Client ID
      clientSecret,  // Azure AD Client Secret
      tenantId,  // Azure AD Tenant ID
      authorization: {
        params: {
          scope: 'openid profile email User.Read',  // Defining the scopes for the authorization
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',  // Using JWT for session management
  },
  callbacks: {
    // JWT callback to include the access token in the token
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log('JWT Callback - token:', token);
      return token;
    },
    // Session callback to include the access token in the session
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      console.log('Session Callback - session:', session);
      return session;
    },
    // Redirect callback to log the URL and base URL
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log('Redirect Callback - url:', url, 'baseUrl:', baseUrl);
      return baseUrl;
    },
  },
  secret: nextAuthSecret,  // Secret for NextAuth
  debug: true,  // Enable debug mode for detailed logging
};
