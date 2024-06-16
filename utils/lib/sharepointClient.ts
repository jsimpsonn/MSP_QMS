// utils/lib/sharepointClient.ts

import axios from 'axios';  // Importing axios for making HTTP requests
import { getSession } from 'next-auth/react';  // Importing getSession from next-auth/react to get the current session

// Function to get data from SharePoint
export const getSharePointData = async (siteUrl: string, endpoint: string) => {
  const session = await getSession();  // Getting the current session
  if (!session) {
    throw new Error('No active session found');  // Throwing an error if no session is found
  }
  const accessToken = session.accessToken as string;  // Extracting the access token from the session
  console.log('Access Token:', accessToken);  // Log the access token for debugging

  // Decode the token to check the audience
  const base64Url = accessToken.split('.')[1];  // Getting the payload part of the token
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Replacing characters to make it base64 compatible
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);  // Decoding the payload
  }).join(''));
  console.log('Decoded Token:', JSON.parse(jsonPayload));  // Logging the decoded token for debugging

  // Making a GET request to the SharePoint API
  const response = await axios.get(`${siteUrl}/_api/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,  // Setting the Authorization header with the access token
      Accept: 'application/json;odata=verbose',  // Setting the Accept header to get a verbose response
    },
  });
  return response.data;  // Returning the response data
};
