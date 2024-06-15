// src/middleware.js

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: [
    '/((?!api|auth/signin).*)', // This will protect all pages except for the sign-in page and API routes
  ],
};
