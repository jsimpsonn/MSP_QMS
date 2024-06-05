import React from 'react';
import OrderEntryForm from '@/components/OrderEntryForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OrderEntryPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Entry & Receiving</h1>
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