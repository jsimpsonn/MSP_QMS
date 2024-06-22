// api/sharepoint/readItem.ts

import axios from 'axios';
import { getAccessToken } from '@/lib/services/sharepointClient';

export const getItems = async (siteId: string, listId: string, selectFields: string[] = []) => {
    const accessToken = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`;

    const select = selectFields.length ? `fields($select=${selectFields.join(',')})` : 'fields';

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
            params: {
                $expand: select,
            },
        });

        return response.data.value.map((item: any) => item.fields);
    } catch (error) {
        console.error('Error fetching from SharePoint API:', error);
        throw error;
    }
};
