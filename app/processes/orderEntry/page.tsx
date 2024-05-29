import React from 'react';
import OrderEntryForm from '@/components/OrderEntryForm';

const OrderEntryPage: React.FC = () => {
  console.log('OrderEntryPage rendered');
  return (
    <div className="p-4">
      <OrderEntryForm />
    </div>
  );
};

export default OrderEntryPage;