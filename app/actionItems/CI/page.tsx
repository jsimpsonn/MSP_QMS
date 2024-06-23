// app/continuousImprovement/ContinuousImprovementPage.tsx

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getItems } from '../../api/sharepoint/readItem';
import { DataTable } from './data-table';
import { ContinuousImprovementItem, columns } from './columns';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';
import { Card } from '@/components/ui/card';

const siteId = 'mssteelprocom.sharepoint.com,d6759b28-b601-4a0f-a552-fe7f9f0e10a7,63136c0a-aed9-4cdb-bc2f-febcdbc771ff';
const CONTINUOUS_IMPROVEMENT_LIST_ID = '6c2c5369-f781-4a91-9c7a-8ffca7eff506';

const ContinuousImprovementPage: React.FC = () => {
    const [listData, setListData] = useState<ContinuousImprovementItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const selectFields = [
                'Title',
                'Progress',
                'Description',
                'KeyProcessOwner',
                'TeamMembers',
                'Start_Date',
            ];
            const data = await getItems(siteId, CONTINUOUS_IMPROVEMENT_LIST_ID, selectFields);
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
                        <BreadcrumbPage>Continuous Improvement</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageTitle title="Continuous Improvement" />
            <Card className="bg-card dark:bg-dark-card">
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable columns={columns} data={listData} />
                )}
            </div>
            </Card>
        </div>
    );
};

export default ContinuousImprovementPage;
