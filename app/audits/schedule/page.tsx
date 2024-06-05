import React from 'react';
import CalendarView from '@/components/Calendar';

const AuditSchedulePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold pb-6">Internal Audit Schedule</h1>
            <CalendarView />
        </div>
    );
};

export default AuditSchedulePage;