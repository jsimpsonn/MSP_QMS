import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { DataTable } from './data-table'
import { Claim, columns } from './columns'

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

const ClaimsPage: React.FC = () => {
  return (
    <div>
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

export default ClaimsPage
