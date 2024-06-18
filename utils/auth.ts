import type {
  GetServerSidePropsContext,  // Importing type definitions for server-side props context
  NextApiRequest,             // Importing type definitions for Next.js API requests
  NextApiResponse,            // Importing type definitions for Next.js API responses
} from 'next';
import { getServerSession } from 'next-auth';  // Importing the function to get server session from next-auth
import { authOptions } from '@/utils/lib/authOptions';  // Importing authentication options from a specific path

// Exporting the configuration for authentication options
export const config = authOptions;

// Function to handle authentication
// It can accept different types of arguments:
// - [req, res] from GetServerSidePropsContext
// - [NextApiRequest, NextApiResponse]
// - An empty array
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);  // Returning the server session based on the arguments and authentication options
}
