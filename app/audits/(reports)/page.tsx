// app/audits/(reports)/page.tsx

'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {
    createSharePointItem,
    deleteSharePointItem,
    getSharePointColumns,
    getSharePointData,
    updateSharePointItem
} from '@/lib/services/sharepointClient';
import {DataTable} from './data-table';
import {AuditItem, columns} from './columns';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';
import {Button} from '@/components/ui/button';
import AuditFormDialog from '@/components/(audits)/AuditForm';
import AuditDeleteAlert from '@/components/(audits)/AuditAlert';

const siteId = 'mssteelprocom.sharepoint.com,d6759b28-b601-4a0f-a552-fe7f9f0e10a7,63136c0a-aed9-4cdb-bc2f-febcdbc771ff';
const listId = 'd7f524c2-388c-44aa-a729-9b2fe06c2861';

const AuditsPage: React.FC = () => {
    const [listData, setListData] = useState<AuditItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<AuditItem | null>(null);
    const [columnsData, setColumnsData] = useState<any[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const [data, columns] = await Promise.all([
                getSharePointData(siteId, listId),
                getSharePointColumns(siteId, listId),
            ]);
            setListData(data);
            setColumnsData(columns);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching SharePoint data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreate = async (newItem: any) => {
        try {
            await createSharePointItem(siteId, listId, newItem);
            await fetchData(); // Ensure fetchData is awaited
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const handleUpdate = async (updatedItem: any) => {
        if (!currentItem) return;
        try {
            await updateSharePointItem(siteId, listId, currentItem.id, updatedItem);
            await fetchData(); // Ensure fetchData is awaited
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async () => {
        if (!currentItem) return;
        try {
            await deleteSharePointItem(siteId, listId, currentItem.id);
            await fetchData(); // Ensure fetchData is awaited
        } catch (error) {
            console.error('Error deleting item:', error);
        }
        setIsAlertOpen(false);
    };

    const handleAddAudit = async () => {
        // Gather the necessary data for the new audit item
        // This is just an example, replace it with your actual data
        const newItem = {
            Title: 'New Audit',
            // ...other fields...
        };

        try {
            await createSharePointItem(siteId, listId, newItem);
            await fetchData(); // Ensure fetchData is awaited
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Audits</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageTitle title="Internal Audits"/>
            <Button onClick={handleAddAudit} className="mb-4">Add Audit</Button>
             <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        columns={columns({setCurrentItem, setIsDialogOpen, setIsAlertOpen})}
                        data={listData}
                    />
                )}
            </div>
            <AuditFormDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={currentItem ? handleUpdate : handleCreate}
                initialData={currentItem}
                columns={columnsData}
            />
            <AuditDeleteAlert
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                onConfirm={handleDelete}
                itemTitle={currentItem?.Title || ''}
            />
        </div>
    );
};

export default AuditsPage;
