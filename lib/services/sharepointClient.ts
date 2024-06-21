// lib/services/sharepointClient.ts

import axios from 'axios';
import {getSession, signIn} from 'next-auth/react';

/**
 * Function to fetch data from SharePoint API.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @returns The fetched data from SharePoint API.
 */
export const getSharePointData = async (siteId: string, listId: string) => {
    const session = await getSession();
    if (!session) {
        await signIn(); // Redirect to sign-in page if no session found
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

/**
 * Function to fetch column definitions from SharePoint API.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @returns The fetched column definitions from SharePoint API.
 */
export const getSharePointColumns = async (siteId: string, listId: string) => {
    const session = await getSession();
    if (!session) {
        await signIn(); // Redirect to sign-in page if no session found
        return;
    }
    const accessToken = session.accessToken as string;
    console.log('Access Token:', accessToken);

    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/columns`;
    console.log('API Endpoint:', url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        console.log('SharePoint Columns Response:', response.data);
        return response.data.value;
    } catch (error) {
        console.error('Error fetching columns from SharePoint API:', error as Error);
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
            await signIn(); // Redirect to sign-in page if token is expired or forbidden
        }
        throw error;
    }
};

/**
 * Function to create a new item in SharePoint.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @param itemData - The data of the item to create.
 * @returns The created item data from SharePoint API.
 */
export const createSharePointItem = async (siteId: string, listId: string, itemData: any) => {
    const session = await getSession();
    if (!session) {
        await signIn(); // Redirect to sign-in page if no session found
        return;
    }
    const accessToken = session.accessToken as string;
    console.log('Access Token:', accessToken);

    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`;
    console.log('API Endpoint:', url);

    const data = {
        fields: {
            ...itemData,
            InternalAuditors: itemData.InternalAuditors ? {"results": itemData.InternalAuditors.map((auditor: any) => ({id: auditor.id}))} : undefined
        }
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('Created SharePoint Item:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating item in SharePoint:', error as Error);
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
            await signIn(); // Redirect to sign-in page if token is expired or forbidden
        }
        throw error;
    }
};

/**
 * Function to update an item in SharePoint.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @param itemId - The ID of the item to update.
 * @param itemData - The updated data of the item.
 * @returns The updated item data from SharePoint API.
 */
export const updateSharePointItem = async (siteId: string, listId: string, itemId: string, itemData: any) => {
    const session = await getSession();
    if (!session) {
        await signIn(); // Redirect to sign-in page if no session found
        return;
    }
    const accessToken = session.accessToken as string;
    console.log('Access Token:', accessToken);

    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items/${itemId}`;
    console.log('API Endpoint:', url);

    const data = {
        fields: {
            ...itemData,
            InternalAuditors: itemData.InternalAuditors ? {"results": itemData.InternalAuditors.map((auditor: any) => ({id: auditor.id}))} : undefined
        }
    };

    try {
        const response = await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('Updated SharePoint Item:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating item in SharePoint:', error as Error);
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
            await signIn(); // Redirect to sign-in page if token is expired or forbidden
        }
        throw error;
    }
};

/**
 * Function to delete an item from SharePoint.
 * @param siteId - The ID of the SharePoint site.
 * @param listId - The ID of the SharePoint list.
 * @param itemId - The ID of the item to delete.
 * @returns A promise resolving when the item is deleted.
 */
export const deleteSharePointItem = async (siteId: string, listId: string, itemId: string) => {
    const session = await getSession();
    if (!session) {
        await signIn(); // Redirect to sign-in page if no session found
        return;
    }
    const accessToken = session.accessToken as string;
    console.log('Access Token:', accessToken);

    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items/${itemId}`;
    console.log('API Endpoint:', url);

    try {
        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            }
        });

        console.log('Deleted SharePoint Item');
    } catch (error) {
        console.error('Error deleting item from SharePoint:', error as Error);
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
            await signIn(); // Redirect to sign-in page if token is expired or forbidden
        }
        throw error;
    }
};
