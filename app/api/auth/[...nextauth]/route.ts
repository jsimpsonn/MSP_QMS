// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth'; // Importing NextAuth for authentication handling
import {authOptions} from 'lib/authOptions'; // Importing authentication options

// Creating the NextAuth handler with the provided authentication options
const handler = NextAuth(authOptions);

// Exporting the handler for GET and POST requests
export {handler as GET, handler as POST};