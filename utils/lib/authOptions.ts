import { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

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
      clientId,
      clientSecret,
      tenantId,
      authorization: {
        params: {
          scope: 'openid profile email User.Read Sites.ReadWrite.All Sites.Manage.All',
        },
      },
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
