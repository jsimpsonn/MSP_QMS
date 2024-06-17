import React from 'react';
import OrderEntryForm from '@/components/OrderEntryForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';

const OrderEntryPage: React.FC = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href="/processes">Key Processes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>Order Entry & Receiving</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageTitle title="Order Entry & Receiving" />
      <Tabs defaultValue="Home" className="w-full">
        <TabsList className="grid grid-cols-4 gap-2">
          <TabsTrigger value="Home">Home</TabsTrigger>
          <TabsTrigger value="Core Team">Core Team</TabsTrigger>
          <TabsTrigger value="Inventory Scrap Request">Inventory Scrap Request</TabsTrigger>
          <TabsTrigger value="KPIs">KPIs</TabsTrigger>
        </TabsList>
        <TabsContent value="Home">
        </TabsContent>
        <TabsContent value="Inventory Scrap Request">
          <OrderEntryForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderEntryPage;