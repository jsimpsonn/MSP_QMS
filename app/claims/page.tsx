'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getItems } from '../api/sharepoint/readItem';
import { DataTable } from './data-table';
import { ClaimItem, columns } from './columns';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const siteId = 'mssteelprocom.sharepoint.com,d6759b28-b601-4a0f-a552-fe7f9f0e10a7,63136c0a-aed9-4cdb-bc2f-febcdbc771ff';

const CLAIMS_LIST_ID_2022 = 'e63f35ff-7285-4eb2-b005-858b64de2489';
const CLAIMS_LIST_ID_2023 = '294604c9-cc73-4a32-a68d-49d1f3cb435d';
const CLAIMS_LIST_ID_2024 = 'd88ffbb8-9254-459c-a3b4-3fb5ddfb26cc';

const ClaimsPage: React.FC = () => {
    const [listData, setListData] = useState<ClaimItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('2024');

    const fetchData = useCallback(async (listId: string) => {
        try {
            const selectFields = [
                'Title',
                'Accepted_x002f_Denied',
                'Customer',
                'CostCode',
                'ClaimDated',
                'GrossAmount',
                'Net_x0020_to_x0020_MSP',
                'ReasonforAdjustment'
            ];
            const data = await getItems(siteId, listId, selectFields);
            setListData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching SharePoint data:', error);
        }
    }, []);

    useEffect(() => {
        const listId = selectedTab === '2022' ? CLAIMS_LIST_ID_2022 : 
                       selectedTab === '2023' ? CLAIMS_LIST_ID_2023 : 
                       CLAIMS_LIST_ID_2024;
        fetchData(listId);
    }, [selectedTab, fetchData]);

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Claims</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageTitle title="Claims" />
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                    <TabsTrigger value="2022">2022</TabsTrigger>
                    <TabsTrigger value="2023">2023</TabsTrigger>
                    <TabsTrigger value="2024">2024</TabsTrigger>
                </TabsList>
                <TabsContent value="2022">
                    <Card>
                        {isLoading ? <p>Loading...</p> : <DataTable columns={columns} data={listData} />}
                    </Card>
                </TabsContent>
                <TabsContent value="2023">
                    <Card>
                        {isLoading ? <p>Loading...</p> : <DataTable columns={columns} data={listData} />}
                    </Card>
                </TabsContent>
                <TabsContent value="2024">
                    <Card>
                        {isLoading ? <p>Loading...</p> : <DataTable columns={columns} data={listData} />}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ClaimsPage;
