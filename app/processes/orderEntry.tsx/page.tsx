import React from 'react';
import OrderEntryForm from '@/components/OrderEntryForm';

const OrderEntryPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Entry</h1>
      <OrderEntryForm />
    </div>
  );
};

export default OrderEntryPage;
