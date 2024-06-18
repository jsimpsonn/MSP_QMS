'use client';

import React, { useEffect, useState } from 'react';
import { getSharePointData } from '@/utils/lib/sharepointClient';
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
const endpoint = 'items';

const MaintenancePage: React.FC = () => {
  const [listData, setListData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSharePointData(siteId, listId, endpoint);
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
        {listData ? (
          <pre>{JSON.stringify(listData, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
