import React from 'react';
import NewDocumentRequestForm from '@/components/NewDocumentRequestForm';

const NewRequestPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Request New Document Creation</h1>
            <NewDocumentRequestForm />
        </div>
    );
};

export default NewRequestPage;