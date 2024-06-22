'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getItems } from '../../api/sharepoint/readItem';
import { createItem } from '../../api/sharepoint/createItem';
import { updateItem } from '../../api/sharepoint/updateItem';
import { deleteItem } from '../../api/sharepoint/deleteItem';
import { getSharePointColumns } from '@/lib/services/sharepointClient';
import { DataTable } from './data-table';
import { AuditItem, columns } from './columns';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';
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
            const columns = await getSharePointColumns(siteId, listId);
            const selectFields = columns.map((col: any) => col.name);
            const data = await getItems(siteId, listId, selectFields);
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
            await createItem(siteId, listId, newItem);
            await fetchData();
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const handleUpdate = async (updatedItem: any) => {
        if (!currentItem) return;
        try {
            await updateItem(siteId, listId, currentItem.id, updatedItem);
            await fetchData();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async () => {
        if (!currentItem) return;
        try {
            await deleteItem(siteId, listId, currentItem.id);
            await fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
        setIsAlertOpen(false);
    };

    const openAddAuditDialog = () => {
        setCurrentItem(null);
        setIsDialogOpen(true);
    };

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Audits</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <PageTitle title="Internal Audits" />
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        columns={columns({ setCurrentItem, setIsDialogOpen, setIsAlertOpen })}
                        data={listData}
                        openAddAuditDialog={openAddAuditDialog} // Pass the dialog handler
                    />
                )}
            </div>
            <AuditFormDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleCreate}
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