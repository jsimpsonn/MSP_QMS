import React from 'react';
import AuditSchedule from '@/components/AuditSchedule';

const AuditSchedulePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold pb-6">Internal Audit Schedule</h1>
            <AuditSchedule />
        </div>
    );
};

export default AuditSchedulePage;