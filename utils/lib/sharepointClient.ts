import axios from 'axios';
import { getSession } from 'next-auth/react';

// Function to get data from SharePoint
export const getSharePointData = async (siteId: string, listId: string, endpoint: string) => {
  const session = await getSession();
  if (!session) {
    throw new Error('No active session found');
  }
  const accessToken = session.accessToken as string;
  console.log('Access Token:', accessToken);

  // Making a GET request to the SharePoint API
  const response = await axios.get(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  return response.data;
};
