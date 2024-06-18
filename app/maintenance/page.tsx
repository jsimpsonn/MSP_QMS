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

const MaintenancePage: React.FC = () => {
  const [listData, setListData] = useState<any>(null);

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
        {listData ? (
          <table>
            <thead>
              <tr>
                <th>Process/Audit Area</th>
                <th>Internal Audit Type</th>
                <th>Status</th>
                <th>Internal Auditors</th>
                <th>Audit Date</th>
                <th>Shift</th>
                <th># Findings</th>
                <th>Process Owner</th>
              </tr>
            </thead>
            <tbody>
              {listData.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.Title}</td>
                  <td>{item.Internal_x0020_Audit_x0020_Type}</td>
                  <td>{item.Status}</td>
                  <td>{item.InternalAuditors}</td>
                  <td>{item.AuditDate}</td>
                  <td>{item.Shift}</td>
                  <td>{item._x0023_Findings}</td>
                  <td>{item.ProcessOwner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
