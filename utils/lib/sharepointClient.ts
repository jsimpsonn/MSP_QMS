// utils/lib/sharepointClient.ts

import axios from 'axios';
import { getSession } from 'next-auth/react';

export const getSharePointData = async (siteUrl: string, endpoint: string) => {
  const session = await getSession();
  if (!session) {
    throw new Error('No active session found');
  }
  const accessToken = session.accessToken as string;
  console.log('Access Token:', accessToken); // Log the access token for debugging

  // Decode the token to check the audience
  const base64Url = accessToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  console.log('Decoded Token:', JSON.parse(jsonPayload));

  const response = await axios.get(`${siteUrl}/_api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json;odata=verbose',
    },
  });
  return response.data;
};
