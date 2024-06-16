// types/next-auth.d.ts

import NextAuth, { DefaultSession } from 'next-auth';  // Importing NextAuth and DefaultSession from next-auth

// Extending the Session interface in next-auth to include an optional accessToken property
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

// Extending the JWT interface in next-auth/jwt to include an optional accessToken property
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
