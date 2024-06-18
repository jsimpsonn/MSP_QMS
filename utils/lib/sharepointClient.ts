import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';

/**
 * Function to fetch data from SharePoint API.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @param endpoint - The API endpoint to fetch data from.
 * @returns The fetched data from SharePoint API.
 */
export const getSharePointData = async (siteId: string, listId: string, endpoint: string) => {
  const session = await getSession();
  if (!session) {
    signIn(); // Redirect to sign-in page if no session found
    return;
  }
  const accessToken = session.accessToken as string;
  console.log('Access Token:', accessToken);

  const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/${endpoint}`;
  console.log('API Endpoint:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    console.log('SharePoint Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching from SharePoint API:', error as Error);
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      await signIn(); // Redirect to sign-in page if token is expired or forbidden
    }
    throw error;
  }
};
