// api/sharepoint/deleteItem.ts

import axios from 'axios';
import { getAccessToken } from '@/lib/services/sharepointClient';

export const deleteItem = async (siteId: string, listId: string, itemId: string) => {
    const accessToken = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items/${itemId}`;

    try {
        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        console.log('Deleted SharePoint Item');
    } catch (error) {
        console.error('Error deleting item from SharePoint:', error);
        throw error;
    }
};