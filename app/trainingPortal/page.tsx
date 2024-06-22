// app/training-portal/TrainingPortalPage.tsx

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getItems } from '../api/sharepoint/readItem';
import { DataTable } from './data-table';
import { TrainingPortalItem, columns } from './columns';
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
const TRAINING_PORTAL_LIST_ID = '1d2022e6-8ee1-4b82-8c39-927497ce2dde';

const TrainingPortalPage: React.FC = () => {
    const [listData, setListData] = useState<TrainingPortalItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const selectFields = [
                'Title',
                'HireDate',
                'RehireDate',
                'JobTitleDescription',
                'Obsolete'
            ];
            const data = await getItems(siteId, TRAINING_PORTAL_LIST_ID, selectFields);
            setListData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching SharePoint data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Training Portal</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageTitle title="Training Portal" />
            <Tabs defaultValue="Training Records">
                <TabsList className="gap-1">
                    <TabsTrigger value="Training Records">Training Records</TabsTrigger>
                    <TabsTrigger value="Employee Records">Employee Records</TabsTrigger>
                    <TabsTrigger value="Scheduled Trainings">Scheduled Trainings</TabsTrigger>
                    <TabsTrigger value="Training Matrices">Training Matrices</TabsTrigger>
                </TabsList>
                <TabsContent value="Training Records">

                </TabsContent>
                <TabsContent value="Employee Records">
                <Card>
                        {isLoading ? <p>Loading...</p> : <DataTable columns={columns} data={listData} />}
                    </Card>
                </TabsContent>
                <TabsContent value="Scheduled Trainings">
                </TabsContent>
                <TabsContent value="Training Matrices">
                    {/* Add your Training Matrices content here */}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default TrainingPortalPage;
