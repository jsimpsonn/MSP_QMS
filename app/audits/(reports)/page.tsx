// app/audits/(reports)/page.tsx

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { getSharePointData, createSharePointItem, updateSharePointItem, deleteSharePointItem, getSharePointColumns } from '@/utils/lib/sharepointClient';
import { DataTable } from './data-table';
import { columns, AuditItem } from './columns';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import AuditFormDialog from '@/components/(audits)/AuditForm';
import AuditDeleteAlert from '@/components/(audits)/AuditAlert';
import ToastNotifications, { showToast } from '@/components/(audits)/AuditToast';
import { useToast } from '@/components/ui/use-toast';

const siteId = 'mssteelprocom.sharepoint.com,d6759b28-b601-4a0f-a552-fe7f9f0e10a7,63136c0a-aed9-4cdb-bc2f-febcdbc771ff';
const listId = 'd7f524c2-388c-44aa-a729-9b2fe06c2861';

const AuditsPage: React.FC = () => {
  const [listData, setListData] = useState<AuditItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<AuditItem | null>(null);
  const [columnsData, setColumnsData] = useState<any[]>([]); // SharePoint columns
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const [data, columns] = await Promise.all([
        getSharePointData(siteId, listId),
        getSharePointColumns(siteId, listId)
      ]);
      setListData(data);
      setColumnsData(columns);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching SharePoint data:', error);
      showToast(toast, 'Failed to fetch data', 'error');
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (newItem: any) => {
    try {
      await createSharePointItem(siteId, listId, newItem);
      fetchData();
      showToast(toast, 'Audit created successfully', 'success');
    } catch (error) {
      console.error('Error creating item:', error);
      showToast(toast, 'Failed to create audit', 'error');
    }
  };

  const handleUpdate = async (updatedItem: any) => {
    if (!currentItem) return;
    try {
      await updateSharePointItem(siteId, listId, currentItem.id, updatedItem);
      fetchData();
      showToast(toast, 'Audit updated successfully', 'success');
    } catch (error) {
      console.error('Error updating item:', error);
      showToast(toast, 'Failed to update audit', 'error');
    }
  };

  const handleDelete = async () => {
    if (!currentItem) return;
    try {
      await deleteSharePointItem(siteId, listId, currentItem.id);
      fetchData();
      showToast(toast, 'Audit deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast(toast, 'Failed to delete audit', 'error');
    }
    setIsAlertOpen(false);
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
      <Button onClick={() => setIsDialogOpen(true)} className="mb-4">Add Audit</Button>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columns={columns({ setCurrentItem, setIsDialogOpen, setIsAlertOpen })}
            data={listData}
          />
        )}
      </div>
      <AuditFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={currentItem ? handleUpdate : handleCreate}
        initialData={currentItem}
        columns={columnsData} // Pass SharePoint columns
      />
      <AuditDeleteAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleDelete}
        itemTitle={currentItem?.Title || ''}
      />
      <ToastNotifications />
    </div>
  );
};

export default AuditsPage;
