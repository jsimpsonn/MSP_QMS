import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHead, TableRow, TableHeader } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import CalendarView from '@/components/Calendar';
import { Separator } from '@/components/ui/separator';
import EmployeeList from '@/components/Employee';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

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

export default async function TrainingPortal() {
  const employeeData = await fetchEmployeeData();

  return (
    <div>
      <h1 className="text-2xl font-bold pb-4">Training Portal</h1>
      <Tabs defaultValue="Training Records" className="w-full">
        <TabsList className="grid grid-cols-4 gap-1">
          <TabsTrigger value="Training Records">Training Records</TabsTrigger>
          <TabsTrigger value="Employee Records">Employee Records</TabsTrigger>
          <TabsTrigger value="Scheduled Trainings">Scheduled Trainings</TabsTrigger>
          <TabsTrigger value="Training Matrices">Training Matrices</TabsTrigger>
        </TabsList>
        <Separator className="my-4" />
        <TabsContent value="Training Records">
          <Card className="h-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5">Training Date</TableHead>
                  <TableHead className="w-4/5">Training Topic</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="Employee Records">
          <Card>
            <EmployeeList data={employeeData} />
          </Card>
        </TabsContent>
        <TabsContent value="Scheduled Trainings">
          <CalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
