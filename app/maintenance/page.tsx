'use client';

import React, { useEffect, useState } from 'react';
import { getSharePointData } from '@/utils/lib/sharepointClient';
import { DataTable } from './data-table';  // Import the DataTable component
import { columns, AuditItem } from './columns';  // Import columns and AuditItem type
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';

const siteId = 'mssteelprocom.sharepoint.com,d6759b28-b601-4a0f-a552-fe7f9f0e10a7,63136c0a-aed9-4cdb-bc2f-febcdbc771ff';
const listId = 'd7f524c2-388c-44aa-a729-9b2fe06c2861';

const MaintenancePage: React.FC = () => {
  const [listData, setListData] = useState<AuditItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching SharePoint data...');
        const data = await getSharePointData(siteId, listId);
        console.log('Data fetched:', data);
        setListData(data);
      } catch (error) {
        console.error('Error fetching SharePoint data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Maintenance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageTitle title="Maintenance" />
      <div>
        {listData.length ? (
          <DataTable columns={columns} data={listData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
