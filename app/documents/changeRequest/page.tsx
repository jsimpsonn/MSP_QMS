import React from 'react';
import OrderEntryForm from '@/components/ChangeRequestForm';

const ChangeRequestPage: React.FC = () => {
  console.log('ChangeRequestPage rendered');
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Document Change Request</h1>
      <OrderEntryForm />
    </div>
  );
};

export default ChangeRequestPage;