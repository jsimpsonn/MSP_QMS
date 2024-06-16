'use client';

import React, { useEffect, useState } from 'react';
import { getSharePointData } from '../../utils/lib/sharepointClient';
import { useSession } from 'next-auth/react';

const MaintenancePage: React.FC = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      const siteUrl = 'https://mssteelprocom.sharepoint.com/sites/QualityManagementSystem34';
      const endpoint = "Lists/Internal%20Audits%202024/items";
      try {
        const result = await getSharePointData(siteUrl, endpoint);
        setData(result);
      } catch (error) {
        setError(`Error fetching SharePoint data: ${error.message}`);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div>
      <h1>Maintenance</h1>
      {/* Add your content here */}

      {/* Display SharePoint data */}
      {session && (
        <div>
          <h2>SharePoint Data</h2>
          {error && <div>Error: {error}</div>}
          {!data && !error && <div>Loading data...</div>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
