// app/claims/page.tsx

import React from 'react'  // Importing React
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'  // Importing Tabs components
import { Card } from '@/components/ui/card'  // Importing Card component
import { DataTable } from './data-table'  // Importing DataTable component
import { Claim, columns } from './columns'  // Importing Claim type and columns
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';

// Example data for each year
const claimsData2022: Claim[] = [
  {
    id: "1",
    claimNumber: "C123",
    status: "Accepted",
    customer: "Customer A",
    costCode: "CC001",
    claimDate: "2022-01-15",
    grossAmount: 1000,
    netToMSP: 950,
    reasonForAdjustment: "Reason 1"
  },
  // Add more data as needed
]

const claimsData2023: Claim[] = [
  // Add data for 2023
]

const claimsData2024: Claim[] = [
  // Add data for 2024
]

// Functional component for the Claims page
const ClaimsPage: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>Claims</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageTitle title="Claims" />
      <Tabs defaultValue="claims22">
        <TabsList>
          <TabsTrigger value="claims22">2022</TabsTrigger>
          <TabsTrigger value="claims23">2023</TabsTrigger>
          <TabsTrigger value="claims24">2024</TabsTrigger>
        </TabsList>
        <TabsContent value="claims22">
          <Card>
            <DataTable columns={columns} data={claimsData2022} />
          </Card>
        </TabsContent>
        <TabsContent value="claims23">
          <Card>
            <DataTable columns={columns} data={claimsData2023} />
          </Card>
        </TabsContent>
        <TabsContent value="claims24">
          <Card>
            <DataTable columns={columns} data={claimsData2024} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ClaimsPage  // Exporting the ClaimsPage component as default
