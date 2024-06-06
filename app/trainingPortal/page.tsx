import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import CalendarView from '@/components/Calendar';
import EmployeeList from '@/components/Employee';
import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase URL and public key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function fetchEmployeeData() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from('employees').select('payroll_name, hire_date, rehire_date, job_title_description, obsolete');

  if (error) {
    console.error('Error fetching employee data:', error);
    return [];
  }

  return data || [];
}

const TrainingPortal = async () => {
  const employeeData = await fetchEmployeeData();

  return (
    <div>
      <h1 className="text-2xl font-bold pb-4">Training Portal</h1>
      <Tabs defaultValue="Training Records">
        <TabsList className="gap-1">
          <TabsTrigger value="Training Records">Training Records</TabsTrigger>
          <TabsTrigger value="Employee Records">Employee Records</TabsTrigger>
          <TabsTrigger value="Scheduled Trainings">Scheduled Trainings</TabsTrigger>
          <TabsTrigger value="Training Matrices">Training Matrices</TabsTrigger>
        </TabsList>
        <TabsContent value="Training Records">
          <Card className="h-auto">
            {/* Training Records Table */}
          </Card>
        </TabsContent>
        <TabsContent value="Employee Records">
          <EmployeeList initialData={employeeData} />
        </TabsContent>
        <TabsContent value="Scheduled Trainings">
          <CalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingPortal;
