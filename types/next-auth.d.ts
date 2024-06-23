import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string;  // Add ID token to session type
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    idToken?: string;  // Add ID token to JWT type
  }
}
