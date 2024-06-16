// middleware.js

import { withAuth } from 'next-auth/middleware';  // Importing withAuth function from next-auth/middleware

// Exporting the default middleware configuration for authentication
export default withAuth({
  pages: {
    signIn: '/auth/signin',  // Redirect to this sign-in page if authentication is required
  },
});

// Exporting the configuration object for the middleware
export const config = {
  matcher: [
    '/((?!api|auth/signin).*)',  // This will protect all pages except for the sign-in page and API routes
  ],
};