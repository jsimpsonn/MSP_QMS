// api/sharepoint/updateItem.ts

import axios from 'axios';
import { getAccessToken } from '@/lib/services/sharepointClient';

export const updateItem = async (siteId: string, listId: string, itemId: string, itemData: any) => {
    const accessToken = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items/${itemId}`;

    const data = { fields: { ...itemData } };

    try {
        const response = await axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log('Updated SharePoint Item:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating item in SharePoint:', error);
        throw error;
    }
};