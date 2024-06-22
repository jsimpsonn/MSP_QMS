// app/correctiveActions/page.tsx
"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { getItems } from '../../api/sharepoint/readItem';
import { DataTable } from './data-table';
import { CorrectiveActionItem, columns } from './columns';
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

const CORRECTIVE_ACTIONS_LIST_ID_2022 = '17fe3cbe-d383-40e7-b49e-4a6bf9d89169';
const CORRECTIVE_ACTIONS_LIST_ID_2023 = '5200ad5a-03ef-4046-864a-c3e413afee5c';
const CORRECTIVE_ACTIONS_LIST_ID_2024 = 'cb2309a1-8c95-4481-8216-7605ad086855';

const CorrectiveActionsPage: React.FC = () => {
    const [listData, setListData] = useState<CorrectiveActionItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('2024');

    const fetchData = useCallback(async (listId: string) => {
        try {
            const selectFields = [
                'Title',
                'CAR_x002f_PAR',
                'Observed_x0020_Problem',
                'Status',
                'Initiator',
                'Respondent',
                'RequestDate',
                'ClosedDate',
                'Retention_x0020_Date'
            ];
            const data = await getItems(siteId, listId, selectFields);
            setListData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching SharePoint data:', error);
        }
    }, []);

    useEffect(() => {
        const listId = selectedTab === '2022' ? CORRECTIVE_ACTIONS_LIST_ID_2022 : 
                       selectedTab === '2023' ? CORRECTIVE_ACTIONS_LIST_ID_2023 : 
                       CORRECTIVE_ACTIONS_LIST_ID_2024;
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
                        <BreadcrumbPage>Corrective Actions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageTitle title="Corrective Actions" />
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

export default CorrectiveActionsPage;
