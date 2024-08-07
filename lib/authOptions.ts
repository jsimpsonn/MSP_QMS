import { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';

const refreshAccessToken = async (token: JWT) => {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams({
      client_id: process.env.AZURE_AD_CLIENT_ID!,
      client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string,
      scope: 'openid profile email offline_access Sites.Read.All Sites.ReadWrite.All User.ReadBasic.All',
    });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

const revokeToken = async (token: string) => {
  const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/logout`;
  const params = new URLSearchParams({
    token: token,
    client_id: process.env.AZURE_AD_CLIENT_ID!,
    client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
  });

  try {
    await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      method: 'POST',
    });
  } catch (error) {
    console.error('Error revoking token', error);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      wellKnown: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: 'openid profile email offline_access Sites.Read.All Sites.ReadWrite.All User.ReadBasic.All',
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now(),
          refreshToken: account.refresh_token,
          idToken: account.id_token,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      (session as any).error = token.error;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (profile && profile.email && profile.email.endsWith('@mssteelpro.com')) {
        return true;
      } else {
        return false;
      }
    },
  },
  events: {
    async signOut({ token }) {
      if (token) {
        await revokeToken(token.accessToken as string);
      }
    },
  },
};