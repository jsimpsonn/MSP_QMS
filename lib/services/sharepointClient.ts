// lib/services/sharepointClient.ts

import axios from 'axios';
import { getSession, signIn } from 'next-auth/react';

/**
 * Utility function to get access token from session
 * @returns The access token string
 */
export const getAccessToken = async (): Promise<string> => {
    const session = await getSession();
    if (!session) {
        await signIn();
        throw new Error('No session found');
    }
    return session.accessToken as string;
};

/**
 * Function to fetch users from Microsoft Graph API.
 * @returns The list of users from Microsoft Graph API.
 */
export const getUsers = async () => {
    const accessToken = await getAccessToken();

    const url = 'https://graph.microsoft.com/v1.0/users';

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        return response.data.value;
    } catch (error) {
        console.error('Error fetching users from Microsoft Graph API:', error);
        throw error;
    }
};

/**
 * Function to fetch column definitions from SharePoint API.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @returns The fetched column definitions from SharePoint API.
 */
export const getSharePointColumns = async (siteId: string, listId: string) => {
    const accessToken = await getAccessToken();

    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/columns`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        return response.data.value;
    } catch (error) {
        console.error('Error fetching columns from SharePoint API:', error);
        throw error;
    }
};
