// api/sharepoint/createItem.ts

import axios from 'axios';
import { getAccessToken } from '@/lib/services/sharepointClient';

export const createItem = async (siteId: string, listId: string, itemData: any) => {
    const accessToken = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`;

    const data = { fields: { ...itemData } };

    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log('Created SharePoint Item:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating item in SharePoint:', error);
        throw error;
    }
};
