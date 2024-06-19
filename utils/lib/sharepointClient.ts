// utils/lib/sharepointClient.ts

import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';

/**
 * Function to fetch data from SharePoint API.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @returns The fetched data from SharePoint API.
 */
export const getSharePointData = async (siteId: string, listId: string) => {
  const session = await getSession();
  if (!session) {
    signIn(); // Redirect to sign-in page if no session found
    return;
  }
  const accessToken = session.accessToken as string;
  console.log('Access Token:', accessToken);

  const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`;
  console.log('API Endpoint:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      params: {
        $expand: 'fields($select=Title,Internal_x0020_Audit_x0020_Type,Status,InternalAuditors,AuditDate,Shift,_x0023_Findings,ProcessOwner)'
      }
    });

    console.log('SharePoint Response:', response.data);
    return response.data.value.map((item: any) => item.fields);
  } catch (error) {
    console.error('Error fetching from SharePoint API:', error as Error);
    if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
      await signIn(); // Redirect to sign-in page if token is expired or forbidden
    }
    throw error;
  }
};
